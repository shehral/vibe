import type {
  Mission,
  ChallengeType,
  PlayerStats,
  PlanetId,
} from '../types'

function makeMission(opts: {
  id: string
  planetId: PlanetId
  title: string
  subtitle: string
  description: string
  challengeType: ChallengeType
  statRewards: Partial<PlayerStats>
  order: number
  itemReward?: string
  crewReward?: string
}): Mission {
  return {
    id: opts.id,
    planetId: opts.planetId,
    title: opts.title,
    subtitle: opts.subtitle,
    description: opts.description,
    challengeType: opts.challengeType,
    statRewards: opts.statRewards,
    itemReward: opts.itemReward,
    crewReward: opts.crewReward,
    order: opts.order,
    content: {
      briefing: [],
      learning: [],
      challenge: {
        type: opts.challengeType,
        instructions: '',
        data: {},
        passingScore: 70,
      },
      debrief: [],
    },
  }
}

// ---------------------------------------------------------------------------
// Vibe World (Act 1) — 4 missions
// ---------------------------------------------------------------------------

const vibeWorldMissions: Mission[] = [
  makeMission({
    id: 'vibe-world-m1',
    planetId: 'vibe-world',
    title: 'First Words',
    subtitle: 'What is vibe coding?',
    description:
      'ARIA introduces you to the concept of vibe coding — building software by talking to AI in natural language.',
    challengeType: 'dialogue',
    statRewards: { vibe: 1 },
    itemReward: 'ship-voice',
    order: 1,
  }),
  makeMission({
    id: 'vibe-world-m2',
    planetId: 'vibe-world',
    title: 'See It, Say It, Run It',
    subtitle: 'Your first prompt',
    description:
      'Write your first vibe-coding prompt and watch the AI turn intent into working code.',
    challengeType: 'prompt-duel',
    statRewards: { vibe: 2 },
    order: 2,
  }),
  makeMission({
    id: 'vibe-world-m3',
    planetId: 'vibe-world',
    title: 'The Prototype Sprint',
    subtitle: 'Speed vs. craft',
    description:
      'Race to build a prototype using nothing but prompts. Discover the exhilarating speed — and the hidden costs.',
    challengeType: 'prompt-duel',
    statRewards: { vibe: 1 },
    order: 3,
  }),
  makeMission({
    id: 'vibe-world-m4',
    planetId: 'vibe-world',
    title: 'Traditional vs. Vibe',
    subtitle: 'Two philosophies',
    description:
      'ARIA contrasts traditional development with vibe coding. Both have strengths — the future needs both.',
    challengeType: 'dialogue',
    statRewards: { vibe: 1, architecture: 1 },
    order: 4,
  }),
]

// ---------------------------------------------------------------------------
// Debt Asteroid Belt (Act 1) — 4 missions
// ---------------------------------------------------------------------------

const debtBeltMissions: Mission[] = [
  makeMission({
    id: 'debt-belt-m1',
    planetId: 'debt-belt',
    title: 'The Fragile Ship',
    subtitle: 'When AI code breaks',
    description:
      'Your AI-generated code has bugs. Diagnose issues caused by hallucinations, stale training data, and missing context.',
    challengeType: 'debug',
    statRewards: { vibe: 1 },
    order: 1,
  }),
  makeMission({
    id: 'debt-belt-m2',
    planetId: 'debt-belt',
    title: 'The Quality Crisis',
    subtitle: '1.75x more bugs',
    description:
      'AI code ships with 1.75x more bugs than human-written code. Learn why, and how to mitigate the quality gap.',
    challengeType: 'debug',
    statRewards: { architecture: 1 },
    order: 2,
  }),
  makeMission({
    id: 'debt-belt-m3',
    planetId: 'debt-belt',
    title: 'Your Career in the AI Era',
    subtitle: 'Adapt or perish',
    description:
      'The software industry is changing fast. Explore how AI tools are reshaping developer roles and career paths.',
    challengeType: 'dialogue',
    statRewards: { vibe: 1 },
    order: 3,
  }),
  makeMission({
    id: 'debt-belt-m4',
    planetId: 'debt-belt',
    title: 'The Case for Expertise',
    subtitle: 'Why fundamentals matter',
    description:
      'Vibe coding is powerful, but deep expertise makes you irreplaceable. Learn why the best vibe coders are also great engineers.',
    challengeType: 'dialogue',
    statRewards: { vibe: 1, architecture: 1 },
    order: 4,
  }),
]

