---
title: Command Quest — One Domain Core, Two Front Ends
description: "A command-line teaching game: one framework-free domain core drives both a terminal app and a browser app. Java, Spring Boot, 122 tests at 93% coverage."
date: 2026-08-09
cover: /assets/commandquest-cover.png
tags: [Java, Spring Boot, Architecture, Testing]
stack: [Java 25, Spring Boot 4, JUnit 6, Maven, Docker, Vanilla JS]
liveUrl: https://commandquest.zubairmuwwakil.com
repoUrl: https://github.com/zubairmuwwakil/command-quest
---

A game that teaches `touch`, `mkdir`, `ls`, and `cd` by making you type them. It runs in a browser and in a terminal from a single codebase — not two implementations kept in sync, but one domain core with two callers.

## Problem

The command line is hard to learn because it is invisible. You type `mkdir photos`, something happens somewhere, and the screen tells you nothing. Beginners lose the thread not because the syntax is hard but because there is no feedback loop — nothing visibly moves when they get it right.

The obvious fix is a browser tutorial that simulates a shell. But simulations drift: the teaching layer and the thing being taught are separate code, and the lesson slowly stops matching reality.

I wanted the opposite property — one engine, provably shared, where the browser and the terminal cannot disagree because they are the same code answering two different callers.

## Solution

The design question was where to put the boundary. Everything followed from making the domain layer completely unaware of how it is being driven.

### A domain core that imports no framework

`commands/` and `hub/` import nothing from Spring, nothing from `Scanner`, and never call `println`. A command takes a folder and a typed line and returns a value:

```java
public interface Command {
    CommandResult execute(Folder folder, String input);
}
```

The console app and the web controller are both just callers. Keeping the terminal version alive is the enforcement mechanism, not nostalgia: if the domain had quietly grown web-shaped, the console app would have stopped compiling first. It still runs standalone off `target/classes`.

### An API that remembers nothing

The server holds no session. Every request carries the whole folder tree and the player's location; the server computes a result and forgets everything.

That is not architectural purity — it is what makes free hosting viable. Containers on free plans sleep when idle and restart without warning, and a server holding game state in memory would drop players mid-lesson every time it woke up. Here a restart costs nothing, because the browser was holding the state all along.

The consequence is that `cd` cannot lean on server memory. Location travels as a list of folder names — `["photos", "2024"]` — and the server rebuilds a navigator by walking the tree from root.

### Knowing where the abstraction stops

`touch`, `mkdir`, and `ls` change *what is in a folder*. `cd` changes *which folder you are looking at*. Widening the interface so all four matched would mean handing every command a navigator — which would give `touch` the ability to move the player, a capability it should never have.

So `cd` deliberately is not a `Command`. It keeps its own contract, and the web layer adapts the two shapes into one dispatch table at the boundary, where the mismatch is visible and contained.

## Key technical decisions

- **A framework-free domain core**, with the console app retained as the standing proof that the abstraction is real rather than decorative
- **`execute()` returning a `CommandResult`** instead of printing, which is the single change that made one engine serve both a terminal and an HTTP response
- **Statelessness chosen for an operational reason** — free-tier containers restart unpredictably, so the client owns the state
- **`cd` kept outside the `Command` interface**, because widening a contract to force symmetry hands out capabilities nothing should have
- **Test packages mirroring source packages**, so tests exercise package-private seams instead of forcing methods public to make them reachable

## Outcomes

- 122 tests, none skipped, at 93.1% line coverage — the domain tested with no Spring context, the web layer through `@WebMvcTest` slices
- A dedicated round-trip test for folder-tree serialisation: in a stateless design a serialisation bug silently deletes a player's work rather than throwing, so it earns a test of its own
- CI fails the build on any skipped test. The suite once reported "103 tests" while quietly skipping 17 behind a green check — a stale `@Disabled` class describing a flow that had been removed — so the skip count is now asserted rather than read
- Deployed as a split front end and API, so a sleeping container never shows a visitor a blank page

## What I'd improve next

- More lessons — `rm`, `mv`, `cp` — which the dispatch table already accommodates without touching the domain
- A shareable permalink encoding the folder tree, which the stateless design makes almost free
- Replay of a player's command history, useful both as a teaching aid and as a bug report
- Accessibility work on the terminal pane: focus management and screen-reader announcements for command results
