import { Link } from "wouter";
import { ArrowRight, CalendarDays, MessageSquareHeart } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { SITE_ORIGIN } from "@/lib/posts";
import { interviewJourney, type InterviewEntry } from "@/data/interviewJourney";

const URL = SITE_ORIGIN + "/interview-journey/";
const DESCRIPTION = "An honest, ongoing account of Zubair Muwwakil's unsuccessful interviews, assessments and career setbacks — and what it feels like to keep trying.";

const groups: Array<{
  stage: InterviewEntry["stage"];
  heading: string;
  description: string;
}> = [
  {
    stage: "Interview",
    heading: "Interviews that didn't turn into offers",
    description: "These reached an interview. I wanted the roles and didn't get them.",
  },
  {
    stage: "Assessment / application",
    heading: "Assessments and application outcomes",
    description: "A process that ended before an offer. Not necessarily a failed technical interview.",
  },
  {
    stage: "Recruiter conversation",
    heading: "Recruiting conversations that ended",
    description: "Early conversations about a job that didn't continue. These aren't failed interviews.",
  },
  {
    stage: "Position closed",
    heading: "Roles that were filled or cancelled",
    description: "Sometimes the opportunity disappears, even when the candidate is still interested.",
  },
  {
    stage: "Offer setback",
    heading: "An offer that didn't turn into a job",
    description: "This was a different kind of disappointment. Getting an offer didn't mean everything was settled.",
  },
];

export default function InterviewJourney() {
  useDocumentHead({
    title: "The Interviews That Didn't Work Out — Zubair Muwwakil",
    description: DESCRIPTION,
    canonical: URL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": URL + "#page",
        name: "The Interviews That Didn't Work Out",
        url: URL,
        description: DESCRIPTION,
        about: { "@id": SITE_ORIGIN + "/#person" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
          { "@type": "ListItem", position: 2, name: "Interview Journey", item: URL },
        ],
      },
    ],
  });

  return (
    <BlogLayout>
      <article className="space-y-11">
        <header className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Career journal · Updated November 2026
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold leading-tight text-gradient">
            The interviews that didn't work out
          </h1>
          <p className="text-lg sm:text-xl text-foreground leading-relaxed">
            People usually post the offer. I wanted to share the other side, too.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            I've had interviews I didn't pass, applications that ended before an
            interview, roles that were cancelled or filled, and even an offer that
            fell through. Every time, I hoped this might be the opportunity that
            helped me get closer to the future I'm working toward. When it wasn't,
            I felt it.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            This is a living record of the processes I can confidently document so
            far, not a claim that I've listed every application I've ever sent.
            I'm separating interviews, application screening, recruiter conversations,
            roles that closed, and offer setbacks because they're not the same thing.
            I haven't included private recruiter messages, interview questions,
            or dates I can't verify.
          </p>
        </header>

        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 sm:p-6">
          <p className="font-serif text-xl sm:text-2xl text-foreground leading-relaxed">
            After enough setbacks, you start wondering if you're good enough.
            I don't want to pretend that feeling isn't real.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This page is about my experience, not a judgment of any employer or their interview process.
          </p>
        </div>

        {groups.map((group) => {
          const entries = interviewJourney.filter((entry) => entry.stage === group.stage);
          return (
            <section key={group.stage} aria-label={group.heading} className="space-y-5">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  {group.heading}
                </h2>
                <p className="mt-2 text-foreground/75 leading-relaxed">{group.description}</p>
              </div>
              <ol className="space-y-4">
                {entries.map((entry) => (
                  <li key={entry.company + entry.role}
                    className="rounded-2xl border border-border/60 bg-card/75 p-5 sm:p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                          {entry.company}
                        </h3>
                        <p className="mt-1 text-sm text-foreground/80">{entry.role}</p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                        {entry.stage}
                      </span>
                    </div>
                    {entry.period && (
                      <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {entry.period}
                      </p>
                    )}
                    <p className="mt-4 font-semibold text-foreground">{entry.outcome}</p>
                    <p className="mt-2 leading-relaxed text-foreground/80">{entry.note}</p>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        <section className="space-y-4 leading-relaxed text-lg text-foreground/85">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            What those outcomes don't show
          </h2>
          <p>
            They don't show the work I went back to after closing the email.
            They don't show the things I built, the skills I kept practicing,
            or the people I was able to help in the meantime.
          </p>
          <p>
            I used to picture myself already working at a major tech company,
            investing, buying property, and starting a family. Sometimes it
            feels like I'm trying to catch up to that version of my life.
            A rejection can feel like another delay, not just one lost job.
          </p>
          <p>
            But I still love engineering. I can disappear into a project for
            hours because I'm excited about what it could become. That part of
            me doesn't disappear when an interview goes badly.
          </p>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/75 p-5 sm:p-6 space-y-3">
          <h2 className="font-serif text-2xl font-bold text-foreground">An early no that became a yes</h2>
          <p className="leading-relaxed text-foreground/85">
            In February 2026, I was turned down for an OBSIDI Academy cohort.
            I applied again, and in June I received an acceptance to Cohort 10.
            I wanted to include that here, too. Not every disappointing decision
            stays the final answer.
          </p>
          <p className="text-sm text-muted-foreground">
            OBSIDI was a training program, not a job interview, so I keep it
            outside the job-outcome list.
          </p>
        </section>

        <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8 space-y-4">
          <MessageSquareHeart className="h-7 w-7 text-primary" aria-hidden="true" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            If you're going through this too
          </h2>
          <p className="text-lg leading-relaxed text-foreground/85">
            I hope this makes you feel a little less alone. Getting rejected
            hurts. You don't have to turn every disappointment into an inspirational
            lesson the same day it happens.
          </p>
          <p className="text-lg leading-relaxed text-foreground/85">
            Life rarely goes exactly to plan. I'm still learning how to make
            the best of the situation I'm in, instead of letting every setback
            decide what I think my future can be.
          </p>
          <Link href="/story/" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            Read the story behind this journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <footer className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
          <p>
            This is a manually updated personal journal. Entries describe my experience
            and outcomes, not confidential feedback or an assessment of any company's
            hiring standards. I add dates only when I know them.
          </p>
        </footer>
      </article>
    </BlogLayout>
  );
}
