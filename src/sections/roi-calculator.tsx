"use client";

import { useState } from "react";

import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Calculator } from "lucide-react";

const settings = {
  badge: { text: "ROI Calculator" },
  headline: "See what is worth to you",
  description:
    "Estimate the annual value GiKA.AI delivers across time saved on RFP responses, tooling consolidation, and win-rate lift.",
};

// Calibrated against GiKA's base ROI model (1X = 24 RFPs/year):
// Direct Cost Savings = laborAutomationRate * RFPs * hoursPerRfp * hourlyRate
//                        + 12 * legacySoftwareMonthlyCost + fixedBaseSavings
const MULTIPLIERS = {
  gikaWinRateUplift: 10, // percentage points added on top of legacy win rate
  laborAutomationRate: 0.8,
  fixedBaseSavings: 4812,
};

type Inputs = {
  rfpsPerYear: number;
  hoursPerRfp: number;
  hourlyRate: number;
  toolingSpend: number;
  legacyWinRate: number;
  contractValue: number;
};

const BASE_RFPS_PER_YEAR = 24;
const MIN_BASE = 1;
const MAX_BASE = 5;

const defaultInputs: Inputs = {
  rfpsPerYear: BASE_RFPS_PER_YEAR,
  hoursPerRfp: 40,
  hourlyRate: 75,
  toolingSpend: 2000,
  legacyWinRate: 20,
  contractValue: 1000000,
};

const fields: {
  key: keyof Inputs;
  label: string;
  prefix?: string;
  suffix?: string;
}[] = [
  { key: "rfpsPerYear", label: "RFPs submitted per year" },
  { key: "hoursPerRfp", label: "Human hours per RFP " },
  {
    key: "hourlyRate",
    label: "Cost of human labor",
    prefix: "$",
    suffix: "/hr",
  },
  {
    key: "toolingSpend",
    label: "Cost of legacy software",
    prefix: "$",
    suffix: "/mo",
  },
  { key: "legacyWinRate", label: "Legacy win rate", suffix: "%" },
  { key: "contractValue", label: "Average contract value", prefix: "$" },
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
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-foreground/30">
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

function BaseSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Base RFP volume
        </span>
        <span className="text-sm font-semibold text-foreground">
          {value}x
        </span>
      </div>
      <input
        type="range"
        min={MIN_BASE}
        max={MAX_BASE}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-foreground"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {Array.from({ length: MAX_BASE - MIN_BASE + 1 }, (_, i) => (
          <span key={i}>{MIN_BASE + i}x</span>
        ))}
      </div>
    </div>
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
  const [base, setBase] = useState(1);

  const updateField = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateBase = (value: number) => {
    setBase(value);
    updateField("rfpsPerYear", BASE_RFPS_PER_YEAR * value);
  };

  const gikaWinRate = inputs.legacyWinRate + MULTIPLIERS.gikaWinRateUplift;

  const legacyRevenue =
    inputs.rfpsPerYear * (inputs.legacyWinRate / 100) * inputs.contractValue;

  const gikaRevenue =
    inputs.rfpsPerYear * (gikaWinRate / 100) * inputs.contractValue;

  const revenueLift = gikaRevenue - legacyRevenue;

  const laborSavings =
    MULTIPLIERS.laborAutomationRate *
    inputs.rfpsPerYear *
    inputs.hoursPerRfp *
    inputs.hourlyRate;

  const toolingSaved = inputs.toolingSpend * 12;

  const costSavings =
    laborSavings + toolingSaved + MULTIPLIERS.fixedBaseSavings;

  const totalROI = revenueLift + costSavings;

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

      {/* Total Impact */}
      <SlideEffect direction="top" className="max-w-2xl mx-auto w-full">
        <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-10 text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Total Annual Financial Impact
          </div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight">
            {formatUSD(totalROI)}
          </div>
        </div>
      </SlideEffect>

      {/* Inputs + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full items-start">
        {/* Left: Inputs */}
        <SlideEffect delay={0.1} direction="left">
          <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            <div className="mb-6 pb-6 border-b border-border/60">
              <BaseSlider value={base} onChange={updateBase} />
            </div>
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
          <div className="space-y-3">
            <StatCard
              label={`Legacy revenue (${inputs.legacyWinRate}% win rate)`}
              value={formatUSD(legacyRevenue)}
            />
            <StatCard
              label={`GiKA revenue (${gikaWinRate}% win rate)`}
              value={formatUSD(gikaRevenue)}
            />
            <StatCard
              label="New revenue unlocked"
              value={`+${formatUSD(revenueLift)}`}
            />
            <StatCard
              label="Direct cost savings"
              value={formatUSD(costSavings)}
            />
          </div>
        </SlideEffect>
      </div>
    </div>
  );
}
