import { describe, expect, it } from "vitest";

import { paragraphs } from "../portableText";

describe("paragraphs", () => {
  it("turns each string into a block with stable keys", () => {
    const [first, second] = paragraphs("intro", "Uno", "Due");
    expect(first._key).toBe("intro-0");
    expect(second._key).toBe("intro-1");
    expect(first.children?.[0]).toMatchObject({ text: "Uno", marks: [] });
  });

  it("understands the three marks the old markdown used", () => {
    const [block] = paragraphs("p", "a ***both*** b **strong** c *em*");
    expect(block.children?.map(({ text, marks }) => [text, marks])).toEqual([
      ["a ", []],
      ["both", ["strong", "em"]],
      [" b ", []],
      ["strong", ["strong"]],
      [" c ", []],
      ["em", ["em"]],
    ]);
  });
});
