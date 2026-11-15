import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, BookOpen, Code2, HeartHandshake } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { SITE_ORIGIN } from "@/lib/posts";
import { growthMilestones, type GrowthMilestone } from "@/data/growthMilestones";

const URL = SITE_ORIGIN + "/growth/";
const DESCRIPTION = "The work between the rejections: how Zubair Muwwakil keeps learning, building, and finding motivation after career setbacks.";

const icons: Record<GrowthMilestone["category"], typeof Code2> = {
  Building: Code2,
  Learning: BookOpen,
  Persistence: HeartHandshake,
};

export default function Growth() {
  useDocumentHead({
    title: "The Work Between the Rejections — Zubair Muwwakil",
    description: DESCRIPTION,
    canonical: URL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": URL + "#page",
        name: "The Work Between the Rejections",
        url: URL,
        description: DESCRIPTION,
        about: { "@id": SITE_ORIGIN + "/#person" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
          { "@type": "ListItem", position: 2, name: "Growth", item: URL },
        ],
      },
    ],
  });

  return (
    <BlogLayout>
      <article className="space-y-11">
        <header className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Growth journal · Updated November 2026
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold leading-tight text-gradient">
            The work between the rejections
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-foreground">
            I don't always bounce back right away. Sometimes I'm discouraged for a while.
            Eventually, I find my way back to learning and building.
          </p>
          <p className="text-base leading-relaxed text-foreground/80">
            I've shared the interviews and applications that didn't work out.
            This is the other part of that story: the things I kept doing while
            trying to build the future I want. Not all of it happened because of
            a rejection. A lot of it happened because I really love the work.
          </p>
        </header>

        <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            There isn't always an instant comeback
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
            When I get a rejection, I can feel discouraged for a while. I think
            about the opportunity, what I might have done differently, and how far
            I still feel from the life I pictured for myself. Sometimes I need time
            before I feel motivated again.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
            Then, eventually, something catches my attention. A problem I want
            to solve. A concept I don't understand yet. A feature that could make
            someone's day easier. I get interested, and I start working on it.
            Once I'm building, I can get completely absorbed for hours.
          </p>
          <p className="text-base sm:text-lg leading-relaxed font-semibold text-foreground">
            That's what this page is for: to remind myself that even when progress
            doesn't feel obvious, I haven't been standing still.
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              What that growth looks like
            </h2>
            <p className="leading-relaxed text-foreground/75">
              These are selected milestones, not a complete history or a claim
              that every project followed a particular interview. Public code
              links are included where I have them. Coursework and personal
              study notes are described without publishing private emails.
            </p>
          </div>
          <ol className="relative space-y-6 border-l-2 border-border/70 pl-5 sm:pl-8">
            {growthMilestones.map((item) => {
              const Icon = icons[item.category];
              return (
                <li key={item.period + item.title} className="relative">
                  <span className="absolute -left-[2.05rem] sm:-left-[2.8rem] top-5 flex size-7 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="rounded-2xl border border-border/60 bg-card/75 p-5 sm:p-6 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted-foreground">
                      <span>{item.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-foreground/85">{item.description}</p>
                    {item.proof && (
                      <div className="flex flex-col gap-2 border-t border-border/60 pt-3">
                        {item.proof.map((source) => (
                          <a
                            key={source.url}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
                          >
                            {source.title} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="space-y-4 text-lg leading-relaxed text-foreground/85">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            What I hope someone else sees here
          </h2>
          <p>
            There's a lot that doesn't show up in a rejection email. There are
            the hours practicing, the things that finally make sense after a few
            tries, the projects you build because you can't stop wondering what
            they could become, and the people those projects help.
          </p>
          <p>
            I'm not at the point I thought I'd be in life. I still have days
            when that really hurts. But I'm learning that I can want more for
            myself and still recognize the things I've done along the way.
          </p>
          <p>
            If you're going through something similar, I hope you can see that
            it's okay if finding your motivation takes a little time.
          </p>
        </section>

        <nav aria-label="Continue reading" className="border-t border-border pt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold">
          <Link href="/interview-journey/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            See the interview journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/story/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            Read my full story <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/projects/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            Explore my projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Milestones are manually curated and reflect projects, self-reported practice,
          or verified course and program correspondence. A date or nearby setback
          does not prove that one caused the other.
        </p>
      </article>
    </BlogLayout>
  );
}
