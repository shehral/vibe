'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { TypewriterText } from '@/components/ui/TypewriterText'
import { Button } from '@/components/ui/Button'
import type { Mission, ChallengeType } from '@/lib/types'

const CHALLENGE_LABELS: Record<ChallengeType, string> = {
  'prompt-duel': 'Prompt Duel',
  architect: 'Architecture Challenge',
  connect: 'Connection Protocol',
  debug: 'Debug Sequence',
  command: 'Command Exercise',
  dialogue: 'Dialogue',
}

const CHALLENGE_ICONS: Record<ChallengeType, string> = {
  'prompt-duel': '\u2694',
  architect: '\u2692',
  connect: '\u{1F517}',
  debug: '\u{1F41B}',
  command: '\u{1F4BB}',
  dialogue: '\u{1F4AC}',
}

interface MissionBriefingProps {
  mission: Mission
  onBegin: () => void
}

export function MissionBriefing({ mission, onBegin }: MissionBriefingProps) {
  const briefingText =
    mission.content.briefing.length > 0
      ? mission.content.briefing[0].text
      : mission.description

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <GlassPanel padding="lg" glow="nebula">
        <div className="space-y-6">
          {/* Mission Header */}
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-starlight tracking-wide">
              {mission.title}
            </h2>
            <p className="font-body text-sm text-starlight-dim">
              {mission.subtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-glass-border" />

          {/* Briefing Text */}
          <div
            className="min-h-[80px] font-body text-starlight leading-relaxed"
            role="dialog"
            aria-label="Mission briefing"
          >
            <TypewriterText text={briefingText} speed={25} />
          </div>

          {/* Challenge Type Badge */}
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
                'bg-nebula/10 border border-nebula/30',
                'font-mono text-sm text-nebula'
              )}
            >
              <span>{CHALLENGE_ICONS[mission.challengeType]}</span>
              <span>{CHALLENGE_LABELS[mission.challengeType]}</span>
            </span>
          </div>

          {/* Begin Button */}
          <div className="pt-2">
            <Button onClick={onBegin} variant="primary" size="lg" className="w-full">
              Begin Mission
            </Button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
