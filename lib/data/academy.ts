export interface AcademySection {
  id: string
  number: number
  title: string
  description: string
  icon: string
}

export const academySections: AcademySection[] = [
  {
    id: 'ai-ides',
    number: 1,
    title: 'AI-Powered IDEs & Editors',
    description:
      'Compare Cursor, Antigravity, Kiro, Windsurf, Copilot, and terminal agents like Claude Code.',
    icon: '/images/academy/ai-ides.svg',
  },
  {
    id: 'code-review',
    number: 2,
    title: 'AI Code Review & Quality',
    description:
      'CodeRabbit, Greptile, Qodo, Ellipsis — tools that review your code with AI.',
    icon: '/images/academy/code-review.svg',
  },
  {
    id: 'no-code',
    number: 3,
    title: 'No-Code / Low-Code Builders',
    description:
      'Replit, Bolt.new, Lovable, v0 — build entire apps from prompts.',
    icon: '/images/academy/no-code.svg',
  },
  {
    id: 'agent-sdks',
    number: 4,
    title: 'Agent SDKs & Protocols',
    description:
      'Claude Agent SDK, OpenAI Agents SDK, Google ADK, MCP, A2A — the building blocks.',
    icon: '/images/academy/agent-sdks.svg',
  },
  {
    id: 'claude-code',
    number: 5,
    title: 'Claude Code Deep Dive',
    description:
      'Installation, CLAUDE.md, skills, plugins, hooks, agent teams, MCP servers.',
    icon: '/images/academy/claude-code.svg',
  },
  {
    id: 'best-practices',
    number: 6,
    title: 'Agentic Development Best Practices',
    description:
      'Subagent workflows, parallelization, code review, TDD, memory management.',
    icon: '/images/academy/best-practices.svg',
  },
  {
    id: 'mcp-workshop',
    number: 7,
    title: 'MCP Workshop',
    description:
      'Hands-on: set up MCP servers, connect tools, build your own server.',
    icon: '/images/academy/mcp-workshop.svg',
  },
  {
    id: 'resources',
    number: 8,
    title: 'Resource Library',
    description:
      '57+ curated sources on vibe coding, agents, MCP, frameworks, and security.',
    icon: '/images/academy/resources.svg',
  },
  {
    id: 'how-built',
    number: 9,
    title: 'How This Was Built',
    description:
      'Meta case study: building Vibe Voyager with Claude Code and agent teams.',
    icon: '/images/academy/how-built.svg',
  },
  {
    id: 'career-paths',
    number: 10,
    title: 'Career Paths',
    description:
      'AI-Native Developer, AI Full-Stack Developer, Prompt Engineer, Agentic Engineer.',
    icon: '/images/academy/career-paths.svg',
  },
]
