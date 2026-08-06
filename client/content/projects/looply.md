---
title: Looply — Returns, Subscriptions & Receipt Automation
description: A finance assistant that turns inbox data into a purchases timeline, a deadline calendar, and retry-safe reminders for returns and renewals.
date: 2026-08-05
cover: /assets/looply-cover.jpg
tags: [Next.js, TypeScript, Prisma, PostgreSQL, Stripe]
stack: [Next.js, React 19, TypeScript, Prisma, Neon Postgres, Clerk, Stripe, Resend]
liveUrl: https://looply.zubairmuwwakil.com
repoUrl: https://github.com/zubairmuwwakil/return-saas
---

Looply is a personal finance assistant that turns scattered inbox data — receipts, shipping, renewals, bills — into a single actionable system: a purchases timeline, a calendar of deadlines, and reminders that prevent missed returns, surprise renewals, and overdue refunds.

It's built to feel premium and trustworthy: automation when it's safe, manual control when it's needed, and clear privacy controls at every step.

## Problem

Most people *intend* to return items or cancel trials, but the workflow breaks down because:

- Purchase proof lives in email and attachments, and is easy to lose.
- Return deadlines and refund timelines vary by merchant.
- Shipping and refund updates are split across multiple emails.
- Manual tracking is tedious, and users abandon it after a week.
- Reminders are either missing or annoying — spammy, duplicated, poorly timed.

The result: wasted money, missed refunds, and recurring charges users didn't want.

## Solution

Looply centralizes the entire lifecycle:

- **Purchases Inbox** storing proof — receipt, order number, items, total
- **Trial Radar + Renewal Guard** detecting subscriptions and renewal dates early enough to act
- **Returns and refund tracking** with shipment timelines, refund SLAs, and overdue alerts
- **Multi-channel reminders** across email, push, and calendar, with snoozes and quiet hours
- **Privacy & Control Center** with scan modes, disconnect, delete, and export

## Key features

**Trial Radar + Renewal Guard.** Detects trials, intro pricing, renewals, and bill cadence from inbox and receipts. One-tap actions: keep, cancel, snooze, or convert to annual. Rules remind a configurable number of days before renewal and auto-snooze once cancelled.

**Return shipment tracking + refund SLA timeline.** Tracks label → in transit → delivered → refund expected → refunded, with SLA calculation and "overdue by X days" alerts — built to close the "I returned it… where's my money?" gap.

**Purchases Inbox.** A normalized timeline of purchases from Gmail ingestion and uploaded receipts, with attachments linked to each purchase and a quick action to open a return or refund case.

**Saved / At Risk / Recovered dashboard.** Money saved, money at risk in the next 7 days, refunds recovered, and overdue refund totals — with clear labelling for estimated versus confirmed amounts.

**Privacy & Control Center.** Scan modes (receipts only, shipping only, subscriptions only), disconnect Gmail, delete all stored data, export purchase history, and a plain explanation of what is stored and why.

**Guided cancellation flows and price-drop claim tracking** on higher tiers, both designed assist-first rather than overpromising automation.

## Architecture notes

**Ingestion and normalization.** A Gmail OAuth connection enables automated parsing of purchase confirmations, subscription receipts, and shipping updates. Users can also upload receipts as images or PDFs, which are parsed into the same purchase model. Scans handle up to ~200 emails per run, extracting ~30–60 receipts at roughly 88% parse success. Normalized entities power the calendar, boards, and dashboards.

**Reliability: idempotency and dedupe.** Looply is designed to be safe under retries and incremental scans. Ingestion writes are idempotent via upserts and stable dedupe keys; jobs record run history to avoid duplicate digest sends; and notification scheduling is centralized so the same event can't spam multiple times.

**Notifications: helpful, not spammy.** Digests and event notifications share a common scheduler. Snoozes and quiet hours are first-class. Users can tune channels and cadence without losing core protection.

**Security and privacy.** Least-privilege OAuth with clear user-facing controls, one-click disconnect, deletion jobs, and export — supporting user trust and compliance expectations.

**Automation.** Cron-triggered jobs via GitHub Actions calling secured routes, with Postgres job and run tracking for safe reprocessing, and Resend for auditable, retry-safe delivery.

## Results

- Fewer missed return windows and fewer surprise renewals
- Faster "what do I need to do this week?" clarity via At Risk views and timelines
- Predictable cost and performance through incremental scanning and deduped processing
- Retention hooks through visible value: saved and recovered amounts, and upcoming deadlines

## What I'd improve next

- More merchant playbooks and confirmation-signal detection for cancellations
- Better carrier and merchant normalization for global use
- Deeper insights: household spending patterns, subscription consolidation suggestions
- Mobile-first polish: widgets and richer push experiences
