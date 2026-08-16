# NEEDS-INPUT

Items that could not be resolved from the repository. Nothing here was guessed
at or written into the site. Ordered by how much damage it does while unresolved.

Last updated: 2026-08-16 (item 16 added, and its same-day status recorded —
owner actions done except two residuals: re-add the Search Console DNS TXT,
confirm the sitemap submission)

**Resolved:** item 1 (apex is canonical), item 7 (/projects on the apex),
item 8 (York moved to Certifications),
item 10 (contact email confirmed correct).
**Half-done:** item 2 (redirect works, drops the path).
Everything else is still open.

---

## 1. ~~Set the GitHub Pages custom domain to the apex~~ — RESOLVED 2026-08-05

The apex is now the Pages custom domain and serves the site directly:

```
$ gh api repos/zubairmuwwakil/Zubair-Portfolio-Website/pages
{ "cname": "zubairmuwwakil.com", "https_enforced": true,
  "build_type": "workflow", "status": "built" }
```

Worth recording how it landed, because it contradicts the usual advice. Setting
the domain in the Pages UI made GitHub commit `CNAME=www.zubairmuwwakil.com` to
the repo root. The Actions deploy then shipped `client/public/CNAME` (apex)
inside the artifact, and **that** is what the Pages config ended up reflecting.
For `build_type: workflow`, the CNAME file in the uploaded artifact wins.

Practical consequence: **`client/public/CNAME` is the file that controls the
domain.** The root `CNAME` is only the flag `deploy.yml` tests to pick
`BASE_PATH=/`; its contents are inert. Both now read `zubairmuwwakil.com` so
they cannot disagree again.

### Residual: `www` served a stale copy — cleared itself after ~13 minutes

Immediately after the switch, `www.zubairmuwwakil.com` returned 200 with the
previous build (`last-modified: Tue, 04 Aug`, no canonical, `x-cache: HIT`)
rather than redirecting — a cached CDN object from the old configuration, not a
second live site. It aged out on its own:

```
$ curl -sSI https://www.zubairmuwwakil.com/blog
HTTP/2 301
location: https://zubairmuwwakil.com/blog
```

`www` now 301s to the apex **and preserves the path**, which is the correct end
state. Nothing further to do here.

---

## 2. PARTIALLY DONE — `portfolio.*` redirects, but discards the path

**Progress:** the host no longer 404s. A redirect rule is in place and returns a
proper 301. That was the important half.

**Still wrong:** it sends every URL to the site root instead of the matching
path. Re-checked 2026-08-05:

```
$ curl -sSI https://portfolio.zubairmuwwakil.com/blog
HTTP/2 301
location: https://zubairmuwwakil.com/       <-- should be .../blog
```

Any inbound link to a deep page on the old host lands on the homepage. Google
treats a redirect to an unrelated page as a **soft 404** and passes little or no
ranking signal through it, which is the specific thing this redirect exists to
recover.

The rule is currently doing a *static* redirect to a fixed URL. Change it to a
**dynamic** one so the path comes along:

- Match: `http.host eq "portfolio.zubairmuwwakil.com"`
- Action: **Dynamic** redirect (not Static), status **301**
- Expression:
  `concat("https://zubairmuwwakil.com", http.request.uri.path)`
- Preserve query string: **on**

Verify with the command above — `location:` must read
`https://zubairmuwwakil.com/blog`.

Item 1 is now done, so the chain is already a single hop
(`portfolio./blog → apex/`). Only the dropped path is left to fix.

---

## 3. ~~Which of the roles are contract / part-time / full-time~~ — RESOLVED 2026-08-05

All four labelled, and NDCTrades re-dated:

| Company | Role | Dates | Type |
|---|---|---|---|
| G2i Inc. | Software Engineer | Aug 2025 – Present | Contract |
| Elevation Athletics | Regional Program Coordinator (Tech & Ops) | Mar 2023 – Present | Part-time |
| The Senac Group | Financial Software Analyst | Jun 2023 – May 2025 | Part-time → Full-time |
| NDCTrades | Finance Solutions Architect | **Sep 2022 – Jun 2023** | Internship |

