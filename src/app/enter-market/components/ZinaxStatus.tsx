export default function ZinaxStatus() {
  return (
    <div className="flex items-center gap-2 text-green-400 text-sm font-medium bg-zinc-900 rounded-lg px-4 py-2 shadow">
      <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
      Zinax AI active — scanning global markets
      <span className="ml-2 text-zinc-500">1,333 signals processed today</span>
    </div>
  );
}
