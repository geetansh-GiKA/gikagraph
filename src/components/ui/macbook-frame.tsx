export function MacbookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl select-none">
      {/* Screen */}
      <div className="relative rounded-[20px] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]">
        <div className="relative rounded-[17px] bg-black p-2.5">
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-[18px] w-[110px] -translate-x-1/2 rounded-full bg-black">
            <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-800" />
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#0a0a0a]">
            {children}
          </div>
        </div>
      </div>

      {/* Base / hinge */}
      <div className="relative mx-auto h-[14px] w-full rounded-b-2xl bg-gradient-to-b from-neutral-300 to-neutral-500">
        <div className="absolute inset-x-0 top-0 h-px bg-black/20" />
        <div className="absolute left-1/2 top-0 h-[6px] w-28 -translate-x-1/2 rounded-b-md bg-gradient-to-b from-neutral-500 to-neutral-400" />
      </div>
      <div className="mx-auto h-[7px] w-[45%] rounded-b-[14px] bg-gradient-to-b from-neutral-400 to-neutral-600 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]" />
    </div>
  );
}
