"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ------------------ TYPING EFFECT ------------------ */
function useTyping(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function HeroText() {
  const typed = useTyping("AI-curated financial prediction infrastructure.");

  const rotating = [
    "Predict early.",
    "Enter markets.",
    "Earn.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotating.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [rotating.length]);

  return (
    <div className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em]">

      {/* Typing line */}
      <div className="text-slate-900 min-h-[1.2em]">
        {typed}
      </div>

      {/* Highlighted animated line with animated text shadow */}
      <motion.div
        key={rotating[index]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-blue-600 font-bold"
        style={{ textShadow: "0 0 0px rgba(59,130,246,0.0)" }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 0px rgba(59,130,246,0.0)",
              "0 0 8px rgba(59,130,246,0.4)",
              "0 0 0px rgba(59,130,246,0.0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {rotating[index]}
        </motion.span>
      </motion.div>

    </div>
  );
}
