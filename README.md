# Vibe Voyager

**Built in ~66 minutes by 35+ parallel AI agents.** The game teaches agentic AI development. The repo teaches how to build with agent teams.

**Play it:** [vibe.shehral.com](https://vibe.shehral.com)

This project was built as a demonstration of multi-agent development using [Claude Code](https://claude.ai/claude-code). Everything below — the build story, the playbook, the patterns — is meant to help you apply the same approach to your own projects. Whether you have 2 hours at a hackathon or a week on a side project, the methodology scales.

---

## Table of Contents

- [The Build Story](#the-build-story)
- [The Playbook](#the-playbook)
  - [Writing a CLAUDE.md That Agents Follow](#1-writing-a-claudemd-that-agents-follow)
  - [Designing for Zero-Conflict Parallelism](#2-designing-for-zero-conflict-parallelism)
  - [Decomposing Work Into Agent Tasks](#3-decomposing-work-into-agent-tasks)
  - [Common Pitfalls](#4-common-pitfalls)
  - [You Have 2 Hours — Go](#5-you-have-2-hours--go)
- [Quick Reference](#quick-reference)
- [The Game](#the-game)
- [Architecture](#architecture)
- [Development & Deployment](#development--deployment)

---

## The Build Story

Vibe Voyager is a browser-based space exploration game with 8 planets, 34 missions, 5 mini-games, and 10 Academy reference guides — ~14,400 lines of production TypeScript. It was built entirely with Claude Code (Opus 4.6) using subagent-driven development: a single human orchestrator directing waves of parallel AI agents.

The entire implementation happened in one session on the night of March 7–8, 2026. First commit at 11:58 PM. Game complete by 1:00 AM.

### The timeline (from git history)

These timestamps come directly from the git log. Every commit is on GitHub — you can verify them yourself.

```
23:58  Phase 1: Scaffold + design system (1 agent, sequential)          7 min
00:05  Phase 2: Core infrastructure (4 parallel agents)                 7 min
00:12  Phase 3: Screens — title, character creation, cockpit,          10 min
       star map, nav bar (5 parallel agents)
00:22  Phase 4: Game systems — dialogue, missions, inventory            5 min
       (3 parallel agents)
00:27  Phase 5: Mini-games — all 5 built simultaneously                 6 min
       (5 parallel agents)
00:33  Phase 6: Planet content — 8 agents, one per planet              26 min
00:33  Phase 7: Academy content — 10 sections (5 parallel agents)       concurrent*
11:42  Phase 8: Polish — transitions, audio, mobile, SVGs              next morning
```

\* Phases 6 and 7 ran concurrently — academy agents finished while planet agents were still writing.

### Where the time went

| Activity | % of wall time | What it means |
|---|---|---|
| Agent execution | 61% | Agents writing code in parallel |
| Orchestration overhead | 36% | Human dispatching agents, reviewing output, committing |
| Debugging | 3% | One type error (`Motion` variants needed `as const`) |

The bottleneck was the human, not the agents. 36% of the build was spent on the gaps between waves — reading the plan, dispatching the next batch, reviewing output, and running `git commit`. Post-build analysis showed:

- ~25 min lost to 5-min gaps between phases (review + dispatch)
- Phase 6 took 26 min because 8 agents waited for sequential merge commits
- Phases 4+5 and 6+7 had no file overlap and could have been merged into single waves

An optimized replay could hit **~35 minutes** from empty repo to production deploy.

### The process before coding

The 66-minute implementation was possible because of the work done *before* writing code:

1. **Research** — NotebookLM deep research: 57+ curated sources (papers, docs, reports) covering vibe coding through production agentic systems
2. **Brainstorming** — 8 rounds of structured dialogue to lock in audience, narrative, game mechanics, visual style, and tech stack
3. **Planning** — A 39-task implementation plan organized into 9 phases, with every task designed for parallel execution and zero file overlap

The plan took ~45 minutes to produce. It made the 66-minute build possible. Skip the plan and you'll spend those 66 minutes fighting merge conflicts and misaligned agent output instead.

### By the numbers

| Metric | Value |
|---|---|
| Wall clock (core build) | ~66 minutes |
| Source files | 61 |
| Lines of TypeScript | ~14,400 |
| Git commits | 26 |
| Agent invocations | 35+ |
| Max parallel agents in one wave | 13 |
| Merge conflicts | 0 |
| Type errors across all phases | 0 |

---

## The Playbook

These patterns were extracted from the Vibe Voyager build. They're general — you can apply them to any project, any stack, any scope.

### 1. Writing a CLAUDE.md That Agents Follow

The `CLAUDE.md` file is the single source of truth for every agent. When you launch a parallel agent, it starts with a fresh context — it doesn't know your project. The CLAUDE.md is what it reads first. If the information isn't there, the agent will guess. And it will guess wrong.

**What to include:**

| Section | Why it matters |
|---|---|
| Project description | One line so the agent knows what it's building |
| Stack with versions | Prevents agents from using outdated APIs or wrong packages |
| Import rules | "Import from `motion/react`, NOT `framer-motion`" saves hours of debugging |
| Design system | Colors, fonts, spacing tokens — agents will invent their own if you don't specify |
| File structure conventions | Where components go, where data lives, naming patterns |
| Hard rules | "No backend", "All state in localStorage", "Never use X" |

**Real example from this project:**

```markdown
# Vibe Voyager — Project CLAUDE.md

## Stack
- Next.js 15, TypeScript, Tailwind CSS v4 (@import "tailwindcss", @theme directive)
- Motion (`motion` package, import from `motion/react` — NOT framer-motion)
- HTML5 Canvas (star map, mini-games)
- Howler.js (ambient audio + SFX sprites)
- localStorage (game save state — no backend)

## Design System
- Void: #0a0f1a | Nebula Blue: #4a6fa5 | Signal Green: #6b9e78
- Core Terracotta: #c17147 | Starlight: #e8e0d4
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)

## Rules
- ALWAYS check context7 for latest Motion/Next.js/Tailwind v4 APIs before writing components.
- All game state in localStorage — no backend, no database, no auth.
```

Notice what this does: an agent reading this CLAUDE.md knows the exact stack, the exact import paths, the exact color tokens, and the hard constraints — before it writes a single line. Every agent in the Vibe Voyager build read this file. Zero agents used the wrong import path.

**Common mistakes:**

- Too vague: "Use React" — which version? App Router or Pages? What UI library?
- Too long: 500 lines of CLAUDE.md means agents spend tokens reading instead of coding. Keep it under 50 lines. Link to other docs for details.
- Missing constraints: If you don't say "no backend," an agent *will* try to set up a database.

### 2. Designing for Zero-Conflict Parallelism

The reason 35+ agents could work simultaneously with zero merge conflicts: **no two agents ever edited the same file.** This isn't luck — it's architecture.

**The file boundary principle:**

Every parallel agent gets an exclusive set of files to create or modify. If Agent A writes `components/games/PromptDuel.tsx` and Agent B writes `components/games/Debug.tsx`, they can run at the same time with zero risk of conflict.

**How to structure your project for this:**

```
Routes:      Each page is its own directory → one agent per route
Components:  Each component is its own file → one agent per component
Data:        Each entity gets its own file → one agent per data file
Utils:       Shared types/constants defined BEFORE parallel work begins
```

**Example from the Vibe Voyager build:**

Phase 5 launched 5 agents to build 5 mini-games. Each agent created exactly one file:

```
Agent 1 → components/games/PromptDuel.tsx
Agent 2 → components/games/Architect.tsx
Agent 3 → components/games/Connect.tsx
Agent 4 → components/games/Debug.tsx
Agent 5 → components/games/Command.tsx
```

All 5 committed within 5 seconds of each other (00:32:45–00:32:50). Zero conflicts.

This worked because Phase 2 had already established the shared types (`lib/types.ts`) and data layer (`lib/data/`) that all mini-games imported from. The shared foundations were built sequentially. The independent features were built in parallel.

**The rule:** Sequential for shared infrastructure. Parallel for independent features.

### 3. Decomposing Work Into Agent Tasks

A good agent task has three properties:

1. **Clear scope** — "Build the dialogue system with typewriter text, branching choices, and quiz scoring" not "work on the game"
2. **Named files** — The agent knows exactly which files it will create or modify
3. **Independent** — It can run without waiting for any other parallel agent in the same wave

**The wave pattern:**

```
Wave 1 (sequential):  Scaffold, shared types, design system
Wave 2 (parallel):    Infrastructure — state management, UI library, audio, data
Wave 3 (parallel):    Features — each route/component/page built by a separate agent
Wave 4 (parallel):    Content — each content file written by a separate agent
Wave 5 (parallel):    Polish — transitions, responsive, assets (each touches different files)
Wave 6 (sequential):  Deploy
```

Each wave depends on the previous wave completing. Within a wave, all tasks are independent.

**When to parallelize vs. go sequential:**

- Agents write to different files → parallelize
- Agent B needs to import from Agent A's output → sequential (A first, then B)
- Agents share a config or types file → build the shared file first, then parallelize
- You're not sure → go sequential. A conflict costs more time than the parallelism saves.

**How to dispatch parallel agents in Claude Code:**

Use subagents (the Agent tool) or background tasks. Each agent gets a prompt like:

```
Read CLAUDE.md. Build the [component name]: [specific requirements].
Create file: [exact path]. Import types from lib/types.ts.
Do not modify any other files.
```

The "do not modify any other files" line is critical. Without it, agents will helpfully "fix" shared files and create conflicts.

### 4. Common Pitfalls

**Over-parallelizing.** If two agents touch the same file, you get a conflict. Resolve the conflict, re-do one agent's work, lose time. It's faster to go sequential than to fix conflicts. When in doubt, don't parallelize.

**Skipping the plan.** Agents without clear task boundaries drift. They'll build something — but not what you needed, or they'll write to files another agent is also writing to. The 45 minutes spent planning Vibe Voyager saved hours of potential rework. For a 2-hour hackathon, 15 minutes of planning is not optional — it's the highest-leverage time you'll spend.

**Not reading first.** An agent that writes before reading existing code will duplicate work, break conventions, or use the wrong patterns. Always instruct agents to read CLAUDE.md and reference files before writing.

**Commit bottlenecking.** In the Vibe Voyager build, Phase 6 took 26 minutes — not because the agents were slow, but because 8 agents finished and had to wait for the main thread to commit them one by one. If you're the bottleneck, your agents are idle. Solutions: merge in parallel using feature branches, or keep wave sizes manageable (4-5 agents is a sweet spot).

**Vague prompts.** "Build the frontend" will get you something. "Build the title screen with an animated starfield background, a glowing title using Space Grotesk, and 4 staggered menu buttons (New Game, Continue, Academy, About) in a centered column" will get you what you want. Specificity in the prompt saves revision cycles.

### 5. You Have 2 Hours — Go

A compressed version of the methodology for a hackathon sprint.

#### Minute 0–15: Plan (do not skip this)

```
1. Write CLAUDE.md
   - One-line project description
   - Stack (framework, language, styling, key dependencies)
   - Hard constraints ("no backend", "use localStorage", etc.)
   - Design tokens if relevant (colors, fonts)

2. Brainstorm with Claude
   - Describe what you're building
   - Let it ask you 3-5 questions to nail down scope
   - Cut scope aggressively — you have 105 minutes left

3. Create a task list
   - Break your project into 8-12 discrete tasks
   - Mark which ones can run in parallel (different files)
   - Order them: shared infrastructure first, features second, polish last
```

#### Minute 15–30: Scaffold (sequential)

```
1. Initialize project (create-next-app, vite, etc.)
2. Install dependencies
3. Set up design system / global styles
4. Create shared types and data structures
5. Commit to main
```

Everything after this point imports from what you built here. This must be done before any parallel work.

#### Minute 30–90: Build features (parallel agents)

```
1. Launch 3-5 agents simultaneously, each building one feature
   - Each agent gets: CLAUDE.md + specific task + file boundaries
   - Each agent creates/modifies ONLY its assigned files

2. When agents finish, review and commit each one
   - Quick scan: does it import correctly? Does it match the design system?
   - Commit per agent, not one bulk commit

3. Launch next wave if needed
   - Second wave can depend on first wave's output
   - Repeat until core features are done
```

Keep waves to 3-5 agents. More than that and you'll bottleneck on review.

#### Minute 90–120: Polish + Deploy

```
1. Test the app end-to-end manually
2. Fix any integration issues (mismatched props, missing imports)
3. Launch 2-3 polish agents in parallel:
   - Responsive design / mobile
   - Animations / transitions
   - Final visual cleanup
4. Deploy (vercel --prod, or connect GitHub repo to Vercel)
5. Verify production build
```

#### The cheat sheet version

```
 0:00  CLAUDE.md + brainstorm + task list              15 min
 0:15  Scaffold + types + design system (sequential)   15 min
 0:30  Feature wave 1: 3-5 parallel agents             20 min
 0:50  Feature wave 2: 3-5 parallel agents             20 min
 1:10  Feature wave 3 (if needed)                      10 min
 1:30  Polish: 2-3 parallel agents                     15 min
 1:45  Deploy + verify                                 15 min
 2:00  DONE
```

---

## Quick Reference

### CLAUDE.md Template

```markdown
# [Project Name]

## What
[One sentence: what this project does]

## Stack
- [Framework] [version]
- [Language]
- [Styling approach]
- [Key dependencies with import paths]

## Design
- Colors: [list tokens]
- Fonts: [list fonts and usage]
- Style: [brief description]

## Rules
- [Hard constraint 1]
- [Hard constraint 2]
- [Import rule if non-obvious, e.g. "import from motion/react NOT framer-motion"]
```

### Agent Dispatch Pattern

When launching a parallel agent, include these in the prompt:

```
1. "Read CLAUDE.md first"
2. What to build (specific, not vague)
3. Which files to create/modify (exact paths)
4. "Do not modify any other files"
5. What to import from (shared types, utils, etc.)
```

### File Boundary Checklist

Before launching parallel agents, verify:

- [ ] No two agents will create or edit the same file
- [ ] Shared types/interfaces are already committed and available
- [ ] Each agent's task is specific enough to produce the right output
- [ ] CLAUDE.md has the stack, design tokens, and constraints

### Decision Flowchart

```
Should these tasks be parallel?
│
├─ Do they touch the same files? → NO, go sequential
├─ Does Task B import from Task A's new code? → NO, go sequential
├─ Are you unsure? → Go sequential (conflicts cost more than waiting)
└─ None of the above → YES, parallelize
```

---

## The Game

Vibe Voyager is a space exploration game where you pilot a ship through an 8-planet galaxy, learning AI-assisted development along the way. The narrative mirrors the arc from Karpathy's "vibe coding" (2025) to "agentic engineering" (2026).

- **Act 1 — The Solo Pilot:** Vibe coding fundamentals, tech debt, quality risks
- **Act 2 — First Contact:** MCP & A2A protocols, agent architecture, frameworks and SDKs
- **Act 3 — Fleet Commander:** Multi-agent orchestration, security, production deployment
- **The Academy:** 10 real-world reference guides (accessible without playing)

### Features

- **8 planets, 34 missions** across 3 acts + epilogue
- **6 mini-game types:** Prompt Duel, Architect, Connect, Debug, Command, Dialogue
- **5 recruitable crew members** (Perceive, Plan, Act, Reflect cognitive loop)
- **4 player stats:** Vibe, Architecture, Protocol, Command
- **Full audio:** ambient space synth + 8 SFX types
- **Canvas star map** with parallax, orbital rings, click navigation
- **Glassmorphism UI** with spring-physics animations

---

## Architecture

```
app/
├── page.tsx                     # Title screen
├── create/                      # Character creation (3-step flow)
├── cockpit/                     # Ship HUD dashboard
├── starmap/                     # Canvas galaxy map
├── planets/[planetId]/          # Planet landing → mission flow
│   └── mission/[missionId]/     # Briefing → Learning → Challenge → Debrief
├── academy/                     # 10-section reference guide
├── inventory/                   # Collected tools/items
└── crew/                        # Recruited agent crew

components/
├── game/                        # StarMap, Cockpit, DialogueSystem, MissionBriefing, NavBar
├── games/                       # PromptDuel, Architect, Connect, Debug, Command
├── ui/                          # GlassPanel, Button, StatGauge, XPBar, TypewriterText, PageTransition
└── audio/                       # AudioProvider, AudioToggle

lib/
├── game-state.ts                # localStorage save/load + React context
├── types.ts                     # All TypeScript interfaces
├── constants.ts                 # Design tokens, ranks, config
└── data/                        # Planets, missions (8 files), crew, items, academy (10 sections)
```

| Dependency | Purpose |
|---|---|
| Next.js 15 | App Router, SSR/SSG |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling (`@theme` directive) |
| Motion | Animations (`motion/react`) |
| HTML5 Canvas | Star map rendering |
| Howler.js | Audio (ambient + SFX) |
| Vitest | Unit testing |

All game state lives in `localStorage` — no backend, no database, no auth.

---

## Development & Deployment

### Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm test       # run vitest
```

### Deployment

- **Hosting:** [Vercel](https://vercel.com) (free tier)
- **Domain:** [vibe.shehral.com](https://vibe.shehral.com)
- **CI/CD:** Auto-deploys from `main` via Vercel GitHub integration

### Content sources

Built on 57+ curated sources including Karpathy's vibe coding/agentic engineering posts, Anthropic MCP docs, Google A2A protocol, CodeRabbit 2026 AI code quality report, and Harvard AI employment study.

---

Built by [Ali Shehral](https://github.com/shehral) with [Claude Code](https://claude.ai/claude-code).
