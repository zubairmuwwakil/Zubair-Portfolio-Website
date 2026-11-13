import { Link } from "wouter";
import { Apple, Github, ExternalLink, FileText, ArrowRight } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { useProjects } from "@/hooks/use-portfolio";
import { getCaseStudy } from "@/lib/case-studies";
import { SITE_ORIGIN } from "@/lib/posts";

export const PROJECTS_URL = `${SITE_ORIGIN}/projects/`;

export default function Projects() {
  const { data: projects } = useProjects();
  const list = projects ?? [];
  // Smaller tools and focused integration stories belong alongside the main
  // product portfolio, but shouldn't be misrepresented as shipped businesses.
  const extraStudySlugs = [
    "product-tracker",
    "pickme",
    "inunity",
    "llm4life",
    "agent-orchestrator",
    "dupr-integration",
  ];

  useDocumentHead({
    title: "Projects — Zubair Muwwakil",
    description:
      "Projects by Zubair Muwwakil — a shipped iOS product, a Java data pipeline, and full-stack web apps, with links to live builds and source.",
    canonical: PROJECTS_URL,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PROJECTS_URL}#projects`,
      name: "Projects — Zubair Muwwakil",
      url: PROJECTS_URL,
      author: { "@id": `${SITE_ORIGIN}/#person` },
      // author on each app, not just on the page. Without it the graph only
      // says "Zubair wrote this page about the app" — the edge that connects an
      // off-domain App Store listing back to #person is authorship of the app.
      hasPart: list.map((project) => ({
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        // An App Store URL on a node typed WebApplication contradicts itself,
        // and a contradicted node is a node Google can discount.
        ...(project.appStoreLink
          ? { applicationCategory: "MobileApplication", operatingSystem: "iOS" }
          : { applicationCategory: "WebApplication" }),
        author: { "@id": `${SITE_ORIGIN}/#person` },
        ...(project.appStoreLink || project.link
          ? { url: project.appStoreLink || project.link }
          : {}),
      })),
    },
  });

  return (
    <BlogLayout>
      <header className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">
          Work
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight text-gradient">
          Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Things I've built end to end — shipped products, backend pipelines, and web apps.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="featured-proof-heading">
        <div className="mb-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
            Start here
          </p>
          <h2 id="featured-proof-heading" className="mt-2 font-serif text-2xl md:text-3xl font-bold">
            Three projects that show how I work
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A production sports product, a Java data pipeline, and a financial system.
            Each story includes a short architecture map and links to the actual implementation.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              slug: "pickleops",
              label: "Product engineering",
              title: "Pickleball Social",
              description: "A live product with offline reliability, real users, and the messy details of running leagues.",
            },
            {
              slug: "marketlens",
              label: "Backend and data",
              title: "MarketLens",
              description: "A Java pipeline that handles provider failures, safe ingestion, and honest quote freshness.",
            },
            {
              slug: "inunity",
              label: "Full-stack and finance",
              title: "Inunity",
              description: "A privacy-aware financial ledger built around reliable capture and cautious reconciliation.",
            },
          ].map((featured) => (
            <article key={featured.slug} className="flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide font-semibold text-primary">
                {featured.label}
              </p>
              <h3 className="mt-2 text-xl font-bold font-display">{featured.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <Link
                href={`/projects/${featured.slug}/`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                Read the case study and inspect the proof
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <ul className="space-y-6">
        {list.map((project) => {
          // Prefer the on-domain case study over the Google Drive PDF: the PDF
          // is unindexable and breaks if sharing settings change.
          const onDomainStudy = getCaseStudy(project.slug);
          const links = [
            project.appStoreLink && {
              href: project.appStoreLink,
              label: "App Store",
              icon: Apple,
              primary: true,
            },
            project.link && { href: project.link, label: "Live", icon: ExternalLink },
            project.githubLink && { href: project.githubLink, label: "Source", icon: Github },
            !onDomainStudy && project.caseStudyUrl && {
              href: project.caseStudyUrl,
              label: "Case study (PDF)",
              icon: FileText,
            },
          ].filter(Boolean) as {
            href: string;
            label: string;
            icon: typeof Github;
            primary?: boolean;
          }[];

          return (
            <li
              key={project.id}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-lg shadow-primary/10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
              <h2 className="text-2xl font-extrabold font-display leading-tight">
                {onDomainStudy ? (
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </h2>
              <p className="mt-2 text-foreground/80 leading-relaxed">{project.description}</p>

              {onDomainStudy && (
                <Link
                  href={`/projects/${project.slug}/`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Read the case study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {(project.tags?.length ?? 0) > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-border/80 bg-card px-3 py-1 text-xs font-semibold shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
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
            </li>
          );
        })}
      </ul>

      <section className="mt-16" aria-labelledby="more-stories-heading">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">
          Behind the build
        </p>
        <h2 id="more-stories-heading" className="font-serif text-3xl md:text-4xl font-extrabold leading-tight">
          More engineering stories
        </h2>
        <p className="mt-3 mb-7 text-muted-foreground leading-relaxed">
          The projects that made me think harder about reliability, privacy,
          data ownership and working with other teams. Some are live tools;
          others are still experiments. I explain the difference in each story.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {extraStudySlugs.map((slug) => {
            const study = getCaseStudy(slug);
            if (!study) return null;
            return (
              <article key={slug} className="rounded-xl border border-border/70 bg-card p-5 flex flex-col">
                <h3 className="text-xl font-bold font-display leading-snug">
                  <Link href={`/projects/${slug}/`} className="hover:text-primary transition-colors">
                    {study.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {study.description}
                </p>
                <Link href={`/projects/${slug}/`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Read the story <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </BlogLayout>
  );
}
