/** Formats an ISO date for display: "short" → "Aug 12, 2026", "long" → "August 12, 2026". */
export function formatDate(date, style = "long") {
  return new Date(date).toLocaleDateString("en-US", {
    month: style,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
