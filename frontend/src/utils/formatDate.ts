export function formatDateString(dateString: string): string {
  if (dateString == "TBD") {
    return "TBD";
  }

  const [y, m, d] = dateString.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}