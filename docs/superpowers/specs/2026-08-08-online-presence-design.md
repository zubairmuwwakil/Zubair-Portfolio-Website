# Online presence: strategy and repo changes

Date: 2026-08-08
Status: approved, pending execution

## Context

The starting request was to reproduce Mathurah Ravigulan's Google results as a
template for success. That framing was tested against six alternative models of
engineer online presence and three adversarial challenges. It did not survive.

This document records what replaced it, what is in scope for this repo, and what
only Zubair can do.

**Confirmed constraint:** actively looking to leave G2i within 12 months. Every
priority below is ranked on that urgency. If it changes, the ranking inverts —
see "What would change this."

## The finding

The Mathurah template is wrong for a backend engineer, for two structural reasons.

**Field mismatch.** Design engineering is a discipline where the personal site
*is* the work sample; a hiring manager judges the page itself. Backend work
cannot be shown, only described, and prose descriptions of backend work are
near-indistinguishable between candidates. Her site is load-bearing. Ours is
confirmatory.

**Reverse causality.** Her ranking is performed by Netflix, Replit, Shopify and
Microsoft — knowledge-graph-tier entities co-occurring with her name on pages she
never wrote. Her actual order was co-op → employers → SF → communities →
fellowships → audience → site-as-record. The site documents the trajectory; it
did not generate it. G2i, Senac, NDCTrades and Elevation Athletics carry
near-zero entity weight, so there is nothing for an entity graph to attach to.

**The error underneath both.** A zero-competition name is not an opportunity, it
is evidence of zero demand. Nobody searches a name they have never heard.
`zubairmuwwakil.com` will rank #1 for "Zubair Muwwakil" on the SEO already
shipped, and that converts nothing on its own, because the query only fires after
a human already has the name — the moment the discovery problem is already solved.

Search is a closer, not an opener. The site was worth building and is done. The
bottleneck is that no engineer at a company with an open req has been *told* about
him by someone they trust.

### Evidence verified locally

| Claim | Result |
|---|---|
| Blog post length | 767 words, one pseudocode block, no benchmark |
| Case study lengths | 457–798 words each; 2,544 total across four |
| SEO work already shipped | 46 commits, 6,549 insertions in 72 hours |
| Search Console verification | Absent — no token in `client/index.html` or `client/public/` |
| `sameAs` contents | GitHub, LinkedIn, Instagram, Facebook — two personal socials, zero credentials |
| Founder-title callback penalty | Real. Botelho & Chang, *Organization Science* 34(1):484–508 (2023): former founders received 43% fewer callbacks; successful founders fared 33% worse than failed founders |
| Looply repo README | Claim of create-next-app boilerplate is **false** — README is custom. The NEEDS-INPUT note is stale |
| Referral multiplier (~10x) | Direction well-established; the specific figure traces to Zippia and should be treated as soft |

## Positioning

Two surfaces, two jobs. Do not use the same string for both.

**Site intro — human voice, no metrics:**

> I'm a software engineer. I work on backend systems — APIs, data pipelines, and
> the parts that need to stay correct when something goes wrong.
>
> I usually end up building for things I'm already part of. I coach a pickleball
> league, so I built the platform it runs on. I spent close to three years doing
> finance reporting by hand, so I automated it. It wasn't a strategy; it's just
> how I've ended up learning.

**Résumé / LinkedIn summary — metrics forward:**

> I build and operate the platform behind a youth athletics program — 1,000+
> participants across 8 cities, scaled from ~50, repeat sign-ups from ~20% to
> ~89%, with an iOS client shipped through 21 releases in five months.

