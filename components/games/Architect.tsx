'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ArchNode {
  id: string
  label: string
}

interface ArchSlot {
  id: string
  label: string
  correctNodeId: string
}

interface ArchitectProps {
  nodes: ArchNode[]
  slots: ArchSlot[]
  onComplete: (score: number) => void
  className?: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Architect({ nodes, slots, onComplete, className }: ArchitectProps) {
  // Map of slotId -> placed nodeId
  const [placements, setPlacements] = useState<Record<string, string>>({})
  // Which slot is being hovered during drag (for border highlight)
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null)
  // The node id currently being dragged (to know correctness for border color)
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)
  // Mobile: tapped/selected node id
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  // Check state
  const [checked, setChecked] = useState(false)
  // Results per slot after checking
  const [results, setResults] = useState<Record<string, boolean>>({})

  // Nodes still in the sidebar (not yet placed)
  const availableNodes = nodes.filter(
    (n) => !Object.values(placements).includes(n.id)
  )

  const allSlotsFilled = slots.every((s) => placements[s.id] !== undefined)

  // ------- Drag handlers -------

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, nodeId: string) => {
      e.dataTransfer.setData('text/plain', nodeId)
      e.dataTransfer.effectAllowed = 'move'
      setDraggingNodeId(nodeId)
    },
    []
  )

  const handleDragEnd = useCallback(() => {
    setDraggingNodeId(null)
    setHoveredSlotId(null)
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setHoveredSlotId(slotId)
    },
    []
  )

  const handleDragLeave = useCallback(() => {
    setHoveredSlotId(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
      e.preventDefault()
      const nodeId = e.dataTransfer.getData('text/plain')
      if (!nodeId) return

      // If another node is already in this slot, send it back to sidebar
      setPlacements((prev) => {
        const next = { ...prev }
        // Remove the dropped node from any other slot it might be in
        for (const key of Object.keys(next)) {
          if (next[key] === nodeId) {
            delete next[key]
          }
        }
        next[slotId] = nodeId
        return next
      })
      setHoveredSlotId(null)
      setDraggingNodeId(null)
      // Reset check state if user modifies after checking
      if (checked) {
        setChecked(false)
        setResults({})
      }
    },
    [checked]
  )

  // ------- Mobile tap handlers -------

  const handleNodeTap = useCallback(
    (nodeId: string) => {
      // Toggle selection
      setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId))
    },
    []
  )

  const handleSlotTap = useCallback(
    (slotId: string) => {
      if (!selectedNodeId) return

      setPlacements((prev) => {
        const next = { ...prev }
        // Remove the selected node from any other slot
        for (const key of Object.keys(next)) {
          if (next[key] === selectedNodeId) {
            delete next[key]
          }
        }
        next[slotId] = selectedNodeId
        return next
      })
      setSelectedNodeId(null)
      if (checked) {
        setChecked(false)
        setResults({})
      }
    },
    [selectedNodeId, checked]
  )

  // ------- Remove placed node (click to return to sidebar) -------

  const handleRemoveNode = useCallback(
    (slotId: string) => {
      setPlacements((prev) => {
        const next = { ...prev }
        delete next[slotId]
        return next
      })
      if (checked) {
        setChecked(false)
        setResults({})
      }
    },
    [checked]
  )

  // ------- Check answer -------

  const handleCheck = useCallback(() => {
    const newResults: Record<string, boolean> = {}
    let correct = 0
    for (const slot of slots) {
      const isCorrect = placements[slot.id] === slot.correctNodeId
      newResults[slot.id] = isCorrect
      if (isCorrect) correct++
    }
    setResults(newResults)
    setChecked(true)
  }, [placements, slots])

  const score = checked
    ? Math.round((Object.values(results).filter(Boolean).length / slots.length) * 100)
    : 0

  // ------- Slot border color logic -------

  function getSlotBorderClass(slot: ArchSlot) {
    // After checking: green/red based on correctness
    if (checked && results[slot.id] !== undefined) {
      return results[slot.id]
        ? 'border-signal shadow-[0_0_12px_rgba(107,158,120,0.4)]'
        : 'border-terracotta shadow-[0_0_12px_rgba(193,113,71,0.4)]'
    }
    // During drag hover
    if (hoveredSlotId === slot.id && draggingNodeId) {
      return draggingNodeId === slot.correctNodeId
        ? 'border-signal'
        : 'border-terracotta'
    }
    // Default dashed
    return 'border-starlight/20'
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springTransition}
      className={clsx('w-full max-w-4xl mx-auto', className)}
    >
      <GlassPanel padding="lg">
        <div className="space-y-6">
          {/* Header */}
          <h3 className="font-display text-lg text-nebula uppercase tracking-wider">
            System Architect
          </h3>
          <p className="font-body text-starlight-dim text-sm">
            Drag each component into its correct slot to build the system diagram.
            <span className="hidden md:inline"> On mobile, tap a component then tap a slot.</span>
          </p>

          {/* Two-panel layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar: available nodes */}
            <div className="md:w-1/3 shrink-0">
              <h4 className="font-display text-sm text-starlight-dim uppercase tracking-wider mb-3">
                Components
              </h4>
              <div className="flex flex-row md:flex-col flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {availableNodes.map((node) => (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={springTransition}
                      draggable="true"
                      onDragStart={(e) =>
                        handleDragStart(
                          e as unknown as React.DragEvent<HTMLDivElement>,
                          node.id
                        )
                      }
                      onDragEnd={handleDragEnd}
                      onClick={() => handleNodeTap(node.id)}
                      className={clsx(
                        'px-4 py-3 rounded-xl cursor-grab active:cursor-grabbing select-none',
                        'bg-glass backdrop-blur-md border border-glass-border',
                        'font-mono text-sm text-starlight',
                        'hover:bg-glass-hover hover:border-glass-active transition-colors',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50',
                        selectedNodeId === node.id &&
                          'ring-2 ring-nebula border-nebula bg-nebula/10'
                      )}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Component: ${node.label}`}
                    >
                      {node.label}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {availableNodes.length === 0 && !checked && (
                  <p className="font-body text-xs text-starlight-dim italic">
                    All components placed.
                  </p>
                )}
              </div>
            </div>

            {/* Right area: drop zone slots */}
            <div className="flex-1">
              <h4 className="font-display text-sm text-starlight-dim uppercase tracking-wider mb-3">
                Diagram Slots
              </h4>
              <div className="grid gap-3">
                {slots.map((slot) => {
                  const placedNodeId = placements[slot.id]
                  const placedNode = placedNodeId
                    ? nodes.find((n) => n.id === placedNodeId)
                    : null

                  return (
                    <motion.div
                      key={slot.id}
                      layout
                      transition={springTransition}
                      className={clsx(
                        'relative min-h-[56px] rounded-xl p-4 transition-all duration-200',
                        'border-2 border-dashed',
                        getSlotBorderClass(slot),
                        !placedNode && 'bg-void/30',
                        placedNode && 'bg-glass backdrop-blur-md'
                      )}
                      onDragOver={(e) =>
                        handleDragOver(
                          e as unknown as React.DragEvent<HTMLDivElement>,
                          slot.id
                        )
                      }
                      onDragLeave={handleDragLeave}
                      onDrop={(e) =>
                        handleDrop(
                          e as unknown as React.DragEvent<HTMLDivElement>,
                          slot.id
                        )
                      }
                      onClick={() => {
                        if (placedNode && !checked) {
                          handleRemoveNode(slot.id)
                        } else if (!placedNode) {
                          handleSlotTap(slot.id)
                        }
                      }}
                      role="region"
                      aria-label={`Slot: ${slot.label}`}
                    >
                      {/* Slot hint label */}
                      <span
                        className={clsx(
                          'font-display text-xs uppercase tracking-wider',
                          placedNode ? 'text-starlight-dim' : 'text-starlight/30'
                        )}
                      >
                        {slot.label}
                      </span>

                      {/* Placed node */}
                      <AnimatePresence mode="wait">
                        {placedNode && (
                          <motion.div
                            key={placedNode.id}
                            initial={{ opacity: 0, y: -8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.9 }}
                            transition={springTransition}
                            className={clsx(
                              'mt-2 px-3 py-2 rounded-lg',
                              'bg-nebula/10 border border-nebula/30',
                              'font-mono text-sm text-starlight',
                              !checked && 'cursor-pointer hover:bg-nebula/20 transition-colors'
                            )}
                          >
                            {placedNode.label}
                            {!checked && (
                              <span className="ml-2 text-starlight-dim text-xs">
                                (click to remove)
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Empty state hint */}
                      {!placedNode && (
                        <p className="mt-1 font-body text-xs text-starlight/20 italic">
                          Drop component here
                        </p>
                      )}

                      {/* Result indicator after check */}
                      {checked && results[slot.id] !== undefined && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={springTransition}
                          className={clsx(
                            'absolute top-3 right-3 font-display text-xs uppercase tracking-wider',
                            results[slot.id] ? 'text-signal' : 'text-terracotta'
                          )}
                        >
                          {results[slot.id] ? 'Correct' : 'Wrong'}
                        </motion.span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {!checked ? (
              <Button
                onClick={handleCheck}
                variant="primary"
                size="lg"
                disabled={!allSlotsFilled}
                className="w-full sm:w-auto"
              >
                Check Answer
              </Button>
            ) : (
              <>
                {/* Score display */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={springTransition}
                  className="font-display text-lg tracking-wider"
                >
                  <span className="text-starlight-dim">Score: </span>
                  <span
                    className={clsx(
                      score === 100 ? 'text-signal' : score >= 50 ? 'text-nebula' : 'text-terracotta'
                    )}
                  >
                    {score}%
                  </span>
                </motion.div>

                <Button
                  onClick={() => onComplete(score)}
                  variant="success"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Continue
                </Button>
              </>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
