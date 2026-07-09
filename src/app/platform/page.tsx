"use client";

import { useState, useTransition } from "react";
import { Navbar } from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import { cn } from "@/lib/utils";
import { DataFlowSections } from "./components/data-flow-sections";
import { DataFlowArchitecture } from "./components/data-flow-architecture";
import { OnboardingFlow } from "./components/onboarding-flow";
import { AnimatedBeamDemo } from "./components/animated-beam";
import { layers } from "./data/layers";
import { Network } from "lucide-react";
import dynamic from "next/dynamic";

const PrivateEquityDemo = dynamic(() => import("./components/private-equity"), {
  ssr: false,
});
const AssetManagementDemo = dynamic(
  () => import("./components/asset-management"),
  { ssr: false },
);
const WealthManagement = dynamic(
  () => import("./components/wealth-management"),
  { ssr: false },
);

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState<
    "private_equity" | "asset" | "wealth"
  >("private_equity");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: "private_equity" | "asset" | "wealth") => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <>
      <div className="h-1"></div>
      <Navbar pill />
      <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
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
            transforms fragmented information into a unified knowledge graph
            with enterprise-grade security.
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
                  <h4 className="font-medium text-sm text-foreground">
                    {title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SlideEffect>

        {/* Data → GiKA visual */}
        <div className="flex justify-center">
          <AnimatedBeamDemo />
        </div>

        {/* Toggle buttons + graphs */}
        <div className="space-y-6">
          <SlideEffect className="text-center space-y-2">
            <h3 className="text-base md:text-lg font-medium">
              See how it looks in different use cases
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Switch between different decision-intelligence scenarios.
            </p>
          </SlideEffect>

          <div className="space-y-4">
            {/* Toggle Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4">
              {/* COMPETITIVE ANALYSIS */}
              <button
                onClick={() => handleTabChange("private_equity")}
                className={cn(
                  "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                  activeTab === "private_equity"
                    ? "text-foreground shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:shadow",
                  isPending && "opacity-70",
                )}
              >
                Financial Data Analysis
              </button>

              {/* CUSTOMER SUPPORT */}
              <button
                onClick={() => handleTabChange("wealth")}
                className={cn(
                  "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                  activeTab === "wealth"
                    ? "text-foreground shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:shadow",
                  isPending && "opacity-70",
                )}
              >
                Customer Support
              </button>

              {/* FINANCIAL DATA ANALYSIS */}
              <button
                onClick={() => handleTabChange("asset")}
                className={cn(
                  "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                  activeTab === "asset"
                    ? "text-foreground shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:shadow",
                  isPending && "opacity-70",
                )}
              >
                Competitive Analysis
              </button>
            </div>
            {/* Selected Graph */}
            <div className="mt-4">
              <div
                className="transition-all duration-200 ease-in-out"
                style={{ minHeight: "420px" }}
              >
                {activeTab === "private_equity" && (
                  <div className="animate-in fade-in duration-200">
                    <PrivateEquityDemo />
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                      Example: leaders exploring exposures, performance and
                      scenarios across key initiatives.
                    </p>
                  </div>
                )}

                {activeTab === "wealth" && (
                  <div className="animate-in fade-in duration-200">
                    <WealthManagement />
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                      Example: teams answering complex questions about
                      customers, journeys, and outcomes in real time.
                    </p>
                  </div>
                )}

                {activeTab === "asset" && (
                  <div className="animate-in fade-in duration-200">
                    <AssetManagementDemo />
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                      Example: operators exploring performance, risk, and
                      scenarios across products, regions, or business units.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Four layers */}
        <section className="space-y-6 sm:space-y-8">
          <SlideEffect>
            <h3 className="text-lg md:text-2xl font-medium text-center">
              The four layers under the hood
            </h3>
          </SlideEffect>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {layers.map((layer) => (
              <SlideEffect key={layer.id}>
                <div className="group h-full rounded-2xl border bg-card/80 backdrop-blur p-5 md:p-6 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.17em] text-muted-foreground">
                      <span className="inline-flex size-4 items-center justify-center rounded-full bg-foreground/5 text-[9px]">
                        {layer.id}
                      </span>
                      {layer.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {layer.title}
                    </span>
                  </div>

                  <h4 className="text-base md:text-lg font-semibold">
                    {layer.title}
                  </h4>

                  <p className="text-sm text-muted-foreground">{layer.tldr}</p>

                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {layer.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/40 group-hover:bg-foreground/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SlideEffect>
            ))}
          </div>
        </section>

        {/* Onboarding Steps Section */}
        <section className="space-y-8">
          <SlideEffect>
            <div className="text-center space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">
                Getting Started
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
                Platform Onboarding Flow
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                From signup to AI-powered insights in minutes. Here&apos;s your
                complete journey through the platform.
              </p>
            </div>
          </SlideEffect>

          <OnboardingFlow />

          {/* Summary Card */}
          <SlideEffect>
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 md:p-8">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Complete Workflow Summary
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
                  <div className="text-2xl">1️⃣</div>
                  <h5 className="font-medium text-sm">Get Started</h5>
                  <p className="text-xs text-muted-foreground">
                    User logs in → Goes to Home → Chooses Document Repo or
                    Workgroup
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
                  <div className="text-2xl">2️⃣</div>
                  <h5 className="font-medium text-sm">Setup Data</h5>
                  <p className="text-xs text-muted-foreground">
                    Connect Knowledge Bases → Create workgroups → Assign users &
                    repos
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
                  <div className="text-2xl">3️⃣</div>
                  <h5 className="font-medium text-sm">Start Working</h5>
                  <p className="text-xs text-muted-foreground">
                    Chat with AI → View dashboard stats → Browse documents →
                    Explore AI reasoning graph
                  </p>
                </div>
              </div>
            </div>
          </SlideEffect>
        </section>
      </div>
    </>
  );
}
