import type { PlanetId } from '../types'

export interface Planet {
  id: PlanetId
  name: string
  subtitle: string
  act: 1 | 2 | 3
  description: string
  color: string
  position: { x: number; y: number } // normalized 0-100 for star map
  prerequisites: PlanetId[]
  missionCount: number
}

export const planets: Planet[] = [
  {
    id: 'vibe-world',
    name: 'Vibe World',
    subtitle: 'Where It All Begins',
    act: 1,
    description:
      'Learn the art of vibe coding — talking to AI in natural language to build software at the speed of thought.',
    color: '#c17147',
    position: { x: 30, y: 60 },
    prerequisites: [],
    missionCount: 4,
  },
  {
    id: 'debt-belt',
    name: 'Debt Asteroid Belt',
    subtitle: 'The Price of Speed',
    act: 1,
    description:
      'Navigate the treacherous field of technical debt. AI code has 1.75x more bugs — learn why, and what to do about it.',
    color: '#c17147',
    position: { x: 55, y: 50 },
    prerequisites: ['vibe-world'],
    missionCount: 4,
  },
  {
    id: 'mcp-station',
    name: 'MCP Station',
    subtitle: 'First Contact',
    act: 2,
    description:
      'Discover the Model Context Protocol — the USB-C of AI, connecting agents to tools. 97 million monthly downloads and growing.',
    color: '#4a6fa5',
    position: { x: 20, y: 35 },
    prerequisites: ['debt-belt'],
    missionCount: 5,
  },
  {
    id: 'agent-academy',
    name: 'Agent Academy',
    subtitle: 'Build Your Crew',
    act: 2,
    description:
      'Learn the cognitive architecture of AI agents: Perceive → Plan → Act → Reflect. Recruit your crew along the way.',
    color: '#6b9e78',
    position: { x: 50, y: 28 },
    prerequisites: ['mcp-station'],
    missionCount: 5,
  },
  {
    id: 'framework-nebula',
    name: 'Framework Nebula',
    subtitle: 'Choose Your Tools',
    act: 2,
    description:
      'Navigate the constellation of agent frameworks: LangGraph, CrewAI, AutoGen, and the official vendor SDKs.',
    color: '#4a6fa5',
    position: { x: 78, y: 35 },
    prerequisites: ['agent-academy'],
    missionCount: 5,
  },
  {
    id: 'orchestration-citadel',
    name: 'Orchestration Citadel',
    subtitle: 'Command the Fleet',
    act: 3,
    description:
      'Master multi-agent orchestration with A2A protocol. 72% of enterprise projects now use multi-agent architectures.',
    color: '#e8e0d4',
    position: { x: 25, y: 15 },
    prerequisites: ['framework-nebula'],
    missionCount: 4,
  },
  {
    id: 'security-fortress',
    name: 'Security Fortress',
    subtitle: 'Trust No Input',
    act: 3,
    description:
      'Deploy HITL safety systems, run local LLMs, handle security threats, and navigate AI copyright law.',
    color: '#c17147',
    position: { x: 55, y: 12 },
    prerequisites: ['orchestration-citadel'],
    missionCount: 4,
  },
  {
    id: 'production-worlds',
    name: 'Production Worlds',
    subtitle: 'Ship It',
    act: 3,
    description:
      'Three moons of production mastery: quality engineering, enterprise deployment, and the final deployment playbook.',
    color: '#6b9e78',
    position: { x: 80, y: 15 },
    prerequisites: ['security-fortress'],
    missionCount: 3,
  },
]

export const TOTAL_MISSIONS = planets.reduce(
  (sum, p) => sum + p.missionCount,
  0
) // 34

export const MISSION_COUNTS: Record<string, number> = Object.fromEntries(
  planets.map((p) => [p.id, p.missionCount])
)
