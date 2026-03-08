import type { AcademyContentBlock } from './types'

export const claudeCodeContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'Claude Code Deep Dive',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'Claude Code is Anthropic\'s official CLI for agentic software development. It connects Claude directly to your terminal, your codebase, and your tools — turning it from a chatbot into a hands-on engineering partner. This guide covers everything from installation to advanced workflows like agent teams and MCP servers.',
  },

  // --- Installation ---
  {
    type: 'heading',
    content: 'Installation & Setup',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Claude Code runs in your terminal. Install it globally with npm, then launch it inside any project directory. It reads your codebase, understands your file structure, and can create, edit, and run code directly.',
  },
  {
    type: 'code',
    content: `# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Navigate to any project and start
cd my-project
claude

# Or start with a specific task
claude "add a dark mode toggle to the settings page"`,
    language: 'bash',
  },
  {
    type: 'callout',
    content:
      'Claude Code requires an Anthropic API key. Set it via the ANTHROPIC_API_KEY environment variable or follow the interactive setup on first launch.',
    variant: 'info',
  },

  // --- CLAUDE.md ---
  {
    type: 'heading',
    content: 'CLAUDE.md — Project Memory',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'CLAUDE.md is the single most important file for Claude Code productivity. It is a markdown file at your project root that tells Claude about your stack, your conventions, and your rules. Claude reads it at the start of every conversation, so it never forgets your project context.',
  },
  {
    type: 'code',
    content: `# Project CLAUDE.md

## Stack
- Next.js 15, TypeScript, Tailwind v4
- Motion for animations (import from "motion/react")
- localStorage for game state — no backend

## Rules
- Use context7 to check API docs before writing code
- All game state in localStorage
- Never commit .env files
- Use cn() from utils for className composition
- Icons: lucide-react exclusively

## File Structure
- app/ — Next.js pages
- components/ui/ — reusable components
- lib/ — utilities, types, game state
- lib/data/ — game content data files`,
    language: 'markdown',
  },
  {
    type: 'paragraph',
    content:
      'You can also create a personal CLAUDE.md at ~/.claude/CLAUDE.md for global preferences that apply across all projects. Project-level instructions override global ones when they conflict.',
  },
  {
    type: 'callout',
    content:
      'CLAUDE.md supports three levels: global (~/.claude/CLAUDE.md), project root (./CLAUDE.md), and per-directory (any subdirectory). Claude merges them all, with more specific files taking precedence.',
    variant: 'tip',
  },

  // --- Skills ---
  {
    type: 'heading',
    content: 'Skills — Reusable Prompt Templates',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Skills (also called slash commands) are reusable prompt templates that encode complex workflows into simple invocations. They live in your project and can be shared with your team. When you type a slash command, Claude loads the skill\'s instructions and follows them.',
  },
  {
    type: 'table',
    headers: ['Command', 'What It Does'],
    rows: [
      ['/commit', 'Analyzes staged changes and creates a well-formatted commit'],
      ['/review-pr', 'Reviews a pull request for bugs, style, and best practices'],
      ['/init', 'Bootstraps a new CLAUDE.md by analyzing your codebase'],
      ['/test', 'Generates or runs tests for the current context'],
      ['/fix', 'Diagnoses and fixes errors or failing tests'],
    ],
  },
  {
    type: 'paragraph',
    content:
      'Custom skills are defined as markdown files in .claude/skills/ inside your project. Each file contains instructions Claude will follow when the skill is invoked.',
  },
  {
    type: 'code',
    content: `# .claude/skills/component.md
# Skill: /component

When creating a new React component:
1. Create the file in components/ui/ or components/game/ as appropriate
2. Use TypeScript with explicit prop interfaces
3. Use cn() for className composition
4. Add keyboard support and focus-visible states
5. Export the component as a named export
6. Use Motion for any animations (import from "motion/react")`,
    language: 'markdown',
  },

  // --- Plugins ---
  {
    type: 'heading',
    content: 'Plugins — Extending Claude Code',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Plugins add specialized capabilities to Claude Code. They provide structured workflows, review frameworks, and development patterns that go beyond basic code generation. Two standout plugins are superpowers and compound-engineering.',
  },
  {
    type: 'code',
    content: `# Install community plugins
claude plugins:add superpowers
claude plugins:add compound-engineering

# Superpowers plugin provides workflow skills:
# - brainstorming — explore design before writing code
# - writing-plans — create step-by-step implementation plans
# - executing-plans — follow plans with review checkpoints
# - systematic-debugging — diagnose before fixing
# - verification-before-completion — verify work before declaring done

# Compound Engineering plugin provides review agents:
# - code-reviewer — general code review
# - security-sentinel — security-focused review
# - performance-oracle — performance analysis
# - architecture-strategist — architectural review`,
    language: 'bash',
  },
  {
    type: 'callout',
    content:
      'Plugins encode expert workflows. Instead of hoping Claude follows a good process, plugins enforce a structured sequence: brainstorm, plan, implement, review. This is the difference between AI-assisted and AI-native development.',
    variant: 'info',
  },

  // --- Hooks ---
  {
    type: 'heading',
    content: 'Hooks — Automated Quality Gates',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Hooks are shell commands that run automatically when Claude performs certain actions. They act as quality gates — for example, running the TypeScript compiler every time Claude writes or edits a file. If the hook fails, Claude sees the error and can fix it immediately.',
  },
  {
    type: 'code',
    content: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx tsc --noEmit 2>&1 | head -5"
      },
      {
        "matcher": "Write|Edit",
        "command": "npx eslint --fix --quiet $(git diff --name-only) 2>&1 | head -10"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo 'Running shell command...'"
      }
    ]
  }
}`,
    language: 'json',
  },
  {
    type: 'paragraph',
    content:
      'Hook events include PreToolUse (before a tool runs), PostToolUse (after a tool runs), and Notification (when Claude wants to alert you). The matcher field filters by tool name using regex patterns.',
  },
  {
    type: 'callout',
    content:
      'Keep hook commands fast (under 5 seconds). A slow hook on every file write will significantly degrade the development experience. Use "head" to limit output so Claude does not get overwhelmed by long error logs.',
    variant: 'warning',
  },

  // --- Agent Teams ---
  {
    type: 'heading',
    content: 'Agent Teams — Subagent-Driven Development',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Claude Code can launch subagents — fresh Claude instances that handle specific tasks in isolation. This is the foundation of agent-driven development: decompose work into independent tasks, run them in parallel, and merge the results.',
  },
  {
    type: 'code',
    content: `# Pattern: Main agent decomposes and delegates

