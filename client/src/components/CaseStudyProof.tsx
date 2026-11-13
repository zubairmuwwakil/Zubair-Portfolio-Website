import { ArrowUpRight } from "lucide-react";

type EvidenceLink = {
  label: string;
  detail: string;
  href: string;
};

type FlagshipProof = {
  focus: string;
  problem: string;
  built: string;
  challenge: string;
  flow: string[];
  evidence: EvidenceLink[];
  caveat: string;
};

/**
 * Evidence is hand-selected from public source, tests, and product destinations.
 * These are simplified system maps, not claims of production performance.
 */
const flagshipProofs: Record<string, FlagshipProof> = {
  pickleops: {
    focus: "Production product · Web and iOS · Sports operations",
    problem:
      "Registrations, game-day decisions, scores, and payments were spread across tools that did not agree.",
    built:
      "Web and mobile workflows for running leagues, recording matches, and supporting players and organizers.",
    challenge:
      "Offline mutations must be recoverable. Repeated requests and conflicting scores cannot silently corrupt a session.",
    flow: [
      "Register for a program",
      "Organize the session",
      "Record actions on court",
      "Replay or review conflicts",
      "Update match records",
    ],
    evidence: [
      {
        label: "Shipped iOS app",
        detail: "Open the public App Store listing",
        href: "https://apps.apple.com/us/app/the-pickleball-social/id6759585852",
      },
      {
        label: "Offline conflict handling",
        detail: "Read the client-side conflict resolver",
        href: "https://github.com/zubairmuwwakil/pickleball-session-manager/blob/main/apps/mobile/src/core/offline/offline.conflict-resolver.ts",
      },
      {
        label: "Idempotency test cases",
        detail: "See how retries reuse a mutation key",
        href: "https://github.com/zubairmuwwakil/pickleball-session-manager/blob/main/apps/mobile/src/core/offline/offline.idempotency.test.ts",
      },
      {
        label: "Reconnect test flow",
        detail: "Inspect the documented mobile regression flow",
        href: "https://github.com/zubairmuwwakil/pickleball-session-manager/blob/main/.maestro/flows/offline-reconnect-resilience.yaml",
      },
    ],
    caveat:
      "The usage and retention numbers in the story are approximate operational figures, not independently audited results. The flow above is a simplified illustration.",
  },
  marketlens: {
    focus: "Backend engineering · Java · Data reliability",
    problem:
      "External price data can be late, duplicated, malformed, rate-limited, or missing entirely.",
    built:
      "A Java service that ingests and validates historical market data, stores it in PostgreSQL, and serves it through an API.",
    challenge:
      "Retries must not create duplicate records, bad rows need clear handling, and stale quotes must never look live.",
    flow: [
      "Read provider data",
      "Apply quota and retry rules",
      "Upsert or quarantine rows",
      "Store prices and indicators",
      "Serve freshness-aware quotes",
    ],
    evidence: [
      {
        label: "Ingestion implementation",
        detail: "Follow the quota-aware ingestion service",
        href: "https://github.com/zubairmuwwakil/marketdata/blob/main/src/main/java/com/zubairmuwwakil/marketdata/service/ingestion/IngestionService.java",
      },
      {
        label: "Quote read path",
        detail: "Read the logic for last-known and stale prices",
        href: "https://github.com/zubairmuwwakil/marketdata/blob/main/src/main/java/com/zubairmuwwakil/marketdata/service/quote/QuoteService.java",
      },
      {
        label: "Price honesty tests",
        detail: "Inspect tests around quote correctness",
        href: "https://github.com/zubairmuwwakil/marketdata/blob/main/src/test/java/com/zubairmuwwakil/marketdata/guardrails/PriceHonestyTest.java",
      },
      {
        label: "Demo implementation",
        detail: "See how seeded demo data is provided",
        href: "https://github.com/zubairmuwwakil/marketdata/blob/main/src/main/java/com/zubairmuwwakil/marketdata/demo/DemoDataSeeder.java",
      },
    ],
    caveat:
      "This is a historical and daily-pricing service, not a real-time trading feed. No measured production throughput or latency benchmark is claimed.",
  },
  inunity: {
    focus: "Full-stack product · Financial data · Privacy boundaries",
    problem:
      "Transactions and bills arrive from different sources, but collecting more data should not require sharing bank passwords.",
    built:
      "A financial ledger and capture workflows for collecting, interpreting, and connecting purchase information.",
    challenge:
      "Incomplete observations, ambiguous currencies, and similar-looking purchases require conservative reconciliation.",
    flow: [
      "Receive a user-controlled capture",
      "Validate the original observation",
      "Keep source evidence",
      "Match purchases conservatively",
      "Build usable financial views",
    ],
    evidence: [
      {
        label: "Live product",
        detail: "Explore Inunity's public website",
        href: "https://inunity.ca/",
      },
      {
        label: "Wallet capture validation",
        detail: "Read the payload parser and constraints",
        href: "https://github.com/zubairmuwwakil/MoneyTalks/blob/main/src/lib/domain/wallet/capturePayload.ts",
      },
      {
        label: "Capture contract tests",
        detail: "See currency and incomplete-event cases",
        href: "https://github.com/zubairmuwwakil/MoneyTalks/blob/main/src/lib/domain/wallet/capturePayload.test.ts",
      },
      {
        label: "Purchase matching tests",
        detail: "Inspect exact, possible, and rejected matches",
        href: "https://github.com/zubairmuwwakil/MoneyTalks/blob/main/src/lib/domain/spine/purchaseMerge.test.ts",
      },
    ],
    caveat:
      "Public tests and source show design decisions; they are not a third-party security audit. Connections to other financial tools are evolving, not all completed integrations.",
  },
};

export function CaseStudyProof({ slug }: { slug: string }) {
  const proof = flagshipProofs[slug];
  if (!proof) return null;

  return (
    <section
      aria-labelledby="case-study-proof-heading"
      className="mb-10 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
    >
      <div className="border-b border-border/70 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          The short version
        </p>
        <h2 id="case-study-proof-heading" className="mt-2 font-serif text-2xl font-bold">
          The problem, the build, and the proof
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{proof.focus}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { heading: "The problem", body: proof.problem },
            { heading: "What I built", body: proof.built },
            { heading: "The hard part", body: proof.challenge },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="text-sm font-bold text-foreground">{heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-bold">How the pieces fit</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          A simplified path through the system. Follow the code links below for the details.
        </p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {proof.flow.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-background p-3 lg:flex-col"
            >
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-sm font-semibold leading-snug">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Check the evidence yourself</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {proof.evidence.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-background p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span>
                  <span className="block text-sm font-bold text-primary group-hover:underline group-hover:underline-offset-4">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
          <strong>Evidence note:</strong> {proof.caveat}
        </p>
      </div>
    </section>
  );
}
