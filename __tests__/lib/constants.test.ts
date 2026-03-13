import { COLORS, RANKS, STATS, STAT_COLORS, STAT_LABELS } from '@/lib/constants'
import type { StatName } from '@/lib/constants'

// ---------------------------------------------------------------------------
// COLORS
// ---------------------------------------------------------------------------
describe('COLORS', () => {
  it('has all five design system colours', () => {
    expect(Object.keys(COLORS)).toHaveLength(5)
    expect(COLORS).toHaveProperty('void')
    expect(COLORS).toHaveProperty('nebula')
    expect(COLORS).toHaveProperty('signal')
    expect(COLORS).toHaveProperty('terracotta')
    expect(COLORS).toHaveProperty('starlight')
  })

  it('contains valid hex colour codes', () => {
    const hexPattern = /^#[0-9a-fA-F]{6}$/
    for (const [key, value] of Object.entries(COLORS)) {
      expect(value).toMatch(hexPattern)
    }
  })

  it('matches the design system specification', () => {
    expect(COLORS.void).toBe('#0a0f1a')
    expect(COLORS.nebula).toBe('#4a6fa5')
    expect(COLORS.signal).toBe('#6b9e78')
    expect(COLORS.terracotta).toBe('#c17147')
    expect(COLORS.starlight).toBe('#e8e0d4')
  })
})

// ---------------------------------------------------------------------------
// RANKS
// ---------------------------------------------------------------------------
describe('RANKS', () => {
  it('has exactly four ranks', () => {
    expect(RANKS).toHaveLength(4)
  })

  it('lists ranks in ascending order (Cadet -> Admiral)', () => {
    expect(RANKS[0].name).toBe('Cadet')
    expect(RANKS[1].name).toBe('Navigator')
    expect(RANKS[2].name).toBe('Commander')
    expect(RANKS[3].name).toBe('Admiral')
  })

  it('starts at min 4 (sum of four stats each starting at 1)', () => {
    expect(RANKS[0].min).toBe(4)
  })

  it('ends at max 40 (four stats maxed at 10)', () => {
    expect(RANKS[RANKS.length - 1].max).toBe(40)
  })

  it('has contiguous, non-overlapping ranges', () => {
    for (let i = 1; i < RANKS.length; i++) {
      expect(RANKS[i].min).toBe(RANKS[i - 1].max + 1)
    }
  })

  it('each rank has min <= max', () => {
    for (const rank of RANKS) {
      expect(rank.min).toBeLessThanOrEqual(rank.max)
    }
  })

  it('covers the full range from 4 to 40 without gaps', () => {
    const covered = new Set<number>()
    for (const rank of RANKS) {
      for (let i = rank.min; i <= rank.max; i++) {
        covered.add(i)
      }
    }
    for (let i = 4; i <= 40; i++) {
      expect(covered.has(i)).toBe(true)
    }
  })
})

// ---------------------------------------------------------------------------
// STATS
// ---------------------------------------------------------------------------
describe('STATS', () => {
  it('has exactly four entries', () => {
    expect(STATS).toHaveLength(4)
  })

  it('contains all four stat names', () => {
    expect(STATS).toContain('vibe')
    expect(STATS).toContain('architecture')
    expect(STATS).toContain('protocol')
    expect(STATS).toContain('command')
  })

  it('entries are unique', () => {
    const unique = new Set(STATS)
    expect(unique.size).toBe(STATS.length)
  })
})

// ---------------------------------------------------------------------------
// STAT_COLORS
// ---------------------------------------------------------------------------
describe('STAT_COLORS', () => {
  it('has a colour for every stat', () => {
    for (const stat of STATS) {
      expect(STAT_COLORS[stat]).toBeDefined()
    }
  })

  it('all values are valid hex colour codes', () => {
    const hexPattern = /^#[0-9a-fA-F]{6}$/
    for (const stat of STATS) {
      expect(STAT_COLORS[stat]).toMatch(hexPattern)
    }
  })

  it('maps stats to the correct design-system colours', () => {
    expect(STAT_COLORS.vibe).toBe('#c17147')        // terracotta
    expect(STAT_COLORS.architecture).toBe('#4a6fa5') // nebula blue
    expect(STAT_COLORS.protocol).toBe('#6b9e78')     // signal green
    expect(STAT_COLORS.command).toBe('#e8e0d4')      // starlight
  })
})

// ---------------------------------------------------------------------------
// STAT_LABELS
// ---------------------------------------------------------------------------
describe('STAT_LABELS', () => {
  it('has a label for every stat', () => {
    for (const stat of STATS) {
      expect(STAT_LABELS[stat]).toBeDefined()
      expect(typeof STAT_LABELS[stat]).toBe('string')
    }
  })

  it('labels are the capitalised version of stat names', () => {
    expect(STAT_LABELS.vibe).toBe('Vibe')
    expect(STAT_LABELS.architecture).toBe('Architecture')
    expect(STAT_LABELS.protocol).toBe('Protocol')
    expect(STAT_LABELS.command).toBe('Command')
  })

  it('labels are non-empty strings', () => {
    for (const stat of STATS) {
      expect(STAT_LABELS[stat].length).toBeGreaterThan(0)
    }
  })
})

// ---------------------------------------------------------------------------
// StatName type (re-exported from constants)
// ---------------------------------------------------------------------------
describe('StatName type', () => {
  it('derived from STATS array matches the expected values', () => {
    const expected: StatName[] = ['vibe', 'architecture', 'protocol', 'command']
    for (const name of expected) {
      // This will only compile if StatName includes these values
      const val: StatName = name
      expect(STATS).toContain(val)
    }
  })
})
