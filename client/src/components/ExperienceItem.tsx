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
      className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm h-full"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar className="w-4 h-4" />
        <span>
          {experience.startDate} - {experience.endDate || "Present"}
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground font-display">
        {experience.role}
      </h3>
      {experience.subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{experience.subtitle}</p>
      )}

      <div className="flex items-center gap-2 text-primary font-medium mt-2 mb-4">
        <Building className="w-4 h-4" />
        <span>{experience.company}</span>
      </div>

      <div className="space-y-3">
        {bulletPoints.length > 0 ? (
          <ul className="space-y-2 text-foreground">
            {bulletPoints.map((point) => (
              <li key={point} className="flex gap-2 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-muted-foreground">{point}</span>
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
