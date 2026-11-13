---
title: "I was tired of guessing which credit card to use"
description: "PickMe started as a checkout annoyance. Building it meant solving much harder problems around reward rules, privacy and trustworthy decisions."
date: 2026-11-12
tags: [iOS, Swift, Algorithms, Privacy, Product Engineering]
stack: [Swift 6, SwiftUI, SwiftData, MapKit, CoreLocation, XCTest]
---

I have more than one credit card, and I used to do the same annoying calculation over and over.

Which one gives better rewards here? Does this purchase count as groceries? Am I near a spending cap? Will the store even accept that card?

Eventually I asked myself: **why am I still doing this in my head?**

That's where PickMe started.

I wanted an app that could answer one question when it actually matters: *I'm about to pay. Which card should I use?*

## The screen is simple. The answer isn't.

At first glance, it seems like a basic comparison: multiply the purchase amount by each card's rewards rate and pick the highest one.

Except that's not how rewards work.

Some bonuses have caps. Some merchants are coded in unexpected categories. A card might charge foreign transaction fees. Points can be worth different amounts to different people. Some stores accept one card network and not another.

A quick lookup table would have been easy to build. It also would have been wrong often enough that I wouldn't trust it.

So I built a deterministic rules engine. It weighs the card's actual earning rules, caps, acceptance conditions, fees and the owner's own point valuations. When the merchant category is uncertain, the app can show the different outcomes instead of pretending it knows.

That choice made the project more complicated. It also made the recommendations explainable.

## Why I kept it on the phone

I didn't want a checkout helper that needed bank passwords, a new account or a server just to choose a card.

PickMe's core calculations run on-device. It stores its state locally with SwiftData and uses a one-time location request for nearby merchant discovery, with a manual search fallback.

That wasn't about calling the app “privacy-first” for marketing. It was about not collecting information I didn't need in the first place.

## A recommendation should be testable

One decision I'm particularly happy with is keeping the original recommendation even after new transaction information arrives.

If I guessed a merchant category incorrectly, I want to know. I don't want the system silently changing yesterday's answer to make itself look right.

The repository documents 216 engine and storage tests, as well as an experiment designed to compare checkout predictions against confirmed outcomes.

That isn't the same as proving the app is accurate in the field. Physical-device testing and wider release validation are still part of the work.

## What I learned

Sometimes the best product idea is a small frustration you keep experiencing.

The engineering challenge is knowing where the simple experience needs serious work underneath it.

**PickMe taught me to separate “the app produced an answer” from “the answer deserves to be trusted.”**

[Read the story behind the idea](/blog/i-have-too-many-credit-cards-so-i-built-an-app-to-pick-one/)
