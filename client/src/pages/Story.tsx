import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, HeartHandshake } from "lucide-react";
import { BlogLayout } from "@/components/BlogLayout";
import { useDocumentHead } from "@/hooks/use-document-head";
import { SITE_ORIGIN } from "@/lib/posts";

const URL = SITE_ORIGIN + "/story/";
const DESCRIPTION = "The life I planned, the one I'm building: Zubair Muwwakil on interrupted plans, loving the work, and building for people.";

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
    { "@type": "ListItem", position: 2, name: "My Story", item: URL },
  ],
};

export default function Story() {
  useDocumentHead({
    title: "The Life I Planned, and the One I'm Building — Zubair Muwwakil",
    description: DESCRIPTION,
    canonical: URL,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": URL + "#page",
        name: "The Life I Planned, and the One I'm Building",
        url: URL,
        description: DESCRIPTION,
        about: { "@id": SITE_ORIGIN + "/#person" },
      },
      breadcrumbs,
    ],
  });

  return (
    <BlogLayout>
      <article className="space-y-11 text-foreground/85">
        <header className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            My story · November 2026
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold leading-tight text-gradient">
            The life I planned, and the one I'm building
          </h1>
          <p className="text-xl leading-relaxed text-foreground">
            I thought I'd be somewhere different by now. I'm still figuring things out.
            But I also genuinely love what I'm building along the way.
          </p>
          <p className="text-sm text-muted-foreground">
            A personal note about ambition, an interrupted education, the people behind my projects,
            and learning to live with plans that change.
          </p>
        </header>

        <section className="space-y-4 leading-relaxed text-lg">
          <p>
            When I was younger, I had a pretty clear idea of what my life would look like.
            I imagined working at a company like Google or Amazon, building a substantial
            investment portfolio, owning two properties, and being married with a child.
            It was ambitious, but it was the future I was working toward.
          </p>
          <p>
            A car accident interrupted my studies at the University of Toronto. I didn't
            finish that degree, and my education took a different path. I'm now continuing
            my Computer Science degree at Ontario Tech University.
          </p>
          <p>
            Sometimes I feel like I'm trying to catch up to the life I would've had if
            things had gone differently. And every rejection or opportunity that doesn't
            work out can make that feeling a little heavier.
          </p>
          <blockquote className="border-l-4 border-primary pl-5 py-2 font-serif text-xl sm:text-2xl text-foreground leading-relaxed">
            Sometimes it feels like I'm swimming toward the surface with a ball and chain
            tied to my ankle. I know I've moved forward, but it doesn't always feel that way.
          </blockquote>
          <p>
            I'm proud of what I've done. I also have days when that pride disappears
            because I'm thinking about everything I haven't achieved yet. I don't want
            to pretend that part is easy.
          </p>
        </section>

        <section className="space-y-4 leading-relaxed text-lg">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            I kept opening my laptop
          </h2>
          <p>
            Part of what drove me was not wanting to fail or waste the time I had.
            I wanted to keep learning, to get better at something, and to know I was
            taking steps toward a better future even when school wasn't going as planned.
          </p>
          <p>
            But fear isn't the whole story. I really, genuinely love building things.
            When I get interested in a problem, I can spend hours on it, then days,
            sometimes weeks. I don't get bored. I get more curious.
          </p>
          <p>
            What excites me is that an idea never has to stay the idea you started with.
            You build one part and discover three other possibilities. Some things stop
            making sense. Others branch off into a completely new direction. Sometimes
            the most interesting outcome is something you couldn't have planned at all.
          </p>
          <p>
            That's how the pickleball work started. I was coaching at a school in
            Courtice, watching coaches write out schedules by hand, working out
            matchups and moving people between courts. All of that time belonged to
            the players, and it was going on paperwork instead. I kept thinking: why
            are we still doing all of this by hand? I started with Excel and a few
            automations, hit their limits, and kept going.
          </p>
        </section>

        <section className="space-y-5 leading-relaxed text-lg">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] font-semibold text-primary">The person behind a feature</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              "Wow, you built that just for me?"
            </h2>
          </div>
          <p>
            There's a woman I know who used to organize weekly pickleball matches.
            She cared so much about giving everyone a place to play, but she was
            carrying almost all of the work herself. People cancelled, replacements
            had to be found, and everyone looked to her to make it work.
          </p>
          <p>
            I remember seeing her close to tears. This was someone I genuinely cared
            about, and so much of the effort she put in seemed to go unnoticed.
            She was meant to be enjoying the game, too.
          </p>
          <p>
            So I built the group feature in Pickleball Social. It gave players a way
            to manage their availability, helped them be accountable, and made
            finding substitutes less of a burden on one person.
          </p>
          <p>
            When I showed it to her, her first reaction was, "Wow, you built that
            just for me?" About a week later, she was smiling more, feeling less
            stressed, and actually playing again. Whenever she saw me, she'd have
            this huge grin on her face.
          </p>
          <p>
            That's a moment I won't forget. I didn't need a dashboard to tell me
            the software mattered. I could see it on her face.
          </p>
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 sm:p-6 text-base">
            <p className="font-semibold text-foreground mb-2">The work behind the story</p>
            <p className="text-foreground/80">
              The group feature grew into recurring play groups, member management,
              host tools, and ways to find substitutes. It's part of an app that has
              shipped 29 App Store releases since March 2026, serving around 850
              accounts and more than 1,000 players, behind 17,000+ automated tests
              and seven CI workflows. You can see the early work in the repository,
              not just read about it here.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://github.com/The-Pickleball-Social/pbsocial/commit/acfc370a3be519ec6a449dcecaaff334bd46c08e"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4"
              >
                See the group feature commit <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/projects/pickleops/" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4">
                Read the case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-4 leading-relaxed text-lg">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Building freedom, not just features
          </h2>
          <p>
            Finance keeps showing up in my work, too. I've worked with financial
            systems and built things like PickMe and MoneyTalks because I think
            more people deserve to understand how money works.
          </p>
          <p>
            I love learning about finance and sharing what I learn. Money can limit
            someone's choices, or it can give them more of them. I want people to
            have the tools and knowledge to make decisions that move them toward
            financial freedom.
          </p>
          <p>
            That's also what I want for myself. I want to build a career, learn from
            excellent engineers, and eventually have the freedom to spend my time
            on work and people that matter to me. I want to enjoy life while I'm
            young, build a family, and help the people around me do the same.
          </p>
          <p>
            My work now stretches across software products and community sport.
            I build commercial software through Zemi Echelon, and I founded
            Echelon Community Athletics as a separate nonprofit. The organizations
            have different purposes, but both reflect what I care about: giving
            people better tools and more opportunities.
          </p>
        </section>

        <section className="space-y-4 leading-relaxed text-lg">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            The parts people don't usually post
          </h2>
          <p>
            I've interviewed for jobs I was excited about and didn't get them.
            I've made it to assessments, and I've had an offer fall through.
            Some of those moments really hurt. After enough of them, it's hard
            not to question yourself.
          </p>
          <p>
            I don't want to make this a story where every setback magically
            turns into a lesson and everything works out in the last paragraph.
            I'm still in it. Being resilient doesn't mean the disappointment
            goes away. Sometimes I wish things had just worked out.
          </p>
          <p>
            I'm keeping a public <Link href="/interview-journey/" className="font-semibold text-primary hover:underline underline-offset-4">interview journey</Link>
            because I think other people go through these feelings and don't
            always talk about them. It's not a scorecard of my worth. It's an
            honest record of trying.
          </p>
        </section>

        <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8 space-y-4 leading-relaxed text-lg">
          <HeartHandshake className="h-7 w-7 text-primary" aria-hidden="true" />
          <h2 className="font-serif text-3xl font-bold text-foreground">
            If things haven't gone to plan for you either
          </h2>
          <p>
            I hope you can read this and feel a little less alone. Life rarely
            goes exactly the way we picture it. Sometimes we fail, and sometimes
            we do everything we can and still don't get what we hoped for.
          </p>
          <p>
            Maybe one day we'll look back and laugh at how worried we were.
            I can't promise that, and I don't know where my own story ends.
            But I do think the way we respond when our plans fall apart says
            something about who we are.
          </p>
          <p className="font-semibold text-foreground">
            I'm trying to ask myself a better question: things aren't working
            out the way I wanted, so how can I make the best of where I am now?
          </p>
        </section>

        <nav aria-label="Continue reading" className="border-t border-border pt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold">
          <Link href="/interview-journey/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            The interview journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/growth/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            The work between setbacks <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/ventures/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            What I'm building <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/projects/" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
            Engineering projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </article>
    </BlogLayout>
  );
}
