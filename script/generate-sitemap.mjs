import { readdir, readFile, writeFile, stat } from "fs/promises";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const blogDir = path.resolve(__dirname, "..", "client", "content", "blog");

export const SITE_ORIGIN = "https://zubairmuwwakil.com";

// Reads the `date:` line out of a post's frontmatter so <lastmod> reflects the
// post itself rather than whenever the build happened to run.
function frontmatterDate(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const line = match[1].split(/\r?\n/).find((l) => l.startsWith("date:"));
  if (!line) return null;
  const value = line.slice("date:".length).trim().replace(/^["']|["']$/g, "");
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

async function collectBlogUrls() {
  const isDir = await stat(blogDir).then((s) => s.isDirectory()).catch(() => false);
  if (!isDir) return [];

  const files = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
  const posts = [];
  for (const file of files) {
    const raw = await readFile(path.join(blogDir, file), "utf8");
    if (/^draft:\s*true$/m.test(raw)) continue;
    posts.push({
      loc: `${SITE_ORIGIN}/blog/${file.replace(/\.md$/, "")}`,
      lastmod: frontmatterDate(raw),
      priority: "0.6",
    });
  }
  return posts;
}

function renderSitemap(entries) {
  const urls = entries
    .map(({ loc, lastmod, priority }) =>
      [
        "  <url>",
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const posts = await collectBlogUrls();
  const newest = posts
    .map((p) => p.lastmod)
    .filter(Boolean)
    .sort()
    .pop();

  const entries = [
    { loc: `${SITE_ORIGIN}/`, lastmod: newest, priority: "1.0" },
    ...(posts.length
      ? [{ loc: `${SITE_ORIGIN}/blog`, lastmod: newest, priority: "0.7" }]
      : []),
    ...posts,
  ];

  await writeFile(path.join(distDir, "sitemap.xml"), renderSitemap(entries), "utf8");
  console.log(`Wrote dist/sitemap.xml with ${entries.length} URL(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
