'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { useAudio } from '@/components/audio/AudioManager'

interface ConnectProps {
  sources: string[]
  targets: string[]
  correctPairs: [number, number][]
  onComplete: (score: number) => void
  className?: string
}

interface Connection {
  sourceIndex: number
  targetIndex: number
}

interface NodePosition {
  x: number
  y: number
}

type CheckResult = 'correct' | 'wrong' | 'missed'

interface ConnectionResult {
  sourceIndex: number
  targetIndex: number
  result: CheckResult
}

const springTransition = { type: 'spring' as const, stiffness: 400, damping: 25 }

function generateBezierPath(
  from: NodePosition,
  to: NodePosition
): string {
  const dx = to.x - from.x
  const controlOffset = Math.max(Math.abs(dx) * 0.4, 60)
  return `M ${from.x} ${from.y} C ${from.x + controlOffset} ${from.y}, ${to.x - controlOffset} ${to.y}, ${to.x} ${to.y}`
}

export function Connect({
  sources,
  targets,
  correctPairs,
  onComplete,
  className,
}: ConnectProps) {
  const { playSFX } = useAudio()
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedSource, setSelectedSource] = useState<number | null>(null)
  const [results, setResults] = useState<ConnectionResult[] | null>(null)
  const [score, setScore] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const sourceRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const targetRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [positions, setPositions] = useState<{
    sources: Map<number, NodePosition>
    targets: Map<number, NodePosition>
  }>({ sources: new Map(), targets: new Map() })

  const updatePositions = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const newSources = new Map<number, NodePosition>()
    const newTargets = new Map<number, NodePosition>()

    sourceRefs.current.forEach((el, idx) => {
      const rect = el.getBoundingClientRect()
      newSources.set(idx, {
        x: rect.right - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      })
    })

    targetRefs.current.forEach((el, idx) => {
      const rect = el.getBoundingClientRect()
      newTargets.set(idx, {
        x: rect.left - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      })
    })

    setPositions({ sources: newSources, targets: newTargets })
  }, [])

  useEffect(() => {
    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [updatePositions])

  // Recalculate positions after DOM settles
  useEffect(() => {
    const timer = setTimeout(updatePositions, 100)
    return () => clearTimeout(timer)
  }, [sources, targets, updatePositions])

  const handleSourceClick = (index: number) => {
    if (results) return
    setSelectedSource((prev) => (prev === index ? null : index))
  }

  const handleTargetClick = (targetIndex: number) => {
    if (results || selectedSource === null) return

    setConnections((prev) => {
      // Remove any existing connection from this source
      const filtered = prev.filter((c) => c.sourceIndex !== selectedSource)
      return [...filtered, { sourceIndex: selectedSource, targetIndex }]
    })
    setSelectedSource(null)
    playSFX('click')

    // Recalculate positions after connection
    requestAnimationFrame(updatePositions)
  }

  const handleConnectionClick = (conn: Connection) => {
    if (results) return
    setConnections((prev) =>
      prev.filter(
        (c) =>
          c.sourceIndex !== conn.sourceIndex ||
          c.targetIndex !== conn.targetIndex
      )
    )
  }

  const checkConnections = () => {
    const connectionResults: ConnectionResult[] = []

    // Check each player connection
    connections.forEach((conn) => {
      const isCorrect = correctPairs.some(
        ([s, t]) => s === conn.sourceIndex && t === conn.targetIndex
      )
      connectionResults.push({
        sourceIndex: conn.sourceIndex,
        targetIndex: conn.targetIndex,
        result: isCorrect ? 'correct' : 'wrong',
      })
    })

    // Find missed connections
    correctPairs.forEach(([s, t]) => {
      const wasConnected = connections.some(
        (c) => c.sourceIndex === s && c.targetIndex === t
      )
      if (!wasConnected) {
        connectionResults.push({
          sourceIndex: s,
          targetIndex: t,
          result: 'missed',
        })
      }
    })

    const correctCount = connectionResults.filter(
      (r) => r.result === 'correct'
    ).length
    const calculatedScore = Math.round(
      (correctCount / correctPairs.length) * 100
    )

    setResults(connectionResults)
    setScore(calculatedScore)
    playSFX(calculatedScore >= 70 ? 'success' : 'error')
  }

  const getConnectionColor = (conn: Connection): string => {
    if (!results) return 'rgba(74, 111, 165, 0.6)'

    const result = results.find(
      (r) =>
        r.sourceIndex === conn.sourceIndex &&
        r.targetIndex === conn.targetIndex
    )
    if (!result) return 'rgba(74, 111, 165, 0.6)'
    if (result.result === 'correct') return 'rgba(107, 158, 120, 0.8)'
    return 'rgba(193, 113, 71, 0.8)'
  }

  const getSourceGlow = (index: number): 'nebula' | 'signal' | 'terracotta' | undefined => {
    if (selectedSource === index) return 'nebula'
    if (!results) {
      if (connections.some((c) => c.sourceIndex === index)) return undefined
      return undefined
    }
    const result = results.find((r) => r.sourceIndex === index)
    if (!result) return undefined
    if (result.result === 'correct') return 'signal'
    if (result.result === 'wrong') return 'terracotta'
    return undefined
  }

  const getTargetGlow = (index: number): 'nebula' | 'signal' | 'terracotta' | undefined => {
    if (!results) return undefined
    const result = results.find((r) => r.targetIndex === index)
    if (!result) return undefined
    if (result.result === 'correct') return 'signal'
    if (result.result === 'wrong') return 'terracotta'
    return undefined
  }

  const isSourceConnected = (index: number) =>
    connections.some((c) => c.sourceIndex === index)

  const missedConnections = results
    ? results.filter((r) => r.result === 'missed')
    : []

  const hasConnections = connections.length > 0

  return (
    <div className={clsx('relative w-full', className)} ref={containerRef}>
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-start">
        {/* Source column */}
        <div className="flex flex-col gap-3 z-10">
          <p className="text-starlight-dim text-sm font-display uppercase tracking-wider mb-1">
            Sources
          </p>
          {sources.map((label, idx) => (
            <div
              key={`source-${idx}`}
              ref={(el) => {
                if (el) sourceRefs.current.set(idx, el)
              }}
              onClick={() => handleSourceClick(idx)}
            >
              <GlassPanel
                padding="sm"
                glow={getSourceGlow(idx)}
                hover={!results}
                className={clsx(
                  'font-mono text-sm cursor-pointer select-none transition-all',
                  selectedSource === idx &&
                    'ring-2 ring-nebula/60 border-nebula/40',
                  isSourceConnected(idx) &&
                    !results &&
                    'border-nebula/30',
                  results && 'cursor-default'
                )}
              >
                <span className="text-starlight">{label}</span>
              </GlassPanel>
            </div>
          ))}
        </div>

        {/* SVG overlay for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          {/* Active connections */}
          <AnimatePresence>
            {connections.map((conn) => {
              const fromPos = positions.sources.get(conn.sourceIndex)
              const toPos = positions.targets.get(conn.targetIndex)
              if (!fromPos || !toPos) return null

              const path = generateBezierPath(fromPos, toPos)
              const key = `conn-${conn.sourceIndex}-${conn.targetIndex}`

              return (
                <motion.path
                  key={key}
                  d={path}
                  fill="none"
                  stroke={getConnectionColor(conn)}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: { type: 'spring' as const, stiffness: 200, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  style={{
                    pointerEvents: results ? 'none' : 'stroke',
                    cursor: results ? 'default' : 'pointer',
                  }}
                  onClick={() => handleConnectionClick(conn)}
                />
              )
            })}
          </AnimatePresence>

          {/* Missed connections (shown after check) */}
          <AnimatePresence>
            {missedConnections.map((missed) => {
              const fromPos = positions.sources.get(missed.sourceIndex)
              const toPos = positions.targets.get(missed.targetIndex)
              if (!fromPos || !toPos) return null

              const path = generateBezierPath(fromPos, toPos)
              const key = `missed-${missed.sourceIndex}-${missed.targetIndex}`

              return (
                <motion.path
                  key={key}
                  d={path}
                  fill="none"
                  stroke="rgba(107, 158, 120, 0.5)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { type: 'spring' as const, stiffness: 150, damping: 30, delay: 0.3 },
                    opacity: { duration: 0.3, delay: 0.3 },
                  }}
                />
              )
            })}
          </AnimatePresence>
        </svg>

        {/* Spacer for SVG lines (desktop) */}
        <div className="hidden md:block w-32" />

        {/* Target column */}
        <div className="flex flex-col gap-3 z-10">
          <p className="text-starlight-dim text-sm font-display uppercase tracking-wider mb-1">
            Targets
          </p>
          {targets.map((label, idx) => (
            <div
              key={`target-${idx}`}
              ref={(el) => {
                if (el) targetRefs.current.set(idx, el)
              }}
              onClick={() => handleTargetClick(idx)}
            >
              <GlassPanel
                padding="sm"
                glow={getTargetGlow(idx)}
                hover={!results && selectedSource !== null}
                className={clsx(
                  'font-mono text-sm select-none transition-all',
                  selectedSource !== null && !results
                    ? 'cursor-pointer ring-1 ring-nebula/20'
                    : 'cursor-default',
                  results && 'cursor-default'
                )}
              >
                <span className="text-starlight">{label}</span>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <motion.div
        className="flex justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        {!results && hasConnections && (
          <Button variant="primary" onClick={checkConnections}>
            Check Connections
          </Button>
        )}

        {results && score !== null && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
          >
            <div className="text-center">
              <p
                className={clsx(
                  'text-2xl font-display font-bold',
                  score === 100
                    ? 'text-signal'
                    : score >= 50
                      ? 'text-nebula'
                      : 'text-terracotta'
                )}
              >
                {score}%
              </p>
              <p className="text-starlight-dim text-sm mt-1">
                {score === 100
                  ? 'All connections correct'
                  : `${results.filter((r) => r.result === 'correct').length} of ${correctPairs.length} correct`}
              </p>
            </div>
            <Button
              variant={score === 100 ? 'success' : 'primary'}
              onClick={() => onComplete(score)}
            >
              Continue
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Hint when source is selected */}
      <AnimatePresence>
        {selectedSource !== null && !results && (
          <motion.p
            className="text-center text-starlight-dim text-xs mt-4 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Now click a target to create a connection
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
