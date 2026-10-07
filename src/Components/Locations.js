"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";

import { locations } from "@/data/locations";

export default function Locations() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        md:py-32
      "
    >
      <div className="container-butterfly">
        {/* ================================================
            SECTION HEADER
        ================================================= */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[1fr_auto]
            lg:items-end
          "
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-r
                  from-[#66D4C8]
                  to-[#7A4CC2]
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#3C4592]
                "
              >
                Explore Locations
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-5
                font-display
                text-5xl
                leading-[0.98]
                tracking-[-0.04em]
                text-[#151A3A]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Find your place
              <br />
              <span className="gradient-text">in the right location.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              max-w-sm
              text-sm
              leading-7
              text-[#687086]
            "
          >
            Explore carefully selected residential destinations across some of
            Maharashtra&apos;s most connected and developing locations.
          </motion.p>
        </div>

        {/* ================================================
            LOCATION EXPERIENCE
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-10
          "
        >
          {/* ==============================================
              LOCATION LIST
          =============================================== */}

          <div
            className="
              rounded-[32px]
              border
              border-[#151A3A]/8
              bg-[#F8FAFC]
              p-3
              md:p-4
            "
          >
            {locations.map((location, index) => {
              const isActive = activeLocation.id === location.id;

              return (
                <motion.button
                  key={location.id}
                  type="button"
                  onClick={() => setActiveLocation(location)}
                  whileHover={{
                    x: isActive ? 0 : 5,
                  }}
                  className={`
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-[24px]
                    px-5
                    py-5
                    text-left
                    transition-all
                    duration-300
                    md:px-6
                    md:py-6
                    ${
                      isActive
                        ? "bg-white shadow-lg shadow-[#151A3A]/6"
                        : "hover:bg-white/70"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "bg-[#151A3A] text-white"
                            : "bg-white text-[#687086]"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className={`
                          text-lg
                          font-semibold
                          transition-colors
                          duration-300
                          ${isActive ? "text-[#151A3A]" : "text-[#687086]"}
                        `}
                      >
                        {location.name}
                      </h3>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          text-[#687086]/70
                        "
                      >
                        {location.projects}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      rotate: isActive ? 45 : 0,
                    }}
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-[#66D4C8] text-[#151A3A]"
                          : "bg-[#151A3A]/5 text-[#687086]"
                      }
                    `}
                  >
                    <ArrowUpRight size={16} />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* ==============================================
              FEATURED LOCATION
          =============================================== */}

          <div
            className="
              relative
              min-h-[520px]
              overflow-hidden
              rounded-[32px]
              bg-[#E9EDF5]
              md:min-h-[600px]
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{
                  opacity: 0,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeLocation.image}
                  alt={`${activeLocation.name}, ${activeLocation.region}`}
                  fill
                  sizes="
                    (max-width: 1024px) 100vw,
                    65vw
                  "
                  className="object-cover"
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0D1026]/85
                    via-[#0D1026]/15
                    to-transparent
                  "
                />
              </motion.div>
            </AnimatePresence>

            {/* Location label */}

            <div
              className="
                absolute
                left-6
                top-6
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-xs
                font-medium
                text-white
                backdrop-blur-md
                md:left-8
                md:top-8
              "
            >
              <MapPin size={14} />

              {activeLocation.region}
            </div>

            {/* Bottom content */}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  md:bottom-8
                  md:left-8
                  md:right-8
                "
              >
                <p
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-white/60
                  "
                >
                  Discover
                </p>

                <h3
                  className="
                    mt-2
                    font-display
                    text-4xl
                    tracking-[-0.03em]
                    text-white
                    md:text-5xl
                  "
                >
                  {activeLocation.name}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-7
                    text-white/70
                    md:text-base
                  "
                >
                  {activeLocation.description}
                </p>

                <Link
                  href={`/locations/${activeLocation.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="
                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#151A3A]
                    transition-all
                    duration-300
                    hover:bg-[#66D4C8]
                  "
                >
                  Explore Location
                  <ArrowUpRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
