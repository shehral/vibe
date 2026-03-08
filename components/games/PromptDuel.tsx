'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel, Button } from '@/components/ui'
import { useAudio } from '@/components/audio/AudioManager'

interface PromptDuelProps {
  scenario: string
  requiredConcepts: string[]
  onComplete: (score: number) => void
  className?: string
}

interface ConceptResult {
  concept: string
  found: boolean
}

const springTransition = { type: 'spring' as const, stiffness: 400, damping: 25 }

export function PromptDuel({ scenario, requiredConcepts, onComplete, className }: PromptDuelProps) {
  const { playSFX } = useAudio()
  const [prompt, setPrompt] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<ConceptResult[]>([])
  const [score, setScore] = useState(0)

  function handleSubmit() {
    const lowerPrompt = prompt.toLowerCase()
    const conceptResults = requiredConcepts.map((concept) => ({
      concept,
      found: lowerPrompt.includes(concept.toLowerCase()),
    }))

    const found = conceptResults.filter((r) => r.found).length
    const calculatedScore = Math.round((found / requiredConcepts.length) * 100)

    setResults(conceptResults)
    setScore(calculatedScore)
    setSubmitted(true)
    playSFX(calculatedScore >= 70 ? 'success' : 'error')
  }

  return (
    <GlassPanel className={clsx('max-w-2xl w-full', className)} padding="lg">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={springTransition}
          >
            <h3 className="font-display text-xl text-starlight mb-4 uppercase tracking-wider">
              Prompt Duel
            </h3>

            <p className="font-body text-starlight-dim leading-relaxed mb-6">
              {scenario}
            </p>

            <div className="relative mb-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your prompt here..."
                rows={6}
                className={clsx(
                  'w-full bg-void/50 font-mono text-sm text-starlight',
                  'border border-glass-border rounded-xl p-4 resize-none',
                  'placeholder:text-starlight-dim/40',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50',
                  'transition-colors'
                )}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-starlight-dim">
                {prompt.length} characters
              </span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={prompt.trim().length === 0}
              variant="primary"
              size="md"
            >
              Submit Prompt
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={springTransition}
          >
            <h3 className="font-display text-xl text-starlight mb-2 uppercase tracking-wider">
              Results
            </h3>

            <motion.p
              className={clsx(
                'font-display text-3xl mb-6 uppercase tracking-wider',
                score >= 80 ? 'text-signal' : score >= 50 ? 'text-nebula' : 'text-terracotta'
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              {score}%
            </motion.p>

            <div className="space-y-2 mb-6">
              {results.map((result, index) => (
                <motion.div
                  key={result.concept}
                  className="flex items-center gap-3 font-mono text-sm"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springTransition, delay: 0.15 + index * 0.05 }}
                >
                  <span className={result.found ? 'text-signal' : 'text-terracotta'}>
                    {result.found ? '\u2713' : '\u2717'}
                  </span>
                  <span className={result.found ? 'text-starlight' : 'text-starlight-dim'}>
                    {result.concept}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="bg-void/50 border border-glass-border rounded-xl p-4 mb-6">
              <p className="font-mono text-xs text-starlight-dim mb-1 uppercase tracking-wider">
                Your Prompt
              </p>
              <p className="font-mono text-sm text-starlight leading-relaxed whitespace-pre-wrap">
                {prompt}
              </p>
            </div>

            <Button
              onClick={() => onComplete(score)}
              variant="success"
              size="md"
            >
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassPanel>
  )
}
