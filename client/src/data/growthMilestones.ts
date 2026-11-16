/**
 * Manually curated public growth milestones. Do not auto-publish activity from
 * a connected inbox, or imply that a commit was caused by a specific rejection.
 * A public source URL is included only when an actual public artifact exists.
 */
export type GrowthMilestone = {
  period: string;
  category: "Building" | "Learning" | "Persistence";
  title: string;
  description: string;
  /**
   * Only ever a link to a genuinely public commit. Work in private repos is
   * described in the entry text instead — a link that 404s, or a bare "private
   * repo" label, is weaker than simply saying what was built. The evidence for
   * that work lives on /projects, not here.
   */
  proof?: { title: string; url: string }[];
};

export const growthMilestones: GrowthMilestone[] = [
  {
    period: "November 15, 2026",
    category: "Building",
    title: "Improving the software people use to play",
    description: "I kept developing Pickleball Social's match operations, including court-balanced round-robin scheduling and notifications. Working on real problems helps me remember why I love engineering in the first place.",
  },
  {
    period: "November 14, 2026",
    category: "Learning",
    title: "Finishing more courses, even after disappointing news",
    description: "I completed Google's AI for App Building and AI for Brainstorming and Planning learning activities, and received completion badges. They aren't substitutes for production experience, but I enjoy learning new tools and finding ways to use them.",
  },
  {
    period: "Autumn 2026",
    category: "Learning",
    title: "Going back to coding fundamentals",
    description: "I've been practicing Python interview questions on arrays, sets, dictionaries, frequency counting, and two pointers. It's often less exciting than building a whole product, but I want to become a stronger engineer and interview better.",
  },
  {
    period: "October 2026",
    category: "Persistence",
    title: "Continuing my Computer Science degree",
    description: "After a difficult and interrupted education path, I returned to my Computer Science studies at Ontario Tech University. I'm trying to build my career and keep learning, without treating the lost time as the end of the story.",
  },
  {
    period: "September 2026",
    category: "Building",
    title: "Teaching my finance app when not to guess",
    description: "In PickMe, I worked on how rewards are calculated and how the app handles uncertainty. One change was withholding a wallet recommendation when the purchase category was only a guess. Getting the answer right matters more than always giving one.",
  },
  {
    period: "August 2026",
    category: "Building",
    title: "Building more reliable market data systems",
    description: "I developed MarketLens work around multiple asset types and new provider integrations. I learned a lot by dealing with data differences and the need for dependable backend behavior.",
    proof: [
      {
        title: "MarketLens: multi-asset handling",
        url: "https://github.com/zubairmuwwakil/marketdata/commit/4d7f8d85610c132911c83b6b0a03cc92fcda6fd8",
      },
    ],
  },
  {
    period: "February–June 2026",
    category: "Persistence",
    title: "An OBSIDI rejection wasn't the final answer",
    description: "I was rejected from an OBSIDI Academy cohort in February. I tried again, went through more steps, and received an acceptance to Cohort 10 in June. That didn't mean every setback suddenly felt easy. It did remind me that an earlier no doesn't always have to be the last word.",
  },
  {
    period: "May 2026",
    category: "Building",
    title: "Making it easier for one person to enjoy pickleball again",
    description: "I built recurring group tools in Pickleball Social after watching someone I cared about struggle to organize weekly matches. Seeing her smile and actually enjoy playing again changed what building software meant to me.",
  },
];
