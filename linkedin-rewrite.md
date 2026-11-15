# LinkedIn rewrite — paste-ready

Draft text for each field, plus the date fixes. Nothing here is on LinkedIn yet;
every block is for you to paste or edit yourself.

Facts this is built on: the BSc is in progress at Ontario Tech, expected April
2028, four terms remaining. US & Canadian citizen, no sponsorship either side.
NYC preferred over Toronto. G2i and Elevation Athletics are both current.

---

## 1. Headline

**Currently reads:**

> Software Engineer | Backend & Full-Stack | Python, Java, TypeScript, PostgreSQL | Built an iOS app now used by 4 sports clubs | US & Canadian Citizen | NYC & Toronto | University of Toronto

Two problems. It ends on **University of Toronto**, the degree you did not
finish, with no mention of the one you are actually enrolled in — so a recruiter
screening for current students cannot tell you are one. And "Built an iOS app
now used by 4 sports clubs" undersells an App Store product at v29.

**Replace with:**

```
Software Engineer | CS undergrad @ Ontario Tech (Apr 2028) | Shipped an iOS app to the App Store — 29 releases, 1,000+ users | Python · Java · TypeScript · PostgreSQL | NYC | US & Canadian citizen
```

220 characters, inside LinkedIn's limit. The order is deliberate: what you are,
then eligibility, then the single most verifiable proof, then stack, then
location. Recruiter search indexes this field heavily, so the stack keywords
stay.

If you would rather lead with the student framing — stronger for internship
screens, weaker for the Narmi-type roles:

```
CS undergrad @ Ontario Tech (Apr 2028) seeking Summer 2027 SWE internship | Shipped an iOS app — 29 App Store releases, 1,000+ users | Python · Java · TypeScript · PostgreSQL | NYC | US & Canadian citizen
```

---

## 2. About — holding this one until we've talked

You asked for something touching, personal and human — something that reads like
you and not like a machine. I'm not writing that from your commit history,
because the first draft I did is exactly the problem: competent, accurate, and it
could be any strong junior engineer. Nothing in it could only have been written
about you.

The parts of your story that are actually yours aren't in any repo:

- You were partway through a degree at U of T and a car accident stopped it.
- You didn't stop building. You started a federally incorporated nonprofit,
  dealt with school-board gym permits and league insurance, and shipped an app
  in a 14-day sprint.
- You went back to school, at a different university, to finish the thing that
  got interrupted — while holding two jobs and shipping to the App Store.

That's a far better story than "backend engineer with production experience," and
it's the one nobody else can claim. But I don't want to put words in your mouth
about any of it, which is why I'm asking rather than drafting.

The questions are in the conversation. Once you've answered even two or three of
them, I'll write this properly.

## 3. Education — add Ontario Tech

This is the most damaging gap on the profile. Your Education section currently
lists, in order: Obsidi Academy (certificate), University of Toronto marked
**(Incomplete)**, and high school. Marking U of T incomplete was the honest
thing to do — but with no current enrollment listed after it, the section reads
as *dropped out* rather than *graduating in 2028*, and it makes you look
ineligible for exactly the programs you are eligible for.

**Add a new Education entry, and let it sort to the top:**

| Field | Value |
|---|---|
| School | Ontario Tech University |
| Degree | Bachelor of Science (BSc) |
| Field of study | Computer Science |
| Start | 2026 |
| End date (expected) | 2028 |

Description:

```
Completing a BSc in Computer Science, expected April 2028, after transferring
from the University of Toronto. Four terms remaining.
```

Leave the U of T entry as it is — "(Incomplete)" with the 3.3 GPA is accurate
and the coursework detail is worth keeping. Once Ontario Tech sits above it, the
pair reads as a transfer, which is what happened.

Keep Obsidi Academy. A 96% in a 12-week instructor-led program with admission by
technical assessment is a real signal, and it is the kind of thing that
corroborates the rest.

---

## 4. Date fixes — the ones that cost you most

Both of your engineering roles currently show as **ended**, while your résumé
says both are current. A recruiter who reads both sees a contradiction about
whether you are employed right now.

You confirmed the résumé is correct, so LinkedIn is what needs editing:

| Entry | LinkedIn says | Change to |
|---|---|---|
| **G2i Inc.** | Aug 2025 – Oct 2026 | Aug 2025 – **Present** (tick "I am currently working in this role") |
| **Elevation Athletics — Software Engineer** | Sep 2024 – Oct 2026 | **Feb 2026 – Present** |

You have confirmed **Feb 2026** is the correct start for the Software Engineer
title, so LinkedIn's Sep 2024 is the entry to edit. Sep 2024 is presumably when
you began doing the work; Feb 2026 is when leadership adopted the app and
retitled you, and the retitle is what the entry should say.

