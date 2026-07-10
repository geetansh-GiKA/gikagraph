"use client";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";

const settings = {
  badge: { text: "Need More?" },
  headline: "Top up anytime",
  description:
    "Run out of credits mid-cycle? Buy more without upgrading or renegotiating your plan.",
};

const generalAddons = [
  { name: "GiKA credits", amount: "1,000 credits", price: "$49" },
  { name: "GiKA credits", amount: "5,000 credits", price: "$199" },
  { name: "RFP credits", amount: "10 credits (~1 RFP)", price: "$149" },
];

const enterpriseAddons = [
  { name: "RFP credits", amount: "100 credits", price: "$1,490" },
  { name: "RFP credits", amount: "300 credits", price: "$3,990" },
  { name: "RFP credits", amount: "1,000 credits", price: "$9,990" },
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
    <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex items-center justify-between gap-4 text-sm border-t border-border pt-3 first:border-t-0 first:pt-0"
          >
            <div>
              <div className="font-medium text-foreground">{item.name}</div>
              <div className="text-muted-foreground">{item.amount}</div>
            </div>
            <div className="font-semibold text-foreground shrink-0">{item.price}</div>
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

      <SlideEffect delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        <AddonCard
          title="General plan add-ons"
          note="Top up GiKA or RFP credits as you go."
          items={generalAddons}
        />
        <AddonCard
          title="Enterprise plan add-ons"
          note="Additional RFP credit packs for high-volume months."
          items={enterpriseAddons}
        />
      </SlideEffect>
    </div>
  );
}
