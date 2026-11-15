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
