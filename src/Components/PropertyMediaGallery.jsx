"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X, Maximize2 } from "lucide-react";
export default function PropertyMediaGallery({ property }) {
  const media =
    (property.media?.length
      ? property.media
      : property.images?.map((url) => ({ url, type: "image" }))) || [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  if (!media.length)
    return (
      <div className="grid min-h-[480px] place-items-center rounded-3xl bg-slate-100 text-slate-400">
        Property media coming soon
      </div>
    );
  const item = media[active];
  const imageItems = media.filter((x) => x.type === "image" || !x.type);
  const go = (d) => setActive((active + d + media.length) % media.length);
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-xl">
        <div className="relative aspect-[16/10] w-full">
          {item.type === "video" ? (
            <video
              src={item.url}
              controls
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              src={item.url}
              alt={item.alt || `${property.title} property photo ${active + 1}`}
              fill
              unoptimized
              priority={active === 0}
              className="object-cover"
            />
          )}
        </div>
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => setLightbox(true)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur"
        >
          <Maximize2 size={17} />
        </button>
        <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {active + 1} / {media.length}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
        {media.slice(0, 18).map((m, i) => (
          <button
            key={`${m.url}-${i}`}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-xl ${i === active ? "ring-2 ring-indigo-600 ring-offset-2" : "opacity-75 hover:opacity-100"}`}
          >
            {m.type === "video" ? (
              <>
                <video
                  src={m.url}
                  muted
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 grid place-items-center text-white">
                  <Play fill="currentColor" size={18} />
                </span>
              </>
            ) : (
              <Image
                src={m.url}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-5 top-5 text-white"
            onClick={() => setLightbox(false)}
          >
            <X size={28} />
          </button>
          <div
            className="relative h-[85vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={item.url}
                alt={item.alt || property.title}
                fill
                unoptimized
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
