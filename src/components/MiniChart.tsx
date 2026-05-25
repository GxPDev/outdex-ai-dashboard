"use client";

import { motion } from "framer-motion";

export default function MiniChart({
  trend,
  delay = 0,
}: {
  trend: "up" | "down" | "flat";
  delay?: number;
}) {
  const paths = {
    up: "M0 20 L10 18 L20 16 L30 14 L40 10 L50 6",
    down: "M0 6 L10 8 L20 10 L30 14 L40 18 L50 20",
    flat: "M0 12 L10 12 L20 11 L30 12 L40 11 L50 12",
  };

  const colors = {
    up: "#16a34a",   // green
    down: "#dc2626", // red
    flat: "#64748b", // gray
  };

  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      fill="none"
      style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))" }}
    >
      <motion.path
        d={paths[trend]}
        stroke={colors[trend]}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          delay,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
