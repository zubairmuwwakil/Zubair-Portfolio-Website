import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Building2, HeartHandshake, Laptop2, Smartphone } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { SITE_ORIGIN } from "@/lib/posts";

const VENTURES_URL = SITE_ORIGIN + "/ventures/";
const DESCRIPTION = "Explore Zubair Muwwakil's software products, commercial ventures, and independent community athletics nonprofit.";

const products = [
  {
    name: "PB Social / The Pickleball Social",
    category: "Sports operations SaaS",
    description: "Software for registrations, scheduling, match operations, and organized pickleball programs.",
    url: "https://pbsocial.ca",
    cta: "Visit PB Social",
    icon: Laptop2,
  },
  {
    name: "Inunity",
    category: "Financial software",
    description: "A finance platform for organizing transactions, records, and personal financial insights.",
    url: "https://inunity.ca",
    cta: "Explore Inunity",
    icon: Laptop2,
  },
  {
    name: "PickMe",
    category: "iOS project in development",
    description: "An offline-first iOS card copilot that compares credit card rewards at checkout. Not yet a public App Store product.",
    url: "https://github.com/zubairmuwwakil/PickMe",
    cta: "View development project",
    icon: Smartphone,
  },
] as const;

export default function Ventures() {
  useDocumentHead({
    title: "Ventures — Zubair Muwwakil",
    description: DESCRIPTION,
    canonical: VENTURES_URL,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": VENTURES_URL + "#page",
      name: "Ventures — Zubair Muwwakil",
      url: VENTURES_URL,
      description: DESCRIPTION,
      about: { "@id": SITE_ORIGIN + "/#person" },
      mainEntity: [
        {
          "@type": "Organization",
          name: "Zemi Echelon",
          url: "https://zemiechelon.com",
          founder: { "@id": SITE_ORIGIN + "/#person" },
        },
        {
          "@type": "Organization",
          name: "Echelon Community Athletics Inc.",
          url: "https://echeloncommunity.ca/",
          founder: { "@id": SITE_ORIGIN + "/#person" },
        },
      ],
    },
  });

  return (
    <BlogLayout>
      <header className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">
          Engineering in practice
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight text-gradient">
          Ventures & organizations
        </h1>
        <p className="mt-5 text-lg text-foreground/85 leading-relaxed">
          I'm a software engineer who also builds products and helps run the
          organizations that use them. Here's how my commercial and community work connect.
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          My software business and the nonprofit are separate organizations with different purposes.
        </p>
      </header>

      <section aria-labelledby="zemi-heading" className="mb-12">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8 shadow-lg shadow-primary/10">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-primary">
                Commercial software
              </p>
              <h2 id="zemi-heading" className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Zemi Echelon
              </h2>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-foreground/85">
            Zemi Echelon is the for-profit side of my work. It brings together
            software products and technical projects I develop, including sports
            operations and personal finance tools.
          </p>
          <a href="https://zemiechelon.com" target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            Visit Zemi Echelon <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <h3 className="mt-8 mb-4 font-serif text-xl sm:text-2xl font-bold">Software products</h3>
        <ul className="grid gap-4">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <li key={product.name} className="rounded-2xl border border-border/60 bg-card/70 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="rounded-xl bg-secondary p-2 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {product.category}
                    </p>
                    <h4 className="mt-1 text-xl font-bold">{product.name}</h4>
                  </div>
                </div>
                <p className="mt-4 text-foreground/80 leading-relaxed">{product.description}</p>
                <a href={product.url} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
                  {product.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Interested in the engineering behind the sports platform?{" "}
          <Link href="/projects/pickleops/" className="font-semibold text-primary hover:underline underline-offset-4">
            Read the PickleOps case study
          </Link>.
        </p>
      </section>

      <section aria-labelledby="nonprofit-heading" className="mb-12">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-accent/10 via-background to-primary/10 p-6 sm:p-8 shadow-lg shadow-primary/10">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HeartHandshake className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-primary">
                Independent nonprofit
              </p>
              <h2 id="nonprofit-heading" className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Echelon Community Athletics Inc.
              </h2>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-foreground/85">
            I founded Echelon Community Athletics Inc., a federally incorporated
            Canadian nonprofit focused on community athletics and organized sport.
            It is legally separate from Zemi Echelon, not a software subsidiary.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Learn more about its independent programs and mission at{" "}
            <a href="https://echeloncommunity.ca/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline underline-offset-4">
              echeloncommunity.ca
            </a>.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 pt-8">
        <h2 className="font-serif text-2xl font-bold">The connection</h2>
        <p className="mt-3 text-foreground/85 leading-relaxed">
          Across these efforts, I start with a real workflow, build reliable
          software around it, and improve the experience of the people using it.
          My engineering projects and writing show the technical decisions behind that work.
        </p>
        <div className="mt-5 flex flex-wrap gap-5">
          <Link href="/projects/" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            Engineering projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/blog/" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            Engineering writing <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </BlogLayout>
  );
}
