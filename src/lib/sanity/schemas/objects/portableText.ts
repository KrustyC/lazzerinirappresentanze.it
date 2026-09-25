import { defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Testo",
  type: "array",
  of: [{ type: "block" }],
});
