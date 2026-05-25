import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="max-h-12 max-w-[180px] flex items-center">
        <Image src="/logo.png" alt="Outdex Logo" width={180} height={50} priority style={{ height: 'auto', width: '100%' }} />
      </div>
    </div>
  );
}
