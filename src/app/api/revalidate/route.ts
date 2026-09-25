import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { env } from "@/lib/env";
import {
  documentTypeTag,
  isRevalidatedDocumentType,
} from "@/lib/sanity/revalidation/tags";

/** The webhook's projection is only these two fields. */
const payloadSchema = z.object({
  _type: z.string().min(1),
  _id: z.string().min(1),
});

/**
 * Where the Sanity publish webhook lands. Revalidates every `use cache`
 * entry tagged with the published document's type, so the site refreshes on
 * publish with nobody watching it — Sanity Live only reaches tabs that are
 * open at that moment. Setup: `docs/runbooks/sanity.md`.
 */
export async function POST(req: NextRequest): Promise<Response> {
  const secret = env.SANITY_WEBHOOK_SECRET;
  if (!secret) return fail("not_configured", 503);

  let parsed: Awaited<ReturnType<typeof parseBody<unknown>>>;
  try {
    // Waits out the Content Lake's eventual consistency, so the revalidation
    // does not re-read the old document from the CDN.
    parsed = await parseBody<unknown>(req, secret, true);
  } catch {
    return fail("invalid_body", 400);
  }

  if (parsed.isValidSignature !== true) return fail("invalid_signature", 401);

  const payload = payloadSchema.safeParse(parsed.body);
  if (!payload.success) return fail("invalid_body", 400);

  // A type no public page reads is not an error: Sanity would keep retrying.
  const { _type } = payload.data;
  if (!isRevalidatedDocumentType(_type)) {
    return Response.json({ revalidated: [] });
  }

  const tag = documentTypeTag(_type);
  revalidateTag(tag, "max");
  return Response.json({ revalidated: [tag] });
}

function fail(code: string, status: number): Response {
  return Response.json({ error: code }, { status });
}
