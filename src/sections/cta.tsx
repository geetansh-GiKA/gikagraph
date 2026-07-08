"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";

const settings = {
  badge: { text: "Get Started" },
  headlinePrefix: "Start Using ",
  headlineHighlight: "GikaGraph",
  headlineSuffix: " Today",
  description:
    "Experience the power of entity-aware AI tailored specifically for your enterprise needs.",
  CTA: {
    content: "Request Demo",
    href: "https://cal.com/gikagraph/30-mins",
  },
};

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="relative mx-auto text-center">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-orange-50 via-white to-orange-100 px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-grid -z-10 pointer-events-none" />

        <div className="relative flex flex-col items-center gap-5">
          <SlideEffect>
            <Badge text={settings.badge.text} />
          </SlideEffect>

          <SlideEffect
            direction="top"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl mx-auto"
          >
            {settings.headlinePrefix}
            {settings.headlineHighlight}
            {settings.headlineSuffix}
          </SlideEffect>

          <SlideEffect
            delay={0.1}
            className="px-2 sm:px-10 md:px-0 w-full md:max-w-md mx-auto text-sm lg:text-base text-muted-foreground"
          >
            {settings.description}
          </SlideEffect>

          <SlideEffect delay={0.15}>
            <Link href={settings.CTA.href}>
              <Button size="lg" variant="outline">
                {settings.CTA.content}
                <ArrowRight />
              </Button>
            </Link>
          </SlideEffect>
        </div>
      </div>
    </SlideEffect>
  );
}
