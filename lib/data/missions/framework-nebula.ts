import type { MissionContent, DialogueNode, LearningBlock, ChallengeData } from '@/lib/types'

// ---------------------------------------------------------------------------
// Framework Nebula — 5 missions
// Agent frameworks, vendor SDKs, decision frameworks, multi-agent design, A2A
// ---------------------------------------------------------------------------

const m1Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Navigator, we are entering Framework Nebula — a region of space where multiple signal formations compete for dominance.',
  },
  {
    speaker: 'aria',
    text: 'Three distinct schools of thought have emerged for building agent systems, each with its own philosophy for navigating complexity.',
  },
  {
    speaker: 'aria',
    text: 'LangGraph charts workflows as graphs, CrewAI organizes agents by role, and AutoGen orchestrates through conversation. Understanding when to use each is key to surviving this nebula.',
  },
  {
    speaker: 'aria',
    text: 'Let us scan each formation and learn what makes them tick.',
  },
]

const m1Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'LangGraph takes a graph-based approach: you define your agent workflow as a directed graph of nodes and edges. Each node is a function, and edges control the flow — including conditional branching and cycles. This gives you fine-grained control over exactly how an agent moves through its reasoning steps. It excels at complex, multi-step workflows where you need deterministic control flow with LLM-powered decision points.',
  },
  {
    type: 'text',
    content:
      'CrewAI takes a role-based approach inspired by real-world teams. You define agents with specific roles (Researcher, Writer, Editor), give them backstories and goals, then assign them tasks. CrewAI handles delegation and collaboration automatically. It shines when your problem naturally maps to a team of specialists working together — content pipelines, research workflows, and analysis teams.',
  },
  {
    type: 'text',
    content:
      'AutoGen (by Microsoft) uses a conversation-based approach. Agents communicate by sending messages to each other in a group chat. The framework manages turn-taking and message routing. This pattern works well for debate-style reasoning, collaborative problem-solving, and scenarios where agents need to iteratively refine ideas through discussion.',
  },
  {
    type: 'stat',
    content:
      'LangGraph: 40k+ GitHub stars, used by LinkedIn and Elastic. CrewAI: 25k+ stars, popular for content automation. AutoGen: 38k+ stars, strong in enterprise research settings.',
    highlight: true,
  },
]

