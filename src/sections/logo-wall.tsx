"use client";

import SlideEffect from "@/components/slide-effect";
import { Component as PixelLogoGrid } from "@/components/ui/pixel-logo-grid";

export default function LogoWall() {
  return (
    <div className="space-y-10 md:space-y-12 mx-auto text-center">
      <SlideEffect>
        <p className="text-sm md:text-base text-muted-foreground">
          Built by engineers from
        </p>
      </SlideEffect>

      <SlideEffect delay={0.1}>
        <PixelLogoGrid />
      </SlideEffect>

      <SlideEffect delay={0.15}>
        <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
          Backed by engineers and researchers from top product companies and
          institutes like the IITs.
        </p>
      </SlideEffect>
    </div>
  );
}
