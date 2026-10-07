"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ButterflyMotion({ className = "" }) {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 700], [0, -180]);

  const x = useTransform(scrollY, [0, 700], [0, 120]);

  const rotate = useTransform(scrollY, [0, 700], [0, 12]);

  const scale = useTransform(scrollY, [0, 700], [1, 0.75]);

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        scale,
      }}
      initial={{
        opacity: 0,
        x: -100,
        y: 40,
        scale: 0.7,
      }}
      animate={{
        opacity: 0.9,
        x: 0,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={160}
        height={160}
        priority
        className="h-auto w-full object-contain"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </motion.div>
  );
}
