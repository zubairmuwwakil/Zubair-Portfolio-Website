---
title: PickleOps — From Manual Sports Operations to Production Software
description: How I turned manual pickleball league workflows into a live web and iOS platform used by clubs, organizers and players.
date: 2026-11-12
cover: /assets/pickleops-cover.jpg
coverAlt: Illustrated pickleball court and club dashboard showing sessions, player ratings and scheduling controls.
tags: [Operations, Automation, Product Engineering, React Native, TypeScript, PostgreSQL, Applied AI]
stack: [Next.js, React, React Native, TypeScript, PostgreSQL, Prisma, iOS, pgvector]
liveUrl: https://pickleball.zubairmuwwakil.com
appStoreUrl: https://apps.apple.com/us/app/the-pickleball-social/id6759585852
repoUrl: https://github.com/zubairmuwwakil/pickleops
---

I started close to the problem, not with a feature list. Working in pickleball program operations, I saw organizers manage registration, attendance, scheduling, ratings and payments across spreadsheets, messages and separate services. The process worked when a program was small, but each added session created more manual coordination and more opportunities for mistakes.

I proposed and built **The Pickleball Social (PickleOps)** to make those workflows repeatable. It grew into a web platform for organizers and a React Native iOS application for people running and playing in sessions. I also worked directly with partner organizations on demonstrations, adoption, onboarding and external integrations.

This case study explains the **operational problem, the choices I made, the deployment work and what changed**, not just the frameworks I used.

## Results at a glance

- **Approximately 850 accounts and more than 1,000 participants** supported across company and partner-club operations.
- **Scheduling work reduced from about 10 minutes to seconds** for workflows that previously required manual grouping or match setup.
- **Tracked repeat registration increased from approximately 20% to 89%** in an eight-week cohort during broader program and software improvements. This is an observed result, **not a controlled claim that the software alone caused the increase**.
- **21 iOS releases in five months**, reflecting continuous delivery and support after launch.
- **Approximately 136 unique people used the production AI assistant** after it became available around April 2026.

Figures are from my operational records and experience; they are approximate, not independently audited platform-wide benchmarks.

## 1. The problem was operational, not just technical

Before the platform, an organizer might register players in one place, update attendance in a spreadsheet, arrange balanced games by hand, chase scores in messages and reconcile ratings afterward. Staff also needed to handle changes when a participant canceled or a court had poor connectivity.

That created three recurring problems:

- **Time:** staff repeated the same scheduling and reporting work every session.
- **Consistency:** manual edits and handoffs made it hard to keep registrations, results and ratings aligned.
- **Growth:** onboarding another club required more administration rather than a reusable process.

My first job was to understand the work well enough to decide what could be automated, what still required human judgment, and which failures would matter most during a live event.

## 2. I owned the path from an idea to a deployed product

I proposed a unified workflow, gathered requirements from the people actually running programs, designed the core application and delivered working web and mobile clients.

The organizer journey became:

1. Create or configure a session.
2. Register players and record attendance.
3. Generate balanced groups and matches from session data.
4. Record scores, including when connectivity is unreliable.
5. Finalize results and update the rating history.
6. Use the same data for follow-up, reporting and future sessions.

Instead of building a dashboard that only displayed information, I focused on **software that changes how the work gets done**. I continued shipping fixes, new capabilities and product releases once real users began depending on it.

## 3. The engineering decisions were driven by real failures

### Offline-first scoring

Some courts have unreliable mobile coverage. If score entry fails offline, the organizer returns to paper and the original manual process survives.

I designed mobile scoring around locally recorded changes, replay-safe synchronization and version-aware conflict detection. A reconnect should not silently overwrite a different score entered by another device.

[Read the deeper engineering write-up on offline scoring](/blog/offline-first-sync-on-a-pickleball-court/).

### Reliable match finalization

A duplicate tap, retry or concurrent request must not apply a rating change twice. I designed match finalization as a transaction that checks state, applies the update, records a history snapshot and marks the match finalized together.

The core grouping, match-generation and Glicko-2 rating logic was separated from I/O so it could be reasoned about and tested independently. The result is an auditable workflow rather than a spreadsheet full of manual corrections.

### Integrating a system players already trusted

Players already used DUPR for their ratings. Requiring a second, disconnected profile would have created friction.

I worked with DUPR's technical stakeholders on authentication, integration review and match submission. The implementation supports user-directed account linking and opt-in match write-back. The difficult part was correctly validating data and matching the expectations of both systems, not simply calling an endpoint.

### Adding practical AI assistance

I later added a customer-facing AI assistant using LLM tools and PostgreSQL/pgvector retrieval. The implementation includes retrieval-backed context and application tools for relevant workflows. Approximately 136 distinct users have actively used it since around April 2026.

I have **not** published a formal evaluation of answer accuracy, retrieval quality or inference latency. I would rather state what is deployed and used than imply those measurements already exist.

## 4. Adoption took more than shipping code

I demonstrated the product to partner-club leaders, handled their concerns and supported onboarding. One organization tested the software with a subset of its team for **three months** before deciding to sign an agreement.

Real support also shaped the roadmap. Issues included broken payment links, completed payments that did not create registrations, interrupted connections and unexpected errors. I handled user reports and improved payment, registration and recovery workflows rather than treating deployment as the finish line.

This work taught me to translate between a business user's description of a problem and the underlying system behavior. A good technical fix also needs a clear explanation and a safe rollout.

## 5. What the results do — and do not — prove

The clearest direct engineering result was reducing some repetitive scheduling tasks from minutes to seconds. Product adoption, continued releases and use by partner organizations show that this was more than a prototype.

Repeat registration also improved substantially in a tracked cohort. But coaching, clearer communication and other program changes happened alongside the software, so I do not attribute the full increase to one feature. This distinction matters when interpreting operational data.

## 6. What I would improve next

- Establish consistent before/after measurements for staff time, payment failures and registration completion.
- Build a repeatable AI evaluation set for retrieval relevance, answer quality and tool correctness.
- Improve operational reporting so program leads can see attendance, churn, engagement and capacity in one place.
- Keep hardening reliability and access controls as the number of partner organizations grows.

## What I learned

**The most useful software starts with an accurate understanding of the real workflow.** The hard part was not choosing Next.js, React Native or PostgreSQL. It was finding the right manual steps to remove, designing for live-event failures, getting other organizations to trust the system, and remaining responsible for it after launch.

That experience is why I want to keep working on software, data and AI that help people run complex operations—not just produce demonstrations.

**Explore the product:** [Live platform](https://pickleball.zubairmuwwakil.com) · [iOS App Store](https://apps.apple.com/us/app/the-pickleball-social/id6759585852) · [Public architecture overview](https://github.com/zubairmuwwakil/pickleops)
