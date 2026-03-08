import { GameState, PlayerStats, Rank, PlanetId, PlanetStatus, ShipType, MissionProgress } from './types'

const SAVE_KEY = 'vibe-voyager-save'

const DEFAULT_STATS: PlayerStats = { vibe: 1, architecture: 1, protocol: 1, command: 1 }

// Planet prerequisites — which planets must be completed before each unlocks
const PLANET_PREREQUISITES: Record<PlanetId, PlanetId[]> = {
  'vibe-world': [],
  'debt-belt': ['vibe-world'],
  'mcp-station': ['debt-belt'],
  'agent-academy': ['mcp-station'],
  'framework-nebula': ['agent-academy'],
  'orchestration-citadel': ['framework-nebula'],
  'security-fortress': ['orchestration-citadel'],
  'production-worlds': ['security-fortress'],
}

export function createNewGame(callsign: string, ship: ShipType): GameState {
  const now = new Date().toISOString()
  return {
    callsign,
    ship,
    stats: { ...DEFAULT_STATS },
    crew: ['aria'], // ARIA is always recruited at start
    inventory: [],
    missionProgress: {},
    createdAt: now,
    lastPlayedAt: now,
  }
}

export function saveGame(state: GameState): void {
  const updated = { ...state, lastPlayedAt: new Date().toISOString() }
  localStorage.setItem(SAVE_KEY, JSON.stringify(updated))
}

export function loadGame(): GameState | null {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem(SAVE_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved) as GameState
  } catch {
    return null
  }
}

export function deleteGame(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function hasSave(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SAVE_KEY) !== null
}

export function getTotalStats(stats: PlayerStats): number {
  return stats.vibe + stats.architecture + stats.protocol + stats.command
}

export function getRank(stats: PlayerStats): Rank {
  const total = getTotalStats(stats)
  if (total >= 31) return 'Admiral'
  if (total >= 21) return 'Commander'
  if (total >= 11) return 'Navigator'
  return 'Cadet'
}

export function isPlanetComplete(planetId: PlanetId, state: GameState, missionCounts: Record<PlanetId, number>): boolean {
  const count = missionCounts[planetId] || 0
  let completed = 0
  for (const [id, progress] of Object.entries(state.missionProgress)) {
    if (id.startsWith(planetId) && progress.status === 'completed') completed++
  }
  return completed >= count
}

export function getPlanetStatus(planetId: PlanetId, state: GameState, missionCounts: Record<PlanetId, number>): PlanetStatus {
  // Check if planet is complete
  if (isPlanetComplete(planetId, state, missionCounts)) return 'completed'

  // Check if any missions started on this planet
  const hasProgress = Object.keys(state.missionProgress).some(
    id => id.startsWith(planetId) && state.missionProgress[id].status !== 'locked'
  )
  if (hasProgress) return 'in_progress'

  // Check prerequisites
  const prereqs = PLANET_PREREQUISITES[planetId]
  const allPrereqsMet = prereqs.every(p => isPlanetComplete(p, state, missionCounts))

  return allPrereqsMet ? 'available' : 'locked'
}

export function completeMission(state: GameState, missionId: string, score: number, statRewards: Partial<PlayerStats>, itemReward?: string, crewReward?: string): GameState {
  const newState = { ...state }

  // Update mission progress
  newState.missionProgress = {
    ...state.missionProgress,
    [missionId]: {
      missionId,
      status: 'completed',
      score,
      completedAt: new Date().toISOString(),
    },
  }

  // Add stat rewards
  newState.stats = addStatPoints(state.stats, statRewards)

  // Add item reward
  if (itemReward && !state.inventory.includes(itemReward)) {
    newState.inventory = [...state.inventory, itemReward]
  }

  // Recruit crew
  if (crewReward && !state.crew.includes(crewReward)) {
    newState.crew = [...state.crew, crewReward]
  }

  // Save immediately
  saveGame(newState)

  return newState
}

function addStatPoints(stats: PlayerStats, rewards: Partial<PlayerStats>): PlayerStats {
  return {
    vibe: Math.min(10, stats.vibe + (rewards.vibe || 0)),
    architecture: Math.min(10, stats.architecture + (rewards.architecture || 0)),
    protocol: Math.min(10, stats.protocol + (rewards.protocol || 0)),
    command: Math.min(10, stats.command + (rewards.command || 0)),
  }
}

export function getCompletedMissionCount(state: GameState): number {
  return Object.values(state.missionProgress).filter(p => p.status === 'completed').length
}

export function getMissionProgress(state: GameState, missionId: string): MissionProgress | undefined {
  return state.missionProgress[missionId]
}
