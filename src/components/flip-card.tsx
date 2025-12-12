'use client'

import { useState, ReactNode } from 'react'
import { RotateCcw, Check } from 'lucide-react'

interface FlipCardProps {
  frontTitle: string
  frontContent: string
  solutionTitle: string
  solutionPoints: string[]
  carousel?: ReactNode
}

export default function FlipCard({ 
  frontTitle, 
  frontContent, 
  solutionTitle, 
  solutionPoints,
  carousel
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
          className="absolute inset-0 rounded-2xl text-sm md:text-base bg-secondary p-6 md:p-8 flex flex-col items-start text-start text-foreground overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col gap-3 md:gap-4 w-full flex-1">
            <h3 className="text-xl md:text-title text-foreground font-medium">{frontTitle}</h3>
            <p className="text-muted-foreground">{frontContent}</p>
            {carousel && <div className="w-full mt-2">{carousel}</div>}
          </div>
          <button
            onClick={() => setIsFlipped(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-foreground text-sm font-medium hover:bg-muted transition-all group mt-4 shrink-0"
          >
            <span>Our Solution</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Back Side (Solution) */}
        <div 
          className="absolute inset-0 rounded-2xl text-sm md:text-base bg-gradient-to-br from-primary/10 to-secondary p-6 md:p-8 flex flex-col items-start text-start text-foreground border border-primary/20 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col gap-3 w-full flex-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium uppercase tracking-wider">GiKA Solution</span>
            </div>
            <h3 className="text-lg md:text-xl text-foreground font-medium">{solutionTitle}</h3>
            <ul className="space-y-2">
              {solutionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setIsFlipped(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-foreground text-sm font-medium hover:bg-muted transition-all group mt-4 shrink-0"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
            <span>Back to Problem</span>
          </button>
        </div>
      </div>
    </div>
  )
}
