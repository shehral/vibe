'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import type { LearningBlock } from '@/lib/types'

interface LearningPhaseProps {
  blocks: LearningBlock[]
  onProceed: () => void
}

function LearningBlockRenderer({ block, index }: { block: LearningBlock; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
        delay: index * 0.1,
      }}
    >
      {block.type === 'text' && (
        <p
          className={clsx(
            'font-body text-starlight leading-relaxed',
            block.highlight && 'border-l-2 border-nebula pl-4 bg-nebula/5 py-2 rounded-r-lg'
          )}
        >
          {block.content}
        </p>
      )}

      {block.type === 'code' && (
        <pre
          className={clsx(
            'font-mono text-sm bg-void/50 p-4 rounded-lg',
            'border border-glass-border overflow-x-auto',
            'text-starlight'
          )}
        >
          <code>{block.content}</code>
        </pre>
      )}

      {block.type === 'stat' && (
        <div
          className={clsx(
            'border-l-2 border-terracotta pl-4 py-3 rounded-r-lg',
            'bg-terracotta/10'
          )}
        >
          <p className="font-body text-starlight font-medium">{block.content}</p>
        </div>
      )}

      {block.type === 'image' && (
        <div
          className={clsx(
            'h-48 rounded-lg border border-glass-border',
            'bg-glass flex items-center justify-center'
          )}
        >
          <span className="font-mono text-sm text-starlight-dim">
            [Image: {block.content}]
          </span>
        </div>
      )}
    </motion.div>
  )
}

export function LearningPhase({ blocks, onProceed }: LearningPhaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <GlassPanel padding="lg">
        <div className="space-y-6">
          {/* Section Header */}
          <h3 className="font-display text-lg text-nebula uppercase tracking-wider">
            Mission Intel
          </h3>

          {/* Scrollable Content Area */}
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
            {blocks.length > 0 ? (
              blocks.map((block, i) => (
                <LearningBlockRenderer key={i} block={block} index={i} />
              ))
            ) : (
              <p className="font-body text-starlight-dim italic">
                No learning content available for this mission yet.
              </p>
            )}
          </div>

          {/* Proceed Button */}
          <div className="pt-2">
            <Button onClick={onProceed} variant="primary" size="lg" className="w-full">
              Proceed to Challenge
            </Button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
