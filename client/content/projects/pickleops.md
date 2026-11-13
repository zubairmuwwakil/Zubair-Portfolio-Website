---
title: "I was running pickleball leagues. Then I built the software I wished we had."
description: "The story behind Pickleball Social: from spreadsheets and late-night admin to a real platform for clubs, players and organizers."
date: 2026-11-12
cover: /assets/pickleops-cover.jpg
coverAlt: "Illustrated pickleball court and club dashboard showing sessions, player ratings and scheduling controls."
tags: [Product Engineering, Sports Technology, Operations, Reliability, React Native]
stack: [Next.js, React, React Native, TypeScript, PostgreSQL, Prisma, iOS, pgvector]
liveUrl: https://pickleball.zubairmuwwakil.com
appStoreUrl: https://apps.apple.com/us/app/the-pickleball-social/id6759585852
repoUrl: https://github.com/zubairmuwwakil/pickleops
---

I didn't set out to build a big sports platform.

I was involved in running pickleball programs, and I kept running into the same problems. Someone needed to register another player. A schedule changed. A payment went through but the registration didn't show up. Someone needed a score corrected. The information was spread across spreadsheets, messages and different tools.

A lot of the work wasn't difficult. It was just repetitive.

And I was doing some of it myself, so I knew how frustrating it could be.

Eventually I decided to build the software I wished we had.

That became **The Pickleball Social**.

## I started with the work, not the tech stack

Before I thought about frameworks, I looked at what an organizer actually does during a session.

People register. Someone checks them in. Players need fair groups and matches. Scores get recorded. Results affect ratings. Then everyone needs to know when the next session is happening.

If one piece breaks, the organizer is still responsible for the whole evening.

I built web tools for the operational side and a mobile experience for people running and joining sessions. I wanted to remove the annoying steps without taking away the organizer's control.

The goal wasn't to make a fancy dashboard. It was to make a busy night at the gym easier.

## The hard parts showed up after people started using it

A court isn't an office with perfect Wi-Fi.

Some facilities have weak reception, and scores don't wait for a good connection. I built scoring around local changes and safer synchronization so a reconnect wouldn't quietly overwrite someone else's result.

Then there was match finalization. If somebody taps twice, or a request gets retried, the platform can't apply the rating update twice. I worked on transaction-based finalization and a rating history that can be checked later.

And payments taught me a different lesson. A successful payment screen means very little if the person still isn't registered. I dealt with broken links, failed registrations after payment, and other reports that came directly from the people relying on the product.

I learned quickly that **shipping the feature is only half the job. The other half is being there when it doesn't work.**

## Getting clubs to trust it took work too

I also had to explain the product, demonstrate it and listen to the people who would use it.

One organization tested it with part of its operation for three months before signing an agreement. That was a reminder that trust isn't something you win by showing someone a long list of features.

You win it by solving a problem they care about and showing up when they have questions.

I worked with external technical stakeholders on integrations, including DUPR account linking and user-approved match submission. That had its own challenges around identity, consent and verifying results across two different systems.

[Read the DUPR integration story](/projects/dupr-integration/).

## The numbers are encouraging. They're not the whole story.

Based on my operational records and experience:

- The platform supported roughly **850 accounts**, with more than **1,000 participants** across company and partner-club operations.
- Some scheduling jobs that took around **10 minutes** of manual work could be completed in **seconds**.
- In a tracked eight-week cohort, repeat registration increased from about **20% to 89%**.
- I shipped **21 iOS releases in five months**.
- About **136 unique people** used the production AI assistant after its release around April 2026.

These are approximate, self-reported figures, not independently audited benchmarks. The retention improvement also came during changes to coaching, communications and program operations, so I don't claim the software caused that entire increase by itself.

What matters to me is that this moved beyond a demo. People used it, had expectations, and gave me real problems to solve.

## What I'd improve next

I'd like better measurement around registration completion, support issues and how much staff time each workflow saves.

I also want stronger evaluation for the retrieval-backed AI assistant. It has real users, but I haven't published formal accuracy or latency benchmarks, and those should come before making bigger claims.

## What I took away

Building Pickleball Social changed how I think about engineering.

I still care about clean architecture, tests and a sensible database design. But I care just as much about whether a coach can get through a session without worrying about the software.

**The best part of building something is seeing it make somebody else's day easier.**

[Why scorekeeping had to work with no signal](/blog/offline-first-sync-on-a-pickleball-court/) · [Try the platform](https://pickleball.zubairmuwwakil.com)
