// Intelligence features row below Focused Market Intelligence
const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: "Signals detected",
    desc: "AI scans global markets in real time"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "AI structures markets",
    desc: "Signals are analyzed and markets are created"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "You act",
    desc: "Choose how to express your view"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Outcomes resolve",
    desc: "Markets settle fairly and transparently"
  }
];

export default function IntelligenceFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="mb-2">{item.icon}</div>
            <div className="font-semibold text-slate-900">{item.title}</div>
            <div className="text-xs text-slate-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
