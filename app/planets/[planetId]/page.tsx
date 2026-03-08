'use client'

import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { useGame } from '@/lib/game-context'
import { planets } from '@/lib/data/planets'
import { getMissionsByPlanet } from '@/lib/data/missions'
import type { PlanetId, Mission, MissionStatus, ChallengeType } from '@/lib/types'

const ACT_LABELS: Record<number, string> = {
  1: 'Act I',
  2: 'Act II',
  3: 'Act III',
}

const CHALLENGE_LABELS: Record<ChallengeType, string> = {
  'prompt-duel': 'Prompt Duel',
  architect: 'Architecture',
  connect: 'Connection',
  debug: 'Debug',
  command: 'Command',
  dialogue: 'Dialogue',
}

function getMissionStatus(
  mission: Mission,
  missions: Mission[],
  missionProgress: Record<string, { status: string }>
): MissionStatus {
  // Check if this mission is completed
  const progress = missionProgress[mission.id]
  if (progress?.status === 'completed') return 'completed'
  if (progress?.status === 'in_progress') return 'in_progress'

  // First mission is always available if we're on this planet page
  if (mission.order === 1) return 'available'

  // Later missions: available if the previous mission is completed
  const prevMission = missions.find((m) => m.order === mission.order - 1)
  if (prevMission) {
    const prevProgress = missionProgress[prevMission.id]
    if (prevProgress?.status === 'completed') return 'available'
  }

  return 'locked'
}

function MissionCard({
  mission,
  status,
  onClick,
}: {
  mission: Mission
  status: MissionStatus
  onClick: () => void
}) {
  const isClickable = status === 'available' || status === 'in_progress'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
        delay: mission.order * 0.08,
      }}
    >
      <GlassPanel
        hover={isClickable}
        glow={
          status === 'in_progress'
            ? 'terracotta'
            : status === 'available'
              ? 'nebula'
              : status === 'completed'
                ? 'signal'
                : undefined
        }
        className={clsx(
          status === 'locked' && 'opacity-40 cursor-not-allowed',
          status === 'available' && 'animate-pulse-subtle'
        )}
      >
        <button
          onClick={isClickable ? onClick : undefined}
          disabled={!isClickable}
          className={clsx(
            'w-full text-left flex items-start gap-4',
            !isClickable && 'cursor-not-allowed'
          )}
          aria-label={`Mission ${mission.order}: ${mission.title} - ${status}`}
        >
          {/* Mission Number */}
          <div
            className={clsx(
              'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
              'font-display text-lg',
              status === 'completed'
                ? 'bg-signal/20 text-signal border border-signal/30'
                : status === 'in_progress'
                  ? 'bg-terracotta/20 text-terracotta border border-terracotta/30'
                  : status === 'available'
                    ? 'bg-nebula/20 text-nebula border border-nebula/30'
                    : 'bg-glass text-starlight-dim border border-glass-border'
            )}
          >
            {status === 'completed' ? '\u2713' : mission.order}
          </div>

          {/* Mission Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3
              className={clsx(
                'font-display text-base tracking-wide',
                status === 'locked' ? 'text-starlight-dim' : 'text-starlight'
              )}
            >
              {mission.title}
            </h3>
            <p className="font-body text-sm text-starlight-dim truncate">
              {mission.subtitle}
            </p>
            <span
              className={clsx(
                'inline-block font-mono text-xs px-2 py-0.5 rounded',
                'bg-glass border border-glass-border text-starlight-dim'
              )}
            >
              {CHALLENGE_LABELS[mission.challengeType]}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex-shrink-0 mt-1">
            {status === 'completed' && (
              <span className="text-signal text-sm font-mono">Complete</span>
            )}
            {status === 'in_progress' && (
              <span className="text-terracotta text-sm font-mono">In Progress</span>
            )}
            {status === 'available' && (
              <span className="text-nebula text-sm font-mono">Ready</span>
            )}
            {status === 'locked' && (
              <span className="text-starlight-dim text-sm font-mono">Locked</span>
            )}
          </div>
        </button>
      </GlassPanel>
    </motion.div>
  )
}

export default function PlanetPage({
  params,
}: {
  params: Promise<{ planetId: string }>
}) {
  const { planetId } = React.use(params)
  const { state, loading } = useGame()
  const router = useRouter()

  const planet = useMemo(
    () => planets.find((p) => p.id === planetId),
    [planetId]
  )

  const missions = useMemo(
    () => getMissionsByPlanet(planetId),
    [planetId]
  )

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  if (loading || !state) return null
  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-starlight-dim">Planet not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground density={150} speed={0.3} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <Button
          onClick={() => router.push('/starmap')}
          variant="ghost"
          size="sm"
        >
          &larr; Return to Star Map
        </Button>

        {/* Planet Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs px-2 py-1 rounded border"
              style={{
                borderColor: `${planet.color}40`,
                backgroundColor: `${planet.color}15`,
                color: planet.color,
              }}
            >
              {ACT_LABELS[planet.act]}
            </span>
          </div>
          <h1
            className="font-display text-4xl tracking-wide"
            style={{ color: planet.color }}
          >
            {planet.name}
          </h1>
          <p className="font-display text-lg text-starlight-dim">
            {planet.subtitle}
          </p>
          <p className="font-body text-starlight/80 leading-relaxed max-w-xl">
            {planet.description}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-glass-border" />

        {/* Mission List */}
        <div className="space-y-3">
          <h2 className="font-display text-sm text-starlight-dim uppercase tracking-wider">
            Missions ({missions.length})
          </h2>
          <div className="space-y-3">
            {missions.map((mission) => {
              const status = getMissionStatus(
                mission,
                missions,
                state.missionProgress
              )
              return (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  status={status}
                  onClick={() =>
                    router.push(
                      `/planets/${planetId}/mission/${mission.id}`
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
