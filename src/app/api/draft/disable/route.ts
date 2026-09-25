import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
}
