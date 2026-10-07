"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export default function FinalCTA() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const butterflyY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const butterflyX = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#151A3A]
        py-24
        md:py-32
        lg:py-40
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_20%_20%,rgba(102,212,200,0.15),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(122,76,194,0.18),transparent_35%)]
        "
      />

      {/* Decorative circles */}

      <motion.div
        style={{
          y: butterflyY,
          x: butterflyX,
        }}
        className="
          pointer-events-none
          absolute
          -right-24
          top-20
          h-72
          w-72
          rounded-full
          border
          border-white/10
          md:h-96
          md:w-96
        "
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          -left-28
          bottom-10
          h-64
          w-64
          rounded-full
          border
          border-[#66D4C8]/10
          md:h-80
          md:w-80
        "
      />

      <div className="container-butterfly relative z-10">
        <div
          className="
            mx-auto
            max-w-5xl
            text-center
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
              duration: 0.7,
            }}
            className="
              flex
              items-center
              justify-center
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
                text-white/60
              "
            >
              Your Next Chapter
            </span>

            <span
              className="
                h-px
                w-10
                bg-gradient-to-r
                from-[#7A4CC2]
                to-[#66D4C8]
              "
            />
          </motion.div>

          {/* Main heading */}

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
              amount: 0.25,
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
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-[88px]
            "
          >
            Maybe your next
            <br />
            <span className="gradient-text">home is waiting.</span>
          </motion.h2>

          {/* Description */}

          <motion.p
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="
              mx-auto
              mt-7
              max-w-xl
              text-base
              leading-8
              text-white/60
              md:text-lg
            "
          >
            Tell us what you&apos;re looking for and let us help you discover a space
            that fits your life, lifestyle and future.
          </motion.p>

          {/* Buttons */}

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
              delay: 0.45,
            }}
            className="
              mt-9
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >
            <Link
              href="/properties"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                text-[#151A3A]
                transition-all
                duration-300
                hover:bg-[#66D4C8]
              "
            >
              Explore Properties
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

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/5
                px-7
                py-4
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/10
              "
            >
              Talk to an Expert
            </Link>
          </motion.div>
        </div>

        {/* Bottom brand line */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          className="
            mx-auto
            mt-20
            max-w-5xl
            border-t
            border-white/10
            pt-6
            text-center
          "
        >
          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/30
            "
          >
            Butterfly Homes · Find a place that feels like home
          </span>
        </motion.div>
      </div>
    </section>
  );
}
