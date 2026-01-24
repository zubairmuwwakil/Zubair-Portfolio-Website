# Zubair Portfolio Website

Personal portfolio site built with React, Vite, and Tailwind, featuring animated sections, featured projects, experience highlights, and a responsive layout optimized for fast loads and link previews.

**Live:** https://portfolio.zubairmuwwakil.com

## Features
- Responsive, animated portfolio layout (Framer Motion + Tailwind UI components)
- Featured project carousel and detailed case study sections
- Theme toggle with persisted preference
- SEO-friendly static rendering via `react-snap`
- Content-driven data model for experience, education, projects, and skills

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite 7, Tailwind CSS, Framer Motion, Wouter
- **UI:** Radix UI primitives + custom components
- **Data (static mode):** Local TS data file
- **Optional API stack:** Express + Drizzle ORM + PostgreSQL

## Project Structure
```
client/            # Vite app (React)
	src/
		data/          # Portfolio content
		components/    # UI + feature components
		pages/         # Portfolio page
server/            # Express API (optional)
shared/            # Shared schemas and route contracts
script/            # SSG and build helpers
```

## Getting Started
### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm

### Install
```
npm install
```

### Run (dev)
```
npm run dev
```

### Build
```
npm run build
```

### Preview build
```
npm run start
```

## Content Editing
All portfolio content is currently served from a static data file:
- `client/src/data/portfolio.ts`

Update profile info, experience, education, projects, and skills there.

## Build Variants (GitHub Pages vs Custom Domain)
- `npm run build:domain` — root/custom-domain build (base `/`).
- `npm run build:gh` — GitHub Pages project build (base `/Zubair-Portfolio-Website/`).
- `npm run build:ssg` — root build + SSG prerender + `404.html` refresh for link previews.

The Pages workflow auto-selects the correct base: it uses `/` when a `CNAME` or `*.github.io` repo is present; otherwise it builds with the repo subpath so assets load correctly from GitHub Pages.

## Optional API + Database (Advanced)
The repository includes an Express + Drizzle backend and Postgres schema for serving portfolio data and contact submissions.

**Environment variable:**
- `DATABASE_URL` — required for DB connections and `drizzle-kit`.

**Migrations:**
```
npm run db:push
```

If you want the frontend to fetch from the API instead of static data, update the hooks in `client/src/hooks/use-portfolio.ts` to call the `/api/*` endpoints defined in `shared/routes.ts`.

## Scripts
- `npm run dev` — start the Vite dev server
- `npm run build` — build client for production
- `npm run build:domain` — build for root/custom domain
- `npm run build:gh` — build for GitHub Pages subpath
- `npm run build:ssg` — build + prerender HTML
- `npm run start` — preview built app
- `npm run check` — TypeScript typecheck
- `npm run db:push` — apply Drizzle schema to DB

## License
MIT
