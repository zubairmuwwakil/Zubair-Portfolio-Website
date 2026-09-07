import { Shield, Mail, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";
import { SITE_ORIGIN } from "@/lib/posts";
import { contactEmail } from "@/data/portfolio";
import privacyRaw from "../../content/privacy.md?raw";

export const PRIVACY_URL = `${SITE_ORIGIN}/privacy/`;

const { data, body } = parseFrontmatter(privacyRaw);

export default function Privacy() {
  useDocumentHead({
    title: "Privacy Policy — LLM4LIFE — Zubair Muwwakil",
    description: data.description,
    canonical: PRIVACY_URL,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PRIVACY_URL}#privacy`,
      name: "Privacy Policy — LLM4LIFE — Zubair Muwwakil",
      url: PRIVACY_URL,
      dateModified: data.date,
      mainEntity: { "@id": `${SITE_ORIGIN}/#person` },
    },
  });

  return (
    <BlogLayout>
      <article>
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Legal & Privacy
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold leading-tight text-gradient">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg text-foreground font-semibold">
            LLM4LIFE & Personal Software Applications
          </p>
          <p className="mt-1 text-sm text-muted-foreground font-mono">
            Last updated: September 7, 2026
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${contactEmail}?subject=Privacy%20Inquiry%20-%20LLM4LIFE`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Privacy Officer
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
          </div>
        </header>

        <div className="border-t border-border/60 pt-4">
          {renderMarkdown(body)}
        </div>
      </article>
    </BlogLayout>
  );
}
