'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { useGame } from '@/lib/game-context'
import { StarfieldBackground, GlassPanel } from '@/components/ui'
import { crewMembers } from '@/lib/data/crew'

const locationHints: Record<string, string> = {
  start: 'Starting Crew',
  'agent-academy-m1': 'Agent Academy',
  'agent-academy-m3': 'Agent Academy',
  'agent-academy-m5': 'Agent Academy',
  'security-fortress-m1': 'Security Fortress',
}

function getLocationHint(recruitedAt: string): string {
  if (locationHints[recruitedAt]) return locationHints[recruitedAt]
  // Fallback: parse the location from the ID (e.g., 'some-place-m2' -> 'Some Place')
  const parts = recruitedAt.replace(/-m\d+$/, '').split('-')
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
}

function getCrewGlow(color: string): 'nebula' | 'signal' | 'terracotta' | 'starlight' {
  switch (color) {
    case '#4a6fa5':
      return 'nebula'
    case '#6b9e78':
      return 'signal'
    case '#c17147':
      return 'terracotta'
    case '#e8e0d4':
      return 'starlight'
    default:
      return 'nebula'
  }
}

export default function CrewPage() {
  const { state, loading } = useGame()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  if (loading || !state) return null

  const recruitedCount = state.crew.length

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarfieldBackground speed={0.3} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 pb-24 space-y-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 100, damping: 15 }}
        >
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl text-starlight tracking-widest uppercase">
              Your Crew
            </h1>
            <p className="font-mono text-sm text-starlight-dim">
              {recruitedCount} / {crewMembers.length} Crew Recruited
            </p>
          </div>
        </motion.div>

        {/* Crew grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {crewMembers.map((member, index) => {
            const recruited = state.crew.includes(member.id)

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 100,
                  damping: 15,
                  delay: 0.08 * index,
                }}
              >
                <GlassPanel
                  padding="md"
                  glow={recruited ? getCrewGlow(member.color) : undefined}
                  className={clsx(!recruited && 'opacity-50')}
                >
                  <div className="space-y-4">
                    {/* Portrait */}
                    <div className="flex justify-center">
                      {recruited ? (
                        <Image
                          src={member.portrait}
                          alt={member.name}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display border-2 border-glass-border"
                          style={{ color: '#e8e0d450' }}
                        >
                          ?
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div className="text-center">
                      <h3
                        className="font-display text-xl tracking-wide"
                        style={recruited ? { color: member.color } : undefined}
                      >
                        {recruited ? member.name : 'Unknown Crew Member'}
                      </h3>

                      {/* Role */}
                      <p className="text-sm text-starlight-dim mt-1">
                        {recruited ? member.role : '???'}
                      </p>
                    </div>

                    {/* Agent phase badge */}
                    {recruited && (
                      <div className="flex justify-center">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border"
                          style={{
                            color: member.color,
                            borderColor: `${member.color}40`,
                            backgroundColor: `${member.color}15`,
                          }}
                        >
                          {member.agentPhase}
                        </span>
                      </div>
                    )}

                    {/* Description or recruit hint */}
                    {recruited ? (
                      <p className="font-body text-sm text-starlight-dim leading-relaxed text-center">
                        {member.description}
                      </p>
                    ) : (
                      <p className="font-body text-sm text-starlight-dim/70 text-center italic">
                        Recruit at {getLocationHint(member.recruitedAt)}
                      </p>
                    )}

                    {/* Quote */}
                    {recruited && (
                      <p className="text-sm italic text-starlight-dim/70 text-center border-t border-glass-border pt-3">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
