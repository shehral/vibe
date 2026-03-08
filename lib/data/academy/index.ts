import type { AcademyContentBlock } from './types'
import { aiIdesContent } from './ai-ides'
import { codeReviewContent } from './code-review'
import { noCodeContent } from './no-code'
import { agentSdksContent } from './agent-sdks'
import { claudeCodeContent } from './claude-code'
import { bestPracticesContent } from './best-practices'
import { mcpWorkshopContent } from './mcp-workshop'
import { resourcesContent } from './resources'
import { howBuiltContent } from './how-built'
import { careerPathsContent } from './career-paths'

const contentMap: Record<string, AcademyContentBlock[]> = {
  'ai-ides': aiIdesContent,
  'code-review': codeReviewContent,
  'no-code': noCodeContent,
  'agent-sdks': agentSdksContent,
  'claude-code': claudeCodeContent,
  'best-practices': bestPracticesContent,
  'mcp-workshop': mcpWorkshopContent,
  'resources': resourcesContent,
  'how-built': howBuiltContent,
  'career-paths': careerPathsContent,
}

export function getSectionContent(sectionId: string): AcademyContentBlock[] {
  return contentMap[sectionId] || []
}

export type { AcademyContentBlock }
