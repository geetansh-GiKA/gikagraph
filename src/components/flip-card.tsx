'use client'

import { useState, ReactNode } from 'react'
import { RotateCcw, Check } from 'lucide-react'

interface FlipCardProps {
  frontTitle: string
  frontContent: string
  solutionTitle: string
  solutionPoints: string[]
  carousel?: ReactNode
  icon?: ReactNode
  accentColor?: string // tailwind bg class e.g. "bg-violet-500"
  accentTextColor?: string // tailwind text class e.g. "text-violet-400"
  accentBorderColor?: string // tailwind border class e.g. "border-violet-500/30"
}

export default function FlipCard({
  frontTitle,
  frontContent,
  solutionTitle,
  solutionPoints,
  carousel,
  icon,
  accentColor = 'bg-primary',
  accentTextColor = 'text-primary',
  accentBorderColor = 'border-primary/20',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 rounded-2xl text-sm md:text-base bg-secondary p-6 md:p-8 flex flex-col items-start text-start text-foreground overflow-hidden border-t-2 ${accentBorderColor}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col gap-3 md:gap-4 w-full flex-1">
            <div className="flex items-center gap-3 -ml-2">
              {icon && (
                <div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl ${accentColor}/15 flex items-center justify-center`}>
                  <span className={accentTextColor}>{icon}</span>
                </div>
              )}
              <h3 className="text-xl md:text-title text-foreground font-medium leading-tight">{frontTitle}</h3>
            </div>
            <p className="text-muted-foreground">{frontContent}</p>
            {carousel && <div className="w-full mt-2">{carousel}</div>}
          </div>
          <button
            onClick={() => setIsFlipped(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full w-fit bg-secondary border border-border text-foreground text-sm font-medium hover:bg-muted transition-all group mt-4 shrink-0"
          >
            <span>Our Solution</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Back Side (Solution) */}
        <div
          className={`absolute inset-0 rounded-2xl p-5 md:p-6 flex flex-col items-start text-start text-foreground border ${accentBorderColor} overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--color-secondary)',
          }}
        >
          {/* Subtle accent glow in corner */}
          <div className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full ${accentColor}/20 blur-2xl`} />

          {/* Label */}
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full ${accentColor} animate-pulse`} />
            <span className={`text-xs ${accentTextColor} font-semibold uppercase tracking-wider`}>GiKA Solution</span>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg text-foreground font-semibold mb-3 shrink-0">{solutionTitle}</h3>

          {/* List */}
          <ul className="flex flex-col gap-1.5 w-full">
            {solutionPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-xs md:text-sm">
                <Check className={`w-3.5 h-3.5 ${accentTextColor} shrink-0 mt-0.5`} />
                <span className="text-foreground/80">{point}</span>
              </li>
            ))}
          </ul>

          {/* Back button */}
          <button
            onClick={() => setIsFlipped(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit bg-secondary border border-border text-foreground text-xs font-medium hover:bg-muted transition-all group mt-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-300" />
            <span>Back to Problem</span>
          </button>
        </div>
      </div>
    </div>
  )
}
