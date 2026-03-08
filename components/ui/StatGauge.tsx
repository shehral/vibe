'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { STAT_COLORS, STAT_LABELS, type StatName } from '@/lib/constants'

interface StatGaugeProps {
  stat: StatName
  value: number
  maxValue?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: { height: 'h-2', text: 'text-xs' },
  md: { height: 'h-3', text: 'text-sm' },
  lg: { height: 'h-4', text: 'text-base' },
}

export function StatGauge({ stat, value, maxValue = 10, size = 'md', className }: StatGaugeProps) {
  const color = STAT_COLORS[stat]
  const label = STAT_LABELS[stat]
  const percentage = (value / maxValue) * 100
  const styles = sizeStyles[size]

  return (
    <div className={clsx('space-y-1', className)}>
      <div className="flex justify-between items-center">
        <span className={clsx('font-display uppercase tracking-wider', styles.text)} style={{ color }}>
          {label}
        </span>
        <span className={clsx('font-mono', styles.text, 'text-starlight-dim')}>
          {value}/{maxValue}
        </span>
      </div>
      <div className={clsx('w-full bg-glass rounded-full overflow-hidden', styles.height)}>
        <motion.div
          className={clsx('h-full rounded-full')}
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
        />
      </div>
    </div>
  )
}