const m1Challenge: ChallengeData = {
  type: 'dialogue',
  instructions:
    'Navigate these nebula signals by matching each scenario to the framework best suited to handle it.',
  data: {
    nodes: [
      {
        speaker: 'aria',
        text: 'A startup needs to build a complex document processing pipeline with conditional branching — if a document is a contract, route it to legal review; if it is an invoice, route it to accounting. Which framework formation fits best?',
        choices: [
          {
            text: 'LangGraph — its graph-based routing handles conditional flows naturally',
            correct: true,
            response:
              'Correct. LangGraph excels at workflows with conditional branching and deterministic control flow. Graph edges make routing logic explicit and testable.',
          },
          {
            text: 'CrewAI — assign different roles for each document type',
            correct: false,
            response:
              'CrewAI could work, but the conditional routing logic is the core challenge here. LangGraph makes branching and routing explicit through its graph edges.',
          },
          {
            text: 'AutoGen — let agents discuss which path to take',
            correct: false,
            response:
              'Conversation-based routing would add unnecessary overhead for what is fundamentally a control-flow problem. LangGraph handles this more directly.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'A media company wants to automate their content pipeline: one specialist researches topics, another writes drafts, a third edits for style, and a fourth checks facts. Which formation do you recommend?',
        choices: [
          {
            text: 'CrewAI — it models teams of specialists with defined roles',
            correct: true,
            response:
              'Exactly. CrewAI was designed for this pattern — agents with distinct roles, backstories, and goals collaborating on sequential or parallel tasks.',
          },
          {
            text: 'LangGraph — define each step as a node in the pipeline',
            correct: false,
            response:
              'LangGraph could implement this, but CrewAI makes role definition and inter-agent delegation much more natural for team-based workflows.',
          },
          {
            text: 'AutoGen — let the agents chat about the content',
            correct: false,
            response:
              'While AutoGen supports multi-agent interaction, CrewAI is purpose-built for role-based teams with clear task assignments.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'A research team wants multiple AI agents to debate the merits of different approaches, challenge each other, and converge on a consensus. Which framework suits this best?',
        choices: [
          {
            text: 'AutoGen — its conversation pattern enables natural multi-agent debate',
            correct: true,
            response:
              'Spot on. AutoGen was built around the conversation paradigm. Its group chat pattern lets agents take turns, challenge ideas, and build on each other naturally.',
          },
          {
            text: 'CrewAI — assign a "debater" role to each agent',
            correct: false,
            response:
              'CrewAI focuses on task completion through roles, not open-ended discussion. AutoGen is better suited for iterative debate and convergence.',
          },
          {
            text: 'LangGraph — create a debate cycle in the graph',
            correct: false,
            response:
              'While LangGraph supports cycles, the natural back-and-forth of debate is more elegantly handled by AutoGen conversation patterns.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Which of these is a key advantage of graph-based frameworks like LangGraph over the other approaches?',
        choices: [
          {
            text: 'Explicit, visual control flow that is easy to debug and test',
            correct: true,
            response:
              'Correct. The graph structure makes the entire workflow visible and testable. You can trace exactly how data flows through the system, making debugging straightforward.',
          },
          {
            text: 'Agents can naturally collaborate without predefined structure',
            correct: false,
            response:
              'That describes conversation-based frameworks like AutoGen. LangGraph is notable for its explicit, predefined structure — which is a strength for complex workflows.',
          },
          {
            text: 'Agents are given human-like roles and backstories',
            correct: false,
            response:
              'That is the CrewAI approach. LangGraph focuses on workflow structure rather than agent personas.',
          },
        ],
      },
    ] as DialogueNode[],
  },
  passingScore: 70,
}

const m1Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Well navigated. You have mapped the three major framework formations in this nebula — graph-based, role-based, and conversation-based.',
  },
  {
    speaker: 'aria',
    text: 'Remember: no single framework dominates every scenario. The best navigators match the tool to the terrain. As we venture deeper into Framework Nebula, you will learn even more ways to chart your course.',
  },
]

// ---------------------------------------------------------------------------
// Mission 2: "The Official Armories"
// ---------------------------------------------------------------------------

const m2Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Navigator, we are picking up signals from three heavily fortified armories in the nebula — the official SDKs from the major AI providers.',
  },
  {
    speaker: 'aria',
    text: 'Anthropic, OpenAI, and Google each supply their own agent-building toolkit. These are not community frameworks — they are built by the same teams that build the models.',
  },
  {
    speaker: 'aria',
    text: 'Each armory reflects a different design philosophy. Understanding their approaches will help you choose the right weapons for any mission.',
  },
]

const m2Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'The Claude Agent SDK (Anthropic) centers on tool_use and extended thinking. Claude agents can call tools, reason through complex problems with visible chain-of-thought, and handle multi-turn conversations naturally. The SDK emphasizes safety with built-in guardrails, structured outputs via tool_use, and a "computer use" capability that lets agents interact with desktop applications directly. The philosophy: give the model powerful capabilities but keep humans in the loop.',
  },
  {
    type: 'text',
    content:
      'The OpenAI Agents SDK provides function calling and the Assistants API. Function calling lets models invoke your code, while Assistants maintain persistent threads with memory, file handling, and code interpretation. The Responses API adds structured output guarantees. OpenAI focuses on developer experience — making it easy to build and deploy agents with minimal boilerplate. Their philosophy: make the simple things simple and the complex things possible.',
  },
  {
    type: 'text',
    content:
      'Google Agent Development Kit (ADK) leans into multi-modal capabilities. With Gemini, agents can process text, images, audio, and video natively. ADK integrates tightly with Google Cloud services (Vertex AI, Cloud Functions) and supports grounding with Google Search. The philosophy: leverage the full breadth of Google infrastructure for enterprise-grade agent deployment with built-in scaling.',
  },
  {
    type: 'stat',
    content:
      'Claude handles 200K-token context windows. OpenAI Assistants support persistent threads with file search across millions of tokens. Gemini processes up to 1M tokens with native multi-modal input.',
    highlight: true,
  },
]

