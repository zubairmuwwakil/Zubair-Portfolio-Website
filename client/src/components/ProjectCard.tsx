import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Tag, FileText, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

type CaseStudy = {
  problem: string;
  built: string;
  decisions: string[];
  impact: string | string[];
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  photo?: string;
};

interface ProjectCardProps {
  project: Project;
  caseStudy?: CaseStudy;
  index: number;
}

export function ProjectCard({ project, caseStudy, index }: ProjectCardProps) {
  const [showModal, setShowModal] = useState(false);
  const links = {
    demo: caseStudy?.links?.demo ?? project.link,
    github: caseStudy?.links?.github ?? project.githubLink,
    caseStudy: caseStudy?.links?.caseStudy ?? project.githubLink ?? project.link,
  };

  const decisions = (caseStudy?.decisions || []).slice(0, 3);
  const impactItems = Array.isArray(caseStudy?.impact)
    ? caseStudy?.impact
    : caseStudy?.impact
      ? [caseStudy.impact]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Case Study Header - Modern Style */}
      <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-0">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-secondary text-secondary-foreground rounded-full break-words">
              {project.title}
            </div>
            <span className="text-sm text-muted-foreground">
              {caseStudy?.built || project.description}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Stack badges: prefer project.stack, fallback to project.tags */}
            {Array.isArray(project.stack) && project.stack.length > 0
              ? project.stack.slice(0, 3).map((tech) => (
                  <div key={tech} className="inline-flex items-center rounded-md px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border [border-color:var(--badge-outline)] shadow-xs text-xs break-words">
                    {tech}
                  </div>
                ))
              : project.tags?.slice(0, 3).map((tag) => (
                  <div key={tag} className="inline-flex items-center rounded-md px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border [border-color:var(--badge-outline)] shadow-xs text-xs break-words">
                    {tag}
                  </div>
                ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3"></div>
      </div>

      {/* ...existing code for image, details, and footer... */}
      <div className="relative h-44 overflow-hidden bg-muted">
        {/* Clickable image for modal expansion */}
        {caseStudy?.photo ? (
          <img
            src={caseStudy.photo}
            alt={project.title}
            className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
            style={{ aspectRatio: '16/7', background: '#f3f4f6' }}
            onClick={() => setShowModal(true)}
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
            style={{ aspectRatio: '16/7', background: '#f3f4f6' }}
            onClick={() => setShowModal(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-lg">
            <Tag className="w-12 h-12 text-primary/20" />
          </div>
        )}
              {/* Modal for expanded image */}
              {showModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
                  onClick={() => setShowModal(false)}
                >
                  <div
                    className="relative max-w-3xl w-full mx-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow"
                      onClick={() => setShowModal(false)}
                      aria-label="Close expanded image"
                    >
                      <X className="w-6 h-6 text-black" />
                    </button>
                    <img
                      src={caseStudy?.photo || project.imageUrl}
                      alt={project.title}
                      className="w-full h-auto max-h-[80vh] rounded-xl object-contain bg-white"
                    />
                  </div>
                </div>
              )}
        {/* Remove overlay links for any project with a caseStudy.photo */}
        {!caseStudy?.photo && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* ...existing code for details... */}

        {caseStudy?.problem && (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Problem</p>
            <p className="text-foreground text-sm leading-relaxed">{caseStudy.problem}</p>
          </div>
        )}

        {decisions.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Key technical decisions</p>
            <ul className="space-y-2 text-sm text-foreground">
              {decisions.map((decision) => (
                <li key={decision} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="leading-relaxed">{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {impactItems.length > 0 && (
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
            <p className="text-xs uppercase tracking-wide text-primary mb-1">Result</p>
            <ul className="space-y-1 text-sm text-foreground">
              {impactItems.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Stack badges removed from bottom as requested */}
      </div>

      <div className="px-6 py-4 border-t border-border/50 flex flex-wrap gap-3">
        {links.demo && (
          <a 
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        )}
        {links.github && (
          <a 
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        )}
        {links.caseStudy && (
          <a 
            href={links.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-semibold shadow-lg shadow-black/15 hover:brightness-95 transition-colors"
          >
            <FileText className="w-4 h-4" /> Read Case Study
          </a>
        )}
      </div>
    </motion.div>
  );
}
