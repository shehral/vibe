import { vi, beforeEach } from 'vitest'
import {
  createNewGame,
  saveGame,
  loadGame,
  deleteGame,
  hasSave,
  getTotalStats,
  getRank,
  isPlanetComplete,
  getPlanetStatus,
  completeMission,
  getCompletedMissionCount,
  getMissionProgress,
} from '@/lib/game-state'
import type { GameState, PlayerStats, PlanetId } from '@/lib/types'

// Helper: build a minimal valid GameState for testing
function makeGameState(overrides: Partial<GameState> = {}): GameState {
  return {
    callsign: 'TestPilot',
    ship: 'spark',
    stats: { vibe: 1, architecture: 1, protocol: 1, command: 1 },
    crew: ['aria'],
    inventory: [],
    missionProgress: {},
    createdAt: '2026-01-01T00:00:00.000Z',
    lastPlayedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

// Standard mission counts used across many tests (1 mission per planet for simplicity)
const ONE_MISSION_PER_PLANET: Record<PlanetId, number> = {
  'vibe-world': 1,
  'debt-belt': 1,
  'mcp-station': 1,
  'agent-academy': 1,
  'framework-nebula': 1,
  'orchestration-citadel': 1,
  'security-fortress': 1,
  'production-worlds': 1,
}

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

// ---------------------------------------------------------------------------
// createNewGame
// ---------------------------------------------------------------------------
describe('createNewGame', () => {
  it('returns a GameState with the given callsign and ship', () => {
    const state = createNewGame('Nova', 'architect')
    expect(state.callsign).toBe('Nova')
    expect(state.ship).toBe('architect')
  })

  it('initialises all stats to 1', () => {
    const state = createNewGame('Nova', 'spark')
    expect(state.stats).toEqual({ vibe: 1, architecture: 1, protocol: 1, command: 1 })
  })

  it('starts with ARIA as the only crew member', () => {
    const state = createNewGame('Nova', 'sentinel')
    expect(state.crew).toEqual(['aria'])
  })

  it('starts with an empty inventory', () => {
    const state = createNewGame('Nova', 'spark')
    expect(state.inventory).toEqual([])
  })

  it('starts with no mission progress', () => {
    const state = createNewGame('Nova', 'spark')
    expect(state.missionProgress).toEqual({})
  })

  it('sets createdAt and lastPlayedAt to valid ISO strings', () => {
    const before = new Date().toISOString()
    const state = createNewGame('Nova', 'spark')
    const after = new Date().toISOString()

    expect(state.createdAt).toBeTruthy()
    expect(state.lastPlayedAt).toBeTruthy()
    // Timestamps should be between before and after
    expect(state.createdAt >= before).toBe(true)
    expect(state.createdAt <= after).toBe(true)
    expect(state.createdAt).toBe(state.lastPlayedAt)
  })

  it('creates independent stat objects (no shared references between games)', () => {
    const game1 = createNewGame('A', 'spark')
    const game2 = createNewGame('B', 'spark')
    game1.stats.vibe = 10
    expect(game2.stats.vibe).toBe(1)
  })
})

// ---------------------------------------------------------------------------
// saveGame / loadGame round-trip
// ---------------------------------------------------------------------------
describe('saveGame', () => {
  it('stores state in localStorage under the expected key', () => {
    const state = makeGameState()
    saveGame(state)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'vibe-voyager-save',
      expect.any(String),
    )
  })

  it('updates lastPlayedAt on save', () => {
    const state = makeGameState({ lastPlayedAt: '2000-01-01T00:00:00.000Z' })
    saveGame(state)
    const raw = localStorage.getItem('vibe-voyager-save')
    const saved = JSON.parse(raw!) as GameState
    expect(saved.lastPlayedAt).not.toBe('2000-01-01T00:00:00.000Z')
    // Should be a recent ISO string
    expect(new Date(saved.lastPlayedAt).getFullYear()).toBeGreaterThanOrEqual(2026)
  })

  it('preserves all game state fields through save', () => {
    const state = makeGameState({
      callsign: 'Cosmo',
      ship: 'sentinel',
      stats: { vibe: 5, architecture: 3, protocol: 7, command: 2 },
      crew: ['aria', 'echo'],
      inventory: ['prompt-crystal'],
    })
    saveGame(state)
    const raw = localStorage.getItem('vibe-voyager-save')
    const saved = JSON.parse(raw!) as GameState
    expect(saved.callsign).toBe('Cosmo')
    expect(saved.ship).toBe('sentinel')
    expect(saved.stats).toEqual({ vibe: 5, architecture: 3, protocol: 7, command: 2 })
    expect(saved.crew).toEqual(['aria', 'echo'])
    expect(saved.inventory).toEqual(['prompt-crystal'])
  })
})

describe('loadGame', () => {
  it('returns null when no save exists', () => {
    expect(loadGame()).toBeNull()
  })

  it('returns the saved GameState after saveGame', () => {
    const state = makeGameState({ callsign: 'Loader' })
    saveGame(state)
    const loaded = loadGame()
    expect(loaded).not.toBeNull()
    expect(loaded!.callsign).toBe('Loader')
  })

  it('returns null if localStorage contains invalid JSON', () => {
    localStorage.setItem('vibe-voyager-save', '{invalid json!!!')
    expect(loadGame()).toBeNull()
  })

  it('round-trips mission progress correctly', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 85, completedAt: '2026-01-15T00:00:00.000Z' },
      },
    })
    saveGame(state)
    const loaded = loadGame()
    expect(loaded!.missionProgress['vibe-world-01'].status).toBe('completed')
    expect(loaded!.missionProgress['vibe-world-01'].score).toBe(85)
  })
})

