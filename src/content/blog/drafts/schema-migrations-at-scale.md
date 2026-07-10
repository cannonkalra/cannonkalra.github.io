---
title: "Schema Migrations at Scale (Draft)"
description: "A working draft on evolving schemas across billions of rows without downtime. Not yet published."
date: 2026-07-11
draft: true
tags: ["data-platforms", "databases"]
author: cannon
---

This one is still in the oven. It will cover expand/contract migrations,
dual-writes, and how to backfill a new column across a billion rows without
locking the table or blowing your compute budget.

Drafts are visible in `dev` and hidden from production builds, the sitemap, and
the RSS feed.