NDCTrades was previously listed as Sep 2023 – Sep 2024. Correcting it collapses
the three-way overlap from **13 months to 1** (June 2023 only, an internship
ending as a new role begins). The timeline now reads as one full-time-equivalent
role at a time plus part-time work, which is an ordinary shape.

Experience is reordered current-first: G2i, Elevation, Senac, NDCTrades.

**Still open from this item:** `/resume.pdf` and the Drive original predate these
corrections — see item 14.

---

## 4. The missing Dec 2019 – Mar 2023 role

A Web Developer / Full Stack Developer role covering **Dec 2019 – Mar 2023** is
absent from the experience list. This is a 3-year, 3-month gap in a
software-engineering narrative, sitting immediately before the earliest listed
role — the most valuable single addition available to this page, because it is
the only genuinely engineering-titled role in the timeline.

Nothing has been written to the site. Supply:

- Company name, and whether it can be named publicly
- Exact title
- Employment type (contract / part-time / full-time)
- A `subtitle` tech line, matching the existing style, e.g. `"React · Node · SQL"`
- 3–4 bullets in the existing voice: what you built, decision made, measurable
  outcome. Do not invent metrics — only numbers you can defend in an interview.

Then add it to `experiences` in `client/src/data/portfolio.ts`.

---

## 5. Dead and unverifiable links

Checked 2026-08-05. Per your instruction, links that are verifiably dead are no
longer rendered; the surrounding card content is untouched and returns as soon
as you supply a working URL.

### ~~Removed from the page — need replacement URLs~~ — BOTH RESOLVED 2026-08-08

Nothing in this table is still blocked. Re-verified 2026-08-08 against the
GitHub API rather than plain HTTP, so private-vs-deleted is now distinguishable.

| What | URL | Result |
|---|---|---|
| ~~PickleOps repo~~ | ~~`github.com/zubairmuwwakil/pickleball-session-manager`~~ → `github.com/zubairmuwwakil/pickleops` | **RESOLVED 2026-08-08** — the repo was renamed. `pickleops` is **public**, returns 200, and has a 9,509-byte README plus a full description. The old slug still 404s. The card can now carry a repo link alongside the App Store link. |
| ~~MindSky repo~~ | `github.com/zubairmuwwakil/mindmap` | **RESOLVED 2026-08-05** — verified 200. Now linked from the homepage card, /projects/ and the case study. ~~The repo has no README and no description~~ — **updated 2026-08-08:** both now exist (README committed 2026-08-05 "Add README", 3,386 B; description set). The draft at `repo-readmes/mindmap-README.md` has been published and is no longer pending. |

### Open — Looply repo renders create-next-app boilerplate

`github.com/zubairmuwwakil/return-saas` returns 200 and is linked from the
homepage card, `/projects/` and the case study — but its `main` README is the
**untouched create-next-app scaffold** from the initial commit (2026-01-08,
1,450 B, zero occurrences of "Looply"). A recruiter following the repo link
from the Looply case study lands on generic Next.js boilerplate.

This also works against indexation: the scaffold is byte-identical to millions
of other repos, so Google's near-duplicate filtering makes that page *less*
likely to be indexed than a thin-but-unique one would be.

A better README (3,272 B) already exists on the **`organized`** branch, along
with `docs/architecture.md`, `docs/env.md` and `docs/onboarding.md` — but
`main` is the default branch, so the landing page never shows it. That branch
version also cannot be copied to `main` as-is: four of its five linked source
paths, `.env.example`, the `prisma:migrate:deploy` script, and
`/api/cron/shipping` do not exist on `main`.

A merged draft, verified against `main` on 2026-08-08, is at
`repo-readmes/looply-README.md`. Publishing it **overwrites** the existing
file, so it is left unpushed pending your go-ahead.

### Still rendered — both work, but are slow to wake

| What | URL | Result |
|---|---|---|
| MarketLens "Live Demo" | `marketdata.zubairmuwwakil.com` | **200.** Working. |
| MindSky "Live Demo" | `mindsky.zubairmuwwakil.com` | **200.** Working. Served from `mindmap-0ztk.onrender.com`. |

Both demo hosts timed out on my first pass at a 20-second limit, then returned
200 in under 200ms on five consecutive retries. That pattern is a **cold start**,
not an outage: Render's free tier spins a service down after inactivity and the
first request afterwards waits roughly 30–60 seconds while it wakes.

