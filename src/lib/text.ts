/** The first `n` sentences of `text` (split on ". " before a capital letter). */
export function firstSentences(text: string, n: number): string {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .slice(0, n)
    .join(" ");
}
