import type { AcademyContentBlock } from './types'

export const careerPathsContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'Career Paths in AI-Native Development',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'The skills you have been building throughout Vibe Voyager — prompt engineering, architecture thinking, agent orchestration, and protocol fluency — map directly to real career paths that are emerging right now. The software industry is undergoing its biggest shift since the move to cloud computing, and new roles are crystallizing around AI-native development practices.',
  },
  {
    type: 'paragraph',
    content:
      'This section outlines four career paths that align with the game\'s skill system. Whether you lean toward high Vibe (creative prompting), strong Architecture (system design), deep Protocol (standards and safety), or broad Command (orchestration and leadership), there is a career path that fits your strengths.',
  },
  {
    type: 'callout',
    content:
      'The core skills taught in this game — understanding AI capabilities, writing effective prompts, designing systems, and thinking about safety — remain valuable regardless of which specific career path you choose. Tools will change; principles endure.',
    variant: 'info',
  },

  // --- Career Path 1: AI-Native Developer ---
  {
    type: 'heading',
    content: 'AI-Native Developer',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The AI-Native Developer is the evolution of the traditional software developer. Rather than writing every line by hand, they use AI tools daily for coding, testing, reviewing, and debugging. They understand how to get the best output from AI assistants, when to trust AI suggestions, and when to override them. This is not a separate role — it is what every developer is becoming.',
  },
  {
    type: 'tool-card',
    name: 'AI-Native Developer',
    category: 'Career Path',
    description:
      'Uses AI coding tools as a daily force multiplier. Writes prompts as fluently as code. Reviews AI output with the same rigor as human code. Knows which tool to reach for — terminal agent for refactors, IDE copilot for flow state, code review bot for PR quality.',
    features: [
      'Prompt engineering for code generation and debugging',
      'AI-assisted code review and quality assurance',
      'Tool selection and workflow optimization',
      'Understanding AI limitations and failure modes',
    ],
  },
  {
    type: 'paragraph',
    content:
      'Game stats mapping: High Vibe (creative prompting skills) with moderate Architecture (enough system design sense to guide AI output). This path rewards players who excelled at PromptDuel and the dialogue-based learning missions.',
  },
  {
    type: 'paragraph',
    content:
      'Key tools: Cursor, Windsurf, Claude Code, GitHub Copilot, CodeRabbit. Entry path: any developer who starts integrating AI tools into their existing workflow. The demand is growing rapidly — companies increasingly expect developers to be productive with AI assistance.',
  },

  // --- Career Path 2: AI Full-Stack Developer ---
  {
    type: 'heading',
    content: 'AI Full-Stack Developer',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The AI Full-Stack Developer combines deep technical knowledge of frontend and backend systems with mastery of AI-assisted development. They do not just use AI tools — they build full applications with them, from database schemas to deployment pipelines. They understand both the AI layer and the technology stack underneath it.',
  },
  {
    type: 'tool-card',
    name: 'AI Full-Stack Developer',
    category: 'Career Path',
    description:
      'Builds complete applications using AI assistance across the entire stack. Masters both the AI tools and the underlying technologies — can debug when AI gets it wrong because they understand the fundamentals. Sets up MCP servers, configures deployment automation, and architects systems that leverage AI capabilities.',
    features: [
      'Frontend and backend architecture with AI assistance',
      'MCP server setup and agent integration',
      'Deployment automation and DevOps workflows',
      'Full-stack debugging when AI output needs correction',
    ],
  },
  {
    type: 'paragraph',
    content:
      'Game stats mapping: Balanced across all four stats. This path rewards well-rounded players who engaged with every mission type — architecture challenges, protocol quizzes, and command exercises alike.',
  },
  {
    type: 'paragraph',
    content:
      'Key tools: Next.js with AI IDEs, MCP servers for tool integration, deployment platforms like Vercel and Railway. Entry path: traditional full-stack developers who upskill with AI tools, or AI-first developers who deepen their technical foundations. This role commands strong compensation because it combines two high-demand skill sets.',
  },

  // --- Career Path 3: Prompt Engineer ---
  {
    type: 'heading',
    content: 'Prompt Engineer',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The Prompt Engineer specializes in crafting effective prompts, system instructions, and evaluation frameworks. They are the bridge between human intent and AI capability — translating what people want into instructions that AI systems can execute reliably. This role requires deep understanding of how language models process instructions, what makes prompts effective, and how to measure output quality.',
  },
  {
    type: 'tool-card',
    name: 'Prompt Engineer',
    category: 'Career Path',
    description:
      'Designs prompts, system instructions, and few-shot examples that reliably produce desired AI outputs. Builds evaluation frameworks to measure prompt quality at scale. Works at the intersection of language, psychology, and computer science.',
    features: [
      'Prompt design and systematic optimization',
      'System instruction architecture (CLAUDE.md, custom instructions)',
      'Few-shot example curation and chain-of-thought design',
      'Evaluation frameworks and quality measurement',
    ],
  },
  {
    type: 'paragraph',
    content:
      'Game stats mapping: High Vibe (prompt crafting is the core skill) and high Protocol (system instructions require structured thinking). Players who scored well on PromptDuel and the dialogue quizzes have a natural affinity for this path.',
  },
  {
    type: 'paragraph',
    content:
      'Key tools: Claude API, OpenAI API, evaluation frameworks, prompt management platforms. Note: this role is evolving rapidly. As AI models become better at understanding intent, the "prompt engineer" role is increasingly merging with AI engineering and product design. The core skill — communicating effectively with AI — remains essential regardless of the job title.',
  },

  // --- Career Path 4: Agentic Engineer ---
  {
    type: 'heading',
    content: 'Agentic Engineer',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The Agentic Engineer designs and orchestrates multi-agent systems. They are the fleet commanders — the people who architect how AI agents collaborate, communicate, and coordinate to accomplish complex tasks. This is the frontier of AI development: the highest demand, the fewest practitioners, and the most technically challenging of the four paths.',
  },
  {
    type: 'tool-card',
    name: 'Agentic Engineer',
    category: 'Career Path',
    description:
      'Architects multi-agent systems where specialized AI agents collaborate on complex tasks. Designs agent communication protocols, implements safety guardrails (human-in-the-loop), and orchestrates workflows that no single agent could handle alone. This role draws heavily from distributed systems engineering and applies those principles to AI coordination.',
    features: [
      'Agent architecture and orchestration patterns',
      'MCP and A2A protocol implementation',
      'Human-in-the-loop safety design',
      'Agent SDK mastery (Claude Agent SDK, OpenAI Agents, Google ADK)',
    ],
  },
  {
    type: 'paragraph',
    content:
      'Game stats mapping: High Architecture (system design for agent coordination) and high Command (orchestration is the core skill). Players who excelled at the Command mini-game and the Orchestration Citadel missions are well-suited for this path.',
  },
  {
    type: 'paragraph',
    content:
      'Key tools: Claude Agent SDK, OpenAI Agents SDK, Google Agent Development Kit, LangGraph, CrewAI, MCP servers, A2A protocol. Entry path: experienced developers who understand distributed systems and want to work at the cutting edge. This role requires comfort with ambiguity — the patterns are still being invented.',
  },

  // --- Comparison Table ---
  {
    type: 'heading',
    content: 'Role Comparison',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Role', 'Core Skills', 'Game Stats', 'Demand Level'],
    rows: [
      ['AI-Native Developer', 'Prompt engineering, AI code review, tool selection', 'High Vibe, moderate Architecture', 'High (and growing)'],
      ['AI Full-Stack Developer', 'Full-stack architecture, MCP, deployment', 'Balanced all stats', 'Very High'],
      ['Prompt Engineer', 'Prompt design, evaluation, system instructions', 'High Vibe, high Protocol', 'Moderate (role evolving)'],
      ['Agentic Engineer', 'Agent architecture, MCP/A2A, orchestration, HITL', 'High Architecture, high Command', 'Very High (few practitioners)'],
    ],
  },

  // --- T-Shaped Developer ---
  {
    type: 'callout',
    content:
      'Aim to be a T-shaped developer: deep expertise in one of these paths, but broad familiarity across all four. The most effective AI practitioners understand prompting AND architecture AND protocols AND orchestration — they just go deepest in one area. The game\'s four-stat system reflects this: you can specialize, but you benefit from leveling everything.',
    variant: 'tip',
  },

  // --- Closing ---
  {
    type: 'heading',
    content: 'The Landscape Keeps Moving',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'These career paths are snapshots of a rapidly evolving landscape. New tools, frameworks, and protocols emerge every month. The roles themselves will continue to shift and merge — today\'s "Prompt Engineer" may become tomorrow\'s "AI Product Designer," and today\'s "Agentic Engineer" may become as common as "Backend Developer" is now.',
  },
  {
    type: 'paragraph',
    content:
      'What does not change is the need for continuous learning. The developers who thrive in this landscape are the ones who stay curious, experiment with new tools early, and build real projects to test their understanding. If you have played through Vibe Voyager, you have already practiced the most important skill of all: learning by doing.',
  },
  {
    type: 'paragraph',
    content:
      'Your journey as a Vibe Voyager does not end here. Take the skills you have built — the prompt intuition, the architecture thinking, the protocol awareness, the command presence — and apply them to real projects. Build something. Break something. Ship something. The galaxy of AI-native development is vast, and you now have the star map to navigate it.',
  },
]
