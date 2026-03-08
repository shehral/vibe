export interface CrewMemberDef {
  id: string
  name: string
  role: string
  agentPhase: string
  description: string
  recruitedAt: string
  portrait: string
  color: string
  quote: string
}

export const crewMembers: CrewMemberDef[] = [
  {
    id: 'aria',
    name: 'ARIA',
    role: 'Ship AI / Narrator',
    agentPhase: 'Orchestrator',
    description:
      "Your ship's Adaptive Reasoning Intelligence Assistant. She guides your journey from vibe coder to fleet commander.",
    recruitedAt: 'start',
    portrait: '/images/characters/aria.svg',
    color: '#4a6fa5',
    quote: 'Every great journey begins with a single prompt.',
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Perception Specialist',
    agentPhase: 'Perceive',
    description:
      'Sees everything. Teaches you how agents perceive their environment — context windows, tool discovery, input processing.',
    recruitedAt: 'agent-academy-m1',
    portrait: '/images/characters/scout.svg',
    color: '#6b9e78',
    quote: 'The world is data. I just know where to look.',
  },
  {
    id: 'archie',
    name: 'Archie',
    role: 'Planning & Reasoning',
    agentPhase: 'Plan',
    description:
      'The strategist. Teaches chain-of-thought reasoning, task decomposition, and how agents plan before they act.',
    recruitedAt: 'agent-academy-m3',
    portrait: '/images/characters/archie.svg',
    color: '#4a6fa5',
    quote: 'A plan is just a thought that decided to get serious.',
  },
  {
    id: 'exec',
    name: 'Exec',
    role: 'Action & Execution',
    agentPhase: 'Act',
    description:
      'Gets things done. Teaches tool calling, code generation, and the Act phase of the agent loop.',
    recruitedAt: 'agent-academy-m5',
    portrait: '/images/characters/exec.svg',
    color: '#c17147',
    quote: 'Plans are nice. Execution is everything.',
  },
  {
    id: 'mirror',
    name: 'Mirror',
    role: 'Reflection & Testing',
    agentPhase: 'Reflect',
    description:
      'The skeptic. Teaches self-healing, error recovery, testing, and the Reflect phase. Also raises ethical concerns about AI.',
    recruitedAt: 'security-fortress-m1',
    portrait: '/images/characters/mirror.svg',
    color: '#e8e0d4',
    quote: 'The unexamined code is not worth shipping.',
  },
]
