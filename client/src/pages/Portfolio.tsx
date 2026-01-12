import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  ChevronDown,
  Sparkles,
  Bolt,
  TrendingUp,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  PenTool,
  Target,
  Code2,
  Database,
  Layout,
  Server,
  Menu,
  X,
  SquareStack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
// removed ContactForm per request
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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

  type SkillLevel = "familiar";
  type SkillDisplay = { name: string; category: string; level?: SkillLevel; proficiency?: number | null };

  const curatedSkills: SkillDisplay[] = [
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

  const mapProficiencyToLevel = (_?: number | null): SkillLevel => "familiar";

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
    familiar: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
  };

  const aboutLines = [
    "Backend-leaning SWE: APIs, data pipelines, internal tools.",
    "Reliability first: schemas, migrations, idempotency, CI/CD.",
    "Finance background → correctness and auditability mindset.",
    "Shipped multiple real systems (not tutorials).",
    "Targeting backend / full-stack SWE roles (remote US).",
  ];

  const proofBarItems = [
    "3+ yrs building production automation & apps",
    "4 end-to-end systems (auth, DB, APIs, background jobs)",
    "$25k+/yr impact from automation & data tooling",
  ];

  const howIWork = [
    "PR-first workflow with small, reviewable changes.",
    "Tests where they pay off; fast feedback over brittle suites.",
    "Schema migrations over manual DB edits; reversible rollouts.",
    "Idempotent jobs and predictable APIs to avoid surprises.",
    "Typed contracts and clear handoffs to keep teams unblocked.",
  ];

  const heroRoleLine = "Backend / Full-Stack Software Engineer";
  const heroFocusLine = "I build reliable APIs, data pipelines, and production web apps.";
  const heroStackLine = "Java · Spring Boot · TypeScript · SQL · Docker · US Remote (US Citizen)";
  const featuredProjectTitles = [
    "Looply",
    "Market Data Pipeline",
    "Pickleball Session Manager",
    "MindSky Website",
  ];

  const proofLinks = [
    { label: "Resume PDF", href: profileData.resumeUrl, icon: FileText },
    { label: "GitHub", href: profileData.githubUrl, icon: Github },
    { label: "LinkedIn", href: profileData.linkedinUrl, icon: Linkedin },
  ];

  const primaryCtaHref = `mailto:${profileData.email}?subject=Intro%20call%20with%20Zubair&body=Hi%20Zubair%2C%20I%27d%20like%20to%20book%20a%2015-30%20min%20intro%20call.`;

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
    stack?: string[];
  };

  const projectCaseStudies: Record<string, CaseStudy> = {
    "Looply": {
      photo: "https://i.imgur.com/nwmswhT.jpeg",
      problem: "People miss trial endings, renewals, return windows, and overdue refunds because data is scattered across inboxes and receipts—and manual tracking never sticks.",
      built: "Personal finance assistant that auto-tracks subscriptions, bills, purchases, and return/refund deadlines from your inbox and receipts so you stop losing money to forgotten renewals and missed returns.",
      decisions: [
        "Incremental inbox ingestion and receipt parsing that normalizes purchases into a single timeline (proof, order numbers, tracking, deadlines).",
        "Idempotent upserts with merchant/order/date/amount dedupe keys so retries never double-create purchases, subscriptions, or events.",
        "Return shipment and refund SLA timelines to bridge the gap between \"sent it back\" and \"money actually returned.\"",
        "Multi-channel notifications (digest + instant alerts) with quiet hours, snoozes, and job-run tracking to prevent duplicate emails.",
        "Privacy & Control Center with scan modes (receipts/shipping/subscriptions), disconnect + delete/export, and least-privilege OAuth handling.",
        "Pro+ guided flows: cancellation concierge-style checklists, confirmation detection, and structured claim tracking (refund overdue / price drop).",
      ],
      impact: [
        "Fewer missed deadlines via proactive reminders across email, push, and calendar.",
        "Clear \"money saved / money at risk\" visibility that keeps users engaged.",
        "Predictable processing costs through incremental, idempotent scans without inbox hammering.",
      ],
      stack: ["Next.js", "TypeScript", "Prisma", "Neon Postgres"],
      links: {
        demo: "https://looply.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/return-saas",
        caseStudy: "https://drive.google.com/file/d/1PPKatAvsSpp5oTtotDeMg7-0nRwLCxCZ/view?usp=sharing"
      },
    },
    "Pickleball Session Manager": {
      problem: "Pickleball clubs needed fair ladders and rating updates without spreadsheets.",
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
        caseStudy: "https://drive.google.com/file/d/1GaO37v1o1Nnkl51TF8M-C8YZZ3TpPfJg/view?usp=sharing",
      },
      photo: "https://i.imgur.com/c60r2XZ.jpeg",
    },
    "Market Data Pipeline": {
        photo: "https://i.imgur.com/vJnpwps.png",
      problem: "Needed reliable, de-duplicated market indicators for dashboards without hammering upstream APIs.",
      built: "Backend pipeline that ingests price/indicator feeds, normalizes them into Postgres, and serves typed REST endpoints.",
      decisions: [
        "Idempotent ingest jobs with upserts keyed by symbol/date to stop duplicate rows across retries.",
        "Cached hot indicator queries to cut upstream calls and keep dashboard latency predictable.",
        "Normalized indicator tables + contract-tested REST endpoints for fast, typed slices.",
      ],
      impact: [
        "Consistent indicator data and faster dashboards under rate limits.",
        "Predictable costs by reducing upstream API churn.",
      ],
      links: {
        demo: "https://marketdata.zubairmuwwakil.com",
        github: "https://github.com/ZthEchelon/market-data-pipeline",
        caseStudy: "https://drive.google.com/file/d/10SKFD0k5hVxm7qH6rpWVVNmZubGuktZO/view?usp=sharing",
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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

  const projectByTitle = new Map((projects || []).map((p) => [p.title, p]));
  const [featuredModal, setFeaturedModal] = useState<{ src: string; title: string } | null>(null);
  const hasExperiences = (experiences?.length || 0) > 0;

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
    <div className={`min-h-screen ${theme === "dark" ? "page-dark" : "page-light"}`}>
      {/* Navigation - updated to match provided HTML/CSS */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark" ? "nav-surface-dark" : "nav-surface-light"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="p-0 group-hover:scale-110 transition-transform">
                <img src="https://i.imgur.com/hu5ZtjL.jpeg" alt="Logo" className="w-9 h-9 object-cover rounded-lg shadow" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">Zubair Muwwakil</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#featured" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Featured</a>
              <a href="#experience" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Experience</a>
              <a href="#skills" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">Skills</a>
              <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide">About</a>
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
              <button
                className="text-foreground hover:text-primary transition-colors p-2 rounded-full border border-transparent hover:border-border"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden">
          <div className="max-w-7xl mx-auto px-4 pt-24 pb-10 h-full flex flex-col">
            <div className="space-y-6">
              <div className="grid gap-3 text-lg font-semibold">
                <button
                  type="button"
                  onClick={() => scrollToSection("featured")}
                  className="text-left px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-secondary transition-colors"
                >
                  Featured
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("experience")}
                  className="text-left px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-secondary transition-colors"
                >
                  Experience
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("skills")}
                  className="text-left px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-secondary transition-colors"
                >
                  Skills
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className="text-left px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-secondary transition-colors"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="text-left px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-secondary transition-colors"
                >
                  Contact
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold bg-primary text-primary-foreground border border-primary-border rounded-full px-6 py-3 hover:bg-primary/90 transition-colors"
                >
                  Hire Me
                </button>
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold border border-border rounded-full px-6 py-3 hover:bg-secondary transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className={`relative min-h-[75vh] flex items-center pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden ${
          theme === "dark" ? "hero-dark" : "hero-light"
        }`}
      >
        {/* Light mode sky backdrop layers */}
        {theme === "light" && (
          <>
            <div className="sky-bg" />
            <div className="sky-sun" />
            <div className="sun-rays" />
            <div className="clouds">
              <div className="cloud cloud--lg" style={{ top: "12%", left: "-25%", animationDelay: "0s" }} />
              <div className="cloud cloud--sm" style={{ top: "28%", left: "55%", animationDelay: "10s" }} />
              <div className="cloud" style={{ top: "56%", left: "5%", animationDelay: "20s" }} />
            </div>
          </>
        )}
        <div
          className={`absolute inset-0 opacity-40 z-[2] ${
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(135,92,255,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,196,255,0.28),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,102,178,0.18),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(135,92,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,156,255,0.15),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,102,178,0.1),transparent_30%)]"
          }`}
        ></div>
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[520px] h-[520px] bg-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[460px] h-[460px] bg-accent/15 rounded-full blur-3xl"></div>
        <div className="container-padding relative z-10 w-full flex justify-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-screen-xl w-full mx-auto">
            <div className="space-y-5 md:space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 -mt-8 md:-mt-12">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-gradient">
                {heroRoleLine}
              </h1>
              <p className="text-lg md:text-xl text-foreground leading-snug">
                {heroFocusLine}
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-semibold tracking-tight">
                {heroStackLine}
              </p>
              <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                <a href="#featured" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-10 rounded-full px-8 text-base h-12 flex items-center gap-2">
                  View Featured Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
                <a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 rounded-full px-8 text-base h-12 flex items-center gap-2">
                  Resume
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                </a>
              </div>
              <div className="flex gap-6 pt-2 text-muted-foreground justify-center lg:justify-start">
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
              <div className="relative w-full max-w-xs mx-auto lg:hidden pt-6">
                <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-4 border-background shadow-2xl">
                  <img
                    src="https://i.imgur.com/7BAT0Wz.jpeg"
                    alt="Zubair Muwwakil Logo"
                    className="w-full h-full object-cover object-[center_60%]"
                  />
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block lg:pt-6">
              <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-8 border-background shadow-2xl">
                <img
                  src="https://i.imgur.com/7BAT0Wz.jpeg"
                  alt="Zubair Muwwakil Logo"
                  className="w-full h-full object-cover object-[center_60%]"
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
          <a href="#featured" className="text-muted-foreground hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down w-6 h-6"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
          </a>
        </div>
      </section>

      {/* Floating quick-access CTA */}
      <a
        href={primaryCtaHref}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Book intro
      </a>

      <section className="py-12 border-y border-border/60 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {proofBarItems.map((item, idx) => {
              const proofIcons = [Sparkles, Bolt, TrendingUp];
              const Icon = proofIcons[idx % proofIcons.length];
              return (
                <div
                  key={item}
                  className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary/12 via-background to-accent/10 border border-border/60 shadow-xl shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 dark:bg-black/20 text-primary shadow-lg shadow-primary/15">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="text-lg font-extrabold leading-snug text-foreground">{item}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placeholder for reordered sections; About moved below */}

      {/* Featured Projects */}
      <section id="featured" className="relative overflow-hidden py-20 bg-muted/30">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="sun-rays sun-rays--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--sm" style={{ top: "14%", left: "-30%", animationDelay: "2s" }} />
              <div className="cloud cloud--lg" style={{ top: "52%", left: "58%", animationDelay: "10s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-glow" />
          <SectionHeader 
            title="Featured Projects" 
            subtitle="Flagship builds with clear decisions, outcomes, and proof."
          />
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {featuredProjectTitles.map((title) => {
                const featuredCase = projectCaseStudies[title];
                if (!featuredCase) return null;
                const project = projectByTitle.get(title);
                const stack = (featuredCase.stack || project?.stack || project?.tags || []).slice(0, 3);
                const outcomes = (Array.isArray(featuredCase.impact)
                  ? featuredCase.impact
                  : featuredCase.impact
                    ? featuredCase.impact
                        .toString()
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)
                    : []
                ).slice(0, 2);

                return (
                  <CarouselItem key={title}>
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/12 via-background to-accent/10 shadow-2xl shadow-primary/15 p-8 lg:p-10">
                      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-90" />
                      <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-stretch">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-md shadow-primary/30 w-fit">
                              Featured Build
                            </div>
                            <h3 className="text-3xl font-extrabold font-display leading-tight">{title}</h3>
                            <p className="text-foreground font-semibold leading-relaxed">{featuredCase.built}</p>
                            <div className="flex flex-wrap gap-2">
                              {stack.map((tech) => (
                                <span key={tech} className="inline-flex items-center rounded-md px-3 py-1 font-semibold border border-border/80 text-xs bg-card shadow-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white/70 dark:bg-black/20 rounded-2xl border border-border/60 p-4 shadow-sm">
                              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-1">Problem</p>
                              <p className="text-foreground leading-relaxed font-semibold">{featuredCase.problem}</p>
                            </div>
                            <div className="bg-white/70 dark:bg-black/20 rounded-2xl border border-border/60 p-4 shadow-sm">
                              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-1">Outcomes</p>
                              <ul className="space-y-2 text-sm text-foreground font-semibold">
                                {outcomes.map((outcome) => (
                                  <li key={outcome} className="flex gap-2 leading-relaxed">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">Technical decisions</p>
                            <ul className="space-y-2 text-sm text-foreground font-semibold">
                              {(featuredCase.decisions || []).slice(0, 3).map((decision) => (
                                <li key={decision} className="flex gap-2 leading-relaxed">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span>{decision}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {featuredCase.links?.demo && (
                              <a
                                href={featuredCase.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                              >
                                Live Demo
                              </a>
                            )}
                            {featuredCase.links?.github && (
                              <a
                                href={featuredCase.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold shadow-lg hover:bg-secondary/90 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                            {featuredCase.links?.caseStudy && (
                              <a
                                href={featuredCase.links.caseStudy}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold shadow-lg shadow-black/20 hover:brightness-95 transition-colors"
                              >
                                Case Study
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="relative mt-8 lg:mt-0">
                          <div className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/10 blur-3xl opacity-70" />
                          <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl bg-muted/60 flex items-center justify-center h-[380px] md:h-[460px] lg:h-[520px]">
                            <img
                              src={featuredCase.photo || "https://i.imgur.com/vJnpwps.png"}
                              loading="lazy"
                              alt={title}
                              className="w-full h-full object-cover object-center cursor-zoom-in"
                              style={{ objectPosition: "center" }}
                              onClick={() =>
                                setFeaturedModal({
                                  src: featuredCase.photo || "https://i.imgur.com/vJnpwps.png",
                                  title,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-background/80 backdrop-blur" aria-label="Previous featured project" />
            <CarouselNext className="bg-background/80 backdrop-blur" aria-label="Next featured project" />
          </Carousel>
        </div>
      </section>

      {featuredModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setFeaturedModal(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow"
              onClick={() => setFeaturedModal(null)}
              aria-label="Close expanded image"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <img
              src={featuredModal.src}
              loading="lazy"
              alt={featuredModal.title}
              className="w-full h-auto max-h-[80vh] rounded-xl object-contain bg-white"
            />
          </div>
        </div>
      )}

      {/* Professional Journey Section */}
      <section id="experience" className="relative overflow-hidden py-24">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--lg" style={{ top: "18%", left: "-25%", animationDelay: "0s" }} />
              <div className="cloud cloud--sm" style={{ top: "60%", left: "62%", animationDelay: "8s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-10">
          <SectionHeader 
            title="Experience" 
            subtitle="Impact snapshots from recent roles."
          />
          {hasExperiences ? (
            <Carousel opts={{ align: "start", loop: (experiences?.length || 0) > 1 }} className="mt-8">
              <CarouselContent>
                {experiences?.map((exp, index) => (
                  <CarouselItem key={exp.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="h-full">
                      <ExperienceItem experience={exp} index={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-background/80 backdrop-blur" />
              <CarouselNext className="bg-background/80 backdrop-blur" />
            </Carousel>
          ) : (
            <p className="text-muted-foreground mt-6">Experience coming soon.</p>
          )}

          <div className="mt-20">
            <h3 className="text-2xl font-bold font-display mb-8">Education</h3>
            <div className="grid gap-6">
              {education?.map((edu, index) => {
                const eduIcons = [GraduationCap, BookOpen, Sparkles];
                const Icon = eduIcons[index % eduIcons.length];
                return (
                  <motion.div 
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/12 via-background to-accent/10 p-6 shadow-lg shadow-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 dark:bg-black/20 text-primary shadow">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-lg font-bold font-display leading-tight">{edu.school}</h4>
                        <p className="text-primary font-semibold">{edu.degree}, {edu.field}</p>
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-wide text-foreground bg-secondary px-3 py-2 rounded-full w-fit font-semibold shadow-sm">
                      {edu.school === "University of Toronto"
                        ? `${edu.startDate?.split("-")[0] || edu.startDate} - ${edu.endDate?.split("-")[0] || "Present"}`
                        : edu.startDate?.split("-")[0] || edu.startDate}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative overflow-hidden py-20">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--sm" style={{ top: "12%", left: "-28%", animationDelay: "1s" }} />
              <div className="cloud cloud--lg" style={{ top: "58%", left: "60%", animationDelay: "9s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Technical Skills" 
            subtitle="Signals I lean on: foundations, reliability, and systems that hold up."
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
                  className="relative overflow-hidden rounded-2xl p-6 border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/8 shadow-lg shadow-primary/10 hover:-translate-y-1 hover:shadow-primary/25 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/70 dark:bg-black/20 rounded-lg shadow-sm">
                      {icons[category as keyof typeof icons] || <Code2 className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
                        {categoryLabels[category] || "Toolkit"}
                      </p>
                      <h3 className="text-xl font-extrabold font-display capitalize text-foreground leading-tight">{category}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span 
                        key={skill.name}
                        className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold inline-flex items-center gap-2 shadow-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative overflow-hidden py-16">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="sun-rays sun-rays--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--lg" style={{ top: "20%", left: "-22%", animationDelay: "0s" }} />
              <div className="cloud cloud--sm" style={{ top: "64%", left: "62%", animationDelay: "6s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-glow" />
          <SectionHeader 
            title="About" 
            subtitle="Evidence over hype—what I build and how I approach it."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-border/60 p-8 shadow-lg shadow-primary/10 bg-gradient-to-br from-primary/8 via-background to-accent/8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
              <ul className="space-y-4">
                {aboutLines.map((line) => (
                  <li key={line} className="flex gap-4 leading-relaxed text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0 shadow-sm" />
                    <span className="text-lg font-semibold">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 p-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-lg shadow-primary/10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                <h3 className="text-lg font-extrabold font-display mb-4">Proof / Links</h3>
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

      {/* How I Work */}
      <section id="how-i-work" className="relative overflow-hidden py-16 bg-muted/30">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--sm" style={{ top: "10%", left: "-26%", animationDelay: "2s" }} />
              <div className="cloud cloud--lg" style={{ top: "50%", left: "60%", animationDelay: "12s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="How I Work" 
            subtitle="Signals that I deliver without slowing teams down."
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howIWork.map((item, idx) => {
              const workIcons = [ShieldCheck, PenTool, Target, Bolt, Sparkles, Code2];
              const Icon = workIcons[idx % workIcons.length];
              return (
                <div 
                  key={item} 
                  className="relative overflow-hidden rounded-2xl border border-border/60 p-6 bg-gradient-to-br from-primary/10 via-background to-accent/12 shadow-lg shadow-primary/10 hover:-translate-y-1 hover:shadow-primary/25 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 dark:bg-black/20 text-primary shadow-sm">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="text-foreground font-semibold leading-relaxed">{item}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden py-16">
        {theme === "light" && (
          <>
            <div className="sky-bg z-0" />
            <div className="sky-sun sky-sun--sm" />
            <div className="clouds z-0">
              <div className="cloud cloud--lg" style={{ top: "16%", left: "-24%", animationDelay: "0s" }} />
              <div className="cloud cloud--sm" style={{ top: "62%", left: "62%", animationDelay: "7s" }} />
            </div>
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 items-start">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/12 via-background to-accent/10 p-8 shadow-xl shadow-primary/15">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-90" />
              <SectionHeader 
                title="Let's Work Together" 
                subtitle="Fastest via email or LinkedIn — quick intros welcome."
              />

              <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr,0.8fr] items-center">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <a 
                      href={`mailto:${profileData.email}`} 
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="w-5 h-5" /> Email
                    </a>
                    <a 
                      href={profileData.linkedinUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold shadow-lg hover:bg-secondary/90 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                    <a 
                      href={profileData.githubUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold shadow-lg shadow-black/20 hover:brightness-95 transition-colors"
                    >
                      <Github className="w-5 h-5" /> GitHub
                    </a>
                    <a 
                      href="https://projects.zubairmuwwakil.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-semibold shadow-lg hover:bg-accent/90 transition-colors"
                    >
                      <SquareStack className="w-5 h-5" /> Projects
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">Prefer email for detailed notes or links. Quick pings on LinkedIn are welcome.</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-white/70 dark:bg-black/20 p-5 shadow-lg shadow-primary/10 -mt-6 md:-mt-8 lg:-mt-10">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 opacity-80" />
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Availability</p>
                  <p className="text-lg font-extrabold text-foreground leading-snug">Backend / Full-Stack roles · US remote · New York City · Toronto, ON · Open to contract or full-time.</p>
                </div>
              </div>
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
