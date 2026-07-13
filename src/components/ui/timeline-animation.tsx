"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import React from "react";
import type { ElementType } from "react";

type TimelineContentProps<T extends ElementType = "div"> = {
  as?: T;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "animationNum" | "timelineRef" | "customVariants"
>;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  ...rest
}: TimelineContentProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const isInView = useInView(timelineRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const variants = customVariants ?? defaultVariants;
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}

export { TimelineContent };
