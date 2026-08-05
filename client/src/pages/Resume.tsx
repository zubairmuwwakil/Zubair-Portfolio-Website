import { Download, Mail, Linkedin, Github } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";
import { SITE_ORIGIN } from "@/lib/posts";
import { profile, contactEmail } from "@/data/portfolio";
import resumeRaw from "../../content/resume.md?raw";

export const RESUME_URL = `${SITE_ORIGIN}/resume/`;
export const RESUME_PDF_URL = "/resume.pdf";

const { data, body } = parseFrontmatter(resumeRaw);

export default function Resume() {
  useDocumentHead({
    title: "Résumé — Zubair Muwwakil, Backend / Full-Stack Software Engineer",
    description: data.description,
    canonical: RESUME_URL,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${RESUME_URL}#resume`,
      name: "Résumé — Zubair Muwwakil",
      url: RESUME_URL,
      dateModified: data.date,
      mainEntity: { "@id": `${SITE_ORIGIN}/#person` },
    },
  });

  return (
    <BlogLayout>
      <article>
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
            Résumé
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold leading-tight text-gradient">
            Zubair Muwwakil
          </h1>
          <p className="mt-2 text-lg text-foreground font-semibold">
            Backend / Full-Stack Software Engineer
          </p>

          {/* Phone deliberately omitted: this page is indexed, and a number on
              an indexed page is scraped into spam lists within days. It stays in
              the downloadable PDF. */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={RESUME_PDF_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </header>

        <div className="border-t border-border/60 pt-2">{renderMarkdown(body)}</div>
      </article>
    </BlogLayout>
  );
}
