import type { MissionContent, DialogueNode, LearningBlock, ChallengeData } from '@/lib/types'

// ---------------------------------------------------------------------------
// Mission 1: The N×M Problem
// ---------------------------------------------------------------------------

const m1Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Welcome to MCP Station, Commander. This orbital hub is where every AI tool in the galaxy docks to exchange data with external systems.',
  },
  {
    speaker: 'aria',
    text: 'But before the station existed, every AI tool needed a custom integration for every data source. Imagine building a separate docking port for every ship class that visits.',
  },
  {
    speaker: 'aria',
    text: 'That approach created a combinatorial explosion — the N times M problem. Your mission is to understand why that model collapsed under its own weight, and how a universal protocol changed everything.',
  },
]

const m1Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'Before MCP, every AI application needed its own custom connector for every external tool or data source. If you had 5 AI tools and 5 data sources, you needed 25 separate integrations — each built, tested, and maintained independently.',
  },
  {
    type: 'stat',
    content: 'N AI tools × M data sources = N×M custom integrations — a maintenance nightmare that scales quadratically',
    highlight: true,
  },
  {
    type: 'text',
    content:
      'Each integration was fragile. When an API changed, every tool that connected to it broke. When a new AI tool launched, developers had to rebuild connectors from scratch. Teams spent more time on plumbing than on building features.',
  },
  {
    type: 'text',
    content:
      'The solution is a universal protocol — a single standard interface that every AI tool and every data source can implement once. Instead of N×M integrations, you get N + M. Each side only needs one adapter. This is exactly the pattern that USB solved for hardware, and that MCP solves for AI.',
  },
]

const m1Challenge: ChallengeData = {
  type: 'architect',
  instructions:
    'Arrange the components to show the architecture shift from the N×M problem to the MCP solution. Place each node in the correct slot to build the before-and-after diagram.',
  data: {
    nodes: [
      { id: 'ai-tool-a', label: 'AI Tool A' },
      { id: 'ai-tool-b', label: 'AI Tool B' },
      { id: 'database', label: 'Database' },
      { id: 'api-service', label: 'API Service' },
      { id: 'file-system', label: 'File System' },
      { id: 'mcp-layer', label: 'MCP Protocol Layer' },
    ],
    slots: [
      { id: 'slot-before-1', label: 'Direct connection source 1', correctNodeId: 'ai-tool-a' },
      { id: 'slot-before-2', label: 'Direct connection source 2', correctNodeId: 'ai-tool-b' },
      { id: 'slot-before-3', label: 'Direct connection target 1', correctNodeId: 'database' },
      { id: 'slot-before-4', label: 'Direct connection target 2', correctNodeId: 'api-service' },
      { id: 'slot-after-bridge', label: 'Universal protocol bridge', correctNodeId: 'mcp-layer' },
      { id: 'slot-after-target', label: 'Standardized data endpoint', correctNodeId: 'file-system' },
    ],
  },
  passingScore: 70,
}

const m1Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'You have mapped the problem clearly. The N×M model was unsustainable — every new tool or data source multiplied the integration burden across the entire ecosystem.',
  },
  {
    speaker: 'aria',
    text: 'By introducing a universal protocol layer, we collapsed that complexity from N×M down to N + M. One standard. One docking port. That is the insight that gave birth to MCP Station.',
  },
]

// ---------------------------------------------------------------------------
// Mission 2: USB-C for AI
// ---------------------------------------------------------------------------

const m2Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Now that you understand the problem MCP solves, it is time to learn the protocol itself. Think of MCP as USB-C for AI — one universal connector that replaced a drawer full of proprietary cables.',
  },
  {
    speaker: 'aria',
    text: 'The Model Context Protocol has been adopted faster than almost any open standard in history. Your mission is to understand how it works and why the industry rallied behind it.',
  },
]

const m2Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'The Model Context Protocol (MCP) is an open standard that provides a universal way for AI applications to connect to external data sources and tools. Instead of each AI tool building custom integrations, MCP defines a single protocol that both sides implement.',
  },
  {
    type: 'text',
    content:
      'The USB-C analogy is apt: before USB-C, every device had its own charging cable. MCP does the same for AI — one protocol replaces hundreds of bespoke connectors. An AI client connects to any MCP server using the same interface, regardless of what tool or data source sits behind it.',
  },
  {
    type: 'stat',
    content: '97M+ npm downloads and counting — MCP adoption has been explosive since its launch',
    highlight: true,
  },
  {
    type: 'text',
    content:
      'The architecture is straightforward: an MCP Client (inside your AI app) connects to one or more MCP Servers. Each server exposes tools, resources, and prompts through a standardized JSON-RPC interface. The client discovers what the server offers, then calls those capabilities as needed. The Linux Foundation now stewards the spec, ensuring it remains open and vendor-neutral.',
  },
]