const m2Challenge: ChallengeData = {
  type: 'dialogue',
  instructions:
    'Scan the armory signals and identify which vendor SDK matches each scenario.',
  data: {
    nodes: [
      {
        speaker: 'aria',
        text: 'A team needs an agent that can analyze screenshots of their application, interact with their desktop GUI to run tests, and provide detailed reasoning about UI bugs. Which SDK is best equipped for this?',
        choices: [
          {
            text: 'Claude Agent SDK — its computer use and extended thinking capabilities are purpose-built for this',
            correct: true,
            response:
              'Correct. Claude computer use lets agents see and interact with desktop applications, while extended thinking provides detailed reasoning chains for complex analysis.',
          },
          {
            text: 'OpenAI Agents SDK — the Assistants API can handle file analysis',
            correct: false,
            response:
              'While OpenAI can analyze images, Claude computer use is specifically designed for desktop GUI interaction — clicking, typing, and navigating applications.',
          },
          {
            text: 'Google ADK — Gemini can process screenshots',
            correct: false,
            response:
              'Gemini has strong multi-modal capabilities, but Claude computer use goes beyond image analysis to actual desktop interaction — controlling mouse and keyboard.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'A startup wants to build a customer support agent that can search through their documentation, maintain conversation history across sessions, and run code snippets to verify technical answers. Which SDK fits best?',
        choices: [
          {
            text: 'OpenAI Agents SDK — Assistants provide persistent threads, file search, and code interpreter',
            correct: true,
            response:
              'Exactly. The Assistants API was designed for this: persistent threads maintain conversation history, file search indexes documentation, and code interpreter can verify technical solutions.',
          },
          {
            text: 'Claude Agent SDK — tool_use can handle all of these',
            correct: false,
            response:
              'Claude can do this with custom tooling, but the OpenAI Assistants API provides these capabilities (persistent threads, file search, code interpreter) as built-in, managed features.',
          },
          {
            text: 'Google ADK — Cloud Functions handle the backend',
            correct: false,
            response:
              'Google ADK excels at multi-modal and enterprise deployment, but the OpenAI Assistants API provides the specific combination of persistent memory + file search + code execution out of the box.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'An enterprise team is building an agent that processes video uploads, generates summaries from audio, analyzes charts in images, and needs to scale across their Google Cloud infrastructure. Which SDK should they choose?',
        choices: [
          {
            text: 'Google ADK — native multi-modal processing with tight Cloud integration',
            correct: true,
            response:
              'Correct. Google ADK with Gemini handles text, images, audio, and video natively, and integrates directly with Vertex AI and Google Cloud for enterprise-grade scaling.',
          },
          {
            text: 'Claude Agent SDK — it can process various content types',
            correct: false,
            response:
              'Claude has strong vision and text capabilities, but native video and audio processing plus tight Google Cloud integration make ADK the better fit for this scenario.',
          },
          {
            text: 'OpenAI Agents SDK — GPT-4 supports multi-modal input',
            correct: false,
            response:
              'OpenAI has multi-modal capabilities, but the combination of native video processing and deep Google Cloud infrastructure integration gives ADK the edge here.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'What is a key philosophical difference between the Claude Agent SDK and the OpenAI Agents SDK?',
        choices: [
          {
            text: 'Claude emphasizes visible reasoning and safety guardrails; OpenAI emphasizes developer experience and managed services',
            correct: true,
            response:
              'Well observed. Anthropic prioritizes interpretable reasoning (extended thinking) and safety-first design, while OpenAI focuses on making agent development accessible with managed infrastructure like Assistants.',
          },
          {
            text: 'Claude is open-source while OpenAI is closed-source',
            correct: false,
            response:
              'Both SDKs have open-source client libraries but use proprietary models. The key difference is in design philosophy: safety + reasoning vs. developer experience + managed services.',
          },
          {
            text: 'Claude only works on desktop while OpenAI only works in the cloud',
            correct: false,
            response:
              'Both work in various environments. The philosophical difference is about priorities: Anthropic emphasizes interpretable reasoning and safety, while OpenAI focuses on developer experience.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'When should you consider using a vendor SDK instead of a community framework like LangGraph or CrewAI?',
        choices: [
          {
            text: 'When you need tight integration with a specific model provider and want official support and maintenance',
            correct: true,
            response:
              'Correct. Vendor SDKs offer the deepest integration with their respective models, official support, and guaranteed maintenance. Community frameworks offer more flexibility but may lag behind new model features.',
          },
          {
            text: 'Always — vendor SDKs are strictly superior to community frameworks',
            correct: false,
            response:
              'Not true. Community frameworks like LangGraph offer model-agnostic flexibility, while vendor SDKs lock you to one provider. Each has valid use cases.',
          },
          {
            text: 'Never — community frameworks are always more flexible',
            correct: false,
            response:
              'Community frameworks are more flexible, but vendor SDKs provide deeper model integration, official support, and faster access to new features. The right choice depends on the project.',
          },
        ],
      },
    ] as DialogueNode[],
  },
  passingScore: 70,
}

const m2Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Excellent scan, Navigator. You have charted the three official armories and understand their distinct philosophies.',
  },
  {
    speaker: 'aria',
    text: 'Claude prioritizes safety and reasoning. OpenAI focuses on developer experience. Google brings multi-modal power and cloud scale. Knowing which armory to visit depends on your mission requirements.',
  },
]

// ---------------------------------------------------------------------------
// Mission 3: "The Right Tool"
// ---------------------------------------------------------------------------

const m3Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Navigator, we are approaching the decision nexus of Framework Nebula — the point where all signal formations converge.',
  },
  {
    speaker: 'aria',
    text: 'Choosing the right agent architecture is one of the most consequential decisions in any project. Pick wrong, and you navigate into an asteroid field of complexity.',
  },
  {
    speaker: 'aria',
    text: 'I will teach you a decision framework that matches use cases to the right tool. Then you will put it into practice by assigning real-world scenarios to the best-fit architecture.',
  },
]

const m3Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'Complexity level is your first filter. For simple, single-turn tasks (chatbots, Q&A), a direct API call with prompt engineering is usually sufficient. No framework needed. Adding a framework to a simple problem creates unnecessary overhead and maintenance burden. Start simple — you can always add complexity later.',
  },
  {
    type: 'text',
    content:
      'Team size and expertise matter. Small teams or solo developers benefit from lightweight tools like direct SDK calls or CrewAI (high-level abstractions). Larger teams with dedicated ML engineers can handle the complexity of LangGraph (explicit control flow) or custom orchestration. Match the tool to the team, not just the problem.',
  },
  {
    type: 'text',
    content:
      'Use case type determines the pattern. Research and content workflows map well to CrewAI (role-based). Complex pipelines with branching logic suit LangGraph (graph-based). Debate and ideation scenarios fit AutoGen (conversation-based). Production enterprise deployments with specific model requirements point toward vendor SDKs.',
  },
  {
    type: 'stat',
    content:
      'According to industry surveys, 62% of production agent systems use direct API calls without any framework. Frameworks become valuable as complexity grows — multi-step, multi-agent, or multi-model workflows.',
    highlight: true,
  },
]

const m3Challenge: ChallengeData = {
  type: 'command',
  instructions:
    'Assign each incoming task to the agent architecture best suited to handle it. Match the mission to the right tool.',
  data: {
    tasks: [
      {
        id: 'task-1',
        label: 'Simple Chatbot',
        description:
          'Build a customer FAQ bot that answers questions from a knowledge base. Single-turn, straightforward responses.',
      },
      {
        id: 'task-2',
        label: 'Research Pipeline',
        description:
          'Create a multi-step research system: one agent searches the web, another summarizes findings, a third generates a report with citations.',
      },
      {
        id: 'task-3',
        label: 'Document Routing',
        description:
          'Build a system that classifies incoming documents, routes them to different processing pipelines based on type, and handles error recovery with retries.',
      },
      {
        id: 'task-4',
        label: 'Quick Prototype',
        description:
          'Rapidly prototype an agent that uses a specific model provider tools (computer use, code interpreter) with official support and maintenance.',
      },
      {
        id: 'task-5',
        label: 'Peer Review System',
        description:
          'Build a system where multiple AI agents review code, debate quality concerns, and converge on a consensus assessment.',
      },
    ],
    agents: [
      {
        id: 'agent-1',
        label: 'Direct API Call',
        specialty:
          'Simple, single-purpose tasks with minimal orchestration needed.',
      },
      {
        id: 'agent-2',
        label: 'LangGraph',
        specialty:
          'Complex workflows with conditional branching, cycles, and explicit control flow.',
      },
      {
        id: 'agent-3',
        label: 'CrewAI',
        specialty:
          'Role-based teams of specialized agents working on collaborative tasks.',
      },
      {
        id: 'agent-4',
        label: 'Vendor SDK',
        specialty:
          'Tight integration with a specific model provider, using their latest features.',
      },
      {
        id: 'agent-5',
        label: 'AutoGen',
        specialty:
          'Conversation-based multi-agent systems for debate, ideation, and iterative refinement.',
      },
    ],
    correctAssignments: {
      'task-1': 'agent-1',
      'task-2': 'agent-3',
      'task-3': 'agent-2',
      'task-4': 'agent-4',
      'task-5': 'agent-5',
    } as Record<string, string>,
  },
  passingScore: 70,
}

const m3Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Sharp navigation, crew. You matched each scenario to its ideal architecture — a skill that separates experienced builders from those lost in the nebula.',
  },
  {
    speaker: 'aria',
    text: 'The golden rule: start with the simplest tool that solves the problem. Only add framework complexity when the problem demands it. Over-engineering is just as dangerous as under-engineering in these uncharted formations.',
  },
]

