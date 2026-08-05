export type Profile = {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string | null;
  email: string;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  resumeUrl?: string | null;
};

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type Experience = {
  id: number | string;
  company: string;
  role: string;
  /**
   * Rendered as a badge beside the role. Several of these roles overlap in time,
   * so the type is what makes the timeline read honestly. Leave undefined rather
   * than guessing — the badge is simply omitted. See NEEDS-INPUT.md.
   */
  employmentType?: EmploymentType;
  subtitle?: string;
  startDate: string;
  endDate?: string | null;
  description: string;
};

/** Degrees only. Certificates and short programs belong in `certifications`. */
export type Education = {
  id: number | string;
  school: string;
  degree: string;
  field: string;
  startDate?: string | null;
  endDate?: string | null;
};

/**
 * Credentials awarded by a body other than a degree-granting program. Kept
 * separate from `education` so a vendor certification is never rendered as
 * though a university conferred it.
 */
export type Certification = {
  id: number | string;
  name: string;
  issuer: string;
  year: string;
};

export type Project = {
  id: number | string;
  /** URL segment for the eventual /projects/<slug> case-study page. */
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  link?: string | null;
  githubLink?: string | null;
  appStoreLink?: string | null;
  /**
   * Currently a Google Drive PDF, which search engines cannot index and which
   * breaks if sharing settings change. Slated to become an on-domain
   * /projects/<slug> page — see NEEDS-INPUT.md item 6.
   */
  caseStudyUrl?: string | null;
  tags?: string[] | null;
  stack?: string[];
};

export type Skill = {
  id: number | string;
  name: string;
  category: string;
  proficiency?: number | null;
};

export const contactEmail = "zmuwwakil@gmail.com";

export const profile: Profile = {
  name: "Zubair Muwwakil",
  title: "Software Engineer (Full-Stack / Backend)",
  bio: "Finance-informed engineer who builds production APIs, data pipelines, and web apps with reliability, data integrity, and performance top of mind.",
  email: "zmuwwakil@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/zubairmuwwakil/",
  githubUrl: "https://github.com/zubairmuwwakil",
  resumeUrl: "/resume/",
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: "G2i Inc.",
    role: "Software Engineer",
    employmentType: "Contract",
    subtitle: "Django · PostgreSQL · SQL Server · Docker · CI/CD",
    startDate: "Aug 2025",
    endDate: "Present",
    description: [
      "Build and maintain Django backend services (REST APIs, background jobs, data processing) in a PR-driven code review environment.",
      "Own PostgreSQL/SQL Server changes — schema updates, indexing and query tuning, integrity checks — and ship them through Dockerized CI gates.",
      "Deliver releases safely with unit and integration tests plus data integrity validation, preventing regressions and keeping deployments repeatable."
    ].join("\n"),
  },
  {
    id: 2,
    company: "The Senac Group",
    role: "Financial Software Analyst — Automation & Analytics",
    // employmentType: pending — see NEEDS-INPUT.md
    subtitle: "C# · .NET · SQL Server (T-SQL) · Excel VBA · Reporting pipelines",
    startDate: "Jun 2023",
    endDate: "May 2025",
    description: [
      "Built internal automation and reporting logic in C#/.NET and SQL Server (T-SQL) to improve FP&A data accuracy, repeatability, and close-cycle reliability.",
      "Automated recurring reporting workflows with SQL and Excel VBA, saving 10+ hours/week across weekly and monthly deliverables.",
      "Built pipelines to ingest and normalize exports from CRM, ERP, HR, and accounting systems, and shipped validation dashboards that surfaced discrepancies earlier — reducing rework during close.",
      "Created budgeting/variance dashboards with validation checks and guardrails, cutting formula defects by ~30% and improving forecast reliability.",
      "Produced scenario + cost/benefit models surfacing $25K+ in annual efficiency gains; owned finance tooling ops and wrote repeatable runbooks.",
      "Promoted Intern → Assistant Financial Analyst → Software Developer."
    ].join("\n"),
  },
  {
    id: 3,
    company: "Elevation Athletics",
    role: "Regional Program Coordinator (Tech & Ops)",
    // employmentType: pending — see NEEDS-INPUT.md
    subtitle: "Next.js · TypeScript · PostgreSQL · Glicko-2 ratings · TeamSnap API",
    startDate: "Mar 2023",
    endDate: "Present",
    description: [
      "Built and deployed pbsocial.ca, a multi-tenant Next.js/TypeScript/PostgreSQL platform for session scheduling, registrations, attendance, and reporting; scaled from ~50 to 1,000+ participants.",
      "Engineered the core match systems: automatic group and match generation, atomic match finalization, and Glicko-2 rating with standings history for reliable competitive play.",
      "Implemented role-based ops workflows and retention analytics — roster/waitlist automation, check-in tooling — contributing to repeat sign-ups rising from ~20% to ~89% in a tracked cohort (16/18).",
      "Built a participant tracking system on the TeamSnap API, increasing onboarding throughput by ~40% via cleaner workflows and automation.",
      "Ran a structured support + triage workflow for 1,000+ users across 8 cities, keeping stakeholders unblocked with clear updates.",
      "Developed Excel automation utilities that reduced game-day data entry/reporting time by ~60%; led tooling/process enablement for staff/coaches.",
      "Promoted Coach → Lead Coach → District Lead."
    ].join("\n"),
  },
  {
    id: 4,
    company: "NDCTrades",
    role: "Finance Solutions Architect",
    // employmentType: pending — see NEEDS-INPUT.md
    subtitle: "Revenue ops · Automation · Dashboards",
    startDate: "Sep 2023",
    endDate: "Sep 2024",
    description: [
      "Tech: QuickBooks, Humanity, workflow automation, reporting dashboards, implementation playbooks.",
      "Automated invoicing + pricing workflows across QuickBooks/Humanity, increasing recurring revenue by ~20% while reducing operational errors.",
      "Streamlined payroll via data cleanup and automated checks, cutting processing time by ~35% and improving correctness.",
      "Built compliance/performance dashboards so risks surfaced earlier; wrote reusable implementation templates to standardize customer setups."
    ].join("\n"),
  },
];

