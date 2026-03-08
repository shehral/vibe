import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { GameProvider } from '@/lib/game-context'
import { AudioProvider } from '@/components/audio/AudioManager'
import { NavBar } from '@/components/game/NavBar'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vibe Voyager — The Agentic Coding Odyssey',
  description: 'An interactive space exploration game teaching vibe coding, agentic AI, and modern software engineering. From beginner to agentic developer.',
  keywords: ['vibe coding', 'agentic AI', 'AI engineering', 'MCP', 'Claude Code', 'interactive learning'],
  authors: [{ name: 'Shehral' }],
  openGraph: {
    title: 'Vibe Voyager — The Agentic Coding Odyssey',
    description: 'An interactive space exploration game teaching vibe coding, agentic AI, and modern software engineering.',
    type: 'website',
    url: 'https://vibe.shehral.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void text-starlight font-body antialiased min-h-screen overflow-x-hidden">
        <GameProvider>
          <AudioProvider>
            <div className="pb-20">
              {children}
            </div>
            <NavBar />
          </AudioProvider>
        </GameProvider>
      </body>
    </html>
  )
}
