"use client"

import { motion, MotionProps, useScroll } from "motion/react"
import { cn } from "@/lib/utils"
import { type HTMLMotionProps } from "motion/react"

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}



// Use Framer Motion's own prop type for a motion.div
type ScrollProgressAllSidesProps = Omit<HTMLMotionProps<"div">, "ref">

export function ScrollProgressAllSides({
  className,
  style,
  ...rest
}: ScrollProgressAllSidesProps) {
  const { scrollYProgress } = useScroll()

  return (
    <>
      {/* Top */}
      <motion.div
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          ...style,
          scaleX: scrollYProgress,
        }}
        {...rest}
      />

      {/* Bottom */}
      <motion.div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 h-[2px] origin-right bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          ...style,
          scaleX: scrollYProgress,
        }}
        {...rest}
      />

      {/* Left */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[2px] origin-top bg-gradient-to-b from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          ...style,
          scaleY: scrollYProgress,
        }}
        {...rest}
      />

      {/* Right */}
      <motion.div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[2px] origin-bottom bg-gradient-to-b from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          ...style,
          scaleY: scrollYProgress,
        }}
        {...rest}
      />
    </>
  )
}