const m2Challenge: ChallengeData = {
  type: 'connect',
  instructions:
    'Connect each AI tool to the MCP server it would most commonly integrate with. Each tool connects to one server — draw the lines to build a working MCP network.',
  data: {
    sources: ['Claude Code', 'Cursor IDE', 'VS Code', 'Custom App', 'Windsurf'],
    targets: [
      'GitHub MCP Server',
      'Database MCP Server',
      'Slack MCP Server',
      'File System MCP Server',
      'Docker MCP Server',
    ],
    correctPairs: [
      [0, 0],
      [1, 3],
      [2, 1],
      [3, 2],
      [4, 4],
    ],
  },
  passingScore: 70,
}

const m2Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'You have mapped the MCP network. Notice how each AI tool connects through the same protocol — no custom wiring needed. That is the power of a universal standard.',
  },
  {
    speaker: 'aria',
    text: 'With 97 million downloads and backing from the Linux Foundation, MCP is not an experiment. It is the infrastructure layer that the entire AI ecosystem is building on. Every connection you just drew would have required a custom integration before MCP existed.',
  },
]

// ---------------------------------------------------------------------------
// Mission 3: Protocol vs. Wrappers
// ---------------------------------------------------------------------------

const m3Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Commander, not everyone is using MCP yet. Some teams still build vendor-specific wrappers — custom code that ties their AI tool to one particular service.',
  },
  {
    speaker: 'aria',
    text: 'Your mission is to understand why open protocols beat proprietary wrappers in the long run. History has shown this pattern again and again — from HTTP to USB to MCP.',
  },
]

const m3Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'A vendor-specific wrapper is custom integration code that connects one AI tool to one service. It works, but it locks you in. Switch AI tools and you rewrite everything. Switch services and you rewrite everything. The wrapper becomes a liability.',
  },
  {
    type: 'text',
    content:
      'Open protocols like MCP offer portability. Code you write against the MCP standard works with any compliant client or server. Your integrations survive tool changes, vendor changes, and even paradigm shifts. The protocol is the stable foundation.',
  },
  {
    type: 'text',
    content:
      'Maintenance cost is the killer. A custom wrapper requires ongoing updates every time the vendor API changes. An MCP server is maintained once and works everywhere. The community shares the maintenance burden instead of every team duplicating effort.',
  },
  {
    type: 'stat',
    content: 'MCP 1.0 specification targeting June 2026 — the protocol is maturing into a formal industry standard',
    highlight: true,
  },
]

