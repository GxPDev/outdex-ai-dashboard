"use client";

import { useEffect, useState } from "react";

export function AnimatedPercent({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((prev) => {
        const diff = value - prev;
        const step = diff / 8;
        if (Math.abs(value - prev) < 0.5) return value;
        return prev + step;
      });
    }, 20);

    return () => clearInterval(id);
  }, [value]);

  return <span>{Math.round(display)}%</span>;
}

export function AnimatedMoney({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((prev) => {
        const diff = value - prev;
        const step = diff / 10;
        if (Math.abs(value - prev) < 50) return value;
        return prev + step;
      });
    }, 20);

    return () => clearInterval(id);
  }, [value]);

  return <span>${Math.round(display / 1000)}K</span>;
}
