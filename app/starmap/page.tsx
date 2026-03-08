'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StarMap } from '@/components/game/StarMap'
import { useGame } from '@/lib/game-context'

export default function StarMapPage() {
  const { state, loading } = useGame()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !state) router.push('/')
  }, [loading, state, router])

  if (loading || !state) return null

  return <StarMap />
}
