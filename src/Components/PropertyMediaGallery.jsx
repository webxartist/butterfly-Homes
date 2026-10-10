"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X, Maximize2 } from "lucide-react";

function getImageUrl(image) {
  if (typeof image === "string") return image;
  if (image && typeof image === "object") {
    return image.url || image.secure_url || image.src || "";
  }
  return "";
}

function normalizeMedia(property) {
  const galleryMedia = Array.isArray(property?.media) ? property.media : [];

  const propertyImages = Array.isArray(property?.images) ? property.images : [];

  // Prefer the current images array for photos.
  // This prevents old photos in media from overriding newer uploads.
  const currentImages = propertyImages
    .map((image) => {
      const url = getImageUrl(image);

      if (!url) return null;

      return {
        ...(typeof image === "object" ? image : {}),
        url,
        type: "image",
      };
    })
    .filter(Boolean);

  // Preserve videos stored in the media array.
  const videos = galleryMedia
    .filter(
      (item) =>
        item?.type === "video" &&
        typeof item?.url === "string" &&
        item.url.trim(),
    )
    .map((item) => ({
      ...item,
      type: "video",
    }));

  // If images is populated, use those photos plus existing videos.
  // If images is empty, fall back to the complete media array.
  const source =
    currentImages.length > 0
      ? [...currentImages, ...videos]
      : galleryMedia
          .map((item) => {
            const url = getImageUrl(item);

            if (!url) return null;

            return {
              ...item,
              url,
              type: item.type === "video" ? "video" : "image",
            };
          })
          .filter(Boolean);

  // Remove duplicate URLs without changing display order.
  const seen = new Set();

  return source.filter((item) => {
    const key = `${item.type}:${item.url}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export default function PropertyMediaGallery({ property }) {
  const media = useMemo(() => normalizeMedia(property), [property]);

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Keep the selected item valid when photos are replaced or removed.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, media.length - 1)));
  }, [media.length]);

  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(false);

      if (event.key === "ArrowLeft") {
        setActive((current) =>
          media.length ? (current - 1 + media.length) % media.length : 0,
        );
      }

      if (event.key === "ArrowRight") {
        setActive((current) =>
          media.length ? (current + 1) % media.length : 0,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, media.length]);

  if (!media.length) {
    return (
      <div className="grid min-h-[260px] place-items-center rounded-3xl bg-slate-100 px-4 text-center text-slate-400 sm:min-h-[400px]">
        Property media coming soon
      </div>
    );
  }

  const currentIndex = Math.min(active, media.length - 1);
  const item = media[currentIndex];

  const go = (direction) => {
    setActive((currentIndex + direction + media.length) % media.length);
  };

  const renderMedia = (mediaItem, alt, className = "") => {
    if (mediaItem.type === "video") {
      return (
        <video src={mediaItem.url} controls playsInline className={className} />
      );
    }

    return (
      <Image
        key={mediaItem.url}
        src={mediaItem.url}
        alt={alt}
        fill
        unoptimized
        priority={currentIndex === 0}
        sizes="(max-width: 768px) 100vw, 1200px"
        className={className}
      />
    );
  };

  return (
    <>
      {/* Main gallery */}
      <div className="min-w-0 w-full overflow-hidden rounded-2xl bg-slate-950 shadow-xl sm:rounded-3xl">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          {renderMedia(
            item,
            item.alt ||
              `${property.title || "Property"} photo ${currentIndex + 1}`,
            item.type === "video"
              ? "h-full w-full object-contain"
              : "object-cover",
          )}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white sm:left-4 sm:h-11 sm:w-11"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white sm:right-4 sm:h-11 sm:w-11"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="View media fullscreen"
            className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          >
            <Maximize2 size={17} />
          </button>

          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:bottom-4 sm:left-4">
            {currentIndex + 1} / {media.length}
          </div>
        </div>
      </div>

      {/* Thumbnail gallery */}
      {media.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9">
          {media.slice(0, 18).map((mediaItem, index) => (
            <button
              key={`${mediaItem.type}-${mediaItem.url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View media ${index + 1}`}
              aria-pressed={index === currentIndex}
              className={`relative aspect-square min-w-0 overflow-hidden rounded-lg bg-slate-200 transition sm:rounded-xl ${
                index === currentIndex
                  ? "ring-2 ring-indigo-600 ring-offset-2"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              {mediaItem.type === "video" ? (
                <>
                  <video
                    src={mediaItem.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/15 text-white">
                    <Play size={18} fill="currentColor" />
                  </span>
                </>
              ) : (
                <Image
                  src={mediaItem.url}
                  alt={`${property.title || "Property"} thumbnail ${index + 1}`}
                  fill
                  unoptimized
                  sizes="120px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen viewer */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-3 sm:p-6"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close fullscreen viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X size={26} />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous media"
                className="absolute left-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(1);
                }}
                aria-label="Next media"
                className="absolute right-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="relative h-[75vh] w-full max-w-6xl sm:h-[85vh]"
            onClick={(event) => event.stopPropagation()}
          >
            {renderMedia(
              item,
              item.alt || property.title || "Property media",
              item.type === "video"
                ? "h-full w-full object-contain"
                : "object-contain",
            )}
          </div>

          <div className="absolute bottom-4 text-sm text-white/80">
            {currentIndex + 1} of {media.length}
          </div>
        </div>
      )}
    </>
  );
}
