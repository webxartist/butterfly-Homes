"use client";

import { useState } from "react";
import { ImagePlus, Trash2, Video, FileText, Upload } from "lucide-react";

export default function PropertyMediaManager({ value = [], onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  async function getSignature(resourceType) {
    const response = await fetch("/api/admin/media/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not prepare upload.");
    }

    return data;
  }

  async function uploadToCloudinary(file, config) {
    const resourceType = file.type.startsWith("video/")
      ? "video"
      : file.type === "application/pdf"
        ? "raw"
        : "image";

    const uploadUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", config.apiKey);
    formData.append("timestamp", String(config.timestamp));
    formData.append("signature", config.signature);
    formData.append("folder", config.folder);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", uploadUrl);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);

          setProgress(`${file.name} — ${percent}%`);
        }
      });

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(data);
          } else {
            reject(
              new Error(
                data.error?.message ||
                  data.error ||
                  "Cloudinary upload failed.",
              ),
            );
          }
        } catch {
          reject(new Error("Cloudinary returned an invalid response."));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error while uploading the file."));
      };

      xhr.send(formData);
    });
  }

  async function upload(e) {
    const files = [...e.target.files];

    if (!files.length) return;

    setBusy(true);
    setError("");
    setProgress("");

    try {
      const uploadedItems = [];

      for (const file of files) {
        if (file.size > 500 * 1024 * 1024) {
          throw new Error(`${file.name} is larger than 500MB.`);
        }

        const resourceType = file.type.startsWith("video/")
          ? "video"
          : file.type === "application/pdf"
            ? "raw"
            : "image";

        setProgress(`Preparing ${file.name}...`);

        const config = await getSignature(resourceType);

        const result = await uploadToCloudinary(file, config);

        uploadedItems.push({
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

      onChange([...(value || []), ...uploadedItems]);

      setProgress(
        `${uploadedItems.length} file${
          uploadedItems.length > 1 ? "s" : ""
        } uploaded successfully.`,
      );
    } catch (e) {
      console.error("Media upload error:", e);
      setError(e.message || "Upload failed.");
      setProgress("");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function remove(i) {
    onChange((value || []).filter((_, n) => n !== i));
  }

  return (
    <div className="space-y-3">
      <label
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-sm font-semibold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 ${
          busy ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm,application/pdf"
          className="hidden"
          onChange={upload}
          disabled={busy}
        />

        {busy ? (
          <span>Uploading…</span>
        ) : (
          <>
            <Upload size={18} />
            Upload property media
          </>
        )}
      </label>

      <p className="text-xs text-slate-400">
        Images, MP4/WebM videos and PDF brochures. Videos are uploaded directly
        to Cloudinary, so large videos do not pass through Vercel.
      </p>

      {progress && (
        <p className="text-xs font-medium text-indigo-600">{progress}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {(value || []).map((m, i) => (
          <div
            key={`${m.url}-${i}`}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="aspect-video bg-slate-100">
              {m.type === "video" ? (
                <video
                  src={m.url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : m.type === "brochure" ? (
                <div className="grid h-full place-items-center">
                  <FileText />
                </div>
              ) : (
                <img
                  src={m.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-2 p-2 text-[11px]">
              <span className="truncate">{m.title || m.type}</span>

              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {m.type === "video" && (
              <Video
                size={14}
                className="absolute left-2 top-2 text-white drop-shadow"
              />
            )}

            {m.type === "image" && (
              <ImagePlus
                size={14}
                className="absolute left-2 top-2 text-white drop-shadow"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
