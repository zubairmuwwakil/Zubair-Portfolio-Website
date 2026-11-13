---
title: "I wanted to understand my money without handing over my bank login"
description: "Inunity is my attempt to bring transactions, cashflow and financial decisions into one system, while keeping data ownership clear."
date: 2026-11-12
tags: [Full Stack, Fintech, Privacy, Data Modeling, Integrations]
stack: [Next.js, TypeScript, PostgreSQL, Prisma, Clerk, Vercel]
liveUrl: https://inunity.ca
---

I got tired of financial information being scattered everywhere.

One app showed a balance. Another had my receipts. Bills lived in email. And understanding what I could actually spend meant putting the pieces together myself.

I wanted one place that could give me a clearer picture.

But there was a catch. I didn't want to build that picture by asking people to hand over their bank credentials.

That became the starting point for **Inunity**.

## Start with the information you can collect responsibly

Instead of relying on a bank-login scraper, I explored using the tools people already have on their devices.

One workflow uses an iPhone automation to send certain Apple Pay transaction details into an authenticated ledger. Another brings in financial records through user-controlled imports and connected workflows.

The goal is simple: understand transactions without asking for unnecessary access.

It also creates real engineering problems. A transaction can arrive late, arrive twice or have incomplete information. A refund is different from a new purchase. Currency conversions need dates and rates, not guesses.

Those details matter more to me than making a dashboard look impressive.

## The ledger is the foundation

I built the backend around PostgreSQL and Prisma, with clear data ownership and authenticated access.

Once transactions have a consistent shape, they can support a wider set of useful views: recurring bills, cashflow forecasts, currency conversions, receipts and account history.

I also started exploring how specialized tools could connect to Inunity. PickMe works on the decision *before* a purchase. Looply looks at receipts, renewals and returns *after* a purchase. MarketLens handles market prices independently of a person's accounts.

I like that separation. Each tool can solve a focused problem without forcing everything into one enormous codebase.

Some of those cross-product connections are still evolving, so I distinguish the intended architecture from what has been verified end to end.

## Privacy is an engineering decision

Financial software deals with sensitive information. I don't think “secure” should just be a badge on the homepage.

That means limiting what gets collected, protecting private attachments, keeping customer data isolated, and making it possible to inspect how a record entered the system.

It also means being careful about claims. A system that doesn't request bank passwords still needs strong security and a clear explanation of its data flows.

## The lesson I keep coming back to

I could have started by adding charts.

Instead, I kept coming back to the harder question: **can I trust the information behind the chart?**

The more I work on financial software, the more I see that a useful interface depends on very ordinary things being correct: dates, identities, amounts, retries, and who is allowed to change what.

That's the part of Inunity I find most interesting.

[Explore Inunity](https://inunity.ca) · [How an iPhone shortcut became a transaction feed](/blog/i-turned-an-iphone-shortcut-into-a-transaction-feed/)
