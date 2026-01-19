"use client"

import { useState, useTransition } from "react"
import { Navbar } from "@/components/navbar"
import { SlideEffect } from "@/components/slide-effect"
import { cn } from "@/lib/utils"
import { Footer } from "@/sections/footer"
import { OnboardingFlow } from "./components/onboarding-flow"
import { AnimatedBeamDemo } from "./components/animated-beam"
import { layers } from "./data/layers"
import dynamic from "next/dynamic"

const PrivateEquityDemo = dynamic( () => import("./components/private-equity"), { ssr: false })
const AssetManagementDemo = dynamic( () => import("./components/asset-management"), { ssr: false })
const WealthManagement = dynamic( () => import("./components/wealth-management"), { ssr: false })

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"private_equity" | "asset" | "wealth">(
    "private_equity"
  )
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (tab: "private_equity" | "asset" | "wealth") => {
    startTransition(() => {
      setActiveTab(tab)
    })
  }

  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <div className="pt-4">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="space-y-6 -mb-0">
        <div className="space-y-5 mx-auto text-center">
          <SlideEffect>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              For data‑driven teams across industries
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 -mt-4">
              How GiKA plugs into your existing stack
            </h2>
          </SlideEffect>

          <SlideEffect className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
            We connect to your business data, normalize it into a knowledge graph,
            tune an LLM to your workflows, and expose everything through a
            single query interface your team can actually use.
          </SlideEffect>
        </div>
      </section>

      {/* Data → GiKA visual */}
      <div className="flex justify-center mt-8">
        <AnimatedBeamDemo />
      </div>

      {/* Toggle buttons + graphs */}
      <div className="mt-2 space-y-6">
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
            {/* STRATEGIC PLANNING */}
            <button
              onClick={() => handleTabChange("private_equity")}
              className={cn(
                "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                activeTab === "private_equity"
                  ? "text-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:shadow",
                isPending && "opacity-70"
              )}
            >
              Strategic Planning
            </button>
            
            {/* CUSTOMER OPERATIONS */}
            <button
              onClick={() => handleTabChange("wealth")}
              className={cn(
                "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                activeTab === "wealth"
                  ? "text-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:shadow",
                isPending && "opacity-70"
              )}
            >
              Customer Operations
            </button>
            
            {/* RISK & PERFORMANCE */}
            <button
              onClick={() => handleTabChange("asset")}
              className={cn(
                "px-6 py-2 rounded-2xl text-sm border bg-card shadow-sm transition-all duration-200 w-full sm:w-auto text-center",
                activeTab === "asset"
                  ? "text-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:shadow",
                isPending && "opacity-70"
              )}
            >
              Risk & Performance
            </button>
          </div>
          {/* Selected Graph */}
          <div className="mt-4">
            <div 
              className="transition-all duration-200 ease-in-out"
              style={{ minHeight: '420px' }}
            >
              {activeTab === "private_equity" && (
                <div className="animate-in fade-in duration-200">
                  <PrivateEquityDemo />
                  <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                    Example: leaders exploring exposures, performance and scenarios across
                    key initiatives.
                  </p>
                </div>
              )}

              {activeTab === "wealth" && (
                <div className="animate-in fade-in duration-200">
                  <WealthManagement />
                  <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                    Example: teams answering complex questions about customers, journeys, and outcomes in real time.
                  </p>
                </div>
              )}

              {activeTab === "asset" && (
                <div className="animate-in fade-in duration-200">
                  <AssetManagementDemo />
                  <p className="mt-3 text-xs md:text-sm text-muted-foreground text-center">
                    Example: operators exploring performance, risk, and scenarios across products, regions, or business units.
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
          <h3 className="text-lg md:text-2xl font-medium text-center -mt-4">
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

                <p className="text-sm text-muted-foreground">
                  {layer.tldr}
                </p>

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
              From signup to AI-powered insights in minutes. Here&apos;s your complete journey through the platform.
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
                <p className="text-xs text-muted-foreground">User logs in → Goes to Home → Chooses Document Repo or Workgroup</p>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
                <div className="text-2xl">2️⃣</div>
                <h5 className="font-medium text-sm">Setup Data</h5>
                <p className="text-xs text-muted-foreground">Create document repos → Upload documents → Create workgroups → Assign users & repos</p>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
                <div className="text-2xl">3️⃣</div>
                <h5 className="font-medium text-sm">Start Working</h5>
                <p className="text-xs text-muted-foreground">Chat with AI → View dashboard stats → Browse documents → Explore AI reasoning graph</p>
              </div>
            </div>
          </div>
        </SlideEffect>
      </section>

      {/* Outcome / CTA section */}
      <section className="pt-4 sm:pt-8">
        <SlideEffect className="rounded-2xl border bg-gradient-to-br from-background via-background to-muted/40 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-base md:text-lg font-medium">
              What this unlocks
            </h3>
            <p className="text-sm text-muted-foreground">
              Your team stops hunting across tools and starts asking questions
              like:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• “Which LPs are most exposed to this sector?”</li>
              <li>• “Where did we discuss this company in the last quarter?”</li>
              <li>• “What changed since the last IC memo?”</li>
            </ul>
          </div>
        </SlideEffect>
      </section>

      <div className="pt-8 sm:pt-10">
        <Footer />
      </div>
    </div>
  )
}
