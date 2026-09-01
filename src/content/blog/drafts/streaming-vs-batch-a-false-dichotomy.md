---
title: "Streaming vs. Batch: A False Dichotomy"
description: "Kappa, Lambda, and the architectures in between. Why the interesting question isn't streaming or batch, but where you put the boundary."
date: 2026-06-30
tags: ["data-platforms", "streaming", "architecture"]
series: Data Platforms in Practice
part: 2
author: cannon
---

The streaming-versus-batch debate has the shape of a religious war, and like most
religious wars, both sides are arguing about the wrong thing. The real question
is not *which paradigm* but *where you draw the boundary* between fast, wrong-ish
data and slow, correct data.

## The two classic answers

**Lambda architecture** runs a batch layer and a speed layer in parallel, then
merges them at query time. It's correct and it's a maintenance burden — you write
your business logic twice, in two engines, and pray they agree.

**Kappa architecture** says: just use the stream. Reprocess history by replaying
the log. Elegant, until you need a five-year backfill and your retention is
thirty days.

## What we actually built

We landed on something closer to Kappa with an escape hatch:

- A single streaming pipeline handles the live path.
- The same transformation code runs as a batch job for backfills, reading from
  archived log segments rather than the live topic.
- Correctness reconciliation happens in the lakehouse, not at query time.

The key insight: **the transformation logic is shared; only the source differs.**
One codebase, two entry points. Lambda's correctness without Lambda's duplication.

## Where it bit us

Exactly-once semantics are a property of the *whole pipeline*, not any single
component. We had idempotent writers and still saw duplicates — because a
retried batch backfill overlapped a live window. The fix was boring and
essential: a deterministic dedup key derived from source offsets, enforced at
the Iceberg merge.

The lesson generalizes. Most "streaming bugs" are really **boundary bugs** —
they live at the seam between your fast path and your slow path. Design the seam
deliberately and most of the pain disappears.

That deliberate seam is the subject of the next post: idempotency as a
first-class design constraint.
