const intelligence = [
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 text-xl">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold" dy=".3em">€</text></svg>
      </span>
    ),
    title: "FX (Forex)",
    desc: "Precision-driven signals across major currency pairs"
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 text-xl">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold" dy=".3em">₿</text></svg>
      </span>
    ),
    title: "Crypto",
    desc: "Real-time momentum and volatility detection"
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 text-xl">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold" dy=".3em">S</text></svg>
      </span>
    ),
    title: "Stocks",
    desc: "Sentiment and event-driven opportunities"
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 text-xl">
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="currentColor"/><text x="50%" y="56%" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold" dy=".3em">G</text></svg>
      </span>
    ),
    title: "Commodities",
    desc: "Macro and supply-driven signals across key markets"
  }
];

export default function IntelligenceStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:px-10">
      <div className="rounded-2xl bg-white/90 border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col gap-8">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">Focused Market Intelligence</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {intelligence.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              {item.icon}
              <div className="font-semibold text-slate-900 mt-2">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
