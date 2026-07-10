/** Human date, e.g. "July 11, 2026". Stable across locales for SSG. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Compact date for tight UI, e.g. "Jul 2026". */
export function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/** ISO date for <time datetime> and structured data. */
export function isoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
