"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignalCard from "./SignalCard";
import type { Signal as SignalType } from "./SignalCard";
import ShimmerCard from "./ShimmerCard";

type GridSignal = {
  id?: string | number;
  icon?: string;
  asset?: string;
  entryCloseTime?: number;
  [key: string]: unknown;
};

export default function SignalGrid({ signals }: { signals?: GridSignal[] }) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const isLoading = !signals || !Array.isArray(signals) || signals.length === 0;
  return (
    <motion.div
      layout
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <motion.div
                key={"shimmer-" + idx}
                layout
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <ShimmerCard />
              </motion.div>
            ))
          : signals.map((signal: GridSignal, idx: number) => {
              if (!signal || typeof signal !== 'object') return null;
              // Map asset name to icon key (lowercase, remove non-alphanum)
              const assetKey = (signal.icon || signal.asset || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const validIcons = ["btc","eth","gold","usdjpy","eurusd","tsla"];
              const iconKey = validIcons.includes(assetKey) ? assetKey : undefined;

              // Calculate closing string from entryCloseTime
              let closingIn = "--";
              if (signal.entryCloseTime) {
                const ms = signal.entryCloseTime - now;
                if (ms > 0) {
                  const min = Math.floor(ms / 60000);
                  const h = Math.floor(min / 60);
                  const m = min % 60;
                  closingIn = h > 0 ? `${h}h ${m}m` : `${m}m`;
                }
              }

              return (
                <motion.div
                  key={signal.id || idx}
                  layout
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                >
                  <SignalCard signal={{ ...signal, closingIn } as unknown as SignalType} icon={iconKey} />
                </motion.div>
              );
            })}
      </AnimatePresence>
    </motion.div>
  );
}
