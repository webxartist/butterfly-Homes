"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const principles = [
  {
    number: "01",
    title: "Thoughtful Design",
    text: "Spaces designed around natural light, comfort, functionality and the details that make everyday living feel better.",
  },
  {
    number: "02",
    title: "Connected Locations",
    text: "Homes selected with connectivity, infrastructure, convenience and the character of the surrounding neighbourhood in mind.",
  },
  {
    number: "03",
    title: "Quality First",
    text: "A considered approach to materials, finishes and residential experiences, with attention to the details that matter.",
  },
  {
    number: "04",
    title: "Built Around You",
    text: "From discovering a property to finding the right home, every experience is designed to feel personal and straightforward.",
  },
];

export default function WhyButterflyHomes() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const imageRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#F9FBFD]
        py-24
        md:py-32
        lg:py-40
      "
    >
      <div className="container-butterfly">
        {/* ==================================================
            INTRO
        ================================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-20
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
              duration: 0.8,
            }}
          >
            <div className="flex items-center gap-3">
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
                Why Butterfly Homes
              </span>
            </div>

            <p
              className="
                mt-6
                max-w-sm
                text-sm
                leading-7
                text-[#687086]
              "
            >
              A different way of looking at what makes a home truly feel like
              yours.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2
              className="
                max-w-5xl
                font-display
                text-4xl
                leading-[1.05]
                tracking-[-0.04em]
                text-[#151A3A]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              We don&apos;t just look at
              <span className="gradient-text"> what a property is.</span> We
              look at what life can become there.
            </h2>
          </motion.div>
        </div>

        {/* ==================================================
            FEATURE IMAGE + STATEMENT
        ================================================== */}

        <div
          className="
            mt-16
            grid
            gap-8
            lg:mt-24
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
            lg:gap-16
          "
        >
          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              h-[480px]
              overflow-hidden
              rounded-[32px]
              bg-[#E9EDF5]
              sm:h-[560px]
              lg:h-[650px]
            "
          >
            <motion.div
              style={{
                y: imageY,
                rotate: imageRotate,
              }}
              className="
                absolute
                inset-[-7%]
              "
            >
              <Image
                src="/images/hero/hero-home.jpg"
                alt="Butterfly Homes architectural residence"
                fill
                sizes="
                  (max-width: 1024px) 100vw,
                  60vw
                "
                className="object-cover"
              />
            </motion.div>

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#151A3A]/70
                via-transparent
                to-transparent
              "
            />

            {/* Floating label */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-6
                left-6
                rounded-full
                border
                border-white/20
                bg-white/15
                px-5
                py-3
                text-xs
                font-medium
                text-white
                backdrop-blur-md
                md:bottom-8
                md:left-8
              "
            >
              Designed for living
            </motion.div>
          </motion.div>

          {/* Statement */}

          <div>
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <span
                className="
                  text-5xl
                  font-light
                  tracking-[-0.05em]
                  text-[#66D4C8]
                  md:text-6xl
                "
              >
                01
              </span>

              <h3
                className="
                  mt-4
                  font-display
                  text-4xl
                  leading-tight
                  tracking-[-0.035em]
                  text-[#151A3A]
                  md:text-5xl
                "
              >
                Every detail has a reason.
              </h3>

              <p
                className="
                  mt-5
                  max-w-lg
                  text-base
                  leading-8
                  text-[#687086]
                "
              >
                The right home is a balance of design, location, comfort and the
                little details that become part of your everyday life.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="mt-9"
            >
              <a
                href="/about"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  text-sm
                  font-semibold
                  text-[#151A3A]
                "
              >
                Learn more about Butterfly Homes
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#151A3A]
                    text-white
                    transition-all
                    duration-300
                    group-hover:bg-[#3C4592]
                    group-hover:translate-x-1
                  "
                >
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ==================================================
            PRINCIPLES
        ================================================== */}

        <div className="mt-24 md:mt-32">
          <div
            className="
              border-t
              border-[#151A3A]/10
            "
          >
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="
                  grid
                  gap-5
                  border-b
                  border-[#151A3A]/10
                  py-8
                  md:grid-cols-[100px_0.8fr_1.2fr]
                  md:items-center
                  md:gap-10
                  md:py-10
                "
              >
                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#66D4C8]
                  "
                >
                  {principle.number}
                </span>

                <h3
                  className="
                    text-xl
                    font-semibold
                    tracking-tight
                    text-[#151A3A]
                    md:text-2xl
                  "
                >
                  {principle.title}
                </h3>

                <p
                  className="
                    max-w-xl
                    text-sm
                    leading-7
                    text-[#687086]
                    md:text-base
                  "
                >
                  {principle.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
