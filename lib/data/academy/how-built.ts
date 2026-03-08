import type { AcademyContentBlock } from './types'

export const howBuiltContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'How This Was Built',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'Vibe Voyager was built entirely with Claude Code (Opus 4.6) using subagent-driven development. Every line of code, every component, every game mechanic was written by AI agents orchestrated from a single terminal. No copy-pasting from tutorials, no manual scaffolding — just a human director and a fleet of specialized agents working in parallel.',
  },
  {
    type: 'callout',
    content:
      'This entire website is an exercise in agentic development — built by the same practices it teaches.',
    variant: 'tip',
  },
  {
    type: 'paragraph',
    content:
      'What you are reading right now is a meta case study: a game about vibe coding that was itself vibe-coded. The build process followed a structured pipeline of brainstorming, planning, parallel execution, and review — the exact workflow taught throughout the game\'s missions. This section documents how it all came together.',
  },

  // --- The Stack ---
  {
    type: 'heading',
    content: 'The Stack',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The technology choices were driven by two constraints: agents need to parallelize well, and the game runs entirely client-side with no backend. React components are naturally isolated by file, making them ideal for parallel agent work — each agent writes to its own component file with zero merge conflicts.',
  },
  {
    type: 'table',
    headers: ['Technology', 'Version', 'Role'],
    rows: [
      ['Next.js', '15', 'App framework (App Router, file-based routing)'],
      ['React', '19', 'UI rendering'],
      ['TypeScript', '5+', 'Type safety across all files'],
      ['Tailwind CSS', 'v4', 'Styling (CSS-first @theme config)'],
      ['Motion', '12', 'Spring animations and page transitions'],
      ['HTML5 Canvas', '-', 'Star map galaxy rendering'],
      ['Howler.js', '2.x', 'Ambient audio and SFX sprites'],
      ['localStorage', '-', 'Game save state (no backend needed)'],
    ],
  },
  {
    type: 'callout',
    content:
      'Why Next.js over a game engine like Unity or Phaser? Agents parallelize React components far better than monolithic game scenes. Each component is a separate file with clear props — perfect for independent agent work.',
    variant: 'info',
  },

  // --- Timeline ---
  {
    type: 'heading',
    content: 'Timeline',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The entire project was built in approximately one week, starting on March 7, 2026. The first day was spent on brainstorming and planning — exploring the design space, researching the AI tools landscape, writing a detailed design document, and creating a 9-phase implementation plan with 39 discrete tasks. Implementation began on March 8 and proceeded through parallel agent waves.',
  },

  // --- Build Phases ---
  {
    type: 'heading',
    content: 'Build Phases',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The implementation plan decomposed the entire project into 9 phases. Each phase was designed so that its tasks could run in parallel — multiple agents writing to different files simultaneously, with the main thread handling git commits after each wave completed.',
  },
  {
    type: 'table',
    headers: ['Phase', 'Description', 'Agents', 'Lines Added', 'Key Output'],
    rows: [
      ['1', 'Scaffolding', '2 (sequential)', '-', 'Next.js 15 project + Tailwind v4 design system'],
      ['2', 'Core Infrastructure', '4 (parallel)', '1,835', 'Game state, UI library, audio system, data layer'],
      ['3', 'Core Screens', '5 (parallel)', '~1,461', 'Title, character creation, cockpit, star map, nav bar'],
      ['4', 'Game Systems', '3 (parallel)', '~1,561', 'Dialogue system, mission framework, inventory/crew pages'],
      ['5', 'Mini-Games', '5 (parallel)', '~1,718', 'PromptDuel, Architect, Connect, Debug, Command'],
      ['6', 'Planet Content', '8 (parallel)', '-', '34 missions across 8 planets with dialogue and challenges'],
      ['7', 'Academy Content', '5 (parallel)', '-', '10 real-world tooling and career guides'],
      ['8', 'Polish', '4 (parallel)', '-', 'Transitions, audio, responsive design, visual assets'],
      ['9', 'Deployment', '1', '-', 'Vercel deployment at vibe.shehral.com'],
    ],
  },
  {
    type: 'callout',
    content:
      'Phases 2-5 alone produced over 6,500 lines of production code with zero type errors across all parallel agent work. Each agent wrote to isolated files, so there were no merge conflicts to resolve.',
    variant: 'info',
  },

  // --- Agent Team Architecture ---
  {
    type: 'heading',
    content: 'Agent Team Architecture',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Subagent-driven development is a workflow where a main orchestrator (the human + Claude Code session) decomposes work into independent tasks, then launches fresh agent instances to execute each task in parallel. The key principle: each agent gets a clean context window, a focused task description, and a set of files it is allowed to touch. No two agents ever edit the same file.',
  },
  {
    type: 'paragraph',
    content:
      'The main thread follows a strict protocol: (1) read the plan and identify the next wave of independent tasks, (2) launch agents with clear task boundaries, (3) wait for all agents to complete, (4) review the output, (5) commit each agent\'s work as a separate git commit, (6) move to the next wave. This mirrors how a tech lead coordinates a team of developers.',
  },
  {
    type: 'paragraph',
    content:
      'A critical discovery during the build: subagents cannot run bash commands or git operations. The main thread must handle all commits, type-checking, and integration verification. This constraint actually improved code quality — every commit was reviewed by the orchestrator before being accepted.',
  },

  // --- Tools Used ---
  {
    type: 'heading',
    content: 'Tools and Plugins',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Claude Code was extended with skills and plugins that structured the development workflow. Each tool served a specific purpose in the pipeline from idea to deployed code.',
  },
  {
    type: 'table',
    headers: ['Tool', 'Category', 'Purpose'],
    rows: [
      ['superpowers:brainstorming', 'Skill', 'Structured design exploration before writing any code'],
      ['superpowers:writing-plans', 'Skill', 'Created the 9-phase, 39-task implementation plan'],
      ['superpowers:subagent-driven-development', 'Skill', 'Orchestrated parallel agent teams during execution'],
      ['superpowers:executing-plans', 'Skill', 'Step-by-step plan execution with review checkpoints'],
      ['context7', 'Plugin', 'Verified latest API patterns for Next.js 15, Motion, Tailwind v4'],
      ['compound-engineering', 'Plugin', 'Code review agents and architecture exploration'],
      ['Explore agents', 'Agent Type', 'Parallel codebase exploration for reference projects'],
      ['code-reviewer', 'Agent Type', 'Post-implementation code quality checks'],
      ['code-architect', 'Agent Type', 'Architecture decisions and component design'],
    ],
  },
  {
    type: 'callout',
    content:
      'The context7 plugin was essential. It prevented the AI from using outdated API patterns — for example, catching that framer-motion has been renamed to motion (import from "motion/react"), and that Tailwind v4 uses @theme directives instead of tailwind.config.ts.',
    variant: 'warning',
  },

  // --- Key Decisions ---
  {
    type: 'heading',
    content: 'Key Decisions',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Several architectural decisions shaped the build. Each was made deliberately to optimize for agent-based development:',
  },
  {
    type: 'paragraph',
    content:
      'Next.js over a game engine: React components map naturally to independent agent tasks. Each component is a single file with typed props — agents can write them in isolation without needing to understand the entire codebase. A game engine would have required shared state and scene graphs that are much harder to parallelize.',
  },
  {
    type: 'paragraph',
    content:
      'localStorage over a backend: The game is a teaching tool, not a social platform. There is no need for user accounts, leaderboards, or cloud saves. Removing the backend eliminated an entire category of infrastructure work and kept the project deployable on Vercel\'s free tier with zero ongoing costs.',
  },
  {
    type: 'paragraph',
    content:
      'Tailwind v4 over v3: The CSS-first configuration model (@theme directive, @import "tailwindcss") eliminates the tailwind.config.ts file entirely. Design tokens live in CSS where they belong, and agents can reference them without needing to read a separate config file.',
  },

  // --- Metrics ---
  {
    type: 'heading',
    content: 'Build Metrics',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Metric', 'Value'],
    rows: [
      ['Total lines of code', '10,000+'],
      ['Total agent invocations', '30+'],
      ['Parallel agent waves', '9'],
      ['Max agents in a single wave', '8 (Phase 6: Planet Content)'],
      ['Type errors across all parallel work', '0'],
      ['Git commits', '30+'],
      ['Implementation phases', '9'],
      ['Discrete tasks in plan', '39'],
      ['File conflicts between agents', '0'],
    ],
  },
  {
    type: 'paragraph',
    content:
      'The zero-conflict metric is the most significant. By carefully decomposing tasks so that each agent writes to its own set of files, the entire build avoided the merge conflicts that typically slow down parallel development. This required upfront planning — the implementation plan explicitly listed which files each agent would create or modify.',
  },

  // --- Closing ---
  {
    type: 'heading',
    content: 'What This Proves',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Vibe Voyager demonstrates that agentic development is not a theoretical concept — it is a practical methodology that can produce a complete, polished application in days rather than weeks. The human role shifts from writing every line to directing the architecture, decomposing work, and reviewing output. The agents handle the volume; the human handles the vision.',
  },
  {
    type: 'callout',
    content:
      'The build log for this project (BUILD_LOG.md) was maintained throughout development and served as the source material for this section. Keeping a build log is itself a best practice — it creates accountability, captures decisions, and provides material for retrospectives.',
    variant: 'tip',
  },
]
