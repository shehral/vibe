'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel, Button } from '@/components/ui'
import { useAudio } from '@/components/audio/AudioManager'

export interface TaskItem {
  id: string
  label: string
  description: string
}

export interface AgentItem {
  id: string
  label: string
  specialty: string
}

export interface CommandProps {
  tasks: TaskItem[]
  agents: AgentItem[]
  correctAssignments: Record<string, string>
  onComplete: (score: number) => void
  className?: string
}

interface AssignmentResult {
  taskId: string
  assignedAgentId: string
  correctAgentId: string
  isCorrect: boolean
}

const springTransition = { type: 'spring' as const, stiffness: 400, damping: 25 }

export function Command({ tasks, agents, correctAssignments, onComplete, className }: CommandProps) {
  const { playSFX } = useAudio()
  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<AssignmentResult[]>([])
  const [score, setScore] = useState(0)
  const [draggedAgentId, setDraggedAgentId] = useState<string | null>(null)
  const taskRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const allAssigned = tasks.every((task) => assignments[task.id])

  const getAssignedAgent = useCallback(
    (taskId: string): AgentItem | undefined => {
      const agentId = assignments[taskId]
      return agentId ? agents.find((a) => a.id === agentId) : undefined
    },
    [assignments, agents]
  )

  const isAgentAssigned = useCallback(
    (agentId: string): boolean => {
      return Object.values(assignments).includes(agentId)
    },
    [assignments]
  )

  function assignAgent(taskId: string, agentId: string) {
    setAssignments((prev) => {
      const next = { ...prev }

      // If this agent is already assigned elsewhere, remove that assignment
      for (const [tid, aid] of Object.entries(next)) {
        if (aid === agentId) {
          delete next[tid]
        }
      }

      // If this task already has an agent, that agent returns to pool (just overwrite)
      next[taskId] = agentId

      return next
    })
  }

  function handleTaskClick(taskId: string) {
    if (checked) return

    if (selectedAgentId) {
      assignAgent(taskId, selectedAgentId)
      setSelectedAgentId(null)
      playSFX('click')
    }
  }

  function handleAgentClick(agentId: string) {
    if (checked) return

    if (selectedAgentId === agentId) {
      setSelectedAgentId(null)
    } else {
      setSelectedAgentId(agentId)
    }
  }

  function handleDragEnd(agentId: string, event: PointerEvent) {
    setDraggedAgentId(null)

    // Find which task card the pointer is over
    const x = event.clientX
    const y = event.clientY

    for (const [taskId, el] of taskRefs.current.entries()) {
      const rect = el.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        assignAgent(taskId, agentId)
        return
      }
    }
  }

  function handleCheck() {
    const assignmentResults: AssignmentResult[] = tasks.map((task) => ({
      taskId: task.id,
      assignedAgentId: assignments[task.id],
      correctAgentId: correctAssignments[task.id],
      isCorrect: assignments[task.id] === correctAssignments[task.id],
    }))

    const correct = assignmentResults.filter((r) => r.isCorrect).length
    const calculatedScore = Math.round((correct / tasks.length) * 100)

    setResults(assignmentResults)
    setScore(calculatedScore)
    setChecked(true)
    playSFX(calculatedScore >= 70 ? 'success' : 'error')
  }

  function getTaskResult(taskId: string): AssignmentResult | undefined {
    return results.find((r) => r.taskId === taskId)
  }

  function getCorrectAgentLabel(taskId: string): string {
    const correctId = correctAssignments[taskId]
    const agent = agents.find((a) => a.id === correctId)
    return agent?.label ?? 'Unknown'
  }

  return (
    <GlassPanel className={clsx('max-w-3xl w-full', className)} padding="lg">
      <AnimatePresence mode="wait">
        {!checked ? (
          <motion.div
            key="assignment"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={springTransition}
          >
            <h3 className="font-display text-xl text-starlight mb-2 uppercase tracking-wider">
              Command Center
            </h3>
            <p className="font-body text-sm text-starlight-dim leading-relaxed mb-6">
              Assign each agent to the task that matches their specialty.
              {' '}
              <span className="text-starlight-dim/60">
                Drag agents to tasks, or tap an agent then tap a task.
              </span>
            </p>

            {/* Task cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {tasks.map((task, index) => {
                const assignedAgent = getAssignedAgent(task.id)
                const isDropTarget = selectedAgentId !== null || draggedAgentId !== null

                return (
                  <motion.div
                    key={task.id}
                    ref={(el) => {
                      if (el) taskRefs.current.set(task.id, el)
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springTransition, delay: index * 0.05 }}
                    onClick={() => handleTaskClick(task.id)}
                    className={clsx(
                      'bg-void/40 border rounded-xl p-4 transition-colors cursor-pointer',
                      isDropTarget
                        ? 'border-nebula/40 shadow-glow-nebula/20'
                        : 'border-glass-border',
                      'hover:border-nebula/30'
                    )}
                  >
                    <p className="font-display text-sm text-starlight uppercase tracking-wider mb-1">
                      {task.label}
                    </p>
                    <p className="font-body text-xs text-starlight-dim leading-relaxed mb-3">
                      {task.description}
                    </p>

                    {/* Assignment slot */}
                    <div
                      className={clsx(
                        'h-9 rounded-lg border border-dashed flex items-center justify-center transition-colors',
                        assignedAgent
                          ? 'border-nebula/50 bg-nebula/10'
                          : 'border-glass-border bg-void/20'
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {assignedAgent ? (
                          <motion.span
                            key={assignedAgent.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={springTransition}
                            className="font-mono text-xs text-nebula px-3 py-1"
                          >
                            {assignedAgent.label}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-xs text-starlight-dim"
                          >
                            Drop agent here
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Agent tokens */}
            <div className="mb-6">
              <p className="font-mono text-xs text-starlight-dim uppercase tracking-wider mb-3">
                Available Agents
              </p>
              <div className="flex flex-wrap gap-2">
                {agents.map((agent, index) => {
                  const assigned = isAgentAssigned(agent.id)
                  const selected = selectedAgentId === agent.id

                  return (
                    <motion.div
                      key={agent.id}
                      drag
                      dragSnapToOrigin
                      onDragStart={() => setDraggedAgentId(agent.id)}
                      onDragEnd={(event) =>
                        handleDragEnd(agent.id, event as unknown as PointerEvent)
                      }
                      whileDrag={{ scale: 1.1, zIndex: 50 }}
                      onClick={() => handleAgentClick(agent.id)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{
                        opacity: assigned ? 0.4 : 1,
                        y: 0,
                        scale: selected ? 1.05 : 1,
                      }}
                      transition={{ ...springTransition, delay: index * 0.03 }}
                      className={clsx(
                        'flex flex-col rounded-lg border px-3 py-2 cursor-grab active:cursor-grabbing select-none',
                        'transition-colors',
                        selected
                          ? 'border-nebula bg-nebula/20 shadow-glow-nebula'
                          : assigned
                            ? 'border-glass-border/50 bg-void/30'
                            : 'border-glass-border bg-glass hover:border-nebula/40',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50'
                      )}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleAgentClick(agent.id)
                        }
                      }}
                    >
                      <span className="font-display text-xs text-starlight uppercase tracking-wider">
                        {agent.label}
                      </span>
                      <span className="font-mono text-[10px] text-starlight-dim leading-tight">
                        {agent.specialty}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <Button
              onClick={handleCheck}
              disabled={!allAssigned}
              variant="primary"
              size="md"
            >
              Check Assignments
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
              Mission Report
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {tasks.map((task, index) => {
                const result = getTaskResult(task.id)
                const assignedAgent = agents.find((a) => a.id === result?.assignedAgentId)

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springTransition, delay: 0.15 + index * 0.05 }}
                    className={clsx(
                      'bg-void/40 border rounded-xl p-4',
                      result?.isCorrect
                        ? 'border-signal/50'
                        : 'border-terracotta/50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-display text-sm text-starlight uppercase tracking-wider">
                        {task.label}
                      </p>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ...springTransition, delay: 0.3 + index * 0.05 }}
                        className={clsx(
                          'text-lg',
                          result?.isCorrect ? 'text-signal' : 'text-terracotta'
                        )}
                      >
                        {result?.isCorrect ? '\u2713' : '\u2717'}
                      </motion.span>
                    </div>

                    <div
                      className={clsx(
                        'rounded-lg border px-3 py-1.5 mb-1',
                        result?.isCorrect
                          ? 'border-signal/30 bg-signal/10'
                          : 'border-terracotta/30 bg-terracotta/10'
                      )}
                    >
                      <span
                        className={clsx(
                          'font-mono text-xs',
                          result?.isCorrect ? 'text-signal' : 'text-terracotta'
                        )}
                      >
                        {assignedAgent?.label}
                      </span>
                    </div>

                    {!result?.isCorrect && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="font-mono text-[10px] text-starlight-dim mt-1"
                      >
                        Correct: {getCorrectAgentLabel(task.id)}
                      </motion.p>
                    )}
                  </motion.div>
                )
              })}
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
