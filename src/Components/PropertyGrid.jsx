import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize2, ArrowUpRight } from "lucide-react";

export function PropertyGrid({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="text-xl font-semibold text-slate-800">
          New listings are coming soon
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Please contact our team and we’ll help you find a suitable property.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex rounded-full bg-[#151a3a] px-5 py-3 text-sm font-semibold text-white"
        >
          Speak to our team
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => {
        // Prefer uploaded property media, then legacy image URLs.
        const mediaImage = p.media?.find(
          (m) =>
            m?.type === "image" && typeof m.url === "string" && m.url.trim(),
        )?.url;

        const legacyImage = p.images?.find(
          (url) => typeof url === "string" && url.trim(),
        );

        const image = mediaImage || legacyImage || "/project1.jpg";

        return (
          <article
            key={p._id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/properties/${p.slug}`} className="block">
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={p.title || "Property"}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#151a3a]">
                  {p.purpose}
                </span>

                {p.featured && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#151a3a] px-3 py-1.5 text-xs font-semibold text-white">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 text-lg font-semibold text-[#151a3a]">
                    {p.title}
                  </h2>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-indigo-700"
                  />
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={15} />
                  {p.location}
                  {p.city ? `, ${p.city}` : ""}
                </p>

                <p className="mt-4 text-xl font-semibold text-[#3c4592]">
                  {p.priceLabel ||
                    (p.price
                      ? `₹${Number(p.price).toLocaleString("en-IN")}`
                      : "Price on request")}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  {p.bedrooms > 0 && (
                    <span className="flex items-center gap-1">
                      <BedDouble size={15} />
                      {p.bedrooms} Beds
                    </span>
                  )}

                  {p.bathrooms > 0 && (
                    <span className="flex items-center gap-1">
                      <Bath size={15} />
                      {p.bathrooms} Baths
                    </span>
                  )}

                  {p.area > 0 && (
                    <span className="flex items-center gap-1">
                      <Maximize2 size={14} />
                      {p.area} {p.areaUnit || "sq.ft"}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
