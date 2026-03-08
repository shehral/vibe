import type { MissionContent, DialogueNode, LearningBlock, ChallengeData } from '@/lib/types'

// ---------------------------------------------------------------------------
// Vibe World — Act 1: Introduction to Vibe Coding
// 4 missions covering the origins, practice, speed, and philosophy of vibe coding
// ---------------------------------------------------------------------------

export const vibeWorldContent: Record<string, MissionContent> = {
  // =========================================================================
  // Mission 1: "First Words" — What is vibe coding?
  // =========================================================================
  'vibe-world-m1': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Welcome aboard, pilot. I am ARIA, your onboard AI companion. Before we chart any coordinates, there is something you need to understand about how this ship was built.',
      },
      {
        speaker: 'aria',
        text: 'This vessel was not constructed line by line in some orbital shipyard. It was spoken into existence. A human described what they wanted, and an AI wrote the code. That process has a name.',
      },
      {
        speaker: 'aria',
        text: 'It is called vibe coding — and it is changing how software gets built across every system in the known galaxy. Let me walk you through it.',
      },
      {
        speaker: 'aria',
        text: 'Pay close attention to the briefing materials ahead. There will be a short assessment at the end to make sure the concepts have landed. Ready when you are, pilot.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Vibe coding is a style of software development where you describe what you want in natural language and let an AI model generate the code. Instead of writing syntax yourself, you guide the AI with prompts, review what it produces, and iterate until the result matches your vision.',
      },
      {
        type: 'stat',
        content:
          'The term "vibe coding" was coined by Andrej Karpathy in February 2025. Karpathy, a founding member of OpenAI and former head of AI at Tesla, described it as "fully giving in to the vibes" and letting the AI handle the implementation details.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'The core loop is simple: describe your intent, review the generated code, provide feedback, and repeat. You do not need to memorize syntax or APIs — the AI handles that. Your job is to think clearly about what you want and communicate it well.',
      },
      {
        type: 'text',
        content:
          'Key principles of vibe coding: start with clear intent, iterate in small steps, trust the AI for boilerplate but verify the logic, and always keep a mental model of what the system should do — even if you did not write every line yourself.',
      },
    ],

    challenge: {
      type: 'dialogue',
      instructions:
        'Answer the following questions about vibe coding to demonstrate your understanding. Choose the best answer for each question.',
      data: {
        nodes: [
          {
            speaker: 'aria',
            text: 'Let us start with the basics. What is vibe coding?',
            choices: [
              {
                text: 'Writing code by describing what you want in natural language and letting AI generate it',
                correct: true,
                response:
                  'Exactly right. Vibe coding is about communicating intent and letting the AI handle the syntax and implementation.',
              },
              {
                text: 'A new programming language designed for AI systems',
                correct: false,
                response:
                  'Not quite. Vibe coding is not a language — it is a development style where you use natural language prompts to have AI write code in any language.',
              },
              {
                text: 'An AI that replaces developers entirely',
                correct: false,
                response:
                  'That is a common misconception. Vibe coding still requires a human to define intent, review output, and guide the process. The developer role shifts, but it does not disappear.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Who coined the term "vibe coding" and when?',
            choices: [
              {
                text: 'Andrej Karpathy in February 2025',
                correct: true,
                response:
                  'Correct. Karpathy described it as fully surrendering to the vibes and letting the AI take the wheel on implementation.',
              },
              {
                text: 'Sam Altman in 2024',
                correct: false,
                response:
                  'Not quite. While Sam Altman leads OpenAI, it was Andrej Karpathy — a co-founder of OpenAI — who coined the term in February 2025.',
              },
              {
                text: 'It emerged organically from the developer community in 2023',
                correct: false,
                response:
                  'The practice existed before the name, but the specific term "vibe coding" was coined by Andrej Karpathy in a February 2025 post that went viral.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'What is the core loop of vibe coding?',
            choices: [
              {
                text: 'Write code, compile, debug, deploy',
                correct: false,
                response:
                  'That is the traditional development loop. Vibe coding replaces the "write code" step with "describe intent" and adds AI generation into the cycle.',
              },
              {
                text: 'Describe intent, review AI output, provide feedback, iterate',
                correct: true,
                response:
                  'That is the loop. You communicate what you want, the AI generates code, you review it, and you refine until it matches your vision.',
              },
              {
                text: 'Copy code from the internet and modify it',
                correct: false,
                response:
                  'That is closer to traditional copy-paste development. Vibe coding uses AI to generate original code from your natural language descriptions.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'In vibe coding, what is the developer primarily responsible for?',
            choices: [
              {
                text: 'Memorizing syntax and API documentation',
                correct: false,
                response:
                  'One of the advantages of vibe coding is that the AI handles syntax and API details. The developer focuses on higher-level concerns.',
              },
              {
                text: 'Thinking clearly about intent and communicating it effectively',
                correct: true,
                response:
                  'Precisely. Your most important skill becomes the ability to articulate what you want and evaluate whether the result meets that vision.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Which of these is a key principle of vibe coding?',
            choices: [
              {
                text: 'Trust the AI completely and never review the generated code',
                correct: false,
                response:
                  'Blind trust is dangerous. Good vibe coders always review AI output, especially the logic and architecture. Trust the boilerplate, verify the thinking.',
              },
              {
                text: 'Always keep a mental model of what the system should do, even if you did not write every line',
                correct: true,
                response:
                  'Exactly. You are the architect even when the AI is the builder. Understanding your system at a conceptual level is essential for catching errors and guiding iteration.',
              },
              {
                text: 'Avoid giving the AI any context about the project',
                correct: false,
                response:
                  'The opposite is true. The more context you give the AI — project structure, constraints, goals — the better the generated code will be.',
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
        text: 'Well done, pilot. You have a solid grasp of the fundamentals. Vibe coding is not about replacing skill — it is about amplifying it. The better you understand what you want, the better the AI can build it for you.',
      },
      {
        speaker: 'aria',
        text: 'I have unlocked the Ship Voice Module for your inventory. It is a tool that lets you speak commands to your vessel in natural language — fitting, given what you just learned. Now, let us put this knowledge into practice.',
      },
    ],
  },

  // =========================================================================
  // Mission 2: "See It, Say It, Run It" — Writing your first prompt
  // =========================================================================
  'vibe-world-m2': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Now that you understand the concept, it is time to get hands-on. Vibe coding lives and dies by the quality of your prompts. A vague prompt produces vague code. A precise prompt produces something you can actually use.',
      },
      {
        speaker: 'aria',
        text: 'Think of a prompt like a set of navigation coordinates. The more precise your coordinates, the closer you land to your destination. Let me show you what makes a prompt effective.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'A good vibe-coding prompt has three elements: context (what the project is and what already exists), intent (what you want to build or change), and constraints (technology choices, style preferences, or limitations). The more specific you are, the less you need to iterate.',
      },
      {
        type: 'code',
        content:
          'Weak prompt: "Make a todo app."\n\nStrong prompt: "Build a simple todo app with React and TypeScript. It should have an input field to add new tasks, a list that displays all tasks, a way to mark tasks as complete with a checkbox, and a delete button to remove tasks from the list. Use a clean minimal design."',
      },
      {
        type: 'text',
        content:
          'Specificity is your best tool. Instead of saying "make it look nice," describe the visual style you want. Instead of saying "add some features," list exactly which features matter. The AI cannot read your mind, but it can follow detailed instructions with remarkable precision.',
      },
      {
        type: 'stat',
        content:
          'Studies show that adding specific requirements to a prompt can improve AI code output accuracy by 40-60% compared to vague, open-ended requests. Precision pays off.',
        highlight: true,
      },
    ],

    challenge: {
      type: 'prompt-duel',
      instructions:
        'Write a prompt that instructs an AI to build a simple todo application. Your prompt should mention the core features: adding todos, displaying a list, completing tasks, and deleting them. Be specific and clear in your instructions.',
      data: {
        scenario:
          'You need a simple todo application. Write a prompt for an AI coding assistant that describes what to build. Include the key features: the ability to add new todo items, display them in a list, mark them as complete, and delete items you no longer need.',
        requiredConcepts: [
          'todo',
          'add',
          'delete',
          'list',
          'complete',
          'task',
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Good work, pilot. You wrote a prompt that an AI could actually act on. Notice how naming specific features — add, delete, complete, list — gives the AI clear targets to implement.',
      },
      {
        speaker: 'aria',
        text: 'Remember: the best prompts are conversations, not commands. You will iterate, refine, and build up complexity over time. Nobody writes the perfect prompt on the first try, and that is perfectly fine.',
      },
    ],
  },

  // =========================================================================
  // Mission 3: "The Prototype Sprint" — Speed vs. craft
  // =========================================================================
  'vibe-world-m3': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Pilot, I have a scenario for you. Imagine a distress signal comes in — a colony needs a weather monitoring system within the hour. No time for architecture reviews or code style debates. You need something working, fast.',
      },
      {
        speaker: 'aria',
        text: 'This is where vibe coding truly shines: rapid prototyping. But speed has consequences. Let us explore the tradeoffs before you start building.',
      },
      {
        speaker: 'aria',
        text: 'After the briefing, you will write a prompt to quickly spin up a weather dashboard. Speed and clarity are both essential here.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Rapid prototyping with vibe coding can compress days of work into hours. By describing a complete feature set in natural language, you skip the boilerplate and get straight to a working prototype. This is ideal for validating ideas, building demos, and testing assumptions.',
      },
      {
        type: 'stat',
        content:
          'Developers using AI coding tools report building prototypes 3-10x faster than traditional development. One Y Combinator founder built an entire MVP in a single weekend using only prompts.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Speed matters most in three scenarios: exploring whether an idea works at all, building a demo to get stakeholder buy-in, and responding to urgent needs where "good enough now" beats "perfect later." In these cases, vibe coding is a superpower.',
      },
      {
        type: 'text',
        content:
          'But speed has hidden costs. AI-generated prototypes often lack proper error handling, have inconsistent patterns, skip edge cases, and accumulate technical debt. A prototype built in an hour might take days to refactor into production-quality code. Knowing when to prioritize speed and when to slow down is a critical skill.',
      },
    ],

    challenge: {
      type: 'prompt-duel',
      instructions:
        'Write a prompt to quickly build a weather dashboard. Your prompt should describe the key components: fetching weather data from an API, displaying current temperature, showing a forecast, and presenting it all in a dashboard layout. Be specific about what information to display.',
      data: {
        scenario:
          'A remote colony needs a weather monitoring dashboard as soon as possible. Write a prompt for an AI assistant to quickly build one. It needs to pull weather data from an API, display the current temperature and conditions, show a multi-day forecast, and present everything in a clean dashboard layout.',
        requiredConcepts: [
          'weather',
          'api',
          'temperature',
          'dashboard',
          'display',
          'forecast',
          'current',
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Nice work, pilot. You described a functional dashboard clearly enough for an AI to build it quickly. In a real scenario, you could have a working prototype in minutes from a prompt like that.',
      },
      {
        speaker: 'aria',
        text: 'Just remember: a prototype is a starting point, not a finish line. The best vibe coders know when to sprint and when to slow down for quality. Speed gets you to the idea — craft gets you to the product.',
      },
    ],
  },

  // =========================================================================
  // Mission 4: "Traditional vs. Vibe" — Two paradigms
  // =========================================================================
  'vibe-world-m4': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Before we leave Vibe World, there is one more important lesson. You have seen what vibe coding can do, but it is not the only way to build software. Traditional development — writing code by hand, line by line — has been the standard for decades.',
      },
      {
        speaker: 'aria',
        text: 'Some pilots swear by the traditional approach. Others have gone all-in on vibe coding. The truth, as usual, lies somewhere in between. Let us examine both paradigms honestly.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Traditional development gives you explicit control over every line of code. You understand exactly what your system does because you wrote it yourself. This leads to deeper comprehension, more predictable behavior, and code that is often more maintainable in the long run.',
      },
      {
        type: 'text',
        content:
          'Vibe coding offers faster iteration, lower barriers to entry, and the ability to leverage AI knowledge across languages and frameworks you may not have mastered. It makes software creation accessible to people who think in solutions rather than syntax.',
      },
      {
        type: 'stat',
        content:
          'In a 2025 industry survey, 73% of professional developers reported using AI coding assistants regularly. However, the most productive developers combined AI-assisted and manual coding rather than relying solely on either approach.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'The sweet spot is knowing when to use each approach. Vibe coding excels at boilerplate, prototypes, exploring unfamiliar APIs, and generating first drafts. Traditional coding shines in performance-critical paths, security-sensitive logic, complex algorithms, and systems where you need absolute certainty about behavior.',
      },
    ],

    challenge: {
      type: 'dialogue',
      instructions:
        'Answer these questions about when to use traditional development versus vibe coding. Understanding the strengths of each approach is key to becoming an effective modern developer.',
      data: {
        nodes: [
          {
            speaker: 'aria',
            text: 'A startup founder with no coding experience wants to validate a business idea quickly. Which approach is better suited for this scenario?',
            choices: [
              {
                text: 'Vibe coding — they can describe their vision and get a working prototype without learning to code first',
                correct: true,
                response:
                  'Exactly. Vibe coding lowers the barrier to entry and lets non-technical founders test ideas quickly. Speed of validation matters more than code quality at this stage.',
              },
              {
                text: 'Traditional development — they should learn to code properly before building anything',
                correct: false,
                response:
                  'While learning to code has value, requiring it before validating a business idea adds months of delay. Vibe coding lets founders test ideas first and invest in deeper skills once the concept is proven.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'You are building the authentication system for a banking application that handles sensitive financial data. Which approach should you favor?',
            choices: [
              {
                text: 'Vibe coding — AI can generate security code faster than writing it by hand',
                correct: false,
                response:
                  'Security-critical code demands deep understanding of every line. AI-generated auth code might contain subtle vulnerabilities. This is where traditional development and expert review are essential.',
              },
              {
                text: 'Traditional development — security-critical code needs explicit human control and review',
                correct: true,
                response:
                  'Correct. When security and data integrity are at stake, you need to understand every line of code. AI can help draft initial implementations, but human expertise must verify and control the final result.',
              },
              {
                text: 'Either approach works equally well for security',
                correct: false,
                response:
                  'Security is one area where the approaches are not equal. Traditional development gives you the explicit control and deep understanding needed to catch subtle vulnerabilities that AI might introduce.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'What did the 2025 industry survey reveal about the most productive developers?',
            choices: [
              {
                text: 'They exclusively used vibe coding and avoided writing code manually',
                correct: false,
                response:
                  'Pure vibe coding has limitations. The survey found that combining approaches — using AI where it excels and manual coding where precision matters — produced the best results.',
              },
              {
                text: 'They combined AI-assisted and manual coding rather than relying solely on either approach',
                correct: true,
                response:
                  'That is the key insight. The best developers treat vibe coding and traditional development as complementary tools, choosing the right approach for each situation.',
              },
              {
                text: 'They rejected AI tools entirely and only coded by hand',
                correct: false,
                response:
                  'With 73% of developers using AI tools regularly, rejecting them entirely means missing out on significant productivity gains for appropriate tasks.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'Which of these tasks is vibe coding particularly well-suited for?',
            choices: [
              {
                text: 'Writing a performance-critical algorithm that must execute in under 1 millisecond',
                correct: false,
                response:
                  'Performance-critical code often requires hand-tuned optimizations and deep understanding of memory, CPU caches, and algorithmic complexity. Traditional development gives you the control needed here.',
              },
              {
                text: 'Generating boilerplate code, exploring unfamiliar APIs, and building first drafts',
                correct: true,
                response:
                  'These are the sweet spots for vibe coding. Repetitive patterns, API exploration, and initial drafts are where AI generation saves the most time without significant risk.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'What is the most important takeaway about traditional vs. vibe coding?',
            choices: [
              {
                text: 'One approach is strictly better than the other',
                correct: false,
                response:
                  'Neither approach is universally better. Each has clear strengths in different contexts. The modern developer needs to be fluent in both.',
              },
              {
                text: 'Vibe coding will completely replace traditional development within a few years',
                correct: false,
                response:
                  'While AI tools are rapidly improving, there will always be domains where human-written, deeply understood code is essential. The two approaches are converging, not replacing each other.',
              },
              {
                text: 'Both have distinct strengths, and the best developers know when to use each one',
                correct: true,
                response:
                  'That is the signal, pilot. Mastery is not about choosing sides — it is about reading the situation and applying the right approach. That flexibility is what separates good developers from great ones.',
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
        text: 'You have completed the full curriculum for Vibe World, pilot. You now understand what vibe coding is, how to write effective prompts, the power of rapid prototyping, and when to combine AI-assisted development with traditional approaches.',
      },
      {
        speaker: 'aria',
        text: 'These are the coordinates you will need for the rest of your journey. Every planet ahead will build on these foundations — from the hidden costs of AI-generated code to the architecture of autonomous agents.',
      },
      {
        speaker: 'aria',
        text: 'Set course for the Debt Asteroid Belt when you are ready. The vibes are strong, pilot, but the universe has a few hard truths waiting for you out there.',
      },
    ],
  },
}
