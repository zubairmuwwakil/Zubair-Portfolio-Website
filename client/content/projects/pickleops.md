---
title: PickleOps — The Pickleball Social
description: A shipped club-pickleball product — Next.js web app plus a React Native iOS client for sessions, ladders, ratings, and payments.
date: 2026-08-05
tags: [Next.js, React Native, TypeScript, Prisma, PostgreSQL, iOS]
stack: [Next.js (App Router), React, React Native, TypeScript, Tailwind, PostgreSQL, Prisma, Zod, iOS]
liveUrl: https://pickleball.zubairmuwwakil.com
appStoreUrl: https://apps.apple.com/us/app/the-pickleball-social/id6759585852
---

One product, two clients: a web app for running sessions and a React Native iOS app shipped to the App Store and maintained through 21 releases in five months.

Player roster, attendance, balanced grouping, match scheduling, score entry, and ratings with audit history — for clubs that were running all of it on spreadsheets and group chats.

## Problem

Clubs run sessions, ladders, and player ratings on spreadsheets and group chats. Organizers lose evenings to admin, and ratings drift out of date.

Running drop-in sessions — open play, ladder nights — is chaotic without structure:

- Organizers need a quick way to manage a roster, including inactive players.
- Attendance changes every session and affects fair grouping.
- Groups need to be formed by *skill similarity* to keep games competitive.
- Matches must be generated consistently for groups of different sizes.
- Ratings must update deterministically and **never double-apply** if a finalize call is repeated.

I wanted a system that is fast to use during a live session, but still enforces correctness like a production app.

## Outcomes

- **Shipped to the App Store** and maintained through 21 releases in five months.
- **Sessions, ratings, and payments handled in one place** — organizers stopped running the club from spreadsheets.
- **Session workflow in minutes:** create a session, mark attendance, generate groups, generate matches, enter scores, finalize.
- **Balanced play:** grouping based on ratings clusters players by similar skill, reducing blowouts.
- **Ratings you can trust:** updates are applied atomically with an audit trail of before, after, and delta.

## Technical decisions

### Schema designed for auditability

Instead of only storing "current rating," I introduced **rating snapshots** — `RatingSnapshot(before, after, delta, matchId?, sessionId)`. This makes "why did my rating change?" an answerable question, and leaves room to expand into player history, charts, and analytics without a migration.

### Normalized many-to-many modelling for doubles

Matches and teams use a join table, `MatchTeamMember(matchId, playerId, team)`, rather than `team1Player1Id / team1Player2Id / …` columns. It avoids awkward wide rows and simplifies match generation and querying across any match format.

### Pure business logic separated from I/O

Core algorithms live as pure functions — the rating engine, the grouping strategy, and the match-generation formats each in their own module. Easier to test, easier to reason about, and easier to explain in an interview.

### Atomic match finalization to prevent double-apply

Finalization is treated as a critical section: verify scores exist, verify not already finalized, then update ratings, create snapshots, and set `finalizedAt` **in a single transaction**. That closes three real-world failure modes — duplicate finalize clicks, retried requests, and race conditions during a live session.

### Offline-first sync on the mobile client

Scoring works on courts with no signal and reconciles cleanly on reconnect, using version-based conflict resolution so concurrent edits are detected rather than silently overwritten. There's a longer write-up of the reasoning in [Why scorekeeping had to work with no signal](/blog/offline-first-sync-on-a-pickleball-court/).

### DUPR single sign-on with opt-in match write-back

Players authenticate against DUPR through a WebView, and matches can be written back on an opt-in basis — keeping external ratings in sync without manual entry.

### Bluetooth proximity discovery

Nearby players can be invited directly, with explicit consent gates before anyone joins a match.

### Production deployment and migration handling

Deploying surfaced the class of problem you only hit in production: Prisma schema drift against the production database, required column additions with existing rows, and build-time migration execution. The approach that worked was to make migration-safe changes first — nullable where needed — apply migrations via `prisma migrate deploy` in the build pipeline, then backfill and tighten constraints once it was safe.

## What I'd improve next

- Better group balancing: skill clustering first, then equalize group sizes
- Support for group sizes 4/5/6 with correct round-robin templates and consistent ordering by rating
- A session summary dashboard: matches played, rating movers, attendance stats
- Player profile history: rating trend, match history, win/loss over time
- Automated tests for the rating and match-generation logic
