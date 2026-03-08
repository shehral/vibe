'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { audio } from '@/lib/audio'

type SFXName =
  | 'click'
  | 'hover'
  | 'warp'
  | 'mission-complete'
  | 'dialogue-blip'
  | 'success'
  | 'error'
  | 'rank-up'

interface AudioContextType {
  muted: boolean
  toggleMute: () => void
  playSFX: (name: SFXName) => void
}

const AudioContext = createContext<AudioContextType>({
  muted: false,
  toggleMute: () => {},
  playSFX: () => {},
})

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    audio.init()
    setMuted(audio.muted)

    // Start ambient audio on first user interaction (browser autoplay policy)
    const handleInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true)
        audio.playAmbient()
      }
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [userInteracted])

  const toggleMute = useCallback(() => {
    const newMuted = audio.toggleMute()
    setMuted(newMuted)
    if (newMuted) {
      audio.stopAmbient()
    } else {
      audio.playAmbient()
    }
  }, [])

  const playSFX = useCallback((name: SFXName) => {
    audio.playSFX(name)
  }, [])

  return (
    <AudioContext.Provider value={{ muted, toggleMute, playSFX }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  return useContext(AudioContext)
}

export function AudioToggle() {
  const { muted, toggleMute } = useAudio()

  return (
    <button
      onClick={toggleMute}
      className="p-2 text-starlight-dim hover:text-starlight transition-colors"
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
    >
      {muted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  )
}
