"use client"

import { forwardRef, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import {
  Database, Network, BarChart3,
  FileText, Globe, Building2, Users, Bot
} from "lucide-react"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-10 md:size-12 items-center justify-center rounded-full border-2 bg-background p-2.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span className="text-[8px] md:text-[9px] text-muted-foreground font-medium text-center max-w-[60px]">
          {label}
        </span>
      )}
    </div>
  )
})
Circle.displayName = "Circle"

export function DataFlowArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Data sources (left)
  const dbRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLDivElement>(null)
  const erpRef = useRef<HTMLDivElement>(null)
  
  // Center - GiKA only
  const gikaRef = useRef<HTMLDivElement>(null)
  
  // Outputs (right) - 5 nodes
  const dashRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const reportRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const agentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[320px] md:h-[350px] w-full items-center justify-center overflow-visible p-4"
      ref={containerRef}
    >
      <div className="flex size-full max-w-4xl flex-row items-center justify-between gap-4 md:gap-8">
        {/* Left column - Data Sources */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <Circle ref={dbRef} className="border-blue-500/50 bg-blue-500/10" label="Databases">
            <Database className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          </Circle>
          <Circle ref={apiRef} className="border-green-500/50 bg-green-500/10" label="WebSearch">
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
          </Circle>
          <Circle ref={fileRef} className="border-orange-500/50 bg-orange-500/10" label="Files">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
          </Circle>
          <Circle ref={erpRef} className="border-purple-500/50 bg-purple-500/10" label="ERP/CRM">
            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
          </Circle>
        </div>

        {/* Center - GiKA Engine only */}
        <div className="flex items-center justify-center">
          <Circle ref={gikaRef} className="border-primary/50 bg-primary/10 size-16 md:size-20" label="GiKA Engine">
            <Image
              src="/logo.png"
              alt="GiKA"
              width={40}
              height={40}
              className="object-contain"
            />
          </Circle>
        </div>

        {/* Right column - Outputs (5 nodes) */}
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <Circle ref={dashRef} className="border-rose-500/50 bg-rose-500/10" label="Dashboard">
            <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
          </Circle>
          <Circle ref={alertRef} className="border-amber-500/50 bg-amber-500/10" label="Alerts">
            <Network className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
          </Circle>
          <Circle ref={reportRef} className="border-violet-500/50 bg-violet-500/10" label="Reports">
            <Network className="w-4 h-4 md:w-5 md:h-5 text-violet-500" />
          </Circle>
          <Circle ref={userRef} className="border-emerald-500/50 bg-emerald-500/10" label="Users">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
          </Circle>
          <Circle ref={agentRef} className="border-cyan-500/50 bg-cyan-500/10" label="Agent">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
          </Circle>
        </div>
      </div>

      {/* Animated Beams - Data Sources to GiKA */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dbRef}
        toRef={gikaRef}
        curvature={-50}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={apiRef}
        toRef={gikaRef}
        curvature={-20}
        gradientStartColor="#22c55e"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fileRef}
        toRef={gikaRef}
        curvature={20}
        gradientStartColor="#f97316"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={erpRef}
        toRef={gikaRef}
        curvature={50}
        gradientStartColor="#a855f7"
        gradientStopColor="#8b5cf6"
      />

      {/* GiKA to Outputs (5 destinations) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gikaRef}
        toRef={dashRef}
        curvature={-60}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f43f5e"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gikaRef}
        toRef={alertRef}
        curvature={-30}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gikaRef}
        toRef={reportRef}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gikaRef}
        toRef={userRef}
        curvature={30}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gikaRef}
        toRef={agentRef}
        curvature={60}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#06b6d4"
      />
    </div>
  )
}
