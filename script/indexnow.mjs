/**
 * Notifies IndexNow that the site's URLs have changed.
 *
 * IndexNow is push, not pull: instead of waiting for Bing to come back around,
 * this hands it the URL list the moment a deploy goes live. Bing, Yandex, Naver
 * and Seznam share one endpoint — submitting once reaches all of them. Google
 * does not participate; Search Console's Request Indexing is its equivalent and
 * is manual.
 *
 * Run AFTER the deploy has published, not from `postbuild`. The sitemap is read
 * from the live origin rather than dist/ on purpose: it means the script can
 * only ever announce URLs that are actually reachable, and it fails loudly if
 * the deploy silently produced nothing.
 */
import { readdir, readFile } from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "client", "public");

const ORIGIN = "https://zubairmuwwakil.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * The key lives in exactly one place — the filename and contents of the key
 * file that ships to the site root. Deriving it here rather than hardcoding a
 * copy means the key, the keyLocation URL and the hosted file cannot drift out
 * of sync, which is the failure that produces a silent 403 on every submission.
 */
async function loadKey() {
  const entries = await readdir(publicDir);
  const keyFiles = entries.filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));

  if (keyFiles.length === 0) {
    throw new Error(
      `No IndexNow key file in client/public/. Generate a key in Bing Webmaster\n` +
        `Tools (Settings > IndexNow) and save it as client/public/<key>.txt`,
    );
  }
  if (keyFiles.length > 1) {
    throw new Error(`Multiple IndexNow key files in client/public/: ${keyFiles.join(", ")}`);
  }

  const file = keyFiles[0];
  const contents = (await readFile(path.join(publicDir, file), "utf8")).trim();
  const fromName = file.replace(/\.txt$/i, "");

  if (contents !== fromName) {
    throw new Error(
      `IndexNow key file is inconsistent: ${file} contains "${contents}".\n` +
        `The file's contents must equal its own name, or validation returns 403.`,
    );
  }

  return { key: fromName, keyLocation: `${ORIGIN}/${file}` };
}

async function liveSitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`GET ${ORIGIN}/sitemap.xml returned ${res.status}`);

  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  // Cross-origin entries would make the whole submission 422, taking the valid
  // URLs down with them.
  const offOrigin = urls.filter((u) => !u.startsWith(`${ORIGIN}/`));
  if (offOrigin.length) {
    throw new Error(`Sitemap contains off-origin URLs: ${offOrigin.join(", ")}`);
  }
  if (!urls.length) throw new Error("Live sitemap contains no <loc> entries.");

  return urls;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  const { key, keyLocation } = await loadKey();
  const urlList = await liveSitemapUrls();

  // --dry-run validates everything that can be wrong locally — key file naming,
  // key/contents agreement, sitemap reachability, off-origin URLs — without
  // announcing anything. Useful before the key file has actually deployed,
  // since a submission against a key that is not yet live just 403s.
  if (dryRun) {
    console.log(`IndexNow dry run — nothing submitted.`);
    console.log(`  key:         ${key}`);
    console.log(`  keyLocation: ${keyLocation}`);
    const live = await fetch(keyLocation).then((r) => r.status).catch(() => "unreachable");
    console.log(`  key file:    HTTP ${live}${live === 200 ? "" : "  (not live yet)"}`);
    console.log(`  ${urlList.length} URL(s) would be submitted:`);
    urlList.forEach((u) => console.log(`    ${u}`));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(ORIGIN).host,
      key,
      keyLocation,
      urlList,
    }),
  });

  // 200 accepted; 202 means the key is queued for validation, which is the
  // normal response the first time a key is used. Both are successes.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urlList.length} URL(s) — HTTP ${res.status}`);
    return;
  }

  const hint =
    {
      400: "malformed request body",
      403: `key not valid — check ${keyLocation} is live and returns the key`,
      422: "URLs do not match the host, or the key does not match the schema",
      429: "rate limited — too many submissions",
    }[res.status] ?? "unexpected response";

  throw new Error(`IndexNow: HTTP ${res.status} (${hint})`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
