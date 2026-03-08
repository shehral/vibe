'use client'

import { clsx } from 'clsx'
import { motion } from 'motion/react'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'nebula' | 'signal' | 'terracotta' | 'starlight'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'section' | 'article'
}

const glowStyles = {
  nebula: 'shadow-glow-nebula',
  signal: 'shadow-glow-signal',
  terracotta: 'shadow-glow-terracotta',
  starlight: 'shadow-glow-starlight',
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export function GlassPanel({ children, className, hover = false, glow, padding = 'md', as = 'div' }: GlassPanelProps) {
  const Component = motion.create(as)

  return (
    <Component
      className={clsx(
        'bg-glass backdrop-blur-md border border-glass-border rounded-xl',
        paddingStyles[padding],
        glow && glowStyles[glow],
        hover && 'transition-colors hover:bg-glass-hover hover:border-glass-active cursor-pointer',
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </Component>
  )
}
