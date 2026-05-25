"use client";

import { useEffect, useState } from "react";

export function AnimatedPercent({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    const step = diff / 8;

    const id = setInterval(() => {
      setDisplay((prev) => {
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
    const diff = value - display;
    const step = diff / 10;

    const id = setInterval(() => {
      setDisplay((prev) => {
        if (Math.abs(value - prev) < 50) return value;
        return prev + step;
      });
    }, 20);

    return () => clearInterval(id);
  }, [value]);

  return <span>${Math.round(display / 1000)}K</span>;
}
