/**
 * Public, manually curated record of recruiting processes that didn't work out.
 * Edit only with Zubair's confirmed account or verified outcome correspondence.
 *
 * Stages matter: an application rejection is not a failed interview, and an
 * offer that fell through is not the same as a technical rejection.
 * Do not add recruiters, private email contents, score reports, or interview
 * questions to this public dataset.
 */
export type InterviewEntry = {
  company: string;
  role: string;
  period: string | null;
  stage: "Interview" | "Assessment / application" | "Offer setback";
  outcome: string;
  note: string;
};

export const interviewJourney: InterviewEntry[] = [
  {
    company: "IBM",
    role: "Software Engineer Apprentice",
    period: "November 2026",
    stage: "Assessment / application",
    outcome: "Application did not move forward",
    note: "I was invited to the coding assessment stage. I later received an unsuccessful application update. I don't want to present that as an interview I failed.",
  },
  {
    company: "IBM",
    role: "Entry Level AI Software Engineer",
    period: "November 2026",
    stage: "Assessment / application",
    outcome: "Application did not move forward",
    note: "Another opportunity I was excited about. The assessment invitation gave me hope, and the later outcome was disappointing.",
  },
  {
    company: "TELUS",
    role: "Software Developer — Toronto",
    period: "2026",
    stage: "Offer setback",
    outcome: "Offer ultimately did not become a job",
    note: "I went through interviews and received an offer. In the end, the opportunity didn't work out. Getting that far and still losing the opportunity was hard in its own way.",
  },
  {
    company: "Bloomberg",
    role: "2026 Software Engineer — New York",
    period: "January 2026",
    stage: "Interview",
    outcome: "Did not receive an offer",
    note: "I made it to the interview process for a role I really wanted. I didn't move forward, and it was one of the disappointments that stayed with me.",
  },
  {
    company: "Amazon",
    role: "Software engineering opportunity",
    period: null,
    stage: "Interview",
    outcome: "Did not receive an offer",
    note: "I had an interview opportunity and didn't pass. I was disappointed, but I kept looking for ways to improve and try again.",
  },
  {
    company: "Google",
    role: "Software engineering opportunity",
    period: null,
    stage: "Interview",
    outcome: "Did not receive an offer",
    note: "Another interview that didn't turn into the outcome I hoped for. It's hard not to take that personally sometimes, even when I know one process doesn't define me.",
  },
];
