---
title: Why scorekeeping had to work with no signal
description: Building offline-first sync with version conflict resolution for The Pickleball Social, where the network fails exactly when the app is needed most.
date: 2026-08-05
tags: [Offline-first, Sync, React Native, Distributed Systems]
---

Most apps treat the network as present and handle its absence as an error state. That assumption breaks the moment your users are standing on a court. Indoor facilities have concrete and steel between the players and the nearest tower. Outdoor courts are often in parks at the edge of coverage. The moment someone needs to record a score is reliably the moment they have the least connectivity.

For [The Pickleball Social](https://apps.apple.com/us/app/the-pickleball-social/id6759585852), that made offline capability a correctness requirement rather than a nice-to-have. If a match score can't be entered without a connection, the organizer writes it on paper, and the app has already lost — the spreadsheet it was supposed to replace comes right back.

## Offline-first is a data model decision, not a caching decision

The tempting fix is a cache: keep a copy of the data, serve it when the network is down, refresh when it returns. That works for content you only read. It falls apart as soon as the offline user is *writing*, because now two sources of truth exist and something has to decide which one wins.

Scoring is exactly that case. Two people can both have the app open. Both can record a result for the same match. Both can be offline while doing it. When they reconnect, the server sees two versions of one match and has to resolve them.

The default resolution strategy — last write wins — is worse than it sounds here. "Last" means whichever device happened to reconnect second, which has nothing to do with which entry is correct. A player who reconnects walking to the parking lot can silently overwrite the organizer who entered the official result ten minutes earlier. The data is never obviously broken; it's just quietly wrong, and nobody notices until a ladder standing looks off weeks later.

## Versioning makes the conflict visible

The approach that held up was attaching a version to each record and requiring writes to declare which version they were based on. A write that arrives based on the version the server currently holds applies cleanly. A write based on an older version means someone else changed the record in the meantime — that's a genuine conflict, and the important part is that it is now *detectable* rather than silently absorbed.

The general shape of the rule:

```
if incoming.baseVersion == current.version:
    apply, bump version
else:
    conflict — resolve deliberately, don't just overwrite
```

This is the same idea behind optimistic concurrency control in a database, moved out to the client. What it buys you is not automatic correctness — it's the ability to *know* when two edits disagree, which is the prerequisite for handling them sensibly. Detection first, policy second.

## The queue has to be replay-safe

Offline writes pile up in a local queue and flush on reconnect. That flush is not a single clean event. Connectivity on a phone walking out of a building comes back in fits — a request goes out, the response never arrives, the client can't distinguish "the server never got it" from "the server got it and the reply was lost."

So the client retries, and any write that isn't safe to apply twice will be applied twice. A match result recorded two or three times corrupts ratings in a way that is tedious to unwind after the fact. Every queued operation needs a stable identity assigned at creation time on the device — not at send time — so the server can recognize a replay and ignore it. Retries are the normal case in this environment, not the exceptional one.

## What this bought

Scoring works on a court with no bars of service, and reconciles cleanly when the phone finds signal again. Organizers stopped needing to think about connectivity at all, which was the actual goal — the app is supposed to remove the admin burden, and "check whether you have signal before entering the score" is just a different kind of admin burden.

The broader lesson generalizes past pickleball. Once a client can write while disconnected, you have a distributed system, whether or not you intended to build one. The questions that follow — which write wins, how conflicts are detected, whether a retry is safe — don't go away by not asking them. They just get answered by accident.
