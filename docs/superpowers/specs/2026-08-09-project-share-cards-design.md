# Project share cards

Date: 2026-08-09

## Problem

Two linked defects in the project cover images.

**The artwork carries AI-generation artifacts.** Five of six covers contain
garbled text. `commandquest-cover.png` is clean and sets the quality bar.

| Cover | Defects |
| --- | --- |
| `pickleops-cover.jpg` | "SESSIONS SCHADULED"; garbled player-card numbers ("SE.A.27", "8S.A.19"); garbled speech bubble; "LOCK COURTS" duplicated; every player holds a **tennis racket on a tennis court**; app titled "Pickleball Session Manager", a name used nowhere on the site |
| `mindsky-cover.jpg` | "LIGHTWIGHT ANIMATIONS", "TyStStript", "Sharper stortylling", "Accessiblity" |
| `marketlens-cover.jpg` | "PREDICABLE COSTS", "REST ENDPONDS", "Blapn Bova", "INDEXES" duplicated |
| `looply-cover.jpg` | "ACMLETED" |
| `return-reminder-cover.jpg` | "Return Savvy" (a product name absent from the site), "guarnteed", "EMAIL IGESTION", "NodePostgres", "£250.00" in sterling; pastel clipart style unlike every other cover |

Priority: pickleops (flagship, wrong sport, two pages) > mindsky ("TypeScript"
mangled on a software engineer's portfolio) > marketlens ("REST ENDPONDS" on a
backend engineer's card) > looply (one word). `return-reminder-cover.jpg` is
last — see "Findings that changed the brief" below.

**Square covers lose their titles when shared.** `client/index.html` sets
`twitter:card=summary_large_image`, a 1.91:1 slot. A 1024×1024 image
center-cropped to 1.91:1 keeps only rows 244–780, discarding 244px top and
bottom. Every cover puts its title in that top band, so "Looply", "MindSky" and
"PICKLEBALL CLUB" all vanish in an unfurl.

## Findings that changed the brief

Two premises in the original brief did not survive verification.

**The covers are displayed on the site.** A grep for `cover` missed them because
`client/src/pages/Portfolio.tsx` assigns them to a field named `photo`. Four of
the five broken covers render in the Featured Projects carousel at
`Portfolio.tsx:848`, up to 520px tall, each clickable into a full-size modal:

```js
featuredProjectTitles = ["PickleOps — The Pickleball Social", "Looply", "MarketLens", "MindSky"]
```

Those are exactly the four broken ones; Command Quest, the clean one, is not in
the carousel. The typos are visible to visitors today at full resolution.
`client/src/components/ProjectCard.tsx` also renders covers but has no call
sites — it is dead code.

Consequence: covers must stay roughly square, because the carousel and modal
consume them. This confirms rather than contradicts the two-asset split — a
square cover for the page, a 1200×630 card for the unfurl.

**A sixth cover exists.** `return-reminder-cover.jpg` was not in the audit. It
belongs to a `projectCaseStudies` entry, "Return Reminder & Tracking SaaS", that
is *not* in `featuredProjectTitles` and has no markdown case study — so it is
never rendered and is never an og:image. It is dead data. That project also
appears to be the same codebase as Looply, whose `repoUrl` is `return-saas`.
Deciding its fate is a content question outside this spec; until then it needs
no card and no artwork.

## Layout

Cover art contained on one side, never cropped; title, subtitle, stack and
domain set beside it. 1200×630, in the site's dark-theme tokens — background
`hsl(230 30% 6%)`, primary `hsl(273 83% 67%)`, accent `hsl(187 82% 56%)`.

```
┌─────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓ 8px gradient bar ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│                                 ┌─────────────┐ │
│  CASE STUDY                     │             │ │
│  PickleOps                      │  cover art  │ │
│  The Pickleball Social          │  452×452    │ │
│  [React Native] [TypeScript]    │  contained  │ │
│  ─────────────────────────      │             │ │
│  zubairmuwwakil.com             └─────────────┘ │
└─────────────────────────────────────────────────┘
```

**This layout removes text from the art's job.** Every artifact in the audit is
a text artifact. With the title set in HTML, the replacement artwork does not
need to contain legible text at all — which retires the entire failure class
rather than re-rolling it. What the art must still get right is subject matter:
pickleball paddles and a pickleball court, not tennis.

Rejected alternatives:

- **Full-bleed art behind a scrim.** Most striking in a feed, but it crops the
  square back to 1.91:1 — the bug being fixed — and mutes illustration detail.
- **Title-forward with the art as a small badge.** Matches the existing og-card
  most closely and reads best at small sizes, but shrinks the art to decoration.

## Scope: six cards

Five case studies and one blog post.

| Source | Slug | Output |
| --- | --- | --- |
| `client/content/projects/command-quest.md` | `command-quest` | `command-quest-card.png` |
| `client/content/projects/looply.md` | `looply` | `looply-card.png` |
| `client/content/projects/marketlens.md` | `marketlens` | `marketlens-card.png` |
| `client/content/projects/mindsky.md` | `mindsky` | `mindsky-card.png` |
| `client/content/projects/pickleops.md` | `pickleops` | `pickleops-card.png` |
| `client/content/blog/offline-first-sync-on-a-pickleball-court.md` | `offline-first-sync-on-a-pickleball-court` | `offline-first-sync-on-a-pickleball-court-card.png` |

The blog post needs its own card even though it borrows
`pickleops-cover.jpg`: without one it would unfurl as "PickleOps — The
Pickleball Social" on a post titled "Why scorekeeping had to work with no
signal."

Card filenames derive from the **slug**, not the cover, which is what lets those
two pages share one illustration under different titles. Slugs are markdown
filenames (`case-studies.ts:60`, `posts.ts:30`), so they are unique per
directory but could in principle collide across directories; the generator
fails on a duplicate output name rather than silently overwriting.

Cards live flat in `client/public/assets/` because
`script/vite-plugin-share-image-sizes.mjs` reads that directory
non-recursively. A `cards/` subdirectory would require changing the plugin.

## Components

### `script/find-chrome.mjs` (new, extracted)

Chrome resolution already exists twice — `findChrome` in
`generate-og-image.mjs:27` and `findChromeExecutable` in `run-ssg.mjs:17`, the
former carrying a comment acknowledging the duplication. A third copy is worse
than an extraction. One exported `findChrome()`, preserving the current order:
`PUPPETEER_EXECUTABLE_PATH`, then `which` against a fixed binary list via
`execFileSync` (no shell), then the two macOS app paths, then
`puppeteer.executablePath()`. `run-ssg.mjs`'s variant tolerates
`executablePath` being a string rather than a function; the merged version keeps
that tolerance. Both existing callers switch to it.

### `script/generate-share-cards.mjs` (new)

Renders all six cards. Mirrors `generate-og-image.mjs`: build an HTML string,
`setContent`, `setViewport({width: 1200, height: 630})`, screenshot to PNG,
one browser instance reused across all six.

Reads frontmatter with a small Node-side parser. It cannot import
`client/src/lib/markdown.tsx` — that is TSX, resolved by Vite, not by node —
so the three fields it needs (`title`, `stack`, `cover`, plus `tags` as a
fallback) are read locally. The parser handles the same shape the app's does:
`key: value` lines and `[a, b, c]` inline lists.

Field mapping:

- **Headline and subtitle** split the title on the em dash `—`. All five
  project titles already use that form ("PickleOps — The Pickleball Social").
  A title with no em dash — the blog post — renders whole with no subtitle.
- **Eyebrow** is `CASE STUDY` for `content/projects`, `BLOG` for
  `content/blog`.
- **Stack pills** take the first four of `stack`, falling back to `tags` when
  `stack` is absent (the blog post has only `tags`).
- **Cover** is embedded as a base64 data URI, `object-fit: contain` inside the
  452px panel so no crop is possible regardless of the source aspect ratio.

Fails the run, rather than emitting a broken card, when: a `cover` path is
missing from disk, an image is unreadable, or two items resolve to the same
output filename.

Wired as `"cards": "node script/generate-share-cards.mjs"` and kept **out** of
the build chain, matching `npm run og` — puppeteer renders are slow and the
outputs are committed assets.

### `client/src/lib/schema.ts`

```ts
export function shareImage(cover?: string, slug?: string): string {
  const card = slug ? `/assets/${slug}-card.png` : undefined;
  if (card && shareImageSizes[card]) return `${SITE_ORIGIN}${card}`;
  if (!cover) return DEFAULT_SHARE_IMAGE;
  return cover.startsWith("http") ? cover : `${SITE_ORIGIN}${cover}`;
}
```

`virtual:share-image-sizes` already enumerates every asset with its real
dimensions, so "does this card exist" needs no new mechanism. Both call sites —
`CaseStudy.tsx:20` and `BlogPost.tsx:18` — already hold the slug.

`og:image:width`/`height` are derived from the file by `shareImageSize()` and
need no change; they follow the new cards automatically.

### JSON-LD image

`CaseStudy.tsx` and `BlogPost.tsx` currently pass the same `shareImage()` result
to both `og:image` and the schema `image`. Google's Article guidance asks for
high-resolution images in 16x9, 4x3 **and** 1x1 aspect ratios; 1.91:1 is not
among them, while the square cover is exactly the 1x1 case. Pointing the schema
`image` at the card alone would therefore trade a recommended ratio for an
unrecommended one.

Decision: `image` becomes an array `[card, cover]` when both exist, and stays a
single string otherwise. `og:image` remains a single URL — it must be. This
needs a corresponding update to the JSON-LD assertions in `verify-seo.mjs`,
which currently expect a string.

### `script/verify-seo.mjs`

Add an aspect-ratio assertion for content routes: `width / height` must fall
between 1.85 and 1.95. The target, 1200÷630, is 1.905; a 1024×1024 cover is
1.000 and fails clearly. The band rather than an exact `1200×630` check so a
future card at a different size but the same shape still passes. Dimensions are
already measured from the real bytes in `dist` (`verify-seo.mjs:84`), so this
reuses the existing measurement.

This deliberately opposes the fallback in `shareImage()`. The fallback keeps dev
and preview working when a card is missing; the guard makes that same state fail
`npm run build:ssg`. Graceful locally, strict at the gate — consistent with how
the file already treats every other SEO invariant. Adding a case study without
running `npm run cards` will fail the build, and the fix is one command.

## Artwork verification

Zubair supplies replacement artwork; it cannot be generated here. **No existing
image file is deleted, overwritten or altered without explicit approval.** Each
replacement is checked before anything downstream runs:

1. Dimensions are 1024×1024, matching the covers the carousel and modal expect.
2. Format is PNG or JPEG — the only formats `script/image-size.mjs` parses; an
   unknown format throws and fails the build.
3. The image is read and every visible string checked for spelling.
4. PickleOps specifically: pickleball paddles, a pickleball court, and no stale
   "Pickleball Session Manager" product name.

## Order of work

1. Zubair replaces artwork, priority order above.
2. Verify each replacement per the checklist.
3. `npm run cards`.
4. Visually confirm the six cards.
5. `npm run build:ssg` — `verify-seo.mjs` gates it. A worktree gets no
   `npm install`, so this fails at the ssg step with
   `spawn .../node_modules/.bin/react-snap ENOENT` until the binary is linked
   from the main checkout:

   ```bash
   mkdir -p node_modules/.bin && ln -sf /Users/zub/Documents/Github_Projects/Zubair-Portfolio-Website/node_modules/react-snap/run.js node_modules/.bin/react-snap
   ```
6. Get approval, then merge — merging to `main` deploys to production
   immediately.

Steps 1 and 2 gate 3. Everything in "Components" can be built before any
artwork lands, because the generator reads whatever file is on disk.

## Implementation notes

Three things the design did not anticipate.

**`og:image:alt` was already solved on `main`, better.** This branch was cut
from `77c0b9b` and `main` had moved five commits ahead, including `2694c17`
"Describe the share image each page actually points at" — which fixes the same
alt-inheritance defect by authoring approved `coverAlt:` prose in frontmatter
and adding verify-seo rules that require both alt tags, require them to agree,
and reject a route that overrode og:image while keeping the homepage's
description. An `imageAlt` derived from the title, which is what this branch
first wrote, is strictly worse: it transcribes the title a screen reader has
already heard from og:title instead of describing the picture.

This branch was rebased onto `main` and its own alt work dropped in favour of
that. The two changes compose: `shareImage(cover, slug)` picks the image,
`shareImageAlt(cover, coverAlt)` describes it.

One nuance that rebase leaves open. `coverAlt` describes the cover
illustration, and og:image is now a card *containing* that illustration
alongside the title and stack. The description stays accurate — the art is the
card's dominant visual — but it is no longer complete. Left as authored,
because Zubair approved that prose and it is deliberately about each
illustration's subject rather than its labels, which is exactly the wording that
survives both regenerating the art and wrapping it in a card.

**One puppeteer page per card, and `load` rather than `networkidle0`.** Reusing
a single page across `setContent` calls hangs the second one — `networkidle0`
waits on a lifecycle event that already fired, and nothing makes a network
request to fire it again because the art is inlined as a data URI. The first
card wrote, then the run timed out at 30s. A fresh page per card with
`waitUntil: "load"` plus an explicit `img.decode()` await is both correct and
faster; the decode await matters because `load` resolves once images are
fetched, not once they are painted.

**The worktree had no `node_modules` at all**, not merely a missing
`.bin/react-snap` symlink. Symlinking the whole directory from the main checkout
is what makes `npm run cards` and `npm run build:ssg` runnable here:

```bash
ln -s /Users/zub/Documents/Github_Projects/Zubair-Portfolio-Website/node_modules node_modules
```

It is gitignored, so it is not committed, and it brings `.bin/react-snap` with
it — which supersedes the narrower symlink in "Order of work" step 5.

## Out of scope

- Regenerating `return-reminder-cover.jpg`, or deciding whether "Return
  Reminder & Tracking SaaS" should remain a separate entry from Looply.
- Removing the dead `ProjectCard.tsx` or the unrendered `projectCaseStudies`
  entry.
- Any change to what the Featured Projects carousel displays.
