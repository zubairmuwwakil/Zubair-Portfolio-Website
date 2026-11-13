---
title: "Stock prices looked simple until I tried to build a reliable feed"
description: "MarketLens is a Java backend project about imperfect external data, safe retries and making sure the numbers behind a chart are worth trusting."
date: 2026-11-12
cover: /assets/marketlens-cover.jpg
coverAlt: "Hand-drawn diagram of the MarketLens pipeline: rate-limited price feeds funnel into Postgres, then out to cached REST endpoints and dashboards."
tags: [Java, Spring Boot, Data Pipelines, Reliability, PostgreSQL]
stack: [Java 21, Spring Boot 4, PostgreSQL, Flyway, Prometheus, OpenTelemetry]
liveUrl: https://marketdata.zubairmuwwakil.com
liveNote: "The demo may take a little time to respond after being idle."
repoUrl: https://github.com/zubairmuwwakil/marketdata
---

At first, market data looks like a pretty straightforward problem.

Request a stock price. Save it. Show it on a chart.

Then you try to build something that works every day.

What if the provider gives you a bad row? What if a scheduled job runs twice? What happens over a long weekend when the market is closed? What if the provider rate-limits you halfway through a backfill?

I started **MarketLens** because I wanted to understand those problems properly instead of hiding them behind a frontend chart.

## A price isn't just a number

A stock price needs context.

Which symbol? Which currency? Which trading day? Is it the latest daily close or something live? Has a split changed the meaning of the old prices?

I deliberately kept MarketLens focused on daily and historical pricing, rather than advertising it as a real-time trading feed.

That made the contract clearer. A caller can see how fresh a quote is and make its own decision about whether the data is usable.

## I didn't want one bad row to ruin the whole import

External providers aren't perfect. Neither are the files you get from them.

I built ingestion so it could be rerun safely. Duplicate work should not silently create duplicate prices.

I also added row-level quarantine. When a provider sends a malformed entry, the system can keep the bad row with a reason for review instead of throwing away valid records from the same batch.

That was an important shift for me.

It's tempting to think of a pipeline as successful when it finishes. I started thinking of success as **knowing what arrived, what was accepted, what failed, and why.**

## The backend needs to be useful to another product

MarketLens uses Java and Spring Boot, PostgreSQL, and Flyway migrations. It exposes protected REST endpoints for prices and indicators such as RSI, EMA and MACD.

It also handles corporate actions, exchange-calendar rules, quota tracking, data-quality checks and operational metrics.

I kept the service separate from personal finance accounts. A market-pricing service shouldn't need to know who owns a stock or how much money is in their portfolio.

That boundary makes it possible for something like Inunity to use prices without turning MarketLens into a giant finance application.

## How I check my work

I added a demo mode with seeded data, operational pages and API documentation so I can walk through the system without relying on an outside provider.

The repository also documents health checks, logs, observability and quality reports.

I haven't published a repeatable production load benchmark, so I wouldn't claim a specific throughput or latency improvement. The stronger story here is about correctness and recovery, not impressive numbers on a slide.

## What I'd still improve

I want to keep improving backfill visibility, failure diagnostics and performance testing under larger data volumes.

I'd also like to make the boundary between historical data and genuinely time-sensitive quotes even easier for API consumers to understand.

## What I learned

Building MarketLens made me much more careful about the information behind an application.

A chart can look perfect while its data is wrong. That's a dangerous kind of bug because it's easy to miss.

**I'd rather show someone a stale quote honestly than give them a fresh-looking number I can't explain.**

[Explore the code](https://github.com/zubairmuwwakil/marketdata) · [Why I stopped treating stock prices like a frontend problem](/blog/why-i-stopped-treating-stock-prices-like-a-frontend-problem/)
