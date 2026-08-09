import { readFile, rm, stat, writeFile } from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");
const reactSnapShellPath = path.join(distDir, "200.html");

/**
 * Pages serves 404.html for unknown paths with a 404, which Google ignores — but
 * it serves the same file with a *200* when the URL /404.html is requested by
 * name. That makes /404.html a crawlable, indexable copy of the homepage. The
 * usual fix is an X-Robots-Tag header, and GitHub Pages cannot set headers, so
 * the meta tag is the only lever. It goes on the copy, never on index.html.
 */
const NOINDEX = '<meta name="robots" content="noindex" />';

function withNoindex(html) {
  if (/<meta\b[^>]*name="robots"/i.test(html)) return html;
  const injected = html.replace(/<head(\s[^>]*)?>/i, (head) => `${head}${NOINDEX}`);
  if (injected === html) {
    console.error("No <head> found in dist/index.html; cannot mark the fallback noindex.");
    process.exit(1);
  }
  return injected;
}

async function main() {
  const hasIndex = await stat(indexPath).then(() => true).catch(() => false);
  if (!hasIndex) {
    console.error("index.html not found in dist; did the build run?");
    process.exit(1);
  }

  await writeFile(fallbackPath, withNoindex(await readFile(indexPath, "utf8")), "utf8");
  console.log("Wrote dist/404.html (noindex copy of index.html) for GitHub Pages SPA routing.");

  // react-snap writes 200.html as the SPA fallback for hosts that use one
  // (Surge, Netlify). Pages uses 404.html instead, so here 200.html is an
  // unreferenced URL that answers 200 with an empty #root and the homepage's
  // title, description and canonical — a soft 404 duplicating the homepage.
  // It is needed only while react-snap crawls, and this runs after that.
  if (await stat(reactSnapShellPath).then(() => true).catch(() => false)) {
    await rm(reactSnapShellPath, { force: true });
    console.log("Removed dist/200.html — Pages never serves it, crawlers can still reach it.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
