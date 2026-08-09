---
title: Résumé — Zubair Muwwakil
description: Full-stack software engineer in Brooklyn, NY — Java/Spring Boot, Django, .NET, TypeScript. API design, production reliability, and database performance.
date: 2026-08-05
---

Full-Stack Software Engineer with experience across Java/Spring Boot, Django, .NET, and TypeScript, building data-driven products with strong API design and production reliability — auth, rate limiting, observability, idempotent reprocessing. Comfortable owning database design and performance in PostgreSQL/SQL Server, and shipping safely via tests and CI/CD.

Brooklyn, NY · USA & Canadian Citizen

## Technical skills

**Languages** — Java, Python, TypeScript/JavaScript, C#, SQL

**Backend** — Spring Boot, Django, REST APIs, OpenAPI/Swagger

**Frameworks** — React, Next.js

**Data** — PostgreSQL, SQL Server (T-SQL), Prisma, Flyway, migrations, indexing and query tuning

**Reliability & observability** — Micrometer/Prometheus, OpenTelemetry (OTLP), structured logging, tracing

**DevOps & quality** — Docker, GitHub Actions (CI/CD), JUnit, Spring Boot Test, unit and integration testing

## Experience

### G2i Inc. — Software Engineer (Contract)
Remote · Aug 2025 – Present · Contract

- Build and maintain Django backend services — REST APIs, background jobs, data processing — in a PR-driven code review environment.
- Own PostgreSQL/SQL Server changes: schema updates, indexing and query tuning, integrity checks, shipped through Dockerized CI gates.
- Deliver releases safely with unit and integration tests plus data integrity validation, preventing regressions and keeping deployments repeatable.

### Elevation Athletics — Regional Program Coordinator (Tech & Ops)
Toronto, ON · Mar 2023 – Present · Part-time · *Promoted: Coach → Lead Coach → District Lead*

- Built and deployed pbsocial.ca, a multi-tenant Next.js/TypeScript/PostgreSQL platform for session scheduling, registrations, attendance, and reporting; scaled from ~50 to 1,000+ participants.
- Engineered the core match systems: automatic group and match generation, atomic match finalization, and Glicko-2 rating with standings history for reliable competitive play.
- Implemented role-based ops workflows and retention analytics — roster/waitlist automation, check-in tooling — contributing to repeat sign-ups rising from ~20% to ~89% in a tracked cohort (16/18).
- Built a participant tracking system on the TeamSnap API, increasing onboarding throughput by ~40% via cleaner workflows and automation.
- Ran a structured support and triage workflow for 1,000+ users across 8 cities, keeping stakeholders unblocked with clear updates.

### The Senac Group — Financial Software Analyst (FP&A), Automation & Analytics
Toronto, ON · Jun 2023 – May 2025 · Part-time → Full-time · *Promoted: Intern → Assistant Financial Analyst → Software Developer*

- Built internal automation and reporting logic in C#/.NET and SQL Server (T-SQL) to improve FP&A data accuracy, repeatability, and close-cycle reliability.
- Automated recurring reporting workflows with SQL and Excel VBA, saving 10+ hours/week across weekly and monthly deliverables.
- Built pipelines to ingest and normalize exports from CRM, ERP, HR, and accounting systems, and shipped validation dashboards that surfaced discrepancies earlier — reducing rework during close.
- Created budgeting and variance dashboards with validation checks and guardrails, cutting formula defects by ~30% and improving forecast reliability.
- Produced scenario and cost/benefit models surfacing $25K+ in annual efficiency gains; owned finance tooling ops and wrote repeatable runbooks.

### NDCTrades — Finance Solutions Architect
Sep 2022 – Jun 2023 · Internship

- Automated invoicing and pricing workflows across QuickBooks and Humanity, increasing recurring revenue by ~20% while reducing operational errors.
- Streamlined payroll via data cleanup and automated checks, cutting processing time by ~35% and improving correctness.
- Built compliance and performance dashboards so risks surfaced earlier; wrote reusable implementation templates to standardize customer setups.

## Projects

### PickleOps — The Pickleball Social
Next.js, React Native, TypeScript, Prisma, PostgreSQL, iOS

Shipped to the App Store and maintained through 21 releases in five months. Offline-first sync with version conflict resolution, atomic match finalization, DUPR single sign-on with opt-in write-back, and Bluetooth proximity discovery with consent gates. [Read the case study](/projects/pickleops/).

### MarketLens — Market Data Pipeline & Analytics Service
Java 21, Spring Boot 4, PostgreSQL, Flyway · Deployed on Render

- Built a market data ingestion and analytics service with API-key auth, OpenAPI/Swagger, and a dashboard; shipped backfills, RSI/MACD, corporate actions, market calendar, and quality reporting.
- Implemented idempotent ingestion with run tracking and retries; ingests ~50k–250k rows per run (~5–30MB CSV) using composite keys, upserts, and yearly partitioning for scalable time-series queries.
- Productionized with rate limiting and quota tracking (Bucket4j), Prometheus metrics, structured logs with correlation IDs, OTLP tracing, and caching for hot paths; added data-quality checks for missing days, duplicates, and outliers to protect backfills.

[Read the case study](/projects/marketlens/).

### Looply — Returns, Subscriptions & Receipt Automation
Next.js, React 19, TypeScript, Prisma, PostgreSQL · Deployed on Vercel

- Built a full-stack SaaS with Clerk auth, Prisma schema and migrations, and dashboard UX — calendar, analytics, ops boards — for returns/refunds, subscriptions/bills, receipts, and shipments.
- Automated receipt ingestion via Gmail OAuth (plus optional IMAP) and PDF/HTML parsing; scans up to ~200 emails per run and extracts ~30–60 receipts at ~88% parse success.
- Built cron-triggered automations (digest, notify, shipping) with Postgres job and run tracking, safe reprocessing, and Resend delivery for auditable, retry-safe notifications.

[Read the case study](/projects/looply/).

### MindSky — Visual Thought Mapping
React, TypeScript, React Flow, Node.js, PostgreSQL

Infinite-canvas thought mapping with snapshot-based undo/redo and debounced autosave, persisting each map as a whole graph in Postgres JSONB. [Read the case study](/projects/mindsky/).

## Education & certifications

**University of Toronto** — BSc, Computer Science & Mathematics (Finance/Economics) · 2020 – 2025

**Ontario Tech University** — MSc, Computer Science · 2025 (postponed)

**Microsoft Certified: Azure Fundamentals (AZ-900)** — Microsoft · 2024

**Advanced Digital and Professional Training** — Ted Rogers School of Management, Toronto Metropolitan University · 2025

**French Language Studies** — York University · 2025
