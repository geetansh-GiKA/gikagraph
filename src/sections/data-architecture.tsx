"use client";

import Badge from "@/components/badge";
import { Network } from "lucide-react";
import SlideEffect from "@/components/slide-effect";

export default function DataArchitecture() {
  return (
    <div className="pt-6 md:pt-8 pb-8 md:pb-10 px-4">
      <div className="flex flex-col items-center text-center gap-5 max-w-4xl mx-auto">
        <SlideEffect>
          <Badge text="Enterprise Data Architecture" Icon={Network} />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
        >
          <h2 className="text-foreground">Raw Data, Real Intelligence</h2>
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          From raw data ingestion to actionable intelligence — see how GiKA
          transforms fragmented information into a unified knowledge graph
          with enterprise-grade security.
        </SlideEffect>
      </div>
    </div>
  );
}
