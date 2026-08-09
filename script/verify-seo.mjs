import { readdir, readFile, stat } from "fs/promises";
import path from "path";
import url from "url";
import { imageSize } from "./image-size.mjs";

/**
 * Post-build assertions over dist/.
 *
 * Every check here exists because the corresponding bug actually shipped:
 * a nav link that rendered as "//blog" and resolved to https://blog/, canonical
 * URLs that pointed at redirects, and a page that ended up with two BlogPosting
 * blocks. HTTP status and <head> spot-checks all passed while those were live —
 * so this asserts on rendered output instead.
 *
 * Runs in CI after the build; a failure fails the deploy.
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const APEX = "https://zubairmuwwakil.com";

// SPA fallbacks: copies of the homepage served for unknown paths. They
// intentionally carry the homepage's canonical, so page-level checks don't apply.
const FALLBACKS = new Set(["200.html", "404.html"]);
const MAX_DESCRIPTION = 155;
const ARTICLE_TYPES = new Set(["Article", "BlogPosting"]);
/** Leaf content pages — the ones that sit under an index and need a trail back. */
const LEAF_PAGE = /^(projects|blog)[/\\][^/\\]+[/\\]index\.html$/;

let failures = 0;
const fail = (where, msg) => {
  failures++;
  console.error(`  FAIL  ${where}: ${msg}`);
};

