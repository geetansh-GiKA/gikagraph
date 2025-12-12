export default function Badge({ number, text }: { number: number, text: string }) {
  return (
    <div className="flex items-center h-8 text-foreground text-[12px] md:text-[16px] bg-muted w-fit rounded-full mx-auto">
      <div className="h-8 w-8 flex items-center justify-center bg-foreground/10 rounded-full font-medium text-[16px] md:text-[18px]">{number}</div>
      <div className="uppercase tracking-wider py-2 px-4 w-fit">{text}</div>
    </div>
  )
}