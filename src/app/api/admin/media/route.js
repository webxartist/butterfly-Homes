import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
  "application/pdf",
]);

function getResourceType(fileType) {
  if (fileType.startsWith("video/")) return "video";
  if (fileType === "application/pdf") return "raw";
  return "image";
}

export async function POST(request) {
  try {
    await requireAdmin();

    const form = await request.formData();

    const files = form
      .getAll("files")
      .filter((x) => x && typeof x.arrayBuffer === "function");

    if (!files.length) {
      return NextResponse.json(
        { error: "No files selected." },
        { status: 400 },
      );
    }

    const uploaded = [];

    for (const file of files) {
      if (!allowed.has(file.type)) continue;

      if (file.size > 50 * 1024 * 1024) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const resourceType = getResourceType(file.type);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "butterfly-homes/properties",
            resource_type: resourceType,
            use_filename: false,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        uploadStream.end(buffer);
      });

      uploaded.push({
        url: result.secure_url,
        publicId: result.public_id,
        type: file.type.startsWith("video/")
          ? "video"
          : file.type === "application/pdf"
            ? "brochure"
            : "image",
        title: file.name,
      });
    }

    if (!uploaded.length) {
      return NextResponse.json(
        {
          error:
            "No supported files were uploaded. Images/videos up to 50MB each are supported.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      items: uploaded,
    });
  } catch (e) {
    console.error("Cloudinary upload error:", e);

    return NextResponse.json(
      {
        error:
          e.status === 401 ? "Unauthorized" : e.message || "Upload failed.",
      },
      { status: e.status || 500 },
    );
  }
}
