"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/sections/footer"
import SlideEffect from "@/components/slide-effect"
import { DataFlowSections } from "./components/data-flow-sections"
import { DataFlowArchitecture } from "./components/data-flow-architecture"

export default function DataFlowPage() {
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
              Enterprise Data Architecture
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 -mt-4">
              How GiKA Transforms Your Raw Data Into Intelligence
            </h2>
          </SlideEffect>

          <SlideEffect className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
            From raw data ingestion to actionable intelligence — see how GiKA transforms
            fragmented information into a unified knowledge graph with enterprise-grade security.
          </SlideEffect>
        </div>
      </section>

      {/* Full Pipeline Architecture Visual */}
      <div className="flex justify-center">
        <DataFlowArchitecture />
      </div>

      {/* Interactive Data Flow Stages */}
      <section className="space-y-8">
        <SlideEffect>
          <div className="text-center space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-medium">
              Pipeline Stages
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
              Explore Each Stage
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Click through each stage to see how data transforms from raw inputs to intelligent insights.
            </p>
          </div>
        </SlideEffect>

        <DataFlowSections />
      </section>

      {/* Summary Card */}
      <SlideEffect>
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 md:p-8">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-xl">🔄</span>
            Complete Data Pipeline
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
              <div className="text-2xl">1️⃣</div>
              <h5 className="font-medium text-sm">Ingest & Normalize</h5>
              <p className="text-xs text-muted-foreground">Connect 50+ data sources → Normalize into unified format → Real-time streaming</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
              <div className="text-2xl">2️⃣</div>
              <h5 className="font-medium text-sm">Build Knowledge Graph</h5>
              <p className="text-xs text-muted-foreground">Extract entities → Map relationships → Enrich with external data → Apply access controls</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-background/50 border">
              <div className="text-2xl">3️⃣</div>
              <h5 className="font-medium text-sm">Generate Insights</h5>
              <p className="text-xs text-muted-foreground">AI-powered analysis → Interactive dashboards → Smart alerts → Automated reports</p>
            </div>
          </div>
        </div>
      </SlideEffect>

      {/* Outcome / CTA section */}
      <section className="pt-4 sm:pt-8">
        <SlideEffect className="rounded-2xl border bg-gradient-to-br from-background via-background to-muted/40 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-base md:text-lg font-medium">
              What this architecture enables
            </h3>
            <p className="text-sm text-muted-foreground">
              Your team stops hunting across tools and starts asking questions like:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• &quot;Which LPs are most exposed to this sector?&quot;</li>
              <li>• &quot;Where did we discuss this company in the last quarter?&quot;</li>
              <li>• &quot;What changed since the last IC memo?&quot;</li>
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

