import { Link } from "wouter";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { posts, formatPostDate, SITE_ORIGIN } from "@/lib/posts";

export default function Blog() {
  useDocumentHead({
    title: "Blog — Zubair Muwwakil",
    description:
      "Notes on backend engineering, offline-first sync, and shipping production software, by Zubair Muwwakil.",
    canonical: `${SITE_ORIGIN}/blog`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_ORIGIN}/blog#blog`,
      name: "Zubair Muwwakil — Blog",
      url: `${SITE_ORIGIN}/blog`,
      author: { "@id": `${SITE_ORIGIN}/#person` },
    },
  });

  return (
    <BlogLayout>
      <header className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">
          Writing
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight text-gradient">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Notes on backend engineering and the decisions behind things I've shipped.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-lg shadow-primary/10 hover:-translate-y-1 hover:shadow-primary/25 transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                <time
                  dateTime={post.date}
                  className="text-xs uppercase tracking-wide text-primary font-semibold"
                >
                  {formatPostDate(post.date)}
                </time>
                <h2 className="mt-2 text-2xl font-extrabold font-display leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-foreground/80 leading-relaxed">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-border/80 bg-card px-3 py-1 text-xs font-semibold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </BlogLayout>
  );
}
