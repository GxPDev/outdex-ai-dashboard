export default function IntelligenceSteps() {
  return (
    <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
      {[
        {
          title: "Signals detected",
          desc: "AI scans global markets in real time",
        },
        {
          title: "Markets created",
          desc: "Signals are structured into tradable markets",
        },
        {
          title: "You act",
          desc: "Enter markets based on your view",
        },
        {
          title: "Outcomes resolve",
          desc: "Markets settle transparently",
        },
      ].map((step, i) => (
        <div key={i} className="relative">
          {/* Step number */}
          <div className="text-xs text-slate-400 mb-2">
            0{i + 1}
          </div>
          <h3 className="font-semibold text-slate-900">
            {step.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {step.desc}
          </p>
          {/* Connector line */}
          {i !== 3 && (
            <div className="hidden md:block absolute top-4 right-[-20px] w-10 h-px bg-slate-200" />
          )}
        </div>
      ))}
    </div>
  );
}
