---
title: I accidentally built four pieces of the same financial app
description: PickMe, Looply, MarketLens and MoneyTalks began as separate projects. Eventually I realized they were each solving a different part of the same problem.
date: 2026-08-18
tags: [System Design, Fintech, Product Engineering, Architecture, Personal Finance, Building in Public]
---

I didn't start with a plan to build a personal financial operating system.

I built four projects.

Each one started because a specific problem annoyed me enough to build something for it.

[PickMe](/blog/i-have-too-many-credit-cards-so-i-built-an-app-to-pick-one/) answered what card I should use before making a purchase.

[Looply](/projects/looply/) looked at email and turned receipts, subscriptions, bills and return information into structured data.

[MarketLens](/projects/marketlens/) handled market-data ingestion and the information needed to understand investments.

[MoneyTalks](/blog/i-turned-an-iphone-shortcut-into-a-transaction-feed/) started with an iPhone Shortcut that could capture Apple Pay activity and eventually grew into a broader financial dashboard.

Individually, each idea made sense.

What I didn't immediately notice was how well their blind spots lined up.

## Four different views of the same person

PickMe knows something useful before money moves.

It can look at the merchant, the user's cards, rewards rules, caps, foreign-exchange costs and other constraints and recommend the best payment method.

But once the purchase happens, PickMe's original job is basically finished.

MoneyTalks can observe some of what happens next through the Wallet Shortcut.

Now I know that a purchase occurred, what card was used and some raw information about the merchant.

But Apple Pay doesn't cover everything.

That's where Looply becomes interesting.

An online order might never pass through the Wallet capture flow, but the receipt lands in email. A free trial sends a renewal warning. A merchant sends shipping information or confirms a refund.

Looply sees a different part of the financial event.

Then there are investments.

Neither a receipt parser nor a payment capture system should be responsible for understanding market history, stock splits or corporate actions.

That's what MarketLens is for.

Each project has a clear responsibility.

Together they start producing something none of them can produce independently.

## The purchase became the connecting object

The architectural idea that made this click for me was surprisingly simple:

there should be one purchase that gets richer over time.

Imagine buying something at a store.

Before checkout, PickMe recommends a card.

After the tap, the Wallet Shortcut records that the transaction occurred.

Later, a receipt arrives in email and Looply attaches more information.

The system now potentially knows the merchant, amount, payment card, expected rewards, receipt, purchased items, return window and whether the transaction appears to be recurring.

Those shouldn't be five unrelated records living in five disconnected features.

They're different observations of the same event.

That gives the broader system a natural spine.

Capture information as it becomes available, preserve where it came from, reconcile conflicting observations and gradually construct the best representation of what actually happened.

## Investments complete another side of the picture

Spending is only part of someone's finances.

If the goal is eventually to answer questions about net worth, cash position and financial trajectory, investment assets need reliable valuations as well.

That's where I don't want the web application independently scraping prices.

MarketLens already exists to ingest, validate and expose market data.

The unifying application can consume that service instead of pretending that market-data infrastructure belongs inside a React page.

That separation is important to me.

Unification shouldn't mean turning every project into one enormous codebase.

It means allowing systems with clear responsibilities to contribute to a larger model.

## What the combined product could understand

Once these datasets meet, the questions become more interesting than anything the individual products can answer.

It's no longer just "what did I spend?"

The system can understand how much cash is committed to upcoming bills, which subscriptions are renewing, which card produced the most value, whether another card would have performed better, what can still be returned, how investments affect net worth, and where financial rules or opportunities might deserve attention.

The dashboard becomes the consequence of that understanding rather than the product itself.

That distinction is important.

I don't want to build another app whose main feature is putting a few bank balances into colourful charts.

The interesting problem is building the data relationships underneath those charts.

## The funny part is that I now need another name

MoneyTalks was the working name for the web application and the place where this started coming together.

Unfortunately, naming software is apparently harder than building four financial systems, and the domain situation means I'm probably going to rebrand it.

For now, the final name is undecided.

But I know what I want the product to represent.

PickMe can remain the card copilot.

Looply can remain the story of turning an inbox into financial data.

MarketLens can remain the market-data engine.

And the new product can be the layer above them: the place that understands how those pieces relate to one another and turns them into one coherent financial picture.

The projects started separately because each problem deserved focus.

Now I'm interested in the opposite question:

what becomes possible when they finally meet?

I don't have the name yet.

I think I finally have the product.
