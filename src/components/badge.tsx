import Image from "next/image";

export default function Badge({
  text,
  icon,
}: {
  number?: number;
  text: string;
  icon?: string;
}) {
  return (
    <div className="w-fit mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-sm">
      {icon ? (
        <Image src={icon} alt="" width={16} height={16} className="size-4" />
      ) : null}
      <span className="text-xs md:text-sm font-medium text-foreground">
        {text}
      </span>
    </div>
  );
}
