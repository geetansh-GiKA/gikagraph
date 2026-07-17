"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleDollarSign } from "lucide-react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";

const settings = {
  badge: { text: "Pricing" },
  headline: "Simple, Predictable Pricing",
  description:
    "Start on the General plan and see real results in days. Move to Enterprise when you're ready to connect your own knowledge bases.",
};

type BillingCycle = "monthly" | "quarterly" | "yearly";

const billingOptions: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const generalPricing: Record<
  BillingCycle,
  { price: string; period: string; note?: string }
> = {
  monthly: { price: "$499", period: "/mo" },
  quarterly: { price: "$1,349", period: "/quarter" },
  yearly: { price: "$4,999", period: "/year" },
};

const generalFeatures = [
  "Upload RFPs & auto-identify requirements",
  "Automated competitive analysis",
  "Chat with the GiKA AI agent",
  "Collaborate with your team (Threads)",
  "50 RFP credits/mo (~5 full RFPs)",
  "1,000 GiKA credits/mo for agent chat",
];

const enterpriseFeatures = [
  "Everything in General, plus:",
  "Your enterprise knowledge bases connected",
  "Context graph engine grounded in your data",
  "1,000 RFP credits/yr (~100 full RFPs)",
  "20,000 GiKA credits/yr",
  "Dedicated support & SLA",
];

export default function PricingHero() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const price = generalPricing[cycle];

  return (
    <div className="space-y-16 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} Icon={CircleDollarSign}/>
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

        <SlideEffect delay={0.15}>
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-card">
            {billingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCycle(option.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  cycle === option.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SlideEffect>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
        {/* General Plan */}
        <SlideEffect delay={0.1} className="h-full">
          <div className="rounded-2xl text-sm md:text-base h-full bg-card border border-border/60 p-8 md:p-10 flex flex-col items-start justify-start text-start gap-4 md:gap-5 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">General</h3>
              <p className="text-sm text-muted-foreground">
                Full product, no knowledge bases attached. The fastest way to
                try GiKA on your own RFPs.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">
                {price.price}
              </span>
              <span className="text-muted-foreground text-sm">
                {price.period}
              </span>
            </div>
            {price.note && (
              <span className="text-xs text-muted-foreground -mt-3">
                {price.note}
              </span>
            )}

            <Link href="https://playground.GIKA.AI.ai" className="w-full">
              <Button
                size="lg"
                variant="outline"
                className="w-full justify-center"
              >
                Get Started
                <ArrowRight />
              </Button>
            </Link>

            <ul className="space-y-3 w-full pt-2 border-t border-border">
              {generalFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </SlideEffect>

        {/* Enterprise Plan */}
        <SlideEffect delay={0.15} className="h-full">
          <div className="rounded-2xl text-sm md:text-base h-full bg-card border border-border/60 p-8 md:p-10 flex flex-col items-start justify-start text-start gap-4 md:gap-5 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <p className="text-sm text-muted-foreground">
                Your knowledge bases power the pipeline end to end — grounded,
                consistent, and hallucination-free.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">Custom</span>
            </div>

            <Link href="https://cal.com/gikagraph/30-mins" className="w-full">
              <Button
                size="lg"
                variant="outline"
                className="w-full justify-center"
              >
                Talk to Sales
                <ArrowRight />
              </Button>
            </Link>

            <ul className="space-y-3 w-full pt-2 border-t border-border">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </SlideEffect>
      </div>
    </div>
  );
}