// ---------------------------------------------------------------------------
// MCP Station (Act 2) — 5 missions
// ---------------------------------------------------------------------------

const mcpStationMissions: Mission[] = [
  makeMission({
    id: 'mcp-station-m1',
    planetId: 'mcp-station',
    title: 'The N*M Problem',
    subtitle: 'Why standards matter',
    description:
      'Every AI tool needs a custom integration for every data source. Discover the combinatorial explosion that MCP solves.',
    challengeType: 'architect',
    statRewards: { protocol: 1 },
    order: 1,
  }),
  makeMission({
    id: 'mcp-station-m2',
    planetId: 'mcp-station',
    title: 'USB-C for AI',
    subtitle: 'The MCP standard',
    description:
      'Learn the Model Context Protocol — one universal connector for all AI-to-tool communication.',
    challengeType: 'connect',
    statRewards: { protocol: 2 },
    itemReward: 'context-adapter',
    order: 2,
  }),
  makeMission({
    id: 'mcp-station-m3',
    planetId: 'mcp-station',
    title: 'Protocol vs. Wrappers',
    subtitle: 'Open beats proprietary',
    description:
      'Compare MCP to vendor-specific tool integrations. Understand why open protocols win in the long run.',
    challengeType: 'dialogue',
    statRewards: { protocol: 1 },
    order: 3,
  }),
  makeMission({
    id: 'mcp-station-m4',
    planetId: 'mcp-station',
    title: 'Docking Sequence',
    subtitle: 'Architecture in action',
    description:
      'Design the architecture for connecting multiple MCP servers to a single AI agent. Resources, tools, prompts.',
    challengeType: 'architect',
    statRewards: { protocol: 1, architecture: 1 },
    order: 4,
  }),
  makeMission({
    id: 'mcp-station-m5',
    planetId: 'mcp-station',
    title: 'The Babel Problem',
    subtitle: 'Interoperability challenges',
    description:
      'Not all MCP servers are created equal. Navigate compatibility issues and learn to evaluate server quality.',
    challengeType: 'connect',
    statRewards: { protocol: 1 },
    order: 5,
  }),
]

// ---------------------------------------------------------------------------
// Agent Academy (Act 2) — 5 missions
// ---------------------------------------------------------------------------

const agentAcademyMissions: Mission[] = [
  makeMission({
    id: 'agent-academy-m1',
    planetId: 'agent-academy',
    title: 'The Cognitive Loop',
    subtitle: 'Perceive, Plan, Act, Reflect',
    description:
      'Discover the four-phase cognitive architecture that powers all AI agents. Recruit Scout, your perception specialist.',
    challengeType: 'architect',
    statRewards: { architecture: 2 },
    itemReward: 'agent-blueprint',
    crewReward: 'scout',
    order: 1,
  }),
  makeMission({
    id: 'agent-academy-m2',
    planetId: 'agent-academy',
    title: 'Perception Training',
    subtitle: 'How agents see',
    description:
      'Train with Scout to understand context windows, tool discovery, and how agents perceive their environment.',
    challengeType: 'command',
    statRewards: { architecture: 1 },
    order: 2,
  }),
  makeMission({
    id: 'agent-academy-m3',
    planetId: 'agent-academy',
    title: 'Planning & Reasoning',
    subtitle: 'Think before you act',
    description:
      'Learn chain-of-thought reasoning and task decomposition with Archie, your new planning specialist.',
    challengeType: 'architect',
    statRewards: { architecture: 1 },
    crewReward: 'archie',
    order: 3,
  }),
  makeMission({
    id: 'agent-academy-m4',
    planetId: 'agent-academy',
    title: 'Tool Calling',
    subtitle: 'Agents take action',
    description:
      'Understand how agents use tool calling to interact with external systems — the bridge between thinking and doing.',
    challengeType: 'connect',
    statRewards: { architecture: 1, protocol: 1 },
    order: 4,
  }),
  makeMission({
    id: 'agent-academy-m5',
    planetId: 'agent-academy',
    title: 'Self-Healing',
    subtitle: 'When things go wrong',
    description:
      'Agents fail. Learn how they recover through error handling, retries, and self-correction. Recruit Exec, your action specialist.',
    challengeType: 'debug',
    statRewards: { architecture: 1 },
    crewReward: 'exec',
    order: 5,
  }),
]

