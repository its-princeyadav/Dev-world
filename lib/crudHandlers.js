import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/apiHelpers";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Generic admin-protected CRUD handlers for a Mongoose model, shared across
// every /api/admin/<resource> route so each resource file stays a thin
// wrapper instead of re-implementing the same auth + try/catch boilerplate.
export function createCollectionHandlers(Model, { sort = "-createdAt" } = {}) {
  async function GET(request) {
    const admin = await requireAdmin(request);
    if (!admin) return unauthorized();
    await connectDB();
    const items = await Model.find().sort(sort).lean();
    return NextResponse.json({ items });
  }

  async function POST(request) {
    const admin = await requireAdmin(request);
    if (!admin) return unauthorized();
    await connectDB();
    const body = await request.json();
    try {
      const item = await Model.create(body);
      return NextResponse.json({ item }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  return { GET, POST };
}

export function createItemHandlers(Model) {
  async function GET(request, { params }) {
    const admin = await requireAdmin(request);
    if (!admin) return unauthorized();
    await connectDB();
    const { id } = await params;
    const item = await Model.findById(id).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item });
  }

  async function PATCH(request, { params }) {
    const admin = await requireAdmin(request);
    if (!admin) return unauthorized();
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    try {
      const item = await Model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ item });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  async function DELETE(request, { params }) {
    const admin = await requireAdmin(request);
    if (!admin) return unauthorized();
    await connectDB();
    const { id } = await params;
    const item = await Model.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  return { GET, PATCH, DELETE };
}
