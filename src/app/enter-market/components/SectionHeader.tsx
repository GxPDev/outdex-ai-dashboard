export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-zinc-400 text-sm">{subtitle}</p>}
    </div>
  );
}
