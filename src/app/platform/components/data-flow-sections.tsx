"use client"

import { useState, useEffect, useRef, forwardRef } from "react"
import * as motion from "motion/react-m"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import {
  Database, Network, Shield, Zap, BarChart3,
  ChevronRight, Play, Pause, ArrowRight,
  FileText, Globe, Building2, Users, Lock, Eye,
  TrendingUp, Sparkles, Server,
  GitBranch, Layers, Brain, LineChart
} from "lucide-react"

// Node component for graph visualization
const GraphNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string; color?: string }
>(({ className, children, label, color = "bg-primary/20" }, ref) => (
  <div className="flex flex-col items-center gap-1">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 md:size-12 items-center justify-center rounded-xl border-2 bg-background p-2 shadow-lg transition-transform hover:scale-110",
        color,
        className
      )}
    >
      {children}
    </div>
    {label && <span className="text-[9px] md:text-[10px] text-muted-foreground font-medium">{label}</span>}
  </div>
))
GraphNode.displayName = "GraphNode"

// Data flow stages configuration
const dataFlowStages = [
  {
    id: 1,
    title: "Data Ingestion",
    subtitle: "Multi-Source Connectors",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    bgColor: "border-blue-500/30",
    description: "Enterprise-grade connectors pull structured and unstructured data from diverse sources — databases, APIs, files, and external tools.",
    duration: "Real-time",
    visual: "ingestion",
  },
  {
    id: 2,
    title: "Knowledge Graph",
    subtitle: "Entity Intelligence Engine",
    icon: Network,
    color: "from-purple-500 to-fuchsia-500",
    bgColor: "border-purple-500/30",
    description: "Our proprietary KG Engine extracts entities, derives relationships, and builds a living knowledge graph powered by advanced NLP.",
    duration: "<100ms",
    visual: "graph",
  },
  {
    id: 3,
    title: "Access Control",
    subtitle: "Role-Based Segmentation",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    bgColor: "border-emerald-500/30",
    description: "Granular access controls ensure data governance and compliance. Each role sees only what they're authorized to access.",
    duration: "SOC2 Certified",
    visual: "access",
  },
  {
    id: 4,
    title: "Data Enrichment",
    subtitle: "Internal Graph-Native",
    icon: Zap,
    color: "from-orange-500 to-amber-500",
    bgColor: "border-orange-500/30",
    description: "Our graph-native enrichment engine deeply parses and contextualizes your proprietary documents, dynamically extracting the precise entities and relationships required to auto-construct unassailable, compliant, and winning RFP responses in complex enterprise environments.",
    duration: "Internal Graph-Native",
    visual: "enrichment",
  },
  {
    id: 5,
    title: "Intelligence Layer",
    subtitle: "AI-Powered Insights",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
    bgColor: "border-pink-500/30",
    description: "A unified interface that transforms complex data into clear, actionable insights with AI-powered recommendations for RFP preparation — ideal for executives to review the most critical elements.",
    duration: "GiKA Engine",
    visual: "intelligence",
  },
]

