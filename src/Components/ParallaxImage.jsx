"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  priority = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}px`, `${speed * 100}px`],
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
      }}
      className={`absolute inset-0 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
    </motion.div>
  );
}
