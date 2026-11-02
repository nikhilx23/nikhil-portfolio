/** Split without rewriting the source copy, including punctuation and spacing. */
export function splitNumbers(text: string): { text: string; numeric: boolean }[] {
  const pattern = /\$?\d[\d,]*(?:\.\d+)?(?:[\u2013-]\d[\d,]*)?%?/g;
  const parts: { text: string; numeric: boolean }[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index;
    if (index > cursor) parts.push({ text: text.slice(cursor, index), numeric: false });
    parts.push({ text: match[0], numeric: true });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), numeric: false });
  return parts;
}
