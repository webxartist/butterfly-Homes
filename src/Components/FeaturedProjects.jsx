"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import PropertyCard from "./PropertyCard";
import { projects } from "@/data/project";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#7A4CC2]/5 blur-[120px]" />

      <div className="container-butterfly relative z-10">
        {/* Section heading */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-[#66D4C8] to-[#7A4CC2]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3C4592]">
                Our Properties
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl leading-[1] tracking-[-0.035em] text-[#151A3A] md:text-6xl lg:text-7xl"
            >
              Spaces designed
              <br />
              <span className="gradient-text">for living.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full border border-[#151A3A]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#151A3A] transition-all duration-300 hover:border-[#3C4592]/30 hover:text-[#3C4592]"
            >
              View all projects
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.slice(0, 2).map((project, index) => (
            <PropertyCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Third project */}
        {featuredProjects[2] && (
          <div className="mt-6 md:ml-[16%] md:w-[68%]">
            <PropertyCard project={featuredProjects[2]} index={2} />
          </div>
        )}
      </div>
    </section>
  );
}