// Visual components for each stage
function IngestionVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dbRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<HTMLDivElement>(null)
  const cloudRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<HTMLDivElement>(null)
  const webhookRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLDivElement>(null)
  const erpRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-6 md:gap-10 items-center w-full max-w-md">
        {/* Left column - sources */}
        <div className="flex flex-col gap-2 items-center">
          <GraphNode ref={dbRef} color="border-blue-500/50 bg-blue-500/10" label="Databases">
            <Database className="w-4 h-4 text-blue-500" />
          </GraphNode>
          <GraphNode ref={apiRef} color="border-green-500/50 bg-green-500/10" label="Documents">
            <Globe className="w-4 h-4 text-green-500" />
          </GraphNode>
          <GraphNode ref={cloudRef} color="border-cyan-500/50 bg-cyan-500/10" label="Cloud">
            <Server className="w-4 h-4 text-cyan-500" />
          </GraphNode>
          <GraphNode ref={streamRef} color="border-teal-500/50 bg-teal-500/10" label="File System">
            <Zap className="w-4 h-4 text-teal-500" />
          </GraphNode>
          <GraphNode ref={webhookRef} color="border-emerald-500/50 bg-emerald-500/10" label="WebSearch">
            <Network className="w-4 h-4 text-emerald-500" />
          </GraphNode>
        </div>

        {/* Center - GiKA */}
        <div className="flex justify-center">
          <GraphNode ref={centerRef} color="border-primary/50 bg-primary/10" label="GiKA" className="size-14 md:size-16">
            <Server className="w-7 h-7 text-primary" />
          </GraphNode>
        </div>

        {/* Right column - more sources */}
        <div className="flex flex-col gap-4 items-center">
          <GraphNode ref={fileRef} color="border-orange-500/50 bg-orange-500/10" label="Files">
            <FileText className="w-5 h-5 text-orange-500" />
          </GraphNode>
          <GraphNode ref={erpRef} color="border-purple-500/50 bg-purple-500/10" label="SAP/ERP">
            <Building2 className="w-5 h-5 text-purple-500" />
          </GraphNode>
        </div>
      </div>

      {/* Animated beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={dbRef} toRef={centerRef} curvature={-50} gradientStartColor="#3b82f6" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={apiRef} toRef={centerRef} curvature={-25} gradientStartColor="#22c55e" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={cloudRef} toRef={centerRef} gradientStartColor="#06b6d4" gradientStopColor="#6ECE9D" />
      <AnimatedBeam containerRef={containerRef} fromRef={streamRef} toRef={centerRef} curvature={25} gradientStartColor="#14b8a6" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={webhookRef} toRef={centerRef} curvature={50} gradientStartColor="#10b981" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={fileRef} toRef={centerRef} curvature={-30} reverse gradientStartColor="#f97316" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={erpRef} toRef={centerRef} curvature={30} reverse gradientStartColor="#a855f7" gradientStopColor="#06b6d4" />
    </div>
  )
}

function GraphVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const clusterRef = useRef<HTMLDivElement>(null)
  const entityRef = useRef<HTMLDivElement>(null)
  const relationRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const outputRef1 = useRef<HTMLDivElement>(null)
  const outputRef2 = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-6 md:gap-10 items-center w-full max-w-md">
        {/* Input */}
        <div className="flex flex-col gap-3 items-center">
          <GraphNode ref={clusterRef} color="border-violet-500/50 bg-violet-500/10" label="Clusters">
            <Layers className="w-5 h-5 text-violet-500" />
          </GraphNode>
          <GraphNode ref={entityRef} color="border-purple-500/50 bg-purple-500/10" label="Entities">
            <Users className="w-5 h-5 text-purple-500" />
          </GraphNode>
          <GraphNode ref={relationRef} color="border-fuchsia-500/50 bg-fuchsia-500/10" label="Relations">
            <GitBranch className="w-5 h-5 text-fuchsia-500" />
          </GraphNode>
        </div>

        {/* Center - KG Engine */}
        <div className="flex justify-center">
          <GraphNode ref={centerRef} color="border-purple-500/50 bg-purple-500/10" label="KG Engine" className="size-14 md:size-16">
            <Network className="w-7 h-7 text-purple-500" />
          </GraphNode>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4 items-center">
          <GraphNode ref={outputRef1} color="border-violet-500/50 bg-violet-500/10" label="Graph DB">
            <Layers className="w-5 h-5 text-violet-500" />
          </GraphNode>
          <GraphNode ref={outputRef2} color="border-pink-500/50 bg-pink-500/10" label="Vectors">
            <Brain className="w-5 h-5 text-pink-500" />
          </GraphNode>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={clusterRef} toRef={centerRef} curvature={-40} gradientStartColor="#8b5cf6" gradientStopColor="#a855f7" />
      <AnimatedBeam containerRef={containerRef} fromRef={entityRef} toRef={centerRef} gradientStartColor="#a855f7" gradientStopColor="#d946ef" />
      <AnimatedBeam containerRef={containerRef} fromRef={relationRef} toRef={centerRef} curvature={40} gradientStartColor="#d946ef" gradientStopColor="#a855f7" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={outputRef1} curvature={-25} gradientStartColor="#a855f7" gradientStopColor="#8b5cf6" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={outputRef2} curvature={25} gradientStartColor="#d946ef" gradientStopColor="#ec4899" />
    </div>
  )
}

function AccessVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)
  const shieldRef = useRef<HTMLDivElement>(null)
  const lpRef = useRef<HTMLDivElement>(null)
  const analystRef = useRef<HTMLDivElement>(null)
  const adminRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-6 md:gap-10 items-center w-full max-w-md">
        {/* Data source */}
        <div className="flex justify-center">
          <GraphNode ref={dataRef} color="border-emerald-500/50 bg-emerald-500/10" label="Data Lake">
            <Database className="w-5 h-5 text-emerald-500" />
          </GraphNode>
        </div>

        {/* Shield */}
        <div className="flex justify-center">
          <GraphNode ref={shieldRef} color="border-emerald-500/50 bg-emerald-500/10" label="RBAC" className="size-14 md:size-16">
            <Shield className="w-7 h-7 text-emerald-500" />
          </GraphNode>
        </div>

        {/* Role outputs */}
        <div className="flex flex-col gap-3 items-center">
          <GraphNode ref={lpRef} color="border-teal-500/50 bg-teal-500/10" label="LP View">
            <Eye className="w-4 h-4 text-teal-500" />
          </GraphNode>
          <GraphNode ref={analystRef} color="border-cyan-500/50 bg-cyan-500/10" label="Analyst">
            <Users className="w-4 h-4 text-cyan-500" />
          </GraphNode>
          <GraphNode ref={adminRef} color="border-green-500/50 bg-green-500/10" label="Admin">
            <Lock className="w-4 h-4 text-green-500" />
          </GraphNode>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={dataRef} toRef={shieldRef} gradientStartColor="#10b981" gradientStopColor="#14b8a6" />
      <AnimatedBeam containerRef={containerRef} fromRef={shieldRef} toRef={lpRef} curvature={-40} gradientStartColor="#14b8a6" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={shieldRef} toRef={analystRef} gradientStartColor="#10b981" gradientStopColor="#06b6d4" />
      <AnimatedBeam containerRef={containerRef} fromRef={shieldRef} toRef={adminRef} curvature={40} gradientStartColor="#14b8a6" gradientStopColor="#22c55e" />
    </div>
  )
}

function EnrichmentVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const gnedRef = useRef<HTMLDivElement>(null)
  const kgRef = useRef<HTMLDivElement>(null)
  const propRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-6 md:gap-10 items-center w-full max-w-md">
        {/* Input */}
        <div className="flex justify-center">
          <GraphNode ref={dataRef} color="border-orange-500/50 bg-orange-500/10" label="Raw Data">
            <Database className="w-5 h-5 text-orange-500" />
          </GraphNode>
        </div>

        {/* Center - Enrichment Engine */}
        <div className="flex justify-center">
          <GraphNode ref={centerRef} color="border-orange-500/50 bg-orange-500/10" label="Enrichment" className="size-14 md:size-16">
            <Zap className="w-7 h-7 text-orange-500" />
          </GraphNode>
        </div>

        {/* RFP-native outputs */}
        <div className="flex flex-col gap-2 items-center">
          <GraphNode ref={gnedRef} color="border-amber-500/50 bg-amber-500/10" label="GNED">
            <Network className="w-4 h-4 text-amber-500" />
          </GraphNode>
          <GraphNode ref={kgRef} color="border-orange-400/50 bg-orange-400/10" label="KG Map">
            <GitBranch className="w-4 h-4 text-orange-400" />
          </GraphNode>
          <GraphNode ref={propRef} color="border-yellow-500/50 bg-yellow-500/10" label="Properties">
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </GraphNode>
          <GraphNode ref={crossRef} color="border-amber-600/50 bg-amber-600/10" label="Alignment">
            <Layers className="w-4 h-4 text-amber-600" />
          </GraphNode>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={dataRef} toRef={centerRef} gradientStartColor="#f97316" gradientStopColor="#f59e0b" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={gnedRef} curvature={-35} gradientStartColor="#f59e0b" gradientStopColor="#f59e0b" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={kgRef} curvature={-12} gradientStartColor="#f97316" gradientStopColor="#fb923c" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={propRef} curvature={12} gradientStartColor="#f59e0b" gradientStopColor="#eab308" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={crossRef} curvature={35} gradientStartColor="#f97316" gradientStopColor="#d97706" />
    </div>
  )
}

function IntelligenceVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const dashRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const reportRef = useRef<HTMLDivElement>(null)
  const chatbotRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-6 md:gap-10 items-center w-full max-w-md">
        {/* Input */}
        <div className="flex flex-col gap-4 items-center">
          <GraphNode ref={graphRef} color="border-pink-500/50 bg-pink-500/10" label="KG Data">
            <Network className="w-5 h-5 text-pink-500" />
          </GraphNode>
        </div>

        {/* Center - AI Engine */}
        <div className="flex justify-center">
          <GraphNode ref={aiRef} color="border-pink-500/50 bg-pink-500/10" label="GIKA" className="size-14 md:size-16">
            <Sparkles className="w-7 h-7 text-pink-500" />
          </GraphNode>
        </div>

        {/* Outputs */}
        <div className="flex flex-col gap-2 items-center">
          <GraphNode ref={dashRef} color="border-rose-500/50 bg-rose-500/10" label="Dashboard">
            <BarChart3 className="w-4 h-4 text-rose-500" />
          </GraphNode>
          <GraphNode ref={alertRef} color="border-red-500/50 bg-red-500/10" label="Alerts">
            <TrendingUp className="w-4 h-4 text-red-500" />
          </GraphNode>
          <GraphNode ref={reportRef} color="border-fuchsia-500/50 bg-fuchsia-500/10" label="Reports">
            <LineChart className="w-4 h-4 text-fuchsia-500" />
          </GraphNode>
          <GraphNode ref={chatbotRef} color="border-purple-500/50 bg-purple-500/10" label="ChatBot">
            <Brain className="w-4 h-4 text-purple-500" />
          </GraphNode>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={graphRef} toRef={aiRef} gradientStartColor="#ec4899" gradientStopColor="#f43f5e" />
      <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={dashRef} curvature={-50} gradientStartColor="#f43f5e" gradientStopColor="#fb7185" />
      <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={alertRef} curvature={-20} gradientStartColor="#ec4899" gradientStopColor="#ef4444" />
      <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={reportRef} curvature={20} gradientStartColor="#f43f5e" gradientStopColor="#d946ef" />
      <AnimatedBeam containerRef={containerRef} fromRef={aiRef} toRef={chatbotRef} curvature={50} gradientStartColor="#ec4899" gradientStopColor="#a855f7" />
    </div>
  )
}

// Visual selector component
function StageVisual({ stage }: { stage: typeof dataFlowStages[0] }) {
  if (stage.visual === "ingestion") return <IngestionVisual />
  if (stage.visual === "graph") return <GraphVisual />
  if (stage.visual === "access") return <AccessVisual />
  if (stage.visual === "enrichment") return <EnrichmentVisual />
  if (stage.visual === "intelligence") return <IntelligenceVisual />
  return null
}

// Stats for each stage
const stageStats: Record<number, { value: string; label: string }[]> = {
  1: [
    { value: "50+", label: "Data Sources" },
    { value: "<100ms", label: "Latency" },
    { value: "99.9%", label: "Uptime" },
  ],
  2: [
    { value: "1M+", label: "Entities" },
    { value: "10M+", label: "Relations" },
    { value: "99.2%", label: "Accuracy" },
  ],
  3: [
    { value: "∞", label: "Roles" },
    { value: "Full", label: "Audit Trail" },
    { value: "SOC2", label: "Certified" },
  ],
  4: [
    { value: "100%", label: "Doc Coverage" },
    { value: "Deep", label: "Parsing" },
    { value: "Verified", label: "QA Checks" },
  ],
  5: [
    { value: "Custom", label: "Views" },
    { value: "Any", label: "Export" },
    { value: "RFP", label: "Ready" },
  ],
}

// Features for each stage
const stageFeatures: Record<number, { icon: typeof Database; text: string }[]> = {
  1: [
    { icon: Database, text: "MySQL, PostgreSQL, MongoDB" },
    { icon: Globe, text: "REST APIs, GraphQL, WebSocket" },
    { icon: FileText, text: "CSV, Excel, PDF, JSON" },
    { icon: Building2, text: "SAP, Salesforce, Oracle" },
  ],
  2: [
    { icon: Users, text: "Entity Extraction (People, Companies)" },
    { icon: Network, text: "Relationship Mapping" },
    { icon: Sparkles, text: "Attribute Enrichment" },
    { icon: TrendingUp, text: "Real-time Updates" },
  ],
  3: [
    { icon: Eye, text: "Executive View: KPIs & Outcomes" },
    { icon: Users, text: "Analyst View: Full Operational Data" },
    { icon: Lock, text: "Prevents Data Leakage" },
    { icon: Shield, text: "SOC2 Compliant" },
  ],
  4: [
    { icon: Network, text: "Graph-Native Entity Discovery (GNED)" },
    { icon: GitBranch, text: "Knowledge Graph Relationship Discovery" },
    { icon: Sparkles, text: "Deep Entity Property & Attribute Extraction" },
    { icon: Layers, text: "Cross-Source Entity Canonicalization" },
  ],
  5: [
    { icon: Network, text: "Interactive Graph Explorer" },
    { icon: Sparkles, text: "AI-Powered Insights" },
    { icon: TrendingUp, text: "Smart Alerts & Heatmaps" },
    { icon: FileText, text: "Automated Reports" },
    { icon: Shield, text: "RFP Response Automation — precise, compliant, winning" },
  ],
}

