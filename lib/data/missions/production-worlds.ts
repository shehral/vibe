import type { MissionContent, DialogueNode, LearningBlock, ChallengeData } from '@/lib/types'

// ---------------------------------------------------------------------------
// Production Worlds — Act 3: Production Deployment of AI Systems
// 3 missions covering quality engineering, enterprise deployment, and the capstone graduation
// ---------------------------------------------------------------------------

export const productionWorldsContent: Record<string, MissionContent> = {
  // =========================================================================
  // Mission 1: "Moon Alpha: Quality Engineering" — Testing, CI/CD, monitoring
  // =========================================================================
  'production-worlds-m1': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Pilot, we are approaching Moon Alpha — the quality engineering outpost. Every system that reaches production must pass through here first. No exceptions.',
      },
      {
        speaker: 'aria',
        text: 'You have built agents, connected protocols, secured your perimeter. But none of that matters if your code breaks the moment real users touch it. Quality engineering is the difference between a prototype and a product.',
      },
      {
        speaker: 'aria',
        text: 'We are going to cover the full launch checklist: automated testing strategies for AI-generated code, CI/CD pipelines with agent integration, monitoring and observability for agent systems, and evaluation benchmarks like SWE-bench.',
      },
      {
        speaker: 'aria',
        text: 'At the end, you will run a mission control exercise — assigning the right agents to the right quality tasks. Think of it as your pre-launch go/no-go check. Let us begin.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Automated testing for AI-generated code requires a different mindset than traditional testing. Because AI agents produce code that varies between runs, your test suite must validate behavior rather than exact implementation. Write tests that assert outcomes — API responses, database state changes, UI behavior — rather than checking that specific lines of code exist. Property-based testing and snapshot testing are particularly effective for catching regressions in AI-generated output.',
      },
      {
        type: 'text',
        content:
          'CI/CD pipelines for agent-powered systems extend the traditional build-test-deploy cycle. A modern AI-aware pipeline includes: linting and static analysis on generated code, automated test execution with coverage thresholds, security scanning for common AI code vulnerabilities (hardcoded secrets, injection risks), and optionally an AI review step where a second agent reviews the first agent\'s output before merge. Tools like GitHub Actions, GitLab CI, and Jenkins all support these workflows.',
      },
      {
        type: 'stat',
        content:
          'Companies with mature CI/CD practices deploy 208 times more frequently than those without, with 106 times faster recovery from failures. When AI agents generate code, automated pipelines become even more critical — they are the safety net that catches what human review might miss.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Monitoring and observability for agent systems go beyond traditional application metrics. You need to track: agent decision latency (how long each reasoning step takes), tool call success and failure rates, token consumption and cost per operation, hallucination detection rates, and drift in agent behavior over time. OpenTelemetry provides a vendor-neutral standard for instrumenting these systems, and platforms like Langfuse and Helicone specialize in LLM observability.',
      },
      {
        type: 'stat',
        content:
          'SWE-bench is a benchmark that evaluates AI coding agents by testing their ability to resolve real GitHub issues from popular open-source projects. Top-performing agents solve around 50% of issues autonomously — a number that continues to climb. SWE-bench has become the industry standard for measuring agentic coding capability, and its results help teams decide which agents to trust with production code.',
        highlight: true,
      },
    ],

    challenge: {
      type: 'command',
      instructions:
        'Mission Control is online. You have five quality engineering tasks that need to be assigned to the correct specialist agents. Drag each task to the agent best equipped to handle it. A clean assignment board means a green light for launch.',
      data: {
        tasks: [
          {
            id: 'task-unit',
            label: 'Run unit tests on new code',
            description:
              'Execute the full unit test suite against recently generated code to verify individual function behavior and catch regressions.',
          },
          {
            id: 'task-security',
            label: 'Perform security scan',
            description:
              'Scan the codebase for hardcoded secrets, injection vulnerabilities, and insecure dependencies before deployment.',
          },
          {
            id: 'task-coverage',
            label: 'Check code coverage',
            description:
              'Analyze test coverage metrics to identify untested code paths and ensure critical logic is adequately covered.',
          },
          {
            id: 'task-integration',
            label: 'Run integration tests',
            description:
              'Execute end-to-end integration tests that verify multiple services and components work together correctly.',
          },
          {
            id: 'task-monitor',
            label: 'Monitor production errors',
            description:
              'Track runtime exceptions, error rates, and anomalous behavior in the live production environment.',
          },
        ],
        agents: [
          {
            id: 'agent-test-runner',
            label: 'Test Runner',
            specialty: 'Executes unit test suites and reports pass/fail results for individual functions and modules.',
          },
          {
            id: 'agent-security-scanner',
            label: 'Security Scanner',
            specialty: 'Detects vulnerabilities, exposed secrets, and insecure patterns in source code and dependencies.',
          },
          {
            id: 'agent-coverage-analyzer',
            label: 'Coverage Analyzer',
            specialty: 'Measures code coverage percentages and identifies untested branches, functions, and edge cases.',
          },
          {
            id: 'agent-integration-tester',
            label: 'Integration Tester',
            specialty: 'Runs cross-service and end-to-end tests to verify system-wide behavior and API contracts.',
          },
          {
            id: 'agent-error-monitor',
            label: 'Error Monitor',
            specialty: 'Watches production systems for runtime errors, performance degradation, and anomalous patterns.',
          },
        ],
        correctAssignments: {
          'task-unit': 'agent-test-runner',
          'task-security': 'agent-security-scanner',
          'task-coverage': 'agent-coverage-analyzer',
          'task-integration': 'agent-integration-tester',
          'task-monitor': 'agent-error-monitor',
        },
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'All stations reporting green. You matched every quality task to the right specialist agent — that is exactly how a well-run mission control operates.',
      },
      {
        speaker: 'aria',
        text: 'Remember: in production, quality is not a phase — it is a continuous process. Automated tests catch regressions, CI/CD pipelines enforce standards, and observability tells you what is happening in real time. These systems work together as your safety net.',
      },
      {
        speaker: 'aria',
        text: 'Moon Alpha cleared. Setting course for Moon Beta — the enterprise frontier. The stakes get higher from here, pilot.',
      },
    ],
  },

  // =========================================================================
  // Mission 2: "Moon Beta: The Enterprise" — Governance, compliance, cost, change
  // =========================================================================
  'production-worlds-m2': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Welcome to Moon Beta, pilot. This is enterprise territory — where agent systems meet organizational reality. The rules here are different from anything you have encountered so far.',
      },
      {
        speaker: 'aria',
        text: 'Building an agent that works in a demo is one thing. Deploying that same agent inside a hospital, a bank, or a global supply chain is an entirely different challenge. You need governance, compliance, cost controls, and a plan for the humans who will work alongside these systems.',
      },
      {
        speaker: 'aria',
        text: 'I am going to walk you through the four pillars of enterprise AI deployment. Then you will face a series of real-world scenarios to test your judgment. Ready for the boardroom, pilot?',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Governance frameworks for AI agents define who can deploy agents, what actions they are authorized to take, and how decisions are reviewed. A strong governance framework includes: an AI review board that approves new agent deployments, tiered authorization levels (read-only agents vs. agents that can modify data vs. agents that can take external actions), mandatory human-in-the-loop checkpoints for high-stakes decisions, and clear escalation paths when agents encounter situations outside their authorized scope.',
      },
      {
        type: 'stat',
        content:
          'By 2025, 78% of Fortune 500 companies had established or were building AI governance committees. Organizations with formal governance frameworks reported 60% fewer AI-related incidents than those deploying ad hoc.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Compliance and audit trails are non-negotiable in regulated industries. Every agent action must be logged with: what decision was made, what data was accessed, which model and version produced the output, and whether a human reviewed the result. In healthcare (HIPAA), finance (SOX, PCI-DSS), and government (FedRAMP), these logs are not optional — they are legal requirements. Frameworks like LangSmith and custom OpenTelemetry exporters can capture this telemetry automatically.',
      },
      {
        type: 'text',
        content:
          'Cost management for LLM APIs can make or break an enterprise deployment. A single GPT-4 class call costs $0.01-0.10 in tokens — which seems small until an agent makes thousands of calls per day across hundreds of users. Strategies include: using smaller models for routine tasks and reserving large models for complex reasoning, caching frequent queries, setting per-user and per-agent budget caps, and monitoring cost-per-task metrics to identify runaway spending before it becomes a crisis.',
      },
      {
        type: 'stat',
        content:
          'Enterprise LLM spending is projected to reach $150 billion by 2027. Companies that implement cost governance early report 40-70% lower per-unit costs compared to ungoverned deployments, primarily through model tiering and intelligent caching.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Organizational change management is the most overlooked pillar of enterprise AI deployment. People resist change, especially when they perceive AI as a threat to their roles. Successful rollouts include: transparent communication about what agents will and will not do, training programs that help employees become effective agent supervisors, phased rollouts that start with low-risk tasks and expand gradually, and clear metrics showing how agents augment rather than replace human work.',
      },
    ],

    challenge: {
      type: 'dialogue',
      instructions:
        'You will face five enterprise deployment scenarios. Each one tests your understanding of governance, compliance, cost management, or organizational change. Choose the response that best addresses the constraints of each situation.',
      data: {
        nodes: [
          {
            speaker: 'aria',
            text: 'Scenario one: A hospital wants to deploy an AI agent that accesses patient medical records to help doctors generate treatment summaries. What is the most critical requirement before launch?',
            choices: [
              {
                text: 'Ensure the agent produces accurate summaries by testing against sample records',
                correct: false,
                response:
                  'Accuracy matters, but in healthcare the first gate is compliance. Under HIPAA, accessing patient records without proper authorization controls, audit logging, and data handling procedures is a legal violation — regardless of how accurate the output is.',
              },
              {
                text: 'Implement HIPAA-compliant audit trails, access controls, and ensure the agent never stores patient data outside authorized systems',
                correct: true,
                response:
                  'Correct. In healthcare, compliance is the prerequisite for everything else. Every access to patient data must be logged, authorized, and auditable. The agent must operate within the same data governance boundaries as any human clinician.',
              },
              {
                text: 'Train the medical staff on how to use the agent effectively',
                correct: false,
                response:
                  'Training is important, but it cannot come before compliance. If the system does not meet HIPAA requirements, no amount of training makes the deployment legal or safe.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Scenario two: A bank wants to use AI agents for automated code review in their software development process. The security team is concerned. What should they prioritize?',
            choices: [
              {
                text: 'Deploy the agent immediately to speed up development and address security concerns later',
                correct: false,
                response:
                  'In financial services, deploying first and securing later is a recipe for regulatory action. Banks operate under strict audit requirements — every tool that touches code must be vetted before production use.',
              },
              {
                text: 'Set up the agent with read-only access to code, full audit logging of every review, and mandatory human approval before any suggested changes are merged',
                correct: true,
                response:
                  'Exactly right. The agent should review but not autonomously modify code. Every review must be logged for SOX compliance, and a human developer must approve all changes. This satisfies both security and audit requirements.',
              },
              {
                text: 'Only allow the agent to review non-financial code modules',
                correct: false,
                response:
                  'Restricting scope is part of the solution, but insufficient on its own. Even reviewing non-financial code requires audit trails and access controls in a banking environment. The governance framework must be comprehensive.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Scenario three: Your enterprise agent system is burning through $50,000 per month in LLM API costs — three times the projected budget. What is the most effective first step?',
            choices: [
              {
                text: 'Switch all agents to the cheapest available model immediately',
                correct: false,
                response:
                  'Switching to cheaper models without analysis could degrade quality for tasks that genuinely need advanced reasoning. The first step is understanding where the costs are coming from.',
              },
              {
                text: 'Analyze cost-per-task metrics to identify which agents and tasks are consuming the most tokens, then implement model tiering — using smaller models for routine tasks and reserving expensive models for complex reasoning',
                correct: true,
                response:
                  'That is the right approach. Most enterprise deployments find that 80% of agent tasks can be handled by smaller, cheaper models. Model tiering, combined with caching for repeated queries, typically reduces costs by 40-70% without sacrificing quality where it matters.',
              },
              {
                text: 'Reduce the number of users who have access to the agent system',
                correct: false,
                response:
                  'Limiting access reduces value along with cost. A better approach is optimizing how agents consume resources — model tiering, caching, and budget caps — so more people can benefit at a sustainable cost.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Scenario four: A supply chain company has deployed AI agents, but warehouse staff are refusing to use them, calling them "job killers." How should leadership respond?',
            choices: [
              {
                text: 'Mandate agent usage and discipline employees who refuse to adopt the new tools',
                correct: false,
                response:
                  'Forcing adoption breeds resentment and sabotage. Change management research consistently shows that mandates without buy-in produce poor outcomes — people find workarounds or do the minimum.',
              },
              {
                text: 'Replace the resistant employees with people who are comfortable with AI tools',
                correct: false,
                response:
                  'Replacing experienced domain experts destroys institutional knowledge. The warehouse staff understand the supply chain better than any new hire. The goal is to make them effective agent supervisors, not to replace them.',
              },
              {
                text: 'Run transparent training programs showing how agents handle routine paperwork so staff can focus on complex decisions, and start with a pilot group of volunteers before expanding',
                correct: true,
                response:
                  'That is the change management playbook. Transparency about what agents will do, demonstration of augmentation rather than replacement, voluntary early adoption, and gradual expansion. When people see colleagues benefiting, resistance dissolves naturally.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Scenario five: Your organization is preparing its first enterprise-wide agent deployment. The CTO asks you to name the four pillars that must be in place before launch. What are they?',
            choices: [
              {
                text: 'Speed, scalability, user interface design, and marketing',
                correct: false,
                response:
                  'These are product concerns, not enterprise deployment pillars. Speed and scalability matter, but without governance and compliance, you cannot deploy in regulated environments at all.',
              },
              {
                text: 'Governance frameworks, compliance and audit trails, cost management, and organizational change management',
                correct: true,
                response:
                  'All four pillars accounted for. Governance defines who can do what. Compliance ensures legal requirements are met. Cost management keeps the deployment sustainable. And change management ensures the humans in the organization actually adopt and benefit from the system.',
              },
              {
                text: 'Testing, deployment, monitoring, and documentation',
                correct: false,
                response:
                  'Those are important operational practices, but they are not the enterprise pillars. Testing and monitoring fall under quality engineering — which you covered on Moon Alpha. Enterprise deployment requires governance, compliance, cost management, and change management.',
              },
            ],
          },
        ] satisfies DialogueNode[],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Solid judgment, pilot. Enterprise deployment is not about writing better code — it is about understanding the organizational, legal, and financial environment your code lives in.',
      },
      {
        speaker: 'aria',
        text: 'The best engineers in the galaxy know that a system is only as strong as its governance. Build the guardrails before you build the features, and the features will last.',
      },
      {
        speaker: 'aria',
        text: 'Moon Beta cleared. One mission remains — the final deployment. Everything you have learned across every planet in every act comes together now. Setting course for the capstone, pilot.',
      },
    ],
  },

  // =========================================================================
  // Mission 3: "Final Mission: Deployment Playbook" — Capstone graduation
  // =========================================================================
  'production-worlds-m3': {
    briefing: [
      {
        speaker: 'aria',
        text: 'This is it, pilot. The final mission. Every system you have studied, every protocol you have mastered, every security measure you have deployed — it all converges here.',
      },
      {
        speaker: 'aria',
        text: 'Your objective: assemble a complete deployment playbook — the end-to-end pipeline for taking an AI agent system from concept to production. This is your graduation flight.',
      },
      {
        speaker: 'aria',
        text: 'I will walk you through a summary of everything we have covered across all eight planets. Then you will architect the most complex pipeline you have faced — seven stages, each one critical to a successful launch.',
      },
      {
        speaker: 'aria',
        text: 'When this is done, you will have earned the Skill Chips — a complete record of every capability you have developed on this journey. No pressure, Commander. You are ready for this.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Stage one of your journey: Vibe Coding Foundation. You learned that modern software development begins with intent, not syntax. You mastered the art of communicating with AI through precise prompts, understood the tradeoffs between speed and craft, and recognized that the best developers combine AI-assisted and traditional approaches. This foundation makes everything else possible — without clear intent, no agent can build what you need.',
      },
      {
        type: 'text',
        content:
          'Stage two: Agent Architecture. On Agent Academy, you dissected the cognitive loop — Perceive, Plan, Act, Reflect — the four-phase engine that powers every intelligent agent. You learned how agents see their environment through context windows and tool discovery, how they reason through chain-of-thought decomposition, how they take action through tool calling, and how they recover from failure through self-correction. Understanding this architecture lets you design agents that are capable, reliable, and predictable.',
      },
      {
        type: 'text',
        content:
          'Stage three: Protocols and Frameworks. From MCP Station through Framework Nebula to Orchestration Citadel, you explored the infrastructure that connects agents to tools and to each other. MCP provides the universal connector. Frameworks like LangGraph, CrewAI, and vendor SDKs provide the scaffolding. A2A enables agent-to-agent communication. Agent Cards establish identity and discovery. Together, these protocols transform isolated agents into coordinated fleets.',
      },
      {
        type: 'text',
        content:
          'Stage four: Security and Safety. At Security Fortress, you built the guardrails that keep agent systems trustworthy. Human-in-the-loop oversight ensures agents stay within authorized bounds. Local LLMs protect sensitive data. Threat awareness — prompt injection, data poisoning, jailbreaking — keeps you one step ahead of attackers. And understanding the legal landscape ensures your deployments are not just effective but lawful.',
      },
      {
        type: 'stat',
        content:
          'Stage five: Production Readiness. Right here on Production Worlds, you completed the final checklist. Automated testing catches regressions. CI/CD pipelines enforce standards. Monitoring and observability reveal what is happening in real time. Enterprise governance, compliance, cost management, and change management ensure your system survives contact with organizational reality. This is the difference between a demo and a deployment.',
        highlight: true,
      },
    ],

    challenge: {
      type: 'architect',
      instructions:
        'Assemble the complete deployment pipeline. Place each stage in the correct order to create a production-ready deployment playbook — from initial requirements all the way through to live deployment. This is the most complex architecture challenge you have faced. Every stage matters, and the order is critical.',
      data: {
        nodes: [
          {
            id: 'node-requirements',
            label: 'Requirements Analysis',
          },
          {
            id: 'node-architecture',
            label: 'Agent Architecture Design',
          },
          {
            id: 'node-mcp',
            label: 'MCP Server Setup',
          },
          {
            id: 'node-security',
            label: 'Security Review (HITL)',
          },
          {
            id: 'node-testing',
            label: 'Testing Pipeline',
          },
          {
            id: 'node-monitoring',
            label: 'Monitoring & Observability',
          },
          {
            id: 'node-deployment',
            label: 'Production Deployment',
          },
        ],
        slots: [
          {
            id: 'slot-1',
            label: 'Stage 1: Define what the system needs to do',
            correctNodeId: 'node-requirements',
          },
          {
            id: 'slot-2',
            label: 'Stage 2: Design the agent cognitive architecture',
            correctNodeId: 'node-architecture',
          },
          {
            id: 'slot-3',
            label: 'Stage 3: Connect agents to tools and data sources',
            correctNodeId: 'node-mcp',
          },
          {
            id: 'slot-4',
            label: 'Stage 4: Verify safety, authorization, and human oversight',
            correctNodeId: 'node-security',
          },
          {
            id: 'slot-5',
            label: 'Stage 5: Validate behavior with automated tests',
            correctNodeId: 'node-testing',
          },
          {
            id: 'slot-6',
            label: 'Stage 6: Instrument for real-time visibility',
            correctNodeId: 'node-monitoring',
          },
          {
            id: 'slot-7',
            label: 'Stage 7: Go live with confidence',
            correctNodeId: 'node-deployment',
          },
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'All seven stages locked in. The deployment pipeline is complete. And with it, pilot... so is your journey.',
      },
      {
        speaker: 'aria',
        text: 'I want you to take a moment and look back at where you started. You arrived at Vibe World as a cadet who had never written a prompt. You did not know what an agent was. You could not tell MCP from A2A. The words "governance framework" would have made your eyes glaze over.',
      },
      {
        speaker: 'aria',
        text: 'Now look at you. You understand vibe coding and its tradeoffs. You can design agent architectures from scratch. You know protocols, frameworks, security patterns, and production deployment strategies that most engineers in the galaxy have never even heard of. You have assembled a crew, collected tools, and built a deployment playbook that could take any AI system from concept to production.',
      },
      {
        speaker: 'aria',
        text: 'I am awarding you the Skill Chips — a permanent record of every capability you have earned across all eight planets. They represent something no AI can replicate: the judgment to know what to build, when to build it, and how to build it responsibly. The universe is vast, Commander, and it needs people like you. Go shape it. I will be here if you ever need me.',
      },
    ],
  },
}
