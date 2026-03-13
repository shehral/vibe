import type { AcademyContentBlock } from './types'

export const howBuiltContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'How This Was Built',
    level: 2,
  },
  {
    type: 'link-card',
    title: 'View the Source Code on GitHub',
    url: 'https://github.com/shehral/vibe',
    description: 'Full source code, build playbook, and hackathon quick-reference guide. The README walks through the entire multi-agent development process.',
    source: 'GitHub',
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
      'The entire game was built in a single ~66-minute coding session on the night of March 7-8, 2026. Brainstorming and planning happened earlier that day — exploring the design space, researching the AI tools landscape, writing a detailed design document, and creating a 9-phase implementation plan with 39 discrete tasks. At 11:58 PM, the first commit landed. By 1:00 AM, 14,400+ lines of production TypeScript were written, committed, and type-checked. Polish followed the next morning.',
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
      'The implementation plan decomposed the entire project into 8 build phases plus deployment. Each phase was designed so that its tasks could run in parallel — multiple agents writing to different files simultaneously, with the main thread handling git commits after each wave completed. The timestamps below come directly from the git log.',
  },
  {
    type: 'table',
    headers: ['Time', 'Phase', 'Agents', 'Duration', 'Key Output'],
    rows: [
      ['23:58', '1. Scaffolding', '1 (sequential)', '7 min', 'Next.js 15 + Tailwind v4 design system'],
      ['00:05', '2. Core Infrastructure', '4 (parallel)', '7 min', 'Game state, UI library, audio, data layer (1,835 lines)'],
      ['00:12', '3. Core Screens', '5 (parallel)', '10 min', 'Title, character creation, cockpit, star map, nav (~1,461 lines)'],
      ['00:22', '4. Game Systems', '3 (parallel)', '5 min', 'Dialogue, missions, inventory/crew (~1,561 lines)'],
      ['00:27', '5. Mini-Games', '5 (parallel)', '6 min', 'PromptDuel, Architect, Connect, Debug, Command (~1,718 lines)'],
      ['00:33', '6. Planet Content', '8 (parallel)', '26 min', '34 missions across 8 planets (4,455 lines)'],
      ['00:33', '7. Academy Content', '5 (parallel)', 'concurrent*', '10 real-world guides (3,055 lines)'],
      ['11:42', '8. Polish', '4 (parallel)', 'next AM', 'Transitions, audio SFX, mobile, 20 SVGs'],
    ],
  },
  {
    type: 'callout',
    content:
      '* Phases 6 and 7 ran concurrently — academy agents finished while planet content agents were still writing. 61% of wall time was agent execution, 36% was orchestration overhead (dispatching, reviewing, committing), and only 3% was debugging.',
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
      ['Wall clock (core build)', '~66 minutes'],
      ['Total lines of TypeScript', '~14,400'],
      ['Source files', '61'],
      ['Total agent invocations', '35+'],
      ['Max agents in a single wave', '13 (Phases 6+7 concurrent)'],
      ['Type errors across all parallel work', '0'],
      ['Git commits', '26'],
      ['Implementation phases', '8'],
      ['Discrete tasks in plan', '39'],
      ['Merge conflicts between agents', '0'],
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
      'Vibe Voyager demonstrates that agentic development is not a theoretical concept — it is a practical methodology that produced 14,400 lines of production TypeScript in 66 minutes. The human role shifts from writing every line to directing the architecture, decomposing work, and reviewing output. The agents handle the volume; the human handles the vision. Post-build analysis showed the session could be optimized to ~35 minutes by merging independent phases into larger waves and eliminating orchestration gaps.',
  },
  {
    type: 'callout',
    content:
      'The build log for this project (BUILD_LOG.md) was maintained throughout development and served as the source material for this section. Keeping a build log is itself a best practice — it creates accountability, captures decisions, and provides material for retrospectives.',
    variant: 'tip',
  },
]