The category is **sports-ops / league-tech operator-engineer**, with a parallel
**fin-ops automation** track (C#/.NET close-cycle work on SQL Server). Not
"backend/full-stack engineer," which is the largest and most saturated pool in
the market.

Accuracy note: finance work is ~2 years 10 months (Senac ~2 years + NDCTrades
~10 months). Write "close to three years," never "four."

## Workstreams, ranked

Owner column: **Z** = only Zubair can do it. **R** = repo work.

| # | Workstream | Effort | Time to result | Owner |
|---|---|---|---|---|
| 1 | Reposition résumé, LinkedIn, portfolio data to operator-engineer | ~8h once | 2–5 weeks | Z + R |
| 2 | Vendor case-study placements — Expo, WatermelonDB/PowerSync, Neon or Supabase, Render, DUPR | 6–10h total | 3–10 weeks | Z |
| 3 | Referral outreach — 5 personalized messages/week to engineers (not recruiters) at 40 named companies | 2h/week | 3–8 weeks | Z |
| 4 | Interview preparation — backend system design, query-plan reasoning, Django/Spring depth, scheduled mocks | 4h/week | immediate on first loop | Z |
| 5 | Substantive answers on already-ranking pages — Stack Overflow (offline-first sync, conflict resolution), r/django, r/expo | 2h/week | weeks to index | Z |
| 6 | Depth over cadence — 3–5x current depth, one topic cluster, original measurements | 45–60h | 9–24 months | Z + R |
| 7 | Cheap page-minting — `npm publish` Glicko-2 / version-vector primitive; GitHub repo topics; App Store Developer Name audit; "Built by" credit on pbsocial.ca | ~20h | weeks | Z + R |

Target list for #1 and #3: DUPR, LeagueApps, CourtReserve, TeamSnap, Break the
Love, Playbook, Skedda, Hudl, Teamworks. Plus fin-ops automation shops.

## Chores — one sitting, then stop

- Verify Google Search Console. This is measurement, not ranking. Account access
  already exists.
- Add **"authorized to work in the US and Canada without sponsorship"** to the
  LinkedIn headline, GitHub bio, and résumé header. Doubles the addressable req
  pool at zero cost.
- Rewrite LinkedIn headline and skill slots for boolean match: Django,
  PostgreSQL, SQL Server, Docker, REST, C#/.NET, Next.js, TypeScript, NYC.
- Fix or remove cold-starting demo links. A 60-second blank tab reads as broken
  and costs more than the link earns.

## Explicitly not doing

- **Fellowships** (Cansbridge, Neo, Interact, RippleX). Undergrad-gated, current-
  student-sourced, or peer-nominated. Outside the sampling frame, not merely
  unlucky. Ten programs bought Mathurah one linkless page.
- **Spoke buildout** on X, Medium, Dev.to, Substack. Plumbing for a zero-volume
  query. Cross-post with `rel=canonical` only if it costs ten minutes.
- **Further entity-graph, share-card, or `verify:seo` work.** Layer 1 banked
  100% of its achievable value. Frozen.
- **"Founder" or "Creator" as a job title** for Pickleball Social, pbsocial.ca,
  Looply, or MindSky. Keep every metric and claim; present them as projects.
  See Botelho & Chang above.
- **Build-in-public / daily posting.** Needs 10–20h/week for 6–12 months; a
  half-executed version carries the cost with none of the volume.
- **Library authored for stars,** or chasing a maintainership invitation.
- **U of T alumni pitch** as a plan leg. 2h lottery ticket at best; it will not
  link out.

## Repo changes in scope

| Change | File |
|---|---|
| Replace headline/intro with the approved site copy | `client/src/pages/Portfolio.tsx`, `client/index.html` |
| Sync JSON-LD `description` to the new positioning | `client/index.html` |
| Rewrite `sameAs`: drop Facebook and Instagram, add App Store developer page, pickleops repo, Stack Overflow | `client/index.html` |
| Add work-authorization line | `client/content/resume.md`, `client/src/data/portfolio.ts` |
| Lead résumé summary with operator metrics | `client/content/resume.md` |
| Add Search Console verification file once token is supplied | `client/public/` |

`sameAs` removal requires explicit confirmation before execution — it deletes
existing content.

## Measurement and kill criteria

Instrument the falsification rather than assuming either side is right.

- Ask every recruiter contact: "how did you find me?" Record it.
- Watch Search Console for **non-brand** query clicks, not name impressions.
- **If organic search produces 3+ attributable inbound contacts in 90 days**, the
  SEO thesis is stronger than credited here and the writing budget should go back up.
- **If non-brand clicks exceed ~20/month by day 90**, same conclusion.
- **If sports-tech outbound gets zero replies in 30 messages**, the niche is
  smaller or more closed than it looks; fall back to the fin-ops track plus
  conventional application volume.
- Ranking #1 for his own name is not evidence of anything.

## What would change this

- **Not actually leaving G2i.** The entire ranking is built on urgency. If the
  goal became "well-known in three years" rather than "employed elsewhere in
  six months," open-source depth, one topic cluster, and speaking move to the
  top and outbound drops to background.
- **A Show HN or newsletter pickup above ~250 points.** Roughly a 1-in-20 event
  per submission; justifies leaning hard into writing, but cannot be planned around.

## Unverified, and it matters

- **No documented case was found of a 0–3-year backend engineer converting
  content — blog, LinkedIn, X, or build-in-public — into a traditional salaried
  engineering role.** Adjacent conversions (funding, founding, OSS contracts)
  were found readily; this one was not. That is the strongest single argument in
  the packet, and it is an absence, not a proof.
- **Recruiter conversion from GitHub is unverified.** Claims trace to vendor
  marketing. What is verifiable is the `followers:>100` sourcing filter; current
  count is 0.
- **App Store Developer Name mechanism is plausible but unconfirmed.** Worth a
  ten-minute check, not a workstream.
- **Whether U of T DCS publishes spotlights for employed recent grads** rather
  than founders, donors, and award winners.
