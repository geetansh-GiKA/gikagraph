'use client'

import { useState, useEffect } from 'react'
import * as motion from "motion/react-m"
import { cn } from '@/lib/utils'
import { 
  LogIn, FolderOpen, Users, 
  ChevronRight, Check, Clock, ArrowRight,
  Upload, BarChart3, FileText, GitBranch, Play, Pause
} from 'lucide-react'
import { onboardingSteps } from '../data/onboarding'

function StepVisual({ step }: { step: typeof onboardingSteps[0] }) {
  const baseClasses = "w-full h-full rounded-xl border bg-card/50 overflow-hidden"
  
  if (step.visual === "auth") {
    return (
      <div className={cn(baseClasses, "p-4 flex flex-col items-center justify-center gap-3")}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center animate-pulse">
          <LogIn className="w-8 h-8 text-blue-500" />
        </div>
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="h-8 rounded-lg bg-muted/50 border" />
          <div className="h-8 rounded-lg bg-muted/50 border" />
          <div className="h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse" />
        </div>
      </div>
    )
  }

  if (step.visual === "home") {
    return (
      <div className={cn(baseClasses, "p-4")}>
        <div className="h-6 w-24 rounded bg-muted/50 mb-4" />
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 p-3 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
            <FolderOpen className="w-5 h-5 text-orange-500" />
            <span className="text-[10px] text-muted-foreground">Documents</span>
          </div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-3 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-[10px] text-muted-foreground">Workgroups</span>
          </div>
        </div>
      </div>
    )
  }

  if (step.visual === "docs") {
    return (
      <div className={cn(baseClasses, "p-4")}>
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-20 rounded bg-muted/50" />
          <div className="h-6 w-6 rounded bg-orange-500/20 flex items-center justify-center hover:rotate-90 transition-transform cursor-pointer">
            <span className="text-orange-500 text-xs">+</span>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border hover:bg-muted/50 transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 h-3 rounded bg-muted/50" />
              <Upload className="w-3 h-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (step.visual === "workgroup") {
    return (
      <div className={cn(baseClasses, "p-4")}>
        <div className="space-y-3">
          <div className="h-8 rounded-lg bg-muted/50 border" />
          <div className="h-16 rounded-lg bg-muted/50 border" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-[10px] text-purple-500">U{i}</span>
              </div>
            ))}
          </div>
          <div className="h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center animate-pulse">
            <span className="text-[10px] text-white font-medium">Create Workgroup</span>
          </div>
        </div>
      </div>
    )
  }

  if (step.visual === "workspace") {
    return (
      <div className={cn(baseClasses, "p-2")}>
        <div className="grid grid-cols-[60px_1fr_80px] gap-2 h-full">
          {/* Left sidebar */}
          <div className="rounded-lg bg-muted/30 p-2 space-y-2">
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-pink-500/20" />
            <div className="h-4 w-full rounded bg-muted/50" />
          </div>
          {/* Chat area */}
          <div className="rounded-lg bg-muted/30 p-2 flex flex-col">
            <div className="flex-1 space-y-2">
              <div className="h-6 w-3/4 rounded-lg bg-muted/50 ml-auto" />
              <div className="h-10 w-4/5 rounded-lg bg-pink-500/20 border border-pink-500/30 animate-pulse" />
            </div>
            <div className="h-6 rounded-lg bg-muted/50 border mt-2" />
          </div>
          {/* Right panel */}
          <div className="rounded-lg bg-muted/30 p-2 space-y-2">
            <div className="h-8 rounded bg-gradient-to-r from-pink-500/20 to-pink-600/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-pink-500" />
            </div>
            <div className="h-6 rounded bg-muted/50" />
            <div className="h-8 rounded bg-muted/50 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export function OnboardingFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // Start paused

  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % onboardingSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentStep = onboardingSteps[activeStep]
  const Icon = currentStep.icon

  return (
    <div className="space-y-8">
      {/* Step icons - no connecting line */}
      <div className="flex items-center justify-between px-2 md:px-4">
        {onboardingSteps.map((step, index) => {
          const StepIcon = step.icon
          const isActive = index === activeStep
          const isPast = index < activeStep
          
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all border-2",
                  isActive 
                    ? `bg-gradient-to-br ${step.color} border-transparent shadow-lg scale-110` 
                    : isPast 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-muted/50 border-border hover:border-primary/30 hover:scale-105"
                )}
              >
                {isPast ? (
                  <Check className="w-5 h-5 text-primary" />
                ) : (
                  <StepIcon className={cn(
                    "w-5 h-5 md:w-6 md:h-6",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                )}
              </div>
              <span className={cn(
                "text-[10px] md:text-xs font-medium transition-colors hidden sm:block",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </button>
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
        {/* Left: Step details */}
        <div className="rounded-2xl border bg-card/80 backdrop-blur p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                currentStep.color
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-medium">Step {currentStep.id}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentStep.duration}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">{currentStep.title}</h4>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{currentStep.description}</p>

          {/* Substeps with animation */}
          <div className="space-y-2">
            {currentStep.substeps.map((substep, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl transition-all",
                  substep.done ? "bg-primary/5" : "bg-muted/30"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  substep.done ? "bg-primary/20" : "bg-muted"
                )}>
                  {substep.done ? (
                    <Check className="w-3 h-3 text-primary" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span className={cn(
                  "text-sm",
                  substep.done ? "text-foreground" : "text-muted-foreground"
                )}>
                  {substep.text}
                </span>
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
            
            {/* Auto-play button - more prominent */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-sm border-2 dark:text-black",
                isAutoPlaying 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 dark:text-black" 
                  : "bg-muted/50 text-foreground border-border hover:border-primary hover:bg-primary/5 dark:text-black"
              )}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className='dark:text-black'>Playing</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse dark:text-black" />
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse delay-75 dark:text-black" />
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse delay-150 dark:text-black" />
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
              onClick={() => setActiveStep((prev) => Math.min(onboardingSteps.length - 1, prev + 1))}
              disabled={activeStep === onboardingSteps.length - 1}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Visual preview */}
        <div className="rounded-2xl border bg-gradient-to-br from-muted/30 to-muted/10 p-4 min-h-[300px] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 h-5 rounded bg-muted/50 max-w-[200px]" />
          </div>
          <div className="flex-1">
            <StepVisual step={currentStep} />
          </div>
        </div>
      </motion.div>

      {/* Flow arrows - showing the journey */}
      <div className="hidden md:flex items-center justify-center gap-1 py-4 flex-wrap">
        {onboardingSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setActiveStep(index)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                index === activeStep 
                  ? `bg-gradient-to-r ${step.color} text-white scale-105` 
                  : index < activeStep 
                    ? "bg-primary/10 text-primary hover:bg-primary/20" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {step.title}
            </button>
            {index < onboardingSteps.length - 1 && (
              <ArrowRight className={cn(
                "w-4 h-4 mx-1",
                index < activeStep ? "text-primary" : "text-muted-foreground/30"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
