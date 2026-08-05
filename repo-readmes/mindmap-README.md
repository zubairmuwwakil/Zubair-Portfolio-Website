<!--
  Draft README for github.com/zubairmuwwakil/mindmap (the MindSky repo).
  Not part of the portfolio site.

  To publish:
      gh repo clone zubairmuwwakil/mindmap /tmp/mindmap
      awk 'f && !(NR==skip) {print} /^-->$/{f=1; skip=NR+1}' \
        repo-readmes/mindmap-README.md > /tmp/mindmap/README.md
      cd /tmp/mindmap && git add README.md \
        && git commit -m "Add README" && git push

  Also set the repo description (it is currently null):
      gh repo edit zubairmuwwakil/mindmap \
        --description "MindSky — infinite-canvas thought mapping with snapshot undo/redo and debounced autosave" \
        --homepage "https://zubairmuwwakil.com/projects/mindsky/"

  Stack claims below were read from the repo's own package.json; the design
  rationale is from the case study. Delete this comment before publishing.
-->

# MindSky

Visual thought-mapping app. An infinite canvas where ideas are nodes and relationships are edges, persisted as a versioned graph.

**Live:** [mindsky.zubairmuwwakil.com](https://mindsky.zubairmuwwakil.com) · **Case study:** [zubairmuwwakil.com/projects/mindsky](https://zubairmuwwakil.com/projects/mindsky/)

## Problem

Traditional note-taking tools force ideas into linear structures — lists, documents, folders — which breaks down when thinking becomes exploratory. Three things had to be true:

- **Visual.** Ideas are spatial, not sequential.
- **Low-friction.** Add, delete and reorganize freely, without fear of losing progress.
- **Safe.** Autosave and real undo/redo, so experimenting costs nothing.

## Architecture

Each map is stored as a **whole-graph snapshot** rather than normalized rows:

```
maps {
  id:    number
  name:  string
  nodes: jsonb
  edges: jsonb
}
```

```
React + @xyflow/react          Express API              PostgreSQL
  canvas owns state    ──▶   read/write map    ──▶   nodes + edges
  nodes are dumb             (Drizzle ORM)            as JSONB
        │
        └── history stack (snapshots) ──▶ debounced autosave
```

### Decisions worth calling out

- **Graph snapshot in JSONB, not normalized tables** — saves are atomic, versioning is trivial, and the exact UI state replays on load. The tradeoff is that you cannot query across maps by node content; that was not a requirement, and the flexibility during iteration was worth more.
- **History stack decoupled from the UI** — only meaningful actions (add, delete, connect, drag-end) commit a snapshot. Transient ones (dragging, selection) do not, so history never fills with noise and undo always moves a user-visible step.
- **Debounced autosave that pauses during undo/redo and initial restore** — otherwise restoring a snapshot immediately writes it back, and an undo becomes unrepeatable.
- **The canvas owns state and behaviour; nodes are purely presentational** — the separation that keeps the graph logic testable independently of rendering.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 19, TypeScript, `@xyflow/react` (React Flow 12), Tailwind, Radix UI |
| Routing / data | Wouter, TanStack Query |
| API | Express |
| Database | PostgreSQL via Drizzle ORM, `nodes`/`edges` stored as JSONB |
| Validation | Zod (`drizzle-zod` for schema-derived types) |

## Local setup

**Prerequisites:** Node 20+, a PostgreSQL database.

```bash
git clone https://github.com/zubairmuwwakil/mindmap.git
cd mindmap
npm install
cp .env.example .env     # set DATABASE_URL
npm run db:push          # apply the Drizzle schema
npm run dev
```

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string |

**Scripts**

```bash
npm run dev        # API + client
npm run dev:client # client only
npm run build      # production build
npm run check      # typecheck
npm run db:push    # push the Drizzle schema
```

## What I'd do next

- Version history and named checkpoints — the snapshot model already supports it
- Shareable read-only links
- Multi-user collaboration (the whole-graph write becomes the contention point; would need per-node granularity or CRDTs)

## Status

Actively maintained side project, deployed and in use. Last substantive work January 2026.

## License

MIT