Also fix, on the Elevation entry:

- "Shipped **21+** App Store releases **in 5 months**" → "Shipped **29** App
  Store releases **since March 2026**". The App Store lookup API serves v29.0.0
  and the repo is at 30.0.0 / build 358, so 21 is stale and the five-month window
  closed.

**Confirmed, and you undersold it.** Counted in the repo, excluding
node_modules, CocoaPods, build output and the nested worktree: **17,209 test
cases across 2,403 test files** (16,238 under apps/, 624 under scripts/, 347
under packages/), and **exactly seven workflows** — a11y, bundle-size,
document-freshness, guardrail-drift, mobile-pipeline, mobile-release-lane,
quality.

So update the line to **"17,000+ automated tests and seven CI workflows"**.
Conservative against the real count, and "workflows" rather than "gates"
because that is what they are. This is now on the résumé, the case study and
the homepage too.

---

## 5. Open to work — New York first, and the title list

Currently **Toronto, ON +4 more**, Toronto first. That is why every LinkedIn job
alert in your inbox is a Toronto role.

**Locations, in this order:**

1. New York City Metropolitan Area
2. Greater Toronto Area (keep it, last, as the fallback)

**Job titles — LinkedIn allows a maximum of five.** You named more than five, so
these are the five with the widest reach:

| # | Title | Why this one |
|---|---|---|
| 1 | **Software Engineer Intern** | The Summer 2027 target. Internship reqs are indexed separately from full-time; without this you do not surface for them at all. |
| 2 | **Software Developer** | Your point about Canada is correct, and it is the single highest-value addition here. See below. |
| 3 | **Junior Software Engineer** | What your own posts already ask for, and what most entry-level inbound is titled. |
| 4 | **Software Engineer** | The general case, and the most-searched title by US recruiters. |
| 5 | **Backend Developer** | Your actual specialism, and it narrows you toward work you want rather than generic full-stack. |

**You are right about "Software Developer" in Canada, and the reason matters.**
"Engineer" is a legally protected title there, regulated provincially — in
Ontario by Professional Engineers Ontario under the Professional Engineers Act.
Using it without a licence is an offence, so a great many Canadian employers
post "Software Developer" to stay clear of it entirely. If your title list says
only "Software Engineer", you are invisible to a real share of Canadian
postings. This is a genuinely good catch and not a cosmetic one.

**What did not make the five, and why you lose nothing:**

- *Entry Level Software Engineer* — "entry level" is a separate **experience
  level** filter on LinkedIn, not part of the title. Set the filter instead;
  it does the same work without spending a title slot.
- *Apprenticeship / Software Engineering Apprentice* — likewise handled by the
  **job type** filter (set Internship **and** Apprenticeship there, which is
  how the IBM-style programs are categorised). Apprenticeship titles vary too
  much to match on text anyway.
- *Junior Software Developer* — "Software Developer" at junior experience level
  already covers it.

So: five titles above, plus **experience level** set to Internship / Entry level,
and **job type** set to Internship, Full-time and Apprenticeship.

## 6. Company field

Your profile's company badge reads **Obsidi Academy**, which is a training
program rather than an employer. Setting G2i Inc. back to Present (item 4) should
move this on its own, since LinkedIn shows your most recent current role.

---

## 7. The one thing that is not a text edit

**157 connections, 165 followers.**

For big-company early-career hiring, referrals move more applications than the
portal does, and 157 connections is not a network you can ask for one. This is
the highest-leverage item on the list and the only one no rewrite fixes.

Your posts are already good — real engineering substance, 316 and 1,150
impressions on the best two, and two of them say outright that you are looking.
That is the hard part done. The missing half is deliberately connecting with
engineers and recruiters at the companies you are targeting, at a steady rate,
with a short note rather than a bare request.

---

## Resolved: the employer is Neighbourhood Developing Careers

Checked the federal grant records. **Neighbourhood Developing Careers** is the
legal recipient name — a not-for-profit funded through Canada Summer Jobs — and
**"NDC Trades"** is recorded as its *trade name*, tied to the Scarborough-North
federal riding. So both names were real; "NDCTrades" was not invented.

But only the legal name resolves on a reference call or a background check, so
the résumé now reads **Neighbourhood Developing Careers (NDC Trades)** — legal
name leading, trade name in parentheses so either spelling matches whatever the
records say. Title stays **Finance Solutions Architect** per your instruction,
with the automation bullets, since that description is both accurate and the one
relevant to engineering roles.

Your LinkedIn entry already uses the legal name, so **nothing to change there**
except the title, if you want the two documents to match exactly.
