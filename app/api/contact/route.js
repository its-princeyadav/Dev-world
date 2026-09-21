import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export async function POST(request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  await connectDB();
  await ContactSubmission.create({
    name,
    email,
    phone: body.phone,
    company: body.company,
    service: body.service,
    message,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
