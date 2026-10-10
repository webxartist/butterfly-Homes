"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function PropertyCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
      }}
      className="group"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="relative h-[500px] overflow-hidden rounded-[32px] bg-[#EDEFF5] md:h-[560px]">
          {/* Property image */}
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1026]/90 via-[#0D1026]/10 to-transparent" />

          {/* Top label */}
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

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between gap-5">
              <div>
                <h3 className="font-display text-3xl text-white md:text-4xl">
                  {project.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
                  <MapPin size={15} />
                  {project.location}
                </div>

                <p className="mt-2 text-sm text-white/65">{project.type}</p>
              </div>

              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Starting
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {project.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
