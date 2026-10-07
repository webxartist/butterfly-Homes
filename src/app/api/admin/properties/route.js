import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export async function GET() {
  try { await requireAdmin(); await connectDB(); const items = await Property.find({}).sort({ updatedAt: -1 }).lean(); return NextResponse.json({ items }); }
  catch (e) { return NextResponse.json({ error: e.status === 401 ? "Unauthorized" : "Could not load properties." }, { status: e.status || 500 }); }
}
export async function POST(request) {
  try {
    await requireAdmin(); await connectDB(); const data = await request.json();
    if (!data.title?.trim() || !data.location?.trim()) return NextResponse.json({ error: "Title and location are required." }, { status: 400 });
    const base = (data.slug || data.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let slug = base || `property-${Date.now()}`; let n = 2;
    while (await Property.exists({ slug })) slug = `${base}-${n++}`;
    const item = await Property.create({ ...data, slug, images: Array.isArray(data.images) ? data.images : [], amenities: Array.isArray(data.amenities) ? data.amenities : [] });
    return NextResponse.json({ item }, { status: 201 });
  } catch (e) { return NextResponse.json({ error: e.status === 401 ? "Unauthorized" : e.code === 11000 ? "Slug already exists." : e.message || "Could not create property." }, { status: e.status || 500 }); }
}