# 1. Main agent analyzes the plan
claude "Read docs/plan.md and list all independent tasks"

# 2. Launch parallel subagents for independent work
claude --background "Create the UserProfile component per the spec in docs/plan.md"
claude --background "Add the /api/users endpoint per the spec in docs/plan.md"
claude --background "Write unit tests for the auth module per the spec in docs/plan.md"

# 3. Main agent reviews results when subagents finish
claude "Review the changes from recent commits and check for integration issues"`,
    language: 'bash',
  },
  {
    type: 'paragraph',
    content:
      'The key rule: each subagent should work on different files. If two agents edit the same file, you get merge conflicts. Decompose tasks by file boundary, not by logical concern.',
  },

  // --- MCP Servers ---
  {
    type: 'heading',
    content: 'MCP Servers — Connecting External Tools',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Model Context Protocol (MCP) servers let Claude Code interact with external systems — databases, APIs, design tools, documentation services, and more. You configure them in your Claude Code settings, and Claude gains new tools it can call during conversations.',
  },
  {
    type: 'code',
    content: `// .claude/settings.json — MCP server configuration
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}`,
    language: 'json',
  },
  {
    type: 'paragraph',
    content:
      'Once configured, Claude discovers the tools each MCP server provides and can use them naturally. For example, with the GitHub MCP server, Claude can create pull requests, read issues, and check CI status — all from the terminal.',
  },
  {
    type: 'callout',
    content:
      'The context7 MCP server is particularly powerful for development. It provides up-to-date documentation for any library, so Claude always uses the correct API patterns instead of hallucinating outdated ones.',
    variant: 'tip',
  },

  // --- Best Practices Cycle ---
  {
    type: 'heading',
    content: 'The Claude Code Feedback Loop',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The real power of Claude Code is not any single feature — it is the feedback loop between them. CLAUDE.md captures your project knowledge. Skills encode your workflows. Hooks enforce your standards. Reviews catch what slipped through. And every discovery feeds back into CLAUDE.md.',
  },
  {
    type: 'code',
    content: `# The Claude Code Best Practices Cycle:
#
# 1. CLAUDE.md    — Define your project context and rules
#       |
# 2. Skills       — Encode your workflows as reusable templates
#       |
# 3. Hooks        — Automate quality gates on every change
#       |
# 4. Review       — Use review agents to catch issues
#       |
# 5. Update       — Feed learnings back into CLAUDE.md
#       |
#    (repeat)
#
# Each cycle makes Claude smarter about YOUR project.`,
    language: 'text',
  },
  {
    type: 'callout',
    content:
      'The most productive Claude Code users treat CLAUDE.md as a living document. After every debugging session, every architectural decision, every discovered gotcha — update CLAUDE.md. Future conversations start smarter because of what past conversations learned.',
    variant: 'tip',
  },

  // --- Quick Reference ---
  {
    type: 'heading',
    content: 'Quick Reference',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Feature', 'Location', 'Purpose'],
    rows: [
      ['CLAUDE.md', 'Project root or ~/.claude/', 'Project context, rules, stack info'],
      ['Skills', '.claude/skills/*.md', 'Reusable prompt templates (slash commands)'],
      ['Hooks', '.claude/settings.json', 'Auto-run shell commands on tool events'],
      ['Plugins', 'Installed via CLI', 'Community workflow extensions'],
      ['MCP Servers', '.claude/settings.json', 'Connect external tools and APIs'],
      ['Subagents', 'claude --background', 'Parallel task execution in isolation'],
    ],
  },
  {
    type: 'paragraph',
    content:
      'Claude Code transforms the development workflow from "you write code, AI suggests" to "you direct, AI executes." Mastering these features — especially the feedback loop between CLAUDE.md, skills, hooks, and reviews — is the key to 10x agentic productivity.',
  },

  // --- Further Reading ---
  {
    type: 'heading',
    content: 'Further Reading',
    level: 3,
  },
  {
    type: 'link-card',
    title: 'Claude Code Official Documentation',
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    description: 'Complete reference for Claude Code features, configuration, and CLI usage.',
    source: 'Anthropic',
  },
  {
    type: 'link-card',
    title: 'Best Practices for Claude Code',
    url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
    description: 'Anthropic engineering team\'s guide to getting the most out of Claude Code in production workflows.',
    source: 'Anthropic Engineering',
  },
]
