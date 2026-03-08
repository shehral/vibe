import type { AcademyContentBlock } from './types'

export const noCodeContent: AcademyContentBlock[] = [
  {
    type: 'heading',
    content: 'No-Code / Low-Code Builders',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'The line between "developer" and "non-developer" is dissolving. A new generation of AI-powered builders lets anyone describe an app in plain language and get a working, deployable product in minutes. These platforms handle the scaffolding, hosting, and even database setup — you just describe what you want. Whether you are prototyping a startup idea, building an internal tool, or learning how web apps work, no-code and low-code builders are the fastest path from idea to live product.',
  },
  {
    type: 'callout',
    content:
      'No-code builders can generate production apps in minutes, but understanding the generated code is crucial for maintenance. Treat them as accelerators, not replacements for learning fundamentals.',
    variant: 'info',
  },
  {
    type: 'heading',
    content: 'The Platforms',
    level: 3,
  },
  {
    type: 'tool-card',
    name: 'Replit',
    category: 'No-Code Builder',
    description:
      'Browser-based IDE that generates and deploys full-stack applications from natural language prompts. Replit Agent can scaffold entire projects, install dependencies, and deploy — all without leaving the browser.',
    url: 'https://replit.com',
    features: [
      'Agent mode for end-to-end app generation',
      'Instant deployment with custom domains',
      'Multiplayer editing for real-time collaboration',
      'Built-in database and hosting',
      'Supports 50+ programming languages',
    ],
  },
  {
    type: 'tool-card',
    name: 'Bolt.new',
    category: 'No-Code Builder',
    description:
      'StackBlitz\'s AI-powered app builder that runs a full development environment in the browser using WebContainers. Describe your app in a prompt, watch it build in real time, then deploy with one click.',
    url: 'https://bolt.new',
    features: [
      'Full-stack apps generated from natural language',
      'Instant in-browser preview with hot reload',
      'One-click deployment to Netlify or Vercel',
      'WebContainer technology — no remote server needed',
      'Iterative refinement through follow-up prompts',
    ],
  },
  {
    type: 'tool-card',
    name: 'Lovable',
    category: 'No-Code Builder',
    description:
      'AI app builder with a design-first philosophy. Lovable prioritizes beautiful, polished UI out of the box and integrates directly with Supabase for backend functionality including auth, databases, and storage.',
    url: 'https://lovable.dev',
    features: [
      'Design-first approach with polished default UI',
      'Native Supabase integration for auth and data',
      'Real-time preview as code generates',
      'GitHub sync for version control',
      'Custom domain deployment',
    ],
  },
  {
    type: 'tool-card',
    name: 'v0 by Vercel',
    category: 'UI Component Generator',
    description:
      'AI-powered UI component generator from Vercel. Describe a component or page layout in natural language and get production-ready React/Next.js code using shadcn/ui and Tailwind CSS. Perfect for generating individual components rather than entire apps.',
    url: 'https://v0.dev',
    features: [
      'Generates React and Next.js components from prompts',
      'Built on shadcn/ui component library',
      'Tailwind CSS styling out of the box',
      'One-click code export to your project',
      'Iterative refinement with conversational UI',
    ],
  },
  {
    type: 'heading',
    content: 'Platform Comparison',
    level: 3,
  },
  {
    type: 'table',
    headers: ['Platform', 'Best For', 'Backend', 'Deploy'],
    rows: [
      ['Replit', 'Full apps, prototypes, learning', 'Built-in DB, any backend', 'Instant (Replit hosting)'],
      ['Bolt.new', 'Full-stack apps, rapid iteration', 'Node.js via WebContainers', 'Netlify, Vercel'],
      ['Lovable', 'Beautiful UI apps, SaaS MVPs', 'Supabase (Postgres, Auth)', 'Custom domains'],
      ['v0', 'UI components, design systems', 'None (frontend only)', 'Code export to project'],
    ],
  },
  {
    type: 'heading',
    content: 'When to Use No-Code vs. Code',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'No-code builders excel at speed: prototyping ideas, building MVPs, creating internal tools, and generating UI components. They are the right choice when time-to-market matters more than architectural control. However, as projects grow in complexity — custom business logic, performance-critical paths, complex state management, or team-scale codebases — you will need to transition to a code-first workflow. The sweet spot is often a hybrid approach: use no-code to generate the initial scaffolding and UI, then take ownership of the codebase with traditional development tools.',
  },
  {
    type: 'paragraph',
    content:
      'Consider no-code when: you need a working demo in hours, you are validating a product idea, the app is mostly CRUD operations, or you want to generate UI components quickly. Switch to code-first when: you need custom algorithms, your app has complex real-time features, you require fine-grained performance optimization, or your team needs full version control and CI/CD workflows.',
  },
  {
    type: 'callout',
    content:
      'No-code platforms handle the common 80% well, but the remaining 20% — custom integrations, edge-case logic, performance tuning — often requires dropping into real code. Plan for this transition from the start rather than hitting a wall later.',
    variant: 'warning',
  },
]
