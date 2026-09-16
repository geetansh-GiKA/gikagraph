"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const fitFactors = [
  { factor: "Capabilities", fit: 92 },
  { factor: "Strengths", fit: 88 },
  { factor: "Past Bids", fit: 78 },
  { factor: "Customers", fit: 85 },
  { factor: "Products", fit: 90 },
  { factor: "Competitive Position", fit: 74 },
  { factor: "Resources", fit: 82 },
  { factor: "Risks", fit: 65 },
  { factor: "Opportunities", fit: 95 },
];

const chartConfig = {
  fit: {
    label: "Fit Score",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

export default function FitScoreRadar() {
  return (
    <ChartContainer
      config={chartConfig}
      className="ml-auto mr-12 aspect-square w-full max-w-[360px] max-h-[360px]"
    >
      <RechartsRadarChart
        data={fitFactors}
        outerRadius="70%"
        margin={{ top: 0, right: -20, bottom: 0, left: -20 }}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="factor"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <Radar
          dataKey="fit"
          fill="var(--foreground)"
          fillOpacity={0.15}
          stroke="var(--foreground)"
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ChartContainer>
  );
}
