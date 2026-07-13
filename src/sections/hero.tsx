"use client";

import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import DashboardPreview from "@/components/dashboard-preview";

const settings = {
  headlinePrefix: "Agents That ",
  headlineHighlight: "Truly",
  headlineMiddle: " ",
  headlineHighlight2: "Understands",
  headlineSuffix: " Your Data",
  subheadline:
    "An intelligent decision-making platform that delivers better responses, reduces analytical burden, and drives measurable business outcomes.",
  mainCTA: {
    content: "Explore Platform",
    href: "https://gikagraph.ai/",
  },
  secondaryCTA: {
    content: "view live demo",
    href: "#",
  },
};

export default function Hero() {
  return (
    <div className="space-y-2 z-50 relative">
      <section className="flex flex-col gap-4 lg:gap-12 items-center relative">
        {/* Hero Content */}
        <div className="flex flex-col text-center items-center gap-4">
          <h2 className=" text-[96px] pt-12 font-bold tracking-tighter uppercase leading-tight">
            {settings.headlinePrefix}
            <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent">
              {settings.headlineHighlight}
            </span>
            {settings.headlineMiddle}
            <span className="bg-gradient-to-br from-[#c9a8d4] via-[#9868a8] to-black  bg-clip-text text-transparent">
              {settings.headlineHighlight2}
            </span>
            {settings.headlineSuffix}
          </h2>

          <SlideEffect
            delay={0}
            className="text-base py-4 text-muted-foreground max-w-xl mx-auto"
          >
            {settings.subheadline}
          </SlideEffect>

          <SlideEffect className="flex flex-col gap-5 items-center w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3">
              <Link href={settings.mainCTA.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="capitalize w-full"
                  variant="outline"
                >
                  {settings.mainCTA.content}
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </SlideEffect>
        </div>

        {/* Dashboard Showcase */}
        <SlideEffect
          className="w-full max-w-6xl"
          isSpring={true}
          duration={1.3}
        >
          <div className="bg-card/50 dark:bg-card/30 backdrop-blur-md overflow-hidden rounded-2xl">
            <DashboardPreview />
          </div>
        </SlideEffect>
      </section>
    </div>
  );
}
