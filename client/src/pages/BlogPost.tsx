import { Link, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { renderMarkdown } from "@/lib/markdown";
import { getPost, formatPostDate, postUrl, SITE_ORIGIN, BLOG_INDEX_URL } from "@/lib/posts";
import { breadcrumbList, PERSON_NODE, schemaImages, shareImage, shareImageAlt } from "@/lib/schema";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getPost(params.slug) : undefined;

  useDocumentHead({
    title: post ? `${post.title} — Zubair Muwwakil` : "Post not found — Zubair Muwwakil",
    description: post?.description ?? "This post could not be found.",
    canonical: post ? postUrl(post.slug) : BLOG_INDEX_URL,
    ogType: post ? "article" : "website",
    image: shareImage(post?.cover, post?.slug),
    imageAlt: shareImageAlt(post, "blog post"),
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${postUrl(post.slug)}#post`,
            headline: post.title,
            description: post.description,
            image: schemaImages(post.cover, post.slug),
            datePublished: post.date,
            dateModified: post.date,
            url: postUrl(post.slug),
            mainEntityOfPage: { "@type": "WebPage", "@id": postUrl(post.slug) },
            keywords: post.tags,
            author: PERSON_NODE,
            publisher: PERSON_NODE,
          },
          breadcrumbList([
            { name: "Home", url: `${SITE_ORIGIN}/` },
            { name: "Blog", url: BLOG_INDEX_URL },
            { name: post.title, url: postUrl(post.slug) },
          ]),
        ]
      : null,
  });

  if (!post) {
    return (
      <BlogLayout>
        <h1 className="font-serif text-4xl font-extrabold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">
          That post doesn't exist, or it hasn't been published yet.
        </p>
        <Link href="/blog/" className="text-primary font-semibold underline underline-offset-4">
          Back to all posts
        </Link>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <article>
        <header className="mb-10">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>
          <time
            dateTime={post.date}
            className="block text-xs uppercase tracking-wide text-primary font-semibold"
          >
            {formatPostDate(post.date)}
          </time>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold leading-tight text-gradient">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.description}</p>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
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
        </header>

        <div className="border-t border-border/60 pt-2">{renderMarkdown(post.body)}</div>
      </article>
    </BlogLayout>
  );
}