// ---------------------------------------------------------------------------
// Mission 4: "Build a Crew"
// ---------------------------------------------------------------------------

const m4Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Navigator, we are approaching a dense formation in the nebula — a cluster of agents working together as a coordinated fleet.',
  },
  {
    speaker: 'aria',
    text: 'Multi-agent systems are more powerful than any single agent, but designing them requires careful thought about roles, communication, and coordination.',
  },
  {
    speaker: 'aria',
    text: 'You will learn the principles of multi-agent design and then architect a system from scratch. Think of it as assembling your own fleet crew.',
  },
]

const m4Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'Defining roles is the foundation. Each agent in a multi-agent system should have a clear, focused responsibility — just like crew members on a ship. A Researcher gathers information. A Writer produces content. A Reviewer evaluates quality. A Manager coordinates the workflow. Overlapping responsibilities lead to conflicts; gaps lead to dropped tasks.',
  },
  {
    type: 'text',
    content:
      'Communication patterns determine how agents interact. In sequential pipelines, each agent passes output to the next. In hierarchical systems, a manager agent delegates tasks and collects results. In peer-to-peer networks, agents communicate directly. Choose the pattern that matches your workflow — sequential for linear pipelines, hierarchical for complex orchestration, peer-to-peer for collaborative refinement.',
  },
  {
    type: 'text',
    content:
      'Shared state vs. message passing is a fundamental architectural decision. Shared state (a common memory or database all agents read and write) is simpler but creates coupling. Message passing (agents send explicit messages to each other) is more complex but keeps agents independent and testable. Most production systems use a hybrid — shared state for context, message passing for coordination.',
  },
  {
    type: 'stat',
    content:
      'Production multi-agent systems typically use 3-7 agents. More than 10 agents in a single system significantly increases coordination overhead and debugging complexity.',
    highlight: true,
  },
]