So the links work, and no code change was needed — but the first recruiter to
click "Live Demo" after a quiet period gets a blank tab for up to a minute, and
will read that as broken. Worth a paid instance or a keep-warm ping on whichever
of these you most want people to actually open.

### Referenced in code but not currently rendered

`returnreminder.zubairmuwwakil.com` — **NXDOMAIN**, does not resolve. Used by
the "Return Reminder & Tracking SaaS" case study in
`client/src/pages/Portfolio.tsx`, which is not in `featuredProjectTitles` and so
never renders. Its repo `github.com/zubairmuwwakil/return-reminder-saas` is also
**404**. This project also looks superseded by Looply (same `return-saas` repo
lineage). Delete the entry, or revive and feature it.

### Verified working

`apps.apple.com/us/app/the-pickleball-social/id6759585852` (200) ·
`github.com/zubairmuwwakil` (200) · `github.com/zubairmuwwakil/return-saas`
(200) · `github.com/zubairmuwwakil/market-data-pipeline` (200) ·
`looply.zubairmuwwakil.com` (200) · `pickleball.zubairmuwwakil.com` (200, → `pbsocial.ca`)

### Unverifiable by machine

`https://www.linkedin.com/in/zubairmuwwakil/` is in the JSON-LD `sameAs`.
LinkedIn returns HTTP 999 to every non-browser client, so this is *unverified*
rather than failing. Open it in a browser and confirm — a `sameAs` entry that
404s weakens the whole Person entity.

**Update 2026-08-16:** resolved by the live SERP rather than a browser check.
The URL is live and indexed — but Google's stored title is
"Zubair M. - Software Engineer | Backend & Full-Stack - LinkedIn". The public
page renders the surname as an initial, so the profile cannot match the
full-name query. The `sameAs` target is fine; the surname-visibility setting is
the failure. See item 16a.

---

## 6. Résumé and case studies are Google Drive PDFs

Six links point at `drive.google.com` — the résumé plus four case-study PDFs.

Two problems. They are effectively unindexable, so every case study you wrote is
invisible to search and contributes nothing to the site's authority. And they
are permission-fragile: one sharing-setting change and a recruiter hits a
request-access wall with no way to tell you.

These should become on-domain HTML pages (`/resume`, `/work/pickleops`, …). The
blog infrastructure added in Task 9 already does most of what's needed —
markdown source, per-page canonical, per-page JSON-LD — so a `/work/:slug` route
would be a small extension of it.

**Not attempted in this pass, per your instruction.** Flagging that the case
studies are currently your most under-leveraged asset: real technical writing
that search engines cannot see.

---

## 7. ~~`projects.zubairmuwwakil.com` — consolidate into the apex?~~ — RESOLVED 2026-08-05

Consolidated, as you decided. There is now a `/projects` page on the apex listing
every project with its live/App Store/source/case-study links, and the Contact
section's "Projects" button points at it. The dead subdomain is no longer
referenced anywhere in the source.

**Optional DNS cleanup:** point `projects.zubairmuwwakil.com` at a 301 to
`https://zubairmuwwakil.com/projects/` (same Cloudflare rule pattern as item 2),
or retire the record. Not urgent — nothing links to it now — but a subdomain that
fails TLS is worth not leaving lying around if it was ever shared.

---

## 8. ~~Is the York University entry a degree?~~ — RESOLVED 2026-08-05

You confirmed it is coursework, not a conferred degree. Moved to the
Certifications section as `French Language Studies — York University — 2025`,
matching how the Azure certification and the TMU training were handled.

Education now contains degrees only: Ontario Tech and University of Toronto.

---

## 9. Ontario Tech "Postponed"

`Ontario Tech University — Master of Computer Science — 2024 – Postponed`.

Left on the page unchanged, as you decided. Two follow-ups:

1. It is **excluded from the JSON-LD `alumniOf`** — a postponed program is not
   alumni status, and asserting it in structured data would be a fabricated
   credential. `alumniOf` lists University of Toronto only.
2. The word "Postponed" renders in the date badge on the live page. It reads as
   unexplained to a recruiter. Consider "Deferred", "On hold — 2024", or an
   expected resumption date. Your call; I did not reword it.

