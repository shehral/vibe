'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { StarfieldBackground, GlassPanel } from '@/components/ui'
import { academySections } from '@/lib/data/academy'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
} as const

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 18 },
  },
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBackground density={100} speed={0.15} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl text-starlight tracking-[0.2em] uppercase">
            The Academy
          </h1>
          <p className="font-body text-starlight-dim mt-3 text-lg">
            Fleet Headquarters &mdash; Real-world guides and resources
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {academySections.map((section) => (
            <motion.div key={section.id} variants={item}>
              <Link href={`/academy/${section.id}`}>
                <GlassPanel
                  padding="md"
                  hover
                  className="h-full cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-display text-2xl text-nebula/60 group-hover:text-nebula transition-colors">
                      {String(section.number).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-display text-sm text-starlight uppercase tracking-wider group-hover:text-nebula transition-colors">
                        {section.title}
                      </h2>
                      <p className="font-body text-xs text-starlight-dim mt-2 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
