"use client";

import { Navbar } from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import { DataFlowSections } from "./components/data-flow-sections";
import { DataFlowArchitecture } from "./components/data-flow-architecture";
import { Network } from "lucide-react";

export default function DataFlowPage() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
      <div className="pt-4">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative space-y-8 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[100px] -z-10" />

        <SlideEffect>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.18em] text-primary font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Enterprise Data Architecture
          </div>
        </SlideEffect>

        <SlideEffect>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/55 max-w-4xl mx-auto">
            How GiKA Transforms Your Raw Data Into Intelligence
          </h1>
        </SlideEffect>

        <SlideEffect className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
          From raw data ingestion to actionable intelligence — see how GiKA
          transforms fragmented information into a unified knowledge graph with
          enterprise-grade security.
        </SlideEffect>
      </section>

      {/* Architecture Visual */}
      <SlideEffect>
        <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card/60 to-card/20 backdrop-blur-sm overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              GiKA Data Pipeline — Live Architecture
            </span>
          </div>
          <div className="flex justify-center px-4 py-2">
            <DataFlowArchitecture />
          </div>
          {/* RFP context callout */}
          <div className="mx-4 mb-4 flex items-start gap-3 border border-primary/20 rounded-xl px-4 py-3 bg-primary/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              From fragmented enterprise memory to absolute data sovereignty —
              see how GiKA architects{" "}
              <span className="text-foreground font-medium">
                hyper-precise RFP responses
              </span>{" "}
              with enterprise-grade security.
            </p>
          </div>
        </div>
      </SlideEffect>

      {/* Pipeline Stages */}
      <section className="space-y-10">
        <SlideEffect>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.18em] text-primary font-medium">
              Pipeline Stages
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
              Explore Each Stage
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Click through each stage to see how data transforms from raw
              inputs to intelligent insights.
            </p>
          </div>
        </SlideEffect>

        <DataFlowSections />
      </section>

      {/* Summary Cards */}
      <SlideEffect>
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/40 to-card/20 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Network className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Complete Data Pipeline
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Ingest & Normalize",
                desc: "Connect 50+ data sources → Normalize into unified format → Real-time streaming",
                color: "text-blue-400",
                border: "border-blue-500/20",
                bg: "bg-blue-500/5",
              },
              {
                step: "02",
                title: "Build Knowledge Graph",
                desc: "Extract entities → Map relationships → Enrich with external data → Apply access controls",
                color: "text-purple-400",
                border: "border-purple-500/20",
                bg: "bg-purple-500/5",
              },
              {
                step: "03",
                title: "Generate Insights",
                desc: "AI-powered analysis → Interactive dashboards → Smart alerts → Automated RFP responses",
                color: "text-primary",
                border: "border-primary/20",
                bg: "bg-primary/5",
              },
            ].map(({ step, title, desc, color, border, bg }) => (
              <div
                key={step}
                className={`space-y-3 p-4 rounded-xl border ${border} ${bg} transition-all hover:scale-[1.02]`}
              >
                <span className={`text-2xl font-bold font-mono ${color}`}>
                  {step}
                </span>
                <h4 className="font-medium text-sm text-foreground">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SlideEffect>
    </div>
  );
}
