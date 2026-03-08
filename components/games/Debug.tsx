'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'

interface DebugProps {
  code: string
  bugLines: number[]
  explanations: Record<number, string>
  onComplete: (score: number) => void
  className?: string
}

type Phase = 'input' | 'results'

interface LineResult {
  lineNumber: number
  text: string
  status: 'correct' | 'false-positive' | 'missed' | 'neutral'
  explanation?: string
}

export function Debug({ code, bugLines, explanations, onComplete, className }: DebugProps) {
  const [selectedLines, setSelectedLines] = useState<Set<number>>(new Set())
  const [phase, setPhase] = useState<Phase>('input')
  const [score, setScore] = useState(0)
  const [lineResults, setLineResults] = useState<LineResult[]>([])

  const lines = code.split('\n')

  function toggleLine(lineNumber: number) {
    setSelectedLines((prev) => {
      const next = new Set(prev)
      if (next.has(lineNumber)) {
        next.delete(lineNumber)
      } else {
        next.add(lineNumber)
      }
      return next
    })
  }

  function handleSubmit() {
    const correctSelections = [...selectedLines].filter((ln) => bugLines.includes(ln)).length
    const falsePositives = [...selectedLines].filter((ln) => !bugLines.includes(ln)).length
    const computed = Math.max(0, Math.round(((correctSelections - falsePositives) / bugLines.length) * 100))

    setScore(computed)

    const results: LineResult[] = lines.map((text, i) => {
      const lineNumber = i + 1
      const isBug = bugLines.includes(lineNumber)
      const isSelected = selectedLines.has(lineNumber)

      if (isSelected && isBug) {
        return { lineNumber, text, status: 'correct' as const, explanation: explanations[lineNumber] }
      }
      if (isSelected && !isBug) {
        return { lineNumber, text, status: 'false-positive' as const }
      }
      if (!isSelected && isBug) {
        return { lineNumber, text, status: 'missed' as const, explanation: explanations[lineNumber] }
      }
      return { lineNumber, text, status: 'neutral' as const }
    })

    setLineResults(results)
    setPhase('results')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
      className={clsx('w-full max-w-2xl mx-auto', className)}
    >
      <GlassPanel padding="lg">
        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
              className="space-y-5"
            >
              {/* Header */}
              <h3 className="font-display text-lg text-nebula uppercase tracking-wider">
                Debug Scanner
              </h3>

              {/* Instructions */}
              <p className="font-body text-sm text-starlight-dim leading-relaxed">
                Find the bugs in this code. Click on the lines you think contain issues.
              </p>

              {/* Code Display */}
              <div className="bg-void/50 border border-glass-border rounded-lg overflow-hidden">
                <div className="max-h-[50vh] overflow-y-auto scrollbar-thin">
                  {lines.map((line, i) => {
                    const lineNumber = i + 1
                    const isSelected = selectedLines.has(lineNumber)

                    return (
                      <motion.button
                        key={lineNumber}
                        type="button"
                        onClick={() => toggleLine(lineNumber)}
                        className={clsx(
                          'w-full flex items-start text-left transition-colors',
                          'hover:bg-glass',
                          isSelected && 'border-l-2 border-terracotta bg-terracotta/10',
                          !isSelected && 'border-l-2 border-transparent'
                        )}
                        whileTap={{ scale: 0.995 }}
                      >
                        <span
                          className={clsx(
                            'flex-shrink-0 w-10 text-right pr-3 py-1',
                            'font-mono text-xs text-starlight-dim select-none'
                          )}
                        >
                          {lineNumber}
                        </span>
                        <span className="font-mono text-sm text-starlight py-1 pr-4 whitespace-pre">
                          {line}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Selection count */}
              <p className="font-body text-sm text-starlight-dim">
                {selectedLines.size} {selectedLines.size === 1 ? 'line' : 'lines'} selected
              </p>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={selectedLines.size === 0}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Submit Analysis
              </Button>
            </motion.div>
          )}

          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
              className="space-y-5"
            >
              {/* Header */}
              <h3 className="font-display text-lg text-nebula uppercase tracking-wider">
                Analysis Results
              </h3>

              {/* Score */}
              <div className="text-center py-3">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.2 }}
                  className={clsx(
                    'font-display text-4xl',
                    score >= 80 && 'text-signal',
                    score >= 40 && score < 80 && 'text-nebula',
                    score < 40 && 'text-terracotta'
                  )}
                >
                  {score}%
                </motion.span>
              </div>

              {/* Results breakdown */}
              <div className="bg-void/50 border border-glass-border rounded-lg overflow-hidden">
                <div className="max-h-[50vh] overflow-y-auto scrollbar-thin">
                  {lineResults.map((result, i) => (
                    <motion.div
                      key={result.lineNumber}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 25,
                        delay: i * 0.02,
                      }}
                      className={clsx(
                        'border-l-2',
                        result.status === 'correct' && 'border-signal bg-signal/5',
                        result.status === 'false-positive' && 'border-terracotta bg-terracotta/5',
                        result.status === 'missed' && 'border-amber-400 bg-amber-400/5',
                        result.status === 'neutral' && 'border-transparent'
                      )}
                    >
                      {/* Code line */}
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-10 text-right pr-3 py-1 font-mono text-xs text-starlight-dim select-none">
                          {result.lineNumber}
                        </span>

                        {result.status !== 'neutral' && (
                          <span
                            className={clsx(
                              'flex-shrink-0 w-5 py-1 font-mono text-sm font-bold',
                              result.status === 'correct' && 'text-signal',
                              result.status === 'false-positive' && 'text-terracotta',
                              result.status === 'missed' && 'text-amber-400'
                            )}
                          >
                            {result.status === 'correct' && '\u2713'}
                            {result.status === 'false-positive' && '\u2717'}
                            {result.status === 'missed' && '!'}
                          </span>
                        )}

                        <span
                          className={clsx(
                            'font-mono text-sm py-1 pr-4 whitespace-pre',
                            result.status === 'neutral' ? 'text-starlight-dim' : 'text-starlight'
                          )}
                        >
                          {result.text}
                        </span>
                      </div>

                      {/* Explanation */}
                      {result.status === 'correct' && result.explanation && (
                        <div className="ml-[3.75rem] pb-2 pr-4">
                          <span className="font-body text-xs text-signal">
                            {result.explanation}
                          </span>
                        </div>
                      )}
                      {result.status === 'false-positive' && (
                        <div className="ml-[3.75rem] pb-2 pr-4">
                          <span className="font-body text-xs text-terracotta">
                            No bug here
                          </span>
                        </div>
                      )}
                      {result.status === 'missed' && result.explanation && (
                        <div className="ml-[3.75rem] pb-2 pr-4">
                          <span className="font-body text-xs text-amber-400">
                            Missed! {result.explanation}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Continue */}
              <Button
                onClick={() => onComplete(score)}
                variant="success"
                size="lg"
                className="w-full"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  )
}
