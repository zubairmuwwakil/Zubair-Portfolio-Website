---
title: "I wanted coding agents to prove their work"
description: "A small Python orchestration project built around independent verification, safe retries and spending limited AI usage carefully."
date: 2026-11-12
tags: [Python, Developer Tools, AI Agents, Testing, Automation]
stack: [Python, pytest, Typer, Pydantic, Git, CLI]
repoUrl: https://github.com/zubairmuwwakil/agent-orchestrator
---

I've used different AI coding tools, and I kept running into a familiar issue.

One agent would say a task was done. Then I'd run the tests and find something broken.

Another would spend a lot of time on a problem that a smaller model might have handled. And switching tools meant keeping track of different limits, sessions and results.

I wanted a more predictable way to work.

So I started building a small command-line tool called **orc**.

## Don't guess whether the agent is good. Check its work.

The idea is straightforward.

Give an agent a task in a clean Git branch. Let it make changes. Then run independent checks before treating the result as complete.

If the checks fail, keep the feedback. Decide whether another attempt makes sense. And record enough of the run that I can see what happened instead of trusting a success message.

I chose this because I've learned that confident output isn't the same as correct output.

## The part I care about is the feedback loop

I didn't want the first version to predict the perfect model for every task. That felt like solving the wrong problem.

I'd rather start with a simple sequence: attempt, verify, inspect the failure, and retry when there's a clear reason.

I also wanted usage tracking to be part of the system. When tools have different limits, a developer shouldn't burn an expensive option without knowing why.

The repository's first milestone supports a Claude Code execution lane, Git branching, verification, retry behavior and an advisory quota ledger. A broader multi-provider system is described in the specification but should not be confused with the completed milestone.

## What the project taught me

AI-assisted development is useful when the feedback loop is strong.

It doesn't remove the need for tests, version control or judgment. If anything, those become more important when changes can arrive quickly.

**My goal isn't to have an agent write the most code. It's to get a result I can understand and trust.**

[See the project](https://github.com/zubairmuwwakil/agent-orchestrator)
