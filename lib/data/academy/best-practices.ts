import type { AcademyContentBlock } from './types'

export const bestPracticesContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'Agentic Development Best Practices',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'AI agents can write code faster than any human. That speed is a double-edged sword. Without discipline, you ship bugs faster too. Best practices matter more with agents, not less — because the cost of a mistake is multiplied by the volume of code being produced. This section covers the workflows and guardrails that separate productive agentic development from expensive chaos.',
  },

  // --- Subagent-Driven Development ---
  {
    type: 'heading',
    content: 'Subagent-Driven Development',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The core pattern of agentic development is decomposition: break work into tasks, assign each task to a fresh agent, and merge the results. A fresh agent per task avoids context pollution — the accumulated confusion that happens when one agent tries to hold too many concerns in memory at once.',
  },
  {
    type: 'code',
    content: `# Subagent-Driven Development Pattern

# Step 1: Understand — Read the spec, explore the codebase
claude "Read docs/feature-spec.md and identify all tasks"

# Step 2: Decompose — Break into independent tasks
# Key: tasks should touch DIFFERENT files to avoid conflicts

# Step 3: Execute in waves — Launch independent tasks in parallel
claude --background "Build the SearchBar component in components/ui/SearchBar.tsx"
claude --background "Add the /api/search endpoint in app/api/search/route.ts"
claude --background "Write tests for search in __tests__/search.test.ts"

# Step 4: Review — Check results when agents finish
claude "Review recent changes for integration issues and type errors"

# Step 5: Commit — After each logical unit, not batched at the end
claude /commit`,
    language: 'bash',
  },
  {
    type: 'paragraph',
    content:
      'The critical rule is file-level isolation. Two agents editing the same file will produce merge conflicts. Decompose by file boundary: one agent per component, one per API route, one per test file. If two tasks must touch the same file, serialize them.',
  },

  // --- Parallelization ---
  {
    type: 'heading',
    content: 'Parallelization — When and How',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Not everything should run in parallel. The decision tree is simple: if two tasks are independent and touch different files, parallelize them. If they share files or one depends on the other\'s output, serialize them. Over-parallelization causes more merge conflicts than it saves in time.',
  },
  {
    type: 'table',
    headers: ['Practice', 'When', 'Why'],
    rows: [
      [
        'Parallelize',
        'Independent tasks touching different files',
        'Maximizes throughput without conflicts',
      ],
      [
        'Serialize',
        'Tasks that share files or have dependencies',
        'Prevents merge conflicts and race conditions',
      ],
      [
        'Batch review',
        'After a wave of parallel tasks completes',
        'Catches integration issues between parallel changes',
      ],
      [
        'Single agent',
        'Small changes (under 50 lines)',
        'Overhead of decomposition exceeds the work itself',
      ],
      [
        'Fresh context',
        'Each new task or subtask',
        'Avoids context pollution from prior tasks',
      ],
      [
        'Commit per unit',
        'After each logical piece of work',
        'Makes rollbacks granular and review easier',
      ],
    ],
  },

  // --- AI Code Review ---
  {
    type: 'heading',
    content: 'AI Code Review',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'AI-generated code needs AI-powered review. Use specialized review agents that focus on different concerns: correctness, security, performance, and architecture. The compound-engineering plugin provides purpose-built reviewers for each of these.',
  },
  {
    type: 'code',
    content: `# Use specialized review agents for different concerns

# General code review — catches bugs, style issues, missing edge cases
claude "Review the changes in the last 3 commits as a code-reviewer"

# Security review — finds injection risks, auth gaps, data exposure
claude "Review app/api/ as a security-sentinel. Check for:
- Input validation on all endpoints
- Authentication and authorization checks
- SQL injection or XSS vectors
- Sensitive data in responses"

# Performance review — spots N+1 queries, unnecessary rerenders, memory leaks
claude "Review components/ as a performance-oracle. Check for:
- Unnecessary re-renders (missing memo, unstable references)
- Large bundle imports that could be lazy-loaded
- Missing loading and error states"`,
    language: 'bash',
  },
  {
    type: 'paragraph',
    content:
      'Match review depth to risk level. A UI copy change needs a quick glance. A new API endpoint handling user data needs a security-sentinel review. An architectural change needs an architecture-strategist review. Do not waste tokens reviewing every line with every agent.',
  },

  // --- TDD with Agents ---
  {
    type: 'heading',
    content: 'Test-Driven Development with Agents',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'TDD is even more powerful with agents. Write a failing test that describes the behavior you want, then tell the agent to make it pass. The test acts as both a specification and a verification gate. The agent cannot "hallucinate" its way past a failing test.',
  },
  {
    type: 'code',
    content: `# TDD with Claude Code

# Step 1: You write the failing test (the specification)
# __tests__/calculateScore.test.ts
import { calculateScore } from '../lib/scoring'

describe('calculateScore', () => {
  it('returns 0 for empty answers', () => {
    expect(calculateScore([])).toBe(0)
  })

  it('awards 10 points per correct answer', () => {
    expect(calculateScore([
      { correct: true },
      { correct: true },
      { correct: false },
    ])).toBe(20)
  })

  it('applies 1.5x multiplier for streak of 3+', () => {
    const answers = Array(4).fill({ correct: true })
    expect(calculateScore(answers)).toBe(60) // 40 * 1.5
  })
})

# Step 2: Tell Claude to make it pass
claude "Make all tests in __tests__/calculateScore.test.ts pass.
Create lib/scoring.ts with the implementation."

# Step 3: Iterate — add more tests, tell Claude to make them pass`,
    language: 'typescript',
  },
  {
    type: 'callout',
    content:
      'TDD flips the agent relationship: instead of reviewing AI output for correctness, you define correctness upfront and let the AI figure out the implementation. The test is your contract. The agent is the contractor.',
    variant: 'info',
  },

  // --- Memory Management ---
  {
    type: 'heading',
    content: 'Memory Management',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Agents do not remember between sessions. Every conversation starts from scratch — unless you give them memory. CLAUDE.md is the primary memory mechanism, but it needs active maintenance. The best developers update CLAUDE.md as a reflex, not an afterthought.',
  },
  {
    type: 'code',
    content: `# Memory management patterns

# After fixing a non-trivial bug:
# Add the root cause and fix to CLAUDE.md or a debugging.md
# so future agents do not repeat the investigation

# After an architectural decision:
# Document the decision and reasoning in CLAUDE.md
# "We use localStorage instead of a database because..."

# After discovering a gotcha:
# Add it to the Rules section of CLAUDE.md
# "Motion v12 requires import from 'motion/react', NOT 'framer-motion'"

# What NOT to save:
# - Temporary task state (what you are currently working on)
# - Speculative conclusions (unverified assumptions)
# - Information already in CLAUDE.md (avoid duplication)`,
    language: 'text',
  },
  {
    type: 'paragraph',
    content:
      'Think of CLAUDE.md as institutional knowledge for your AI team. Every bug fix, every workaround, every "we tried X and it did not work" — these are valuable lessons that save future sessions hours of repeated investigation.',
  },

  // --- Security & HITL ---
  {
    type: 'heading',
    content: 'Security and Human-in-the-Loop',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'AI agents should never have unchecked authority over destructive operations. The human-in-the-loop (HITL) principle means that certain actions always require human approval: deployments, database mutations, force pushes, and anything touching credentials.',
  },
  {
    type: 'code',
    content: `# Security rules to encode in CLAUDE.md

## Safety Rules
- NEVER edit .env, credentials, or secret files
- NEVER run destructive commands (--force, --hard, rm -rf)
- NEVER commit sensitive files — warn if user requests it
- NEVER skip pre-commit hooks (--no-verify)
- NEVER auto-deploy without explicit human approval
- Docker ports: bind to 127.0.0.1 only (no 0.0.0.0)

## Permission Gates
# Claude Code has built-in permission prompts for:
# - Running shell commands (Bash tool)
# - Writing or editing files
# - Making network requests
# Review these prompts carefully — they are your last line of defense`,
    language: 'markdown',
  },
  {
    type: 'callout',
    content:
      'Never add --no-verify, --force, or similar flags to bypass safety checks. If a pre-commit hook fails, the correct response is to fix the issue — not to skip the hook. Agents that bypass safety checks will eventually cause a production incident.',
    variant: 'warning',
  },

  // --- Prompt Engineering for Agents ---
  {
    type: 'heading',
    content: 'Prompt Engineering for Agents',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Prompting an agent is different from prompting a chatbot. Agents need specificity, context, and constraints. A vague prompt like "fix the bug" produces vague results. A precise prompt like "fix the TypeError in lib/scoring.ts line 42 where calculateScore receives undefined instead of an array" produces precise results.',
  },
  {
    type: 'code',
    content: `# Bad: Vague, no context, no constraints
claude "make the app better"

# Good: Specific task, clear context, explicit constraints
claude "Add error boundaries to all page-level components in app/.
Each error boundary should:
- Catch render errors and display a GlassPanel with the error message
- Include a 'Try Again' button that calls reset()
- Log errors to console in development only
- Follow the existing component patterns in components/ui/
Reference: components/ui/GlassPanel.tsx for the panel style"

# Good: Reference existing files as examples
claude "Create a new mini-game component for the quiz challenge.
Follow the same pattern as components/games/PromptDuel.tsx:
- Accept onComplete(score: 0-100) prop
- Use GlassPanel for the container
- Include a timer display
- Use Motion for enter/exit animations"`,
    language: 'bash',
  },
  {
    type: 'paragraph',
    content:
      'Three rules for effective agent prompts: (1) reference specific files so the agent reads them first, (2) state the acceptance criteria explicitly, and (3) name the patterns to follow. Agents are excellent pattern-followers — give them a pattern and they will replicate it consistently.',
  },

  // --- Managing Tech Debt ---
  {
    type: 'heading',
    content: 'Managing Agent-Generated Tech Debt',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Agent-generated code tends toward certain patterns: over-abstraction, inconsistent naming between sessions, duplicated utility functions, and verbose implementations. This is not a flaw — it is a natural consequence of each agent session starting fresh without full codebase context.',
  },
  {
    type: 'code',
    content: `# Regular cleanup tasks for agent-generated codebases

# 1. Consolidate duplicates — agents often recreate utilities
claude "Find any duplicated utility functions across lib/ and components/.
Consolidate them into the appropriate lib/ module."

# 2. Normalize naming — different sessions may use different conventions
claude "Audit all component prop interfaces for naming consistency.
Standardize: onX for callbacks, isX for booleans, xCount for numbers."

# 3. Remove dead code — agents sometimes leave unused imports or functions
claude "Find and remove all unused exports and imports across the codebase.
Run the TypeScript compiler after to verify nothing breaks."

# 4. Simplify over-abstraction — agents tend to over-engineer
claude "Review lib/utils.ts for over-abstracted functions.
If a function is only used once, consider inlining it."`,
    language: 'bash',
  },
  {
    type: 'callout',
    content:
      'The 80/20 rule of agent work: agents handle 80% of implementation quickly and correctly. The remaining 20% — integration, edge cases, consistency — requires human judgment. Plan for that 20%. Budget time for review and cleanup after every agent-heavy session.',
    variant: 'tip',
  },

  // --- Anti-Patterns ---
  {
    type: 'heading',
    content: 'Common Anti-Patterns',
    level: 3,
  },
  {
    type: 'callout',
    content:
      'Avoid these common mistakes: (1) Over-parallelizing — launching 10 agents that edit the same files causes conflicts. (2) Skipping review — trusting agent output without reading it leads to subtle bugs. (3) Vague prompts — "make it work" produces unpredictable results. (4) No CLAUDE.md — without project context, every session starts from zero. (5) Using agents for simple changes — a 5-line fix does not need a subagent workflow. (6) Batching commits — committing everything at the end makes rollbacks impossible.',
    variant: 'warning',
  },

  // --- Putting It All Together ---
  {
    type: 'heading',
    content: 'Putting It All Together',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The best agentic workflows combine all of these practices into a coherent cycle. Start with a well-maintained CLAUDE.md. Decompose work into independent tasks. Launch subagents in parallel for independent work. Use TDD to define correctness upfront. Review with specialized agents. Commit after each logical unit. And feed every lesson back into CLAUDE.md for the next session.',
  },
  {
    type: 'code',
    content: `# A complete agentic development cycle

# 1. Start with context
# - Read CLAUDE.md, review the plan, understand the codebase

# 2. Decompose the feature
# - Break into 3-5 independent tasks
# - Identify file boundaries (no overlap between tasks)

# 3. Write tests first (TDD)
# - Define acceptance criteria as failing tests
# - Each test file maps to one subagent task

# 4. Execute in parallel
# - Launch one agent per task
# - Main thread handles the critical path

# 5. Review the results
# - Low risk: quick scan
# - Medium risk: code-reviewer agent
# - High risk: security-sentinel + architecture-strategist

# 6. Commit and update memory
# - One commit per logical unit
# - Update CLAUDE.md with any new patterns or gotchas

# 7. Repeat for the next feature`,
    language: 'text',
  },
  {
    type: 'paragraph',
    content:
      'Agentic development is not about replacing human judgment — it is about amplifying it. You provide the direction, the standards, and the review. The agents provide the speed, the consistency, and the tireless execution. Together, you build software faster than either could alone.',
  },

  // --- Further Reading ---
  {
    type: 'heading',
    content: 'Further Reading',
    level: 3,
  },
  {
    type: 'link-card',
    title: 'Claude Code Best Practices',
    url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
    description:
      'Anthropic engineering team\'s guide to productive agentic workflows with Claude Code.',
    source: 'Anthropic Engineering',
  },
  {
    type: 'link-card',
    title: 'Compound AI Agent Design Patterns',
    url: 'https://www.anthropic.com/research/building-effective-agents',
    description:
      'Research on how to build reliable agent systems with decomposition, review, and feedback loops.',
    source: 'Anthropic Research',
  },
]
