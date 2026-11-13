---
title: "I kept missing return windows. So I made my inbox do the remembering."
description: "Looply grew from a familiar frustration into a full-stack project for receipts, renewals, return deadlines and careful automation."
date: 2026-11-12
cover: /assets/looply-cover.jpg
coverAlt: "Illustration of Looply: a phone listing upcoming renewals and bill deadlines, flanked by icons for inbox scanning, return tracking and reminder emails."
tags: [Full Stack, Email Integrations, Automation, PostgreSQL, SaaS]
stack: [Next.js, React 19, TypeScript, Prisma, PostgreSQL, Clerk, Stripe, Resend]
liveUrl: https://looply.zubairmuwwakil.com
repoUrl: https://github.com/zubairmuwwakil/return-saas
---

I have a bad habit of remembering a return deadline just after it passes.

The receipt is somewhere in my inbox. The shipping email is in another thread. A free trial has turned into a paid subscription. And technically, all the information was there the whole time.

I just wasn't going to search for it every week.

That gave me the idea for **Looply**: what if my inbox could help me keep track of the things I'd already bought?

## The problem wasn't a lack of data

Email stores a surprising amount of useful information about a purchase.

What you bought. When you ordered it. How much it cost. When it shipped. Sometimes even when it can be returned.

The hard part is that every merchant formats those messages differently, and the same purchase can produce a confirmation, shipping update, delivery notice and refund email.

I didn't want an app that treated every email as a separate transaction.

I wanted something that could build one understandable timeline out of all those messages.

## I built around the moment someone needs to act

Looply connects to inbox data through Gmail or IMAP, extracts purchase information, and organizes receipts, subscriptions, returns and refunds into a more useful view.

The interface is meant to answer plain questions:

*What did I buy? What's about to renew? Do I still have time to return this? Has my refund arrived?*

That led to a Purchases Inbox, renewal detection, return cases, deadline tracking and user-controlled notifications.

I also built privacy controls around scan modes, data export and deletion. If the product reads personal email, it needs to give the user meaningful control.

## Automation gets annoying when it isn't careful

It's easy to send a reminder.

It's harder to avoid sending the same reminder three times because a background job was retried.

The application uses PostgreSQL and Prisma to store normalized records, with deduplication and job tracking for repeated scans. Scheduled work handles notifications and related updates.

That work matters because users don't care whether a duplicate came from a webhook, a retry or a cron job. They just know the app bothered them again.

I tried to make automation helpful without making it noisy.

## This is still a product I'm improving

The repository documents a broad set of implemented workflows, from receipt ingestion to billing and notifications.

I haven't established a public, independently verified measure of how many real deadlines Looply has saved users from missing. So I don't claim that result.

The honest outcome is that I built the system needed to find those deadlines, organize the data and support reminders. Measuring how often it changes a user's behavior is the next step.

## What I learned

A useful automation doesn't need to feel magical.

It needs to be predictable, easy to understand and respectful of the person using it.

**The goal was never more notifications. It was one less thing somebody has to keep in their head.**

[Explore the code](https://github.com/zubairmuwwakil/return-saas) · [Read about the inbox idea](/blog/your-inbox-already-knows-what-you-bought/)
