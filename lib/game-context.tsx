'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { GameState, PlayerStats, ShipType } from './types'
import { createNewGame, saveGame, loadGame, deleteGame, completeMission as completeMissionFn, getRank, getTotalStats, getCompletedMissionCount } from './game-state'

interface GameContextType {
  state: GameState | null
  loading: boolean
  startNewGame: (callsign: string, ship: ShipType) => void
  resetGame: () => void
  completeMission: (missionId: string, score: number, statRewards: Partial<PlayerStats>, itemReward?: string, crewReward?: string) => void
  rank: string
  totalStats: number
  completedMissions: number
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = loadGame()
    setState(saved)
    setLoading(false)
  }, [])

  const startNewGame = useCallback((callsign: string, ship: ShipType) => {
    const newState = createNewGame(callsign, ship)
    saveGame(newState)
    setState(newState)
  }, [])

  const resetGame = useCallback(() => {
    deleteGame()
    setState(null)
  }, [])

  const completeMissionCb = useCallback((missionId: string, score: number, statRewards: Partial<PlayerStats>, itemReward?: string, crewReward?: string) => {
    setState(prev => {
      if (!prev) return prev
      return completeMissionFn(prev, missionId, score, statRewards, itemReward, crewReward)
    })
  }, [])

  const rank = state ? getRank(state.stats) : 'Cadet'
  const totalStats = state ? getTotalStats(state.stats) : 4
  const completedMissions = state ? getCompletedMissionCount(state) : 0

  return (
    <GameContext.Provider value={{
      state,
      loading,
      startNewGame,
      resetGame,
      completeMission: completeMissionCb,
      rank,
      totalStats,
      completedMissions,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
