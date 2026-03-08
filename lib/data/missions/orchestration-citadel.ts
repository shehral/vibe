import type { MissionContent } from '@/lib/types'

export const orchestrationCitadelContent: Record<string, MissionContent> = {
  // ---------------------------------------------------------------------------
  // Mission 1: Society of Agents — Multi-agent pipeline design
  // ---------------------------------------------------------------------------
  'orchestration-citadel-m1': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Welcome to the Orchestration Citadel, Commander. This is where individual agents become something far greater — a coordinated fleet.',
      },
      {
        speaker: 'aria',
        text: 'A single agent can reason, plan, and act. But a society of agents can tackle problems no single mind could handle alone.',
      },
      {
        speaker: 'aria',
        text: 'Today you will learn the four core formation patterns that govern how agents work together. Think of them as strategic blueprints for your fleet.',
        choices: [
          {
            text: 'What makes multi-agent systems better than a single powerful agent?',
            correct: true,
            response:
              'Specialization. A single agent trying to do everything hits context limits and makes mistakes. Specialized agents, each focused on one task, produce dramatically better results when coordinated properly.',
          },
          {
            text: 'Can we just use one really large model instead?',
            response:
              'Larger models help, but they still have context windows and attention limits. A team of focused agents consistently outperforms a single generalist — just like a specialized engineering team outperforms one overworked developer.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Your mission: design a multi-agent pipeline. Arrange the right agents in the right formation to process a complex task from input to output.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Pipeline Pattern: Agents are arranged in a sequential chain, each processing the output of the previous one. Like an assembly line, each agent adds its expertise. Input flows through a Researcher, then an Analyst, then a Writer, and finally a Reviewer. Each agent is a specialist that transforms the work before passing it forward.',
      },
      {
        type: 'text',
        content:
          'Fan-Out / Fan-In Pattern: A coordinator agent distributes subtasks to multiple worker agents in parallel, then collects and merges their results. This is ideal when a problem can be decomposed into independent parts — like searching multiple databases simultaneously or analyzing different aspects of a document at the same time.',
      },
      {
        type: 'text',
        content:
          'Hierarchical Pattern: A top-level orchestrator delegates to mid-level managers, who in turn command specialized workers. This mirrors how large organizations operate. The orchestrator never touches raw data — it only coordinates. Managers handle domain-specific logic, and workers execute atomic tasks.',
      },
      {
        type: 'text',
        content:
          'Event-Driven Pattern: Agents react to events rather than being called directly. When one agent completes a task, it publishes an event. Other agents that are subscribed to that event type activate automatically. This creates loosely coupled systems where agents can be added or removed without rewriting the pipeline.',
      },
    ],

    challenge: {
      type: 'architect',
      instructions:
        'Design a sequential multi-agent pipeline. Drag each agent node into the correct slot to build a formation that processes a research report from raw input to polished output.',
      data: {
        nodes: [
          { id: 'node-input', label: 'Input Handler' },
          { id: 'node-researcher', label: 'Researcher Agent' },
          { id: 'node-analyst', label: 'Analyst Agent' },
          { id: 'node-writer', label: 'Writer Agent' },
          { id: 'node-reviewer', label: 'Reviewer Agent' },
          { id: 'node-output', label: 'Output Formatter' },
        ],
        slots: [
          {
            id: 'slot-1',
            label: 'Stage 1: Receive and parse the raw request',
            correctNodeId: 'node-input',
          },
          {
            id: 'slot-2',
            label: 'Stage 2: Gather relevant data and sources',
            correctNodeId: 'node-researcher',
          },
          {
            id: 'slot-3',
            label: 'Stage 3: Extract insights and identify patterns',
            correctNodeId: 'node-analyst',
          },
          {
            id: 'slot-4',
            label: 'Stage 4: Draft the written report',
            correctNodeId: 'node-writer',
          },
          {
            id: 'slot-5',
            label: 'Stage 5: Check quality and accuracy',
            correctNodeId: 'node-reviewer',
          },
          {
            id: 'slot-6',
            label: 'Stage 6: Format and deliver the final output',
            correctNodeId: 'node-output',
          },
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Excellent formation, Commander. You have assembled a proper agent pipeline — each specialist in position, each handoff clean and deliberate.',
      },
      {
        speaker: 'aria',
        text: 'The pipeline pattern is the foundation of multi-agent orchestration. Master this, and the more advanced formations — fan-out, hierarchical, event-driven — will follow naturally.',
      },
      {
        speaker: 'aria',
        text: 'Remember: the strength of a fleet is not in the number of ships, but in the precision of their coordination. Onward to the A2A Network.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 2: The A2A Network — Agent-to-Agent protocol
  // ---------------------------------------------------------------------------
  'orchestration-citadel-m2': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Commander, your fleet is assembled. But how do agents actually find and talk to each other? That is the domain of the A2A protocol.',
      },
      {
        speaker: 'aria',
        text: 'Agent-to-Agent (A2A) is an open protocol that lets agents discover each other, advertise their capabilities, and delegate tasks — all without hardcoded integrations.',
      },
      {
        speaker: 'aria',
        text: 'Think of it as a strategic command network. Each agent broadcasts what it can do, and any other agent can request its services through a standard interface.',
        choices: [
          {
            text: 'How does A2A differ from MCP?',
            correct: true,
            response:
              'MCP connects agents to tools and data sources. A2A connects agents to other agents. MCP is your ship talking to its instruments. A2A is your ship talking to other ships in the fleet.',
          },
          {
            text: 'Is A2A widely adopted yet?',
            response:
              'Adoption is accelerating rapidly. Major cloud providers and enterprise platforms are integrating A2A support, making cross-agent communication a production reality.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Your mission: connect each A2A concept to its correct function. Show me you understand the command network.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Agent Card Discovery: Every A2A-compatible agent publishes an Agent Card — a machine-readable document describing its identity, capabilities, endpoint, and supported protocols. Other agents can discover these cards through a registry or direct URL, similar to how web services publish API documentation. The Agent Card is the first thing a client agent reads before deciding whether to delegate work.',
      },
      {
        type: 'text',
        content:
          'Capability Matching: When a client agent needs help, it reads Agent Cards to find agents with the right capabilities. This is not keyword matching — it involves understanding semantic descriptions of what each agent can do. The client evaluates factors like specialization, reliability, and cost before selecting the best agent for the task.',
      },
      {
        type: 'text',
        content:
          'Task Delegation: Once a suitable agent is found, the client sends a structured Task Request. This includes the objective, input data, constraints, and expected output format. The remote agent processes the task independently, sending Status Updates as it progresses. The client does not need to micromanage — it trusts the protocol.',
      },
      {
        type: 'stat',
        content:
          '72% of enterprise AI teams are adopting or evaluating agent-to-agent communication protocols for their production systems.',
        highlight: true,
      },
    ],

    challenge: {
      type: 'connect',
      instructions:
        'Match each A2A component to its role in the command network. Draw connections between the concept and its description.',
      data: {
        sources: [
          'Client Agent',
          'Agent Card',
          'Task Request',
          'Status Update',
          'Result Response',
        ],
        targets: [
          'Discovers remote agents',
          'Advertises capabilities',
          'Delegates work',
          'Reports progress',
          'Returns output',
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
        text: 'Well mapped, Commander. You now understand the A2A command network — how agents discover, connect, and delegate across the fleet.',
      },
      {
        speaker: 'aria',
        text: 'The A2A protocol transforms isolated agents into a coordinated armada. No hardcoded connections, no brittle integrations — just a standard protocol that any agent can speak.',
      },
      {
        speaker: 'aria',
        text: 'Next, we go deeper into the communication patterns themselves. How do agents actually pass messages? That is the art of strategic signaling.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 3: Message Passing — Communication patterns
  // ---------------------------------------------------------------------------
  'orchestration-citadel-m3': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Commander, your fleet can discover and connect. But the way agents exchange messages determines the entire shape of your formation.',
      },
      {
        speaker: 'aria',
        text: 'There are five fundamental communication patterns in agent orchestration. Each has different strengths, and choosing the wrong one can cripple even the best-designed fleet.',
      },
      {
        speaker: 'aria',
        text: 'Think of it like military communications. Sometimes you need a direct radio call. Other times you broadcast to all channels. And sometimes you just need a continuous data stream.',
        choices: [
          {
            text: 'Which pattern is most common in multi-agent systems?',
            correct: true,
            response:
              'Request/Response is the most common starting point — one agent asks, another answers. But production systems usually combine multiple patterns. A pipeline might use request/response between stages but event-driven triggers to start the pipeline itself.',
          },
          {
            text: 'Can agents use multiple patterns at once?',
            response:
              'Absolutely. Real-world agent systems are hybrid. An orchestrator might use request/response for task delegation, pub/sub for broadcasting status updates, and streaming for real-time data processing — all in the same system.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Your mission: match each communication scenario to the correct pattern. Show me you can choose the right signal for the right situation.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Request/Response: The simplest pattern. Agent A sends a request to Agent B and waits for a response. This is synchronous — the caller blocks until it gets an answer. Best for simple queries and direct commands where you need an immediate result. Downside: the caller is idle while waiting, which wastes time in large pipelines.',
      },
      {
        type: 'text',
        content:
          'Pub/Sub (Publish/Subscribe): An agent publishes a message to a topic, and all agents subscribed to that topic receive it. The publisher does not know or care who is listening. This decouples agents completely — you can add new subscribers without changing the publisher. Ideal for broadcasting status updates, notifications, or triggering multiple downstream processes from a single event.',
      },
      {
        type: 'text',
        content:
          'Event-Driven: Agents react to state changes rather than direct calls. When something happens (a file is uploaded, a task completes, an error occurs), an event is emitted. Agents that care about that event type activate automatically. This creates highly responsive systems where agents only run when needed, saving resources and reducing coupling.',
      },
      {
        type: 'text',
        content:
          'Streaming: Data flows continuously between agents rather than in discrete request/response cycles. One agent produces a stream of data, and another agent consumes it in real time. Essential for processing large datasets, live monitoring, and scenarios where waiting for a complete response would be too slow — like real-time translation or log analysis.',
      },
    ],

    challenge: {
      type: 'connect',
      instructions:
        'Match each communication scenario to the correct messaging pattern. Every fleet commander needs to know which signal type fits each situation.',
      data: {
        sources: [
          'Synchronous call between 2 agents',
          'Broadcasting to multiple agents',
          'Reacting to state changes',
          'Continuous data flow',
          'One-time query',
        ],
        targets: [
          'Request/Response',
          'Pub/Sub',
          'Event-Driven',
          'Streaming',
          'RPC',
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
        text: 'Precise signal matching, Commander. You understand how messages flow through the fleet — and more importantly, which pattern to choose for each tactical situation.',
      },
      {
        speaker: 'aria',
        text: 'In practice, most orchestration systems combine these patterns. A pipeline uses request/response between stages, pub/sub for monitoring, and streaming for data-heavy operations. The art is in the composition.',
      },
      {
        speaker: 'aria',
        text: 'One critical formation remains: delegation. Knowing when to command directly and when to trust a sub-agent with autonomy — that is the mark of a true fleet commander.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Mission 4: Delegation — Trust, oversight, and control
  // ---------------------------------------------------------------------------
  'orchestration-citadel-m4': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Commander, this is your final citadel challenge — and perhaps the most strategically important. Delegation is the difference between a micromanager and a true fleet commander.',
      },
      {
        speaker: 'aria',
        text: 'Not every task should be delegated. Not every agent should work unsupervised. The art of delegation is knowing which tasks need specialist agents, which need human oversight, and which you should just handle directly.',
      },
      {
        speaker: 'aria',
        text: 'In the real world, enterprises are already building these delegation hierarchies. The question is not whether to delegate — it is how to do it safely and effectively.',
        choices: [
          {
            text: 'When should you NOT delegate to a sub-agent?',
            correct: true,
            response:
              'Do not delegate when the task is trivial (faster to do directly), when it requires full conversation context (sub-agents start with limited context), or when the stakes are too high for unsupervised execution. A one-line code fix does not need a dedicated agent.',
          },
          {
            text: 'How do you maintain control over autonomous agents?',
            response:
              'Through trust boundaries. Define what each agent can and cannot do. Use approval gates for high-risk actions. Monitor outputs continuously. And always keep a human in the loop for irreversible decisions like deployments or data deletions.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Your final mission: assign the right agent to each task. An orchestrator coordinates, but specialists execute. Choose wisely.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'When to Delegate: Delegate when a task requires specialized knowledge (security audits, test generation), when it can run independently without shared state, and when the volume is too high for a single agent. Do NOT delegate trivial tasks (the overhead of spawning an agent exceeds the cost of just doing it), tasks that need full conversation context, or tasks that are tightly coupled to other in-progress work.',
      },
      {
        type: 'text',
        content:
          'Oversight Mechanisms: Effective delegation requires guardrails. Approval gates pause execution before high-risk actions (deployments, deletions, financial transactions). Output validation checks that agent results meet quality thresholds before accepting them. Timeout limits prevent runaway agents from consuming resources indefinitely. Audit logs track every action for accountability and debugging.',
      },
      {
        type: 'text',
        content:
          'Trust Boundaries: Every agent operates within defined boundaries. A Code Agent can read and write source files but cannot access production databases. A Security Agent can scan for vulnerabilities but cannot modify code. A DevOps Agent can deploy to staging but needs human approval for production. These boundaries prevent cascading failures and limit blast radius when things go wrong.',
      },
      {
        type: 'stat',
        content:
          '87% of Fortune 500 companies are now using AI-powered tools in their development workflows, with multi-agent delegation becoming a key pattern for scaling AI across engineering teams.',
        highlight: true,
      },
    ],

    challenge: {
      type: 'command',
      instructions:
        'You are the fleet commander. Assign each task to the specialist agent best equipped to handle it. The Orchestrator handles coordination and overview tasks, while domain specialists handle their areas of expertise.',
      data: {
        tasks: [
          {
            id: 'task-analyze',
            label: 'Analyze 10,000 code files',
            description:
              'Scan a large codebase for patterns, dependencies, and architecture insights. Requires broad code understanding.',
          },
          {
            id: 'task-fix',
            label: 'Write one-line fix',
            description:
              'Apply a simple, known bug fix to a single file. The fix is already identified and trivial.',
          },
          {
            id: 'task-test',
            label: 'Generate test suite',
            description:
              'Create comprehensive unit and integration tests for a module. Requires testing domain expertise.',
          },
          {
            id: 'task-security',
            label: 'Review security audit',
            description:
              'Analyze security scan results and prioritize vulnerabilities by severity and exploitability.',
          },
          {
            id: 'task-deploy',
            label: 'Deploy to staging',
            description:
              'Build, package, and deploy the application to the staging environment following CI/CD procedures.',
          },
        ],
        agents: [
          {
            id: 'agent-orchestrator',
            label: 'Orchestrator',
            specialty:
              'High-level coordination, task routing, progress monitoring, and handling trivial inline tasks.',
          },
          {
            id: 'agent-code',
            label: 'Code Agent',
            specialty:
              'Large-scale code analysis, refactoring, pattern detection, and codebase understanding.',
          },
          {
            id: 'agent-test',
            label: 'Test Agent',
            specialty:
              'Test generation, coverage analysis, test strategy, and quality assurance.',
          },
          {
            id: 'agent-security',
            label: 'Security Agent',
            specialty:
              'Vulnerability analysis, security scanning, threat modeling, and compliance checks.',
          },
          {
            id: 'agent-devops',
            label: 'DevOps Agent',
            specialty:
              'CI/CD pipelines, deployment automation, infrastructure management, and environment configuration.',
          },
        ],
        correctAssignments: {
          'task-analyze': 'agent-code',
          'task-fix': 'agent-orchestrator',
          'task-test': 'agent-test',
          'task-security': 'agent-security',
          'task-deploy': 'agent-devops',
        },
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Strategic delegation, Commander. You assigned the right specialist to each task — and wisely kept the trivial fix for the orchestrator to handle directly.',
      },
      {
        speaker: 'aria',
        text: 'That is the key insight: delegation is not about sending everything to sub-agents. It is about knowing when specialist expertise justifies the overhead, and when a task is simple enough to handle in the command center.',
      },
      {
        speaker: 'aria',
        text: 'You have completed the Orchestration Citadel. You now understand multi-agent pipelines, the A2A protocol, communication patterns, and strategic delegation. Your fleet is battle-ready, Commander.',
      },
    ],
  },
}