---

## 10. ~~Confirm the contact email~~ — RESOLVED 2026-08-05

**`zmuwwakil@gmail.com` is correct**; it is the work address. The
`zmuwwakil1@gmail.com` seen on the authoring account is a separate personal
address. No change needed — the site was already right.

---

## 11. Review the first blog post before it is crawled

`client/content/blog/offline-first-sync-on-a-pickleball-court.md` —
"Why scorekeeping had to work with no signal".

It is in the sitemap and indexable, per your decision to ship the blog live
rather than empty. Every technical claim is drawn from the four PickleOps
decisions you supplied; no metrics, library names, schema details or
implementation specifics were invented. The general engineering reasoning around
them (why last-write-wins fails for scoring, why retries must be replay-safe) is
standard distributed-systems material, not a claim about your code.

It publishes under your name, so read it once and confirm it describes what you
actually built. Adjust freely — it is plain markdown.

**When you add a post, two steps:**

1. Drop the `.md` file in `client/content/blog/`. The sitemap picks it up
   automatically.
2. Add its route to `reactSnap.include` in `package.json`, or react-snap never
   visits it and it ships with no crawlable HTML. The build prints a warning if
   you forget.

---

## 12. Minor — `client/public/logo.png` is a 2.4 MB file nothing references

`favicon.png` was a **2.4 MB, 1024×1024 PNG** requested on every page view — the
heaviest asset on the site, working directly against the ranking goal. It is now
32×32 (4 KB) with a 180×180 `apple-touch-icon.png` (56 KB) alongside.

`logo.png` is byte-identical to the original and is **not referenced anywhere in
the source**, so it now serves as the archived 1024px master. It still ships in
the Pages artifact and accounts for 2.4 MB of a 5.9 MB deploy. It costs visitors
nothing (no page requests it), so I left it rather than delete it — but if you
have the original elsewhere, removing it or moving it out of `public/` would cut
the deploy roughly in half.

---

## 13. Minor — `server/` duplicates the site content and has drifted

`server/routes.ts` carries a full second copy of the profile, experience,
education, project and skills data as DB seed values. Nothing renders from it:
`client/src/hooks/use-portfolio.ts` reads the static file, and the GitHub Pages
deploy has no server at all.

I kept it in sync for the GitHub handle and the MindSky link, but it has **not**
been updated for the certifications split, `employmentType`, the PickleOps
rewrite, or the Brooklyn copy. Two sources of truth is how `ZthEchelon` survived
in three files.

Either delete the seed block, or have it import from `client/src/data/portfolio.ts`.
Not touched here — it is outside the content/metadata/links scope you set.

---

## 14. The résumé PDF is now out of date relative to the site

Added 2026-08-05, after the employment-type and date corrections.

`/resume/` (the HTML page) reflects the corrected data. **`/resume.pdf` does
not** — it is a copy of the Drive original, taken before those corrections, so it
still says:

| Field | PDF says | Correct |
|---|---|---|
| NDCTrades | absent entirely | Sep 2022 – Jun 2023, Internship |
| U of T BSc | 2019 – 2023 | 2020 – 2025 |
| Employment types | none | Contract / Part-time / Part-time → Full-time / Internship |
| Azure cert issuer | University of Calgary | Microsoft |
| GitHub link | `github.com/ZthEchelon` (404) — unverified, see below | `github.com/zubairmuwwakil` |

This matters because a recruiter can read the page and download the PDF in the
same visit, and the two disagree on dates. That is worse than either being
imperfect on its own.

**To fix:** update the Drive document, export a fresh PDF, and drop it at
`client/public/resume.pdf`. I'll wire nothing further — the path is already
served and linked from `/resume/` and the hero button.

On the GitHub link specifically: the markdown export you supplied contained
`ZthEchelon`. I could not verify the PDF itself — PDF text lives in compressed
streams and the tooling here cannot read it. Check it directly when you open the
document.

---

## 15. The MarketLens case study describes a build the public repo doesn't contain

Found 2026-08-05 while drafting a README for `zubairmuwwakil/marketdata`.

