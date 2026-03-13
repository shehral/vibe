import { planets, TOTAL_MISSIONS, MISSION_COUNTS } from '@/lib/data/planets'
import type { PlanetId } from '@/lib/types'

const ALL_PLANET_IDS: PlanetId[] = [
  'vibe-world',
  'debt-belt',
  'mcp-station',
  'agent-academy',
  'framework-nebula',
  'orchestration-citadel',
  'security-fortress',
  'production-worlds',
]

describe('planets', () => {
  it('contains exactly 8 planets', () => {
    expect(planets).toHaveLength(8)
  })

  it('has all expected planet IDs', () => {
    const ids = planets.map((p) => p.id)
    for (const id of ALL_PLANET_IDS) {
      expect(ids).toContain(id)
    }
  })

  describe('required fields', () => {
    it.each(planets)('$id has all required fields', (planet) => {
      expect(planet.id).toBeDefined()
      expect(typeof planet.id).toBe('string')
      expect(planet.name).toBeDefined()
      expect(typeof planet.name).toBe('string')
      expect(planet.subtitle).toBeDefined()
      expect(typeof planet.subtitle).toBe('string')
      expect(planet.act).toBeDefined()
      expect([1, 2, 3]).toContain(planet.act)
      expect(planet.color).toBeDefined()
      expect(typeof planet.color).toBe('string')
      expect(planet.position).toBeDefined()
      expect(typeof planet.position.x).toBe('number')
      expect(typeof planet.position.y).toBe('number')
      expect(planet.prerequisites).toBeDefined()
      expect(Array.isArray(planet.prerequisites)).toBe(true)
      expect(planet.missionCount).toBeDefined()
      expect(typeof planet.missionCount).toBe('number')
      expect(planet.missionCount).toBeGreaterThan(0)
    })
  })

  describe('act distribution', () => {
    it('has 2 planets in Act 1', () => {
      const act1 = planets.filter((p) => p.act === 1)
      expect(act1).toHaveLength(2)
    })

    it('has 3 planets in Act 2', () => {
      const act2 = planets.filter((p) => p.act === 2)
      expect(act2).toHaveLength(3)
    })

    it('has 3 planets in Act 3', () => {
      const act3 = planets.filter((p) => p.act === 3)
      expect(act3).toHaveLength(3)
    })
  })

  describe('TOTAL_MISSIONS', () => {
    it('equals the sum of all missionCounts', () => {
      const sum = planets.reduce((acc, p) => acc + p.missionCount, 0)
      expect(TOTAL_MISSIONS).toBe(sum)
    })

    it('equals 34', () => {
      expect(TOTAL_MISSIONS).toBe(34)
    })
  })

  describe('MISSION_COUNTS', () => {
    it('has an entry for each planet', () => {
      for (const planet of planets) {
        expect(MISSION_COUNTS[planet.id]).toBeDefined()
      }
    })

    it('matches each planet missionCount', () => {
      for (const planet of planets) {
        expect(MISSION_COUNTS[planet.id]).toBe(planet.missionCount)
      }
    })
  })

  describe('prerequisites form a valid DAG', () => {
    it('all referenced prerequisite IDs exist as planet IDs', () => {
      const ids = new Set(planets.map((p) => p.id))
      for (const planet of planets) {
        for (const prereq of planet.prerequisites) {
          expect(ids.has(prereq)).toBe(true)
        }
      }
    })

    it('contains no cycles', () => {
      const adjList = new Map<string, string[]>()
      for (const planet of planets) {
        adjList.set(planet.id, planet.prerequisites)
      }

      // Topological sort via Kahn's algorithm — if it visits all nodes, no cycle
      const inDegree = new Map<string, number>()
      for (const planet of planets) {
        if (!inDegree.has(planet.id)) inDegree.set(planet.id, 0)
        for (const prereq of planet.prerequisites) {
          inDegree.set(planet.id, (inDegree.get(planet.id) ?? 0) + 1)
        }
      }

      // Build reverse adjacency (prereq -> dependents)
      const reverseDeps = new Map<string, string[]>()
      for (const planet of planets) {
        for (const prereq of planet.prerequisites) {
          const deps = reverseDeps.get(prereq) ?? []
          deps.push(planet.id)
          reverseDeps.set(prereq, deps)
        }
      }

      // Nodes with no prerequisites
      const queue = planets
        .filter((p) => p.prerequisites.length === 0)
        .map((p) => p.id)
      let visited = 0

      while (queue.length > 0) {
        const node = queue.shift()!
        visited++
        for (const dep of reverseDeps.get(node) ?? []) {
          const newDeg = (inDegree.get(dep) ?? 0) - 1
          inDegree.set(dep, newDeg)
          if (newDeg === 0) queue.push(dep)
        }
      }

      expect(visited).toBe(planets.length)
    })
  })

  describe('planet positions', () => {
    it.each(planets)('$id has x position in 0-100 range', (planet) => {
      expect(planet.position.x).toBeGreaterThanOrEqual(0)
      expect(planet.position.x).toBeLessThanOrEqual(100)
    })

    it.each(planets)('$id has y position in 0-100 range', (planet) => {
      expect(planet.position.y).toBeGreaterThanOrEqual(0)
      expect(planet.position.y).toBeLessThanOrEqual(100)
    })
  })

  describe('first planet', () => {
    it('vibe-world has no prerequisites', () => {
      const vibeWorld = planets.find((p) => p.id === 'vibe-world')
      expect(vibeWorld).toBeDefined()
      expect(vibeWorld!.prerequisites).toHaveLength(0)
    })
  })
})
