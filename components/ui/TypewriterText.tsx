'use client'

import { useState, useEffect, useCallback } from 'react'
import { clsx } from 'clsx'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
}

export function TypewriterText({ text, speed = 30, className, onComplete, showCursor = true }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const skipToEnd = useCallback(() => {
    setDisplayedText(text)
    setIsComplete(true)
    onComplete?.()
  }, [text, onComplete])

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span className={clsx(className)} onClick={!isComplete ? skipToEnd : undefined}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="inline-block w-2 h-5 ml-0.5 bg-starlight animate-pulse" />
      )}
    </span>
  )
}
