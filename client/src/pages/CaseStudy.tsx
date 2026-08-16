import { Link, useRoute } from "wouter";
import { ArrowLeft, Apple, Github, ExternalLink } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { renderMarkdown } from "@/lib/markdown";
import { getCaseStudy, caseStudyUrl } from "@/lib/case-studies";
import { SITE_ORIGIN } from "@/lib/posts";
import { breadcrumbList, PERSON_NODE, schemaImages, shareImage, shareImageAlt } from "@/lib/schema";
import { PROJECTS_URL } from "@/pages/Projects";

export default function CaseStudy() {
  const [, params] = useRoute("/projects/:slug");
  const study = params?.slug ? getCaseStudy(params.slug) : undefined;

  useDocumentHead({
    title: study ? `${study.title} — Zubair Muwwakil` : "Project not found — Zubair Muwwakil",
    description: study?.description ?? "This project could not be found.",
    canonical: study ? caseStudyUrl(study.slug) : PROJECTS_URL,
    ogType: study ? "article" : "website",
    image: shareImage(study?.cover, study?.slug),
    imageAlt: shareImageAlt(study, "case study"),
    jsonLd: study
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${caseStudyUrl(study.slug)}#case-study`,
            headline: study.title,
            description: study.description,
            image: schemaImages(study.cover, study.slug),
            datePublished: study.date,
            dateModified: study.date,
            url: caseStudyUrl(study.slug),
            mainEntityOfPage: { "@type": "WebPage", "@id": caseStudyUrl(study.slug) },
            keywords: study.tags,
            author: PERSON_NODE,
            publisher: PERSON_NODE,
            about: {
              "@type": "SoftwareApplication",
              name: study.title,
              ...(study.appStoreUrl
                ? { applicationCategory: "MobileApplication", operatingSystem: "iOS" }
                : { applicationCategory: "WebApplication" }),
              // Bare @id is fine here: author above already carries the full node.
              author: { "@id": `${SITE_ORIGIN}/#person` },
              ...(study.stack.length ? { runtimePlatform: study.stack.join(", ") } : {}),
              ...(study.appStoreUrl || study.liveUrl
                ? { url: study.appStoreUrl || study.liveUrl }
                : {}),
            },
          },
          breadcrumbList([
            { name: "Home", url: `${SITE_ORIGIN}/` },
            { name: "Projects", url: PROJECTS_URL },
            { name: study.title, url: caseStudyUrl(study.slug) },
          ]),
        ]
      : null,
  });

  if (!study) {
    return (
      <BlogLayout>
        <h1 className="font-serif text-4xl font-extrabold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">That project doesn't exist here.</p>
        <Link href="/projects/" className="text-primary font-semibold underline underline-offset-4">
          Back to all projects
        </Link>
      </BlogLayout>
    );
  }

  const links = [
    study.appStoreUrl && { href: study.appStoreUrl, label: "App Store", icon: Apple, primary: true },
    study.liveUrl && { href: study.liveUrl, label: "Live", icon: ExternalLink },
    study.repoUrl && { href: study.repoUrl, label: "Source", icon: Github },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github; primary?: boolean }[];

  return (
    <BlogLayout>
      <article>
        <header className="mb-10">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
            Case study
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold leading-tight text-gradient">
            {study.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{study.description}</p>

          {study.stack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-border/80 bg-card px-3 py-1 text-xs font-semibold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map(({ href, label, icon: Icon, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-colors ${
                    primary
                      ? "bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          )}
          {study.liveUrl && study.liveNote && (
            <p className="mt-3 text-xs text-muted-foreground">{study.liveNote}</p>
          )}
        </header>

        <div className="border-t border-border/60 pt-2">{renderMarkdown(study.body)}</div>
      </article>
    </BlogLayout>
  );
}
