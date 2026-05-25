"use client";


import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SignalPanel from "./SignalPanel";
import EngineStatus from "./EngineStatus";
import HeroText from "./HeroText";
import LiveStats from "./LiveStats";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 md:px-10">


      {/* Animated faint gradient/glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.04,
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, #3A7BFF 30%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 70% 60%, #1E3A8A 20%, transparent 70%)"
        }}
      />

      <div className="grid gap-12 md:grid-cols-2 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-4">
            {/* EngineStatus will show AI engine active, message, and count stacked */}
            <EngineStatus />
          </div>

          <HeroText />

          <p className="mt-5 md:mt-6 max-w-lg text-sm md:text-base leading-6 md:leading-7 text-slate-600">
            AI scans FX, crypto, stocks, and commodities to surface high-probability market opportunities.
          </p>

          {/* CTA */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #1E3A8A, #3A7BFF)",
                boxShadow: "0 10px 25px rgba(58,123,255,0.25)"
              }}
              onClick={() => router.push('/markets')}
            >
              Start Predicting →
            </motion.button>

            <button
              className="px-6 py-3 rounded-2xl text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition leading-[1.05] tracking-[-0.02em]"
              onClick={() => router.push('/explore-signals')}
            >
              Explore Signals
            </button>

          </div>


          {/* Live Stats Row */}
          <LiveStats />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <SignalPanel />
        </motion.div>

      </div>
    </section>
  );
}
