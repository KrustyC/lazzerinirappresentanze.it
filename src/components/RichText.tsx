import { PortableText, type PortableTextComponents } from "next-sanity";

import type { RichTextValue } from "@/content/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  },
};

interface RichTextProps {
  value: RichTextValue | never[];
}

export const RichText: React.FC<RichTextProps> = ({ value }) => (
  <PortableText value={value} components={components} />
);
