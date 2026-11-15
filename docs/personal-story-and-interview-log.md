# Personal story and interview journey — maintenance guide

Routes:
- /story/ — editorial founder story in client/src/pages/Story.tsx
- /interview-journey/ — transparent public career journal in client/src/pages/InterviewJourney.tsx

The interview entries are **data**, maintained in client/src/data/interviewJourney.ts.
Add an entry only after the owner confirms an outcome or it is supported by clear
recruiting correspondence. Treat "Interview", "Assessment / application" and
"Offer setback" as distinct categories. Do not label an open process as failed.
Do not include recruiter names, email addresses, exact interview questions,
private feedback, salary documents, assessment scores, or other private details.
Do not publish uncertain dates; use null until verified.

The page deliberately does not auto-ingest Gmail. A public site should never
publish private inbox contents or deduce a rejection from silence. New entries
are curated and reviewed before becoming public.

Content and SEO:
- Add new routes to client/src/App.tsx.
- Keep new route paths in package.json > reactSnap.include.
- Keep sitemap registration in script/generate-sitemap.mjs.
- Each page uses useDocumentHead for title, description, canonical, OG tags,
  AboutPage and BreadcrumbList structured data.
- Navigation links live in BlogLayout and Portfolio.
- Run npm run check, npm run build:ssg and inspect the pre-rendered pages and
  sitemap before merging.

Sources at initial creation (November 15, 2026):
- Founder story and Amazon/Google interview outcomes: first-person account
  supplied directly by the site owner.
- Bloomberg Jan 2026 role/interview and outcome, IBM Nov 2026 stage/outcomes,
  TELUS 2026 interview/offer: owner account plus recruiting messages.
- Group feature implementation proof: The-Pickleball-Social/pbsocial commit
  acfc370a3be519ec6a449dcecaaff334bd46c08e.

No private source email is linked from the public site.


## November 15 expansion

The public log includes a curated set of additional 2024–2026 recruiting decisions
established through employer emails and the owner's earlier first-person account.
Applications, recruiter conversations, cancelled or filled roles, actual interviews
and offers are all separate stages. Records with no reliable date retain an empty
period. Re-applications are separate if the position differs. Do not present
an application rejection as a failed technical interview.

This is **not** a complete copy of the user's inbox or a live synchronization.
The site never stores Gmail message IDs, private correspondence, employer
contacts, personal identifiers, or private assessment feedback. New entries
are manually reviewed and edited in client/src/data/interviewJourney.ts.

Do not treat pending roles (including the Roblox assessment, new Palantir
application, Narmi interview or upcoming BFUTR interviews as of 2026-11-15)
as rejections. OBSIDI's rejected February cohort and successful June cohort
are presented in a separate narrative note, not incorrectly counted as job
interviews.


## Growth journal (November 15, 2026)

- /growth/ is a separate manually maintained page at client/src/pages/Growth.tsx.
- Milestones are data in client/src/data/growthMilestones.ts.
- The site owner's first-person description of the emotional cycle is: after a
  rejection, they feel discouraged for a while and eventually find motivation.
  Do not rewrite this as instant recovery, a guaranteed success story, or a
  relentless productivity ideal.
- A milestone can be confirmed by a public commit, a private learning program
  completion email, or a direct first-person account. Distinguish these
  evidence types. A nearby rejection and a later milestone in time do not
  establish motivation or causation.
- Public commit links may be published. Do not include private emails,
  certificate IDs, assessment feedback or calendar attendee details.
- Growth is not limited to interview preparation. Show genuine interest
  in building useful products and learning even when it is unrelated to hiring.
- Update package.json pre-render routes, sitemap registration, route mapping,
  SEO checks and links if the page moves or is renamed.
