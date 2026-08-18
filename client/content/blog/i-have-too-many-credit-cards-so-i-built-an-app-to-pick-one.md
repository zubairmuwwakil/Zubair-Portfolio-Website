---
title: I have too many credit cards, so I built an app to pick one
description: The idea behind PickMe is intentionally simple: at checkout, tell me which card gives me the most value.
date: 2026-08-14
tags: [SwiftUI, iOS, Decision Engines, Fintech, Product Engineering, Privacy]
---

Credit-card rewards are strange.

People spend hours comparing cards, calculating welcome bonuses and reading about points valuations.

Then they walk into a store and use the wrong card.

I was doing the same thing.

I might know that one card earns more on groceries, another has better foreign-exchange economics, another wins at restaurants, and a Mastercard is required at a particular merchant.

But none of that matters if I have to mentally run the calculation while standing at a checkout terminal.

That became the idea behind PickMe.

Instead of being another app that helps you discover credit cards, PickMe answers a much more immediate question:

I'm here. I'm about to spend this amount. Which card should I use?

## Making the answer trustworthy

The UI for that problem can be simple.

The engine underneath it isn't.

A card's advertised reward rate is rarely the complete rule.

There can be spending caps, annual or monthly reset periods, merchant-category restrictions, foreign-transaction fees, network acceptance constraints, conditional rates, redemption requirements and point values that vary depending on how the owner actually uses them.

So PickMe became an engine-first project.

The recommendation engine compares eligible cards using the actual rules attached to the user's wallet rather than simply maintaining a table that says "restaurants = card A."

If a purchase crosses a rewards cap, the calculation can account for that.

If the merchant doesn't accept a network, that card shouldn't win regardless of its reward rate.

If two possible merchant categories would produce different winners, the app shouldn't pretend the classification is certain.

And if switching cards only saves a fraction of a cent, the recommendation probably isn't worth bothering the user with.

I wanted the output to be useful, not technically optimal in ways that make the product annoying.

## Location changes the interaction

The next question was how much information the user should have to enter.

Ideally, very little.

If the phone already knows that I'm standing near a specific merchant, PickMe can use that as evidence. A merchant mapping can provide a likely rewards category, and previously confirmed purchases at that location can make future recommendations stronger.

The experience I want is closer to a copilot than a calculator.

You shouldn't have to configure a mini spreadsheet every time you buy coffee.

Open the app — or eventually receive a useful suggestion at the right moment — and see the card worth using.

That's why I kept PickMe native on iOS.

A checkout tool should feel immediate. Recommendations should still work when connectivity is poor. Location, local persistence and the phone's surrounding ecosystem are part of the product, not incidental details.

## The feedback loop matters more than the recommendation

One of the decisions I'm happiest with is that PickMe doesn't simply make a prediction and forget about it.

Predictions are saved.

Later, when I have evidence from the posted transaction or statement, the result can be reconciled with what the app expected.

Did the merchant category match?

Did the card actually earn what the rules predicted?

Was the recommendation wrong?

That gives me something much more useful than a demo that always looks correct.

It gives me a measurable experiment.

The system can learn the category associated with a specific merchant location, while the original recommendation remains unchanged so I can still evaluate whether the app was right at the time.

That distinction matters to me.

If software changes its historical prediction after seeing the answer, it hasn't learned. It has rewritten history.

## The idea expanded after the purchase

PickMe started entirely on the before-purchase side of the transaction.

Where am I?

What am I buying?

Which card wins?

But another project I was working on could observe what happened afterward.

An iPhone automation could capture certain Apple Pay transactions. Email ingestion could find online receipts. Those observations could eventually verify whether PickMe's recommendation was actually followed and whether it produced the expected result.

That creates a much more interesting loop:

recommend → purchase → observe → verify → learn → recommend better next time.

The first version of PickMe is still deliberately narrow.

It should be excellent at one thing before I ask it to become anything else:

help me use the right card at the moment it matters.

The interesting part is that the data created by doing that well turned out to be useful far beyond the iOS app itself.
