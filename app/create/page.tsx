'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { StarfieldBackground, GlassPanel, TypewriterText, Button } from '@/components/ui'
import { useGame } from '@/lib/game-context'
import { ShipType } from '@/lib/types'

const SHIPS: { id: ShipType; name: string; tagline: string; accent: 'terracotta' | 'nebula' | 'signal' }[] = [
  { id: 'spark', name: 'The Spark', tagline: 'Built for speed. Favored by vibe coders.', accent: 'terracotta' },
  { id: 'architect', name: 'The Architect', tagline: 'Built for precision. Favored by system thinkers.', accent: 'nebula' },
  { id: 'sentinel', name: 'The Sentinel', tagline: 'Built for resilience. Favored by security engineers.', accent: 'signal' },
]

const CRAWL_TEXT = `The year is 2026.

Software engineering has changed forever.

A revolution called "vibe coding" swept the industry \u2014 developers began talking to AI in natural language, building software at the speed of thought.

But speed came at a cost. AI-generated code carried 1.75x more bugs, 2.74x more security vulnerabilities. The galaxy\u2019s codebases grew fragile.

A new discipline emerged: Agentic Engineering \u2014 orchestrating fleets of AI agents with human oversight. The future belongs to those who can command them.

You are a rookie pilot. Your ship AI, ARIA, is your guide.

Your mission: journey from vibe coder to fleet commander.`

const shipBorderColors: Record<ShipType, string> = {
  spark: 'border-terracotta shadow-glow-terracotta',
  architect: 'border-nebula shadow-glow-nebula',
  sentinel: 'border-signal shadow-glow-signal',
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

function ShipSVG({ type }: { type: ShipType }) {
  if (type === 'spark') {
    return (
      <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto mb-4">
        <polygon
          points="40,8 68,68 40,56 12,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-terracotta"
        />
        <line x1="40" y1="8" x2="40" y2="56" stroke="currentColor" strokeWidth="1" className="text-terracotta/50" />
      </svg>
    )
  }
  if (type === 'architect') {
    return (
      <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto mb-4">
        <polygon
          points="40,6 70,40 40,74 10,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-nebula"
        />
        <polygon
          points="40,20 56,40 40,60 24,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-nebula/50"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto mb-4">
      <polygon
        points="40,6 72,22 72,58 40,74 8,58 8,22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-signal"
      />
      <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-signal/50" />
    </svg>
  )
}

function StepCallsign({
  callsign,
  setCallsign,
  isValid,
  onNext,
}: {
  callsign: string
  setCallsign: (v: string) => void
  isValid: boolean
  onNext: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <GlassPanel className="w-full max-w-lg text-center" padding="lg">
        <h1 className="font-display uppercase tracking-wider text-xl mb-6 text-starlight">
          Pilot Registration
        </h1>

        <div className="mb-8 text-starlight-dim text-sm leading-relaxed min-h-[3rem]">
          <TypewriterText
            text="Every journey begins with a name, pilot. What should I call you?"
            speed={25}
          />
        </div>

        <input
          type="text"
          value={callsign}
          onChange={(e) => setCallsign(e.target.value.slice(0, 20))}
          placeholder="Enter your callsign..."
          className={clsx(
            'w-full bg-glass border border-glass-border rounded-xl px-4 py-3',
            'text-starlight font-mono text-center text-lg',
            'placeholder:text-starlight-dim/40',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50 focus:border-glass-active',
            'transition-colors'
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isValid) onNext()
          }}
          autoFocus
        />

        <div className="mt-2 h-5 text-xs text-starlight-dim/60 font-mono">
          {callsign.length > 0 && !isValid && 'Callsign must be 2\u201320 characters'}
        </div>

        <div className="mt-4">
          <Button onClick={onNext} disabled={!isValid} size="lg">
            Next
          </Button>
        </div>
      </GlassPanel>
    </div>
  )
}

function StepShip({
  ship,
  setShip,
  onNext,
  onBack,
}: {
  ship: ShipType
  setShip: (v: ShipType) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="font-display uppercase tracking-wider text-xl mb-8 text-starlight text-center">
        Select Your Vessel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
        {SHIPS.map((s) => {
          const isSelected = ship === s.id
          return (
            <GlassPanel
              key={s.id}
              hover
              glow={isSelected ? s.accent : undefined}
              className={clsx(
                'text-center cursor-pointer transition-all',
                isSelected && shipBorderColors[s.id]
              )}
              padding="md"
            >
              <div onClick={() => setShip(s.id)}>
                <ShipSVG type={s.id} />
                <h2 className={clsx(
                  'font-display uppercase tracking-wider text-base mb-2',
                  s.accent === 'terracotta' && 'text-terracotta',
                  s.accent === 'nebula' && 'text-nebula',
                  s.accent === 'signal' && 'text-signal'
                )}>
                  {s.name}
                </h2>
                <p className="text-starlight-dim text-sm leading-relaxed">
                  {s.tagline}
                </p>
              </div>
            </GlassPanel>
          )
        })}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={onBack} size="md">
          Back
        </Button>
        <Button onClick={onNext} size="md">
          Next
        </Button>
      </div>
    </div>
  )
}

function StepLaunch({ onBack, onLaunch }: { onBack: () => void; onLaunch: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div
        className="w-full max-w-2xl overflow-hidden relative"
        style={{ perspective: '300px', height: '60vh' }}
      >
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-void to-transparent z-10 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />

        <div
          className="text-crawl-wrapper absolute inset-0 flex items-start justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="text-crawl-content text-center px-8"
            style={{
              transform: 'rotateX(20deg)',
              animation: 'crawl 35s linear infinite',
            }}
          >
            {CRAWL_TEXT.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-starlight/90 text-base md:text-lg leading-relaxed mb-8 font-body"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={onBack} size="md">
          Back
        </Button>
        <Button
          onClick={onLaunch}
          size="lg"
          className="animate-pulse"
        >
          Launch
        </Button>
      </div>
    </div>
  )
}

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [callsign, setCallsign] = useState('')
  const [ship, setShip] = useState<ShipType>('spark')
  const { startNewGame } = useGame()
  const router = useRouter()

  const isValidCallsign = callsign.trim().length >= 2 && callsign.length <= 20

  const goNext = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const handleLaunch = () => {
    startNewGame(callsign.trim(), ship)
    router.push('/cockpit')
  }

  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />

      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <StepCallsign
              callsign={callsign}
              setCallsign={setCallsign}
              isValid={isValidCallsign}
              onNext={goNext}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <StepShip
              ship={ship}
              setShip={setShip}
              onNext={goNext}
              onBack={goBack}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <StepLaunch onBack={goBack} onLaunch={handleLaunch} />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes crawl {
          from {
            transform: rotateX(20deg) translateY(100%);
          }
          to {
            transform: rotateX(20deg) translateY(-100%);
          }
        }
      `}</style>
    </main>
  )
}
