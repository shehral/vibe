'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { StarfieldBackground, GlassPanel, Button } from '@/components/ui'
import { academySections } from '@/lib/data/academy'
import { getSectionContent } from '@/lib/data/academy/index'
import type { AcademyContentBlock } from '@/lib/data/academy/types'

const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 }

function ContentBlock({ block, index }: { block: AcademyContentBlock; index: number }) {
  const delay = Math.min(index * 0.03, 0.3)

  switch (block.type) {
    case 'heading':
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
        >
          {block.level === 3 ? (
            <h3 className="font-display text-base sm:text-lg text-nebula uppercase tracking-wider mt-6 sm:mt-8 mb-3">
              {block.content}
            </h3>
          ) : (
            <h2 className="font-display text-lg sm:text-xl text-starlight uppercase tracking-wider mt-8 sm:mt-10 mb-4">
              {block.content}
            </h2>
          )}
        </motion.div>
      )

    case 'paragraph':
      return (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className="font-body text-starlight-dim leading-relaxed mb-4"
        >
          {block.content}
        </motion.p>
      )

    case 'code':
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className="mb-4"
        >
          {block.language && (
            <div className="bg-void/80 border border-glass-border border-b-0 rounded-t-lg px-4 py-1.5">
              <span className="font-mono text-xs text-nebula uppercase tracking-wider">
                {block.language}
              </span>
            </div>
          )}
          <pre
            className={clsx(
              'bg-void/60 border border-glass-border p-3 sm:p-4 overflow-x-auto',
              block.language ? 'rounded-b-lg' : 'rounded-lg'
            )}
          >
            <code className="font-mono text-xs sm:text-sm text-starlight leading-relaxed whitespace-pre">
              {block.content}
            </code>
          </pre>
        </motion.div>
      )

    case 'callout': {
      const variantStyles = {
        info: 'border-nebula/40 bg-nebula/5',
        warning: 'border-terracotta/40 bg-terracotta/5',
        tip: 'border-signal/40 bg-signal/5',
      }
      const variantLabel = {
        info: 'Info',
        warning: 'Warning',
        tip: 'Tip',
      }
      const variant = block.variant || 'info'
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className={clsx(
            'border-l-4 rounded-r-lg p-4 mb-4',
            variantStyles[variant]
          )}
        >
          <span className="font-display text-xs uppercase tracking-wider text-starlight-dim block mb-1">
            {variantLabel[variant]}
          </span>
          <p className="font-body text-sm text-starlight leading-relaxed">
            {block.content}
          </p>
        </motion.div>
      )
    }

    case 'table':
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className="mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <table className="w-full border-collapse min-w-[400px]">
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    className="font-display text-xs text-starlight uppercase tracking-wider text-left border-b border-glass-border p-3 bg-glass"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-glass-border/50 hover:bg-glass transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="font-body text-sm text-starlight-dim p-3"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )

    case 'link-card':
      return (
        <motion.a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className="block mb-3"
        >
          <GlassPanel padding="sm" hover className="cursor-pointer group">
            <h4 className="font-display text-sm text-starlight uppercase tracking-wider group-hover:text-nebula transition-colors">
              {block.title}
            </h4>
            <p className="font-body text-xs text-starlight-dim mt-1 leading-relaxed">
              {block.description}
            </p>
            {block.source && (
              <span className="font-mono text-[10px] text-nebula/60 mt-1 block">
                {block.source}
              </span>
            )}
          </GlassPanel>
        </motion.a>
      )

    case 'tool-card':
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay }}
          className="mb-3"
        >
          <GlassPanel padding="md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-display text-sm text-starlight uppercase tracking-wider">
                  {block.name}
                </h4>
                <span className="font-mono text-[10px] text-nebula/60 uppercase tracking-wider">
                  {block.category}
                </span>
                <p className="font-body text-xs text-starlight-dim mt-2 leading-relaxed">
                  {block.description}
                </p>
                {block.features && block.features.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {block.features.map((feature, i) => (
                      <li key={i} className="font-body text-xs text-starlight-dim flex items-center gap-2">
                        <span className="text-signal text-[10px]">{'\u25B8'}</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {block.url && (
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-nebula hover:text-starlight transition-colors shrink-0"
                >
                  Visit &rarr;
                </a>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      )

    default:
      return null
  }
}

export default function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = React.use(params)
  const section = academySections.find((s) => s.id === sectionId)
  const blocks = getSectionContent(sectionId)

  const currentIndex = academySections.findIndex((s) => s.id === sectionId)
  const prevSection = currentIndex > 0 ? academySections[currentIndex - 1] : null
  const nextSection = currentIndex < academySections.length - 1 ? academySections[currentIndex + 1] : null

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassPanel padding="lg">
          <div className="text-center space-y-4">
            <p className="font-body text-starlight-dim">Section not found.</p>
            <Link href="/academy">
              <Button variant="secondary">Back to Academy</Button>
            </Link>
          </div>
        </GlassPanel>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground density={80} speed={0.1} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 sm:py-12 pb-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/academy"
            className="font-mono text-xs text-nebula hover:text-starlight transition-colors uppercase tracking-wider"
          >
            &larr; Academy Index
          </Link>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="mb-10"
        >
          <span className="font-display text-3xl sm:text-4xl text-nebula/30">
            {String(section.number).padStart(2, '0')}
          </span>
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl text-starlight tracking-wider uppercase mt-2">
            {section.title}
          </h1>
          <p className="font-body text-starlight-dim mt-3">
            {section.description}
          </p>
        </motion.div>

        {/* Content blocks */}
        <div className="space-y-1">
          {blocks.length > 0 ? (
            blocks.map((block, index) => (
              <ContentBlock key={index} block={block} index={index} />
            ))
          ) : (
            <GlassPanel padding="lg">
              <p className="font-body text-starlight-dim text-center">
                Content coming soon. Check back after the next deployment.
              </p>
            </GlassPanel>
          )}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-glass-border"
        >
          {prevSection ? (
            <Link href={`/academy/${prevSection.id}`}>
              <Button variant="ghost" size="md">
                &larr; {prevSection.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextSection ? (
            <Link href={`/academy/${nextSection.id}`}>
              <Button variant="ghost" size="md">
                {nextSection.title} &rarr;
              </Button>
            </Link>
          ) : (
            <Link href="/academy">
              <Button variant="secondary" size="md">
                Back to Academy
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  )
}
