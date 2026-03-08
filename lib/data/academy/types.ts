export type AcademyContentBlock =
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'paragraph'; content: string }
  | { type: 'code'; content: string; language?: string }
  | { type: 'callout'; content: string; variant?: 'info' | 'warning' | 'tip' }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'link-card'; title: string; url: string; description: string; source?: string }
  | { type: 'tool-card'; name: string; category: string; description: string; url?: string; features?: string[] }
