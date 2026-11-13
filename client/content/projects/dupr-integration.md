---
title: "An integration isn't finished when the API returns 200"
description: "Working on DUPR account linking and match submissions taught me that connecting two systems is as much about trust and verification as code."
date: 2026-11-12
tags: [API Integrations, OAuth, Data Integrity, Partner Engineering, Sports Technology]
stack: [TypeScript, REST APIs, Authentication, PostgreSQL]
---

Players don't care that two apps have different databases.

They want to sign in, play a match and have the result show up where they expect it.

That's what made the DUPR integration interesting to me.

The Pickleball Social already needed player accounts, matches and ratings for league operations. DUPR was a system many players already recognized. Connecting them sounded straightforward from the outside.

But joining two products is rarely as simple as adding an API call.

## Two systems can agree on a request and still disagree on a result

A match that looks complete in one product still needs to meet another product's rules before it can be submitted.

Which player does each account represent? Was permission granted? Are both sides referring to the same match? What if one step succeeds and another fails?

Those questions became central to the integration work.

I worked with DUPR technical stakeholders on account linking, authentication and match-submission flows, including validation of information moving in both directions.

The useful lesson was that successful transport isn't the same thing as correct business behavior.

## Keep the player in control

I wanted players to know when their accounts were linked and when results were being shared.

That pushed the design toward explicit account linking and opt-in match write-back rather than silently treating every local match as something that should be sent elsewhere.

It also made error cases important. When a submission cannot be completed, the product should be clear about that. A local match record and an accepted external result are not automatically the same thing.

## The people side mattered too

Some of the harder work happened outside the code.

An external integration means explaining your assumptions, checking the other team's requirements, and adjusting when the systems don't model something in the same way.

That experience made me better at translating between a user request, a business rule and a technical implementation.

## What stayed with me

I used to think of an integration as a feature you finish after the endpoint works.

Now I think about the full journey: consent, identity, validation, submission, confirmation and recovery.

**A useful integration shouldn't just move data. It should make people more confident that the data is right.**

[Read the larger Pickleball Social story](/projects/pickleops/) · [Explore the public architecture overview](https://github.com/zubairmuwwakil/pickleops)
