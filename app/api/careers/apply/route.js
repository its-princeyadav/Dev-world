import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

export async function POST(request) {
  const body = await request.json();
  const { name, email, role, coverNote } = body;

  if (!name || !email || !role || !coverNote) {
    return NextResponse.json(
      { error: "Name, email, role, and cover note are required" },
      { status: 400 }
    );
  }

  await connectDB();
  await CareerApplication.create({
    name,
    email,
    role,
    linkedin: body.linkedin,
    coverNote,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
