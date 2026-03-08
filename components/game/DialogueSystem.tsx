'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel, TypewriterText, Button } from '@/components/ui'
import { useAudio } from '@/components/audio/AudioManager'
import { crewMembers } from '@/lib/data/crew'
import type { CrewMemberDef } from '@/lib/data/crew'
import type { DialogueNode, DialogueChoice } from '@/lib/types'

interface DialogueSystemProps {
  nodes: DialogueNode[]
  onComplete: (score: number) => void
  className?: string
}

type FeedbackState = {
  type: 'correct' | 'wrong'
  response?: string
} | null

function getSpeaker(speakerId: string): CrewMemberDef | null {
  return crewMembers.find((c) => c.id === speakerId) ?? null
}

export function DialogueSystem({ nodes, onComplete, className }: DialogueSystemProps) {
  const { playSFX } = useAudio()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [textComplete, setTextComplete] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const lastBlipIndex = useRef(-1)

  const totalQuestions = useMemo(
    () => nodes.filter((n) => n.choices && n.choices.length > 0).length,
    [nodes]
  )

  const currentNode = nodes[currentIndex] as DialogueNode | undefined
  const speaker = currentNode ? getSpeaker(currentNode.speaker) : null

  const advanceToNext = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= nodes.length) {
      setShowSummary(true)
    } else {
      setCurrentIndex(nextIndex)
      setTextComplete(false)
      setFeedback(null)
      playSFX('dialogue-blip')
    }
  }, [currentIndex, nodes.length, playSFX])

  const handleTextAreaClick = useCallback(() => {
    if (feedback) return

    if (!textComplete) {
      // TypewriterText handles skip internally via its own onClick
      return
    }

    // If no choices on this node, advance
    if (!currentNode?.choices || currentNode.choices.length === 0) {
      advanceToNext()
    }
  }, [textComplete, feedback, currentNode, advanceToNext])

  const handleChoice = useCallback(
    (choice: DialogueChoice) => {
      if (choice.correct) {
        playSFX('success')
        setCorrectCount((prev) => prev + 1)
        setFeedback({ type: 'correct', response: choice.response })

        // Auto-advance after showing correct feedback
        setTimeout(() => {
          if (choice.nextNodeIndex !== undefined) {
            setCurrentIndex(choice.nextNodeIndex)
            setTextComplete(false)
            setFeedback(null)
          } else {
            advanceToNext()
          }
        }, 1200)
      } else {
        playSFX('error')
        setFeedback({ type: 'wrong', response: choice.response })

        // Auto-advance after showing wrong feedback
        setTimeout(() => {
          if (choice.nextNodeIndex !== undefined) {
            setCurrentIndex(choice.nextNodeIndex)
            setTextComplete(false)
            setFeedback(null)
          } else {
            advanceToNext()
          }
        }, 2000)
      }
    },
    [advanceToNext, playSFX]
  )

  const handleComplete = useCallback(() => {
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100
    onComplete(score)
  }, [correctCount, totalQuestions, onComplete])

  const handleTextComplete = useCallback(() => {
    setTextComplete(true)
  }, [])

  // Summary screen
  if (showSummary) {
    return (
      <AnimatePresence>
        <motion.div
          className={clsx(
            'fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm',
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 25, delay: 0.1 }}
          >
            <GlassPanel className="max-w-md w-full mx-4 text-center" padding="lg" glow="nebula">
              <h2 className="font-display text-2xl text-starlight mb-4 uppercase tracking-wider">
                Dialogue Complete
              </h2>

              {totalQuestions > 0 ? (
                <>
                  <div className="mb-6">
                    <div className="font-mono text-4xl text-nebula mb-2">
                      {correctCount}/{totalQuestions}
                    </div>
                    <div className="font-body text-starlight-dim text-sm">
                      correct answers
                    </div>
                  </div>

                  <div className="w-full bg-glass rounded-full h-2 mb-6">
                    <motion.div
                      className={clsx(
                        'h-2 rounded-full',
                        correctCount === totalQuestions ? 'bg-signal' : 'bg-nebula'
                      )}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>

                  <p className="font-body text-starlight-dim text-sm mb-6">
                    {correctCount === totalQuestions
                      ? 'Perfect score! Outstanding work, Commander.'
                      : correctCount >= totalQuestions * 0.5
                        ? 'Good effort. Keep learning and try again.'
                        : 'There is more to learn. Review and try again.'}
                  </p>
                </>
              ) : (
                <p className="font-body text-starlight-dim text-sm mb-6">
                  Briefing acknowledged.
                </p>
              )}

              <Button variant="primary" size="md" onClick={handleComplete}>
                Continue
              </Button>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Guard against invalid index
  if (!currentNode) return null

  const speakerColor = speaker?.color ?? '#4a6fa5'
  const speakerName = speaker?.name ?? currentNode.speaker
  const speakerRole = speaker?.role ?? 'Unknown'
  const speakerInitial = speakerName.charAt(0).toUpperCase()
  const hasChoices = currentNode.choices && currentNode.choices.length > 0

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          'fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full max-w-2xl mx-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 25, delay: 0.1 }}
        >
          <GlassPanel padding="lg" glow="nebula">
            {/* Speaker info */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg text-void font-bold shrink-0"
                style={{ backgroundColor: speakerColor }}
              >
                {speakerInitial}
              </div>
              <div>
                <div className="font-display text-starlight text-sm uppercase tracking-wider">
                  {speakerName}
                </div>
                <div className="font-body text-starlight-dim text-xs">
                  {speakerRole}
                </div>
              </div>
            </div>

            {/* Text area */}
            <div
              className={clsx(
                'min-h-[80px] mb-5 cursor-pointer select-none',
                !hasChoices && textComplete && 'hover:opacity-80'
              )}
              onClick={handleTextAreaClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTextAreaClick()
                }
              }}
            >
              <TypewriterText
                key={`${currentIndex}-${currentNode.text}`}
                text={currentNode.text}
                speed={25}
                className="font-body text-starlight text-base leading-relaxed"
                onComplete={handleTextComplete}
              />

              {/* Advance hint */}
              {textComplete && !hasChoices && !feedback && (
                <motion.div
                  className="mt-3 font-body text-starlight-dim text-xs text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Click to continue...
                </motion.div>
              )}
            </div>

            {/* Feedback flash */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  className={clsx(
                    'rounded-lg px-4 py-3 mb-4 font-body text-sm',
                    feedback.type === 'correct'
                      ? 'bg-signal/20 border border-signal/40 text-signal'
                      : 'bg-terracotta/20 border border-terracotta/40 text-terracotta'
                  )}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                >
                  <span className="font-display text-xs uppercase tracking-wider mr-2">
                    {feedback.type === 'correct' ? 'Correct' : 'Not quite'}
                  </span>
                  {feedback.response && (
                    <span className="text-starlight-dim">{feedback.response}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Choice buttons */}
            <AnimatePresence>
              {textComplete && hasChoices && !feedback && (
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 25, delay: 0.15 }}
                >
                  {currentNode.choices!.map((choice, i) => (
                    <Button
                      key={`choice-${currentIndex}-${i}`}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleChoice(choice)}
                      className="text-left normal-case tracking-normal font-body w-full justify-start"
                    >
                      <span className="font-mono text-nebula mr-2 text-xs">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {choice.text}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="mt-5 flex items-center justify-between">
              <div className="font-mono text-starlight-dim text-xs">
                {currentIndex + 1} / {nodes.length}
              </div>
              {totalQuestions > 0 && (
                <div className="font-mono text-starlight-dim text-xs">
                  Score: {correctCount}/{totalQuestions}
                </div>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