// ---------------------------------------------------------------------------
// Framework Nebula (Act 2) — 5 missions
// ---------------------------------------------------------------------------

const frameworkNebulaMissions: Mission[] = [
  makeMission({
    id: 'framework-nebula-m1',
    planetId: 'framework-nebula',
    title: 'Three Schools of Thought',
    subtitle: 'Frameworks compared',
    description:
      'Explore three approaches to agent frameworks: graph-based (LangGraph), role-based (CrewAI), and conversation-based (AutoGen).',
    challengeType: 'dialogue',
    statRewards: { architecture: 1 },
    order: 1,
  }),
  makeMission({
    id: 'framework-nebula-m2',
    planetId: 'framework-nebula',
    title: 'The Official Armories',
    subtitle: 'Vendor SDKs',
    description:
      'Compare the official agent SDKs from Anthropic, OpenAI, and Google. Each takes a different philosophical approach.',
    challengeType: 'dialogue',
    statRewards: { architecture: 1 },
    order: 2,
  }),
  makeMission({
    id: 'framework-nebula-m3',
    planetId: 'framework-nebula',
    title: 'The Right Tool',
    subtitle: 'Decision framework',
    description:
      'Given a problem, which framework fits best? Learn to match use cases to the right agent architecture.',
    challengeType: 'command',
    statRewards: { architecture: 1, command: 1 },
    order: 3,
  }),
  makeMission({
    id: 'framework-nebula-m4',
    planetId: 'framework-nebula',
    title: 'Build a Crew',
    subtitle: 'Multi-agent design',
    description:
      'Design a multi-agent system from scratch. Define roles, communication patterns, and coordination strategies.',
    challengeType: 'architect',
    statRewards: { architecture: 1 },
    order: 4,
  }),
  makeMission({
    id: 'framework-nebula-m5',
    planetId: 'framework-nebula',
    title: 'Agent Cards',
    subtitle: 'Identity and discovery',
    description:
      'Create agent cards that describe capabilities and interfaces — the foundation of agent interoperability.',
    challengeType: 'architect',
    statRewards: { protocol: 1 },
    order: 5,
  }),
]

// ---------------------------------------------------------------------------
// Orchestration Citadel (Act 3) — 4 missions
// ---------------------------------------------------------------------------

const orchestrationCitadelMissions: Mission[] = [
  makeMission({
    id: 'orchestration-citadel-m1',
    planetId: 'orchestration-citadel',
    title: 'Society of Agents',
    subtitle: 'Multi-agent orchestration',
    description:
      'Agents working together are more powerful than any single agent. Design orchestration patterns for agent societies.',
    challengeType: 'architect',
    statRewards: { command: 2 },
    itemReward: 'fleet-comm',
    order: 1,
  }),
  makeMission({
    id: 'orchestration-citadel-m2',
    planetId: 'orchestration-citadel',
    title: 'The A2A Network',
    subtitle: 'Agent-to-agent protocol',
    description:
      'Learn the Agent-to-Agent protocol that enables agents to discover, communicate, and delegate to each other.',
    challengeType: 'connect',
    statRewards: { command: 1, protocol: 1 },
    order: 2,
  }),
  makeMission({
    id: 'orchestration-citadel-m3',
    planetId: 'orchestration-citadel',
    title: 'Message Passing',
    subtitle: 'Communication patterns',
    description:
      'Master the communication patterns between agents: request/response, pub/sub, event-driven, and streaming.',
    challengeType: 'connect',
    statRewards: { command: 1 },
    order: 3,
  }),
  makeMission({
    id: 'orchestration-citadel-m4',
    planetId: 'orchestration-citadel',
    title: 'Delegation',
    subtitle: 'Trust and control',
    description:
      'Learn when to delegate tasks to sub-agents and how to maintain oversight. The art of letting go while staying in control.',
    challengeType: 'command',
    statRewards: { command: 2 },
    order: 4,
  }),
]

