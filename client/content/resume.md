---
title: Résumé — Zubair Muwwakil
description: Full-Stack Software Engineer in Brooklyn, NY — Java/Spring Boot, Python, TypeScript, AI agent orchestration, API design, and production reliability.
date: 2026-08-18
---

Full-Stack Software Engineer with experience across Java/Spring Boot, Python, TypeScript, Swift, and .NET, building data-driven products with strong API design, production reliability, and modern AI-assisted engineering. Proven track record shipping mobile products to the App Store across 21 releases, architecting autonomous coding-agent orchestrators, designing high-throughput data pipelines, and optimizing database performance in PostgreSQL and SQL Server.

Brooklyn, NY · USA & Canadian Citizen

## Technical skills

**Languages** — Java, Python, TypeScript / JavaScript, Swift, C#, SQL, HTML/CSS

**Backend & Architecture** — Spring Boot, Django, Node.js / Express, REST APIs, OpenAPI/Swagger, WebSocket, Offline-First Sync, Event-Driven Architecture

**Frontend & Mobile** — React, Next.js (App Router), React Native (iOS App Store), SwiftUI, SwiftData, Tailwind CSS, Radix UI, `@xyflow/react`

**AI & Agentic Systems** — Autonomous Multi-Agent Orchestration (`orc`), LLM Tool Calling & Context Management (Claude Code, Google Antigravity, Gemini, ChatGPT), Prompt Engineering, Automated Verification & Retry Loops

**Databases & Storage** — PostgreSQL, SQL Server (T-SQL), Prisma, Drizzle ORM, Flyway Migrations, Indexing & Query Tuning, Redis, JSONB Graph Storage, Neon Postgres

**Reliability, Observability & DevOps** — Docker, GitHub Actions (CI/CD), Prometheus, Micrometer, OpenTelemetry (OTLP), Structured JSON Logging, Rate Limiting (Bucket4j), Linux

**Testing & Quality** — Pytest, JUnit, Spring Boot Test, Vitest, Testcontainers, Mutation Testing, Automated Lint/Build Verification Loops

## Experience

### G2i Inc. — Software Engineer (Contract)
Remote · Aug 2025 – Present · Contract

- Build and maintain Django backend services — REST APIs, background jobs, data processing — in a PR-driven code review environment.
- Own PostgreSQL/SQL Server changes: schema updates, indexing, and query tuning shipped through Dockerized CI gates.
- Deliver releases safely with unit and integration tests plus data integrity validation, preventing regressions and keeping deployments repeatable.

### Elevation Athletics — Regional Program Coordinator (Tech & Ops)
Toronto, ON · Mar 2023 – Present · Part-time · *Promoted: Coach → Lead Coach → District Lead*

- Built and deployed pbsocial.ca, a multi-tenant Next.js/TypeScript/PostgreSQL platform for session scheduling, registrations, attendance, and reporting; scaled from ~50 to 1,000+ active participants.
- Engineered core match systems: automatic skill-balanced group and match generation, atomic single-transaction match finalization, and pure-function Glicko-2 ratings with audit history.
- Implemented role-based ops workflows and retention analytics — roster/waitlist automation, check-in tooling — contributing to repeat sign-ups rising from ~20% to ~89% in a tracked cohort.
- Built a participant tracking system on the TeamSnap API, increasing onboarding throughput by ~40% via cleaner workflows and automation.
- Ran a structured support and triage workflow for 1,000+ users across 8 cities, keeping organizers and players unblocked with clear updates.

### The Senac Group — Financial Software Analyst (FP&A), Automation & Analytics
Toronto, ON · Jun 2023 – May 2025 · Part-time → Full-time · *Promoted: Intern → Assistant Financial Analyst → Software Developer*

- Built internal automation and reporting logic in C#/.NET and SQL Server (T-SQL) to improve FP&A data accuracy, repeatability, and close-cycle reliability, cutting recurring workflow time by 10+ hours/week.
- Developed ETL pipelines to ingest and normalize exports from CRM, ERP, HR, and accounting systems, shipping validation dashboards that surfaced discrepancies early to eliminate close-cycle rework.
- Created financial modeling, budgeting, and variance dashboards with built-in guardrails, cutting formula defects by ~30% and surfacing $25K+ in annual operational efficiency gains.
- Owned finance tooling operations, automated weekly/monthly executive deliverables with SQL and VBA, and authored repeatable operational runbooks.

### NDCTrades — Finance Solutions Architect
Sep 2022 – Jun 2023 · Internship

- Automated invoicing and pricing workflows across QuickBooks and Humanity, increasing recurring revenue by ~20% while reducing operational errors.
- Streamlined payroll processing via automated data cleanup and verification checks, cutting processing time by ~35% and eliminating calculation discrepancies.
- Built compliance and performance dashboards to surface risk metrics early; authored reusable implementation templates to standardize client configurations.

