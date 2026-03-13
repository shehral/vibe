'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { StarfieldBackground, GlassPanel, Button, PageTransition } from '@/components/ui'
import { hasSave } from '@/lib/game-state'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
} as const

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
}

export default function Home() {
  const [saveExists, setSaveExists] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setSaveExists(hasSave())
    setMounted(true)
  }, [])

  return (
    <PageTransition>
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <StarfieldBackground />

        <motion.div
          className="text-center z-10 px-4 flex flex-col items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Title */}
          <motion.div variants={item}>
            <h1
              className={clsx(
                'font-display text-4xl md:text-6xl lg:text-7xl',
                'tracking-[0.25em] md:tracking-[0.3em]',
                'text-starlight',
                'animate-title-glow'
              )}
            >
              VIBE VOYAGER
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className={clsx(
              'font-body text-lg md:text-xl',
              'text-starlight-dim tracking-wide',
              'mt-5'
            )}
          >
            The Agentic Coding Odyssey
          </motion.p>

          {/* Menu buttons */}
          <motion.nav
            variants={item}
            className="flex flex-col items-center gap-4 mt-12"
          >
            <Link href="/create" className="w-64">
              <Button variant="primary" size="lg" className="w-full">
                New Game
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              className="w-64"
              disabled={!mounted || !saveExists}
              onClick={() => {
                if (saveExists) router.push('/cockpit')
              }}
            >
              Continue
            </Button>

            <Link href="/academy" className="w-64">
              <Button variant="secondary" size="lg" className="w-full">
                Academy
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="md"
              className="w-64 mt-2"
              onClick={() => setShowAbout(true)}
            >
              About
            </Button>
          </motion.nav>

          {/* Version / credit */}
          <motion.p
            variants={item}
            className="text-xs text-starlight-dim/50 mt-14"
          >
            Built with Claude Code &amp; Agent Teams
          </motion.p>
        </motion.div>

        {/* About overlay */}
        <AnimatePresence>
          {showAbout && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-void/70 backdrop-blur-sm"
                onClick={() => setShowAbout(false)}
              />
              <motion.div
                className="relative z-10 max-w-lg w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
              >
                <GlassPanel padding="lg" glow="nebula">
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl text-starlight tracking-wider uppercase">
                      About Vibe Voyager
                    </h2>
                    <p className="font-body text-starlight-dim leading-relaxed text-sm">
                      An interactive space exploration game teaching vibe coding, agentic AI, and modern software engineering practices. Journey from beginner to fleet commander across 8 planets, 34 missions, and 10 Academy sections.
                    </p>
                    <div className="space-y-2 text-xs font-mono text-starlight-dim/70">
                      <p>Built by <span className="text-nebula">Shehral Ali</span></p>
                      <p>Powered by <span className="text-nebula">Claude Code</span> with parallel agent teams</p>
                      <p>Stack: Next.js 15, TypeScript, Tailwind v4, Motion, Canvas, Howler.js</p>
                    </div>
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowAbout(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  )
}
