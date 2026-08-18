---
title: Why I stopped treating stock prices like a frontend problem
description: Building MarketLens, a Spring Boot market-data pipeline that turned a simple portfolio feature into a real backend system.
date: 2026-08-14
cover: /assets/marketlens-cover.jpg
coverAlt: "Hand-drawn diagram of the MarketLens pipeline: rate-limited price feeds funnel into Postgres, then out to cached REST endpoints and dashboards."
tags: [Java, Spring Boot, PostgreSQL, Data Engineering, REST APIs, Observability]
---

The original problem sounded almost trivial: I wanted to track investments.

If you own a few stocks, showing their current value seems like one of the easiest features you could build. Store the ticker and number of shares, fetch a price, multiply the two, and display the result.

My first instinct was exactly that. A frontend or Next.js backend could call something like Yahoo Finance, grab the latest price, and move on.

But the more I thought about what I actually wanted from an investment tracker, the less that architecture made sense.

I didn't just want to know that I owned 10 shares of a company and that those shares were worth some amount today. I wanted historical prices. I wanted to understand what happened after stock splits. I wanted indicators. I wanted to know whether data was missing. I wanted a trading calendar so weekends and holidays weren't treated like failed ingestion runs.

At that point, fetching a stock price had stopped being a UI feature.

It had become a data problem.

## Building MarketLens

That realization became [MarketLens](/projects/marketlens/), a Java and Spring Boot service dedicated to market data.

Instead of asking the user-facing application to reach out to a market-data provider every time it needs a price, MarketLens owns the ingestion process.

Alpha Vantage provides the upstream market data. MarketLens normalizes and stores OHLCV candles in PostgreSQL, tracks ingestion runs and provider quotas, and exposes the resulting data through a REST API.

Once the data existed locally, a lot more became possible.

I added split-adjusted historical queries, corporate actions, RSI, EMA and MACD calculations, NYSE trading-calendar awareness, and checks for suspicious or missing market data.

The service also tracks failures rather than pretending they didn't happen. Malformed rows can be quarantined, ingestion runs can be inspected or retried, and data-quality reports can surface gaps and outliers.

That was an important shift in how I thought about the project.

MarketLens wasn't supposed to merely produce numbers.

It was supposed to produce numbers I could trust.

## Treating ingestion as a real system

One of the more interesting engineering lessons came from something as mundane as scheduled ingestion.

External APIs fail. Requests get retried. Jobs get triggered twice. Providers impose quotas. A ticker can disappear or return malformed data.

A pipeline that works only when everything goes right isn't much of a pipeline.

So MarketLens grew support for idempotent ingestion requests, retry tracking, rate limiting, API-key authentication, quota monitoring, health endpoints, Prometheus metrics and structured logs.

That's far more infrastructure than I would ever have added to a component that simply called `getStockPrice()` from a web application.

But separating the problem into its own service made those requirements obvious.

It also created a much cleaner boundary:

MarketLens understands markets. The applications using MarketLens don't have to.

They ask for a summary, adjusted price history or an indicator. The complexity behind producing that answer stays inside the market-data service.

## Why I kept it separate

This became especially useful while I was building another personal-finance application.

That application also needed investment prices.

The easy solution would have been to add another market-data library and fetch prices directly from there. But then I would have two systems independently solving the same problem, with different caching, adjustment and failure behaviour.

MarketLens already existed.

So instead of rebuilding the functionality, the finance application could become another consumer of its API.

That is probably my favourite part of this project.

MarketLens started as a way to make an investment tracker better. It ended up becoming a reusable financial-data service with a very specific responsibility:

ingest market data once, validate it carefully, and make trustworthy market information available everywhere else.

Later, that boundary would become much more useful than I originally expected.
