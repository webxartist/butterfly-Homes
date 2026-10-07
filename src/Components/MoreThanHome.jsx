"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function MoreThanHome() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0.7],
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#0D1026]
        py-20
        md:py-28
        lg:py-36
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            y: imageY,
            scale: 1.12,
          }}
          className="absolute inset-[-8%]"
        >
          <img
            src="/hero-home.jpg"
            alt="Premium Butterfly Homes residence"
            className="
              h-full
              w-full
              object-cover
            "
          />
        </motion.div>

        {/* Dark cinematic overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[#0D1026]/55
          "
        />

        {/* Left-to-right editorial gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#0D1026]/95
            via-[#0D1026]/65
            to-[#0D1026]/20
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48
            bg-gradient-to-t
            from-[#0D1026]
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          BRAND LIGHT
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          opacity: [0.12, 0.25, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/4
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#66D4C8]
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#7A4CC2]
          blur-[160px]
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          container-butterfly
          relative
          z-10
        "
      >
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="
            max-w-3xl
          "
        >
          {/* Eyebrow */}

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
              duration: 0.8,
            }}
            className="
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
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
                text-white/70
              "
            >
              The Butterfly Homes Difference
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 50,
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
              duration: 1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-8
              font-display
              text-5xl
              leading-[0.98]
              tracking-[-0.04em]
              text-white
              sm:text-6xl
              lg:text-7xl
            "
          >
            More than a home.
            <br />
            <span className="gradient-text">A place to belong.</span>
          </motion.h2>

          {/* Description */}

          <motion.p
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-white/70
              md:text-lg
            "
          >
            We believe the right home is more than four walls. It is where
            everyday moments become memories, where design meets comfort, and
            where life feels naturally yours.
          </motion.p>

          {/* CTA */}

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
              delay: 0.4,
            }}
            className="mt-9"
          >
            <Link
              href="/about"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/20
              "
            >
              Discover Our Story
              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* =================================================
            BOTTOM INFORMATION
        ================================================== */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
          }}
          className="
            mt-20
            grid
            max-w-4xl
            grid-cols-2
            gap-8
            border-t
            border-white/15
            pt-8
            sm:grid-cols-4
            lg:mt-28
          "
        >
          <InfoItem number="10+" label="Premium Projects" />

          <InfoItem number="500+" label="Happy Families" />

          <InfoItem number="5+" label="Locations" />

          <InfoItem number="100%" label="Home Focused" />
        </motion.div>
      </div>
    </section>
  );
}

function InfoItem({ number, label }) {
  return (
    <div>
      <div
        className="
          text-2xl
          font-semibold
          tracking-tight
          text-white
          md:text-3xl
        "
      >
        {number}
      </div>

      <div
        className="
          mt-1.5
          text-xs
          uppercase
          tracking-[0.16em]
          text-white/50
        "
      >
        {label}
      </div>
    </div>
  );
}
