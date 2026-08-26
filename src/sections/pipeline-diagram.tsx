"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Database,
  Globe,
  FileText,
  Building2,
  Mail,
  BarChart3,
  Bell,
  Share2,
  Users,
  Bot,
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BeamCircle } from "@/components/ui/beam-circle";
import { cn } from "@/lib/utils";

export const pipelineInputs = [
  { key: "databases", label: "Databases", icon: Database },
  { key: "websearch", label: "WebSearch", icon: Globe },
  { key: "files", label: "Files", icon: FileText },
  { key: "erp", label: "ERP/CRM", icon: Building2 },
  { key: "email", label: "Email", icon: Mail },
];

export const pipelineOutputs = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "alerts", label: "Alerts", icon: Bell },
  { key: "reports", label: "Reports", icon: Share2 },
  { key: "users", label: "Users", icon: Users },
  { key: "agent", label: "Agent", icon: Bot },
];

export function PipelineDiagram({
  activeInputs,
  activeOutputs,
}: {
  activeInputs: string[];
  activeOutputs: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef(
    pipelineInputs.map(() => ({ current: null as HTMLDivElement | null })),
  );
  const outputRefs = useRef(
    pipelineOutputs.map(() => ({ current: null as HTMLDivElement | null })),
  );

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden flex items-center h-full">
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-between gap-4 px-6 py-10 md:px-10 md:py-12"
      >
        <div className="flex flex-col justify-between gap-5">
          {pipelineInputs.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeInputs.includes(item.key);
            return (
              <div key={item.key} className="flex flex-col items-center gap-1.5">
                <BeamCircle
                  ref={(el) => {
                    inputRefs.current[i].current = el;
                  }}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground/50",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </BeamCircle>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground/50",
                  )}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <BeamCircle
            ref={engineRef}
            className="size-14 md:size-16 border-foreground/30 bg-card text-foreground"
          >
            <Image
              src="/Company/Company.png"
              alt="GiKA"
              width={30}
              height={30}
              className="size-7 object-contain grayscale brightness-0"
            />
          </BeamCircle>
          <span className="text-xs font-semibold text-foreground">GiKAGraph</span>
        </div>

        <div className="flex flex-col justify-between gap-4">
          {pipelineOutputs.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeOutputs.includes(item.key);
            return (
              <div key={item.key} className="flex flex-col items-center gap-1.5">
                <BeamCircle
                  ref={(el) => {
                    outputRefs.current[i].current = el;
                  }}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground/50",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </BeamCircle>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground/50",
                  )}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {pipelineInputs.map((item, i) =>
          activeInputs.includes(item.key) ? (
            <AnimatedBeam
              key={`in-${item.key}`}
              containerRef={containerRef}
              fromRef={engineRef}
              toRef={inputRefs.current[i] as React.RefObject<HTMLDivElement>}
              curvature={0}
              duration={4}
              delay={i * 0.3}
              pathColor="var(--color-border)"
              pathOpacity={0.4}
              gradientStartColor="var(--color-foreground)"
              gradientStopColor="var(--color-foreground)"
            />
          ) : null,
        )}

        {pipelineOutputs.map((item, i) =>
          activeOutputs.includes(item.key) ? (
            <AnimatedBeam
              key={`out-${item.key}`}
              containerRef={containerRef}
              fromRef={engineRef}
              toRef={outputRefs.current[i] as React.RefObject<HTMLDivElement>}
              curvature={0}
              duration={4}
              delay={0.3 + i * 0.3}
              pathColor="var(--color-border)"
              pathOpacity={0.4}
              gradientStartColor="var(--color-foreground)"
              gradientStopColor="var(--color-foreground)"
            />
          ) : null,
        )}
      </div>
    </div>
  );
}
