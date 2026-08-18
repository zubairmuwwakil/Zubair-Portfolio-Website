---
title: Your inbox already knows what you bought
description: Building Looply taught me that a surprising amount of financial automation can start with data people already receive.
date: 2026-05-28
cover: /assets/looply-cover.jpg
coverAlt: "Illustration of Looply: a phone listing upcoming renewals and bill deadlines, flanked by icons for inbox scanning, return tracking and reminder emails."
tags: [Next.js, PostgreSQL, Gmail API, Automation, Privacy, Backend Engineering]
---

I originally built [Looply](/projects/looply/) around a simple annoyance: buying something is easy, but remembering everything that happens afterward isn't.

A receipt arrives.

There might be a return deadline three weeks later.

A free trial quietly turns into a subscription.

A recurring bill changes price.

A refund is supposed to arrive but never does.

Most of this information already exists somewhere. The problem is that it is scattered across hundreds or thousands of emails.

So I started wondering: what if the inbox itself could become a financial data source?

## Parsing instead of asking users to enter everything

Looply connects to email through Gmail or IMAP and looks for messages that contain signals of a financial event.

The important part is that I didn't want the product to depend on an LLM reading every email.

Receipts and transactional emails tend to contain predictable structures: merchant names, order totals, dates, confirmation language, renewal language and return information.

For many cases, deterministic parsing and carefully designed heuristics are enough.

That made the project interesting from both a privacy and engineering perspective.

Instead of sending someone's inbox to an AI model and asking it to figure everything out, the system can look for specific evidence and convert relevant messages into structured records.

An email becomes a purchase.

A purchase can have a receipt.

A receipt can establish a return window.

A message saying a trial will renew can become a subscription event.

A shipment notification can update something the system is already tracking.

Suddenly the inbox isn't just a pile of messages anymore.

It's an event stream.

## The hard part wasn't finding emails

The first version of an ingestion system can feel deceptively easy.

Search Gmail for likely purchase emails. Extract a few values. Save them.

The harder questions arrive immediately afterward.

What happens when the same email gets processed twice?

What happens when a receipt and shipping confirmation refer to the same purchase?

How do you distinguish a subscription from a normal purchase?

What happens when parsing confidence is low?

What data should be retained?

How does a user delete everything?

What happens to encrypted Gmail credentials?

Looply gradually became less about regexes and more about building a reliable ingestion pipeline around them.

That meant deduplication, encrypted credentials, OAuth state protection, privacy controls, notification jobs, recurring scans, exports, deletion workflows and a review layer for detected events that shouldn't be accepted automatically.

The software became a good reminder that automation doesn't mean removing the user from every decision.

Sometimes good automation means doing 90% of the tedious work and presenting the final 10% clearly enough that a person can confirm it in one tap.

## Why email is such an interesting financial source

Bank transactions can tell you that $74.16 went to a merchant.

A receipt can tell you considerably more.

It can tell you what you bought.

It can sometimes tell you the tax, individual line items, return policy, order number and expected delivery date.

A renewal email can tell you what something will cost before the charge happens.

That's fundamentally different information.

And it means email ingestion doesn't have to compete with traditional bank aggregation. It can complement it.

There are obvious gaps. Cash purchases won't appear. Plenty of physical transactions won't generate an email. Merchants format messages differently, and parsers have to evolve.

But as one sensor among several, email is surprisingly powerful.

## Looply eventually became bigger than Looply

I originally thought of Looply as its own SaaS: a place to track purchases, subscriptions, bills, returns and refunds.

And it still makes sense as that standalone idea.

But while working on other financial projects, I started noticing something interesting.

Another project knew which credit card I should have used for a purchase.

Another could capture some of my physical Apple Pay transactions.

Another understood my investments.

Looply knew something none of those systems knew particularly well:

what I actually bought online and what obligations might be attached to it afterward.

That realization would eventually change where I thought Looply belonged.

It was still solving its original problem.

It had also accidentally become one of the sensors for a much larger financial system.
