import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";
import url from "url";
import puppeteer from "puppeteer";
import { findChrome } from "./find-chrome.mjs";

/**
 * Renders one 1200x630 share card per case study and blog post into
 * client/public/assets/<slug>-card.png. Run `npm run cards` after replacing
 * cover art or editing a title or stack.
 *
 * Why cards exist at all: og:image feeds a 1.91:1 slot, and the covers are
 * 1024x1024. An unfurler center-crops a square to that shape and keeps only
 * rows 244-780 — which is precisely the band the covers do not put their title
 * in. Every project unfurled without its own name on it. generate-og-image.mjs
 * hit the identical bug once already with a 1298x1198 portrait.
 *
 * The card contains the art rather than cropping it, and sets the title, stack
 * and domain in HTML beside it. That second part is the one worth keeping: the
 * cover art no longer has to carry legible text, so a misspelling in generated
 * artwork can no longer reach a share preview.
 *
 * Deliberately outside the build chain, like `npm run og` — puppeteer renders
 * are slow and these outputs are committed assets, not build products.
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "client", "public", "assets");

const SOURCES = [
  { dir: path.join(root, "client", "content", "projects"), eyebrow: "CASE STUDY" },
  { dir: path.join(root, "client", "content", "blog"), eyebrow: "BLOG" },
];

const DOMAIN = "zubairmuwwakil.com";
const WIDTH = 1200;
const HEIGHT = 630;
/** Stack lists run to eight entries; four is what fits on one card without shrinking. */
const MAX_PILLS = 4;

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`  FAIL  ${msg}`);
};

/**
 * The three frontmatter fields a card needs.
 *
 * This duplicates a little of client/src/lib/markdown.tsx on purpose: that
 * parser is TSX resolved by Vite, and node cannot import it. Kept to the same
 * shape it handles — `key: value` lines, `[a, b, c]` inline lists — so the two
 * cannot disagree about a file they both read.
 */
