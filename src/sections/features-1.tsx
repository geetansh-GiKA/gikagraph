"use client";

import Image from "next/image";
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
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Your Data Is Fragmented and Scattered",
      description:
        "GiKA unifies every data source into a single knowledge graph with entity resolution, giving your business one connected source of truth.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Generic AI Can't Handle Enterprise Complexity",
      description:
        "GiKA is purpose-built for RFP-grade precision and enterprise-scale document volume, driving 15-50x ROI on real business outcomes.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

export default function Features1() {
  return (
    <div id="features" className="space-y-12 md:space-y-16 mx-auto -mt-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge number={settings.badge.number} text={settings.badge.text} icon="/connections.png" />
        </SlideEffect>

        <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground">
          {settings.description}
        </SlideEffect>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {settings.cards.map((card, index) => (
          <SlideEffect
            key={card.title}
            direction="top"
            delay={0.08 * index}
            isSpring={false}
            className="h-full"
          >
            <div className="flex flex-col gap-5 h-full">
              <div className="relative aspect-[4/3] w-full rounded-2xl border border-border overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-orange-500/10" />
              </div>
              <div className="space-y-2 text-start">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  );
}
