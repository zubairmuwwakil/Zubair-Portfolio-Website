import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import url from "url";
import puppeteer from "puppeteer";
import { findChrome } from "./find-chrome.mjs";

/**
 * Renders the 1200x630 Open Graph card to client/public/assets/og-card.png.
 *
 * Why this exists rather than a checked-in image with no source: the card has to
 * stay in step with the name, role and location on the site, and a PNG nobody
 * can edit goes stale silently. Run `npm run og` after changing the copy below.
 *
 * 1200x630 is the size LinkedIn, Slack, X and iMessage all crop to (1.91:1).
 * The previous og:image was a 1298x1198 portrait, so every unfurl center-cropped
 * it and cut the top of the head off.
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const portrait = path.join(root, "client", "public", "assets", "zubair-muwwakil.jpg");
const outPath = path.join(root, "client", "public", "assets", "og-card.png");

const NAME = "Zubair Muwwakil";
const ROLE = "Backend / Full-Stack Software Engineer";
const META = "Brooklyn, NY · zubairmuwwakil.com";
const PROOF = "Shipped iOS product · Java · Spring Boot · TypeScript · PostgreSQL";

function template(portraitDataUri) {
  // Colours are the site's own dark-theme tokens: --background 230 30% 6%,
  // --primary 273 83% 67%, --accent 187 82% 56%.
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; align-items: center;
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    background: hsl(230 30% 6%);
    background-image:
      radial-gradient(circle at 12% 18%, hsl(273 83% 67% / 0.30), transparent 42%),
      radial-gradient(circle at 88% 90%, hsl(187 82% 56% / 0.22), transparent 45%);
    color: hsl(220 40% 96%);
    overflow: hidden;
  }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 8px;
         background: linear-gradient(90deg, hsl(273 83% 67%), #3B82F6, hsl(187 82% 56%)); }
  .wrap { display: flex; align-items: center; gap: 64px; padding: 0 80px; width: 100%; }
  .copy { flex: 1; min-width: 0; }
  .name {
    font-size: 76px; font-weight: 800; letter-spacing: -0.025em; line-height: 1.05;
    background: linear-gradient(90deg, hsl(273 83% 72%), #60A5FA, hsl(187 82% 62%));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .role { font-size: 35px; font-weight: 600; margin-top: 18px; color: hsl(220 40% 96%); line-height: 1.25; }
  .meta { font-size: 25px; margin-top: 22px; color: hsl(220 20% 72%); }
  .proof {
    font-size: 20px; margin-top: 34px; color: hsl(220 18% 66%);
    border-top: 1px solid hsl(220 20% 26%); padding-top: 22px;
  }
  .shot { flex: 0 0 340px; height: 340px; border-radius: 50%; overflow: hidden;
          border: 6px solid hsl(230 24% 14%); box-shadow: 0 24px 70px hsl(273 83% 40% / 0.45); }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: center 60%; }
</style></head>
<body>
  <div class="bar"></div>
  <div class="wrap">
    <div class="copy">
      <div class="name">${NAME}</div>
      <div class="role">${ROLE}</div>
      <div class="meta">${META}</div>
      <div class="proof">${PROOF}</div>
    </div>
    <div class="shot"><img src="${portraitDataUri}" alt=""></div>
  </div>
</body></html>`;
}

async function main() {
  if (!existsSync(portrait)) {
    console.error(`Portrait not found at ${portrait}`);
    process.exit(1);
  }
  const dataUri = `data:image/jpeg;base64,${(await readFile(portrait)).toString("base64")}`;

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(template(dataUri), { waitUntil: "networkidle0" });
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`Wrote ${path.relative(root, outPath)} (1200x630)`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
