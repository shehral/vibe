# Vibe Voyager

An interactive space exploration game that teaches vibe coding, agentic AI, and modern software engineering — from beginner to fleet commander.

**Live at [vibe.shehral.com](https://vibe.shehral.com)**

## What Is This?

Vibe Voyager is a browser-based game where you pilot a ship through an 8-planet galaxy, learning AI-assisted development along the way. The narrative mirrors the real-world arc from Karpathy's "vibe coding" (2025) to "agentic engineering" (2026) — you live that evolution as a player.

- **Act 1 — The Solo Pilot:** Learn vibe coding fundamentals, confront tech debt and quality risks (1.75x more bugs, 2.74x more XSS in AI code)
- **Act 2 — First Contact:** Discover MCP and A2A protocols, study agent architecture, compare frameworks (LangGraph, CrewAI, AutoGen) and official Agent SDKs
- **Act 3 — Fleet Commander:** Orchestrate multi-agent systems, handle security and legal concerns, deploy production-grade agentic systems
- **The Academy:** 10 real-world reference guides accessible without playing the game — AI IDEs, code review tools, Agent SDKs, MCP workshop, career paths, and more

## Game Features

- **8 planets, 34 missions** across 3 acts + epilogue
- **6 mini-game types:** Prompt Duel, Architect (drag-and-drop), Connect (SVG wiring), Debug (bug hunting), Command (agent assignment), Dialogue (branching quizzes)
- **5 recruitable crew members** mapping to the agent cognitive loop (Perceive, Plan, Act, Reflect)
- **4 player stats:** Vibe, Architecture, Protocol, Command
- **Full audio:** ambient space synth + 8 SFX types
- **Canvas star map** with parallax layers, orbital progress rings, and click navigation
- **Glassmorphism UI** with spring-physics animations throughout

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

All game state lives in `localStorage` — no backend, no database, no auth.

## Tech Stack

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

## Design System

- **Colors:** Void (#0a0f1a), Nebula Blue (#4a6fa5), Signal Green (#6b9e78), Core Terracotta (#c17147), Starlight (#e8e0d4)
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Visual style:** Clean minimalist sci-fi — glassmorphism panels, parallax starfields, SVG planets, spring-physics transitions

## How It Was Built

Vibe Voyager was built entirely with [Claude Code](https://claude.ai/claude-code) (Opus 4.6) using multi-agent parallel development in a single ~66-minute session. No templates, no boilerplate — 35+ AI agents writing production TypeScript from an implementation plan.

### The real-time timeline

The git history tells the story. First commit at 11:58 PM, game complete by 1:00 AM:

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
00:59  Phase 7: Academy content — 10 sections (5 parallel agents)       1 min*
11:42  Phase 8: Polish — transitions, audio, mobile, SVGs               next AM
```

\* Phases 6 and 7 ran concurrently — academy agents finished while planet agents were still writing.

**61% of wall time** was agent execution. **36% was orchestration overhead** (dispatching agents, reviewing output, committing). Only **3% was debugging** — one type error across the entire build (`Motion` variants needed `as const`).

### The process

1. **Research** — NotebookLM deep research produced 57+ curated sources (papers, docs, blog posts, reports) covering vibe coding through production agentic systems
2. **Brainstorming** — Structured design exploration via `superpowers:brainstorming` skill — 8 rounds of dialogue to lock in audience, narrative arc, game mechanics, visual style, and tech stack
3. **Planning** — 9-phase implementation plan with 39 tasks, each designed for parallel agent execution with zero file overlap (`superpowers:writing-plans`)
4. **Implementation** — Executed via `superpowers:subagent-driven-development`, launching waves of parallel agents. Each agent read `CLAUDE.md` (the single source of truth) and its assigned task from the plan, then wrote code to isolated file boundaries
5. **Deployment** — Vercel with custom domain via GitHub integration

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

### Why zero merge conflicts?

The implementation plan was designed for parallelism from the start. Each agent worked on isolated file boundaries — planet content agents each wrote to their own mission file, mini-game agents each created their own component, screen agents each owned their own route. The main thread committed and merged sequentially between waves. This was validated across 35+ parallel agent runs with zero conflicts.

### Bottleneck analysis

After the build, git timestamp analysis revealed optimization opportunities:
- ~25 min lost to 5-min gaps between phases (manual review + dispatch)
- Phase 6 took 26 min due to commit bottlenecking (8 agents waiting for sequential merge)
- Phases 4+5 and 6+7 could have been merged into single waves (no file overlap)

An optimized replay could hit **~35 minutes** from empty repo to production deploy.

### Tools and skills used

| Tool | Purpose |
|---|---|
| `superpowers:brainstorming` | Design exploration and decision-making |
| `superpowers:writing-plans` | 39-task implementation plan with parallelization strategy |
| `superpowers:subagent-driven-development` | Parallel agent orchestration across 8 phases |
| `context7` | Real-time API verification (Next.js 15, Motion, Tailwind v4, Howler.js) |
| `WebSearch` / `WebFetch` | Content research (AI tools landscape, A2A protocol, agent SDKs, code quality data) |
| NotebookLM | Deep research — 15-slide PDF, mind map, infographic, 57+ sources |

## Deployment

- **Hosting:** [Vercel](https://vercel.com) (free tier)
- **Domain:** [vibe.shehral.com](https://vibe.shehral.com)
- **DNS:** CNAME record pointing `vibe` to `cname.vercel-dns.com`
- **CI/CD:** Auto-deploys from `main` branch via Vercel GitHub integration

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm test       # run vitest
```

## Content Sources

Built on 57+ curated sources including Karpathy's vibe coding/agentic engineering posts, Anthropic MCP docs, Google A2A protocol, CodeRabbit 2026 AI code quality report, Harvard AI employment study, and more. Full source list in `docs/notebooklm-content/sources.md`.

## License

Private repository. All rights reserved.
