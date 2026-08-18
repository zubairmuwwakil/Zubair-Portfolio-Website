---
title: I turned an iPhone Shortcut into a transaction feed
description: MoneyTalks started with a question: how much of my spending could I capture automatically without paying for bank aggregation?
date: 2026-08-17
tags: [iOS Shortcuts, Apple Wallet, Next.js, Event-Driven Systems, Personal Finance, System Design]
---

Before MoneyTalks became a larger personal-finance project, its original purpose was much narrower.

I wanted a way to automatically capture my Apple Pay purchases.

The obvious solution to transaction tracking is usually some form of bank aggregation. Connect an account using Plaid, Flinks or another provider, import the transactions, and build from there.

That's powerful, but it also introduces cost, infrastructure and a much larger trust boundary.

For an early project, I wanted to see how far I could get without it.

Then I found an interesting path through iOS Shortcuts.

## Using Apple Wallet automation as a sensor

iOS can trigger a personal automation when a Wallet transaction occurs.

That means a user can configure a Shortcut that receives information about the transaction, packages the available fields into a structured payload and sends it to a backend.

So I built a capture flow around it.

The payload gets an event ID and capture timestamp. The raw merchant and card information is preserved. Currency information is carried through rather than guessed. Location can be included when available, while a failed location lookup shouldn't prevent the purchase itself from being recorded.

That last part became an important design rule:

capture first, enrich later.

A user might pay while connectivity is poor. Location might fail. A merchant name might be messy. The backend might temporarily be unavailable.

None of those problems should cause the underlying observation to disappear.

The payment happened.

Everything else can be figured out afterward.

## Observations aren't necessarily transactions

Working with real payment data quickly exposes another subtle problem.

The first event you see isn't always the final financial truth.

There can be pre-authorizations. Merchant names can change between authorization and settlement. Charges can be reversed. Two observations can potentially represent the same underlying purchase.

So I stopped thinking about the Shortcut payload as a perfectly normalized transaction.

It's an observation.

The raw event should stay intact while the system determines what it represents.

That leads to a much safer pipeline:

capture the original event, persist it, normalize it, check for duplicates, enrich it with merchant information, reconcile it later, and preserve the evidence that produced the final record.

It's a small distinction in terminology, but it changes the architecture significantly.

## MoneyTalks grew around the transaction

Once I had a source of purchases, the obvious next question was: what do I do with them?

A transaction by itself is not especially useful.

Put transactions on a dashboard and you've recreated the least interesting part of a banking app.

But connect the purchase to other financial information and things get much more useful.

Which credit card was used?

Was it the best card?

What rewards should it have earned?

Is the charge part of a subscription?

Is there a receipt?

Does the item have a return deadline?

How does the purchase affect upcoming cash flow?

That was when MoneyTalks started expanding into a broader financial command center.

Accounts, recurring obligations, cash-flow forecasting, card analysis, multi-currency net worth and financial rules all started fitting around the same idea: take financial events that would otherwise remain scattered and put them into context.

## The Shortcut also exposed a larger idea

Around the same time, I had three other projects.

PickMe could tell me what card to use before a purchase.

Looply could discover purchases, bills and subscriptions from email.

MarketLens could ingest the data required to value investments.

MoneyTalks had started by capturing Apple Pay activity and had grown into the place where financial information could be assembled.

That was the point where the projects stopped looking unrelated.

They weren't four implementations of the same thing.

They were four systems looking at different parts of the same financial life.

And I started wondering whether their real value might be in what happens when they can talk to each other.
