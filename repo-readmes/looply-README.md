<!--
  Draft README for github.com/zubairmuwwakil/return-saas (the Looply repo).
  Not part of the portfolio site.

  TARGET BRANCH: `organized` — which became the repo's DEFAULT branch on
  2026-08-08, after the Vercel deployment record confirmed it is production
  (last Production deploy 2026-01-24, sha 0690bddf = organized's HEAD). The
  old default `main` was a stale 2026-01-09 snapshot, 27 commits behind, and
  was not deployed anywhere.

  This is ADDITIVE. Every section of the existing 3,272 B README is preserved
  verbatim — Docs, Features, Tech stack, Getting started, Scripts, Project
  structure, Key flows, Domain map, API map, Privacy endpoints, Data model,
  Cron jobs, Deployment. What is added:

    - Title "Return SaaS" -> "Looply" (matches the repo description, the
      portfolio card, the case study, and looply.zubairmuwwakil.com)
    - Live URL + case study link
    - Problem section
    - "Decisions worth calling out" (from the case study)
    - Author block naming Zubair Muwwakil and linking back to the profile

  One correction, not a removal: the existing README says to copy
  `.env.example`, and `docs/env.md` says the same. That file does NOT exist on
  `organized` (verified 2026-08-08). Rewritten to point at `docs/env.md`,
  which does exist and lists every variable. Worth adding a real
  `.env.example` to the repo separately.

  All paths below verified present on `organized` on 2026-08-08.

  To publish:
      gh repo clone zubairmuwwakil/return-saas /tmp/return-saas
      awk 'f && !(NR==skip) {print} /^-->$/{f=1; skip=NR+1}' \
        repo-readmes/looply-README.md > /tmp/return-saas/README.md
      cd /tmp/return-saas && git add README.md \
        && git commit -m "Frame README around Looply and link the live site" \
        && git push

  Delete this comment before publishing.
-->

# Looply

Looply is a Next.js SaaS app for tracking returns, receipts, and subscriptions. It turns scattered inbox data — receipts, shipping updates, renewals, bills — into a purchases timeline, a calendar of deadlines, and retry-safe reminders that fire before a return window closes or a trial converts.

Supports Gmail/IMAP ingestion, automated digests and notifications, Stripe billing, and a dashboard for analytics and operations.

**Live:** [looply.zubairmuwwakil.com](https://looply.zubairmuwwakil.com) · **Case study:** [zubairmuwwakil.com/projects/looply](https://zubairmuwwakil.com/projects/looply/)

## Problem

People intend to return items and cancel trials, then don't — because the workflow is spread across systems that never talk to each other:

- Purchase proof lives in email and attachments, and is easy to lose.
- Return windows and refund SLAs vary by merchant, with no common format.
- Shipping and refund updates arrive as separate emails, days apart.
- Manual tracking is tedious enough that users abandon it inside a week.

The cost is concrete: missed refunds, expired return windows, and recurring charges nobody chose.

## Docs

- [docs/onboarding.md](docs/onboarding.md)
- [docs/env.md](docs/env.md)
- [docs/architecture.md](docs/architecture.md)

## Features

- Return and shipment tracking with status updates.
- Receipt ingestion (PDF/email) and bill management.
- Purchases Inbox (unified purchase proof feed) with one-tap return creation.
- Trial/Renewal detection with Detected inbox and one-tap actions.
- Automation rules, suggestions, and digest notifications.
- Privacy & Data controls: scan modes, export, and delete.
- Stripe subscriptions and billing flows.
- Dashboard for analytics, calendar, notifications, and settings.

## Tech stack

- Next.js (App Router) + React 19
- Prisma + Postgres
- Clerk authentication
- Stripe billing
- Resend email delivery
- Gmail API + IMAP integrations

## Design decisions worth calling out

- **Idempotent ingestion, not "run it once and hope."** Writes go through upserts keyed on stable dedupe keys, so an interrupted scan, a retry, and an incremental re-scan all converge on the same rows. Runs are tracked in Postgres, which is what makes safe reprocessing possible at all — you can replay a window without double-charging the parse budget or double-sending a digest.

- **One notification scheduler, not per-feature sends.** Every digest and event notification goes through a single scheduler that owns snoozes and quiet hours. The alternative — each feature sending its own mail — is how a reminder product becomes a spam product: the same underlying event reaches the user three times because three subsystems each noticed it.

- **Parsing is a pipeline of narrow parsers, not one clever one.** Separate handling for MIME bodies, attached PDFs, and HTML receipts. Each is independently testable and independently failable — a merchant whose HTML breaks doesn't take down PDF ingestion. A scan handles up to ~200 emails per run, extracting ~30–60 receipts at roughly 88% parse success.

- **Least-privilege OAuth with a visible exit.** Scan modes, one-click disconnect, deletion jobs, and export. For a product that asks to read your email, the controls are the feature, not the compliance checkbox.

## Getting started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment

Create a `.env.local` file and fill in the variables listed in [docs/env.md](docs/env.md). Env files are gitignored, so there is nothing to copy from — `docs/env.md` is the authoritative list.

### 3) Prepare the database

```bash
pnpm run prisma:migrate:deploy
```

### 4) Run the app

```bash
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server. |
| `pnpm build` | Build for production. |
| `pnpm start` | Start the production server. |
| `pnpm lint` | Run ESLint. |
| `pnpm run prisma:migrate:deploy` | Apply Prisma migrations. |
| `pnpm run vercel-build` | Run migrations then build (Vercel). |

## Project structure

- [src/app](src/app) — routes, pages, and API handlers.
- [src/lib](src/lib) — services, data access, and domain logic.
- [prisma](prisma) — database schema and migrations.

## Key flows

- Detected inbox: [src/app/dashboard/settings/automation/detected/page.tsx](src/app/dashboard/settings/automation/detected/page.tsx)
- Purchases Inbox: [src/app/dashboard/receipts/inbox/page.tsx](src/app/dashboard/receipts/inbox/page.tsx)
- Privacy & Data: [src/app/dashboard/settings/privacy/page.tsx](src/app/dashboard/settings/privacy/page.tsx)

## Domain map

- Returns, shipment tracking, and refunds.
- Subscriptions and billing.
- Bills and recurring payments.
- Receipts and email ingestion.
- Notifications and digests.
- Automation suggestions and review.

## API map

- [src/app/api](src/app/api) — REST-style route handlers by domain.

## Privacy endpoints

- [src/app/api/gmail/scan-mode/route.ts](src/app/api/gmail/scan-mode/route.ts)
- [src/app/api/data/summary/route.ts](src/app/api/data/summary/route.ts)
- [src/app/api/data/export/route.ts](src/app/api/data/export/route.ts)
- [src/app/api/data/delete/route.ts](src/app/api/data/delete/route.ts)

## Data model

- [prisma/schema.prisma](prisma/schema.prisma) — core tables for subscriptions, returns, bills, receipts, notifications, and billing.

## Cron jobs

The following endpoints require `CRON_SECRET`:

- `/api/cron/digest`
- `/api/cron/notify`
- `/api/cron/shipping`

## Deployment

Deploy on Vercel with `pnpm run vercel-build` so migrations run before `next build`.

## Author

Built by **Zubair Muwwakil**, a backend / full-stack engineer in Brooklyn, NY.

- Portfolio: [zubairmuwwakil.com](https://zubairmuwwakil.com)
- More of Zubair Muwwakil's code on GitHub: [github.com/zubairmuwwakil](https://github.com/zubairmuwwakil)
- LinkedIn: [linkedin.com/in/zubairmuwwakil](https://www.linkedin.com/in/zubairmuwwakil/)