export function DataFlowSections() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % dataFlowStages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentStage = dataFlowStages[activeStep]
  const Icon = currentStage.icon
  const features = stageFeatures[currentStage.id] || []
  const stats = stageStats[currentStage.id] || []

  return (
    <div className="space-y-8">
      {/* Arrow-connected pill nav at the top */}
      <div className="flex items-center justify-center flex-wrap gap-0">
        {dataFlowStages.map((stage, index) => {
          const isActive = index === activeStep
          const isPast = index < activeStep
          return (
            <div key={stage.id} className="flex items-center">
              <button
                onClick={() => setActiveStep(index)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border",
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white border-transparent shadow-lg shadow-violet-500/25 scale-105"
                    : isPast
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                    : "bg-muted/60 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                )}
              >
                {stage.title}
              </button>
              {index < dataFlowStages.length - 1 && (
                <ArrowRight className={cn(
                  "w-4 h-4 mx-1.5 shrink-0",
                  index < activeStep ? "text-primary" : "text-muted-foreground/40"
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Main content area */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Left: Visual preview with graph nodes */}
        <div className="rounded-2xl border bg-gradient-to-br from-muted/30 to-muted/10 p-4 min-h-[300px] flex flex-col order-2 md:order-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 h-5 rounded bg-muted/50 max-w-[200px]" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <StageVisual stage={currentStage} />
          </div>
          {/* Stats overlay */}
          <div className="mt-4 flex gap-3 p-3 rounded-xl bg-background/80 backdrop-blur border border-border/50">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 text-center">
                <p className="text-sm md:text-base font-bold text-primary">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* RFP context callout — shown on Knowledge Graph stage */}
          {currentStage.id === 2 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2.5 border border-purple-500/25 rounded-xl px-3 py-2.5 bg-purple-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  For RFPs, this is{" "}
                  <span className="text-foreground font-medium">central to the architecture</span>
                  {" "}— indexing and pointing to where information lives without duplicating it.
                </p>
              </div>
              <div className="flex items-start gap-2.5 border border-purple-500/25 rounded-xl px-3 py-2.5 bg-purple-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Unlimited files</span>
                  {" "}can be uploaded — no cap on document volume.
                </p>
              </div>
            </div>
          )}

          {/* Access Control callouts — Stage 3 */}
          {currentStage.id === 3 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2.5 border border-emerald-500/25 rounded-xl px-3 py-2.5 bg-emerald-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Security and data integrity</span>
                  {" "}— avoiding data leakage is critical for RFP stakeholders and decision makers.
                </p>
              </div>
              <div className="flex items-start gap-2.5 border border-emerald-500/25 rounded-xl px-3 py-2.5 bg-emerald-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Built for{" "}
                  <span className="text-foreground font-medium">business users and executives</span>
                  {" "}— not just the technical layer. Each role sees exactly what they need.
                </p>
              </div>
            </div>
          )}

          {/* RFP context callout — shown on Intelligence Layer stage */}
          {currentStage.id === 5 && (
            <div className="mt-3 flex items-start gap-2.5 border border-violet-500/25 rounded-xl px-3 py-2.5 bg-violet-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                GiKA powers{" "}
                <span className="text-foreground font-medium">hyper-precise RFP responses</span>
                {" "}— turning your unified knowledge graph into winning, enterprise-grade proposals.
              </p>
            </div>
          )}
        </div>

        {/* Right: Step details */}
        <div className="rounded-2xl border bg-card/80 backdrop-blur p-6 space-y-5 order-1 md:order-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                currentStage.color
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-medium">Stage {currentStage.id}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {currentStage.duration}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">{currentStage.title}</h4>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{currentStage.description}</p>

          {/* Features with animation */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
                  "bg-muted/30 hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
                  currentStage.color
                )}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Previous
            </button>

            {/* Auto-play button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm border-2",
                isAutoPlaying
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-muted/50 text-foreground border-border hover:border-primary hover:bg-primary/5"
              )}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Playing</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse delay-75" />
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveStep((prev) => Math.min(dataFlowStages.length - 1, prev + 1))}
              disabled={activeStep === dataFlowStages.length - 1}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
