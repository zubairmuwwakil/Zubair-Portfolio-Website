---
title: MarketLens — Market Data Pipeline & Analytics Service
description: A Java/Spring Boot market data pipeline with idempotent ingestion, rate limiting, and full observability, serving typed REST endpoints for dashboards.
date: 2026-08-05
cover: /assets/marketlens-cover.jpg
coverAlt: "Hand-drawn diagram of the MarketLens pipeline: rate-limited price feeds funnel into Postgres, then out to cached REST endpoints and dashboards."
tags: [Java, Spring Boot, PostgreSQL, Flyway, Observability]
stack: [Java 21, Spring Boot 4, PostgreSQL, Flyway, Bucket4j, Prometheus, OpenTelemetry]
liveUrl: https://marketdata.zubairmuwwakil.com
liveNote: "The live API runs on a free tier and sleeps when idle — the first request can take ~30 seconds to wake it."
repoUrl: https://github.com/zubairmuwwakil/marketdata
---

Backend pipeline that ingests price and indicator feeds, normalizes them into Postgres, and serves typed REST endpoints for dashboards and analytics.

## Problem

Dashboards needed reliable, de-duplicated market indicator data without:

- hammering upstream APIs under rate limits
- duplicate rows from retries and backfills
- inconsistent indicator shapes across sources
- slow "latest + time-range" queries for common views

## Solution

I built a pipeline focused on **data correctness, predictable performance, and safe reprocessing**.

### Idempotent ingestion and de-duplication

Ingest jobs are safe to re-run using upserts keyed by `(symbol, date)`, so retries and backfills don't create duplicates. Ingestion runs are tracked with retries, handling roughly 50k–250k rows per run — about 5–30 MB of CSV — using composite keys, upserts, and yearly partitioning to keep time-series queries scalable.

### Normalized indicator storage

Raw feeds are transformed into a normalized schema so indicators are queryable, consistent, and easy to extend as new series are added.

### Typed REST slices for dashboards

The API serves stable response shapes for common dashboard needs: latest values, date ranges, per-symbol slices. Hot paths are cached to keep latency predictable and reduce upstream churn. Endpoints are documented with OpenAPI/Swagger.

### Production hardening

Rate limiting and quota tracking with Bucket4j, Prometheus metrics, structured logs with correlation IDs, and OTLP tracing. Data-quality checks — missing days, duplicates, outliers — protect backfills from silently importing bad data.

## Key technical decisions

- **Upserts on `(symbol, date)`** to guarantee idempotency across retries
- **Normalized indicator tables** for a stable schema and fast range queries
- **Yearly partitioning** so historical range queries stay fast as the dataset grows
- **Cached hot indicator queries** to reduce repeated reads and upstream pressure
- **API-key auth with quota tracking** so consumption is bounded and attributable

## Outcomes

- Consistent indicator data even across retries and historical backfills
- Faster dashboard reads via query-friendly tables and caching
- Predictable upstream usage and costs by reducing API churn
- A clean foundation for adding more feeds, symbols, and indicator families

Shipped backfills, RSI/MACD indicators, corporate actions, a market calendar, and quality reporting, with a dashboard on top.

## What I'd improve next

- Backfill tooling with guardrails: range jobs, progress tracking, re-run safety
- Deeper observability around ingest latency, failures, and query hot paths
- Stronger indexing strategy and optional partitioning for very large history
- More indicator families: technicals, fundamentals, macro series
