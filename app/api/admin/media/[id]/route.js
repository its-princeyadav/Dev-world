import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/apiHelpers";
import Media from "@/models/Media";

export async function DELETE(request, { params }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const item = await Media.findByIdAndDelete(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await unlink(path.join(process.cwd(), "public", "uploads", item.filename));
  } catch {
    // File already gone from disk — the DB record is still removed.
  }

  return NextResponse.json({ ok: true });
}
