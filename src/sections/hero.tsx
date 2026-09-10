"use client";

import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import DashboardPreview from "@/components/dashboard-preview";

const settings = {
  headlinePrefix: "",
  headlineHighlight: "Decision Intelligence",
  headlineMiddle: " Platform for your ",
  headlineHighlight2: "CRO",
  headlineSuffix: "",
  subheadlineParagraphs: [
    {
      bold: "GiKA is the reasoning architecture that makes AI reliable for high-stakes decisions.",
      rest: " Our framework enables accurate reasoning across enterprise-scale context, time, and evidence—delivering explainable, numerically consistent, decision-grade AI for the CRO office.",
    },
    {
      bold: "GiKA helps revenue leaders make better decisions, faster",
      rest: "—and accelerate deal velocity across the revenue lifecycle—from discovering and qualifying opportunities, to winning deals and generating RFP responses, to retaining and growing customers.",
    },
  ],
  mainCTA: {
    content: "Explore Platform",
    href: "https://cal.com/gikagraph/30-mins",
  },
  secondaryCTA: {
    content: "view live demo",
    href: "https://cal.com/gikagraph/30-mins",
  },
};

export default function Hero() {
  return (
    <div className="space-y-2 z-50 relative">
      <section className="flex flex-col gap-4 lg:gap-12 items-center relative">
        {/* Hero Content */}
        <div className="flex flex-col text-center items-center gap-4">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[90px] pt-12 font-bold uppercase leading-tight">
            {settings.headlinePrefix}
            <span className="bg-gradient-to-br from-black via-[#9868a8] to-[#c9a8d4] bg-clip-text text-transparent ">
              {" "}
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
            className="text-base py-4 text-muted-foreground max-w-xl mx-auto space-y-3"
          >
            {settings.subheadlineParagraphs.map((paragraph, index) => (
              <p key={index}>
                <span className="font-semibold text-foreground">
                  {paragraph.bold}
                </span>
                {paragraph.rest}
              </p>
            ))}
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
          className="hidden lg:block w-full max-w-6xl"
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