// ---------------------------------------------------------------------------
// hasSave
// ---------------------------------------------------------------------------
describe('hasSave', () => {
  it('returns false when no save exists', () => {
    expect(hasSave()).toBe(false)
  })

  it('returns true after saving a game', () => {
    saveGame(makeGameState())
    expect(hasSave()).toBe(true)
  })

  it('returns false after deleting a save', () => {
    saveGame(makeGameState())
    deleteGame()
    expect(hasSave()).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// deleteGame
// ---------------------------------------------------------------------------
describe('deleteGame', () => {
  it('removes the save from localStorage', () => {
    saveGame(makeGameState())
    deleteGame()
    expect(localStorage.getItem('vibe-voyager-save')).toBeNull()
  })

  it('does not throw when no save exists', () => {
    expect(() => deleteGame()).not.toThrow()
  })
})

// ---------------------------------------------------------------------------
// getTotalStats
// ---------------------------------------------------------------------------
describe('getTotalStats', () => {
  it('sums all four stat values', () => {
    expect(getTotalStats({ vibe: 1, architecture: 1, protocol: 1, command: 1 })).toBe(4)
  })

  it('returns correct total for mixed values', () => {
    expect(getTotalStats({ vibe: 5, architecture: 8, protocol: 3, command: 10 })).toBe(26)
  })

  it('handles maximum stats (all 10)', () => {
    expect(getTotalStats({ vibe: 10, architecture: 10, protocol: 10, command: 10 })).toBe(40)
  })

  it('handles all-zero stats', () => {
    expect(getTotalStats({ vibe: 0, architecture: 0, protocol: 0, command: 0 })).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// getRank
// ---------------------------------------------------------------------------
describe('getRank', () => {
  it('returns Cadet for starting stats (total 4)', () => {
    expect(getRank({ vibe: 1, architecture: 1, protocol: 1, command: 1 })).toBe('Cadet')
  })

  it('returns Cadet for total 10 (upper boundary)', () => {
    expect(getRank({ vibe: 4, architecture: 2, protocol: 2, command: 2 })).toBe('Cadet')
  })

  it('returns Navigator for total 11 (lower boundary)', () => {
    expect(getRank({ vibe: 4, architecture: 3, protocol: 2, command: 2 })).toBe('Navigator')
  })

  it('returns Navigator for total 20 (upper boundary)', () => {
    expect(getRank({ vibe: 5, architecture: 5, protocol: 5, command: 5 })).toBe('Navigator')
  })

  it('returns Commander for total 21 (lower boundary)', () => {
    expect(getRank({ vibe: 6, architecture: 5, protocol: 5, command: 5 })).toBe('Commander')
  })

  it('returns Commander for total 30 (upper boundary)', () => {
    expect(getRank({ vibe: 8, architecture: 8, protocol: 7, command: 7 })).toBe('Commander')
  })

  it('returns Admiral for total 31 (lower boundary)', () => {
    expect(getRank({ vibe: 8, architecture: 8, protocol: 8, command: 7 })).toBe('Admiral')
  })

  it('returns Admiral for max stats (total 40)', () => {
    expect(getRank({ vibe: 10, architecture: 10, protocol: 10, command: 10 })).toBe('Admiral')
  })
})

// ---------------------------------------------------------------------------
// isPlanetComplete
// ---------------------------------------------------------------------------
describe('isPlanetComplete', () => {
  it('returns false when no missions have been completed', () => {
    const state = makeGameState()
    expect(isPlanetComplete('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe(false)
  })

  it('returns true when all missions for a planet are completed', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 90 },
      },
    })
    expect(isPlanetComplete('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe(true)
  })

  it('returns false when only some missions are completed', () => {
    const counts: Record<PlanetId, number> = { ...ONE_MISSION_PER_PLANET, 'vibe-world': 3 }
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 90 },
        'vibe-world-02': { missionId: 'vibe-world-02', status: 'in_progress' },
      },
    })
    expect(isPlanetComplete('vibe-world', state, counts)).toBe(false)
  })

  it('does not count in_progress missions as completed', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'in_progress' },
      },
    })
    expect(isPlanetComplete('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe(false)
  })

  it('returns true when missionCount is 0 (planet with no missions)', () => {
    const counts: Record<PlanetId, number> = { ...ONE_MISSION_PER_PLANET, 'vibe-world': 0 }
    const state = makeGameState()
    expect(isPlanetComplete('vibe-world', state, counts)).toBe(true)
  })

  it('only counts missions belonging to the specified planet', () => {
    const state = makeGameState({
      missionProgress: {
        'debt-belt-01': { missionId: 'debt-belt-01', status: 'completed', score: 80 },
      },
    })
    expect(isPlanetComplete('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getPlanetStatus
// ---------------------------------------------------------------------------
describe('getPlanetStatus', () => {
  it('returns "available" for the first planet (no prerequisites)', () => {
    const state = makeGameState()
    expect(getPlanetStatus('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe('available')
  })

  it('returns "locked" when prerequisites are not met', () => {
    const state = makeGameState()
    expect(getPlanetStatus('debt-belt', state, ONE_MISSION_PER_PLANET)).toBe('locked')
  })

  it('returns "available" when all prerequisites are completed', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 100 },
      },
    })
    expect(getPlanetStatus('debt-belt', state, ONE_MISSION_PER_PLANET)).toBe('available')
  })

  it('returns "in_progress" when at least one mission is started', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'in_progress' },
      },
    })
    expect(getPlanetStatus('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe('in_progress')
  })

  it('returns "completed" when all missions are completed', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 95 },
      },
    })
    expect(getPlanetStatus('vibe-world', state, ONE_MISSION_PER_PLANET)).toBe('completed')
  })

  it('returns "locked" for a planet deep in the chain when early planets are incomplete', () => {
    const state = makeGameState()
    expect(getPlanetStatus('production-worlds', state, ONE_MISSION_PER_PLANET)).toBe('locked')
  })

  it('returns "available" for a deep planet when all ancestors are complete', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 100 },
        'debt-belt-01': { missionId: 'debt-belt-01', status: 'completed', score: 100 },
        'mcp-station-01': { missionId: 'mcp-station-01', status: 'completed', score: 100 },
        'agent-academy-01': { missionId: 'agent-academy-01', status: 'completed', score: 100 },
        'framework-nebula-01': { missionId: 'framework-nebula-01', status: 'completed', score: 100 },
        'orchestration-citadel-01': { missionId: 'orchestration-citadel-01', status: 'completed', score: 100 },
        'security-fortress-01': { missionId: 'security-fortress-01', status: 'completed', score: 100 },
      },
    })
    expect(getPlanetStatus('production-worlds', state, ONE_MISSION_PER_PLANET)).toBe('available')
  })

  it('prioritises "completed" over "in_progress"', () => {
    // If all missions are completed, status should be 'completed' even if some have progress
    const counts: Record<PlanetId, number> = { ...ONE_MISSION_PER_PLANET, 'vibe-world': 2 }
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 90 },
        'vibe-world-02': { missionId: 'vibe-world-02', status: 'completed', score: 80 },
      },
    })
    expect(getPlanetStatus('vibe-world', state, counts)).toBe('completed')
  })
})

