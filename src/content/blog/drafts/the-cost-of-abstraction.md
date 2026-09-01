---
title: "The Cost of Abstraction"
description: "Every abstraction you add is a bet that the thing underneath won't change in ways that leak through. Here's how to make that bet well."
date: 2026-05-22
featured: true
tags: ["engineering", "philosophy"]
author: cannon
---

Abstraction is the engineer's default move. Something is complicated, so we wrap
it, name it, and stop thinking about it. Most of the time this is exactly right —
it's how we build anything larger than a single mind can hold. But every
abstraction carries a cost, and the good engineers are the ones who can feel that
cost before they pay it.

## The bet you're making

An abstraction is a promise: *you won't need to look inside this.* When the
promise holds, you've bought leverage. When it breaks — when the database's
"transparent" connection pool starts dropping connections, when the ORM
generates a query that scans a billion rows — you pay for the abstraction twice.
Once to build it, and once to tear it open under pressure while production burns.

The cost isn't the abstraction itself. It's the **distance it puts between you
and the truth** when you finally need the truth.

## A rule of thumb

I ask three questions before adding a layer:

1. **Does it hide complexity, or just move it?** Moving complexity behind a
   worse interface is negative work.
2. **Will the thing underneath change?** Abstract over the volatile, expose the
   stable. A good abstraction is a shock absorber, not a blindfold.
3. **Can I see through it when I need to?** The best abstractions are one
   keystroke from their internals. Leaky is fine; opaque is dangerous.

## Abstractions that age well

The abstractions that survive decades — files, sockets, SQL, the relational
model — share a trait: they abstract over something that genuinely doesn't
change. A file is a sequence of bytes with a name. That was true in 1970 and
it's true now.

The ones that rot are the ones that abstract over fashion. Framework-of-the-year
wrappers, clever DSLs that encode this quarter's business rules, "platforms" that
assume today's org chart. They feel like leverage and turn into liability.

So the discipline isn't *fewer* abstractions. It's abstracting over the parts of
reality that hold still — and staying honest about which parts those are.
