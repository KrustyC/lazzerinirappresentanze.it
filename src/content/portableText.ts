import type { RichTextValue } from "./types";

const INLINE_MARK = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/;

function marksFor(token: string): { text: string; marks: string[] } {
  if (token.startsWith("***")) {
    return { text: token.slice(3, -3), marks: ["strong", "em"] };
  }
  if (token.startsWith("**")) {
    return { text: token.slice(2, -2), marks: ["strong"] };
  }
  if (token.startsWith("*")) {
    return { text: token.slice(1, -1), marks: ["em"] };
  }
  return { text: token, marks: [] };
}

/**
 * Plain paragraphs to Portable Text, understanding only `*em*`, `**strong**`
 * and `***both***` — the three marks the old markdown copy used.
 *
 * Keys are derived from `prefix` rather than random so the seed script can
 * `createOrReplace` the same documents repeatedly without churning every key.
 */
export function paragraphs(prefix: string, ...texts: string[]): RichTextValue {
  return texts.map((text, blockIndex) => ({
    _type: "block" as const,
    _key: `${prefix}-${blockIndex}`,
    style: "normal",
    markDefs: [],
    children: text
      .split(INLINE_MARK)
      .filter(Boolean)
      .map((token, spanIndex) => ({
        _type: "span" as const,
        _key: `${prefix}-${blockIndex}-${spanIndex}`,
        ...marksFor(token),
      })),
  }));
}
