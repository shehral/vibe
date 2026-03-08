export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="font-display text-6xl tracking-wider text-starlight">
          VIBE VOYAGER
        </h1>
        <p className="font-body text-xl text-starlight-dim">
          The Agentic Coding Odyssey
        </p>
        <div className="flex gap-4 justify-center">
          <div className="px-6 py-3 bg-glass border border-glass-border rounded-xl backdrop-blur-md text-nebula">
            Glassmorphism Panel
          </div>
          <div className="px-6 py-3 bg-glass border border-glass-border rounded-xl backdrop-blur-md text-signal">
            Signal Green
          </div>
          <div className="px-6 py-3 bg-glass border border-glass-border rounded-xl backdrop-blur-md text-terracotta">
            Terracotta
          </div>
        </div>
        <p className="font-mono text-sm text-starlight-dim">
          const agent = await createAgent(config)
        </p>
      </div>
    </main>
  )
}
