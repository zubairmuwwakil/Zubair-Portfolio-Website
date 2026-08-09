import type { Plugin } from "vite";

/**
 * Hand-written because the plugin stays plain Node ESM: script/ is run directly
 * by `node` (verify-seo.mjs imports the same image reader), so there is no
 * compile step there to emit these.
 */
export declare function shareImageSizes(options: {
  /** Directory to measure — every PNG/JPEG in it becomes a map entry. */
  assetsDir: string;
  /** URL prefix the files are served under. Defaults to `/assets`. */
  urlBase?: string;
}): Plugin;
