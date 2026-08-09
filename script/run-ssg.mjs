import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { findChrome } from "./find-chrome.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reactSnapBin = path.resolve(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  process.platform === "win32" ? "react-snap.cmd" : "react-snap",
);

const resolvedChrome = findChrome();

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
