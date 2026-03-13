import { crewMembers } from '@/lib/data/crew'

const EXPECTED_CREW_IDS = ['aria', 'scout', 'archie', 'exec', 'mirror']

const AGENT_PHASES = ['Orchestrator', 'Perceive', 'Plan', 'Act', 'Reflect']

describe('crew', () => {
  it('contains exactly 5 crew members', () => {
    expect(crewMembers).toHaveLength(5)
  })

  it('has all expected crew member IDs', () => {
    const ids = crewMembers.map((c) => c.id)
    for (const id of EXPECTED_CREW_IDS) {
      expect(ids).toContain(id)
    }
  })

  describe('required fields', () => {
    it.each(crewMembers)('$id has all required fields', (member) => {
      expect(member.id).toBeDefined()
      expect(typeof member.id).toBe('string')
      expect(member.id.length).toBeGreaterThan(0)

      expect(member.name).toBeDefined()
      expect(typeof member.name).toBe('string')
      expect(member.name.length).toBeGreaterThan(0)

      expect(member.role).toBeDefined()
      expect(typeof member.role).toBe('string')
      expect(member.role.length).toBeGreaterThan(0)

      expect(member.agentPhase).toBeDefined()
      expect(typeof member.agentPhase).toBe('string')
      expect(member.agentPhase.length).toBeGreaterThan(0)

      expect(member.description).toBeDefined()
      expect(typeof member.description).toBe('string')
      expect(member.description.length).toBeGreaterThan(0)

      expect(member.recruitedAt).toBeDefined()
      expect(typeof member.recruitedAt).toBe('string')
      expect(member.recruitedAt.length).toBeGreaterThan(0)

      expect(member.portrait).toBeDefined()
      expect(typeof member.portrait).toBe('string')

      expect(member.color).toBeDefined()
      expect(typeof member.color).toBe('string')

      expect(member.quote).toBeDefined()
      expect(typeof member.quote).toBe('string')
      expect(member.quote.length).toBeGreaterThan(0)
    })
  })

  describe('ARIA is recruited at start', () => {
    it('ARIA has recruitedAt set to "start"', () => {
      const aria = crewMembers.find((c) => c.id === 'aria')
      expect(aria).toBeDefined()
      expect(aria!.recruitedAt).toBe('start')
    })
  })

  describe('agent phases cover all 5 phases', () => {
    it('all expected agent phases are represented', () => {
      const phases = crewMembers.map((c) => c.agentPhase)
      for (const phase of AGENT_PHASES) {
        expect(phases).toContain(phase)
      }
    })

    it('each crew member has a valid agent phase', () => {
      for (const member of crewMembers) {
        expect(AGENT_PHASES).toContain(member.agentPhase)
      }
    })
  })

  describe('portrait paths follow convention', () => {
    it.each(crewMembers)(
      '$id has portrait path /images/characters/$id.svg',
      (member) => {
        expect(member.portrait).toBe(`/images/characters/${member.id}.svg`)
      }
    )
  })
})
