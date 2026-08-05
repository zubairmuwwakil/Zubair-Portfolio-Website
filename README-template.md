# \<Project Name\>

> Template for the project repos linked from [zubairmuwwakil.com](https://zubairmuwwakil.com).
> Copy this file into a project repo as `README.md`, fill in every `<placeholder>`,
> and delete this block plus any section that genuinely doesn't apply.
>
> Recruiters and engineers who click through from the portfolio land here. Assume
> they give it about thirty seconds: the one-liner and the problem statement have
> to carry the value on their own, before anyone scrolls.

\<One sentence: what this does and who it's for. No preamble, no "this project was
built to explore…". State the thing.\>

**Live:** \<https://…\> · **Case study:** \<https://…\>

![Screenshot of \<project\>](docs/screenshot.png)

<!-- Commit a real screenshot to docs/screenshot.png. A README with no image reads
     as unfinished. If the project has no UI, use an architecture diagram, a
     terminal recording, or an annotated API response instead. -->

## Problem

\<What was broken or missing before this existed. Two to four sentences.\>

\<Say who felt the pain and what they did instead — the spreadsheet, the manual
step, the thing that silently went wrong. A problem statement that could describe
any project in the category isn't specific enough yet.\>

## Architecture

\<How it's put together, and the two or three decisions a reader would otherwise
have to reverse-engineer from the source.\>

```
<Component diagram or request flow. ASCII is fine — it renders everywhere,
 survives GitHub's markdown pipeline, and never 404s.>

  client ──▶ API ──▶ queue ──▶ worker
                │                │
                └──▶ Postgres ◀──┘
```

**Decisions worth calling out**

- **\<Decision\>** — \<why this over the obvious alternative, and what it costs.\>
- **\<Decision\>** — \<…\>
- **\<Decision\>** — \<…\>

<!-- This is the section that distinguishes a portfolio repo from a tutorial repo.
     "Used Postgres" is not a decision. "Used a version column on the match record
     so offline writes conflict loudly instead of last-write-wins silently" is. -->

## Tech stack

| Layer | Choice |
|---|---|
| Language | \<…\> |
| Framework | \<…\> |
| Data | \<…\> |
| Infrastructure | \<…\> |
| Testing | \<…\> |

## Local setup

**Prerequisites:** \<Node 20+, Docker, …\>

```bash
git clone https://github.com/zubairmuwwakil/<repo>.git
cd <repo>
cp .env.example .env    # fill in the values documented below
npm install
npm run dev
```

Runs at \<http://localhost:3000\>.

**Environment variables**

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | \<…\> |
| `<VAR>` | no | \<…\> |

<!-- Commit .env.example with every key present and every value blank or dummy.
     Never commit real credentials, and never paste a real key into this table. -->

**Database / migrations**

```bash
<npm run db:migrate>
<npm run db:seed>
```

**Tests**

```bash
npm test
```

## Status

\<Actively maintained / feature-complete / archived — and the date. A reader
can't tell a finished project from an abandoned one without being told, and a
stale "coming soon" is worse than saying nothing.\>

## License

MIT
