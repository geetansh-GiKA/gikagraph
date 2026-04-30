export default function Badge({ text }: { number?: number, text: string }) {
  return (
    <div className="w-fit mx-auto rounded-full p-px bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/50" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary">{text}</span>
      </div>
    </div>
  )
}