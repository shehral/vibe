export type StatName = 'vibe' | 'architecture' | 'protocol' | 'command'

export interface PlayerStats {
  vibe: number
  architecture: number
  protocol: number
  command: number
}

export type Rank = 'Cadet' | 'Navigator' | 'Commander' | 'Admiral'
export type ShipType = 'spark' | 'architect' | 'sentinel'

export interface CrewMember {
  id: string
  name: string
  role: string
  description: string
  recruitedAt: string
  portrait: string
}

export interface InventoryItem {
  id: string
  name: string
  realWorldTool: string
  description: string
  icon: string
  acquiredAt: string
}

export type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed'

export interface MissionProgress {
  missionId: string
  status: MissionStatus
  score?: number
  completedAt?: string
}

export type ChallengeType = 'prompt-duel' | 'architect' | 'connect' | 'debug' | 'command' | 'dialogue'

export interface Mission {
  id: string
  planetId: PlanetId
  title: string
  subtitle: string
  description: string
  challengeType: ChallengeType
  statRewards: Partial<PlayerStats>
  itemReward?: string
  crewReward?: string
  order: number
  content: MissionContent
}

export interface MissionContent {
  briefing: DialogueNode[]
  learning: LearningBlock[]
  challenge: ChallengeData
  debrief: DialogueNode[]
}

export interface DialogueNode {
  speaker: string
  text: string
  choices?: DialogueChoice[]
}

export interface DialogueChoice {
  text: string
  correct?: boolean
  response?: string
  nextNodeIndex?: number
}

export interface LearningBlock {
  type: 'text' | 'code' | 'stat' | 'image'
  content: string
  highlight?: boolean
}

export interface ChallengeData {
  type: ChallengeType
  instructions: string
  data: Record<string, unknown>
  passingScore: number
}

export type PlanetId = 'vibe-world' | 'debt-belt' | 'mcp-station' | 'agent-academy' | 'framework-nebula' | 'orchestration-citadel' | 'security-fortress' | 'production-worlds'
export type PlanetStatus = 'locked' | 'available' | 'in_progress' | 'completed'

export interface GameState {
  callsign: string
  ship: ShipType
  stats: PlayerStats
  crew: string[]
  inventory: string[]
  missionProgress: Record<string, MissionProgress>
  currentPlanet?: PlanetId
  currentMission?: string
  createdAt: string
  lastPlayedAt: string
}