const m4Challenge: ChallengeData = {
  type: 'architect',
  instructions:
    'Design a multi-agent content production system. Place each component into the correct slot to create a functional fleet.',
  data: {
    nodes: [
      {
        id: 'researcher',
        label: 'Researcher Agent',
        description: 'Gathers information from sources, produces raw findings.',
      },
      {
        id: 'writer',
        label: 'Writer Agent',
        description:
          'Transforms research into polished draft content.',
      },
      {
        id: 'reviewer',
        label: 'Reviewer Agent',
        description:
          'Evaluates drafts for accuracy, style, and completeness.',
      },
      {
        id: 'manager',
        label: 'Manager Agent',
        description:
          'Coordinates the workflow, assigns tasks, and resolves conflicts.',
      },
      {
        id: 'shared-memory',
        label: 'Shared Memory',
        description:
          'Central knowledge store that all agents can read from and write to.',
      },
      {
        id: 'task-queue',
        label: 'Task Queue',
        description:
          'Ordered list of work items that agents pull from and report back to.',
      },
    ],
    slots: [
      {
        id: 'slot-orchestrator',
        label: 'Orchestration Layer',
        description: 'Who coordinates the overall workflow?',
      },
      {
        id: 'slot-phase-1',
        label: 'Phase 1: Information Gathering',
        description: 'Who collects the raw material?',
      },
      {
        id: 'slot-phase-2',
        label: 'Phase 2: Content Creation',
        description: 'Who produces the first draft?',
      },
      {
        id: 'slot-phase-3',
        label: 'Phase 3: Quality Assurance',
        description: 'Who reviews and provides feedback?',
      },
      {
        id: 'slot-state',
        label: 'State Management',
        description: 'How do agents share context and knowledge?',
      },
      {
        id: 'slot-work',
        label: 'Work Distribution',
        description: 'How are tasks assigned and tracked?',
      },
    ],
  },
  passingScore: 70,
}

