import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import { requireAdmin } from "@/lib/admin-auth";
export const runtime = "nodejs";
export async function PUT(request, { params }) {
  try { await requireAdmin(); const { id } = await params; if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid property ID." }, { status: 400 }); await connectDB(); const data = await request.json(); delete data._id; delete data.createdAt; delete data.updatedAt; const item = await Property.findByIdAndUpdate(id, data, { new: true, runValidators: true }); if (!item) return NextResponse.json({ error: "Property not found." }, { status: 404 }); return NextResponse.json({ item }); }
  catch (e) { return NextResponse.json({ error: e.status === 401 ? "Unauthorized" : e.code === 11000 ? "Slug already exists." : e.message || "Update failed." }, { status: e.status || 500 }); }
}
export async function DELETE(_request, { params }) {
  try { await requireAdmin(); const { id } = await params; if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid property ID." }, { status: 400 }); await connectDB(); const item = await Property.findByIdAndDelete(id); if (!item) return NextResponse.json({ error: "Property not found." }, { status: 404 }); return NextResponse.json({ ok: true }); }
  catch (e) { return NextResponse.json({ error: e.status === 401 ? "Unauthorized" : "Delete failed." }, { status: e.status || 500 }); }
}
