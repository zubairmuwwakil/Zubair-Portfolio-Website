import { Apple, Github, ExternalLink, FileText } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { useProjects } from "@/hooks/use-portfolio";
import { SITE_ORIGIN } from "@/lib/posts";

export const PROJECTS_URL = `${SITE_ORIGIN}/projects/`;

export default function Projects() {
  const { data: projects } = useProjects();
  const list = projects ?? [];

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
      hasPart: list.map((project) => ({
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
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

      <ul className="space-y-6">
        {list.map((project) => {
          const links = [
            project.appStoreLink && {
              href: project.appStoreLink,
              label: "App Store",
              icon: Apple,
              primary: true,
            },
            project.link && { href: project.link, label: "Live", icon: ExternalLink },
            project.githubLink && { href: project.githubLink, label: "Source", icon: Github },
            project.caseStudyUrl && {
              href: project.caseStudyUrl,
              label: "Case study",
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
                {project.title}
              </h2>
              <p className="mt-2 text-foreground/80 leading-relaxed">{project.description}</p>

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
    </BlogLayout>
  );
}
