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