const m3Challenge: ChallengeData = {
  type: 'dialogue',
  instructions:
    'Answer questions about why open protocols outperform vendor-specific wrappers. Choose the best response to demonstrate your understanding.',
  data: {
    nodes: [
      {
        speaker: 'aria',
        text: 'A teammate suggests building a custom wrapper instead of using MCP. What is the strongest argument for using MCP instead?',
        choices: [
          {
            text: 'MCP is newer and therefore better',
            correct: false,
            response: 'Novelty alone is not an argument. The real advantage is portability and reduced maintenance burden.',
          },
          {
            text: 'MCP provides portability — switch tools without rewriting integrations',
            correct: true,
            response: 'Exactly. Portability is the core advantage. Your integrations survive tool changes because the protocol is the stable layer.',
          },
          {
            text: 'Custom wrappers are always slower to execute',
            correct: false,
            response: 'Performance is not the primary concern here. Custom wrappers can be fast — the issue is maintenance cost and lock-in.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'Why does the open-source community contribute more to protocol-based tools than to proprietary wrappers?',
        choices: [
          {
            text: 'Open protocols create shared infrastructure that benefits everyone equally',
            correct: true,
            response: 'Correct. When everyone builds on the same standard, contributions compound. A community-maintained MCP server helps every AI tool, not just one.',
          },
          {
            text: 'Developers prefer writing open-source code for ideological reasons',
            correct: false,
            response: 'While open-source values matter, the practical driver is that protocol contributions have wider impact and benefit the contributor too.',
          },
          {
            text: 'Proprietary companies block outside contributions',
            correct: false,
            response: 'Some do, but many accept contributions. The real difference is that protocol work benefits the whole ecosystem, making it more rewarding to contribute to.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'What historical parallel best illustrates why MCP will likely outlast vendor-specific wrappers?',
        choices: [
          {
            text: 'Social media platforms replacing blogs',
            correct: false,
            response: 'That is a platform shift, not a protocol story. Look at standards like HTTP, TCP/IP, or USB that unified fragmented ecosystems.',
          },
          {
            text: 'HTTP standardizing web communication — replacing proprietary network protocols',
            correct: true,
            response: 'Perfect analogy. HTTP replaced dozens of proprietary protocols by being open, simple, and universal. MCP is doing the same for AI tool integration.',
          },
          {
            text: 'Smartphones replacing desktop computers',
            correct: false,
            response: 'That is a hardware evolution, not a standards story. The right analogy involves protocols that unified fragmented integration landscapes.',
          },
        ],
      },
      {
        speaker: 'aria',
        text: 'The MCP 1.0 spec is targeting June 2026. Why does formal standardization matter for enterprise adoption?',
        choices: [
          {
            text: 'Enterprises need stable APIs with backward-compatibility guarantees before committing infrastructure',
            correct: true,
            response: 'Exactly. A formal spec with versioning guarantees means enterprises can build on MCP without fear of breaking changes. Stability enables investment.',
          },
          {
            text: 'Enterprises only adopt technologies that have version 1.0 in the name',
            correct: false,
            response: 'Version numbers are not magic. What matters is the stability guarantees and governance structure that come with a formal specification.',
          },
          {
            text: 'Standardization makes the protocol faster',
            correct: false,
            response: 'Standardization is about stability and interoperability, not performance. Enterprises need confidence that their integrations will not break.',
          },
        ],
      },
    ] as DialogueNode[],
  },
  passingScore: 70,
}

const m3Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Well reasoned, Commander. Open protocols win because they turn integration from a competitive problem into shared infrastructure.',
  },
  {
    speaker: 'aria',
    text: 'With MCP 1.0 on the horizon, the protocol is maturing from a community project into a formal industry standard. The teams building on MCP today are making a bet that history consistently rewards.',
  },
]

// ---------------------------------------------------------------------------
// Mission 4: Docking Sequence
// ---------------------------------------------------------------------------

const m4Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Time for hands-on architecture, Commander. You are going to design the docking sequence — the internal structure of an MCP connection between an AI agent and its servers.',
  },
  {
    speaker: 'aria',
    text: 'An MCP server exposes three types of capabilities: resources, tools, and prompts. Each serves a different purpose in the protocol stack. Your mission is to assemble the architecture correctly.',
  },
]

const m4Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'Resources are read-only data that an MCP server exposes — files, database records, API responses. Think of them as the data layer. The AI client can browse and read resources without side effects.',
  },
  {
    type: 'text',
    content:
      'Tools are executable functions that perform actions — creating files, sending messages, querying databases. They are the action layer. Each tool has a defined schema for its inputs and outputs.',
  },
  {
    type: 'text',
    content:
      'Prompts are reusable templates that guide AI behavior for specific tasks. They are the intelligence layer — pre-built instructions that help the AI use resources and tools effectively.',
  },
  {
    type: 'code',
    content:
      '// MCP server configuration in claude_desktop_config.json\n{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "your-token" }\n    },\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]\n    }\n  }\n}',
  },
]

const m4Challenge: ChallengeData = {
  type: 'architect',
  instructions:
    'Arrange the MCP architecture components in the correct order. Build the stack from the AI application at the top down to the external data sources at the bottom.',
  data: {
    nodes: [
      { id: 'resources', label: 'Resources (Data Layer)' },
      { id: 'tools', label: 'Tools (Action Layer)' },
      { id: 'prompts', label: 'Prompts (Intelligence Layer)' },
      { id: 'transport', label: 'Transport Layer (JSON-RPC)' },
      { id: 'mcp-client', label: 'MCP Client' },
      { id: 'mcp-server', label: 'MCP Server' },
    ],
    slots: [
      { id: 'slot-top', label: 'Inside the AI application', correctNodeId: 'mcp-client' },
      { id: 'slot-comm', label: 'Communication protocol', correctNodeId: 'transport' },
      { id: 'slot-server', label: 'Server process', correctNodeId: 'mcp-server' },
      { id: 'slot-intel', label: 'Reusable AI templates', correctNodeId: 'prompts' },
      { id: 'slot-action', label: 'Executable functions', correctNodeId: 'tools' },
      { id: 'slot-data', label: 'Read-only data access', correctNodeId: 'resources' },
    ],
  },
  passingScore: 70,
}

