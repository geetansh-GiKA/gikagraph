"use client";

import { BrainCircuit, Network, Building2 } from "lucide-react";
import SlideEffect from "@/components/slide-effect";
import Badge from "@/components/badge";

const settings = {
  badge: {
    number: 1,
    text: "Domain-Specific AI",
  },
  headlinePrefix: "Purpose-",
  headlineHighlight: "Driven",
  headlineSuffix: "",
  description:
    "Engineered for enterprise-scale performance, our platform transforms fragmented data into grounded, actionable insights that business can trust using our specialized AI platform.",
  cards: [
    {
      title: "Off-The-Shelf AI Models Aren't Enough",
      description:
        "GiKA fine-tunes domain-specific small language models on your business context, delivering 99.2% accuracy with minimal hallucination at a fraction of the cost.",
      icon: BrainCircuit,
    },
    {
      title: "Your Data Is Fragmented and Scattered",
      description:
        "GiKA unifies every data source into a single knowledge graph with entity resolution, giving your business one connected source of truth.",
      icon: Network,
    },
    {
      title: "Generic AI Can't Handle Enterprise Complexity",
      description:
        "GiKA is purpose-built for RFP-grade precision and enterprise-scale document volume, driving 15-50x ROI on real business outcomes.",
      icon: Building2,
    },
  ],
};

export default function Features1() {
  return (
    <div id="features" className="space-y-12 md:space-y-16 mx-auto -mt-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge
            number={settings.badge.number}
            text={settings.badge.text}
            icon="/connections.png"
          />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl mx-auto"
        >
          <h2 className="text-black">
            {settings.headlinePrefix}
            {settings.headlineHighlight}
            {settings.headlineSuffix}
          </h2>
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          {settings.description}
        </SlideEffect>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {settings.cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <SlideEffect
              key={card.title}
              direction="top"
              delay={0.08 * index}
              isSpring={false}
              className="h-full"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.06)]">
                <div className="absolute -right-6 -top-8 flex h-24 w-24 items-end justify-start rounded-full bg-foreground pb-6 pl-7">
                  <span className="text-xl font-bold text-background">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-start">
                  <div className="flex h-12 w-12 items-center text-foreground">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
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
