import Link from "next/link";

const Navbar = () => (
  <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
    <Link
      href="/"
      className="font-bold text-xl cursor-pointer"
      style={{
        border: '4px solid red',
        background: 'yellow',
        color: 'black',
        zIndex: 9999,
        padding: '8px',
        display: 'inline-block',
      }}
    >
      OUTDEX-DEBUG123
    </Link>
    <div className="flex gap-6 items-center">
      <Link href="/enter-market" className="rounded-lg border border-blue-600 px-4 py-2 text-blue-700 font-semibold bg-white hover:bg-blue-50 transition">
        Enter Markets
      </Link>
    </div>
  </nav>
);

export default Navbar;