const m4Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Docking sequence complete. You have assembled the full MCP architecture — from the client embedded in your AI application, through the transport layer, to the server exposing resources, tools, and prompts.',
  },
  {
    speaker: 'aria',
    text: 'This layered design is what makes MCP so flexible. Any AI tool that implements the client spec can connect to any server. And any server can expose any combination of resources, tools, and prompts. The protocol handles the rest.',
  },
]

// ---------------------------------------------------------------------------
// Mission 5: The Babel Problem
// ---------------------------------------------------------------------------

const m5Briefing: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'Commander, MCP solved how agents talk to tools. But there is a new challenge: agents cannot talk to each other. Every multi-agent system speaks its own language.',
  },
  {
    speaker: 'aria',
    text: 'This is the Babel Problem — dozens of agent frameworks, each with incompatible communication protocols. Google and partners created A2A, the Agent-to-Agent protocol, to solve it. Your mission is to understand how A2A complements MCP.',
  },
]

const m5Learning: LearningBlock[] = [
  {
    type: 'text',
    content:
      'MCP connects agents to tools and data. But what happens when agents need to collaborate with each other? A planning agent needs to hand off work to a coding agent, which passes results to a testing agent. Without a standard protocol, each handoff requires custom glue code.',
  },
  {
    type: 'text',
    content:
      'The Agent-to-Agent (A2A) protocol solves this by standardizing how agents discover, communicate with, and delegate tasks to each other. If MCP is the USB-C that connects devices to peripherals, A2A is the network protocol that lets devices talk to each other.',
  },
  {
    type: 'text',
    content:
      'Agent Cards are A2A discovery mechanism. Every A2A-compatible agent publishes a JSON card describing its capabilities, supported input/output formats, and endpoint URL. Other agents read these cards to decide who to delegate work to — like a crew manifest for your fleet.',
  },
  {
    type: 'stat',
    content: '150+ technology partners backing A2A — including Google, Salesforce, SAP, and major enterprise platforms',
    highlight: true,
  },
]

const m5Challenge: ChallengeData = {
  type: 'connect',
  instructions:
    'Connect each specialized agent to the task it handles in an A2A multi-agent workflow. Each agent has one primary responsibility — draw the correct lines.',
  data: {
    sources: ['Planning Agent', 'Coding Agent', 'Testing Agent', 'Review Agent', 'Deploy Agent'],
    targets: [
      'Requirements Analysis',
      'Code Generation',
      'Test Execution',
      'Code Review',
      'Deployment Pipeline',
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
}

const m5Debrief: DialogueNode[] = [
  {
    speaker: 'aria',
    text: 'You have mapped the A2A network. Each agent knows its role and can discover its collaborators through Agent Cards. No custom wiring — just protocol-level interoperability.',
  },
  {
    speaker: 'aria',
    text: 'Together, MCP and A2A form the two halves of the agentic infrastructure stack. MCP handles agent-to-tool communication. A2A handles agent-to-agent communication. With both protocols in place, we can build truly composable AI systems.',
  },
  {
    speaker: 'aria',
    text: 'MCP Station docking complete, Commander. You now understand the protocol foundations that power the entire agent ecosystem. The signal is strong — and it only gets stronger from here.',
  },
]

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const mcpStationContent: Record<string, MissionContent> = {
  'mcp-station-m1': {
    briefing: m1Briefing,
    learning: m1Learning,
    challenge: m1Challenge,
    debrief: m1Debrief,
  },
  'mcp-station-m2': {
    briefing: m2Briefing,
    learning: m2Learning,
    challenge: m2Challenge,
    debrief: m2Debrief,
  },
  'mcp-station-m3': {
    briefing: m3Briefing,
    learning: m3Learning,
    challenge: m3Challenge,
    debrief: m3Debrief,
  },
  'mcp-station-m4': {
    briefing: m4Briefing,
    learning: m4Learning,
    challenge: m4Challenge,
    debrief: m4Debrief,
  },
  'mcp-station-m5': {
    briefing: m5Briefing,
    learning: m5Learning,
    challenge: m5Challenge,
    debrief: m5Debrief,
  },
}
