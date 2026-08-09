import { readdir, readFile } from "fs/promises";
import path from "path";
import { imageSize } from "./image-size.mjs";

/**
 * Bakes the intrinsic dimensions of every image in public/assets into the
 * bundle as `virtual:share-image-sizes`.
 *
 * og:image:width/height have to be known to client code, because the head is
 * written by a React effect that react-snap then serializes — but the pixel
 * dimensions only exist on disk. This bridges the two at build time, so the
 * tags are derived from the file rather than from a constant somebody has to
 * remember to update. Replace a cover at a different size and the next build
 * simply emits the new numbers.
 *
 * Measuring the file in the browser instead (naturalWidth on a loaded Image)
 * would race the pre-render: react-snap serializes once effects settle, and a
 * head tag that depends on a network fetch may not be written by then.
 */
export function shareImageSizes({ assetsDir, urlBase = "/assets" }) {
  const VIRTUAL_ID = "virtual:share-image-sizes";
  // The \0 prefix is the Rollup convention for "this id is not a real file",
  // which keeps other plugins and the dev server from trying to resolve it.
  const RESOLVED_ID = `\0${VIRTUAL_ID}`;

  return {
    name: "share-image-sizes",

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },

    async load(id) {
      if (id !== RESOLVED_ID) return null;

      const sizes = {};
      for (const entry of await readdir(assetsDir, { withFileTypes: true })) {
        if (!entry.isFile() || !/\.(png|jpe?g)$/i.test(entry.name)) continue;
        const file = path.join(assetsDir, entry.name);
        // Dev: swapping a cover invalidates this module instead of serving the
        // dimensions read when the server started.
        this.addWatchFile(file);
        try {
          sizes[`${urlBase}/${entry.name}`] = imageSize(await readFile(file));
        } catch (err) {
          // Fail the build rather than omit an entry. A missing entry degrades
          // to "emit no dimensions", which is silent and easy to never notice.
          this.error(`Could not read image dimensions for ${entry.name}: ${err.message}`);
        }
      }

      return `export default ${JSON.stringify(sizes)};`;
    },
  };
}
