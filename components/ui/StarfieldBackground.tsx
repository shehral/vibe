'use client'

import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface StarfieldBackgroundProps {
  density?: number
  speed?: number
  className?: string
}

export function StarfieldBackground({ density = 200, speed = 0.5, className }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = []
      for (let i = 0; i < density; i++) {
        // 3 layers: distant (slow, small, dim), medium, close (fast, big, bright)
        const layer = Math.random()
        let starSpeed: number, size: number, opacity: number
        if (layer < 0.6) {
          // Distant
          starSpeed = 0.1 * speed
          size = Math.random() * 1 + 0.5
          opacity = Math.random() * 0.3 + 0.1
        } else if (layer < 0.85) {
          // Medium
          starSpeed = 0.3 * speed
          size = Math.random() * 1.5 + 1
          opacity = Math.random() * 0.4 + 0.3
        } else {
          // Close
          starSpeed = 0.6 * speed
          size = Math.random() * 2 + 1.5
          opacity = Math.random() * 0.4 + 0.5
        }
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity,
          speed: starSpeed,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of starsRef.current) {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 224, 212, ${star.opacity})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      className={clsx('fixed inset-0 -z-10', className)}
      style={{ background: '#0a0f1a' }}
    />
  )
}
