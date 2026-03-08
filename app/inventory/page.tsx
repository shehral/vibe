'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { useGame } from '@/lib/game-context'
import { StarfieldBackground, GlassPanel } from '@/components/ui'
import { items } from '@/lib/data/items'

const categoryColors: Record<string, string> = {
  tool: 'bg-nebula/20 text-nebula border-nebula/30',
  protocol: 'bg-signal/20 text-signal border-signal/30',
  pattern: 'bg-terracotta/20 text-terracotta border-terracotta/30',
  defense: 'bg-starlight/15 text-starlight border-starlight/30',
}

const categoryIcons: Record<string, string> = {
  tool: '#4a6fa5',
  protocol: '#6b9e78',
  pattern: '#c17147',
  defense: '#e8e0d4',
}

export default function InventoryPage() {
  const { state, loading } = useGame()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  if (loading || !state) return null

  const acquiredCount = state.inventory.length

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
              Inventory
            </h1>
            <p className="font-mono text-sm text-starlight-dim">
              {acquiredCount} / {items.length} Items Collected
            </p>
          </div>
        </motion.div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const acquired = state.inventory.includes(item.id)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 100,
                  damping: 15,
                  delay: 0.05 * index,
                }}
              >
                <GlassPanel
                  padding="md"
                  glow={acquired ? getCategoryGlow(item.category) : undefined}
                  className={clsx(!acquired && 'opacity-40')}
                >
                  <div className="space-y-3">
                    {/* Icon */}
                    <div className="flex items-start justify-between">
                      {acquired ? (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-display border-2 border-glass-border"
                          style={{ color: '#e8e0d450' }}
                        >
                          ?
                        </div>
                      )}

                      {/* Category badge */}
                      <span
                        className={clsx(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider border',
                          categoryColors[item.category]
                        )}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-lg text-starlight tracking-wide">
                      {acquired ? item.name : '???'}
                    </h3>

                    {/* Real-world tool */}
                    {acquired && (
                      <p className="font-mono text-xs text-nebula">
                        {item.realWorldTool}
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-body text-sm text-starlight-dim leading-relaxed">
                      {acquired ? item.description : '???'}
                    </p>
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

function getCategoryGlow(category: string): 'nebula' | 'signal' | 'terracotta' | 'starlight' {
  switch (category) {
    case 'tool':
      return 'nebula'
    case 'protocol':
      return 'signal'
    case 'pattern':
      return 'terracotta'
    case 'defense':
      return 'starlight'
    default:
      return 'nebula'
  }
}