// ---------------------------------------------------------------------------
// completeMission
// ---------------------------------------------------------------------------
describe('completeMission', () => {
  it('marks the mission as completed with the given score', () => {
    const state = makeGameState()
    const result = completeMission(state, 'vibe-world-01', 85, { vibe: 2 })
    expect(result.missionProgress['vibe-world-01'].status).toBe('completed')
    expect(result.missionProgress['vibe-world-01'].score).toBe(85)
  })

  it('sets a completedAt timestamp', () => {
    const state = makeGameState()
    const result = completeMission(state, 'vibe-world-01', 100, {})
    expect(result.missionProgress['vibe-world-01'].completedAt).toBeTruthy()
  })

  it('adds stat rewards to existing stats', () => {
    const state = makeGameState({ stats: { vibe: 3, architecture: 2, protocol: 1, command: 1 } })
    const result = completeMission(state, 'vibe-world-01', 90, { vibe: 2, architecture: 1 })
    expect(result.stats.vibe).toBe(5)
    expect(result.stats.architecture).toBe(3)
    expect(result.stats.protocol).toBe(1)
    expect(result.stats.command).toBe(1)
  })

  it('caps stats at 10', () => {
    const state = makeGameState({ stats: { vibe: 9, architecture: 10, protocol: 8, command: 7 } })
    const result = completeMission(state, 'vibe-world-01', 100, { vibe: 5, architecture: 3, protocol: 3 })
    expect(result.stats.vibe).toBe(10)
    expect(result.stats.architecture).toBe(10)
    expect(result.stats.protocol).toBe(10)
    expect(result.stats.command).toBe(7)
  })

  it('adds an item reward when provided', () => {
    const state = makeGameState()
    const result = completeMission(state, 'vibe-world-01', 80, {}, 'prompt-crystal')
    expect(result.inventory).toContain('prompt-crystal')
  })

  it('does not add duplicate items', () => {
    const state = makeGameState({ inventory: ['prompt-crystal'] })
    const result = completeMission(state, 'vibe-world-01', 80, {}, 'prompt-crystal')
    expect(result.inventory.filter(i => i === 'prompt-crystal')).toHaveLength(1)
  })

  it('adds a crew reward when provided', () => {
    const state = makeGameState()
    const result = completeMission(state, 'vibe-world-01', 80, {}, undefined, 'echo')
    expect(result.crew).toContain('echo')
  })

  it('does not add duplicate crew members', () => {
    const state = makeGameState({ crew: ['aria', 'echo'] })
    const result = completeMission(state, 'vibe-world-01', 80, {}, undefined, 'echo')
    expect(result.crew.filter(c => c === 'echo')).toHaveLength(1)
  })

  it('saves the game to localStorage immediately', () => {
    const state = makeGameState()
    completeMission(state, 'vibe-world-01', 90, { vibe: 1 })
    expect(localStorage.setItem).toHaveBeenCalled()
    const loaded = loadGame()
    expect(loaded).not.toBeNull()
    expect(loaded!.missionProgress['vibe-world-01'].status).toBe('completed')
  })

  it('does not mutate the original state object', () => {
    const state = makeGameState()
    const original = { ...state, stats: { ...state.stats }, crew: [...state.crew], inventory: [...state.inventory] }
    completeMission(state, 'vibe-world-01', 90, { vibe: 2 }, 'item', 'crew-x')
    // The original state passed in should retain its original crew/inventory/stats references
    expect(state.crew).toEqual(original.crew)
    expect(state.inventory).toEqual(original.inventory)
  })

  it('preserves existing mission progress when completing a new mission', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 70 },
      },
    })
    const result = completeMission(state, 'vibe-world-02', 95, { architecture: 1 })
    expect(result.missionProgress['vibe-world-01'].status).toBe('completed')
    expect(result.missionProgress['vibe-world-02'].status).toBe('completed')
  })
})

