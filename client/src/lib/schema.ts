import shareImageSizes from "virtual:share-image-sizes";
import { SITE_ORIGIN } from "./posts";

/**
 * Shared JSON-LD pieces for the content routes.
 *
 * These live together because each one encodes a specific Google requirement
 * that isn't obvious from the shape of the markup, and duplicating them across
 * CaseStudy and BlogPost is how they drift. `script/verify-seo.mjs` asserts the
 * rendered output of everything here.
 *
 * Worth knowing when reading this: only some schema.org types are eligible for
 * a rich result. Article, BlogPosting, BreadcrumbList and SoftwareApplication
 * are; Person and WebSite (the two in index.html) are not, which is why the
 * Rich Results Test reports nothing for the homepage and that is correct.
 */

export const DEFAULT_SHARE_IMAGE = `${SITE_ORIGIN}/assets/og-card.png`;

/**
 * Must stay in step with the og:image:alt in index.html, which is the copy that
 * serves the homepage. That duplication is unavoidable — index.html is static
 * and cannot import this — but it is not unguarded: verify-seo compares the alt
 * every page declares against the image it points at, so a version of this that
 * disagreed with index.html would surface as og-card.png being described two
 * ways and fail the build.
 */
export const DEFAULT_SHARE_IMAGE_ALT =
  "Zubair Muwwakil — Backend / Full-Stack Software Engineer, Brooklyn, NY";

/**
 * Cover art is authored in frontmatter as a site-absolute path, because that is
 * the form the page's own <img> tags need. og:image and schema `image` both
 * require a fully-qualified URL, so every metadata use goes through here.
 *
 * Falls back to the generic card so a post without art still shares cleanly.
 */
export function shareImage(cover?: string): string {
  if (!cover) return DEFAULT_SHARE_IMAGE;
  return cover.startsWith("http") ? cover : `${SITE_ORIGIN}${cover}`;
}

/**
 * What a page's share image depicts, paired with the image `shareImage` returns.
 *
 * Both arguments are needed, because the answer turns on whether the page has
 * cover art at all rather than on whether it has alt text. A page with no cover
 * shares the generic card and inherits its description; a page whose cover has
 * no `coverAlt` in frontmatter gets null, which strips the tag index.html
 * shipped instead of leaving it describing a picture this page doesn't show.
 *
 * Losing the tag costs a screen reader a description of the card. Keeping a
 * wrong one costs them a confident, plausible description of the wrong image,
 * which they have no way to detect — so null is the safer failure.
 */
export function shareImageAlt(cover?: string, coverAlt?: string): string | null {
  if (!cover) return DEFAULT_SHARE_IMAGE_ALT;
  return coverAlt ?? null;
}

/**
 * Intrinsic pixel size of a share image, measured from the file at build time.
 *
 * og:image:width/height used to be written once in index.html for the 1200x630
 * generic card, and stayed at those numbers while per-route og:image began
 * pointing at 1024x1024 covers — so six pages advertised a shape no image on
 * the site had. Deriving the pair from the file is what stops that recurring
 * the next time a cover is replaced at a different size.
 *
 * Undefined for an image we cannot measure, such as an off-site URL. Callers
 * emit nothing in that case: omitting the dimensions costs an unfurler one
 * extra fetch to discover them, while wrong ones mis-size the card it draws.
 */
export function shareImageSize(image: string): { width: number; height: number } | undefined {
  const assetPath = image.startsWith(SITE_ORIGIN) ? image.slice(SITE_ORIGIN.length) : image;
  return shareImageSizes[assetPath];
}

/**
 * Google's author markup best practices ask for @type and name on the node
 * itself, not a bare @id reference into another block on the page. The @id is
 * kept alongside them so the byline still resolves to the single Person entity
 * declared in index.html instead of standing up a second, unlinked copy.
 */
export const PERSON_NODE = {
  "@id": `${SITE_ORIGIN}/#person`,
  "@type": "Person",
  name: "Zubair Muwwakil",
  url: `${SITE_ORIGIN}/`,
};

/**
 * BreadcrumbList is one of the few rich result types this site is genuinely
 * eligible for. It replaces the raw URL in a search listing with a readable
 * trail, so the trail must mirror the real route hierarchy.
 */
export function breadcrumbList(trail: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
