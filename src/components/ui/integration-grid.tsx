import Image from "next/image";
import { connectors } from "@/lib/connectors";

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-card">
      <Image
        src={src}
        alt={name}
        width={24}
        height={24}
        className="size-5 md:size-6 object-contain"
      />
    </div>
  );
}

export function IntegrationGrid() {
  return (
    <div className="grid w-full max-w-sm grid-cols-5 gap-2.5 md:gap-3">
      {connectors.map((logo) => (
        <LogoTile key={logo.name} name={logo.name} src={logo.src} />
      ))}
    </div>
  );
}
