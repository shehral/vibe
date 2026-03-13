/**
 * Tests for lib/types.ts
 *
 * types.ts is purely a type-definition file with no runtime exports.
 * These tests verify that the TypeScript types compile correctly with
 * valid values and that the type system enforces the expected constraints
 * at the structural level we can observe at runtime.
 */

import type {
  StatName,
  PlayerStats,
  Rank,
  ShipType,
  MissionStatus,
  ChallengeType,
  PlanetId,
  PlanetStatus,
  GameState,
  MissionProgress,
  CrewMember,
  InventoryItem,
  Mission,
  MissionContent,
  DialogueNode,
  DialogueChoice,
  LearningBlock,
  ChallengeData,
} from '@/lib/types'

describe('types — compile-time and structural validation', () => {
  describe('StatName', () => {
    it('accepts all four valid stat names', () => {
      const stats: StatName[] = ['vibe', 'architecture', 'protocol', 'command']
      expect(stats).toHaveLength(4)
      expect(stats).toContain('vibe')
      expect(stats).toContain('architecture')
      expect(stats).toContain('protocol')
      expect(stats).toContain('command')
    })
  })

  describe('PlayerStats', () => {
    it('requires all four stat fields', () => {
      const stats: PlayerStats = { vibe: 5, architecture: 3, protocol: 7, command: 2 }
      expect(stats.vibe).toBe(5)
      expect(stats.architecture).toBe(3)
      expect(stats.protocol).toBe(7)
      expect(stats.command).toBe(2)
    })

    it('accepts numeric values including 0 and 10', () => {
      const min: PlayerStats = { vibe: 0, architecture: 0, protocol: 0, command: 0 }
      const max: PlayerStats = { vibe: 10, architecture: 10, protocol: 10, command: 10 }
      expect(min.vibe).toBe(0)
      expect(max.vibe).toBe(10)
    })
  })

  describe('Rank', () => {
    it('accepts all four rank values', () => {
      const ranks: Rank[] = ['Cadet', 'Navigator', 'Commander', 'Admiral']
      expect(ranks).toHaveLength(4)
    })
  })

  describe('ShipType', () => {
    it('accepts all three ship types', () => {
      const ships: ShipType[] = ['spark', 'architect', 'sentinel']
      expect(ships).toHaveLength(3)
    })
  })

  describe('MissionStatus', () => {
    it('accepts all four status values', () => {
      const statuses: MissionStatus[] = ['locked', 'available', 'in_progress', 'completed']
      expect(statuses).toHaveLength(4)
    })
  })

  describe('ChallengeType', () => {
    it('accepts all six challenge types', () => {
      const types: ChallengeType[] = [
        'prompt-duel',
        'architect',
        'connect',
        'debug',
        'command',
        'dialogue',
      ]
      expect(types).toHaveLength(6)
    })
  })

  describe('PlanetId', () => {
    it('accepts all eight planet ids', () => {
      const planets: PlanetId[] = [
        'vibe-world',
        'debt-belt',
        'mcp-station',
        'agent-academy',
        'framework-nebula',
        'orchestration-citadel',
        'security-fortress',
        'production-worlds',
      ]
      expect(planets).toHaveLength(8)
    })
  })

  describe('PlanetStatus', () => {
    it('accepts all four planet status values', () => {
      const statuses: PlanetStatus[] = ['locked', 'available', 'in_progress', 'completed']
      expect(statuses).toHaveLength(4)
    })
  })

  describe('GameState', () => {
    it('can be constructed with all required fields', () => {
      const state: GameState = {
        callsign: 'TestPilot',
        ship: 'spark',
        stats: { vibe: 1, architecture: 1, protocol: 1, command: 1 },
        crew: ['aria'],
        inventory: [],
        missionProgress: {},
        createdAt: '2026-01-01T00:00:00.000Z',
        lastPlayedAt: '2026-01-01T00:00:00.000Z',
      }
      expect(state.callsign).toBe('TestPilot')
      expect(state.crew).toContain('aria')
    })

    it('supports optional currentPlanet and currentMission fields', () => {
      const state: GameState = {
        callsign: 'TestPilot',
        ship: 'spark',
        stats: { vibe: 1, architecture: 1, protocol: 1, command: 1 },
        crew: ['aria'],
        inventory: [],
        missionProgress: {},
        currentPlanet: 'vibe-world',
        currentMission: 'vibe-world-01',
        createdAt: '2026-01-01T00:00:00.000Z',
        lastPlayedAt: '2026-01-01T00:00:00.000Z',
      }
      expect(state.currentPlanet).toBe('vibe-world')
      expect(state.currentMission).toBe('vibe-world-01')
    })
  })

  describe('MissionProgress', () => {
    it('can be constructed with required fields only', () => {
      const progress: MissionProgress = {
        missionId: 'vibe-world-01',
        status: 'in_progress',
      }
      expect(progress.score).toBeUndefined()
      expect(progress.completedAt).toBeUndefined()
    })

    it('can include optional score and completedAt', () => {
      const progress: MissionProgress = {
        missionId: 'vibe-world-01',
        status: 'completed',
        score: 95,
        completedAt: '2026-02-01T00:00:00.000Z',
      }
      expect(progress.score).toBe(95)
      expect(progress.completedAt).toBeTruthy()
    })
  })

  describe('CrewMember', () => {
    it('has all required fields', () => {
      const crew: CrewMember = {
        id: 'aria',
        name: 'ARIA',
        role: 'AI Navigator',
        description: 'Your trusty AI companion',
        recruitedAt: 'start',
        portrait: '/portraits/aria.png',
      }
      expect(crew.id).toBe('aria')
      expect(crew.name).toBe('ARIA')
    })
  })

  describe('InventoryItem', () => {
    it('has all required fields', () => {
      const item: InventoryItem = {
        id: 'prompt-crystal',
        name: 'Prompt Crystal',
        realWorldTool: 'ChatGPT',
        description: 'Focuses your prompt energy',
        icon: 'crystal',
        acquiredAt: 'vibe-world-01',
      }
      expect(item.realWorldTool).toBe('ChatGPT')
    })
  })

  describe('DialogueNode', () => {
    it('works without choices (narration)', () => {
      const node: DialogueNode = {
        speaker: 'ARIA',
        text: 'Welcome aboard, captain.',
      }
      expect(node.choices).toBeUndefined()
    })

    it('works with choices', () => {
      const node: DialogueNode = {
        speaker: 'ARIA',
        text: 'What should we do?',
        choices: [
          { text: 'Explore', correct: true, response: 'Great choice!' },
          { text: 'Wait', correct: false },
        ],
      }
      expect(node.choices).toHaveLength(2)
      expect(node.choices![0].correct).toBe(true)
    })
  })

  describe('DialogueChoice', () => {
    it('supports optional fields', () => {
      const minimal: DialogueChoice = { text: 'Continue' }
      expect(minimal.correct).toBeUndefined()
      expect(minimal.response).toBeUndefined()
      expect(minimal.nextNodeIndex).toBeUndefined()
    })

    it('supports all optional fields', () => {
      const full: DialogueChoice = {
        text: 'Yes',
        correct: true,
        response: 'Correct!',
        nextNodeIndex: 3,
      }
      expect(full.nextNodeIndex).toBe(3)
    })
  })

  describe('LearningBlock', () => {
    it('accepts all four block types', () => {
      const types = ['text', 'code', 'stat', 'image'] as const
      for (const type of types) {
        const block: LearningBlock = { type, content: 'test content' }
        expect(block.type).toBe(type)
      }
    })

    it('supports optional highlight field', () => {
      const block: LearningBlock = { type: 'text', content: 'Important!', highlight: true }
      expect(block.highlight).toBe(true)
    })
  })

  describe('ChallengeData', () => {
    it('has all required fields', () => {
      const challenge: ChallengeData = {
        type: 'prompt-duel',
        instructions: 'Write the best prompt',
        data: { prompts: ['hello', 'world'] },
        passingScore: 70,
      }
      expect(challenge.passingScore).toBe(70)
      expect(challenge.data).toHaveProperty('prompts')
    })
  })

  describe('Mission', () => {
    it('has all required fields and optional ones', () => {
      const mission: Mission = {
        id: 'vibe-world-01',
        planetId: 'vibe-world',
        title: 'First Contact',
        subtitle: 'Learn the basics',
        description: 'Your first mission',
        challengeType: 'prompt-duel',
        statRewards: { vibe: 2 },
        itemReward: 'prompt-crystal',
        crewReward: 'echo',
        order: 1,
        content: {
          briefing: [{ speaker: 'ARIA', text: 'Welcome' }],
          learning: [{ type: 'text', content: 'Lesson 1' }],
          challenge: {
            type: 'prompt-duel',
            instructions: 'Do the thing',
            data: {},
            passingScore: 60,
          },
          debrief: [{ speaker: 'ARIA', text: 'Well done' }],
        },
      }
      expect(mission.id).toBe('vibe-world-01')
      expect(mission.content.briefing).toHaveLength(1)
    })

    it('works without optional itemReward and crewReward', () => {
      const mission: Mission = {
        id: 'vibe-world-02',
        planetId: 'vibe-world',
        title: 'Second Mission',
        subtitle: 'Keep going',
        description: 'Another mission',
        challengeType: 'debug',
        statRewards: { protocol: 1 },
        order: 2,
        content: {
          briefing: [],
          learning: [],
          challenge: { type: 'debug', instructions: '', data: {}, passingScore: 50 },
          debrief: [],
        },
      }
      expect(mission.itemReward).toBeUndefined()
      expect(mission.crewReward).toBeUndefined()
    })
  })
})
