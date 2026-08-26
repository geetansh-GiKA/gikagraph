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
import SlideEffect from "@/components/slide-effect";

const inputs = [
  { key: "databases", label: "Databases", icon: Database },
  { key: "websearch", label: "WebSearch", icon: Globe },
  { key: "files", label: "Files", icon: FileText },
  { key: "erp", label: "ERP/CRM", icon: Building2 },
  { key: "email", label: "Email", icon: Mail },
];

const outputs = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "alerts", label: "Alerts", icon: Bell },
  { key: "reports", label: "Reports", icon: Share2 },
  { key: "users", label: "Users", icon: Users },
  { key: "agent", label: "Agent", icon: Bot },
];

export default function DataPipelineBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);

  const inputRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const outputRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <SlideEffect delay={0.15}>
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-between gap-4 px-10 py-8 md:px-36 md:py-10"
      >
        {/* Inputs */}
        <div className="flex flex-col justify-between gap-6 md:gap-8">
          {inputs.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex flex-col items-center gap-1.5">
                <BeamCircle ref={inputRefs[i]} className="border-border text-foreground">
                  <Icon className="size-5 md:size-6" strokeWidth={1.75} />
                </BeamCircle>
                <span className="text-[11px] text-muted-foreground font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Engine */}
        <div className="flex flex-col items-center gap-1.5">
          <BeamCircle
            ref={engineRef}
            className="size-16 md:size-20 border-foreground/30 bg-card text-foreground"
          >
            <Image
              src="/Company/Company.png"
              alt="GiKA"
              width={36}
              height={36}
              className="size-8 md:size-9 object-contain"
            />
          </BeamCircle>
          <span className="text-xs font-semibold text-foreground">
            GiKAGraph
          </span>
        </div>

        {/* Outputs */}
        <div className="flex flex-col justify-between gap-5 md:gap-6">
          {outputs.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex flex-col items-center gap-1.5">
                <BeamCircle ref={outputRefs[i]} className="border-border text-foreground">
                  <Icon className="size-5 md:size-6" strokeWidth={1.75} />
                </BeamCircle>
                <span className="text-[11px] text-muted-foreground font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Beams: inputs -> engine */}
        {inputRefs.map((ref, i) => (
          <AnimatedBeam
            key={`in-${inputs[i].key}`}
            containerRef={containerRef}
            fromRef={engineRef}
            toRef={ref}
            curvature={0}
            duration={4}
            delay={i * 0.4}
            pathColor="var(--color-border)"
            pathOpacity={0.4}
            gradientStartColor="var(--color-foreground)"
            gradientStopColor="var(--color-foreground)"
          />
        ))}

        {/* Beams: engine -> outputs */}
        {outputRefs.map((ref, i) => (
          <AnimatedBeam
            key={`out-${outputs[i].key}`}
            containerRef={containerRef}
            fromRef={engineRef}
            toRef={ref}
            curvature={0}
            duration={4}
            delay={0.5 + i * 0.4}
            pathColor="var(--color-border)"
            pathOpacity={0.4}
            gradientStartColor="var(--color-foreground)"
            gradientStopColor="var(--color-foreground)"
          />
        ))}
      </div>
    </SlideEffect>
  );
}
