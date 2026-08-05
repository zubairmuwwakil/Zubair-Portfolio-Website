import { parseFrontmatter } from "./markdown";
import { SITE_ORIGIN } from "./posts";

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  body: string;
};

/**
 * Case studies live as markdown beside the blog posts, for the same reason:
 * adding a file is the whole publishing step, and the content is bundled at
 * build time so there is nothing to fetch and nothing to 404.
 *
 * As with posts, a new case study must also be added to `reactSnap.include` in
 * package.json or it ships without pre-rendered HTML. generate-sitemap.mjs
 * warns at build time if that is missed.
 */
const modules = import.meta.glob("../../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Frontmatter here carries a few fields the blog's parser doesn't model. */
function extraField(raw: string, key: string): string | undefined {
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return undefined;
  const line = block[1].split(/\r?\n/).find((l) => l.startsWith(`${key}:`));
  if (!line) return undefined;
  const value = line.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
  return value || undefined;
}

function listField(raw: string, key: string): string[] {
  const value = extraField(raw, key);
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

export const caseStudies: CaseStudy[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      ...data,
      body,
      slug: path.split("/").pop()!.replace(/\.md$/, ""),
      stack: listField(raw, "stack"),
      liveUrl: extraField(raw, "liveUrl"),
      repoUrl: extraField(raw, "repoUrl"),
      appStoreUrl: extraField(raw, "appStoreUrl"),
    };
  })
  .filter((study) => !("draft" in study && study.draft));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Trailing slash: pre-rendered routes are served from directories. */
export function caseStudyUrl(slug: string): string {
  return `${SITE_ORIGIN}/projects/${slug}/`;
}
