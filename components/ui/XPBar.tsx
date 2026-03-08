'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'

interface XPBarProps {
  totalStats: number
  rank: string
  className?: string
}

const RANK_THRESHOLDS = [
  { name: 'Cadet', min: 4, max: 10 },
  { name: 'Navigator', min: 11, max: 20 },
  { name: 'Commander', min: 21, max: 30 },
  { name: 'Admiral', min: 31, max: 40 },
]

export function XPBar({ totalStats, rank, className }: XPBarProps) {
  const currentRank = RANK_THRESHOLDS.find(r => r.name === rank) || RANK_THRESHOLDS[0]
  const nextRank = RANK_THRESHOLDS[RANK_THRESHOLDS.indexOf(currentRank) + 1]

  const progress = nextRank
    ? ((totalStats - currentRank.min) / (nextRank.min - currentRank.min)) * 100
    : 100

  return (
    <div className={clsx('space-y-1', className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="font-display uppercase tracking-wider text-nebula">{rank}</span>
        {nextRank && (
          <span className="text-starlight-dim font-mono text-xs">
            {totalStats}/{nextRank.min} &rarr; {nextRank.name}
          </span>
        )}
      </div>
      <div className="w-full h-2 bg-glass rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-nebula to-signal"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>
    </div>
  )
}
