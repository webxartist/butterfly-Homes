import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await requireAdmin();

    const { resourceType = "image" } = await request.json();

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "butterfly-homes/properties";

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    return NextResponse.json({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      timestamp,
      signature,
      folder,
      resourceType,
    });
  } catch (e) {
    console.error("Cloudinary signature error:", e);

    return NextResponse.json(
      {
        error:
          e.status === 401
            ? "Unauthorized"
            : e.message || "Could not create upload signature.",
      },
      {
        status: e.status || 500,
      },
    );
  }
}
