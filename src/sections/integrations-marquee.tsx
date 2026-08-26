"use client";

import { useEffect, useRef, useState } from "react";
import { ScanSearch, BrainCog } from "lucide-react";
import SlideEffect from "@/components/slide-effect";
import { connectors as logos } from "@/lib/connectors";

const highlights = [
  {
    title: "High-Precision Entity & Data Enrichment",
    description:
      "Accurately identifies key business-specific entities; GiKA creates a powerful data layer enriching your data for smarter decisions.",
    icon: ScanSearch,
  },
  {
    title: "Knowledge-Centric Intelligence",
    description:
      "Tailored to your business context, delivering fast, accurate, and grounded insights for even the most complex tasks.",
    icon: BrainCog,
  },
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
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
          The Entity Intelligence Engine of GiKA unifies internal & external
          data, and enable real-time market intelligence and 360° business
          view
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full text-left">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <SlideEffect
              key={item.title}
              direction="top"
              delay={0.2 + 0.08 * index}
              isSpring={false}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 md:p-8 transition-shadow hover:shadow-[0px_0px_20px_rgba(0,0,0,0.08)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-foreground/[0.03] transition-transform duration-300 group-hover:scale-110" />

                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </SlideEffect>
          );
        })}
      </div>
    </div>
  );
}