const m4Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Outstanding fleet design, Navigator. You have assembled a well-coordinated crew with clear roles, communication channels, and state management.',
  },
  {
    speaker: 'aria',
    text: 'Remember the key principles: focused roles, appropriate communication patterns, and a balance of shared state with message passing. A well-designed multi-agent system is greater than the sum of its parts.',
  },
]

// ---------------------------------------------------------------------------
// Mission 5: "Agent Cards"
// ---------------------------------------------------------------------------

const m5Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Navigator, our sensors are detecting a new kind of signal in the nebula — structured identity beacons that agents use to discover each other.',
  },
  {
    speaker: 'aria',
    text: 'These are Agent Cards — standardized descriptions that advertise what an agent can do, how to reach it, and how to authenticate. Think of them as transponder signals for the agent fleet.',
  },
  {
    speaker: 'aria',
    text: 'The A2A (Agent-to-Agent) protocol uses these cards for capability discovery. Over 60,000 projects already use AGENTS.md configuration files to describe their agents. This is how agents find and trust each other in the open.',
  },
]

const m5Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'An Agent Card is a structured JSON document that describes an agent to other agents and systems. It answers the fundamental questions: Who is this agent? What can it do? Where can I reach it? How do I authenticate? This standardized format enables automated discovery — agents can scan for other agents and understand their capabilities without human intervention.',
  },
  {
    type: 'text',
    content:
      'The core fields of an Agent Card include: "name" (human-readable identifier), "description" (what the agent does in plain language), "capabilities" (a structured list of skills, tools, or functions the agent supports), "endpoint" (the URL or protocol address where the agent accepts requests), "authentication" (how callers prove they are authorized), and "version" (semantic version for compatibility tracking).',
  },
  {
    type: 'text',
    content:
      'Capability advertising is the key innovation. Instead of hardcoding which agents can do what, agents broadcast their capabilities in a machine-readable format. A planning agent can discover that a "code-review" agent is available, understand its input/output format, and invoke it dynamically. This enables composable, modular agent systems that grow organically as new agents come online.',
  },
  {
    type: 'stat',
    content:
      'Over 60,000 projects on GitHub use AGENTS.md files to describe agent configurations. The A2A protocol and Agent Card standard are emerging as the foundation for cross-organization agent interoperability.',
    highlight: true,
  },
]