export const education: Education[] = [
  {
    id: 3,
    school: "Ontario Tech University",
    degree: "Master of Computer Science",
    field: "Computer Science",
    startDate: "2024",
    endDate: "Postponed",
  },
  {
    id: 5,
    school: "University of Toronto",
    degree: "BSc, Computer Science & Mathematics",
    field: "Finance/Economics",
    startDate: "2019",
    endDate: "2023",
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    year: "2024",
  },
  {
    id: 2,
    name: "Advanced Digital and Professional Training",
    issuer: "Ted Rogers School of Management — Toronto Metropolitan University",
    year: "2025",
  },
  {
    id: 3,
    name: "French Language Studies",
    issuer: "York University",
    year: "2025",
  },
];

// Order here is the order they appear on /projects: strongest evidence first.
export const projects: Project[] = [
  {
    id: 1,
    slug: "pickleops",
    title: "PickleOps — The Pickleball Social",
    description: "Shipped, actively maintained iOS product for running club pickleball: sessions, ladders, ratings, and payments in one app.",
    link: "https://pickleball.zubairmuwwakil.com",
    appStoreLink: "https://apps.apple.com/us/app/the-pickleball-social/id6759585852",
    // No repo link: .../pickleball-session-manager returns 404 under the new
    // handle. See NEEDS-INPUT.md.
    githubLink: null,
    caseStudyUrl: "https://drive.google.com/file/d/1GaO37v1o1Nnkl51TF8M-C8YZZ3TpPfJg/view?usp=sharing",
    tags: ["React Native", "TypeScript", "Prisma", "Postgres", "iOS"],
  },
  {
    id: 4,
    slug: "looply",
    title: "Looply",
    description: "Finance assistant that auto-tracks subscriptions, bills, purchases, and return/refund deadlines from inbox data.",
    link: "https://looply.zubairmuwwakil.com",
    githubLink: "https://github.com/zubairmuwwakil/return-saas",
    caseStudyUrl: "https://drive.google.com/file/d/1PPKatAvsSpp5oTtotDeMg7-0nRwLCxCZ/view?usp=sharing",
    tags: ["Next.js", "TypeScript", "Prisma", "Neon Postgres"],
  },
  {
    id: 2,
    slug: "marketlens",
    title: "MarketLens",
    description: "Backend pipeline that ingests, normalizes, and serves financial indicators via REST APIs.",
    link: "https://marketdata.zubairmuwwakil.com",
    githubLink: "https://github.com/zubairmuwwakil/market-data-pipeline",
    caseStudyUrl: "https://drive.google.com/file/d/10SKFD0k5hVxm7qH6rpWVVNmZubGuktZO/view?usp=sharing",
    tags: ["Java", "Spring Boot", "SQL", "Caching", "APIs"],
  },
  {
    id: 3,
    slug: "mindsky",
    title: "MindSky",
    description: "Visual thought-mapping app: an infinite canvas of linked ideas with snapshot-based undo/redo and debounced autosave, persisted as a graph in Postgres.",
    link: "https://mindsky.zubairmuwwakil.com",
    // No repo link: this previously pointed at the bare GitHub profile, not a
    // repository. See NEEDS-INPUT.md for the correct URL.
    githubLink: null,
    caseStudyUrl: "https://drive.google.com/file/d/1ageDjVn4WWSrZaNDd2xDDkv0M5nwmbCR/view?usp=sharing",
    tags: ["React", "TypeScript", "React Flow", "Node.js", "PostgreSQL (JSONB)"],
  },
];

export const skills: Skill[] = [
  { id: 1, name: "Java (Spring Boot)", category: "core", proficiency: 95 },
  { id: 2, name: "TypeScript / JavaScript", category: "core", proficiency: 95 },
  { id: 3, name: "React", category: "core", proficiency: 92 },
  { id: 4, name: "SQL", category: "core", proficiency: 90 },
  { id: 5, name: "Node.js", category: "also", proficiency: 85 },
  { id: 6, name: "Python", category: "also", proficiency: 82 },
  { id: 7, name: "Docker", category: "also", proficiency: 85 },
  { id: 8, name: "Postgres", category: "also", proficiency: 85 },
  { id: 9, name: "Prisma", category: "also", proficiency: 82 },
  { id: 10, name: "REST APIs", category: "also", proficiency: 88 },
  { id: 11, name: "Testing (JUnit / Jest)", category: "also", proficiency: 82 },
  { id: 12, name: "CI/CD", category: "also", proficiency: 82 },
  { id: 13, name: "Clean Architecture", category: "practices", proficiency: 95 },
  { id: 14, name: "API Design", category: "practices", proficiency: 92 },
  { id: 15, name: "Schema Migrations", category: "practices", proficiency: 85 },
  { id: 16, name: "Observability Basics", category: "practices", proficiency: 80 },
];