## Projects

### orc — Quota-Aware Coding Agent Orchestrator
Python 3.12, Typer, Pydantic, Claude Code CLI, Subprocess Execution, Git

- Engineered an autonomous CLI orchestrator that isolates clean Git branches, dispatches tasks to Claude Code execution lanes, and tracks self-estimated budget quotas (`orc.toml`, `.orc/` advisory ledger).
- Built an automated multi-step verification pipeline executing test suites and linters on generated code, capturing exact compiler and runtime diagnostics.
- Designed an iterative feedback retry loop that injects exact failure diagnostics back into model context with escalated reasoning effort until builds pass cleanly.

### PickleOps — The Pickleball Social (Club Operations Platform)
Next.js (App Router), React Native, TypeScript, Prisma, PostgreSQL, iOS · [App Store](https://apps.apple.com/us/app/the-pickleball-social/id6759585852) · [Case study](/projects/pickleops/)

- Shipped a club-management platform (Next.js web app for organizers + React Native iOS client on the App Store) maintained through 21 production releases in 5 months.
- Architected offline-first sync with version-based conflict resolution and client-generated operation IDs, allowing organizers to score matches on courts with zero cellular signal.
- Implemented atomic match finalization inside a single database transaction boundary, closing race conditions, duplicate clicks, and retry-induced rating corruption.
- Integrated DUPR single sign-on with opt-in match write-back and Bluetooth proximity discovery behind explicit user consent gates.

### MarketLens — Market Data Pipeline & Analytics Service
Java 21, Spring Boot 4, PostgreSQL, Flyway, Docker · Deployed on Render · [Case study](/projects/marketlens/)

- Built an idempotent market data ingestion pipeline processing ~50k–250k rows/run with yearly partitioned PostgreSQL tables, composite-key upserts, and Flyway migrations.
- Implemented technical indicator calculations (RSI, EMA, MACD), NYSE trading calendar and early-close awareness, and quarantine tables for data-quality anomaly detection.
- Productionized with API-key RBAC, Bucket4j rate limiting, Prometheus metrics, structured JSON logs with correlation IDs, OTLP distributed tracing, and Testcontainers integration tests.

### glicko2-ts — Zero-Dependency Rating Engine
TypeScript, Node.js, Vitest, CI/CD · Published NPM Package · Zero Dependencies

- Built and published a complete, zero-dependency TypeScript implementation of Mark Glickman's Glicko-2 rating system from the published mathematical specification.
- Achieved 100% statement, branch, and function coverage across 170+ tests, mathematically verifying every intermediate value against published solver bounds.
- Implemented mutation testing introducing 18 deliberate algorithmic defects to prove test suite assertion rigor and numerical stability.

### PickMe — Privacy-First Canadian Card Copilot
Swift 6, SwiftUI, SwiftData, iOS 18, CoreLocation, MapKit · [Blog Post](/blog/i-have-too-many-credit-cards-so-i-built-an-app-to-pick-one/)

- Architected a deterministic multi-card reward optimization engine using pure Swift packages and SwiftData to recommend the highest-earning card at checkout.
- Engineered 216 unit and store tests verifying proration across spend caps, effective-dated earn rules, FX costs, switch thresholds, and merchant-category reconciliation against posted statements.

### Looply — Returns, Subscriptions & Receipt Automation SaaS
Next.js, React 19, TypeScript, Prisma, Neon Postgres, Clerk, Stripe, Resend · [Case study](/projects/looply/)

- Built a full-stack personal finance SaaS for tracking returns, receipts, shipments, and recurring subscriptions with Clerk auth and Stripe billing.
- Automated receipt ingestion via Gmail OAuth and IMAP with HTML/PDF parsing, scanning ~200 emails per run with ~88% parse success.
- Engineered cron-triggered background jobs (digests, deadline alerts, shipping monitors) with PostgreSQL job tracking and safe reprocessing.

### MindSky — Visual Thought Mapping
React 19, TypeScript, `@xyflow/react` (React Flow), Express, PostgreSQL (JSONB), Drizzle ORM · [Case study](/projects/mindsky/)

- Built an infinite-canvas thought-mapping web application with snapshot-based undo/redo history and debounced autosave.
- Designed whole-graph persistence storing node and edge graphs in PostgreSQL JSONB, decoupling history state from rendering components.

## Education & certifications

**University of Toronto** — Bachelor of Science (BSc), Computer Science & Mathematics (Finance/Economics) · 2020 – 2025

**Microsoft Certified: Azure Fundamentals (AZ-900)** — Microsoft · 2024

**Advanced Digital and Professional Training** — Ted Rogers School of Management, Toronto Metropolitan University · 2025

**French Language Studies** — York University · 2025
