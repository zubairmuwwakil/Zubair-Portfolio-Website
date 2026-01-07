import { motion } from "framer-motion";
import { Calendar, Building } from "lucide-react";
import type { Experience } from "@/data/portfolio";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const bulletPoints = experience.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative overflow-hidden bg-card/90 border border-border/60 rounded-2xl p-6 shadow-lg shadow-primary/5 hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-70" />

      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
          <Calendar className="w-4 h-4" />
          {experience.startDate} - {experience.endDate || "Present"}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-foreground">
          <Building className="w-4 h-4" />
          {experience.company}
        </span>
      </div>

      <h3 className="text-2xl font-extrabold text-foreground font-display leading-tight">
        {experience.role}
      </h3>
      {experience.subtitle && (
        <p className="text-sm text-muted-foreground mt-2 font-semibold">{experience.subtitle}</p>
      )}

      <div className="mt-5 space-y-3">
        {bulletPoints.length > 0 ? (
          <ul className="space-y-3 text-foreground">
            {bulletPoints.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground font-semibold">{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
