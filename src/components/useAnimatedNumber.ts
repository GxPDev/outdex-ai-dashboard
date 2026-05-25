import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(value: number, duration = 400) {
  const [display, setDisplay] = useState(value);
  const raf = useRef<number | null>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    const start = performance.now();
    const from = prev.current;
    const to = value;
    prev.current = value;

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      setDisplay(from + (to - from) * t);
      if (t < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(to);
      }
    }
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [value, duration]);

  return Math.round(display);
}
