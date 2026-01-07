import { execSync, spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reactSnapBin = path.resolve(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  process.platform === "win32" ? "react-snap.cmd" : "react-snap",
);

function findChromeExecutable() {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && existsSync(fromEnv)) {
    return fromEnv;
  }

  const whichChrome = (...bins) => {
    for (const bin of bins) {
      try {
        const found = execSync(`which ${bin}`, { stdio: ["ignore", "pipe", "pipe"] })
          .toString()
          .trim();
        if (found && existsSync(found)) {
          return found;
        }
      } catch {
        // ignore
      }
    }
    return undefined;
  };

  const systemChrome =
    whichChrome("google-chrome", "google-chrome-stable", "chromium-browser", "chromium") ||
    (process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ].find((p) => existsSync(p))
      : undefined);
  if (systemChrome) {
    return systemChrome;
  }

  try {
    const puppeteer = require("puppeteer");
    if (typeof puppeteer.executablePath === "function") {
      return puppeteer.executablePath();
    }
    if (typeof puppeteer.executablePath === "string") {
      return puppeteer.executablePath;
    }
  } catch (err) {
    console.warn("Could not resolve puppeteer executable:", err);
  }
  return undefined;
}

const resolvedChrome =
  process.env.PUPPETEER_EXECUTABLE_PATH || findChromeExecutable();

const env = {
  ...process.env,
  ...(resolvedChrome ? { PUPPETEER_EXECUTABLE_PATH: resolvedChrome } : {}),
};

await new Promise((resolve, reject) => {
  const child = spawn(reactSnapBin, {
    stdio: "inherit",
    env,
  });

  child.on("close", (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`react-snap exited with code ${code}`));
    }
  });
  child.on("error", reject);
});
