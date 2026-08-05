# NEEDS-INPUT

Items that could not be resolved from the repository. Nothing here was guessed
at or written into the site. Ordered by how much damage it does while unresolved.

Last updated: 2026-08-05 (post-merge, deployed)

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

---|---|---|---|---|
| 1 | G2i Inc. | Software Engineer | Aug 2025 – Present | **`"Contract"`** — already set, taken from the old role string "Software Engineer (Contract)" |
| 2 | The Senac Group | Financial Software Analyst | Jun 2023 – May 2025 | **needed** |
| 3 | Elevation Athletics | Regional Program Coordinator | Mar 2023 – Present | **needed** |
| 4 | NDCTrades | Finance Solutions Architect | Sep 2023 – Sep 2024 | **needed** |

Note #3 is still marked `Present` alongside #1. If Elevation Athletics has
ended, set its `endDate` — two concurrent "Present" roles invites the question.

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

### Removed from the page — need replacement URLs

| What | URL | Result |
|---|---|---|
| PickleOps repo | `github.com/zubairmuwwakil/pickleball-session-manager` | **404** — renamed, private, or deleted. The App Store link now carries this card. |
| MindSky repo | pointed at `github.com/zubairmuwwakil` (bare profile) | Not a repository. Supply the repo URL or leave it off. |

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
