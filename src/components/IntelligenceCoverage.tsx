export default function IntelligenceCoverage() {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-slate-900">
        Intelligence Coverage
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        AI-driven signals across major global markets
      </p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {[
          "FX signals across currency pairs",
          "Crypto momentum detection",
          "Stock sentiment tracking",
          "Commodity macro signals",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:shadow-md transition"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
