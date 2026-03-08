import type { AcademyContentBlock } from './types'

export const resourcesContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'Resource Library',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'A curated collection of the best articles, papers, tools, and guides for vibe coding, agentic AI, and modern software engineering. These resources are organized by topic so you can dive deeper into any area that interests you. Each link has been reviewed for quality and relevance.',
  },

  // --- Vibe Coding & Fundamentals ---
  {
    type: 'heading',
    content: 'Vibe Coding and Fundamentals',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Core resources for understanding vibe coding — what it is, how it works, and what the research says about its impact on software development.',
  },
  {
    type: 'link-card',
    title: 'Vibe Coding vs. Agentic Coding',
    url: 'https://arxiv.org/html/2505.19443v1',
    description: 'arXiv paper comparing vibe coding and agentic coding approaches',
    source: 'arXiv',
  },
  {
    type: 'link-card',
    title: 'GenAI and Software Development',
    url: 'https://arxiv.org/html/2510.10819v1',
    description: 'How generative AI transforms software development practices',
    source: 'arXiv',
  },
  {
    type: 'link-card',
    title: 'Vibe Coding in Practice',
    url: 'https://www.arxiv.org/pdf/2512.11922',
    description: 'Flow, technical debt, and guidelines for sustainable use',
    source: 'arXiv',
  },
  {
    type: 'link-card',
    title: 'What is Vibe Coding?',
    url: 'https://www.ibm.com/think/topics/vibe-coding',
    description: "IBM's comprehensive explainer on vibe coding",
    source: 'IBM',
  },
  {
    type: 'link-card',
    title: 'What is Vibe Coding?',
    url: 'https://blog.replit.com/what-is-vibe-coding',
    description: "Replit's perspective on vibe coding",
    source: 'Replit',
  },
  {
    type: 'link-card',
    title: 'Vibe Coding Explained',
    url: 'https://cloud.google.com/discover/what-is-vibe-coding',
    description: "Google Cloud's guide to vibe coding",
    source: 'Google Cloud',
  },
  {
    type: 'link-card',
    title: 'Wikipedia - Vibe Coding',
    url: 'https://en.wikipedia.org/wiki/Vibe_coding',
    description: 'Wikipedia overview of vibe coding',
    source: 'Wikipedia',
  },

  // --- Agentic Frameworks & Architecture ---
  {
    type: 'heading',
    content: 'Agentic Frameworks and Architecture',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Deep dives into how AI coding agents are built, the frameworks that power them, and architectural patterns for agentic systems.',
  },
  {
    type: 'link-card',
    title: 'Agentic AI Architecture 101',
    url: 'https://akka.io/blog/agentic-ai-architecture',
    description: 'Comprehensive guide to agentic AI architecture patterns',
    source: 'Akka',
  },
  {
    type: 'link-card',
    title: 'Deep Agent Architecture',
    url: 'https://dev.to/apssouza22/a-deep-dive-into-deep-agent-architecture-for-ai-coding-assistants-3c8b',
    description: 'Deep dive into agent architecture for coding assistants',
    source: 'DEV',
  },
  {
    type: 'link-card',
    title: 'LangGraph vs CrewAI vs AutoGen',
    url: 'https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen',
    description: 'Detailed comparison of agent frameworks',
    source: 'DataCamp',
  },
  {
    type: 'link-card',
    title: 'Practical Guide to Agentic AI',
    url: 'https://arxiv.org/html/2602.10122v1',
    description: 'Transitioning organizations to agentic AI',
    source: 'arXiv',
  },
  {
    type: 'link-card',
    title: 'Agentic AI for Software Engineering',
    url: 'https://arxiv.org/html/2508.17343v3',
    description: 'Perspectives from the software engineering community',
    source: 'arXiv',
  },

  // --- MCP & Protocols ---
  {
    type: 'heading',
    content: 'MCP and Protocols',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Resources covering the Model Context Protocol — from the official announcement to engineering deep dives and practical guides.',
  },
  {
    type: 'link-card',
    title: 'Introducing MCP',
    url: 'https://www.anthropic.com/news/model-context-protocol',
    description: "Anthropic's announcement of the Model Context Protocol",
    source: 'Anthropic',
  },
  {
    type: 'link-card',
    title: 'Code Execution with MCP',
    url: 'https://www.anthropic.com/engineering/code-execution-with-mcp',
    description: 'Engineering deep dive into MCP code execution',
    source: 'Anthropic',
  },
  {
    type: 'link-card',
    title: 'What is MCP?',
    url: 'https://www.ibm.com/think/topics/model-context-protocol',
    description: "IBM's explainer on MCP",
    source: 'IBM',
  },
  {
    type: 'link-card',
    title: 'MCP Simplifies AI Agent Dev',
    url: 'https://onereach.ai/blog/how-mcp-simplifies-ai-agent-development/',
    description: 'How MCP streamlines agent development',
    source: 'OneReach',
  },

  // --- Benchmarks & Testing ---
  {
    type: 'heading',
    content: 'Benchmarks and Testing',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Leaderboards and benchmarks for measuring how well AI coding agents perform on real-world software engineering tasks.',
  },
  {
    type: 'link-card',
    title: 'SWE-bench Leaderboards',
    url: 'https://www.swebench.com/',
    description: 'The standard benchmark for AI coding agents',
    source: 'SWE-bench',
  },
  {
    type: 'link-card',
    title: 'Live SWE Agent Leaderboard',
    url: 'https://live-swe-agent.github.io/',
    description: 'Real-time leaderboard for SWE agents',
    source: 'GitHub',
  },

  // --- Security & Safety ---
  {
    type: 'heading',
    content: 'Security and Safety',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Guides on keeping AI-assisted development safe — from human-in-the-loop oversight to automated security fixing and avoiding technical debt.',
  },
  {
    type: 'link-card',
    title: 'HITL Agent Oversight',
    url: 'https://galileo.ai/blog/human-in-the-loop-agent-oversight',
    description: 'Building human-in-the-loop oversight for AI agents',
    source: 'Galileo',
  },
  {
    type: 'link-card',
    title: 'Agentic Code Security Auto Fixer',
    url: 'https://github.com/GPT-Laboratory/Agentic-Code-Security-Auto-Fixer',
    description: 'Automated security vulnerability fixing with agents',
    source: 'GitHub',
  },
  {
    type: 'link-card',
    title: 'Avoiding Tech Debt in Vibe Coding',
    url: 'https://www.tabnine.com/blog/how-to-avoid-vibe-coding-your-way-into-a-tsunami-of-tech-debt/',
    description: 'How to prevent technical debt when vibe coding',
    source: 'Tabnine',
  },
]