function frontmatter(raw) {
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fields = {};
  if (block) {
    for (const line of block[1].split(/\r?\n/)) {
      const at = line.indexOf(":");
      if (at === -1) continue;
      fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }
  }
  const unquote = (v) => (v ?? "").replace(/^["']|["']$/g, "").trim();
  const list = (key) =>
    unquote(fields[key])
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map(unquote)
      .filter(Boolean);

  return {
    title: unquote(fields.title) || "Untitled",
    cover: unquote(fields.cover) || undefined,
    stack: list("stack"),
    tags: list("tags"),
  };
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => `&${{ "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "#39" }[c]};`);

/**
 * Every project title is "Name — Tagline", so the em dash splits a headline
 * from a subtitle for free. Blog titles are a single sentence with no dash and
 * render whole.
 */
function splitTitle(title) {
  const at = title.indexOf("—");
  if (at === -1) return { headline: title.trim(), subtitle: "" };
  return { headline: title.slice(0, at).trim(), subtitle: title.slice(at + 1).trim() };
}

/**
 * Headlines range from "Looply" to "Why scorekeeping had to work with no
 * signal". Stepping the size by length keeps both inside the 584px copy column
 * without measuring text, which puppeteer cannot do before layout anyway.
 */
function headlineSize(headline) {
  if (headline.length <= 10) return 76;
  if (headline.length <= 16) return 64;
  if (headline.length <= 26) return 50;
  return 40;
}

function template({ eyebrow, headline, subtitle, pills, artDataUri }) {
  // Colours are the site's own dark-theme tokens: --background 230 30% 6%,
  // --primary 273 83% 67%, --accent 187 82% 56%.
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; display: flex; align-items: center;
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    background: hsl(230 30% 6%);
    background-image:
      radial-gradient(circle at 10% 15%, hsl(273 83% 67% / 0.30), transparent 42%),
      radial-gradient(circle at 90% 88%, hsl(187 82% 56% / 0.22), transparent 45%);
    color: hsl(220 40% 96%);
    overflow: hidden;
  }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 8px;
         background: linear-gradient(90deg, hsl(273 83% 67%), #3B82F6, hsl(187 82% 56%)); }
  .wrap { display: flex; align-items: center; gap: 48px; padding: 0 64px; width: 100%; }
  .copy { flex: 1; min-width: 0; }
  .eyebrow { font-size: 21px; font-weight: 700; letter-spacing: 0.14em; color: hsl(187 82% 66%); }
  .headline {
    font-size: ${headlineSize(headline)}px; font-weight: 800; letter-spacing: -0.025em;
    line-height: 1.04; margin-top: 16px;
    background: linear-gradient(90deg, hsl(273 83% 72%), #60A5FA, hsl(187 82% 62%));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .subtitle { font-size: 30px; font-weight: 600; margin-top: 12px; line-height: 1.25; }
  .pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
  .pill {
    font-size: 18px; padding: 8px 17px; border-radius: 99px;
    background: hsl(273 60% 30% / 0.45); border: 1px solid hsl(273 60% 55% / 0.5);
    color: hsl(273 60% 88%); white-space: nowrap;
  }
  .footer {
    font-size: 20px; margin-top: 28px; color: hsl(220 18% 66%);
    border-top: 1px solid hsl(220 20% 26%); padding-top: 20px;
  }
  /* contain, never cover: cropping the art is the bug this card exists to fix. */
  .art {
    flex: 0 0 440px; height: 440px; border-radius: 24px; overflow: hidden;
    border: 5px solid hsl(230 24% 14%); background: hsl(230 24% 10%);
    box-shadow: 0 24px 70px hsl(273 83% 40% / 0.45);
  }
  .art img { width: 100%; height: 100%; object-fit: contain; }
</style></head>
<body>
  <div class="bar"></div>
  <div class="wrap">
    <div class="copy">
      <div class="eyebrow">${escapeHtml(eyebrow)}</div>
      <div class="headline">${escapeHtml(headline)}</div>
      ${subtitle ? `<div class="subtitle">${escapeHtml(subtitle)}</div>` : ""}
      ${pills.length ? `<div class="pills">${pills.map((p) => `<span class="pill">${escapeHtml(p)}</span>`).join("")}</div>` : ""}
      <div class="footer">${escapeHtml(DOMAIN)}</div>
    </div>
    <div class="art"><img src="${artDataUri}" alt=""></div>
  </div>
</body></html>`;
}

/** Collect every card to render, failing on anything that would emit a wrong one. */
async function collect() {
  const cards = [];
  const takenBy = new Map();

  for (const { dir, eyebrow } of SOURCES) {
    if (!existsSync(dir)) {
      fail(`content directory not found: ${path.relative(root, dir)}`);
      continue;
    }
    for (const entry of (await readdir(dir)).sort()) {
      if (!entry.endsWith(".md")) continue;
      const slug = entry.replace(/\.md$/, "");
      const source = path.join(dir, entry);
      const data = frontmatter(await readFile(source, "utf8"));

      if (!data.cover) {
        // Not a failure: the page falls back to the generic card, which is
        // already 1.91:1. Logged so it is a decision rather than a surprise.
        console.log(`  skipped  ${slug} — no cover in frontmatter`);
        continue;
      }

      const art = path.join(assetsDir, path.basename(data.cover));
      if (!existsSync(art)) {
        fail(`${slug}: cover ${data.cover} does not exist in client/public/assets`);
        continue;
      }
      if (!MIME[path.extname(art).toLowerCase()]) {
        fail(`${slug}: cover ${data.cover} is not a PNG or JPEG`);
        continue;
      }

      const out = `${slug}-card.png`;
      // Slugs are unique per directory but projects/ and blog/ are separate,
      // so a shared name would silently overwrite one card with the other.
      if (takenBy.has(out)) {
        fail(`${slug}: output ${out} already claimed by ${takenBy.get(out)}`);
        continue;
      }
      takenBy.set(out, path.relative(root, source));

      const { headline, subtitle } = splitTitle(data.title);
      const pills = (data.stack.length ? data.stack : data.tags).slice(0, MAX_PILLS);
      cards.push({ slug, eyebrow, headline, subtitle, pills, art, out });
    }
  }
  return cards;
}

async function main() {
  const cards = await collect();
  if (failed) {
    console.error("\nNo cards written.");
    process.exit(1);
  }
  if (!cards.length) {
    console.error("No content with cover art found — nothing to render.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    for (const card of cards) {
      const mime = MIME[path.extname(card.art).toLowerCase()];
      const artDataUri = `data:${mime};base64,${(await readFile(card.art)).toString("base64")}`;

      // A page per card, and `load` rather than `networkidle0`. Reusing one page
      // across setContent calls hangs the second one: networkidle0 waits on a
      // lifecycle event that already fired, and nothing here makes a network
      // request to fire it again — the art is inlined as a data URI.
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
        await page.setContent(template({ ...card, artDataUri }), { waitUntil: "load" });
        // `load` resolves once images are fetched, not once they are decoded and
        // painted. Screenshotting between the two yields a card with an empty
        // art panel, which is the one defect this script cannot detect itself.
        await page.evaluate(() =>
          Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
        );
        await page.screenshot({ path: path.join(assetsDir, card.out), type: "png" });
      } finally {
        await page.close();
      }
      console.log(`  wrote  assets/${card.out}  (${card.headline})`);
    }
  } finally {
    await browser.close();
  }
  console.log(`\n${cards.length} card(s) at ${WIDTH}x${HEIGHT}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
