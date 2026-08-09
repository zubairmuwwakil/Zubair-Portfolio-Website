# MindSky cover: replace the wrong-product art

**Date:** 2026-08-09
**Status:** approved, in implementation

## Problem

`client/public/assets/mindsky-cover.jpg` depicts a marketing landing page —
a desktop/tablet/phone lockup over a "PROBLEM:" block about needing "a fast,
clear landing page that converts", a "Key Technical Decisions" list (static-first
build, composable content blocks, accessibility & mobile-first) and a "RESULT:"
block about storytelling and load speed.

MindSky is none of that. It is an infinite-canvas thought-mapping app with
snapshot-based undo/redo and debounced autosave, persisting each map as a whole
graph in Postgres JSONB.

Two further defects in the same file:

- AI text artifacts — "LIGHTWIGHT ANIMATIONS", "TysStscript", "Accessiblity",
  "storttylling".
- An AI-generator watermark (four-pointed sparkle) in the bottom-right corner.
  This was not previously tracked. It is a provenance mark, not typography, so
  a retouch pass aimed at the typos would not have caught it.

Fixing the typography alone would leave the cover advertising the wrong product,
so this is a replacement, not a retouch.

## Where the cover is consumed

Two places, not one. The brief for this work said the cover was never displayed
on the site, and the case-study route bears that out: `CaseStudy.tsx` passes
`study.cover` through `shareImage()` into `og:image`, `twitter:image` and the
JSON-LD `image` only.

But `Portfolio.tsx` keeps a second, hardcoded photo table
(`projectCaseStudies`), independent of the markdown frontmatter, and the
homepage's featured-project carousel renders `/assets/mindsky-cover.jpg` from
it at full size. So the wrong-product illustration was on the homepage the whole
time, and deleting the JPEG without touching that table would have replaced it
with a broken image.

Found by grepping the built output for the old filename after the first green
build — not by reading the source, where the two paths look unrelated. Worth
remembering: `dist/` is the only place every consumer of an asset is visible at
once.

The audience is therefore link previews in Slack, LinkedIn and search, screen
readers via `og:image:alt`, and anyone on the homepage.

## Approach

A screenshot of the real app composited into a rendered frame.

Rejected alternatives:

- **Pure app screenshot** — no title or framing, unfurls as a bare UI shot.
- **Pure code-rendered graphic** — deterministic, but an illustration of the
  product rather than the product.
- **Creative brief for AI regeneration** — re-runs the exact process that
  produced the current typos and watermark, and cannot be verified by the build.

The chosen approach follows the precedent set by `script/generate-og-image.mjs`,
whose docstring argues the general case: *"a PNG nobody can edit goes stale
silently."* Text rendered by a text renderer cannot acquire typos, and a
committed generator means the cover is reviewable in a diff.

## Output

`client/public/assets/mindsky-cover.png` at **1200x630**, replacing the
1024x1024 JPEG.

1200x630 is the ratio LinkedIn, Slack, X and iMessage crop to, matches
`og-card.png`, and retires the reason the 1200x630 share-card work was parked.

Changing both the extension and the pixel size is safe and costs one line:
`script/vite-plugin-share-image-sizes.mjs` scans the assets directory and
matches `/\.(png|jpe?g)$/i`, so `og:image:width/height` are re-measured from the
new bytes at build time. Only `cover:` in the frontmatter needs editing.

## The demo map

Composed in the live app at `mindsky.zubairmuwwakil.com`, which autosaves to
production Postgres. This is deliberate: if the cover showed a rich map while
the "Live" link from the same case study opened the 2-node starter, that would
be a new honesty gap of the kind this change exists to close.

Structure — seven nodes, six edges, mirroring the case study's own three
problems:

```
            Make thinking visible          <- proposal
        /            |            \
  Ideas are    Try things      Never lose
  spatial      without fear    the thread   <- ideas
      |             |               |
  Drag to      Undo any        Autosaves
  rearrange    step            as you go    <- steps
```

Titles are short so they survive being shrunk to unfurl size, and the shape
reads as branching thought even when the words do not.

**Resolved during implementation.** All three node types are real and render at
distinct sizes (proposal 320px, idea 260px, step 200px). "Float Idea" creates a
`step`, despite the name; `idea` has no button and exists only in seed data. So
the three-type claim holds, with the caveat that one type is not user-creatable.

**Also resolved, and much larger:** the case study's headline claims of
snapshot-based undo/redo and debounced autosave described features that did not
exist in the source. Rather than soften the copy, Zubair chose to build them.
That work is a separate commit in the `mindmap` repo on branch
`feat/undo-redo-and-autosave`, and it is what let the demo map's bubbles name
undo and autosave honestly. The hosted backend returning 503 is unrelated and
still outstanding.

## Composition

Screenshot inset into an HTML/CSS frame carrying the title, one-line
description and stack. The app's own toolbar stays visible in the shot as
evidence the product is real.

Two variants rendered for selection: dark (site tokens, consistent with
`og-card.png`) and light (the app's own sky palette).

## Generator

`script/generate-project-cover.mjs`, modelled on `generate-og-image.mjs` — same
`findChrome()` resolution order (the bundled Chromium is from 2019 and will not
launch on current macOS), same Puppeteer render.

Takes a slug and a captured screenshot path, with MindSky as the only configured
entry. Parameterised in shape because the other four covers are queued for the
same treatment; not built out for them, because that has not been asked for.

The captured screenshot is committed as a source input so the cover is
reproducible without the live app being up.

## Alt text

Replacing:

> Illustration of MindSky running on a desktop monitor, tablet and phone, above
> a problem statement, a list of technical decisions and a results summary.

With:

> Screenshot of the MindSky canvas: labelled thought bubbles connected by dashed
> links, branching from a single proposal across an open blue workspace.

Describes the subject rather than transcribing node labels — the convention
`c22a14e` established, which means the wording survives the map being edited
later. Alt text is Zubair's content and was approved before shipping.

## Integration

`coverAlt` did not exist on `claude/sleepy-chatelet-8716ea`. It arrived with
`c22a14e` on `claude/interesting-dirac-1d034b` (unpushed), together with the
`useDocumentHead` change that emits both alt tags and the `checkShareImageAlt`
gate in `verify-seo.mjs`.

That branch was merged into this one before any content edits, so this work
rewrites the existing field rather than authoring a competing copy of it.

## Verification

`npm run build:ssg` runs `checkShareImageAlt`, which confirms the alt is
present, that `og:image:alt` and `twitter:image:alt` agree, and that neither is
inherited from `200.html`.

It cannot confirm the sentence describes the picture. Nothing automated can.
That check is a human looking at the render, which is why both variants go to
Zubair before anything is committed.
