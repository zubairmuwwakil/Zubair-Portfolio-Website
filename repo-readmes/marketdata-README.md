<!--
  Draft README for github.com/zubairmuwwakil/marketdata.
  Not part of the portfolio site.

  IMPORTANT — read before publishing. This describes ONLY what is in the repo as
  of 2026-08-05. The deployed service at marketdata.zubairmuwwakil.com is a later
  build: it serves an HTML dashboard at /, enforces API-key auth on
  /api/v1/candles (401), and per the résumé adds Bucket4j rate limiting, quota
  tracking, Prometheus metrics, OTLP tracing and OpenAPI. None of those appear in
  this repo's pom.xml. Deliberately not claimed below.

  To publish:
      gh repo clone zubairmuwwakil/marketdata /tmp/marketdata
      awk 'f && !(NR==skip) {print} /^-->$/{f=1; skip=NR+1}' \
        repo-readmes/marketdata-README.md > /tmp/marketdata/README.md
      cd /tmp/marketdata && git add README.md \
        && git commit -m "Replace README" && git push

  Also worth doing in that clone:
      git rm --cached .DS_Store src/main/resources/.DS_Store \
        src/main/resources/db/.DS_Store
      echo ".DS_Store" >> .gitignore

  And set the description (currently null):
      gh repo edit zubairmuwwakil/marketdata \
        --description "MarketLens — market data ingestion pipeline: Spring Boot, Postgres, Flyway, run-tracked Finnhub ingestion" \
        --homepage "https://zubairmuwwakil.com/projects/marketlens/"

  Delete this comment before publishing.
-->

# MarketLens — market data pipeline

Spring Boot service that ingests price and indicator data from Finnhub, normalizes it into PostgreSQL, and tracks every ingestion run so retries and backfills stay safe.

**Live:** [marketdata.zubairmuwwakil.com](https://marketdata.zubairmuwwakil.com) · **Case study:** [zubairmuwwakil.com/projects/marketlens](https://zubairmuwwakil.com/projects/marketlens/)

> The deployed service runs ahead of this repository — it adds an HTML dashboard, API-key auth and quota handling on the query endpoints. This repo is the ingestion core.

## Problem

Dashboards need reliable, de-duplicated market data without hammering upstream APIs under rate limits, without duplicate rows from retries and backfills, and without inconsistent shapes across sources.

The hard part isn't fetching the data. It's making a fetch that can be re-run — after a timeout, a partial failure, or a manual backfill — without corrupting what's already stored.

## Architecture

```
  Finnhub API
       │
       ▼
  FinnhubClient ──▶ FinnhubIngestionService ──▶ PostgreSQL
                          │                       price_candle
                          │                       technical_indicator
                          └──▶ PipelineRun ──────▶ pipeline_run
                               (status, timing)    schema by Flyway
```

**Decisions worth calling out**

- **Every ingestion is a tracked run.** `PipelineRun` + `PipelineStatus` record what was attempted and how it ended, rather than leaving success or failure implicit in whatever rows happen to exist. That is what makes a re-run diagnosable instead of a guess.
- **Flyway owns the schema**, not JPA's `ddl-auto`. `V1__init.sql` is the single ordered source of truth, so a deploy applies the same migration path every time and the schema is reviewable in a pull request.
- **Entities are separated by concern** — `PriceCandle` for OHLC series, `TechnicalIndicator` for derived series, `PipelineRun` for operational history. Keeping derived data in its own table means indicators can be recomputed without touching source candles.
- **Ingestion is an explicit admin operation** (`POST /api/v1/admin/ingest`), not a hidden side effect of a read path. Reads stay cheap and predictable; writes happen when something asks for them.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Service root |
| `POST` | `/api/v1/admin/ingest` | Trigger an ingestion run; returns the resulting `PipelineRun` |
| `GET` | `/actuator/health` | Health check (Spring Boot Actuator) |

## Tech stack

| Layer | Choice |
|---|---|
| Language | Java 25 |
| Framework | Spring Boot — Web MVC, Data JPA, Actuator |
| Database | PostgreSQL |
| Migrations | Flyway (`src/main/resources/db/migration`) |
| Upstream | Finnhub |
| Build | Maven (wrapper included) |
| Local infra | Docker Compose |

## Local setup

**Prerequisites:** JDK 25, Docker (for Postgres), a Finnhub API key.

```bash
git clone https://github.com/zubairmuwwakil/marketdata.git
cd marketdata

docker compose up -d          # Postgres
./mvnw spring-boot:run        # Flyway migrates on startup
```

Configuration lives in `src/main/resources/application.yml`; override per environment:

| Variable | Required | Purpose |
|---|---|---|
| `SPRING_DATASOURCE_URL` | yes | PostgreSQL connection string |
| `SPRING_DATASOURCE_USERNAME` | yes | Database user |
| `SPRING_DATASOURCE_PASSWORD` | yes | Database password |
| `MARKETDATA_FINNHUB_API_KEY` | yes | Finnhub API key |

Trigger a run:

```bash
curl -X POST http://localhost:8080/api/v1/admin/ingest
```

**Tests**

```bash
./mvnw test
```

## Deployment

Runs on Render as a JVM service. A Vercel serverless adapter also exists under `api/` for a Node-hosted deployment path; the JVM build is the primary target.

## What I'd do next

- Backfill tooling with range jobs, progress tracking and re-run guards
- Metrics and tracing around ingest latency, failure rate and query hot paths
- Stronger indexing, and partitioning once history justifies it
- More indicator families beyond the current set

## Status

Actively developed. The deployed service is ahead of this repository.

## License

MIT
