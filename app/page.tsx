'use client'

import { StarfieldBackground, GlassPanel, Button, TypewriterText, StatGauge } from '@/components/ui'

export default function Home() {
  return (
    <>
      <StarfieldBackground />
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-8">
          <GlassPanel glow="nebula" padding="lg">
            <h1 className="font-display text-5xl tracking-wider text-starlight mb-2">
              VIBE VOYAGER
            </h1>
            <TypewriterText
              text="The Agentic Coding Odyssey — explore the cosmos of modern software engineering."
              className="font-body text-lg text-starlight-dim"
              speed={25}
            />
          </GlassPanel>

          <GlassPanel padding="md">
            <h2 className="font-display text-xl tracking-wider text-nebula mb-4">Stat Gauges</h2>
            <div className="space-y-3">
              <StatGauge stat="vibe" value={7} />
              <StatGauge stat="architecture" value={5} />
              <StatGauge stat="protocol" value={8} />
              <StatGauge stat="command" value={4} />
            </div>
          </GlassPanel>

          <GlassPanel padding="md">
            <h2 className="font-display text-xl tracking-wider text-nebula mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </GlassPanel>

          <GlassPanel hover glow="signal" padding="md">
            <p className="font-mono text-sm text-starlight-dim">
              Hover this panel — it has hover effects and a signal glow.
            </p>
          </GlassPanel>
        </div>
      </main>
    </>
  )
}
