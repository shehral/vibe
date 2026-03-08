'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'

type TransitionVariant = 'fade' | 'warp' | 'slide'

interface PageTransitionProps {
  children: React.ReactNode
  variant?: TransitionVariant
  className?: string
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
}

const variants = {
  fade: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
  },
  warp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
} as const

export function PageTransition({
  children,
  variant = 'fade',
  className,
}: PageTransitionProps) {
  const { initial, animate } = variants[variant]

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={springTransition}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  )
}
