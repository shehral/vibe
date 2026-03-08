import type { MissionContent } from '@/lib/types'

export const agentAcademyContent: Record<string, MissionContent> = {
  // ---------------------------------------------------------------------------
  // Mission 1: The Cognitive Loop
  // Topic: 4-phase agent architecture — Perceive > Plan > Act > Reflect
  // Recruits Scout
  // ---------------------------------------------------------------------------
  'agent-academy-m1': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Welcome to Agent Academy, cadet. This is where you learn how AI agents actually think — from the inside out.',
      },
      {
        speaker: 'aria',
        text: 'Every autonomous agent, no matter how sophisticated, runs on the same fundamental loop: Perceive, Plan, Act, Reflect.',
      },
      {
        speaker: 'aria',
        text: 'Today you will map out this cognitive architecture yourself. Understanding this loop is the foundation for everything that follows.',
      },
      {
        speaker: 'aria',
        text: 'Complete this training simulation and you will recruit Scout, a perception specialist who will serve on your crew.',
        choices: [
          {
            text: 'I am ready to learn the loop.',
            correct: true,
            response: 'Excellent. Let us begin with how agents perceive their world.',
          },
          {
            text: 'How is this different from a chatbot?',
            response: 'Great question. A chatbot responds to messages. An agent observes, reasons, takes action, and learns from results. That is the difference between reacting and thinking. Let us explore how.',
          },
        ],
      },
    ],

    learning: [
      {
        type: 'stat',
        content: 'The Cognitive Loop has 4 phases: Perceive, Plan, Act, and Reflect. Every agent cycle follows this pattern.',
        highlight: true,
      },
      {
        type: 'text',
        content: 'Phase 1 — Perceive: The agent reads its context window and discovers available tools. It scans the environment: file systems, error messages, user instructions, and conversation history. Perception is about gathering raw information before any reasoning begins.',
      },
      {
        type: 'text',
        content: 'Phase 2 — Plan: The agent reasons about what it has perceived. It uses chain-of-thought to decompose complex tasks into smaller steps, decides which tools to use, and determines the order of operations. Planning is the bridge between seeing and doing.',
      },
      {
        type: 'text',
        content: 'Phase 3 — Act: The agent executes its plan by calling tools — reading files, running commands, editing code, searching the web. Each action produces new output that feeds back into the next perception phase.',
      },
      {
        type: 'text',
        content: 'Phase 4 — Reflect: After acting, the agent evaluates the results. Did the action succeed? Were there errors? Should it retry with a different approach? Reflection enables self-correction and is what separates agents from simple scripts.',
      },
    ],

    challenge: {
      type: 'architect',
      instructions: 'Place each component into its correct position in the cognitive loop. Arrange the four phases in order and match each supporting concept to the phase it belongs to.',
      data: {
        nodes: [
          { id: 'perceive', label: 'Perceive' },
          { id: 'plan', label: 'Plan' },
          { id: 'act', label: 'Act' },
          { id: 'reflect', label: 'Reflect' },
          { id: 'context-window', label: 'Context Window' },
          { id: 'tool-execution', label: 'Tool Execution' },
        ],
        slots: [
          { id: 'slot-phase-1', label: 'Phase 1: Observe the environment', correctNodeId: 'perceive' },
          { id: 'slot-phase-2', label: 'Phase 2: Reason and decompose', correctNodeId: 'plan' },
          { id: 'slot-phase-3', label: 'Phase 3: Execute actions', correctNodeId: 'act' },
          { id: 'slot-phase-4', label: 'Phase 4: Evaluate results', correctNodeId: 'reflect' },
          { id: 'slot-input', label: 'Input mechanism for perception', correctNodeId: 'context-window' },
          { id: 'slot-output', label: 'Output mechanism for action', correctNodeId: 'tool-execution' },
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Outstanding work, cadet. You have mapped the cognitive loop that drives every AI agent in existence.',
      },
      {
        speaker: 'aria',
        text: 'Perceive, Plan, Act, Reflect — this cycle repeats hundreds of times during a single task. Each iteration refines the agent\'s understanding.',
      },
      {
        speaker: 'aria',
        text: 'Your performance in this simulation has caught the attention of a specialist. Scout, our perception expert, is requesting to join your crew.',
      },
      {
        speaker: 'aria',
        text: 'Scout specializes in context windows and environment scanning — the "eyes" of any agent system. A valuable addition to your team.',
        choices: [
          {
            text: 'Welcome aboard, Scout.',
            correct: true,
            response: 'Scout has joined your crew. In the next mission, you will train together on the perception phase in depth.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 2: Perception Training
  // Topic: Context windows, tool discovery, environment sensing
  // ---------------------------------------------------------------------------
  'agent-academy-m2': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Now that you understand the cognitive loop, it is time to dive deep into Phase 1: Perception.',
      },
      {
        speaker: 'aria',
        text: 'An agent is only as effective as the information it can perceive. If it cannot see the problem, it cannot solve it.',
      },
      {
        speaker: 'aria',
        text: 'In this training simulation, you will assign specialized perception agents to the right scanning tasks. Every agent has a specialty — matching the right agent to the right task is the key to effective perception.',
        choices: [
          {
            text: 'How do agents perceive their environment?',
            response: 'Agents read from a context window — a fixed-size buffer of text that contains everything they know at any given moment. They also discover available tools, scan file systems, and parse error output. Each of these is a form of perception.',
          },
          {
            text: 'Let us start the training.',
            correct: true,
            response: 'Launching perception training simulation now.',
          },
        ],
      },
    ],

    learning: [
      {
        type: 'stat',
        content: 'An agent\'s context window is its entire world. Everything the agent knows must fit within this fixed-size buffer of tokens.',
        highlight: true,
      },
      {
        type: 'text',
        content: 'Context windows have hard limits — typically 100K to 200K tokens for modern models. When the window fills up, older information gets pushed out. Agents must strategically decide what to keep in context and what to let go. This is why summarization and memory systems are critical for long tasks.',
      },
      {
        type: 'text',
        content: 'Tool discovery is how agents learn what actions are available. When an agent starts up, it receives a manifest of tools with names, descriptions, and parameter schemas. The agent reads these descriptions to decide which tool fits each situation — like a mechanic surveying a toolbox before starting repairs.',
      },
      {
        type: 'text',
        content: 'File system reading is one of the most fundamental perception skills. Agents use tools like Glob (find files by pattern), Grep (search file contents), and Read (view file contents) to build a mental model of a codebase. Good agents search broadly first, then narrow down.',
      },
      {
        type: 'text',
        content: 'Code structure analysis goes beyond reading individual files. Agents trace imports, follow function calls, identify patterns, and map dependencies. This structural understanding lets them make changes that work with the existing architecture rather than against it.',
      },
    ],

    challenge: {
      type: 'command',
      instructions: 'Assign each perception task to the specialist agent best equipped to handle it. Match tasks on the left to agents on the right based on their specialty.',
      data: {
        tasks: [
          {
            id: 'task-1',
            label: 'Read project structure',
            description: 'Map the directory tree, identify key files, and understand the project layout before making changes.',
          },
          {
            id: 'task-2',
            label: 'Parse error messages',
            description: 'Read compiler errors, stack traces, and runtime exceptions to identify what went wrong and where.',
          },
          {
            id: 'task-3',
            label: 'Discover available tools',
            description: 'Read the tool manifest to understand what actions the agent can perform and what parameters each tool requires.',
          },
          {
            id: 'task-4',
            label: 'Analyze code dependencies',
            description: 'Trace import chains, identify shared modules, and map how components depend on each other.',
          },
        ],
        agents: [
          {
            id: 'agent-1',
            label: 'File Scanner',
            specialty: 'Directory traversal and file pattern matching using glob patterns and listing commands.',
          },
          {
            id: 'agent-2',
            label: 'Error Parser',
            specialty: 'Reading and interpreting error output, stack traces, and diagnostic messages from tools and compilers.',
          },
          {
            id: 'agent-3',
            label: 'Tool Discovery Agent',
            specialty: 'Reading tool schemas, understanding parameter types, and matching tool capabilities to task requirements.',
          },
          {
            id: 'agent-4',
            label: 'Dependency Analyzer',
            specialty: 'Tracing import graphs, resolving module paths, and mapping relationships between code components.',
          },
        ],
        correctAssignments: {
          'task-1': 'agent-1',
          'task-2': 'agent-2',
          'task-3': 'agent-3',
          'task-4': 'agent-4',
        } as Record<string, string>,
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Well done, cadet. You matched each perception task to the right specialist — exactly how a well-designed agent system delegates its perception phase.',
      },
      {
        speaker: 'aria',
        text: 'In practice, a single agent often handles all these perception tasks itself. But understanding the distinct skills involved helps you design better prompts and tool configurations.',
      },
      {
        speaker: 'aria',
        text: 'Remember: an agent that perceives poorly will plan poorly, act poorly, and have nothing useful to reflect on. Perception is the foundation of the entire cognitive loop.',
        choices: [
          {
            text: 'Perception first, everything else follows.',
            correct: true,
            response: 'Exactly. Next, we will move to Phase 2 of the loop — how agents plan and reason about what they have perceived.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 3: Planning & Reasoning
  // Topic: Chain-of-thought, task decomposition, planning strategies
  // Recruits Archie
  // ---------------------------------------------------------------------------
  'agent-academy-m3': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Cadet, you have mastered perception. Now comes Phase 2 of the cognitive loop: Planning and Reasoning.',
      },
      {
        speaker: 'aria',
        text: 'Perceiving information is useless without the ability to reason about it. Planning is what separates an intelligent agent from a random tool caller.',
      },
      {
        speaker: 'aria',
        text: 'In this simulation, you will construct a task decomposition tree — the core planning structure that agents use to break complex requests into manageable steps.',
        choices: [
          {
            text: 'What is chain-of-thought reasoning?',
            response: 'Chain-of-thought is when an agent reasons step by step, making its logic visible. Instead of jumping to an answer, it shows its work — "First I need to understand the problem, then identify the relevant files, then plan my changes." This explicit reasoning dramatically improves accuracy.',
          },
          {
            text: 'Ready to build the planning tree.',
            correct: true,
            response: 'Good. Let us study how agents decompose problems before you build one yourself.',
          },
        ],
      },
    ],

    learning: [
      {
        type: 'stat',
        content: 'Chain-of-thought reasoning improves agent accuracy by 30-50% on complex tasks compared to direct answering.',
        highlight: true,
      },
      {
        type: 'text',
        content: 'Chain-of-thought (CoT) prompting encourages the model to reason explicitly. Instead of producing an answer directly, the agent generates intermediate reasoning steps. This is not just about showing work — the reasoning process itself helps the model arrive at better conclusions by activating relevant knowledge sequentially.',
      },
      {
        type: 'text',
        content: 'Task decomposition is the art of breaking a large request into smaller, independent subtasks. A request like "refactor this module" becomes: 1) Read and understand current code, 2) Identify what needs to change, 3) Plan the new structure, 4) Make changes file by file, 5) Verify nothing broke. Each subtask is small enough to execute reliably.',
      },
      {
        type: 'text',
        content: 'Knowing when to plan versus when to act is a critical skill. Simple tasks (rename a variable, fix a typo) do not need elaborate plans — just do them. Complex tasks (redesign an API, debug a race condition) benefit enormously from upfront planning. Over-planning simple tasks wastes context window space.',
      },
      {
        type: 'text',
        content: 'Reasoning traces are the visible record of an agent\'s planning process. When agents write out their reasoning, it serves three purposes: it improves accuracy, it makes the agent\'s decisions auditable by humans, and it provides context for future reflection phases if something goes wrong.',
      },
    ],

    challenge: {
      type: 'architect',
      instructions: 'Build a task decomposition tree by placing each planning node in the correct position. Arrange the steps in the order an agent would follow when processing a complex user request.',
      data: {
        nodes: [
          { id: 'user-request', label: 'User Request' },
          { id: 'analyze', label: 'Analyze Requirements' },
          { id: 'decompose', label: 'Break Into Subtasks' },
          { id: 'prioritize', label: 'Prioritize' },
          { id: 'execute-plan', label: 'Execute Plan' },
          { id: 'verify', label: 'Verify Results' },
        ],
        slots: [
          { id: 'slot-root', label: 'Step 1: Receive input', correctNodeId: 'user-request' },
          { id: 'slot-understand', label: 'Step 2: Understand what is needed', correctNodeId: 'analyze' },
          { id: 'slot-split', label: 'Step 3: Divide into manageable pieces', correctNodeId: 'decompose' },
          { id: 'slot-order', label: 'Step 4: Determine execution order', correctNodeId: 'prioritize' },
          { id: 'slot-run', label: 'Step 5: Carry out the plan', correctNodeId: 'execute-plan' },
          { id: 'slot-check', label: 'Step 6: Confirm success', correctNodeId: 'verify' },
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Impressive, cadet. You have constructed a proper task decomposition tree — the same structure that powers every effective AI agent.',
      },
      {
        speaker: 'aria',
        text: 'Notice the flow: understand first, decompose second, prioritize third, then execute and verify. Agents that skip the understanding phase make costly mistakes.',
      },
      {
        speaker: 'aria',
        text: 'Your planning skills have attracted the attention of Archie, our architecture and reasoning specialist. Archie is requesting to join your crew.',
      },
      {
        speaker: 'aria',
        text: 'Archie excels at task decomposition and system design — the "brain" behind any agent\'s planning phase.',
        choices: [
          {
            text: 'Archie, welcome to the team.',
            correct: true,
            response: 'Archie has joined your crew. With Scout handling perception and Archie handling planning, your agent team is taking shape. Next: how agents turn plans into action.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 4: Tool Calling
  // Topic: How agents use tools — function calling, the bridge between
  //        thinking and doing
  // ---------------------------------------------------------------------------
  'agent-academy-m4': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Phase 3 of the cognitive loop: Action. This is where agents stop thinking and start doing.',
      },
      {
        speaker: 'aria',
        text: 'Tool calling is the mechanism that turns an agent\'s plan into real-world effects. Without tools, an agent is just a text generator. With tools, it can read files, run code, search the web, and modify systems.',
      },
      {
        speaker: 'aria',
        text: 'In this training exercise, you will connect actions to the correct tools. Every agent action maps to a specific tool — knowing which tool does what is essential.',
        choices: [
          {
            text: 'How does tool calling actually work?',
            response: 'The agent outputs a structured JSON object specifying which tool to call and what parameters to pass. The runtime executes the tool and returns the result as text. The agent reads the result and decides what to do next. It is a structured conversation between the agent and its environment.',
          },
          {
            text: 'Let us connect actions to tools.',
            correct: true,
            response: 'First, let us study the mechanics of tool calling.',
          },
        ],
      },
    ],

    learning: [
      {
        type: 'stat',
        content: 'Tool calling is how agents bridge the gap between reasoning and action. An agent without tools can only generate text — an agent with tools can change the world.',
        highlight: true,
      },
      {
        type: 'text',
        content: 'Tool calling works through structured output. When an agent decides to use a tool, it generates a JSON object with the tool name and parameters. For example: { "tool": "read_file", "params": { "path": "/src/app.ts" } }. The runtime intercepts this, executes the tool, and returns the output back to the agent as new context.',
      },
      {
        type: 'code',
        content: '// Tool definition (JSON Schema)\n{\n  "name": "edit_file",\n  "description": "Replace text in a file",\n  "parameters": {\n    "file_path": { "type": "string" },\n    "old_string": { "type": "string" },\n    "new_string": { "type": "string" }\n  }\n}',
      },
      {
        type: 'text',
        content: 'Agents choose tools by matching the task description against tool descriptions. If an agent needs to find files matching a pattern, it looks for tools described with words like "search", "find", or "glob". Well-written tool descriptions are critical — a poorly described tool will be chosen at the wrong time or not at all.',
      },
      {
        type: 'text',
        content: 'Error recovery during tool calling is essential. Tools can fail — files not found, permissions denied, invalid parameters. Good agents detect these failures, adjust their parameters or switch to an alternative tool, and retry. This error-recovery loop is what makes agents robust in real-world environments.',
      },
    ],

    challenge: {
      type: 'connect',
      instructions: 'Connect each action on the left to the correct tool on the right. Every developer action maps to a specific agent tool.',
      data: {
        sources: [
          'Read file contents',
          'Search codebase',
          'Execute command',
          'Edit file',
          'Create new file',
        ],
        targets: [
          'Read tool',
          'Grep tool',
          'Bash tool',
          'Edit tool',
          'Write tool',
        ],
        correctPairs: [
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Perfect connections, cadet. You have mapped the fundamental tool-calling vocabulary that every coding agent relies on.',
      },
      {
        speaker: 'aria',
        text: 'Read, Grep, Bash, Edit, Write — these five tools cover the vast majority of what a coding agent needs to do. More specialized tools exist, but these are the core.',
      },
      {
        speaker: 'aria',
        text: 'Notice how each tool has a single, clear responsibility. An agent that tries to use Bash for everything will be slower and more error-prone than one that reaches for the right specialized tool.',
        choices: [
          {
            text: 'Right tool for the right job.',
            correct: true,
            response: 'Exactly. One more phase remains in the cognitive loop: Reflect. In the final mission, you will learn how agents recover from failures.',
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 5: Self-Healing
  // Topic: Error recovery, retries, self-correction, fallback strategies
  // Recruits Exec
  // ---------------------------------------------------------------------------
  'agent-academy-m5': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Final mission at Agent Academy, cadet. Phase 4 of the cognitive loop: Reflect.',
      },
      {
        speaker: 'aria',
        text: 'Agents fail. Tools return errors. Plans turn out to be wrong. Code does not compile. The difference between a fragile agent and a robust one is not whether it fails — it is how it recovers.',
      },
      {
        speaker: 'aria',
        text: 'Self-healing is the art of detecting failures, choosing the right recovery strategy, and trying again. In this simulation, you will debug an agent\'s error-handling code to find critical flaws.',
        choices: [
          {
            text: 'What makes an agent self-healing?',
            response: 'A self-healing agent does three things: it detects when something has gone wrong (error detection), it decides how to respond (retry, fallback, or escalate), and it adjusts its approach based on what it learned from the failure. This reflect-and-adapt cycle is what makes agents resilient.',
          },
          {
            text: 'Time to find the bugs.',
            correct: true,
            response: 'Let us study error recovery patterns first, then you will put your skills to the test.',
          },
        ],
      },
    ],

    learning: [
      {
        type: 'stat',
        content: 'Robust agents recover from 80-90% of errors autonomously through retry logic, fallback strategies, and self-correction.',
        highlight: true,
      },
      {
        type: 'text',
        content: 'Error detection is the first step in self-healing. Agents must check the output of every tool call for signs of failure: non-zero exit codes, error messages, empty results when data was expected, or results that do not match the expected format. Silent failures — where the tool appears to succeed but produces wrong output — are the hardest to detect.',
      },
      {
        type: 'text',
        content: 'Retry strategies must be intelligent. Retrying the exact same action that just failed is usually pointless. Good agents use exponential backoff (wait longer between retries), modify their parameters (try a different file path or search query), or gather more context before retrying. The key rule: never retry without changing something.',
      },
      {
        type: 'text',
        content: 'Fallback approaches activate when retries are exhausted. If editing a file keeps failing, try writing it from scratch. If a search returns nothing, try a broader pattern. If a tool is unavailable, find an alternative tool that achieves the same goal. Always have a Plan B.',
      },
      {
        type: 'text',
        content: 'Learning from failures completes the reflection phase. Each error teaches the agent something: this file path does not exist, this API requires authentication, this function was renamed. Good agents carry these lessons forward in their context, avoiding the same mistake twice in a single session.',
      },
    ],

    challenge: {
      type: 'debug',
      instructions: 'This agent error-handling code has 4 bugs that would cause problems in production. Find and identify the buggy lines. Look for patterns that would cause infinite loops, lost information, wasted retries, or unhandled failure modes.',
      data: {
        code: [
          'async function executeWithRecovery(task, tools) {',
          '  const MAX_RETRIES = 5;',
          '  let attempts = 0;',
          '',
          '  while (attempts < MAX_RETRIES) {',
          '    try {',
          '      const result = await tools.execute(task);',
          '      return result;',
          '    } catch (error) {',
          '      attempts++;',
          '      // Bug 1: No backoff — retries instantly hammer the service',
          '      await retry(task, tools);',
          '',
          '      if (error.type === "RATE_LIMIT") {',
          '        // Bug 2: Swallows error details — no logging',
          '        continue;',
          '      }',
          '',
          '      if (error.type === "INVALID_PARAMS") {',
          '        // Bug 3: Retries a non-retryable error — params will not fix themselves',
          '        continue;',
          '      }',
          '    }',
          '  }',
          '',
          '  // Bug 4: No fallback handler — silently returns undefined',
          '  return undefined;',
          '}',
        ].join('\n'),
        bugLines: [11, 15, 19, 24],
        explanations: {
          '11': 'No exponential backoff between retries. The agent immediately retries without any delay, which can overwhelm the service and waste all retry attempts in milliseconds.',
          '15': 'Rate limit error is caught but not logged. Swallowing errors without logging makes debugging impossible. Always log errors with context before deciding how to handle them.',
          '19': 'INVALID_PARAMS is a non-retryable error — the parameters are wrong and will be wrong on every retry. The agent should fix the parameters or try an alternative approach instead of wasting retry attempts.',
          '24': 'After exhausting all retries, the function silently returns undefined with no fallback strategy and no error thrown. The caller has no idea the operation failed. Always either throw, return an error object, or attempt a fallback.',
        } as Record<string, string>,
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Excellent diagnostic work, cadet. You identified the critical flaws that would make this agent fragile in production.',
      },
      {
        speaker: 'aria',
        text: 'Backoff between retries, logging every error, knowing when not to retry, and always having a fallback — these are the four pillars of self-healing agents.',
      },
      {
        speaker: 'aria',
        text: 'You have now completed all four phases of the cognitive loop: Perceive, Plan, Act, Reflect. You understand how agents think at a fundamental level.',
      },
      {
        speaker: 'aria',
        text: 'One final crew recruitment. Exec, our action and execution specialist, has been monitoring your progress. Exec is requesting to join your crew.',
      },
      {
        speaker: 'aria',
        text: 'With Scout (perception), Archie (planning), and Exec (execution), your crew now covers three of the four cognitive phases. You, cadet, provide the fourth: reflection and command.',
        choices: [
          {
            text: 'Exec, join up. The crew is complete.',
            correct: true,
            response: 'Exec has joined your crew. Your Agent Academy training is complete. You now carry the knowledge of how AI agents perceive, plan, act, and recover. Carry it well, Commander.',
          },
        ],
      },
    ],
  },
}
