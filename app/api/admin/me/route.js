import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiHelpers";

export async function GET(request) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ session });
}
