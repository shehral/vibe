import type { AcademyContentBlock } from './types'

export const agentSdksContent: AcademyContentBlock[] = [
  // ── Overview ──────────────────────────────────────────────
  {
    type: 'heading',
    content: 'Agent SDKs and Protocols',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'AI agents are programs that use language models to reason, plan, and take action — calling tools, reading files, browsing the web, or coordinating with other agents. Building agents requires two things: an SDK to orchestrate model calls and tool use, and protocols so agents can discover and communicate with external services. This section covers the major vendor SDKs for building agents and the emerging protocols that let them interoperate.',
  },

  // ── Vendor SDKs ───────────────────────────────────────────
  {
    type: 'heading',
    content: 'Vendor SDKs',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'Each major AI lab now ships an official SDK for building agentic applications on top of their models. These SDKs handle the orchestration loop — sending messages, parsing tool calls, executing tools, and feeding results back to the model — so you can focus on defining the tools and behavior your agent needs.',
  },
  {
    type: 'tool-card',
    name: 'Claude Agent SDK',
    category: 'Agent SDK',
    description:
      'Anthropic\'s official SDK for building agents powered by Claude. Provides a high-level Agent class that manages the tool-use loop, supports extended thinking for complex reasoning, and enables computer use for GUI automation. Available in both Python and TypeScript.',
    url: 'https://docs.anthropic.com',
    features: [
      'Tool use with automatic schema generation from functions',
      'Extended thinking for multi-step reasoning',
      'Computer use for interacting with desktop applications',
      'Agent class with built-in orchestration loop',
      'Python and TypeScript support',
      'Streaming responses with real-time tool execution',
    ],
  },
  {
    type: 'tool-card',
    name: 'OpenAI Agents SDK',
    category: 'Agent SDK',
    description:
      'OpenAI\'s framework for building multi-agent systems. Introduces first-class concepts for agents, handoffs between agents, guardrails for input/output validation, and built-in tracing for debugging agent behavior. Python-first with a focus on composability.',
    url: 'https://github.com/openai/openai-agents-python',
    features: [
      'Agent definitions with instructions and tools',
      'Handoffs for delegating between specialized agents',
      'Guardrails for validating inputs and outputs',
      'Built-in tracing and debugging dashboard',
      'Python-first API design',
      'Multi-agent orchestration patterns',
    ],
  },
  {
    type: 'tool-card',
    name: 'Google ADK (Agent Development Kit)',
    category: 'Agent SDK',
    description:
      'Google\'s toolkit for building AI agents with Gemini models. Supports multi-modal inputs (text, images, video, audio), native integration with Google Cloud services, and a flexible tool-use system. Designed for enterprise-scale agent deployments.',
    url: 'https://google.github.io/adk-docs/',
    features: [
      'Multi-modal support (text, images, video, audio)',
      'Native Gemini model integration',
      'Flexible tool-use with function declarations',
      'Google Cloud service integrations',
      'Agent evaluation and testing utilities',
      'Support for multi-agent architectures',
    ],
  },
  {
    type: 'heading',
    content: 'SDK Comparison',
    level: 3,
  },
  {
    type: 'table',
    headers: ['SDK', 'Language', 'Key Feature', 'Philosophy'],
    rows: [
      ['Claude Agent SDK', 'Python, TypeScript', 'Extended thinking + computer use', 'Safety-first, transparent reasoning'],
      ['OpenAI Agents SDK', 'Python', 'Handoffs + guardrails', 'Multi-agent composition'],
      ['Google ADK', 'Python', 'Multi-modal + Google Cloud', 'Enterprise scale, multi-modal first'],
    ],
  },

  // ── Code Example ──────────────────────────────────────────
  {
    type: 'heading',
    content: 'Building an Agent: Claude Agent SDK Example',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Here is a minimal example of building an agent with the Claude Agent SDK. You define tools as decorated Python functions, create an Agent with a model and system prompt, and call run() to start the orchestration loop. The SDK handles sending tool calls to your functions and feeding results back to the model automatically.',
  },
  {
    type: 'code',
    language: 'python',
    content: `from claude_agent_sdk import Agent, tool

@tool
def search_docs(query: str) -> str:
    """Search documentation for relevant info."""
    return f"Results for: {query}"

agent = Agent(
    model="claude-sonnet-4-6",
    tools=[search_docs],
    system="You are a helpful coding assistant."
)
result = agent.run("How do I set up MCP?")`,
  },
  {
    type: 'paragraph',
    content:
      'The @tool decorator automatically generates a JSON schema from the function signature and docstring. When the model decides to call search_docs, the SDK executes the function, passes the result back, and lets the model continue reasoning. This loop repeats until the model produces a final text response.',
  },

  // ── Protocols ─────────────────────────────────────────────
  {
    type: 'heading',
    content: 'Protocols',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'SDKs let you build agents, but protocols let agents connect to the outside world and to each other. Three protocols are emerging as standards: MCP for connecting agents to tools and data sources, A2A for agent-to-agent communication, and AGENTS.md for capability discovery. Together they form the "connective tissue" of the agentic ecosystem.',
  },
  {
    type: 'tool-card',
    name: 'MCP (Model Context Protocol)',
    category: 'Protocol',
    description:
      'The universal connector between AI models and external tools. MCP defines a standard JSON-RPC interface that any tool, database, API, or service can implement to become accessible to any AI agent. Think of it as USB-C for AI — one protocol, universal compatibility. Over 97 million downloads and growing.',
    url: 'https://modelcontextprotocol.io',
    features: [
      'Universal AI-to-tool connector via JSON-RPC',
      'Server/client architecture for any language',
      '97M+ downloads across the ecosystem',
      'Spec 1.0 targeting June 2026',
      'Linux Foundation stewardship',
      'Supported by Anthropic, OpenAI, Google, Microsoft',
    ],
  },
  {
    type: 'tool-card',
    name: 'A2A (Agent-to-Agent Protocol)',
    category: 'Protocol',
    description:
      'Google-led open protocol for agent interoperability. A2A enables agents built by different vendors to discover each other, negotiate capabilities, and delegate tasks. Where MCP connects agents to tools, A2A connects agents to other agents — enabling multi-agent systems that span organizational boundaries.',
    url: 'https://a2aprotocol.ai',
    features: [
      'Agent discovery via Agent Cards (JSON metadata)',
      'Task delegation and progress tracking',
      'Cross-vendor agent communication',
      '150+ industry partners',
      'Complementary to MCP (tools vs. agents)',
      'Built on HTTP and JSON-RPC standards',
    ],
  },
  {
    type: 'tool-card',
    name: 'AGENTS.md',
    category: 'Convention',
    description:
      'A simple convention for agent capability discovery. Place an AGENTS.md file in your repository root (like a README for AI agents) describing what an agent can do, what tools it has access to, and how to interact with it. Over 60,000 projects have adopted this pattern.',
    url: 'https://github.com/anthropics/agents-md',
    features: [
      'Markdown-based agent capability description',
      'Placed in repo root for automatic discovery',
      '60k+ projects using the convention',
      'No infrastructure required — just a text file',
      'Describes tools, permissions, and interaction patterns',
      'Works alongside MCP and A2A',
    ],
  },
  {
    type: 'heading',
    content: 'Protocol Comparison',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Protocol', 'Purpose', 'Adoption', 'Managed By'],
    rows: [
      ['MCP', 'Connect agents to tools and data', '97M+ downloads', 'Linux Foundation'],
      ['A2A', 'Connect agents to other agents', '150+ partners', 'Google (open spec)'],
      ['AGENTS.md', 'Describe agent capabilities', '60k+ projects', 'Community convention'],
    ],
  },

  // ── Choosing an Approach ──────────────────────────────────
  {
    type: 'heading',
    content: 'Choosing Your Approach',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'The agent ecosystem is moving fast, and there is no single "right" choice. Vendor SDKs give you the tightest integration with a specific model — if you are building on Claude, the Claude Agent SDK will give you access to features like extended thinking and computer use that generic frameworks cannot. If you need multi-agent handoffs, the OpenAI Agents SDK has first-class support. For multi-modal use cases, Google ADK is purpose-built.',
  },
  {
    type: 'paragraph',
    content:
      'Protocols, on the other hand, are model-agnostic. Adopting MCP means your tools work with any agent that speaks MCP — Claude Code, Cursor, Windsurf, and dozens of other clients. Publishing an AGENTS.md makes your agent discoverable without any infrastructure changes. These are safe investments regardless of which SDK you choose.',
  },
  {
    type: 'callout',
    content:
      'Start with a vendor SDK that matches your preferred model, then adopt MCP to make your tools portable. You get the best of both worlds: tight model integration for reasoning quality, and universal tool compatibility for ecosystem reach.',
    variant: 'tip',
  },

  // ── The Bigger Picture ────────────────────────────────────
  {
    type: 'heading',
    content: 'The Bigger Picture',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'We are in the early days of agent infrastructure — roughly where web development was in 1995. SDKs, protocols, and conventions are evolving rapidly. The patterns that matter most right now are: define your tools cleanly (MCP), give your agent clear instructions (system prompts and AGENTS.md), and instrument everything (tracing and logging). The specific libraries will change; the principles of clean tool interfaces and observable behavior will not.',
  },
  {
    type: 'paragraph',
    content:
      'As you build your own agents, remember that the goal is not to automate everything — it is to automate the right things. An agent that reliably handles 10 well-defined tasks is more valuable than one that attempts 100 tasks and fails unpredictably. Start small, test thoroughly, and expand the agent\'s capabilities as you build confidence in its reliability.',
  },
]
