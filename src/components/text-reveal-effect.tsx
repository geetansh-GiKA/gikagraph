'use client'

import { MotionProps, useInView } from "motion/react"
import * as motion from "motion/react-m"
import { useRef, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function TextRevealEffect({ children, className }: { children: string } & React.ComponentProps<'span'> & MotionProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const pathname = usePathname()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    setHasAnimated(false)
  }, [pathname])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const words = children.split(' ')
  let charIndex = 0

  return (
    <span ref={ref}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char) => {
            const currentIndex = charIndex++
            return (
              <motion.span
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: currentIndex * 0.015, ease: [1, 0, 0, 1], duration: 1 }}
                className={className}
              >
                {char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <motion.span
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              key={`space-${wordIndex}`}
              initial={{ opacity: 0 }}
              animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: charIndex++ * 0.015, ease: [1, 0, 0, 1], duration: 1 }}
              className={className}
            >
              {' '}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  )
}
