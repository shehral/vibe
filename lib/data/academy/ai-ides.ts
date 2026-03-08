import type { AcademyContentBlock } from './types'

export const aiIdesContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'AI-Powered IDEs and Editors',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'The landscape of AI-powered development tools has exploded since 2023. What started with simple autocomplete suggestions has evolved into full autonomous coding agents that can plan, write, test, and debug entire features. Today, developers can choose from GUI-based IDEs, terminal agents, and VS Code extensions — each with different strengths depending on your workflow and preferences.',
  },
  {
    type: 'paragraph',
    content:
      'This section maps out the major players across three categories: standalone AI IDEs that reimagine the editor experience, terminal-based agents that work alongside your existing tools, and VS Code extensions that add AI capabilities to the most popular editor in the world.',
  },

  // --- Comparison Table ---
  {
    type: 'heading',
    content: 'Quick Comparison',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Tool', 'Type', 'Key Strength', 'Best For'],
    rows: [
      ['Cursor', 'GUI IDE', 'Multi-file composer edits', 'Full-time AI-first development'],
      ['Claude Code', 'Terminal Agent', 'CLAUDE.md project context + agent teams', 'Power users who live in the terminal'],
      ['GitHub Copilot', 'Extension / IDE', 'Deepest GitHub integration', 'Teams already on GitHub ecosystem'],
      ['Windsurf', 'GUI IDE', 'Cascade multi-step agent', 'Complex multi-file refactors'],
      ['Cline', 'VS Code Extension', 'Autonomous multi-step execution', 'VS Code users wanting agent capabilities'],
      ['Aider', 'Terminal Agent', 'Open-source with git integration', 'Developers who want full control and transparency'],
      ['Kiro', 'GUI IDE', 'Spec-driven development', 'Teams wanting structured AI workflows'],
    ],
  },

  // --- GUI IDEs ---
  {
    type: 'heading',
    content: 'GUI IDEs',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'These are standalone editors built from the ground up (or forked from VS Code) with AI as a first-class feature. They offer the most integrated experience, with AI woven into every part of the editing workflow.',
  },
  {
    type: 'tool-card',
    name: 'Cursor',
    category: 'GUI IDE',
    description:
      'The AI-first IDE that popularized the category. Built on a VS Code fork, Cursor combines familiar editing with powerful AI features like Composer for multi-file edits, Tab for intelligent completions that predict your next move, and inline chat for quick questions without leaving your code.',
    url: 'https://cursor.sh',
    features: [
      'Tab completion that predicts multi-line changes',
      'Chat with full codebase context',
      'Composer for multi-file coordinated edits',
      'Support for multiple AI models',
    ],
  },
  {
    type: 'tool-card',
    name: 'Google Antigravity',
    category: 'GUI IDE',
    description:
      'Google\'s AI-powered IDE (formerly Project IDX) with deep Gemini integration. Runs entirely in the cloud, giving you instant development environments with AI assistance baked into every interaction. Particularly strong for Google Cloud and Firebase workflows.',
    url: 'https://idx.google.com',
    features: [
      'Cloud-based workspaces with zero local setup',
      'Gemini models built directly into the editor',
      'Deep integration with Google Cloud services',
      'Collaborative editing with AI assistance',
    ],
  },
  {
    type: 'tool-card',
    name: 'Kiro',
    category: 'GUI IDE',
    description:
      'AWS-backed AI IDE that takes a structured approach to AI development. Instead of freeform prompting, Kiro uses spec files that define requirements, design docs, and implementation plans. The AI follows these specs to generate code that matches your intent precisely.',
    url: 'https://kiro.dev',
    features: [
      'Spec-driven development with structured requirements',
      'Hooks for automated workflows on file changes',
      'Steering docs for project-wide AI guidance',
      'Built on VS Code with AWS service integration',
    ],
  },
  {
    type: 'tool-card',
    name: 'Windsurf',
    category: 'GUI IDE',
    description:
      'Codeium\'s flagship IDE featuring Cascade, a multi-step AI agent that can plan and execute complex coding tasks across your entire project. Windsurf remembers context across sessions, building up an understanding of your codebase over time.',
    url: 'https://codeium.com/windsurf',
    features: [
      'Cascade multi-step agent for complex tasks',
      'Persistent memory across coding sessions',
      'Deep codebase understanding',
      'Inline suggestions and chat',
    ],
  },
  {
    type: 'tool-card',
    name: 'GitHub Copilot',
    category: 'GUI IDE / Extension',
    description:
      'The original AI coding assistant that started it all. Now available as both a VS Code extension and a standalone IDE experience, Copilot offers inline completions, chat, and Copilot Workspace for planning and implementing features from GitHub Issues.',
    url: 'https://github.com/features/copilot',
    features: [
      'Inline code completions as you type',
      'Chat with codebase context',
      'Copilot Workspace for issue-to-PR workflows',
      'Deepest integration with GitHub ecosystem',
    ],
  },

  // --- Terminal Agents ---
  {
    type: 'heading',
    content: 'Terminal Agents',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Terminal agents run in your command line and interact with your codebase through file operations, shell commands, and tool use. They appeal to developers who prefer keyboard-driven workflows and want AI that integrates with their existing terminal setup.',
  },
  {
    type: 'tool-card',
    name: 'Claude Code',
    category: 'Terminal Agent',
    description:
      'Anthropic\'s CLI agent that lives in your terminal. Uses CLAUDE.md files for persistent project context, supports MCP (Model Context Protocol) for connecting to external tools, and can orchestrate teams of sub-agents for parallel work. The tool that built this very game.',
    url: 'https://claude.ai/claude-code',
    features: [
      'CLAUDE.md for project-wide instructions and context',
      'Skills and plugins for extensible workflows',
      'Hooks for custom automation on events',
      'MCP integration for external tool access',
      'Agent teams for parallel task execution',
    ],
  },
  {
    type: 'tool-card',
    name: 'Codex CLI',
    category: 'Terminal Agent',
    description:
      'OpenAI\'s open-source terminal agent that executes code in a sandboxed environment. Codex reads your codebase, proposes changes, and can run commands safely — all from the command line. Designed for developers who want GPT-powered assistance without leaving the terminal.',
    url: 'https://github.com/openai/codex',
    features: [
      'Sandboxed execution for safe code running',
      'Multi-file edits with diff preview',
      'Full codebase context awareness',
      'Open-source and self-hostable',
    ],
  },
  {
    type: 'tool-card',
    name: 'Gemini CLI',
    category: 'Terminal Agent',
    description:
      'Google\'s terminal-based AI agent powered by Gemini models. Offers deep integration with Google\'s ecosystem and strong performance on code understanding tasks. Works with your local files and can execute shell commands.',
    url: 'https://github.com/google-gemini/gemini-cli',
    features: [
      'Powered by Gemini models',
      'Google ecosystem integrations',
      'File and shell command operations',
      'Open-source and extensible',
    ],
  },
  {
    type: 'tool-card',
    name: 'Aider',
    category: 'Terminal Agent',
    description:
      'The open-source AI pair programmer that pioneered many terminal agent patterns. Aider has deep git integration, automatically committing changes with meaningful messages. It supports multiple AI models and uses a repo-map to understand your codebase structure.',
    url: 'https://aider.chat',
    features: [
      'Automatic git commits with descriptive messages',
      'Multi-model support (GPT, Claude, Gemini, local)',
      'Repo-map for efficient codebase understanding',
      'Voice coding mode for hands-free development',
    ],
  },

  // --- VS Code Extensions ---
  {
    type: 'heading',
    content: 'VS Code Extensions',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'If you are already invested in VS Code and do not want to switch editors, these extensions bring powerful AI capabilities directly into your existing setup. They range from simple autocomplete to fully autonomous agents.',
  },
  {
    type: 'tool-card',
    name: 'Cline',
    category: 'VS Code Extension',
    description:
      'An autonomous coding agent that runs inside VS Code. Cline can execute multi-step tasks: reading files, writing code, running terminal commands, and even browsing the web. It supports MCP for connecting to external tools and services.',
    url: 'https://github.com/cline/cline',
    features: [
      'Multi-step autonomous task execution',
      'Tool use including terminal and browser',
      'MCP support for external integrations',
      'Human-in-the-loop approval for safety',
    ],
  },
  {
    type: 'tool-card',
    name: 'Roo Code',
    category: 'VS Code Extension',
    description:
      'A fork of Cline with additional features like custom modes that let you define specialized AI behaviors (reviewer, architect, debugger). Includes an MCP marketplace for discovering and installing integrations.',
    url: 'https://github.com/RooVetGit/Roo-Code',
    features: [
      'Custom modes for specialized AI behaviors',
      'MCP marketplace for easy integration discovery',
      'All Cline features plus extensions',
      'Community-driven development',
    ],
  },
  {
    type: 'tool-card',
    name: 'Continue',
    category: 'VS Code Extension',
    description:
      'The leading open-source AI code assistant for VS Code (and JetBrains). Continue gives you autocomplete, chat, and inline editing with your choice of AI model — including local models for privacy-conscious teams.',
    url: 'https://continue.dev',
    features: [
      'Autocomplete with any AI model',
      'Chat with codebase context',
      'Multi-model support including local models',
      'Fully open-source and customizable',
    ],
  },

  // --- Closing Tip ---
  {
    type: 'callout',
    content:
      'There is no single "best" AI coding tool. The right choice depends on your workflow: if you live in the terminal, try Claude Code or Aider. If you want an all-in-one IDE, Cursor or Windsurf are strong choices. If you are already in VS Code, start with Cline or Continue. Many developers use multiple tools — a terminal agent for big refactors and an IDE for daily coding.',
    variant: 'tip',
  },
]
