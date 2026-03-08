'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { useAudio } from '@/components/audio/AudioManager'
import type { Mission, StatName } from '@/lib/types'
import { STAT_LABELS, STAT_COLORS } from '@/lib/constants'

interface MissionDebriefProps {
  mission: Mission
  score: number
  onNext: () => void
  onReturn: () => void
}

function getStarCount(score: number): number {
  if (score >= 90) return 3
  if (score >= 60) return 2
  return 1
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring' as const,
            stiffness: 300,
            damping: 15,
            delay: 0.3 + i * 0.2,
          }}
          className={i <= count ? 'text-terracotta' : 'text-starlight-dim/30'}
        >
          {i <= count ? '\u2605' : '\u2606'}
        </motion.span>
      ))}
    </div>
  )
}

export function MissionDebrief({ mission, score, onNext, onReturn }: MissionDebriefProps) {
  const { playSFX } = useAudio()
  const starCount = getStarCount(score)
  const statEntries = Object.entries(mission.statRewards) as [StatName, number][]

  useEffect(() => {
    playSFX('mission-complete')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <GlassPanel padding="lg" glow="signal">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl text-starlight tracking-wide">
              Mission Complete
            </h2>
            <p className="font-body text-sm text-starlight-dim">
              {mission.title}
            </p>
          </div>

          {/* Score Display */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring' as const,
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className={clsx(
                'text-5xl font-display tabular-nums',
                score >= 90
                  ? 'text-signal'
                  : score >= 60
                    ? 'text-nebula'
                    : 'text-terracotta'
              )}
            >
              {score}%
            </motion.div>
            <Stars count={starCount} />
          </div>

          {/* Divider */}
          <div className="h-px bg-glass-border" />

          {/* Stat Gains */}
          {statEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display text-sm text-starlight-dim uppercase tracking-wider">
                Stats Gained
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {statEntries.map(([stat, value], i) => (
                  <motion.div
                    key={stat}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 25,
                      delay: 0.5 + i * 0.1,
                    }}
                    className={clsx(
                      'flex items-center justify-between',
                      'px-3 py-2 rounded-lg bg-glass border border-glass-border'
                    )}
                  >
                    <span
                      className="font-display text-sm uppercase tracking-wider"
                      style={{ color: STAT_COLORS[stat] }}
                    >
                      {STAT_LABELS[stat]}
                    </span>
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: STAT_COLORS[stat] }}
                    >
                      +{value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards */}
          {(mission.itemReward || mission.crewReward) && (
            <div className="space-y-3">
              <h3 className="font-display text-sm text-starlight-dim uppercase tracking-wider">
                Rewards
              </h3>
              <div className="flex flex-wrap gap-3">
                {mission.itemReward && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 20,
                      delay: 0.7,
                    }}
                    className={clsx(
                      'px-4 py-3 rounded-lg',
                      'bg-terracotta/10 border border-terracotta/30'
                    )}
                  >
                    <p className="font-mono text-xs text-terracotta/70 uppercase">
                      Item Acquired
                    </p>
                    <p className="font-display text-sm text-terracotta mt-1">
                      {mission.itemReward}
                    </p>
                  </motion.div>
                )}
                {mission.crewReward && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 20,
                      delay: 0.8,
                    }}
                    className={clsx(
                      'px-4 py-3 rounded-lg',
                      'bg-signal/10 border border-signal/30'
                    )}
                  >
                    <p className="font-mono text-xs text-signal/70 uppercase">
                      Crew Recruited
                    </p>
                    <p className="font-display text-sm text-signal mt-1">
                      {mission.crewReward}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button onClick={onReturn} variant="secondary" size="md" className="flex-1">
              Return to Planet
            </Button>
            <Button onClick={onNext} variant="primary" size="md" className="flex-1">
              Next Mission
            </Button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
