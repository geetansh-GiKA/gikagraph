'use client'

import React from 'react'
import * as motion from "motion/react-m"
import { cn } from '@/lib/utils'
import FadeEffect from './fade-effect'

interface SpinnerProps {
  avatars: string[]
  labels: string[]
  className?: string
}

const AvatarsCircle = ({ avatars }: { avatars: string[] }) => {
  const radius = 180 * 1.6; // Adjust this value to change circle size
  const center = radius;
  const MotionAvatar = motion.div;

  return (
    <motion.div
      animate={{
        rotate: 360,
        transition: {
          duration: 20, // Adjust speed as needed
          repeat: Infinity, // Infinite repeat
          ease: 'linear',
        }
      }}
      className="absolute top-2/4 right-0 -translate-y-2/4 translate-x-1/4 mx-auto mt-8"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {/* Circle container */}
      <div className="absolute w-full h-full rounded-full border-2 border-border"></div>

      {/* Dynamic avatar bubbles (now text-based, not images) */}
      {avatars.map((avatar, index) => {
        const angle = (index * 360) / avatars.length;
        const radians = (angle * Math.PI) / 180;

        // Calculate position
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);

        return (
          <MotionAvatar
            key={index}
            initial={{
              transform: 'translate(-50%, -50%) rotate(0deg)',
            }}
            animate={{
              transform: 'translate(-50%, -50%) rotate(-360deg)',
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
            className="absolute min-w-24 px-3 py-2 flex items-center justify-center text-xs text-white bg-primary/80 shadow-sm rounded-md"
            style={{
              left: `${center + x}px`,
              top: `${center + y}px`,
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            {avatar}
          </MotionAvatar>
        )
      })}
    </motion.div>
  );
};

const LabelsCircle = ({ labels }: { labels: string[] }) => {
  const radius = 180 * 1.3; // Adjust this value to change circle size
  const center = radius;

  return (
    <motion.div
      animate={{
        rotate: -360,
        transition: {
          duration: 20, // Adjust speed as needed
          repeat: Infinity, // Infinite repeat
          ease: 'linear',
        }
      }}
      className="absolute top-2/4 right-0 -translate-y-2/4 translate-x-3/5 mx-auto mt-8"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {/* Circle container */}
      <div className="absolute w-full h-full rounded-full border-2 border-border"></div>

      {/* Dynamic boxes */}
      {labels.map((label, index) => {
        const angle = (index * 360) / labels.length;
        const radians = (angle * Math.PI) / 180;

        // Calculate position
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);

        return (
          <motion.div
            initial={{
              transform: 'translate(-50%, -50%) rotate(0deg)',
            }}
            animate={{
              transform: 'translate(-50%, -50%) rotate(360deg)',
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
            key={index}
            className="absolute min-w-32 px-4 py-2 text-sm flex items-center justify-center text-black bg-accent rounded-lg"
            style={{
              left: `${center + x}px`,
              top: `${center + y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {label}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default function Spinner({ avatars, labels, className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'relative w-full h-full flex-1 items-center justify-center overflow-hidden',
        className
      )}
    >
      <AvatarsCircle avatars={avatars} />
      <LabelsCircle labels={labels} />

      <FadeEffect color='secondary' />
      <FadeEffect color='secondary' position='top' direction='up' />
    </div>
  )
}