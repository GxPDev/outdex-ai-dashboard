
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa6";
import MarketsSection from "./MarketsSection";

export default function HomeRest() {
  return (
    <div className="px-6 md:px-10 py-20 space-y-24">

      {/* ========================= */}
      {/* FROM SIGNALS TO MARKETS */}
      {/* ========================= */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              From Signals to Markets
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              AI-generated markets derived from real-time signals.
            </p>
          </div>
          <span className="text-sm text-blue-600 cursor-pointer">
            View all markets →
          </span>
        </div>

        <MarketsSection />
      </section>

      {/* ========================= */}
      {/* INTELLIGENCE */}
      {/* ========================= */}
      <section className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-8">
          Focused Market Intelligence
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "FX signals across currency pairs",
            "Crypto momentum detection",
            "Stock sentiment tracking",
            "Commodity macro signals",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <p className="text-sm font-medium text-slate-700">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= */}
      {/* PROCESS FLOW */}
      {/* ========================= */}
      <section className="text-center">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Signals detected",
            "AI structures markets",
            "You act",
            "Outcomes resolve",
          ].map((step, i) => (
            <div key={i}>
              <p className="text-xs text-slate-400">0{i + 1}</p>
              <p className="font-semibold text-slate-900 mt-2">
                {step}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {descriptions[i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}
      <footer className="pt-12 border-t border-slate-200">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* BRAND */}
          <div>
            <h4 className="font-semibold text-slate-900 text-lg">
              Outdex
            </h4>
            <p className="text-sm text-slate-500 mt-2 max-w-sm">
              The intelligence layer for global financial markets.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex gap-6 text-sm text-slate-500">
            <span>Docs</span>
            <span>About</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-4 text-slate-600 text-lg">

            <Social icon={<FaXTwitter />} />
            <Social icon={<FaInstagram />} />
            <Social icon={<FaLinkedin />} />
            <Social icon={<FaDiscord />} />
            <Social icon={<FaYoutube />} />

          </div>

        </div>

        <p className="text-xs text-slate-400 mt-8">
          © 2025 Outdex. Trading involves risk.
        </p>

      </footer>

    </div>
  );
}

const descriptions = [
  "AI scans global markets in real time",
  "Signals are analyzed and markets created",
  "Choose how to express your view",
  "Markets settle fairly and transparently",
];

// Card/RangeCard/CloseCard components removed as they're not currently used.

function Social({ icon }: { icon?: React.ReactNode }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 cursor-pointer transition">
      {icon}
    </div>
  );
}
