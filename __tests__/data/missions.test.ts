import { missions, getMissionsByPlanet, getMissionById } from '@/lib/data/missions'
import { planets } from '@/lib/data/planets'
import type { ChallengeType, PlanetId } from '@/lib/types'

const VALID_CHALLENGE_TYPES: ChallengeType[] = [
  'prompt-duel',
  'architect',
  'connect',
  'debug',
  'command',
  'dialogue',
]

describe('missions', () => {
  it('contains exactly 34 missions', () => {
    expect(missions).toHaveLength(34)
  })

  describe('required fields', () => {
    it.each(missions)('$id has all required fields', (mission) => {
      expect(mission.id).toBeDefined()
      expect(typeof mission.id).toBe('string')
      expect(mission.planetId).toBeDefined()
      expect(typeof mission.planetId).toBe('string')
      expect(mission.title).toBeDefined()
      expect(typeof mission.title).toBe('string')
      expect(mission.subtitle).toBeDefined()
      expect(typeof mission.subtitle).toBe('string')
      expect(mission.order).toBeDefined()
      expect(typeof mission.order).toBe('number')
      expect(mission.challengeType).toBeDefined()
      expect(mission.statRewards).toBeDefined()
      expect(typeof mission.statRewards).toBe('object')
      expect(mission.content).toBeDefined()
    })
  })

  describe('challenge types', () => {
    it.each(missions)(
      '$id has a valid challengeType',
      (mission) => {
        expect(VALID_CHALLENGE_TYPES).toContain(mission.challengeType)
      }
    )
  })

  describe('mission content structure', () => {
    it.each(missions)(
      '$id has content with briefing, learning, challenge, and debrief',
      (mission) => {
        expect(mission.content).toHaveProperty('briefing')
        expect(Array.isArray(mission.content.briefing)).toBe(true)
        expect(mission.content).toHaveProperty('learning')
        expect(Array.isArray(mission.content.learning)).toBe(true)
        expect(mission.content).toHaveProperty('challenge')
        expect(mission.content.challenge).toBeDefined()
        expect(mission.content).toHaveProperty('debrief')
        expect(Array.isArray(mission.content.debrief)).toBe(true)
      }
    )
  })

  describe('getMissionsByPlanet', () => {
    it.each(planets)(
      'returns correct number of missions for $id',
      (planet) => {
        const planetMissions = getMissionsByPlanet(planet.id)
        expect(planetMissions).toHaveLength(planet.missionCount)
      }
    )

    it('returns missions sorted by order', () => {
      for (const planet of planets) {
        const planetMissions = getMissionsByPlanet(planet.id)
        for (let i = 1; i < planetMissions.length; i++) {
          expect(planetMissions[i].order).toBeGreaterThan(
            planetMissions[i - 1].order
          )
        }
      }
    })

    it('returns empty array for non-existent planet', () => {
      const result = getMissionsByPlanet('nonexistent-planet')
      expect(result).toEqual([])
    })
  })

  describe('getMissionById', () => {
    it('returns correct mission for valid IDs', () => {
      for (const mission of missions) {
        const found = getMissionById(mission.id)
        expect(found).toBeDefined()
        expect(found!.id).toBe(mission.id)
        expect(found!.title).toBe(mission.title)
      }
    })

    it('returns undefined for invalid IDs', () => {
      expect(getMissionById('nonexistent-id')).toBeUndefined()
      expect(getMissionById('')).toBeUndefined()
      expect(getMissionById('vibe-world')).toBeUndefined() // planet id, not mission id
    })
  })

  describe('mission orders are sequential within each planet', () => {
    it.each(planets)(
      '$id has sequential mission orders starting at 1',
      (planet) => {
        const planetMissions = getMissionsByPlanet(planet.id)
        const orders = planetMissions.map((m) => m.order)
        const expected = Array.from(
          { length: planet.missionCount },
          (_, i) => i + 1
        )
        expect(orders).toEqual(expected)
      }
    )
  })

  describe('planet content merge', () => {
    it('populated missions have non-empty briefing arrays', () => {
      // All mission content files exist, so every mission should have content
      for (const mission of missions) {
        expect(mission.content.briefing.length).toBeGreaterThan(0)
      }
    })

    it('populated missions have non-empty learning arrays', () => {
      for (const mission of missions) {
        expect(mission.content.learning.length).toBeGreaterThan(0)
      }
    })

    it('populated missions have non-empty debrief arrays', () => {
      for (const mission of missions) {
        expect(mission.content.debrief.length).toBeGreaterThan(0)
      }
    })

    it('challenge data has instructions and passingScore', () => {
      for (const mission of missions) {
        expect(mission.content.challenge.type).toBe(mission.challengeType)
        expect(typeof mission.content.challenge.instructions).toBe('string')
        expect(typeof mission.content.challenge.passingScore).toBe('number')
      }
    })
  })

  describe('all missions reference valid planet IDs', () => {
    const planetIds = new Set(planets.map((p) => p.id))

    it.each(missions)('$id references an existing planet', (mission) => {
      expect(planetIds.has(mission.planetId)).toBe(true)
    })
  })
})
