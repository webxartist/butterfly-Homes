import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { requireAdmin } from "@/lib/admin-auth";
export const runtime = "nodejs";
export async function GET() { try { await requireAdmin(); await connectDB(); const items = await BlogPost.find({}).sort({ updatedAt: -1 }).lean(); return NextResponse.json({ items }); } catch(e) { return NextResponse.json({ error: e.status === 401 ? "Unauthorized" : "Could not load blog posts." }, { status: e.status || 500 }); } }
export async function POST(request) { try { await requireAdmin(); await connectDB(); const data = await request.json(); if (!data.title?.trim() || !data.content?.trim()) return NextResponse.json({ error: "Title and article content are required." }, { status: 400 }); const base = (data.slug || data.title).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || `article-${Date.now()}`; let slug=base, n=2; while(await BlogPost.exists({slug})) slug=`${base}-${n++}`; const item=await BlogPost.create({...data, slug, publishedAt:data.status === "Published" ? (data.publishedAt || new Date()) : null}); return NextResponse.json({item},{status:201}); } catch(e) { return NextResponse.json({error:e.status===401?"Unauthorized":e.message||"Could not create article."},{status:e.status||500}); } }
