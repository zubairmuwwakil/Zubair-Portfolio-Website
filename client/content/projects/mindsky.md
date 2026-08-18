---
title: MindSky — Visual Thought Mapping
description: An infinite-canvas thought-mapping app with snapshot-based undo/redo and debounced autosave, persisting each map as a whole graph in Postgres JSONB.
date: 2026-01-15
cover: /assets/mindsky-cover.png
coverAlt: "Screenshot of the MindSky canvas: labelled thought bubbles connected by dashed links, branching from a single proposal across an open blue workspace."
tags: [React, TypeScript, React Flow, Node.js, PostgreSQL]
stack: [React, TypeScript, React Flow, Node.js, PostgreSQL (JSONB)]
liveUrl: https://mindsky.zubairmuwwakil.com
liveNote: "The live demo runs on a free tier and sleeps when idle — the first load can take ~30 seconds to wake it."
repoUrl: https://github.com/zubairmuwwakil/mindmap
---

MindSky is a visual thought-mapping application that helps users externalize complex ideas into an interactive, persistent graph of connected concepts. Users create, link, reorganize, and evolve ideas on a free-form canvas that mirrors how real thinking unfolds — non-linear, visual, and iterative.

## Problem

Traditional note-taking tools force ideas into linear structures — lists, documents, folders — which breaks down when thinking becomes exploratory or conceptual.

Three problems to solve:

- **Visual thinking.** Ideas are spatial, not sequential.
- **Low-friction iteration.** Users need to freely add, delete, and reorganize thoughts without fear of losing progress.
- **Persistence and safety.** Thought maps must autosave and support undo/redo so experimentation feels safe.

## Solution

MindSky treats each thought map as a **graph snapshot** — a set of nodes (ideas) and edges (relationships) — rendered on an infinite canvas and persisted as a single versioned state.

Three principles hold the design together:

- The canvas owns state and behaviour.
- Nodes are purely presentational.
- The backend stores the entire graph as JSON for reliability and replayability.

## Core features

**Thought bubbles.** Three semantic node types — Proposal (header-level concepts), Idea, and Step — differentiated by size, styling, and emphasis, with a clean separation between canvas logic and node presentation.

**Visual linking.** Ideas connect freely to express relationships. Links are first-class graph entities, persisted alongside nodes.

**Keyboard-driven editing.** Delete and Backspace remove selected bubbles or links, with toast feedback for immediate confirmation.

**Undo / redo.** True undo/redo via snapshot-based history management. Every meaningful action — add, delete, connect, drag-end — commits a snapshot; transient actions like dragging and selection do not, so history never fills with noise. `Cmd/Ctrl+Z` undoes, `Cmd/Ctrl+Shift+Z` or `Ctrl+Y` redoes.

**Autosave.** Debounced autosave prevents data loss without excessive network usage. Any committed state change triggers a save after a short delay, and autosave pauses during undo/redo and initial state restoration so the backend always reflects the last stable snapshot. Users never think about saving.

## Technical architecture

**Frontend:** React and TypeScript, React Flow for graph rendering and interaction, custom node components for visual differentiation, and centralized canvas state with history tracking.

**Backend:** a Node.js API over PostgreSQL, with nodes and edges stored as JSONB:

```
maps {
  id:    number
  name:  string
  nodes: jsonb
  edges: jsonb
}
```

Storing the entire graph as JSON gives atomic saves, easy versioning, and exact UI state replay.

## Key technical decisions

- **Graph snapshot storage instead of normalized tables**, chosen for flexibility and atomicity
- **A history-stack abstraction** so undo/redo isn't coupled to the UI
- **Debounced autosave** to balance reliability against performance
- **Strict separation of concerns**: the canvas owns behaviour and state, nodes handle presentation only

## Outcome

Users can think visually without fear of losing work, and the architecture scales naturally toward version history, sharing, and multi-user collaboration.

The project demonstrates frontend state modelling, backend persistence designed around real user behaviour, and the view that good tools reduce cognitive load rather than adding to it.
