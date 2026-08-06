import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { profile as profileTable, experiences as experiencesTable, education as educationTable, projects as projectsTable, skills as skillsTable } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed Data
  const profileSeed = {
    name: "Zubair Muwwakil",
    title: "Software Engineer (Full-Stack / Backend)",
    bio: "Finance-informed engineer who builds production APIs, data pipelines, and web apps with reliability, data integrity, and performance top of mind.",
    email: "zmuwwakil@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/zubairmuwwakil/",
    githubUrl: "https://github.com/zubairmuwwakil",
    resumeUrl: "https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view?usp=sharing"
  };

  const experiencesSeed = [
    {
      company: "G2i Inc.",
      role: "Software Engineer (Part-time)",
      startDate: "Aug 2025",
      endDate: "Present",
      description: [
        "Tech: Python, SQL, Git/GitHub, CI/CD; delivered scoped software tasks with correctness, maintainability, and clean handoff in mind.",
        "Worked in a GitHub PR workflow with CI checks (branching, reviews, verification) to keep changes safe and releasable.",
        "Built and validated SQL queries/transformations to support features, debugging, and data correctness checks.",
        "Collaborated asynchronously in a remote setup, shipping incremental improvements with clear updates and documentation."
      ].join("\n")
    },
    {
      company: "The Senac Group",
      role: "Financial Software Analyst",
      startDate: "Jun 2023",
      endDate: "May 2025",
      description: [
        "Tech: Excel, VBA, SQL, reporting pipelines, budgeting/forecast models, documentation/runbooks.",
        "Built automated reporting pipelines (SQL → Excel/VBA output) removing 10+ hours/week of manual work and standardizing weekly deliverables.",
        "Created budgeting/variance dashboards with validation checks and guardrails, cutting formula defects by ~30% and improving forecast reliability.",
        "Produced scenario + cost/benefit models surfacing $25K+ in annual efficiency gains; owned finance tooling ops and wrote repeatable runbooks."
      ].join("\n")
    },
    {
      company: "Elevation Athletics",
      role: "Regional Program Coordinator",
      startDate: "Mar 2023",
      endDate: "Present",
      description: [
        "Tech: TeamSnap API, Excel automation, operational tooling, support workflows, process training.",
        "Built a participant tracking system on the TeamSnap API, increasing onboarding throughput by ~40% via cleaner workflows and automation.",
        "Ran a structured support + triage workflow for 1,000+ users across 8 cities, keeping stakeholders unblocked with clear updates.",
        "Developed Excel automation utilities that reduced game-day data entry/reporting time by ~60%; led tooling/process enablement for staff/coaches."
      ].join("\n")
    },
    {
      company: "NDCTrades",
      role: "Finance Solutions Architect",
      startDate: "Sep 2023",
      endDate: "Sep 2024",
      description: [
        "Tech: QuickBooks, Humanity, workflow automation, reporting dashboards, implementation playbooks.",
        "Automated invoicing + pricing workflows across QuickBooks/Humanity, increasing recurring revenue by ~20% while reducing operational errors.",
        "Streamlined payroll via data cleanup and automated checks, cutting processing time by ~35% and improving correctness.",
        "Built compliance/performance dashboards so risks surfaced earlier; wrote reusable implementation templates to standardize customer setups."
      ].join("\n")
    }
  ];

  const educationSeed = [
    {
      school: "York University",
      degree: "French Language Studies",
      field: "Language Studies",
      startDate: "2025",
      endDate: "2025"
    },
    {
      school: "Ted Rogers School of Management - Toronto Metropolitan University",
      degree: "Advanced Digital and Professional Training",
      field: "Professional Development",
      startDate: "2025",
      endDate: "2025"
    },
    {
      school: "University of Calgary",
      degree: "Microsoft Certified: Azure Fundamentals",
      field: "Cloud Computing",
      startDate: "2024",
      endDate: "2024"
    },
    {
      school: "University of Toronto",
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      startDate: "2019",
      endDate: "2023"
    }
  ];

  const projectsSeed = [
    {
      title: "Pickleball Session Manager",
      description: "Full-stack ladder manager with scheduling, pairing, and rating updates to keep club play fair.",
      link: "https://pickleball.zubairmuwwakil.com",
      githubLink: "https://github.com/zubairmuwwakil/pickleball-session-manager",
      tags: ["React", "Prisma", "Postgres", "TypeScript", "Auth"]
    },
    {
      title: "Market Data Pipeline",
      description: "Backend pipeline that ingests, normalizes, and serves financial indicators via REST APIs.",
      link: "https://github.com/zubairmuwwakil/marketdata",
      githubLink: "https://github.com/zubairmuwwakil/marketdata",
      tags: ["Java", "Spring Boot", "SQL", "Caching", "APIs"]
    },
    {
      title: "MindSky Website",
      description: "Fast marketing site with modular sections, analytics hooks, and responsive design.",
      link: "https://mindsky.zubairmuwwakil.com",
      // No repo link: this previously pointed at the bare GitHub profile, not a
      // repository. See NEEDS-INPUT.md for the correct URL.
      githubLink: null,
      tags: ["React", "TypeScript", "Design Systems"]
    }
  ];

  const skillsSeed = [
    { name: "Java (Spring Boot)", category: "core", proficiency: 95 },
    { name: "TypeScript / JavaScript", category: "core", proficiency: 95 },
    { name: "React", category: "core", proficiency: 92 },
    { name: "SQL", category: "core", proficiency: 90 },
    { name: "Node.js", category: "also", proficiency: 85 },
    { name: "Python", category: "also", proficiency: 82 },
    { name: "Docker", category: "also", proficiency: 85 },
    { name: "Postgres", category: "also", proficiency: 85 },
    { name: "Prisma", category: "also", proficiency: 82 },
    { name: "REST APIs", category: "also", proficiency: 88 },
    { name: "Testing (JUnit / Jest)", category: "also", proficiency: 82 },
    { name: "CI/CD", category: "also", proficiency: 82 },
    { name: "Clean Architecture", category: "practices", proficiency: 95 },
    { name: "API Design", category: "practices", proficiency: 92 },
    { name: "Schema Migrations", category: "practices", proficiency: 85 },
    { name: "Observability Basics", category: "practices", proficiency: 80 },
  ];

  const existingProfile = await storage.getProfile();
  const experienceCount = (await storage.getExperiences()).length;
  const educationCount = (await storage.getEducation()).length;
  const projectCount = (await storage.getProjects()).length;
  const skillCount = (await storage.getSkills()).length;
  const shouldSeed = !existingProfile || existingProfile.title !== profileSeed.title || experienceCount === 0 || projectCount === 0 || educationCount < educationSeed.length || skillCount < skillsSeed.length;

  if (shouldSeed) {
    await db.delete(experiencesTable);
    await db.delete(educationTable);
    await db.delete(projectsTable);
    await db.delete(skillsTable);
    await db.delete(profileTable);

    await storage.createProfile(profileSeed);
    for (const exp of experiencesSeed) {
      await storage.createExperience(exp);
    }
    for (const edu of educationSeed) {
      await storage.createEducation(edu);
    }
    for (const project of projectsSeed) {
      await storage.createProject(project);
    }
    for (const skill of skillsSeed) {
      await storage.createSkill(skill);
    }
  }

  return httpServer;
}
