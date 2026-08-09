import { execFileSync } from "child_process";
import { existsSync } from "fs";
import { createRequire } from "module";

/**
 * Resolves a Chrome/Chromium binary for the two things here that drive one:
 * react-snap's pre-render (script/run-ssg.mjs) and the card renderers
 * (script/generate-og-image.mjs, script/generate-share-cards.mjs).
 *
 * This lives on its own because the resolution order is not arbitrary and it
 * was already written twice, in run-ssg.mjs and generate-og-image.mjs, with a
 * comment in the latter noting they had to stay in step. A third copy for the
 * share cards is what prompted the extraction.
 *
 * The order matters: puppeteer's own bundled Chromium is from 2019 and will
 * not launch on a current macOS, so a system install has to win. It stays last
 * rather than being dropped because CI images often have nothing else.
 */

const require = createRequire(import.meta.url);

const BINARIES = ["google-chrome", "google-chrome-stable", "chromium-browser", "chromium"];

const MAC_APPS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

function onPath(bin) {
  try {
    // execFile, not exec: no shell, so nothing here can be interpreted as a
    // shell metacharacter even if the candidate list ever becomes dynamic.
    const found = execFileSync("which", [bin], { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return found && existsSync(found) ? found : undefined;
  } catch {
    return undefined; /* not on PATH */
  }
}

/**
 * Returns an executable path, or undefined when nothing resolves — callers pass
 * it to puppeteer, which falls back to its own default for undefined. Throwing
 * here instead would break the case where puppeteer's bundled build is in fact
 * the right answer.
 */
export function findChrome() {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;

  for (const bin of BINARIES) {
    const found = onPath(bin);
    if (found) return found;
  }

  if (process.platform === "darwin") {
    const app = MAC_APPS.find((p) => existsSync(p));
    if (app) return app;
  }

  // Required lazily: this module is imported by scripts that may run in a
  // checkout where puppeteer was never installed, and a missing optional
  // fallback should not take the whole script down at import time.
  try {
    const puppeteer = require("puppeteer");
    if (typeof puppeteer.executablePath === "function") return puppeteer.executablePath();
    if (typeof puppeteer.executablePath === "string") return puppeteer.executablePath;
  } catch (err) {
    console.warn("Could not resolve puppeteer executable:", err.message);
  }

  return undefined;
}
