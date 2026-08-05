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
  resumeUrl: "https://drive.google.com/file/d/1Z87uMI6RrrPa9KeIhZChkpzl-YYZYgTr/view?usp=sharing",
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: "G2i Inc.",
    role: "Software Engineer",
    employmentType: "Contract",
    subtitle: "Python · SQL · GitHub · CI/CD",
    startDate: "Aug 2025",
    endDate: "Present",
    description: [
      "Delivered scoped production features with emphasis on correctness, maintainability, and clean handoff.",
      "Worked in a GitHub PR + CI workflow (branching, reviews, automated checks) to keep changes releasable.",
      "Built and validated SQL queries/transformations supporting feature logic, debugging, and data integrity checks.",
      "Collaborated asynchronously in a remote team, shipping incremental improvements with clear documentation."
    ].join("\n"),
  },
  {
    id: 2,
    company: "The Senac Group",
    role: "Financial Software Analyst",
    // employmentType: pending — see NEEDS-INPUT.md
    subtitle: "Automation · SQL · Finance tooling",
    startDate: "Jun 2023",
    endDate: "May 2025",
    description: [
      "Tech: Excel, VBA, SQL, reporting pipelines, budgeting/forecast models, documentation/runbooks.",
      "Built automated reporting pipelines (SQL → automated outputs) removing 10+ hours/week of manual work and standardizing weekly deliverables.",
      "Created budgeting/variance dashboards with validation checks and guardrails, cutting formula defects by ~30% and improving forecast reliability.",
      "Produced scenario + cost/benefit models surfacing $25K+ in annual efficiency gains; owned finance tooling ops and wrote repeatable runbooks."
    ].join("\n"),
  },
  {
    id: 3,
    company: "Elevation Athletics",
    role: "Regional Program Coordinator",
    // employmentType: pending — see NEEDS-INPUT.md
    subtitle: "Ops automation · APIs · Support workflows",
    startDate: "Mar 2023",
    endDate: "Present",
    description: [
      "Tech: TeamSnap API, Excel automation, operational tooling, support workflows, process training.",
      "Built a participant tracking system on the TeamSnap API, increasing onboarding throughput by ~40% via cleaner workflows and automation.",
      "Ran a structured support + triage workflow for 1,000+ users across 8 cities, keeping stakeholders unblocked with clear updates.",
      "Developed Excel automation utilities that reduced game-day data entry/reporting time by ~60%; led tooling/process enablement for staff/coaches."
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
    degree: "Bachelor of Computer Science",
    field: "Computer Science",
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
    title: "MindSky Website",
    description: "Fast marketing site with modular sections, analytics hooks, and responsive design.",
    link: "https://mindsky.zubairmuwwakil.com",
    // No repo link: this previously pointed at the bare GitHub profile, not a
    // repository. See NEEDS-INPUT.md for the correct URL.
    githubLink: null,
    caseStudyUrl: "https://drive.google.com/file/d/1ageDjVn4WWSrZaNDd2xDDkv0M5nwmbCR/view?usp=sharing",
    tags: ["React", "TypeScript", "Design Systems"],
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