// ---------------------------------------------------------------------------
// Security Fortress (Act 3) — 4 missions
// ---------------------------------------------------------------------------

const securityFortressMissions: Mission[] = [
  makeMission({
    id: 'security-fortress-m1',
    planetId: 'security-fortress',
    title: 'The Safety Net',
    subtitle: 'Human-in-the-loop',
    description:
      'Deploy HITL safety systems that keep agents within authorized bounds. Recruit Mirror, your reflection specialist.',
    challengeType: 'architect',
    statRewards: { command: 1, architecture: 1 },
    itemReward: 'security-shield',
    crewReward: 'mirror',
    order: 1,
  }),
  makeMission({
    id: 'security-fortress-m2',
    planetId: 'security-fortress',
    title: 'Local Defenses',
    subtitle: 'Run models locally',
    description:
      'Set up local LLMs with Ollama for privacy-sensitive operations. Some data should never leave your ship.',
    challengeType: 'dialogue',
    statRewards: { protocol: 1 },
    itemReward: 'local-core',
    order: 2,
  }),
  makeMission({
    id: 'security-fortress-m3',
    planetId: 'security-fortress',
    title: 'Threat Scan',
    subtitle: 'Prompt injection & more',
    description:
      'Identify and defend against prompt injection, data poisoning, and other AI-specific security threats.',
    challengeType: 'debug',
    statRewards: { command: 1 },
    order: 3,
  }),
  makeMission({
    id: 'security-fortress-m4',
    planetId: 'security-fortress',
    title: 'The Legal Frontier',
    subtitle: 'AI and the law',
    description:
      'Navigate the evolving legal landscape of AI: copyright, liability, licensing, and responsible disclosure.',
    challengeType: 'dialogue',
    statRewards: { command: 1 },
    order: 4,
  }),
]

// ---------------------------------------------------------------------------
// Production Worlds (Act 3) — 3 missions
// ---------------------------------------------------------------------------

const productionWorldsMissions: Mission[] = [
  makeMission({
    id: 'production-worlds-m1',
    planetId: 'production-worlds',
    title: 'Moon Alpha: Quality Engineering',
    subtitle: 'Ship with confidence',
    description:
      'Master testing, CI/CD, monitoring, and observability for AI-powered systems. Quality at scale.',
    challengeType: 'command',
    statRewards: { command: 2 },
    order: 1,
  }),
  makeMission({
    id: 'production-worlds-m2',
    planetId: 'production-worlds',
    title: 'Moon Beta: The Enterprise',
    subtitle: 'Scale and govern',
    description:
      'Deploy agent systems in enterprise environments. Governance, compliance, cost management, and organizational change.',
    challengeType: 'dialogue',
    statRewards: { command: 1 },
    order: 2,
  }),
  makeMission({
    id: 'production-worlds-m3',
    planetId: 'production-worlds',
    title: 'Final Mission: Deployment Playbook',
    subtitle: 'Your graduation flight',
    description:
      'Combine everything you have learned into a complete deployment playbook. You are ready to command your own fleet.',
    challengeType: 'architect',
    statRewards: { command: 2 },
    itemReward: 'skill-chips',
    order: 3,
  }),
]

// ---------------------------------------------------------------------------
// All missions combined
// ---------------------------------------------------------------------------

export const missions: Mission[] = [
  ...vibeWorldMissions,
  ...debtBeltMissions,
  ...mcpStationMissions,
  ...agentAcademyMissions,
  ...frameworkNebulaMissions,
  ...orchestrationCitadelMissions,
  ...securityFortressMissions,
  ...productionWorldsMissions,
]

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getMissionsByPlanet(planetId: string): Mission[] {
  return missions
    .filter((m) => m.planetId === planetId)
    .sort((a, b) => a.order - b.order)
}

export function getMissionById(id: string): Mission | undefined {
  return missions.find((m) => m.id === id)
}
