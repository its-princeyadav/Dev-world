import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  await connectDB();
  try {
    await NewsletterSubscriber.create({ email });
  } catch (err) {
    if (err.code !== 11000) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
    // Already subscribed — treat as success.
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