const attrs = (tag) =>
  Object.fromEntries([...tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

async function htmlFiles(dir = distDir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const exists = (p) => stat(p).then(() => true).catch(() => false);

/** True when an absolute apex URL names something actually present in dist. */
async function resolvesOnApex(value) {
  if (typeof value !== "string" || !value.startsWith(APEX)) return false;
  return Boolean(await resolveRoute(value.slice(APEX.length) || "/"));
}

/** Map a site-absolute URL path to the file GitHub Pages would serve for it. */
async function resolveRoute(routePath) {
  const clean = routePath.split("#")[0].split("?")[0];
  const rel = clean.replace(/^\//, "");
  const candidates = clean.endsWith("/")
    ? [path.join(distDir, rel, "index.html")]
    : [path.join(distDir, `${rel}.html`), path.join(distDir, rel, "index.html")];
  for (const c of candidates) if (await exists(c)) return c;
  // Non-HTML assets (images, robots.txt, CNAME) are served verbatim.
  if (await exists(path.join(distDir, rel))) return path.join(distDir, rel);
  return null;
}

/**
 * og:image:width/height must describe the image the page actually points at.
 * index.html hardcodes them for the 1200x630 generic card, so any route that
 * overrides og:image and leaves them alone advertises another picture's
 * dimensions — which is what every 1024x1024 project cover shipped. Unfurlers
 * size the preview box from these before the image arrives, so a wrong pair
 * reserves the wrong space and the card renders letterboxed or cropped.
 *
 * Read from the bytes in dist rather than compared to a constant, so replacing
 * a cover at a different size can't quietly reintroduce the mismatch.
 */
async function checkShareImageSize(rel, metas, file) {
  let actual;
  try {
    actual = imageSize(await readFile(file));
  } catch (err) {
    return fail(rel, `og:image ${path.basename(file)} is unreadable: ${err.message}`);
  }
  for (const [property, expected] of [
    ["og:image:width", actual.width],
    ["og:image:height", actual.height],
  ]) {
    const declared = metas.find((m) => m.property === property)?.content;
    if (declared === undefined) fail(rel, `missing ${property}`);
    else if (Number(declared) !== expected)
      fail(
        rel,
        `${property} is ${declared} but ${path.basename(file)} is ${actual.width}x${actual.height}`,
      );
  }
}

async function checkPage(file) {
  const rel = path.relative(distDir, file);
  const html = await readFile(file, "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const isFallback = FALLBACKS.has(rel);

  if (!/<html[^>]*\blang="[a-z-]+"/.test(html)) fail(rel, "missing <html lang>");
  // 200.html is react-snap's raw SPA shell and is meant to have an empty #root;
  // 404.html is a copy of the pre-rendered homepage. Neither is a real route.
  if (!isFallback && !html.includes('<div id="root"><div'))
    fail(rel, "not pre-rendered (empty #root)");

  for (const [needle, why] of [
    ["imgur", "third-party image host"],
    ["ZthEchelon", "retired GitHub handle"],
    ["portfolio.zubairmuwwakil", "retired hostname"],
  ]) {
    if (html.toLowerCase().includes(needle.toLowerCase())) fail(rel, `contains ${why}: ${needle}`);
  }

  // Protocol-relative internal links. "//blog" is read by browsers as the host
  // "blog" — the site silently links off-domain.
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = attrs(tag).href;
    if (href?.startsWith("//")) fail(rel, `protocol-relative href "${href}" resolves off-domain`);
  }

  // Internal links must resolve to something that exists in dist.
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = attrs(tag).href;
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/#")) continue;
    if (!(await resolveRoute(href))) fail(rel, `internal href "${href}" has no file in dist`);
  }

  const metas = (head.match(/<meta\b[^>]*>/g) ?? []).map(attrs);
  const canonical = (head.match(/<link\b[^>]*>/g) ?? [])
    .map(attrs)
    .filter((a) => a.rel === "canonical");

  if (canonical.length !== 1) fail(rel, `expected exactly 1 rel=canonical, found ${canonical.length}`);
  if (canonical[0] && !canonical[0].href?.startsWith(APEX))
    fail(rel, `canonical is not on the apex: ${canonical[0].href}`);

  const ogUrl = metas.find((m) => m.property === "og:url")?.content;
  if (canonical[0] && ogUrl !== canonical[0].href)
    fail(rel, `og:url (${ogUrl}) does not match canonical (${canonical[0].href})`);

  const description = metas.find((m) => m.name === "description")?.content;
  if (!description) fail(rel, "missing <meta name=description>");
  else if (description.length > MAX_DESCRIPTION)
    fail(rel, `description is ${description.length} chars (max ${MAX_DESCRIPTION})`);

  if (!/<title>[^<]+<\/title>/.test(html)) fail(rel, "missing or empty <title>");

  const blocks = [...head.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
  const types = [];
  const nodes = [];
  for (const [, body] of blocks) {
    if ([...body].some((c) => "‘’“”".includes(c)))
      fail(rel, "JSON-LD contains smart quotes");
    else if (/,\s*[}\]]/.test(body)) fail(rel, "JSON-LD contains a trailing comma");
    else {
      try {
        const node = JSON.parse(body);
        types.push(node["@type"]);
        nodes.push(node);
      } catch (err) {
        fail(rel, `JSON-LD does not parse: ${err.message}`);
      }
    }
  }
  // A repeated @type means two copies of the same entity — react-snap
  // re-processing its own output will do this.
  const dupes = types.filter((t, i) => types.indexOf(t) !== i);
  if (dupes.length) fail(rel, `duplicate JSON-LD @type: ${[...new Set(dupes)].join(", ")}`);

  for (const node of nodes.filter((n) => ARTICLE_TYPES.has(n["@type"]))) {
    // `image` is the thumbnail half of the Article treatment. Google lists it as
    // recommended, and without it the markup can only ever render as plain text.
    // Resolved rather than merely present because a cover path is easy to typo
    // and a 404ing image reads to Google as no image at all.
    const image = typeof node.image === "string" ? node.image : node.image?.url;
    if (!image) fail(rel, `${node["@type"]} JSON-LD has no image`);
    else if (!(await resolvesOnApex(image)))
      fail(rel, `${node["@type"]} image does not resolve in dist: ${image}`);

    // Google's author best practices ask for @type and name on the node itself,
    // not a bare @id pointing into another block on the page. Cross-block refs
    // usually resolve, but "usually" is a poor thing to stake the byline on.
    for (const field of ["author", "publisher"]) {
      const value = node[field];
      if (!value) fail(rel, `${node["@type"]} JSON-LD has no ${field}`);
      else if (!value["@type"] || !value.name)
        fail(rel, `${node["@type"]} ${field} needs @type and name, got ${JSON.stringify(value)}`);
    }
  }

  // BreadcrumbList is one of the few rich result types this site is genuinely
  // eligible for, and it turns the URL line in results into a readable trail.
  if (!isFallback && LEAF_PAGE.test(rel) && !types.includes("BreadcrumbList"))
    fail(rel, "leaf content page has no BreadcrumbList");

  // og:image is what renders when the link is pasted into Slack or LinkedIn —
  // for a portfolio that is a more travelled path than search results. Every
  // page shipped the generic card once while per-project art sat unused.
  const ogImage = metas.find((m) => m.property === "og:image")?.content;
  const ogImageFile =
    typeof ogImage === "string" && ogImage.startsWith(APEX)
      ? await resolveRoute(ogImage.slice(APEX.length) || "/")
      : null;
  if (!ogImage) fail(rel, "missing og:image");
  else if (!ogImageFile) fail(rel, `og:image does not resolve in dist: ${ogImage}`);
  else await checkShareImageSize(rel, metas, ogImageFile);

  return { rel, isFallback, canonical: canonical[0]?.href };
}

async function checkSitemap(pages) {
  const sitemapPath = path.join(distDir, "sitemap.xml");
  if (!(await exists(sitemapPath))) return fail("sitemap.xml", "not generated");

  const xml = await readFile(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) return fail("sitemap.xml", "contains no <loc> entries");

  for (const loc of locs) {
    if (!loc.startsWith(APEX)) fail("sitemap.xml", `entry is not on the apex: ${loc}`);
    const routePath = loc.slice(APEX.length) || "/";
    // The listed URL must be the one that serves 200. Pre-rendered routes live
    // in directories, so an unslashed entry would 301 and Search Console reports
    // it as "Page with redirect" instead of indexing it.
    const resolved = await resolveRoute(routePath);
    if (!resolved) fail("sitemap.xml", `${loc} does not resolve to a file in dist`);
    else if (!routePath.endsWith("/") && resolved.endsWith(`${path.sep}index.html`))
      fail("sitemap.xml", `${loc} is served from a directory and will 301 — add a trailing slash`);
  }

  const canonicals = new Set(pages.filter((p) => !p.isFallback).map((p) => p.canonical));
  for (const c of canonicals) {
    if (c && !locs.includes(c)) fail("sitemap.xml", `pre-rendered page ${c} is missing from the sitemap`);
  }
}

async function main() {
  if (!(await exists(distDir))) {
    console.error("dist/ not found — run the build first.");
    process.exit(1);
  }

  const files = await htmlFiles();
  console.log(`Verifying ${files.length} pre-rendered page(s) in dist/\n`);

  const pages = [];
  for (const file of files) pages.push(await checkPage(file));
  await checkSitemap(pages);

  for (const p of pages.filter((x) => !x.isFallback)) console.log(`  checked  ${p.rel} -> ${p.canonical}`);

  if (failures) {
    console.error(`\n${failures} check(s) FAILED`);
    process.exit(1);
  }
  console.log(`\nAll checks passed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
