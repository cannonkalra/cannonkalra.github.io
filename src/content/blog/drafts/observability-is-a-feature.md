---
title: "Observability Is a Feature, Not a Dashboard"
description: "Buying a monitoring tool doesn't make a system observable. Observability is a property you design into the data, one well-chosen field at a time."
date: 2026-04-14
tags: ["reliability", "engineering", "data-platforms"]
author: cannon
---

There's a comfortable lie in a lot of engineering orgs: that observability is
something you *purchase*. Install the agent, wire up the dashboard, and now you
can see. But a dashboard over bad data is just a prettier way to be confused.
Observability is a property of the system, and like every other property, you
have to design it in.

## The question test

A system is observable to the degree that you can answer questions about its
internal state from its outputs — **without shipping new code**. The test is
simple: when something breaks, how many questions can you answer with the data
you already emit?

- *Which tenant is affected?* — Do your logs carry `tenant_id`?
- *When did it start?* — Are your timestamps event-time or processing-time?
- *Is it getting worse?* — Do you emit rates, or just counts?

If answering requires a new deploy, you weren't observable. You were hopeful.

## Structure beats volume

The instinct is to log more. The discipline is to log *structured*. A million
lines of free-text logs are searchable in theory and useless in practice. A
thousand well-keyed events — every one carrying the same tenant, trace, and
version fields — turn incident response from archaeology into a query.

Three fields earn their place on nearly every event I emit:

1. **A correlation ID** that follows a request across every hop.
2. **The code version** that produced the event.
3. **Event-time**, distinct from when you happened to process it.

With those three, most incidents become a `GROUP BY` away from an answer.

## Design it in, don't bolt it on

The cheapest time to add an observability field is before the data exists. The
most expensive is during an outage, when you realize the one field you need was
never captured. Treat observability like any other feature: it has requirements,
it has a design, and it ships with the thing it observes — not after.
