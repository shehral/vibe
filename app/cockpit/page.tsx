'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { useGame } from '@/lib/game-context'
import { StarfieldBackground, GlassPanel, StatGauge, XPBar, Button, TypewriterText } from '@/components/ui'
import { crewMembers } from '@/lib/data/crew'
import { STATS } from '@/lib/constants'
import { TOTAL_MISSIONS, planets } from '@/lib/data/planets'

const RANK_COLORS: Record<string, string> = {
  Cadet: '#c17147',
  Navigator: '#4a6fa5',
  Commander: '#6b9e78',
  Admiral: '#e8e0d4',
}

export default function CockpitPage() {
  const { state, loading, rank, totalStats, completedMissions } = useGame()
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  useEffect(() => {
    if (state && completedMissions === 0) {
      setShowWelcome(true)
    }
  }, [state, completedMissions])

  if (loading || !state) return null

  // Compute mission counts per act
  const actCounts = { 1: 0, 2: 0, 3: 0 }
  const actTotals = { 1: 0, 2: 0, 3: 0 }
  for (const planet of planets) {
    actTotals[planet.act] += planet.missionCount
    const completedForPlanet = Object.entries(state.missionProgress).filter(
      ([id, p]) => id.startsWith(planet.id) && p.status === 'completed'
    ).length
    actCounts[planet.act] += completedForPlanet
  }

  // Find next available planet
  const nextPlanet = planets.find((planet) => {
    const completedForPlanet = Object.entries(state.missionProgress).filter(
      ([id, p]) => id.startsWith(planet.id) && p.status === 'completed'
    ).length
    return completedForPlanet < planet.missionCount
  })

  const missionProgressPercent = (completedMissions / TOTAL_MISSIONS) * 100

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarfieldBackground speed={0.3} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Top section: Player identity & rank */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <GlassPanel padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <h1 className="font-display text-3xl sm:text-4xl text-starlight tracking-wider">
                {state.callsign}
              </h1>
              <span
                className={clsx(
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-display uppercase tracking-widest border'
                )}
                style={{
                  color: RANK_COLORS[rank],
                  borderColor: `${RANK_COLORS[rank]}60`,
                  backgroundColor: `${RANK_COLORS[rank]}15`,
                }}
              >
                {rank}
              </span>
            </div>
            <XPBar totalStats={totalStats} rank={rank} />
          </GlassPanel>
        </motion.div>

        {/* Stats section: 2x2 grid (4-column on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
        >
          <GlassPanel padding="md">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <StatGauge
                  key={stat}
                  stat={stat}
                  value={state.stats[stat]}
                />
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        {/* Crew section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        >
          <GlassPanel padding="md">
            <h2 className="font-display text-lg uppercase tracking-widest text-nebula mb-4">
              Your Crew
            </h2>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {crewMembers.map((member) => {
                const recruited = state.crew.includes(member.id)
                return (
                  <div
                    key={member.id}
                    className="flex flex-col items-center gap-2 w-16"
                  >
                    <div
                      className={clsx(
                        'w-12 h-12 rounded-full flex items-center justify-center text-lg font-display border-2 transition-all',
                        recruited
                          ? 'border-opacity-60'
                          : 'border-glass-border opacity-30'
                      )}
                      style={
                        recruited
                          ? {
                              borderColor: member.color,
                              backgroundColor: `${member.color}20`,
                              color: member.color,
                            }
                          : undefined
                      }
                    >
                      {recruited ? member.name[0] : '?'}
                    </div>
                    <span
                      className={clsx(
                        'text-xs text-center font-mono leading-tight',
                        recruited ? 'text-starlight' : 'text-starlight-dim'
                      )}
                    >
                      {recruited ? member.name : 'Unknown'}
                    </span>
                  </div>
                )
              })}
            </div>
          </GlassPanel>
        </motion.div>

        {/* Mission log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
        >
          <GlassPanel padding="md">
            <h2 className="font-display text-lg uppercase tracking-widest text-nebula mb-4">
              Mission Log
            </h2>

            <div className="space-y-3">
              {/* Current objective */}
              <p className="text-starlight text-sm">
                {nextPlanet
                  ? `Current objective: Complete ${nextPlanet.name} to progress`
                  : 'All missions complete!'}
              </p>

              {/* Mission progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-display uppercase tracking-wider text-signal">
                    Progress
                  </span>
                  <span className="font-mono text-starlight-dim">
                    {completedMissions}/{TOTAL_MISSIONS}
                  </span>
                </div>
                <div className="w-full h-2 bg-glass rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-terracotta via-nebula to-signal"
                    initial={{ width: 0 }}
                    animate={{ width: `${missionProgressPercent}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  />
                </div>
              </div>

              {/* Act breakdown */}
              <p className="text-xs font-mono text-starlight-dim">
                Act 1: {actCounts[1]}/{actTotals[1]} | Act 2: {actCounts[2]}/{actTotals[2]} | Act 3: {actCounts[3]}/{actTotals[3]}
              </p>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/starmap')}
          >
            Open Star Map
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/crew')}
          >
            View Crew
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/inventory')}
          >
            View Inventory
          </Button>
        </motion.div>
      </main>

      {/* First-visit welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" />

            {/* Welcome panel */}
            <motion.div
              className="relative z-10 max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <GlassPanel padding="lg" glow="nebula">
                <div className="space-y-4">
                  <p className="text-starlight text-base leading-relaxed">
                    <TypewriterText
                      text={`Welcome aboard, ${state.callsign}. I'm ARIA, your ship's AI. Open the Star Map to begin your journey. Vibe World awaits.`}
                      speed={25}
                    />
                  </p>
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowWelcome(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
