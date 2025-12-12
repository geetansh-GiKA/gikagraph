'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const ClickSpark = dynamic(() => import('./ClickSpark'), {
  ssr: false,
})

interface ClientClickSparkProps {
  children: ReactNode
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
}

export default function ClientClickSpark({
  children,
  sparkColor = '#00ffa2ff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}: ClientClickSparkProps) {
  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={sparkSize}
      sparkRadius={sparkRadius}
      sparkCount={sparkCount}
      duration={duration}
    >
      {children}
    </ClickSpark>
  )
}