The case study at `/projects/marketlens/` — written from the résumé — claims
Bucket4j rate limiting and quota tracking, Prometheus metrics, OTLP tracing,
correlation IDs, and OpenAPI/Swagger. **None of those appear in the public
repo's `pom.xml`**, which declares only: actuator, flyway (+ postgres), data-jpa,
webmvc, postgresql, lombok.

The deployed service is clearly a later build than the public repo:

| | `marketdata` repo | marketdata.zubairmuwwakil.com |
|---|---|---|
| `/` | `RootController` returns a `String` | full HTML dashboard, titled "MarketLens — Market Data Pipeline" |
| `/api/v1/candles` | endpoint does not exist | **401** — API-key auth enforced |
| Bucket4j / Micrometer / OTel / springdoc | absent from pom.xml | claimed on the résumé |

So the strongest backend evidence in the whole footprint is running somewhere
that is not public.

**Update (2026-08-06): the "Source" link is now repointed to `marketdata`** at
your request. The mismatch above is unchanged by that — a reviewer who clicks
Source still lands on a repo that does not contain the rate limiting,
observability, or `/api/v1/candles` the case study describes. Worth closing with
one of the options below.

Options, roughly in order of value:

1. **Push the deployed code to `marketdata`.** Makes the strongest claims
   checkable and the repo pin-worthy. Check for committed secrets first — the
   live service has an API-key system, so there is a real chance of a key in
   config history.
2. **Qualify the case study** to describe only what is public, and move the
   rate-limiting/observability material into a "what the deployed service adds"
   note that does not imply the source is available.
3. **Drop the Source link entirely**, the way PickleOps does, and let the live
   demo and case study carry it.

A README draft for the repo as it stands is at
`repo-readmes/marketdata-README.md`. It deliberately claims none of the
unbacked features and states plainly that the deployment runs ahead of the repo.

Also in that repo: three `.DS_Store` files are committed, and the description is
null. Both fixable with the commands in the draft's header comment.

---

## 16. LinkedIn and GitHub are missing from Google page one — diagnosis

Added 2026-08-16, from the live SERP for "zubair muwwakil". The site side was
re-verified the same day and is **not** the problem: the live homepage carries
the Person JSON-LD with `sameAs`, four visible LinkedIn and four GitHub links in
the prerendered HTML, sitemap and robots are correct, and `www` 301s cleanly to
the apex. No repo change is needed or made. Three things outside the repo are.

### a. LinkedIn publicly renders the name as "Zubair M."

Google's stored title for the profile:
`Zubair M. - Software Engineer | Backend & Full-Stack - LinkedIn`.
The string "Muwwakil" does not appear on the public page, so the profile cannot
match the full-name query — no amount of site markup fixes that. The proof by
contrast: Instagram, YouTube, and Facebook all carry the full name and all rank
on page one. Fix, in account settings (~2 minutes):

1. Me → **Settings & Privacy → Visibility → "Who sees your last name"** → your
   full last name (not "first name and last initial").
2. `linkedin.com/public-profile/settings` → public profile visibility **on**,
   sections visible.
