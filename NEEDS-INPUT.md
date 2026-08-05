# NEEDS-INPUT

Items that could not be resolved from the repository. Nothing here was guessed
at or written into the site. Ordered by how much damage it does while unresolved.

Last updated: 2026-08-05

---

## 1. BLOCKING — Set the GitHub Pages custom domain to the apex

Everything in this branch declares `https://zubairmuwwakil.com/` as canonical.
The Pages custom domain is currently `www.zubairmuwwakil.com`, which is why the
apex 301-redirects to `www` today.

**You must do this — it is a repo setting, not a file:**

> Settings → Pages → Custom domain → `zubairmuwwakil.com` → Save → wait for the
> certificate to reissue, then tick "Enforce HTTPS".

`client/public/CNAME` already says `zubairmuwwakil.com`, but for
Actions-deployed Pages sites the UI setting is authoritative — that mismatch is
exactly why the file said `portfolio.zubairmuwwakil.com` while the site served
from `www`.

Once saved, GitHub flips the redirect so `www` 301s to the apex. Until then the
canonical URL points at a host that redirects, which is the milder version of
the bug this branch set out to fix.

Expect a few minutes where HTTPS fails while the new certificate is issued.

---

## 2. BLOCKING — `portfolio.zubairmuwwakil.com` returns 404, not a 301

The old host currently resolves to Cloudflare (`172.64.80.1`) and returns a
GitHub 404. Every crawled URL and inbound link on that host is a dead end, so
none of its accumulated ranking signal transfers to the apex.

**This cannot be fixed from this repo.** GitHub Pages serves exactly one custom
domain per site; it cannot 301 a second hostname you also control. There is no
`vercel.json`, `netlify.toml` or `_redirects` here to add a rule to — the
deployment is `.github/workflows/deploy.yml` → GitHub Pages.

Fix it at the DNS/CDN layer. Since the host already points at Cloudflare, the
cheapest option is a Cloudflare **Redirect Rule** (free tier):

- Match: hostname equals `portfolio.zubairmuwwakil.com`
- Action: dynamic redirect, **301**, to
  `concat("https://zubairmuwwakil.com", http.request.uri.path)`
- Preserve query string: on

Path preservation matters: `portfolio.zubairmuwwakil.com/x` should land on
`zubairmuwwakil.com/x`, not the homepage.

---

## 3. Which of the four overlapping roles are contract / part-time / full-time

Four roles overlap; at one point in 2023–2024 three run concurrently. Without
employment types a reader's most likely reading is that the dates are inflated.

`employmentType` has been added to the `Experience` type and renders as a badge
beside the role. Fill these in at `client/src/data/portfolio.ts` — the commented
`// employmentType: pending` lines mark each spot. Valid values: `"Full-time"`,
`"Part-time"`, `"Contract"`, `"Internship"`.

| # | Company | Role | Dates | employmentType |
|---|---|---|---|---|
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

### Still rendered but broken — I could not fix these from the repo

| What | URL | Result |
|---|---|---|
| MarketLens "Live Demo" | `marketdata.zubairmuwwakil.com` | **Connection timeout.** DNS resolves to Cloudflare; no origin responding. |
| MindSky "Live Demo" | `mindsky.zubairmuwwakil.com` | **Connection timeout.** Points at `mindmap-0ztk.onrender.com` — a sleeping or deleted Render service. |
| Contact "Projects" button | `projects.zubairmuwwakil.com` | **SSL error** — certificate has no matching subject name. See item 7. |

These are still live on the page because removing them would gut the MarketLens
and MindSky cards entirely. Either restore the hosts or tell me to drop the
buttons, and note that a "Live Demo" button that hangs is worse than none.

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

## 7. `projects.zubairmuwwakil.com` — consolidate into the apex?

The Contact section links to `projects.zubairmuwwakil.com`, which currently
fails TLS (certificate has no matching subject name). DNS points it at
`zubairmuwwakil.github.io`, so it is another Pages site that has lost its
certificate.

Recommendation: **fold it into the apex as `/projects`.** A separate subdomain
splits ranking signal across two hosts and doubles the certificate and DNS
surface — which is what just broke. One host accumulating authority is the
entire point of the canonical work in this branch.

Decide, then either: repoint the link at `/projects` and build that route, or
fix the certificate on the subdomain. Right now the button is broken either way.

---

## 8. Is the York University entry a degree?

`client/src/data/portfolio.ts` lists:

```
York University — "French Language Studies", field "Language Studies", 2025
```

The Azure certification and the Ted Rogers/TMU training were moved into the new
Certifications section because neither is a degree. This entry was **left in
Education** because I can't tell from the repo which it is — the `degree` field
holds a subject name rather than a credential (`"Bachelor of Computer Science"`,
`"Master of Computer Science"`), matching the pattern of the two entries I moved.

If it's coursework or a certificate, move it to `certifications`. If it's a
conferred degree, set `degree` to the actual credential.

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

## 10. Confirm the contact email

The site uses **`zmuwwakil@gmail.com`** (`client/src/data/portfolio.ts`,
`server/routes.ts`, and the mailto CTAs). The account this work was done from is
`zmuwwakil1@gmail.com`.

If the site address is wrong, it is the single most expensive error on the page —
every inbound recruiter reply goes nowhere and you would never know. Please
confirm. One value in `contactEmail` / `profile.email` drives every mailto.

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

## 12. Minor — `server/` duplicates the site content and has drifted

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
