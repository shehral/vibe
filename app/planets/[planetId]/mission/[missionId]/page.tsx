'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { clsx } from 'clsx'
import { StarfieldBackground } from '@/components/ui/StarfieldBackground'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { MissionBriefing } from '@/components/game/MissionBriefing'
import { LearningPhase } from '@/components/game/LearningPhase'
import { MissionDebrief } from '@/components/game/MissionDebrief'
import { useGame } from '@/lib/game-context'
import { getMissionById, getMissionsByPlanet } from '@/lib/data/missions'

type Phase = 'briefing' | 'learning' | 'challenge' | 'debrief'

export default function MissionPage({
  params,
}: {
  params: Promise<{ planetId: string; missionId: string }>
}) {
  const { planetId, missionId } = React.use(params)
  const { state, loading, completeMission } = useGame()
  const router = useRouter()

  const [phase, setPhase] = useState<Phase>('briefing')
  const [score, setScore] = useState(0)

  const mission = getMissionById(missionId)

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  const handleChallengeComplete = useCallback(
    (finalScore: number) => {
      if (!mission) return
      setScore(finalScore)
      completeMission(
        missionId,
        finalScore,
        mission.statRewards,
        mission.itemReward,
        mission.crewReward
      )
      setPhase('debrief')
    },
    [mission, missionId, completeMission]
  )

  const handleNextMission = useCallback(() => {
    if (!mission) return
    const planetMissions = getMissionsByPlanet(planetId)
    const currentIndex = planetMissions.findIndex((m) => m.id === missionId)
    const nextMission = planetMissions[currentIndex + 1]

    if (nextMission) {
      router.push(`/planets/${planetId}/mission/${nextMission.id}`)
    } else {
      // No more missions on this planet, go back to planet page
      router.push(`/planets/${planetId}`)
    }
  }, [mission, planetId, missionId, router])

  const handleReturnToPlanet = useCallback(() => {
    router.push(`/planets/${planetId}`)
  }, [planetId, router])

  if (loading || !state) return null

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassPanel padding="lg">
          <div className="text-center space-y-4">
            <p className="font-body text-starlight-dim">Mission not found.</p>
            <Button onClick={handleReturnToPlanet} variant="secondary">
              Return to Planet
            </Button>
          </div>
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground density={120} speed={0.2} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Phase indicator */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between px-2">
            {(['briefing', 'learning', 'challenge', 'debrief'] as Phase[]).map(
              (p, i) => (
                <div key={p} className="flex items-center">
                  <div
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      'font-mono text-xs border transition-colors',
                      phase === p
                        ? 'bg-nebula/20 border-nebula text-nebula'
                        : (['briefing', 'learning', 'challenge', 'debrief'] as Phase[]).indexOf(phase) > i
                          ? 'bg-signal/20 border-signal text-signal'
                          : 'bg-glass border-glass-border text-starlight-dim'
                    )}
                  >
                    {(['briefing', 'learning', 'challenge', 'debrief'] as Phase[]).indexOf(phase) > i
                      ? '\u2713'
                      : i + 1}
                  </div>
                  {i < 3 && (
                    <div
                      className={clsx(
                        'w-12 sm:w-20 h-px mx-1',
                        (['briefing', 'learning', 'challenge', 'debrief'] as Phase[]).indexOf(phase) > i
                          ? 'bg-signal/40'
                          : 'bg-glass-border'
                      )}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Phase Content */}
        <AnimatePresence mode="wait">
          {phase === 'briefing' && (
            <MissionBriefing
              key="briefing"
              mission={mission}
              onBegin={() => setPhase('learning')}
            />
          )}

          {phase === 'learning' && (
            <LearningPhase
              key="learning"
              blocks={mission.content.learning}
              onProceed={() => setPhase('challenge')}
            />
          )}

          {phase === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: 'spring' as const,
                stiffness: 300,
                damping: 25,
              }}
              className="w-full max-w-2xl mx-auto"
            >
              <GlassPanel padding="lg" glow="terracotta">
                <div className="space-y-6 text-center">
                  <h2 className="font-display text-2xl text-starlight tracking-wide">
                    Challenge
                  </h2>
                  <p className="font-body text-starlight-dim">
                    {mission.content.challenge.instructions ||
                      `Complete the ${mission.challengeType} challenge.`}
                  </p>
                  <div
                    className={clsx(
                      'inline-block px-4 py-2 rounded-lg',
                      'bg-terracotta/10 border border-terracotta/30',
                      'font-mono text-sm text-terracotta'
                    )}
                  >
                    Type: {mission.challengeType}
                  </div>
                  <p className="font-body text-xs text-starlight-dim">
                    Challenge mechanics coming soon. Use the button below to
                    simulate completion.
                  </p>
                  <Button
                    onClick={() => handleChallengeComplete(80)}
                    variant="success"
                    size="lg"
                    className="w-full"
                  >
                    Complete (Mock)
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          )}

          {phase === 'debrief' && (
            <MissionDebrief
              key="debrief"
              mission={mission}
              score={score}
              onNext={handleNextMission}
              onReturn={handleReturnToPlanet}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