// ---------------------------------------------------------------------------
// getCompletedMissionCount
// ---------------------------------------------------------------------------
describe('getCompletedMissionCount', () => {
  it('returns 0 when no missions have been attempted', () => {
    const state = makeGameState()
    expect(getCompletedMissionCount(state)).toBe(0)
  })

  it('counts only completed missions', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 90 },
        'vibe-world-02': { missionId: 'vibe-world-02', status: 'in_progress' },
        'debt-belt-01': { missionId: 'debt-belt-01', status: 'completed', score: 80 },
        'mcp-station-01': { missionId: 'mcp-station-01', status: 'locked' },
      },
    })
    expect(getCompletedMissionCount(state)).toBe(2)
  })

  it('handles all missions completed', () => {
    const state = makeGameState({
      missionProgress: {
        'm1': { missionId: 'm1', status: 'completed', score: 100 },
        'm2': { missionId: 'm2', status: 'completed', score: 100 },
        'm3': { missionId: 'm3', status: 'completed', score: 100 },
      },
    })
    expect(getCompletedMissionCount(state)).toBe(3)
  })
})

// ---------------------------------------------------------------------------
// getMissionProgress
// ---------------------------------------------------------------------------
describe('getMissionProgress', () => {
  it('returns undefined for a mission with no progress', () => {
    const state = makeGameState()
    expect(getMissionProgress(state, 'vibe-world-01')).toBeUndefined()
  })

  it('returns the progress object for a tracked mission', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'in_progress' },
      },
    })
    const progress = getMissionProgress(state, 'vibe-world-01')
    expect(progress).toBeDefined()
    expect(progress!.status).toBe('in_progress')
    expect(progress!.missionId).toBe('vibe-world-01')
  })

  it('returns the correct mission when multiple exist', () => {
    const state = makeGameState({
      missionProgress: {
        'vibe-world-01': { missionId: 'vibe-world-01', status: 'completed', score: 90 },
        'debt-belt-01': { missionId: 'debt-belt-01', status: 'in_progress' },
      },
    })
    const progress = getMissionProgress(state, 'debt-belt-01')
    expect(progress!.status).toBe('in_progress')
  })
})
