export interface ItemDef {
  id: string
  name: string
  realWorldTool: string
  description: string
  icon: string
  acquiredAt: string
  category: 'tool' | 'protocol' | 'pattern' | 'defense'
}

export const items: ItemDef[] = [
  {
    id: 'ship-voice',
    name: 'Ship Voice Module',
    realWorldTool: 'Claude Code / Cursor',
    description:
      'AI-powered code assistant that understands natural language commands. The foundation of vibe coding.',
    icon: '/images/items/ship-voice.svg',
    acquiredAt: 'vibe-world-m1',
    category: 'tool',
  },
  {
    id: 'context-adapter',
    name: 'Context Adapter',
    realWorldTool: 'Model Context Protocol (MCP)',
    description:
      'Universal protocol connecting AI agents to external tools and data sources. The USB-C of AI.',
    icon: '/images/items/context-adapter.svg',
    acquiredAt: 'mcp-station-m2',
    category: 'protocol',
  },
  {
    id: 'agent-blueprint',
    name: 'Agent Blueprint',
    realWorldTool: 'Agent Architecture Pattern',
    description:
      'The Perceive -> Plan -> Act -> Reflect loop that powers all AI agents.',
    icon: '/images/items/agent-blueprint.svg',
    acquiredAt: 'agent-academy-m1',
    category: 'pattern',
  },
  {
    id: 'fleet-comm',
    name: 'Fleet Comm Array',
    realWorldTool: 'Multi-Agent Orchestration / A2A Protocol',
    description:
      'Communication system enabling agents to discover and coordinate with each other via A2A.',
    icon: '/images/items/fleet-comm.svg',
    acquiredAt: 'orchestration-citadel-m1',
    category: 'protocol',
  },
  {
    id: 'security-shield',
    name: 'Security Shield',
    realWorldTool: 'HITL Framework',
    description:
      'Human-in-the-loop safety system ensuring agents operate within authorized bounds.',
    icon: '/images/items/security-shield.svg',
    acquiredAt: 'security-fortress-m1',
    category: 'defense',
  },
  {
    id: 'local-core',
    name: 'Local Core',
    realWorldTool: 'Ollama / Local LLMs',
    description:
      'Run AI models locally for privacy-sensitive operations. No data leaves your ship.',
    icon: '/images/items/local-core.svg',
    acquiredAt: 'security-fortress-m2',
    category: 'defense',
  },
  {
    id: 'skill-chips',
    name: 'Skill Chips',
    realWorldTool: 'Claude Code Skills & Plugins',
    description:
      "Modular capabilities that extend your AI agent's abilities. Install, configure, compose.",
    icon: '/images/items/skill-chips.svg',
    acquiredAt: 'production-worlds-m3',
    category: 'tool',
  },
]
