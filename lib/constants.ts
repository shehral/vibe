export const COLORS = {
  void: '#0a0f1a',
  nebula: '#4a6fa5',
  signal: '#6b9e78',
  terracotta: '#c17147',
  starlight: '#e8e0d4',
} as const

export const RANKS = [
  { name: 'Cadet', min: 4, max: 10 },
  { name: 'Navigator', min: 11, max: 20 },
  { name: 'Commander', min: 21, max: 30 },
  { name: 'Admiral', min: 31, max: 40 },
] as const

export const STATS = ['vibe', 'architecture', 'protocol', 'command'] as const
export type StatName = (typeof STATS)[number]

export const STAT_COLORS: Record<StatName, string> = {
  vibe: '#c17147',
  architecture: '#4a6fa5',
  protocol: '#6b9e78',
  command: '#e8e0d4',
}

export const STAT_LABELS: Record<StatName, string> = {
  vibe: 'Vibe',
  architecture: 'Architecture',
  protocol: 'Protocol',
  command: 'Command',
}
