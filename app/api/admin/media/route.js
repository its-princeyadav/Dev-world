import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/apiHelpers";
import Media from "@/models/Media";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const items = await Media.find().sort("-createdAt").lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filename = `${Date.now()}-${safeName}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  await connectDB();
  const item = await Media.create({
    filename,
    url: `/uploads/${filename}`,
    mimetype: file.type,
    size: file.size,
    uploadedBy: admin.sub,
  });

  return NextResponse.json({ item }, { status: 201 });
}
