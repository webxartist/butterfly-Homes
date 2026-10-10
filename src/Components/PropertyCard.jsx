"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function PropertyCard({ project, index = 0 }) {
  // Get the image belonging to this property
  const coverImage =
    project?.coverImage ||
    project?.media?.find((item) => item?.type === "image")?.url ||
    project?.images?.[0]?.url ||
    project?.images?.[0] ||
    project?.image ||
    "";

  const propertyName = project?.title || project?.name || "Property";

  const propertyId = project?.id || project?._id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      className="group"
    >
      <Link
        href={propertyId ? `/projects/${propertyId}` : "/projects"}
        className="block"
      >
        <div className="relative h-[500px] overflow-hidden rounded-[32px] bg-[#EDEFF5] md:h-[560px]">
          {/* Actual property cover image */}
          {coverImage ? (
            <Image
              key={`${propertyId}-${coverImage}`}
              src={coverImage}
              alt={`${propertyName} property`}
              fill
              unoptimized
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm text-slate-500">
              No image uploaded for this property
            </div>
          )}

          {/* Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1026]/90 via-[#0D1026]/10 to-transparent" />

          {/* Label */}
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              Featured Project
            </span>
          </div>

          {/* Arrow */}
          <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#151A3A] transition-all duration-300 group-hover:bg-[#3C4592] group-hover:text-white">
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>

          {/* Details */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between gap-5">
              <div className="min-w-0">
                <h3 className="font-display text-3xl text-white md:text-4xl">
                  {propertyName}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
                  <MapPin size={15} className="shrink-0" />
                  <span>{project?.location || "Location not specified"}</span>
                </div>

                <p className="mt-2 text-sm text-white/65">
                  {project?.type || "Property"}
                </p>
              </div>

              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Starting
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {project?.price || "Price on request"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
