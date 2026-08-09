import { execFileSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import url from "url";
import puppeteer from "puppeteer";

/**
 * Renders a project's 1200x630 share cover from a screenshot of the real app.
 *
 * The MindSky cover this replaced was an AI illustration of a marketing landing
 * page — the wrong product entirely — carrying four misspellings and a
 * generator watermark. It could not be corrected because it had no source. So
 * this follows generate-og-image.mjs and its reason for existing: a PNG nobody
 * can edit goes stale silently, and text rendered by a text renderer cannot
 * quietly acquire a typo.
 *
 * Two steps, deliberately separable:
 *
 *   node script/generate-project-cover.mjs mindsky --capture
 *       photographs a running MindSky into script/covers/<slug>-canvas.png
 *
 *   node script/generate-project-cover.mjs mindsky [--theme=dark|light]
 *       composites that capture into client/public/assets/<slug>-cover.png
 *
 * The capture is committed, so re-rendering the cover does not require the app
 * to be running — which matters, because the hosted MindSky backend has been
 * returning 503 and the capture would otherwise be unreproducible.
 *
 * Replacing a cover at a different size is safe: vite-plugin-share-image-sizes
 * measures og:image:width/height from the file on every build.
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const coversDir = path.join(root, "script", "covers");

/**
 * Only a capture URL: the title, tagline and stack a cover might once have
 * carried are the share card's job now, and duplicating them here is what put
 * "MindSky" on the same image twice.
 *
 * A local dev server rather than the hosted app, so the capture is of a known
 * graph (script/covers/<slug>-map.json) instead of whatever happens to be saved
 * in production.
 */
const PROJECTS = {
  mindsky: { captureUrl: process.env.MINDSKY_URL || "http://localhost:5174" },
};

/**
 * Square, and carrying no words.
 *
 * A cover is no longer an og:image. `generate-share-cards.mjs` renders the
 * 1.91:1 card that unfurlers actually see, and insets the cover into a 440x440
 * slot with `object-fit: contain`. So a cover has two jobs, and both want a
 * square: fill that slot without letterboxing, and fill the homepage carousel's
 * portrait frame without cropping.
 *
 * It also has to stay silent. The card already renders the title, subtitle and
 * stack as its largest elements; a cover with its own caption printed each of
 * them twice on the same image. Which is the deeper point of the card system —
 * art that carries no legible text cannot misspell anything.
 */
const WIDTH = 1024;
const HEIGHT = 1024;
// Capture at the cover's aspect ratio so compositing never has to crop, and at
// 2x so the downscale lands on real pixels rather than guesses.
const CAPTURE_WIDTH = 1400;
const CAPTURE_HEIGHT = Math.round((CAPTURE_WIDTH * HEIGHT) / WIDTH);
const CAPTURE_SCALE = 2;

// Same resolution order as script/run-ssg.mjs and generate-og-image.mjs: the
// bundled Chromium is from 2019 and will not launch on a current macOS.
function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  for (const bin of ["google-chrome", "google-chrome-stable", "chromium-browser", "chromium"]) {
    try {
      const found = execFileSync("which", [bin], { stdio: ["ignore", "pipe", "ignore"] })
        .toString()
        .trim();
      if (found && existsSync(found)) return found;
    } catch {
      /* not on PATH */
    }
  }
  const macPaths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];
  const mac = macPaths.find((p) => existsSync(p));
  if (mac) return mac;
  return puppeteer.executablePath();
}

async function withBrowser(fn) {
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

async function capture(slug, project) {
  const outPath = path.join(coversDir, `${slug}-canvas.png`);
  mkdirSync(coversDir, { recursive: true });

  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({
      width: CAPTURE_WIDTH,
      height: CAPTURE_HEIGHT,
      deviceScaleFactor: CAPTURE_SCALE,
    });
    await page.goto(project.captureUrl, { waitUntil: "networkidle0", timeout: 30000 });
    // React Flow measures the container before it lays the graph out, so the
    // first paint can show nodes stacked at the origin. Wait for the edges,
    // which only exist once positions are resolved.
    await page.waitForSelector(".react-flow__edge", { timeout: 15000 });
    // Let fitView's transition and the bubbles' backdrop blur settle.
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: outPath, type: "png" });
  });

  console.log(
    `Wrote ${path.relative(root, outPath)} ` +
      `(${CAPTURE_WIDTH * CAPTURE_SCALE}x${CAPTURE_HEIGHT * CAPTURE_SCALE})`,
  );
}

/**
 * The screenshot, and nothing else.
 *
 * The theme only shows through where the capture does not reach — the seam and
 * the letterbox bars if the graph's bounding box is not perfectly square.
 */
function template(shotDataUri, theme) {
  // Only visible in the letterbox bars, so it matches the app's own sky rather
  // than the site's dark tokens — a dark bar under a pale screenshot reads as a
  // crop, which is the thing the card system exists to avoid.
  const backdrop = theme === "dark" ? "hsl(230 30% 6%)" : "hsl(214 100% 97%)";

  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
    background: ${backdrop};
  }
  /* contain, never cover — same rule the share card follows. The capture is
     already square, so this only matters if a graph's bounds drift off 1:1. */
  img { width: 100%; height: 100%; object-fit: contain; display: block; }
</style></head>
<body>
  <img src="${shotDataUri}" alt="">
</body></html>`;
}

async function compose(slug, project, theme, outName) {
  const shotPath = path.join(coversDir, `${slug}-canvas.png`);
  if (!existsSync(shotPath)) {
    console.error(
      `No capture at ${path.relative(root, shotPath)}. ` +
        `Start the app and run: node script/generate-project-cover.mjs ${slug} --capture`,
    );
    process.exit(1);
  }
  const shotDataUri = `data:image/png;base64,${(await readFile(shotPath)).toString("base64")}`;
  const outPath = path.join(root, "client", "public", "assets", outName);

  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.setContent(template(shotDataUri, theme), { waitUntil: "networkidle0" });
    await page.screenshot({ path: outPath, type: "png" });
  });

  console.log(`Wrote ${path.relative(root, outPath)} (${WIDTH}x${HEIGHT}, ${theme})`);
}

async function main() {
  const args = process.argv.slice(2);
  const slug = args.find((a) => !a.startsWith("--"));
  const project = PROJECTS[slug];
  if (!project) {
    console.error(`Unknown project "${slug}". Known: ${Object.keys(PROJECTS).join(", ")}`);
    process.exit(1);
  }

  if (args.includes("--capture")) {
    await capture(slug, project);
    return;
  }

  const themeArg = args.find((a) => a.startsWith("--theme="));
  const theme = themeArg ? themeArg.split("=")[1] : "dark";
  if (!["dark", "light"].includes(theme)) {
    console.error(`Unknown theme "${theme}". Use --theme=dark or --theme=light.`);
    process.exit(1);
  }

  const outArg = args.find((a) => a.startsWith("--out="));
  await compose(slug, project, theme, outArg ? outArg.split("=")[1] : `${slug}-cover.png`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