3. Profile → Contact info → add `https://zubairmuwwakil.com` (this is the
   reciprocal link that lets Google confirm the site's `sameAs` claim).

### b. Google's copy of the site predates the Pages migration

The #1 result's snippet is still old Google Sites content — "Bachelors of
Computer Science | graduated from University of Toronto. [647-643-5497]" — text
and a **phone number** that occur nowhere on the live site (verified: zero
matches on `/` and `/resume/`). Until Google recrawls, the shipped entity work
is invisible to it. Search Console is confirmed absent (no meta token in the
built HTML, no `google-site-verification` DNS TXT — matches the 2026-08-08
design doc's finding). Fix (~10 minutes, needs your Google account):

1. `search.google.com/search-console` → add property → **Domain** →
   `zubairmuwwakil.com` → add the TXT record at the registrar. (Alternative:
   URL-prefix property with the HTML-tag method — supply the token and it can
   be committed to `client/index.html`.)
2. Sitemaps → submit `https://zubairmuwwakil.com/sitemap.xml`.
3. URL Inspection → **Request indexing** for `/`, `/resume/`, `/projects/`.
4. While there: if the old Google Sites is still *published* under your
   account, unpublish it — it is a competing duplicate of the entity and the
   source of the stale phone-number snippet.

### c. GitHub needs nothing but time (and, optionally, pins)

The profile is already complete: display name "Zubair Muwwakil", keyword bio,
`blog = zubairmuwwakil.com` (the reciprocal link), and the profile README live
since 2026-08-06 with the full name, project table, and site/LinkedIn links.
Google is actively crawling the account — command-quest snippets in the SERP
are dated Aug 11–13. Optional polish: pin `command-quest`, `marketdata`,
`mindmap`, and `return-saas` (web UI only) so the profile page leads with the
work the site links to.

### Why this matters under the "closer, not opener" strategy

Nobody discovers you by Googling your name — but every recruiter who already
has your name Googles it before a call. Page one currently answers them with a
company registry entry reading "Dissolved for non-compliance", a restaurant
review, and an AI Overview that says you are "based in Ontario, Canada" —
sourced from that registry — while you sit in Brooklyn. The AI Overview builds
its answer from whatever entity signals exist; today the registry outweighs
your profiles because Google hasn't ingested the new site or a full-name
LinkedIn. Items (a) and (b) displace that junk with pages you control.

Expected lag once (a) and (b) are done: days to ~2 weeks for LinkedIn and the
refreshed site snippet; a few weeks for the GitHub profile to surface. One
caveat when checking progress: the SERP that prompted this item was
personalized ("Results are personalized" footer) — verify from a signed-out or
incognito window.

### Status — verified against account screenshots the same day (2026-08-16)

**16a (LinkedIn) — settings are correct; the lag is Google's.** Last-name
visibility is set to the full "Zubair Muwwakil", the public-profile toggle is
on, and Contact info carries both `zubairmuwwakil.com` (Personal) and
`github.com/zubairmuwwakil` (Portfolio). The "Zubair M." in Google is
therefore a **stale crawl** of the profile page, not a live setting — nothing
left to click; the freshly recrawled site (four links to the profile) and
GitHub (crawled constantly, links it twice) are the recrawl paths. Two
cosmetic notes: a third, empty Website row (type "Blog") was left mid-edit in
Contact info — fill with `https://zubairmuwwakil.com/blog/` or Remove before
saving — and "Past experience" is the one public-profile section set to Hide,
so logged-out viewers (and Google) see only the G2i role. Optional either way.

**16b (Search Console) — exists, works, but its verification anchor is gone.**
A `zubairmuwwakil.com` domain property and a `https://www.zubairmuwwakil.com/`
prefix property are live; indexing was requested same-day for `/` and
`/resume/` (both "URL is on Google"; `/resume/` shows "Profile page — 1 valid
item detected", so Google is parsing the Person structured data). Two
residuals:

1. **The DNS TXT that verifies the domain property is no longer in DNS** —
   re-checked 2026-08-16: the apex answers only the SPF record. Google
   periodically re-confirms ownership; when it can't, the domain property
   unverifies, taking the piggybacked www prefix property with it. Re-add it:
   GSC → Settings → Ownership verification → copy the
   `google-site-verification=…` string → registrar DNS → TXT record @ apex.
   Belt-and-suspenders: an HTML-tag token (Add property → URL prefix →
   `https://zubairmuwwakil.com/` → HTML tag method) can be committed into
   `client/index.html` so one verification path never depends on DNS.
2. **Sitemap submission unconfirmed.** The sitemap lists 10 URLs; indexing was
   hand-requested for 2. Domain property → Sitemaps → submit
   `https://zubairmuwwakil.com/sitemap.xml` so `/projects/`, the five case
   studies, and the blog get queued too.

**16c (GitHub) — done.** Pins are set (pickleops, marketdata, mindmap,
return-saas — pickleops in place of command-quest, which is the better pick),
and the sidebar now also carries ORCID, LinkedIn, X, dev.to, and the App Store
link.

**Old Google Sites — unpublished by owner, same day.**

**Skipped deliberately: the LinkedIn public-profile badge.** The badge embeds
a `platform.linkedin.com` script to render what is functionally a styled link;
the site already carries four plain-HTML links to the profile, which is the
part crawlers read. Third-party script weight for zero marginal signal.
