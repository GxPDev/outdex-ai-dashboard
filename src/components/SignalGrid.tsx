"use client";

import { motion, AnimatePresence } from "framer-motion";
import SignalCard from "./SignalCard";
import ShimmerCard from "./ShimmerCard";

export default function SignalGrid({ signals }: any) {
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
          : signals.map((signal: any, idx: number) => {
              if (!signal || typeof signal !== 'object') return null;
              // Map asset name to icon key (lowercase, remove non-alphanum)
              const assetKey = (signal.icon || signal.asset || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const validIcons = ["btc","eth","gold","usdjpy","eurusd","tsla"];
              const iconKey = validIcons.includes(assetKey) ? assetKey : undefined;

              // Calculate closing string from entryCloseTime
              let closing = "--";
              if (signal.entryCloseTime) {
                const ms = signal.entryCloseTime - Date.now();
                if (ms > 0) {
                  const min = Math.floor(ms / 60000);
                  const h = Math.floor(min / 60);
                  const m = min % 60;
                  closing = h > 0 ? `${h}h ${m}m` : `${m}m`;
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
                  <SignalCard signal={{ ...signal, closing }} icon={iconKey} />
                </motion.div>
              );
            })}
      </AnimatePresence>
    </motion.div>
  );
}
