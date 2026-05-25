export default function HomeSections() {
  return (
    <div className="px-6 md:px-10 py-16 space-y-20">
      {/* FROM SIGNALS TO MARKETS */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">From Signals to Markets</h2>
            <p className="text-sm text-slate-500 mt-1">AI-generated markets derived from real-time signals.</p>
          </div>
          <span className="text-sm text-blue-600 cursor-pointer">View all markets →</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { asset: "EUR/USD", type: "FX", question: "Will EUR/USD break 1.10 in 24h?", yes: "68%", no: "32%" },
            { asset: "BTC", type: "Crypto", question: "Will BTC rise 4% in 24h?", yes: "72%", no: "28%" },
            { asset: "NVDA", type: "Stocks", question: "What will NVDA close at this week?", yes: "64%", no: "36%" },
            { asset: "Gold", type: "Gold", question: "Where will Gold close in 24h?", yes: "42%", no: "58%" }
          ].map((m, i) => (
            <div key={i} className="bg-white p-10 min-h-[320px] rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-xl transition flex flex-col gap-3">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-600 font-medium">
                  {m.type}
                  {m.asset ? <span className="mx-1">&bull;</span> : null}
                  {m.asset}
                </p>
              </div>
              <p className="mt-2 text-lg font-semibold text-slate-900">{m.question}</p>
              <p className="mt-2 text-base text-slate-700 font-semibold bg-red-200 border border-red-500 rounded px-2">Ends in 18h 24m</p>
              {/* YES/NO or custom content */}
              {m.type === "Gold" ? (
                <div className="my-4 flex flex-col gap-1">
                  <div className="h-2 rounded bg-slate-200 overflow-hidden"><div className="h-2 bg-yellow-400 w-2/5"></div></div>
                  <div className="h-2 rounded bg-slate-200 overflow-hidden"><div className="h-2 bg-yellow-400 w-1/3"></div></div>
                  <div className="h-2 rounded bg-slate-200 overflow-hidden"><div className="h-2 bg-yellow-400 w-1/2"></div></div>
                  <div className="h-2 rounded bg-slate-200 overflow-hidden"><div className="h-2 bg-yellow-400 w-1/4"></div></div>
                </div>
              ) : m.type === "Stocks" ? (
                <div className="my-4">
                  <input type="text" className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-500 text-center text-base bg-slate-50" placeholder="$ 950.00" disabled />
                </div>
              ) : (
                <div className="flex justify-between mt-5">
                  <div>
                    <p className="text-xs text-slate-500">YES</p>
                    <p className="text-lg font-bold" style={{ color: i === 0 ? '#2563eb' : '#f59e42' }}>{m.yes}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">NO</p>
                    <p className="text-lg text-slate-700">{m.no}</p>
                  </div>
                </div>
              )}
              <button className="mt-6 w-full bg-slate-100 text-slate-600 hover:bg-slate-200 py-3 rounded-xl text-base font-medium transition">
                {m.type === "Stocks" ? "Submit Prediction" : "Enter Market"}
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* INTELLIGENCE SECTION */}
      <section className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-white/50">
        <h3 className="text-lg font-semibold text-slate-900 mb-8">Focused Market Intelligence</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "FX", text: "Real-time currency signal detection across major pairs" },
            { title: "Crypto", text: "Momentum and volatility detection across crypto markets" },
            { title: "Stocks", text: "Event-driven signals based on sentiment and flow" },
            { title: "Commodities", text: "Macro and supply-driven intelligence across assets" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md hover:-translate-y-[2px] transition">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-500 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* PROCESS FLOW */}
      <section className="text-center">
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          {[
            { step: "01", title: "Signals detected", text: "AI scans global markets in real time" },
            { step: "02", title: "AI structures markets", text: "Signals analyzed and markets created" },
            { step: "03", title: "You act", text: "Choose how to express your view" },
            { step: "04", title: "Outcomes resolve", text: "Markets settle fairly and transparently" }
          ].map((s, i) => (
            <div key={i}>
              <p className="text-xs text-slate-400">{s.step}</p>
              <p className="font-semibold text-slate-900 mt-2">{s.title}</p>
              <p className="text-slate-500 mt-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* FOOTER */}
      <footer className="pt-10 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h4 className="font-semibold text-slate-900">OUTDEX</h4>
            <p className="text-sm text-slate-500 mt-2 max-w-sm">The intelligence layer for global financial markets.</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <span>Docs</span>
            <span>About</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-6">© 2025 Outdex. Trading involves risk.</p>
      </footer>
    </div>
  );
}
<p className="mt-1 text-base text-slate-700 font-semibold">Ends in 18h 24m</p>