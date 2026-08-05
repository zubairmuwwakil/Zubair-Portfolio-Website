import { parseFrontmatter, type Frontmatter } from "./markdown";

export type Post = Frontmatter & {
  slug: string;
  body: string;
};

export const SITE_ORIGIN = "https://zubairmuwwakil.com";

/**
 * Posts are bundled at build time, so a post is a file — there is no runtime
 * fetch and nothing to 404. Adding client/content/blog/<slug>.md is all it
 * takes to publish, except for one manual step: the route must also be added
 * to `reactSnap.include` in package.json or react-snap will never visit it and
 * the post ships without pre-rendered HTML. `script/generate-sitemap.mjs`
 * warns at build time if that step is missed.
 */
const modules = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      ...data,
      body,
      slug: path.split("/").pop()!.replace(/\.md$/, ""),
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function postUrl(slug: string): string {
  return `${SITE_ORIGIN}/blog/${slug}`;
}

export function formatPostDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const [year, month, day] = date.split("-").map(Number);
  // Construct in UTC so the rendered date can't shift a day by timezone —
  // react-snap pre-renders in CI and the browser re-renders in the reader's zone.
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
