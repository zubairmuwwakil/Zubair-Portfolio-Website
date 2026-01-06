import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  ChevronDown,
  Code2,
  Database,
  Layout,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ContactForm } from "@/components/ContactForm";
import { 
  useProfile, 
  useProjects, 
  useExperiences, 
  useEducation, 
  useSkills 
} from "@/hooks/use-portfolio";

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const applyTheme = useMemo(
    () => (next: "light" | "dark") => {
      const root = document.documentElement;
      root.classList.remove(next === "dark" ? "light" : "dark");
      root.classList.add(next);
      window.localStorage.setItem("theme", next);
    },
    [],
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: experiences } = useExperiences();
  const { data: education } = useEducation();
  const { data: skills } = useSkills();

  const profileDefaults = {
    name: "Zubair Muwwakil",
    title: "Software Engineer (Full-Stack / Backend)",
    bio: "Finance-informed engineer who builds production APIs, data pipelines, and web apps with reliability, data integrity, and performance top of mind.",
    email: "zmuwwakil@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/zubairmuwwakil/",
    githubUrl: "https://github.com/ZthEchelon",
    resumeUrl: "https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view?usp=sharing",
  };

  const profileData = {
    name: profile?.name || profileDefaults.name,
    title: profileDefaults.title,
    bio: profileDefaults.bio,
    email: profile?.email || profileDefaults.email,
    linkedinUrl: profile?.linkedinUrl || profileDefaults.linkedinUrl,
    githubUrl: profile?.githubUrl || profileDefaults.githubUrl,
    resumeUrl: profile?.resumeUrl || profileDefaults.resumeUrl,
  };

  type SkillLevel = "strong" | "working" | "familiar";
  type SkillDisplay = { name: string; category: string; level?: SkillLevel; proficiency?: number | null };

  const curatedSkills: SkillDisplay[] = [
    { name: "Java (Spring Boot)", category: "core", level: "strong", proficiency: 95 },
    { name: "TypeScript / JavaScript", category: "core", level: "strong", proficiency: 95 },
    { name: "React", category: "core", level: "strong", proficiency: 92 },
    { name: "SQL", category: "core", level: "strong", proficiency: 90 },
    { name: "Node.js", category: "also", level: "working", proficiency: 85 },
    { name: "Python", category: "also", level: "working", proficiency: 82 },
    { name: "Docker", category: "also", level: "working", proficiency: 85 },
    { name: "Postgres", category: "also", level: "working", proficiency: 85 },
    { name: "Prisma", category: "also", level: "working", proficiency: 82 },
    { name: "REST APIs", category: "also", level: "working", proficiency: 88 },
    { name: "Testing (JUnit / Jest)", category: "also", level: "working", proficiency: 82 },
    { name: "CI/CD", category: "also", level: "working", proficiency: 82 },
    { name: "Clean Architecture", category: "practices", level: "strong", proficiency: 95 },
    { name: "API Design", category: "practices", level: "strong", proficiency: 92 },
    { name: "Schema Migrations", category: "practices", level: "working", proficiency: 85 },
    { name: "Observability Basics", category: "practices", level: "working", proficiency: 80 },
  ];

  const mapProficiencyToLevel = (proficiency?: number | null): SkillLevel => {
    if ((proficiency || 0) >= 90) return "strong";
    if ((proficiency || 0) >= 75) return "working";
    return "familiar";
  };

  const displaySkills = (skills?.length ? skills : curatedSkills).map((skill) => ({
    name: skill.name,
    category: skill.category,
    level: "level" in skill ? (skill as SkillDisplay).level : mapProficiencyToLevel(skill.proficiency),
  }));

  const skillsByCategory = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillDisplay[]>);

  const levelStyles: Record<SkillLevel, string> = {
    strong: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    working: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    familiar: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
  };

  const aboutLines = [
    "I ship backend-heavy systems, web apps, and data pipelines with Java/Spring Boot, TypeScript/Node, React, and SQL.",
    "I care about correctness, maintainability, and data integrity—typed contracts, schema migrations, CI/CD, and observability basics.",
    "Built Pickleball Session Manager: scheduling, balancing, and rating logic with Prisma migrations and a pairing algorithm tuned for fair play.",
    "Built a Market Data Pipeline that normalizes indicators, caches responses, and exposes fast APIs for downstream dashboards.",
    "Delivered client web apps and automation as a full-stack developer; I keep UX fast while the backend stays predictable.",
    "Looking for backend or full-stack SWE roles on teams that value reliable, measurable releases.",
  ];

  const lookingForLine = "Backend / Full-Stack SWE roles • Java/Spring Boot or TS/Node • Remote US";

  const proofLinks = [
    { label: "Resume PDF", href: profileData.resumeUrl, icon: FileText },
    { label: "GitHub", href: profileData.githubUrl, icon: Github },
    { label: "LinkedIn", href: profileData.linkedinUrl, icon: Linkedin },
  ];

  type CaseStudy = {
    problem: string;
    built: string;
    decisions: string[];
    impact: string;
    links?: {
      demo?: string;
      github?: string;
      caseStudy?: string;
    };
  };

  const projectCaseStudies: Record<string, CaseStudy> = {
    "Pickleball Session Manager": {
      problem: "Pickleball clubs needed a fair ladders and rating updates without spreadsheets.",
      built: "Full-stack app with Prisma/Postgres and a React front end to schedule sessions, balance pairings, and keep ratings honest.",
      decisions: [
        "Prisma migrations and seed data for players, ladders, and sessions to keep environments reproducible.",
        "Balancing algorithm that pairs players by rating tiers and recent matchups to avoid repeats.",
        "Rating updates applied per match with guardrails for defaults/forfeits and audit-friendly history.",
        "Role-based admin surface so captains can open sessions, lock courts, and override scores safely.",
      ],
      impact: "Sessions stay balanced and schedulers stopped spending nights in spreadsheets.",
      links: {
        demo: "https://pickleball.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/pickleball-session-manager",
        caseStudy: profileData.resumeUrl,
      },
      photo: "https://i.imgur.com/c60r2XZ.jpeg",
    },
    "Market Data Pipeline": {
        photo: "https://i.imgur.com/vJnpwps.png",
      problem: "Needed reliable, de-duplicated market indicators for dashboards without hammering upstream APIs.",
      built: "Backend pipeline that ingests price/indicator feeds, normalizes them into Postgres, and serves typed REST endpoints.",
      decisions: [
        "Idempotent ingest jobs with upserts keyed by symbol/date to prevent duplicate rows across retries.",
        "Caching hot indicator queries to cut API calls and keep dashboard latency predictable.",
        "Normalized indicator tables with indexes by symbol/timeframe for fast slices and joins.",
        "Contract-tested REST endpoints with sample payloads to keep downstream teams unblocked.",
      ],
      impact: "Consistent indicator data, faster dashboards, and predictable costs when third-party APIs rate-limit.",
      links: {
        demo: "https://marketdata.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/market-data-pipeline",
        caseStudy: profileData.resumeUrl,
      },
    },
    "MindSky Website": {
        photo: "https://i.imgur.com/3Sz7oXy.png",
      problem: "MindSky needed a fast, clear landing page that converts curious users without looking like a template.",
      built: "Responsive marketing site with modular sections, analytics hooks, and lightweight animations.",
      decisions: [
        "Static-first build for instant page loads and SEO wins.",
        "Composable content blocks so non-engineers can swap copy without breaking layout.",
        "Accessibility checks and mobile-first spacing to keep bounce rate low.",
      ],
      impact: "Sharper storytelling with a site that loads fast and looks intentional on every device.",
      links: {
        demo: "https://mindsky.zubairmuwwakil.com",
        github: profileData.githubUrl,
        caseStudy: profileData.resumeUrl,
      },
    },
    "Return Reminder & Tracking SaaS": {
        photo: "https://i.imgur.com/3mFeClS.png",
      problem: "Consumers frequently miss return deadlines or forget to follow up on refunds because purchase information is fragmented across emails and receipts. Most finance tools track spending passively but don’t manage return lifecycles or enforce deadlines.",
      built: "SaaS platform for tracking return deadlines, refund status, and money at risk—email ingestion, reminders, and Stripe subscriptions included.",
      decisions: [
        "Stripe subscription model with webhook-driven state to manage plan changes, access limits, and entitlements without coupling billing logic to request flows.",
        "Idempotent webhook handling using event IDs to prevent duplicate state transitions during retries.",
        "Role-based access control (RBAC) separating free vs paid capabilities (active return limits, refund reminders).",
        "Email-as-input, dashboard-as-source-of-truth to minimize user friction while keeping system state explicit and auditable.",
        "Deterministic background jobs for deadline and refund reminders, ensuring retries don’t double-send notifications.",
        "Policy-based deadline computation using merchant templates with user overrides instead of brittle receipt parsing."
      ],
      impact: [
        "Demonstrated end-to-end SaaS architecture: auth, billing, webhooks, background jobs, and stateful workflows.",
        "Prevented missed return deadlines by surfacing time-bound “money at risk” with proactive reminders.",
        "Reliable ingestion from inconsistent email formats without requiring bank access or inbox-wide permissions.",
        "Clear operational visibility with traceable events from email ingestion through reminders and refunds."
      ].join("\n"),
      links: {
        demo: "https://returnreminder.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/return-reminder-saas",
        caseStudy: "https://returnreminder.zubairmuwwakil.com/case-study",
      },
      stack: [
        "Node",
        "Postgres",
        "Stripe Subscriptions",
        "Webhooks",
        "Background jobs",
        "Email ingestion"
      ],
    },
  };

  const orderedProjects = (projects || []).slice().sort((a, b) => {
    const aFeatured = projectCaseStudies[a.title] ? 1 : 0;
    const bFeatured = projectCaseStudies[b.title] ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    return (a.id || 0) - (b.id || 0);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!profile && !projects && !experiences) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - updated to match provided HTML/CSS */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="p-0 group-hover:scale-110 transition-transform">
                <img src="https://i.imgur.com/hu5ZtjL.jpeg" alt="Logo" className="w-9 h-9 object-cover rounded-lg shadow" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">Zubair Muwwakil</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">About</a>
              <a href="#experience" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Professional Journey</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Projects</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Contact</a>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-9 w-9 rounded-full"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3c.132 0 .263 0 .393.01a7.5 7.5 0 0 0 8.598 8.598A9 9 0 1 1 12 3Z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                )}
              </button>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 py-2 rounded-full px-6 font-semibold">Hire Me</a>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-9 w-9 rounded-full"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3c.132 0 .263 0 .393.01a7.5 7.5 0 0 0 8.598 8.598A9 9 0 1 1 12 3Z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                )}
              </button>
              <button className="text-foreground hover:text-primary transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - new style from user HTML */}
      <section className="relative min-h-[60vh] flex items-center pt-6 md:pt-10 pb-8 md:pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="container-padding relative z-10 w-full flex justify-center">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center max-w-6xl w-full mx-auto">
            <div className="space-y-4 md:space-y-6">
              <div className="mt-12 mb-8">
                <div className="whitespace-nowrap inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border [border-color:var(--badge-outline)] shadow-xs px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
                  Software Engineer (Full-Stack / Backend)
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Building reliable systems <br />and the products that use them
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                I ship web apps and data pipelines with a focus on reliability, data integrity, performance, and clean architecture. Finance background, SWE-first mindset: strong schemas, predictable APIs, and observability over vibes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#projects" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 rounded-full px-8 text-base h-12 flex items-center gap-2">
                  View Projects
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
                <a href="https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 rounded-full px-8 text-base h-12 flex items-center gap-2">
                  Resume (PDF)
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="whitespace-nowrap inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm">Java / Spring Boot • React • SQL • Docker</div>
                <div className="whitespace-nowrap inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm">Built data pipelines + web apps</div>
                <div className="whitespace-nowrap inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm">Open to US remote (US citizen)</div>
              </div>
              <div className="flex gap-6 pt-4 text-muted-foreground">
                <a href="https://github.com/ZthEchelon" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>
                <a href="https://linkedin.com/in/zubairmuwwakil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="mailto:zmuwwakil@gmail.com" className="hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-8 border-background shadow-2xl">
                <img
                  src="https://i.imgur.com/aUXrp54.jpeg"
                  alt="Zubair Muwwakil Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-10 -left-10 bg-background p-4 rounded-xl shadow-lg border z-20" style={{ transform: "translateY(-16.8585px)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal w-8 h-8 text-blue-500"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
              </div>
              <div className="absolute bottom-10 -right-10 bg-background p-4 rounded-xl shadow-lg border z-20" style={{ transform: "translateY(19.9851px)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-line w-8 h-8 text-green-500"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down w-6 h-6"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="About" 
            subtitle="Evidence over hype—what I build, how I build it, and where I'm headed."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-8 shadow-sm">
              <div className="grid gap-3">
                {aboutLines.map((line) => (
                  <p key={line} className="text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border/60 p-6">
                <h3 className="text-lg font-semibold font-display mb-2">What I'm looking for</h3>
                <p className="text-muted-foreground leading-relaxed">{lookingForLine}</p>
              </div>

              <div className="bg-card rounded-2xl border border-border/60 p-6">
                <h3 className="text-lg font-semibold font-display mb-4">Proof / Links</h3>
                <div className="space-y-3">
                  {proofLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <span className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="font-medium">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Technical Skills" 
            subtitle="Signals I lean on: strong foundations, reliable delivery, and systems that hold up."
            centered 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory || {}).map(([category, categorySkills], idx) => {
              const icons = {
                'core': <Server className="w-6 h-6 text-primary" />,
                'also': <Layout className="w-6 h-6 text-primary" />,
                'practices': <Database className="w-6 h-6 text-primary" />,
              };

              const categoryLabels: Record<string, string> = {
                core: "Core stack",
                also: "Also use",
                practices: "Practices",
              };
              
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {icons[category as keyof typeof icons] || <Code2 className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{categoryLabels[category] || "Toolkit"}</p>
                      <h3 className="text-lg font-bold font-display capitalize">{category}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span 
                        key={skill.name}
                        className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium inline-flex items-center gap-2"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className={`text-[11px] px-2 py-0.5 rounded-full ${levelStyles[skill.level]}`}>
                            {skill.level === "strong" ? "Strong" : skill.level === "working" ? "Working" : "Familiar"}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Professional Journey" 
            subtitle="Impact snapshots from recent roles."
          />
          
          <div className="space-y-12">
            {experiences?.map((exp, index) => (
              <ExperienceItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold font-display mb-8">Education</h3>
            <div className="grid gap-6">
              {education?.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-bold font-display">{edu.school}</h4>
                    <p className="text-primary font-medium">{edu.degree}, {edu.field}</p>
                  </div>
                  <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                    {edu.school === "University of Toronto"
                      ? `${edu.startDate?.split("-")[0] || edu.startDate} - ${edu.endDate?.split("-")[0] || "Present"}`
                      : edu.startDate?.split("-")[0] || edu.startDate}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Case Studies" 
            subtitle="What I built, why I built it that way, and how it performs."
            centered
          />
          {/* Render all project cards from orderedProjects, and always include Return Reminder & Tracking SaaS */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {orderedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                caseStudy={projectCaseStudies[project.title]} 
                index={index} 
              />
            ))}
            {/* Always show Return Reminder & Tracking SaaS if not already in the list */}
            {!orderedProjects.some(p => p.title === "Return Reminder & Tracking SaaS") && (
              <ProjectCard 
                key="return-reminder-tracking-saas"
                project={{
                  id: "return-reminder-tracking-saas",
                  title: "Return Reminder & Tracking SaaS",
                  description: projectCaseStudies["Return Reminder & Tracking SaaS"].problem,
                  stack: projectCaseStudies["Return Reminder & Tracking SaaS"].stack,
                }}
                caseStudy={projectCaseStudies["Return Reminder & Tracking SaaS"]}
                index={orderedProjects.length}
              />
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader 
                title="Let's Work Together" 
                subtitle="Email or LinkedIn is fastest; the form routes straight to my inbox."
              />
              
              <div className="space-y-8 mt-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Email Me</h4>
                    <p className="text-muted-foreground mb-2">Best for detailed notes or links—I'll reply with next steps.</p>
                    <a href={`mailto:${profileData.email}`} className="text-primary font-medium hover:underline">
                      {profileData.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display mb-1">Connect on LinkedIn</h4>
                    <p className="text-muted-foreground mb-2">Quick intros and updates—mention the role you have in mind.</p>
                    <a 
                      href={profileData.linkedinUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved. Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
