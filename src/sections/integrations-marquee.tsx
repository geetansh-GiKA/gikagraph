"use client";

import { useEffect, useRef, useState } from "react";
import SlideEffect from "@/components/slide-effect";

const logos = [
  { name: "AWS", src: "/Connectors/aws.svg" },
  { name: "Dropbox", src: "/Connectors/dropbox.svg" },
  { name: "Google Drive", src: "/Connectors/google-drive.svg" },
  { name: "MongoDB", src: "/Connectors/mongodb.svg" },
  { name: "MySQL", src: "/Connectors/mysql.png" },
  { name: "OneDrive", src: "/Connectors/onedrive.svg" },
];

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="shrink-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl border border-border bg-background flex items-center justify-center mx-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="w-7 h-7 md:w-8 md:h-8 object-contain"
      />
    </div>
  );
}

export default function IntegrationsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(2);

  useEffect(() => {
    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const setWidth = setRef.current?.scrollWidth ?? 0;
      if (!containerWidth || !setWidth) return;
      // Ensure one repeated "set" is at least as wide as the container,
      // so the -50% loop point always falls beyond the visible edge.
      const needed = Math.ceil(containerWidth / setWidth);
      setRepeat((prev) => Math.max(prev, needed + 1, 2));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const set = Array.from({ length: repeat }, () => logos).flat();

  return (
    <div className="space-y-10 md:space-y-12 mx-auto text-center">
      <SlideEffect>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight max-w-2xl mx-auto">
          We turn scattered data into a knowledge graph
        </h2>
      </SlideEffect>

      <SlideEffect delay={0.15}>
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            <div ref={setRef} className="flex shrink-0">
              {set.map((logo, i) => (
                <LogoTile
                  key={`a-${logo.name}-${i}`}
                  name={logo.name}
                  src={logo.src}
                />
              ))}
            </div>
            <div className="flex shrink-0" aria-hidden="true">
              {set.map((logo, i) => (
                <LogoTile
                  key={`b-${logo.name}-${i}`}
                  name={logo.name}
                  src={logo.src}
                />
              ))}
            </div>
          </div>
        </div>
      </SlideEffect>
    </div>
  );
}
