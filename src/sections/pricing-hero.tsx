"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleDollarSign } from "lucide-react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";

const settings = {
  badge: { text: "Pricing" },
  headline: "Simple, Predictable Pricing",
  description:
    "Start on a Free Trial and see real results in days. Move up when you're ready to connect your own knowledge bases.",
};

type Plan = {
  name: string;
  description: string;
  price: string;
  period?: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free Trial",
    description: "Try the full product on your own RFPs, no strings attached.",
    price: "Free",
    period: "30 days",
    cta: "Get Started",
    href: "https://playground.GIKA.AI.ai",
    features: [
      "30 RFP credits",
      "Standard knowledge repository",
      "Standard structured data",
      "AI agents",
      "Standard connectors",
      "Standard support",
    ],
  },
  {
    name: "Foundation",
    description: "The fastest way to run RFPs end to end every month.",
    price: "$5999",
    period: "/year",
    cta: "Get Started",
    href: "https://playground.GIKA.AI.ai",
    features: [
      "40 RFP credits/month",
      "Standard knowledge repository",
      "Standard structured data",
      "AI agents",
      "Standard connectors",
      "Standard support",
    ],
  },
  {
    name: "Professional",
    description: "Unlimited structured data and enterprise-grade repository.",
    price: "$20,000",
    period: "/year",
    cta: "Get Started",
    href: "https://playground.GIKA.AI.ai",
    highlighted: true,
    features: [
      "1,000 RFP credits/year",
      "Enterprise knowledge repository",
      "Unlimited structured data",
      "AI agents",
      "Advanced connectors",
      "Dedicated support",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom limits and connectors built around your workflow.",
    price: "Custom",
    cta: "Talk to Sales",
    href: "https://cal.com/gikagraph/30-mins",
    features: [
      "Custom RFP credits",
      "Custom knowledge repository",
      "Unlimited structured data",
      "AI agents",
      "Custom connectors",
      "Dedicated support",
    ],
  },
];

export default function PricingHero() {
  return (
    <div className="space-y-16 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} Icon={CircleDollarSign} />
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
        >
          {settings.headline}
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          {settings.description}
        </SlideEffect>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <SlideEffect
            key={plan.name}
            delay={0.1 + index * 0.05}
            className="h-full"
          >
            <div
              className={`rounded-2xl text-sm h-full p-6 md:p-8 flex flex-col items-start justify-start text-start gap-4 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${
                plan.highlighted
                  ? "bg-card border-2 border-foreground"
                  : "bg-card border border-border/60"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full bg-foreground text-background">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                )}
              </div>

              <Link href={plan.href} className="w-full">
                <Button
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full justify-center"
                >
                  {plan.cta}
                  <ArrowRight />
                </Button>
              </Link>

              <ul className="space-y-3 w-full pt-2 border-t border-border">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  );
}
