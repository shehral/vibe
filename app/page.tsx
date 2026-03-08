'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { StarfieldBackground, Button } from '@/components/ui'
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
  const router = useRouter()

  useEffect(() => {
    setSaveExists(hasSave())
    setMounted(true)
  }, [])

  return (
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
            onClick={() => {}}
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

    </main>
  )
}
