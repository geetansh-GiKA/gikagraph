"use client";

import { Check, Minus } from "lucide-react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";

const settings = {
  badge: { text: "Compare Plans" },
  headline: "Features and capabilities",
  description: "A closer look at what's included in every plan.",
};

const plans = ["General", "Enterprise"] as const;

type Cell = boolean | string;

const rows: { feature: string; values: [Cell, Cell] }[] = [
  { feature: "Upload & analyze RFPs", values: [true, true] },
  { feature: "Requirement identification", values: [true, true] },
  { feature: "Competitive analysis", values: [true, true] },
  { feature: "Chat with GiKA AI agent", values: [true, true] },
  { feature: "Collaboration (Threads)", values: [true, true] },
  { feature: "Customer knowledge base connection", values: [false, true] },
  { feature: "Deep research", values: [true, true] },
  {
    feature: "RFP credits",
    values: ["50/mo (~5 full RFPs)", "1,000/yr (~100 full RFPs)"],
  },
  { feature: "Additional credit top-ups", values: [true, true] },
  { feature: "Dedicated support & SLA", values: [false, true] },
  {
    feature: "Billing",
    values: ["Monthly, quarterly or yearly", "Annual, negotiated"],
  },
];

function Cell({ value }: { value: Cell }) {
  if (typeof value === "string") {
    return <span className="text-sm text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="size-4 text-muted-foreground mx-auto" />
  ) : (
    <Minus className="size-4 text-muted-foreground/40 mx-auto" />
  );
}

export default function PricingComparison() {
  return (
    <div className="space-y-12 mx-auto">
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} />
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

      <SlideEffect delay={0.15} className="w-full overflow-x-auto">
        <div className="min-w-[560px] max-w-4xl mx-auto rounded-2xl border border-border bg-card">
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-border">
            <div className="p-4 md:p-5" />
            {plans.map((plan) => (
              <div
                key={plan}
                className="p-4 md:p-5 text-center font-semibold text-sm md:text-base"
              >
                {plan}
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 items-center ${
                i !== rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-4 md:p-5 text-sm text-muted-foreground">
                {row.feature}
              </div>
              {row.values.map((value, j) => (
                <div key={j} className="p-4 md:p-5 text-center">
                  <Cell value={value} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </SlideEffect>
    </div>
  );
}
