"use client";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { HeartPlus } from "lucide-react";

const settings = {
  badge: { text: "Need More?" },
  headline: "Top up anytime",
  description:
    "Run out of credits mid-cycle? Buy more without upgrading or renegotiating your plan.",
};

const generalAddons = [
  { name: "GiKA credits", amount: "1,000 credits", price: "$99" },
  { name: "GiKA credits", amount: "5,000 credits", price: "$449" },
  { name: "GiKA credits", amount: "10,000 credits", price: "$849" },
];

const enterpriseAddons = [
  { name: "RFP credits", amount: "10 credits", price: "$99" },
  { name: "RFP credits", amount: "50 credits", price: "$449" },
  { name: "RFP credits", amount: "100 credits", price: "$849" },
];

function AddonCard({
  title,
  note,
  items,
}: {
  title: string;
  note: string;
  items: { name: string; amount: string; price: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 space-y-5 flex flex-col h-full">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
      </div>
      <ul className="space-y-3 mt-auto">
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex items-center justify-between gap-4 text-sm border-t border-border pt-3 first:border-t-0 first:pt-0"
          >
            <div>
              <div className="font-medium text-foreground">{item.name}</div>
              <div className="text-muted-foreground">{item.amount}</div>
            </div>
            <div className="font-semibold text-foreground shrink-0">
              {item.price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingAddons() {
  return (
    <div className="space-y-12 mx-auto">
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} Icon={HeartPlus} />
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

      <SlideEffect
        delay={0.15}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full items-stretch"
      >
        <AddonCard
          title="GiKA credits"
          note="Your team receives generous credits for collaboration, review, and iteration based on inputs/outputs through 1-to-1 Chat or group chat (called Threads) with the GiKA agent. This is the everyday work of shaping a response. 1,000 GiKA credits are sufficient to cover several hundred deep conversations, each grounded in your own enterprise context."
          items={generalAddons}
        />
        <AddonCard
          title="RFP credits"
          note="GiKA GRAPH provides a pool of dedicated credits for the AI-powered drafting, retrieval, and analysis that replaces hours of analyst time for preparing an RFP. 9 RFP credits are used to produce an end-to-end RFP response. If you stop early (e.g., due to a No-Go recommendation or a missing knockout requirement identified by GiKA), you save the remaining credits for the next RFP!"
          items={enterpriseAddons}
        />
      </SlideEffect>
    </div>
  );
}
