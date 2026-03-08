'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { useGame } from '@/lib/game-context'
import { planets, MISSION_COUNTS } from '@/lib/data/planets'
import { getPlanetStatus } from '@/lib/game-state'
import type { PlanetId } from '@/lib/types'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface StarMapProps {
  className?: string
}

// Planet positions (normalized 0-100)
const ACADEMY_POSITION = { x: 50, y: 5 }

// Act region label positions
const ACT_LABELS: { label: string; x: number; y: number }[] = [
  { label: 'ACT 1', x: 42, y: 56 },
  { label: 'ACT 2', x: 50, y: 32 },
  { label: 'ACT 3', x: 53, y: 14 },
]

export function StarMap({ className }: StarMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { state } = useGame()
  const router = useRouter()
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const starsRef = useRef<Star[]>([])
  const tooltipRef = useRef<{ text: string; x: number; y: number; alpha: number } | null>(null)

  // Convert normalized (0-100) to canvas coords
  const toCanvas = useCallback(
    (x: number, y: number, width: number, height: number) => {
      const padding = 60
      return {
        cx: padding + (x / 100) * (width - padding * 2),
        cy: padding + (y / 100) * (height - padding * 2),
      }
    },
    []
  )

  // Initialize 3-layer parallax stars
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    const count = 200
    for (let i = 0; i < count; i++) {
      const layer = Math.random()
      let speed: number, size: number, opacity: number
      if (layer < 0.6) {
        // Distant layer
        speed = 0.08
        size = Math.random() * 1 + 0.5
        opacity = Math.random() * 0.3 + 0.1
      } else if (layer < 0.85) {
        // Medium layer
        speed = 0.2
        size = Math.random() * 1.5 + 1
        opacity = Math.random() * 0.4 + 0.3
      } else {
        // Close layer
        speed = 0.4
        size = Math.random() * 2 + 1.5
        opacity = Math.random() * 0.4 + 0.5
      }
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        opacity,
        speed,
      })
    }
    starsRef.current = stars
  }, [])

  // Count completed missions for a planet
  const getCompletedCount = useCallback(
    (planetId: string): number => {
      if (!state) return 0
      let completed = 0
      for (const [id, progress] of Object.entries(state.missionProgress)) {
        if (id.startsWith(planetId) && progress.status === 'completed') completed++
      }
      return completed
    },
    [state]
  )

  // Draw a checkmark
  const drawCheckmark = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.4, cy)
      ctx.lineTo(cx - size * 0.1, cy + size * 0.3)
      ctx.lineTo(cx + size * 0.4, cy - size * 0.3)
      ctx.strokeStyle = '#0a0f1a'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    },
    []
  )

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !state) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initStars(window.innerWidth, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const w = () => window.innerWidth
    const h = () => window.innerHeight

    const render = () => {
      timeRef.current += 0.016
      const t = timeRef.current
      const width = w()
      const height = h()

      ctx.save()
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0)

      // Background
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#0a0f1a'
      ctx.fillRect(0, 0, width, height)

      // Draw 3-layer parallax stars
      for (const star of starsRef.current) {
        star.y += star.speed
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 224, 212, ${star.opacity})`
        ctx.fill()
      }

      // Draw act region labels
      for (const act of ACT_LABELS) {
        const { cx, cy } = toCanvas(act.x, act.y, width, height)
        ctx.font = '600 14px "Space Grotesk", sans-serif'
        ctx.fillStyle = 'rgba(232, 224, 212, 0.08)'
        ctx.textAlign = 'center'
        // Manually space letters for wide tracking effect
        const chars = act.label.split('')
        const spacing = 6
        const totalWidth = (chars.length - 1) * spacing
        let startX = cx - totalWidth / 2
        for (const char of chars) {
          ctx.fillText(char, startX, cy)
          startX += spacing
        }
      }

      // Draw connection lines between planets
      for (const planet of planets) {
        const status = getPlanetStatus(
          planet.id as PlanetId,
          state,
          MISSION_COUNTS as Record<PlanetId, number>
        )
        const { cx, cy } = toCanvas(planet.position.x, planet.position.y, width, height)

        for (const prereqId of planet.prerequisites) {
          const prereq = planets.find((p) => p.id === prereqId)
          if (!prereq) continue
          const { cx: px, cy: py } = toCanvas(
            prereq.position.x,
            prereq.position.y,
            width,
            height
          )

          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(cx, cy)
          if (status === 'locked') {
            ctx.strokeStyle = 'rgba(232, 224, 212, 0.1)'
            ctx.setLineDash([5, 10])
          } else {
            ctx.strokeStyle = 'rgba(232, 224, 212, 0.3)'
            ctx.setLineDash([])
          }
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Draw planets
      for (const planet of planets) {
        const status = getPlanetStatus(
          planet.id as PlanetId,
          state,
          MISSION_COUNTS as Record<PlanetId, number>
        )
        const { cx, cy } = toCanvas(planet.position.x, planet.position.y, width, height)
        const radius = 22

        ctx.save()

        // Planet circle
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)

        if (status === 'locked') {
          ctx.fillStyle = 'rgba(100, 100, 100, 0.3)'
          ctx.fill()
        } else if (status === 'available') {
          const pulse = 0.5 + Math.sin(t * 2) * 0.3
          ctx.globalAlpha = pulse
          ctx.shadowColor = planet.color
          ctx.shadowBlur = 20
          ctx.fillStyle = planet.color
          ctx.fill()
          ctx.globalAlpha = 1
          ctx.shadowBlur = 0
        } else if (status === 'in_progress') {
          ctx.globalAlpha = 0.8
          ctx.shadowColor = planet.color
          ctx.shadowBlur = 15
          ctx.fillStyle = planet.color
          ctx.fill()
          ctx.globalAlpha = 1
          ctx.shadowBlur = 0
        } else {
          // completed
          ctx.shadowColor = planet.color
          ctx.shadowBlur = 25
          ctx.fillStyle = planet.color
          ctx.fill()
          ctx.shadowBlur = 0
        }

        ctx.restore()

        // Orbital ring for in_progress/completed
        if (status === 'in_progress' || status === 'completed') {
          const totalMissions = MISSION_COUNTS[planet.id] || 1
          const completedMissions = getCompletedCount(planet.id)
          const progress = status === 'completed' ? 1 : completedMissions / totalMissions
          const endAngle = Math.PI * 2 * progress

          ctx.beginPath()
          ctx.arc(cx, cy, radius + 6, -Math.PI / 2, -Math.PI / 2 + endAngle)
          ctx.strokeStyle = planet.color
          ctx.lineWidth = 2
          ctx.shadowColor = planet.color
          ctx.shadowBlur = 8
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Checkmark for completed
        if (status === 'completed') {
          drawCheckmark(ctx, cx, cy, radius * 0.8)
        }

        // Planet name label
        ctx.font = '12px Inter, sans-serif'
        ctx.fillStyle =
          status === 'locked' ? 'rgba(232, 224, 212, 0.3)' : 'rgba(232, 224, 212, 0.8)'
        ctx.textAlign = 'center'
        ctx.fillText(planet.name, cx, cy + radius + 20)
      }

      // Academy station at top (diamond shape)
      const { cx: acx, cy: acy } = toCanvas(
        ACADEMY_POSITION.x,
        ACADEMY_POSITION.y,
        width,
        height
      )
      const academyPulse = 0.7 + Math.sin(t * 1.5) * 0.3

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(acx, acy - 18)
      ctx.lineTo(acx + 18, acy)
      ctx.lineTo(acx, acy + 18)
      ctx.lineTo(acx - 18, acy)
      ctx.closePath()
      ctx.fillStyle = '#4a6fa5'
      ctx.shadowColor = '#4a6fa5'
      ctx.shadowBlur = 15 * academyPulse
      ctx.globalAlpha = academyPulse
      ctx.fill()
      ctx.restore()

      // Academy border glow
      ctx.beginPath()
      ctx.moveTo(acx, acy - 18)
      ctx.lineTo(acx + 18, acy)
      ctx.lineTo(acx, acy + 18)
      ctx.lineTo(acx - 18, acy)
      ctx.closePath()
      ctx.strokeStyle = 'rgba(74, 111, 165, 0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Academy label
      ctx.font = '600 12px "Space Grotesk", sans-serif'
      ctx.fillStyle = 'rgba(232, 224, 212, 0.8)'
      ctx.textAlign = 'center'
      ctx.fillText('THE ACADEMY', acx, acy + 35)

      // Draw tooltip if active
      if (tooltipRef.current && tooltipRef.current.alpha > 0) {
        const tip = tooltipRef.current
        tip.alpha = Math.max(0, tip.alpha - 0.01)

        ctx.save()
        ctx.globalAlpha = tip.alpha

        const textMetrics = ctx.measureText(tip.text)
        const padding = 12
        const tipWidth = textMetrics.width + padding * 2
        const tipHeight = 32

        // Background (manual rounded rect for broad TS/browser compat)
        const rx = tip.x - tipWidth / 2
        const ry = tip.y - tipHeight - 10
        const rw = tipWidth
        const rh = tipHeight
        const rr = 6
        ctx.fillStyle = 'rgba(10, 15, 26, 0.9)'
        ctx.strokeStyle = 'rgba(193, 113, 71, 0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(rx + rr, ry)
        ctx.lineTo(rx + rw - rr, ry)
        ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rr)
        ctx.lineTo(rx + rw, ry + rh - rr)
        ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rr, ry + rh)
        ctx.lineTo(rx + rr, ry + rh)
        ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rr)
        ctx.lineTo(rx, ry + rr)
        ctx.quadraticCurveTo(rx, ry, rx + rr, ry)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Text
        ctx.font = '12px Inter, sans-serif'
        ctx.fillStyle = '#c17147'
        ctx.textAlign = 'center'
        ctx.fillText(tip.text, tip.x, tip.y - tipHeight + 8)

        ctx.restore()
      }

      ctx.restore()
      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [state, toCanvas, initStars, getCompletedCount, drawCheckmark])

  // Find prerequisite planet name for tooltip
  const getPrereqName = useCallback((planetId: string): string => {
    const planet = planets.find((p) => p.id === planetId)
    if (!planet || planet.prerequisites.length === 0) return ''
    const prereq = planets.find((p) => p.id === planet.prerequisites[0])
    return prereq ? prereq.name : ''
  }, [])

  // Shared hit-test logic for both click and touch
  const handleInteraction = useCallback(
    (interactX: number, interactY: number, isTouch: boolean) => {
      if (!state) return
      const width = window.innerWidth
      const height = window.innerHeight
      const hitRadius = isTouch ? 40 : 30
      const academyHitRadius = isTouch ? 35 : 25

      // Check academy click
      const { cx: acx, cy: acy } = toCanvas(
        ACADEMY_POSITION.x,
        ACADEMY_POSITION.y,
        width,
        height
      )
      if (Math.abs(interactX - acx) < academyHitRadius && Math.abs(interactY - acy) < academyHitRadius) {
        router.push('/academy')
        return
      }

      // Check planet clicks
      for (const planet of planets) {
        const { cx, cy } = toCanvas(planet.position.x, planet.position.y, width, height)
        const dist = Math.sqrt((interactX - cx) ** 2 + (interactY - cy) ** 2)
        if (dist < hitRadius) {
          const status = getPlanetStatus(
            planet.id as PlanetId,
            state,
            MISSION_COUNTS as Record<PlanetId, number>
          )
          if (status === 'locked') {
            const prereqName = getPrereqName(planet.id)
            tooltipRef.current = {
              text: prereqName ? `Complete ${prereqName} first` : 'Locked',
              x: cx,
              y: cy - 30,
              alpha: 1,
            }
            return
          }
          router.push(`/planets/${planet.id}`)
          return
        }
      }
    },
    [state, router, toCanvas, getPrereqName]
  )

  // Click handler (mouse)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      handleInteraction(e.clientX - rect.left, e.clientY - rect.top, false)
    },
    [handleInteraction]
  )

  // Touch handler
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || e.changedTouches.length === 0) return
      e.preventDefault() // Prevent click from also firing
      const rect = canvas.getBoundingClientRect()
      const touch = e.changedTouches[0]
      handleInteraction(touch.clientX - rect.left, touch.clientY - rect.top, true)
    },
    [handleInteraction]
  )

  // Hover cursor change
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || !state) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const width = window.innerWidth
      const height = window.innerHeight

      let hovering = false

      // Check academy
      const { cx: acx, cy: acy } = toCanvas(
        ACADEMY_POSITION.x,
        ACADEMY_POSITION.y,
        width,
        height
      )
      if (Math.abs(mx - acx) < 25 && Math.abs(my - acy) < 25) {
        hovering = true
      }

      // Check planets
      if (!hovering) {
        for (const planet of planets) {
          const { cx, cy } = toCanvas(planet.position.x, planet.position.y, width, height)
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
          if (dist < 30) {
            hovering = true
            break
          }
        }
      }

      canvas.style.cursor = hovering ? 'pointer' : 'default'
    },
    [state, toCanvas]
  )

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      className={clsx('fixed inset-0', className)}
      style={{ touchAction: 'manipulation' }}
    />
  )
}
