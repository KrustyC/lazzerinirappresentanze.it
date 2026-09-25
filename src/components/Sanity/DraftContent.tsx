import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
} from "@/lib/sanity/live";

export type RenderContent = (options: DynamicFetchOptions) => React.ReactNode;

interface DraftContentProps {
  render: RenderContent;
}

/** Layer 2: the only place the draft-mode cookies are read. */
export const DraftContent = async ({ render }: DraftContentProps) =>
  render(await getDynamicFetchOptions());
