import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export default function Badge({
  text,
  icon,
  Icon,
}: {
  number?: number;
  text: string;
  icon?: string;
  Icon?: LucideIcon;
}) {
  return (
    <div className="w-fit mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-sm">
      {Icon ? (
        <Icon className="size-4 text-foreground" />
      ) : icon ? (
        <Image src={icon} alt="" width={16} height={16} className="size-4" />
      ) : null}
      <span className="text-xs md:text-sm font-medium text-foreground">
        {text}
      </span>
    </div>
  );
}
