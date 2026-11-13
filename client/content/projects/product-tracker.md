---
title: "The small inventory app that taught me to design for failure"
description: "I started with a simple stock tracker. It turned into a lesson in duplicate events, broken connections and making sure systems recover properly."
date: 2026-11-12
tags: [Backend Engineering, Distributed Systems, Reliability, Event Processing]
stack: [TypeScript, Cloudflare Workers, Cloudflare Queues, PostgreSQL, Neon, Prisma, Notion]
repoUrl: https://github.com/zubairmuwwakil/Product_Tracker
---

I wanted a simple way to know when I was running low on things I use regularly.

Not exactly the kind of problem that sounds like it needs a distributed system.

But I also wanted it to work across the tools I already used, including Notion and my personal automation setup. Once I started connecting those pieces, a more interesting question came up.

**What happens when an update succeeds in one place but fails in another?**

That's where this project got interesting.

## A tiny problem with a surprisingly serious failure mode

Imagine I record that I've used the last item on a shelf.

The database saves it. Then the system tries to update the Notion view, but the connection times out.

Did Notion get the update? Did it fail completely? If I retry, will it record the same change twice?

These aren't rare edge cases in a system that moves data between services. They're ordinary things that will eventually happen.

I didn't want a setup that worked only when every service was available at exactly the right moment.

## One system had to own the truth

The first decision was to stop treating every connected tool as an equal source of truth.

I made PostgreSQL the place where inventory changes are recorded. Notion became a view of that data, not another database that can quietly disagree with it.

Every change enters through an authenticated API with an idempotency key. That gives the backend a way to recognize a repeated request without counting the same change again.

I also added a durable outbox. When a change is saved, the work needed to update another system is recorded with it. If the external update fails, the system still knows what needs doing.

Cloudflare Workers and Queues handle delivery and retries. Failed work can be inspected through reliability status and dead-letter records instead of disappearing into logs.

## The part I wanted to test properly

It's easy to write a retry function. It's harder to prove that retries don't damage your data.

I tested repeated requests, deliberately delayed work, and queue-handler failures. The repository's production notes describe successful recovery and deduplication checks, including a scenario where failed queue work reached a dead-letter queue for investigation.

That's the kind of test I care about. Not just whether the happy path works, but whether the system behaves sensibly when something breaks.

## What I would do differently now

I wouldn't start every personal project with queues, workers and an outbox. That would be overengineering.

Here, the extra moving parts answered a real problem: the app needed to keep a trustworthy history while synchronizing with a service outside my control.

The next improvements I care about are simpler operational views and clearer alerts when something needs attention.

**The takeaway:** Reliable software isn't software that never fails. It's software that can fail without losing track of what happened.

[Explore the implementation](https://github.com/zubairmuwwakil/Product_Tracker)