const m5Challenge: ChallengeData = {
  type: 'architect',
  instructions:
    'Assemble a valid Agent Card by placing each field into its correct position in the JSON structure. Build a complete identity beacon for an agent.',
  data: {
    nodes: [
      {
        id: 'name-field',
        label: 'name',
        description:
          'Human-readable identifier for the agent, e.g. "CodeReviewBot".',
      },
      {
        id: 'description-field',
        label: 'description',
        description:
          'Plain-language summary of the agent purpose and behavior.',
      },
      {
        id: 'capabilities-field',
        label: 'capabilities',
        description:
          'Structured list of skills, tools, or functions the agent provides.',
      },
      {
        id: 'endpoint-field',
        label: 'endpoint',
        description:
          'URL or protocol address where the agent accepts incoming requests.',
      },
      {
        id: 'authentication-field',
        label: 'authentication',
        description:
          'Mechanism callers use to prove authorization (API key, OAuth, mTLS).',
      },
      {
        id: 'version-field',
        label: 'version',
        description:
          'Semantic version string for tracking compatibility (e.g. "1.2.0").',
      },
    ],
    slots: [
      {
        id: 'slot-identity',
        label: 'Identity',
        description: 'What is this agent called?',
      },
      {
        id: 'slot-purpose',
        label: 'Purpose',
        description: 'What does this agent do?',
      },
      {
        id: 'slot-skills',
        label: 'Skills Registry',
        description: 'What capabilities does this agent advertise?',
      },
      {
        id: 'slot-address',
        label: 'Network Address',
        description: 'Where can other agents reach this agent?',
      },
      {
        id: 'slot-security',
        label: 'Security Layer',
        description: 'How do callers authenticate with this agent?',
      },
      {
        id: 'slot-compat',
        label: 'Compatibility',
        description: 'How do consumers track breaking changes?',
      },
    ],
  },
  passingScore: 70,
}

const m5Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Beacon assembled, Navigator. You now understand how agents identify themselves and discover each other across the nebula.',
  },
  {
    speaker: 'aria',
    text: 'Agent Cards are the foundation of interoperability. As the A2A ecosystem grows, agents that advertise clear, structured capabilities will be the ones that get discovered and trusted. Always broadcast your signal clearly.',
  },
]

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const frameworkNebulaContent: Record<string, MissionContent> = {
  'framework-nebula-m1': {
    briefing: m1Briefing,
    learning: m1Learning,
    challenge: m1Challenge,
    debrief: m1Debrief,
  },
  'framework-nebula-m2': {
    briefing: m2Briefing,
    learning: m2Learning,
    challenge: m2Challenge,
    debrief: m2Debrief,
  },
  'framework-nebula-m3': {
    briefing: m3Briefing,
    learning: m3Learning,
    challenge: m3Challenge,
    debrief: m3Debrief,
  },
  'framework-nebula-m4': {
    briefing: m4Briefing,
    learning: m4Learning,
    challenge: m4Challenge,
    debrief: m4Debrief,
  },
  'framework-nebula-m5': {
    briefing: m5Briefing,
    learning: m5Learning,
    challenge: m5Challenge,
    debrief: m5Debrief,
  },
}
