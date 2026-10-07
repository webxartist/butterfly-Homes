import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request) {
  try {
    const { question, property } = await request.json();
    if (!question?.trim()) return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "AI assistant is not configured yet. Add OPENAI_API_KEY to the server environment." }, { status: 503 });
    const context = JSON.stringify({ title: property?.title, type: property?.type, purpose: property?.purpose, location: property?.location, city: property?.city, priceLabel: property?.priceLabel, area: property?.area, areaUnit: property?.areaUnit, bedrooms: property?.bedrooms, bathrooms: property?.bathrooms, amenities: property?.amenities, highlights: property?.highlights, nearby: property?.nearby, description: property?.description });
    const r = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-5-mini", input: `You are Butterfly Homes' multilingual property advisor. Answer the user's question using ONLY the supplied property data. Never invent price, availability, legal status, amenities or distance. If the answer is not in the data, say so and offer to connect the user with an advisor. Reply in the same language as the user. Be concise, useful and conversion-friendly.\nPROPERTY DATA: ${context}\nUSER QUESTION: ${question}` }) });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data?.error?.message || "AI request failed." }, { status: 502 });
    const answer = data.output_text || data.output?.flatMap(x => x.content || []).map(x => x.text).filter(Boolean).join(" ") || "I could not generate an answer.";
    return NextResponse.json({ answer });
  } catch { return NextResponse.json({ error: "AI assistant is temporarily unavailable." }, { status: 500 }); }
}
