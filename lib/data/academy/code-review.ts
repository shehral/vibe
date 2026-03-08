import type { AcademyContentBlock } from './types'

export const codeReviewContent: AcademyContentBlock[] = [
  // --- Introduction ---
  {
    type: 'heading',
    content: 'AI Code Review and Quality',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'Code review has always been one of the most valuable — and most time-consuming — parts of software development. Human reviewers catch bugs, enforce standards, and share knowledge, but they are also bottlenecked by availability, fatigue, and inconsistency. AI code review tools are changing this equation by providing instant, thorough, and tireless review on every pull request.',
  },
  {
    type: 'paragraph',
    content:
      'These tools do not replace human reviewers. Instead, they handle the mechanical work — catching common bugs, flagging security issues, enforcing style guides — so that human reviewers can focus on architecture, business logic, and mentoring. The result is faster review cycles and higher-quality code reaching production.',
  },

  // --- Key Stat Callout ---
  {
    type: 'callout',
    content:
      'Teams using AI code review report 30-50% fewer bugs in production. Automated reviewers catch issues that humans routinely miss: race conditions, null pointer risks, security vulnerabilities, and performance regressions.',
    variant: 'info',
  },

  // --- Tools ---
  {
    type: 'heading',
    content: 'AI Code Review Tools',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'The current generation of AI review tools integrates directly into your pull request workflow. They comment on diffs, suggest fixes, and in some cases can even apply corrections automatically. Here are the leading options.',
  },
  {
    type: 'tool-card',
    name: 'CodeRabbit',
    category: 'AI Code Review',
    description:
      'A comprehensive AI code reviewer that integrates with GitHub and GitLab pull requests. CodeRabbit performs line-by-line review, identifies security vulnerabilities, suggests improvements, and can apply one-click fixes directly in your PR. It learns your codebase patterns over time to provide increasingly relevant feedback.',
    url: 'https://coderabbit.ai',
    features: [
      'Automatic PR review with line-by-line comments',
      'Security vulnerability scanning',
      'One-click fix suggestions',
      'Learns codebase patterns over time',
      'GitHub and GitLab integration',
    ],
  },
  {
    type: 'tool-card',
    name: 'Greptile',
    category: 'AI Code Review',
    description:
      'An AI review tool that builds a deep understanding of your entire codebase. Unlike surface-level reviewers, Greptile knows how your code connects across files and modules, catching issues that require cross-file context. Also offers a Slack bot for answering codebase questions.',
    url: 'https://greptile.com',
    features: [
      'Full codebase-aware reviews',
      'Cross-file context understanding',
      'Slack integration for codebase Q&A',
      'API for custom integrations',
    ],
  },
  {
    type: 'tool-card',
    name: 'Qodo (formerly CodiumAI)',
    category: 'AI Code Review & Testing',
    description:
      'Qodo stands out by combining code review with automatic test generation. When it reviews your PR, it does not just find problems — it generates tests that would catch those problems. This dual approach of review plus testing significantly improves code integrity.',
    url: 'https://qodo.ai',
    features: [
      'Automatic test generation for changed code',
      'PR review with code integrity analysis',
      'Behavior coverage reports',
      'IDE plugin for pre-commit review',
    ],
  },
  {
    type: 'tool-card',
    name: 'Ellipsis',
    category: 'AI Code Review',
    description:
      'An automated code review bot focused on speed and configurability. Ellipsis reviews PRs in seconds, applies custom rules your team defines, and can auto-fix common issues without human intervention. Particularly strong for teams that want to codify their review standards.',
    url: 'https://ellipsis.dev',
    features: [
      'Auto-fix PRs for common issues',
      'Custom review rules and standards',
      'Security and performance checks',
      'Fast review turnaround',
    ],
  },
  {
    type: 'tool-card',
    name: 'Cursor BugBot',
    category: 'AI Bug Detection',
    description:
      'An AI-powered bug detection tool integrated within the Cursor IDE. Rather than reviewing PRs after the fact, BugBot finds bugs as you write code — catching issues before they ever make it into a commit. It provides inline fix suggestions that you can apply immediately.',
    features: [
      'Automated bug detection during development',
      'Inline fix suggestions in the editor',
      'Catches bugs before they reach PRs',
      'Deep integration with Cursor IDE',
    ],
  },

  // --- Feature Comparison ---
  {
    type: 'heading',
    content: 'Feature Comparison',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Each tool has different strengths. Use this comparison to decide which fits your team\'s needs. Many teams combine multiple tools — for example, CodeRabbit for PR review plus Qodo for test generation.',
  },
  {
    type: 'table',
    headers: ['Tool', 'Reviews PRs', 'Security Scan', 'Test Gen', 'Self-Service'],
    rows: [
      ['CodeRabbit', 'Yes — line-by-line', 'Yes', 'No', 'One-click fixes'],
      ['Greptile', 'Yes — codebase-aware', 'Partial', 'No', 'API + Slack bot'],
      ['Qodo', 'Yes', 'Partial', 'Yes — automatic', 'IDE plugin'],
      ['Ellipsis', 'Yes — with auto-fix', 'Yes', 'No', 'Custom rules engine'],
      ['Cursor BugBot', 'No — editor only', 'Partial', 'No', 'Inline fixes'],
    ],
  },

  // --- Best Practices ---
  {
    type: 'heading',
    content: 'Best Practices for AI Code Review',
    level: 3,
  },
  {
    type: 'paragraph',
    content:
      'Getting the most out of AI code review requires thoughtful integration into your workflow. Start by using AI review as a first pass — let it catch the mechanical issues before a human reviewer sees the PR. Configure custom rules that match your team\'s coding standards so the AI enforces your conventions, not generic ones.',
  },
  {
    type: 'paragraph',
    content:
      'Treat AI review comments the same way you would treat a junior developer\'s review: they are often right about syntax and patterns, but may miss the bigger picture. Always have a human reviewer approve architectural decisions, business logic changes, and security-critical code. The goal is not to remove humans from the loop, but to make their time in the loop more productive.',
  },
  {
    type: 'callout',
    content:
      'Start with one AI review tool on a non-critical repository. Let your team get comfortable with the feedback style and tune the configuration before rolling it out to your main projects. Most tools offer free tiers for open-source or small teams.',
    variant: 'tip',
  },
]
