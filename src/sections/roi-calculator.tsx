"use client";

import { useState } from "react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Calculator } from "lucide-react";

const settings = {
  badge: { text: "ROI Calculator" },
  headline: "See what GiKA.AI is worth to you",
  description:
    "Estimate the annual value GiKA.AI delivers across time saved on RFP responses, tooling consolidation, and win-rate lift.",
};

const MULTIPLIERS = {
  timeEfficiency: 0.4,
  toolingReduction: 0.3,
  winRateUplift: 0.15,
};

type Inputs = {
  rfpsPerYear: number;
  hoursPerRfp: number;
  teamSize: number;
  avgSalary: number;
  winRate: number;
  contractValue: number;
  toolingSpend: number;
};

const defaultInputs: Inputs = {
  rfpsPerYear: 50,
  hoursPerRfp: 20,
  teamSize: 5,
  avgSalary: 90000,
  winRate: 20,
  contractValue: 50000,
  toolingSpend: 2000,
};

const fields: {
  key: keyof Inputs;
  label: string;
  prefix?: string;
  suffix?: string;
}[] = [
  { key: "rfpsPerYear", label: "RFPs processed per year" },
  { key: "hoursPerRfp", label: "Avg. hours spent per RFP" },
  { key: "teamSize", label: "Team size working on RFPs" },
  {
    key: "toolingSpend",
    label: "Current tooling/proposal software spend",
    prefix: "$",
    suffix: "/mo",
  },
  { key: "avgSalary", label: "Avg. fully-loaded salary", prefix: "$" },
  { key: "winRate", label: "Current win rate", suffix: "%" },
  { key: "contractValue", label: "Avg. value per won RFP", prefix: "$" },
];

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function NumberField({
  label,
  prefix,
  suffix,
  value,
  onChange,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-foreground outline-none"
        />
        {suffix && <span className="text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 flex items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl md:text-2xl font-bold tracking-tight">
        {value}
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  const updateField = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const totalManualHours =
    inputs.rfpsPerYear * inputs.hoursPerRfp * inputs.teamSize;

  const timeSaved =
    (totalManualHours / 2080) * inputs.avgSalary * MULTIPLIERS.timeEfficiency;

  const toolingSaved = inputs.toolingSpend * 12 * MULTIPLIERS.toolingReduction;

  const revenueLift =
    inputs.rfpsPerYear *
    (inputs.winRate / 100) *
    MULTIPLIERS.winRateUplift *
    inputs.contractValue;

  const totalROI = timeSaved + toolingSaved + revenueLift;

  return (
    <div className="space-y-16 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text={settings.badge.text} Icon={Calculator} />
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

      {/* Inputs + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full items-start">
        {/* Left: Inputs */}
        <SlideEffect delay={0.1} direction="left">
          <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fields.map((field) => (
                <NumberField
                  key={field.key}
                  label={field.label}
                  prefix={field.prefix}
                  suffix={field.suffix}
                  value={inputs[field.key]}
                  onChange={(value) => updateField(field.key, value)}
                />
              ))}
            </div>
          </div>
        </SlideEffect>

        {/* Right: Output */}
        <SlideEffect
          delay={0.15}
          direction="right"
          className="lg:sticky lg:top-24"
        >
          <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-10 text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Total Annual ROI
            </div>
            <div className="text-4xl md:text-5xl font-bold tracking-tight">
              {formatUSD(totalROI)}
            </div>
          </div>

          <div className="space-y-3 mt-4.5">
            <StatCard label="Time saved / year" value={formatUSD(timeSaved)} />
            <StatCard
              label="Tooling saved / year"
              value={formatUSD(toolingSaved)}
            />
            <StatCard
              label="Win-rate revenue lift / year"
              value={formatUSD(revenueLift)}
            />
          </div>
        </SlideEffect>
      </div>
    </div>
  );
}
