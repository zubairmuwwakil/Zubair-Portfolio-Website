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
  stage: "Interview" | "Assessment / application" | "Recruiter conversation" | "Position closed" | "Offer setback";
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
  // Confirmed additional outcomes, based on recruiting correspondence.
  // Role-specific screening outcomes are not failed interviews.
  {
    company: "Datarails",
    role: "Role not specified in the decision email",
    period: "August 2025",
    stage: "Interview",
    outcome: "Another candidate was selected",
    note: "The decision message thanked me for going through the interview process. I didn't get the outcome I wanted, but making it that far still meant something.",
  },
  {
    company: "Palantir",
    role: "Meritocracy Fellowship",
    period: "November 2026",
    stage: "Assessment / application",
    outcome: "Application did not move forward",
    note: "I was turned down for this fellowship. That's different from failing an engineering interview, and I want to keep the distinction clear.",
  },
  {
    company: "IBM",
    role: "Mainframe Z System Verification Tester Apprentice",
    period: "October 2026",
    stage: "Assessment / application",
    outcome: "Application did not move forward",
    note: "I received an unsuccessful application update. I can't honestly call this a failed interview.",
  },
  {
    company: "Intuit",
    role: "Software Developer 1",
    period: "October 2026",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "The message said other candidates were a closer match for this role's current needs.",
  },
  {
    company: "Intuit",
    role: "Software Developer 1 — Canada Tax Content",
    period: "October 2026",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "A separate Intuit application ended at the screening stage.",
  },
  {
    company: "Amazon",
    role: "Software Development Engineer II",
    period: "October 2026",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "This was an application decision. It's separate from the Amazon interview I described earlier.",
  },
  {
    company: "Microsoft",
    role: "Software Engineer — Systems",
    period: "May 2025",
    stage: "Assessment / application",
    outcome: "Did not meet the stated requirements",
    note: "The application was screened out for eligibility. It wasn't a technical interview result.",
  },
  {
    company: "MTA",
    role: "Application Developer 1–5",
    period: "September 2025",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "A New York opportunity that ended after application review.",
  },
  {
    company: "Hammond Power Solutions",
    role: "Software Developer Student — AI",
    period: "August 2025",
    stage: "Assessment / application",
    outcome: "Application did not move forward",
    note: "I was interested in the student AI role, but wasn't selected to continue.",
  },
  {
    company: "Productiv",
    role: "Software Engineer — Front End / Full Stack",
    period: "August 2025",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "Another application where the decision came down to the company's needs and the match they were looking for.",
  },
  {
    company: "Helm Operations Software",
    role: "Software Developer",
    period: "January 2026",
    stage: "Assessment / application",
    outcome: "Application not selected",
    note: "I received an update that the employer had moved forward in its process without my application.",
  },
  {
    company: "MHB Financial",
    role: "Assistant Data Analyst",
    period: "January 2026",
    stage: "Assessment / application",
    outcome: "Application not selected",
    note: "Another application-stage decision. No technical interview outcome was provided.",
  },
  {
    company: "Mammoth Interactive",
    role: "Computer Programmer — React / Laravel / AI Systems",
    period: "July 2025",
    stage: "Assessment / application",
    outcome: "Application not selected",
    note: "I applied for a programming role, but didn't advance.",
  },
  {
    company: "ChemTreat",
    role: "Data Architect",
    period: "January 2025",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "The application didn't make it further. I don't have interview feedback from this process.",
  },
  {
    company: "Stark Tech",
    role: "Programmer I",
    period: "January 2025",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "The company chose applicants who better fit its needs for the role.",
  },
  {
    company: "Epic",
    role: "Role not stated in the decision email",
    period: "March 2024",
    stage: "Assessment / application",
    outcome: "Other candidates were selected",
    note: "An earlier reminder that disappointing application outcomes didn't start this year.",
  },
  {
    company: "Eisen",
    role: "Product Engineer — New York",
    period: "November 2026",
    stage: "Recruiter conversation",
    outcome: "Opportunity did not work out",
    note: "A recruiter followed up to say the role wouldn't work out. This was not a confirmed failed technical interview.",
  },
  {
    company: "DevStaff",
    role: "Role not specified in the follow-up",
    period: "July 2026",
    stage: "Recruiter conversation",
    outcome: "Not the right fit for this opening",
    note: "The recruiter offered to keep me in mind for future roles, but this particular opportunity didn't work out.",
  },
  {
    company: "Affirm",
    role: "Software Engineer I — Consumer Servicing",
    period: "August 2025",
    stage: "Position closed",
    outcome: "Role was filled",
    note: "The company told me someone had already been hired. That isn't the same as losing a technical interview.",
  },
  {
    company: "Fortra",
    role: "Associate Web Developer",
    period: "August 2025",
    stage: "Position closed",
    outcome: "Position no longer vacant",
    note: "Sometimes a process ends because the job itself isn't available anymore.",
  },
  {
    company: "GovCIO",
    role: "Junior Application Developer",
    period: "November 2025",
    stage: "Position closed",
    outcome: "Position cancelled",
    note: "The company cancelled the position and stopped seeking candidates.",
  },
  {
    company: "CAI",
    role: "Junior Software Developer Intern",
    period: "March 2025",
    stage: "Position closed",
    outcome: "Role cancelled or placed on indefinite hold",
    note: "This application stopped because the role was no longer being filled, not because of an interview result.",
  },

];
