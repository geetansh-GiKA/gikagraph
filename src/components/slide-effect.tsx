'use client'

import { MotionProps, HTMLMotionProps } from "motion/react";
import * as motion from "motion/react-m"
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";

interface SlideEffectProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number] | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
  isSpring?: boolean
}

export function SlideEffect(
  { children, direction = 'top', delay = 0.1, duration = 0.5, ease = [0.25, 0.1, 0.25, 1], className }:
    HTMLMotionProps<'div'> & MotionProps & SlideEffectProps) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Reset animation state on route change
  useEffect(() => {
    setHasAnimated(false)
    // Trigger animation immediately after reset
    const timer = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        // If element is in viewport, animate immediately
        if (rect.top < window.innerHeight) {
          setHasAnimated(true)
        }
      }
    }, 10)
    return () => clearTimeout(timer)
  }, [pathname])

  // Intersection observer with very low threshold for quick trigger
  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.01, rootMargin: '50px' } // Very low threshold, trigger early
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated])

  const initialY = direction === 'top' ? 30 : direction === 'bottom' ? -30 : 0
  const initialX = direction === 'left' ? 30 : direction === 'right' ? -30 : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={hasAnimated ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: initialY, x: initialX }}
      transition={{ duration, ease, delay: hasAnimated ? delay : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default SlideEffect;