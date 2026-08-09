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

const absolute = (assetPath: string) =>
  assetPath.startsWith("http") ? assetPath : `${SITE_ORIGIN}${assetPath}`;

/**
 * The 1200x630 share card `npm run cards` renders for a piece of content, or
 * undefined when it has not been generated yet.
 *
 * Keyed off the slug rather than the cover filename, because /projects/pickleops/
 * and the offline-sync blog post share one illustration and must not share one
 * card — they carry different titles. Existence comes from the build-time asset
 * map, so a missing card is a fallback rather than a 404.
 */
function shareCard(slug?: string): string | undefined {
  if (!slug) return undefined;
  const assetPath = `/assets/${slug}-card.png`;
  return shareImageSizes[assetPath] ? assetPath : undefined;
}

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
 * Prefers the generated card: og:image feeds a 1.91:1 slot, and a 1024x1024
 * cover center-crops to it by discarding 244px off the top and bottom — which
 * is exactly where every cover puts its title. Falls back to the cover, then to
 * the generic card, so a page without art still shares cleanly.
 */
export function shareImage(cover?: string, slug?: string): string {
  const card = shareCard(slug);
  if (card) return absolute(card);
  if (!cover) return DEFAULT_SHARE_IMAGE;
  return absolute(cover);
}

/**
 * Schema `image` for an Article or BlogPosting, which is a different question
 * from og:image and gets a different answer.
 *
 * Google's Article guidance asks for 16x9, 4x3 and 1x1 crops of the same
 * subject and says to supply several. 1.91:1 is on none of those lists, while
 * the square cover is precisely the 1x1 case — so pointing this at the card
 * alone would trade a recommended shape for an unrecommended one. Both go in,
 * card first, since the first entry is what most consumers take.
 *
 * og:image cannot do this: it is a single URL by definition.
 */
export function schemaImages(cover?: string, slug?: string): string | string[] {
  const card = shareCard(slug);
  const urls = [card, cover].filter((v): v is string => Boolean(v)).map(absolute);
  if (!urls.length) return DEFAULT_SHARE_IMAGE;
  return urls.length === 1 ? urls[0] : urls;
}

/** The two shapes of content that get a card, and how each one refers to its art. */
const CARD_KIND = {
  "case study": { label: "Case study card", art: "the project's cover illustration" },
  "blog post": { label: "Blog post card", art: "the post's cover illustration" },
} as const;

/**
 * Mirrors MAX_PILLS in script/generate-share-cards.mjs. Kept in step by hand
 * because that script is plain Node ESM and this is bundled TypeScript; the
 * consequence of drift is an alt that lists a pill the card cropped, which is
 * mild next to the alternative of the two files importing across that boundary.
 */
const CARD_PILL_LIMIT = 4;

type CardContent = {
  slug?: string;
  title?: string;
  cover?: string;
  coverAlt?: string;
  stack?: string[];
  tags?: string[];
};

/**
 * What a page's share image depicts, paired with the image `shareImage` returns.
 *
 * For a page with a generated card this is composed rather than authored, because
 * the card is itself composed: the largest thing on it is the title, under an
 * eyebrow and over the stack pills. Alt text written by hand described the cover
 * illustration instead — true of the square cover that used to be og:image, and
 * an odd thing to say about a card whose art is a small inset panel. Composing
 * from the same title and pills the card renders means a retitled piece of
 * content cannot leave a card described by its old name.
 *
 * The illustration is named but not described. Its own text is illegible at the
 * size the card insets it, so repeating `coverAlt` here would assert detail a
 * sighted reader cannot check. `coverAlt` still answers for the cover itself,
 * which is what og:image falls back to when a card has not been generated.
 *
 * Null when there is cover art but nothing to say about it, which strips the tag
 * index.html shipped rather than leave it describing another picture: losing the
 * tag costs a screen reader a description, while keeping a wrong one costs them a
 * confident, plausible description of the wrong image.
 */
export function shareImageAlt(
  content: CardContent | undefined,
  kind: keyof typeof CARD_KIND,
): string | null {
  const { slug, title, cover, coverAlt, stack = [], tags = [] } = content ?? {};

  if (title && shareCard(slug)) {
    const { label, art } = CARD_KIND[kind];
    const pills = (stack.length ? stack : tags).slice(0, CARD_PILL_LIMIT);
    return [
      `${label} for ${title}`,
      pills.length ? `tagged ${pills.join(", ")}` : "",
      `beside ${art}`,
    ]
      .filter(Boolean)
      .join(", ");
  }

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
