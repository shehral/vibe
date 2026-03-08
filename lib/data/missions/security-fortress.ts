import type { MissionContent, DialogueNode, LearningBlock, ChallengeData } from '@/lib/types'

// ---------------------------------------------------------------------------
// Security Fortress — Act 3: AI Security, Safety & Legal
// 4 missions covering HITL safety, local LLMs, security threats, and AI law
// ---------------------------------------------------------------------------

export const securityFortressContent: Record<string, MissionContent> = {
  // =========================================================================
  // Mission 1: "The Safety Net" — Human-in-the-loop safety systems
  // =========================================================================
  'security-fortress-m1': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Welcome to the Security Fortress, pilot. This is the most heavily defended installation in the system, and for good reason. Everything we have built so far — agents, tools, orchestration — is powerful. But power without safeguards is a breach waiting to happen.',
      },
      {
        speaker: 'aria',
        text: 'Our first priority is establishing the fortress perimeter: human-in-the-loop safety systems. These are the shields that keep autonomous agents within authorized bounds. No agent should be able to take high-stakes action without a human approving it first.',
      },
      {
        speaker: 'aria',
        text: 'There is someone here who specializes in exactly this kind of defensive architecture. Mirror — a reflection and testing specialist who believes every system should question itself before acting. Complete this mission and Mirror will join our crew.',
      },
      {
        speaker: 'aria',
        text: 'Study the defensive protocols carefully, then build a HITL approval flowchart to prove you understand how the sentinel system works. The fortress does not open its gates to the unprepared.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Human-in-the-loop (HITL) is a safety pattern where autonomous systems pause at critical decision points and require explicit human approval before proceeding. In the context of AI agents, this means an agent can research, plan, and draft actions — but certain operations are gated behind human review. The human is the final checkpoint, the sentinel at the gate.',
      },
      {
        type: 'stat',
        content:
          'According to a 2025 NIST AI Risk Management Framework report, systems with HITL checkpoints reduced unauthorized AI actions by 94% compared to fully autonomous deployments. The fortress is only as strong as its gates.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Approval workflows typically operate at multiple levels. Low-risk actions (reading public data, generating summaries) can be auto-approved. Medium-risk actions (sending emails, modifying files) may require a quick confirmation. High-risk actions (deploying code, accessing sensitive data, financial transactions) demand full human review with context and justification before execution.',
      },
      {
        type: 'text',
        content:
          'Risk-based escalation is the key to making HITL practical. If every action required human approval, the system would grind to a halt. Instead, a risk assessment engine evaluates each requested action against predefined policies — considering factors like scope of impact, reversibility, data sensitivity, and cost — then routes it to the appropriate level of oversight. Every action, regardless of approval path, is recorded in an audit log for accountability.',
      },
    ],

    challenge: {
      type: 'architect',
      instructions:
        'Arrange the components of a Human-in-the-Loop approval system into the correct flowchart order. Each slot represents a stage in the HITL pipeline — place the right component in each position to build a functional sentinel defense system.',
      data: {
        nodes: [
          { id: 'node-1', label: 'Agent Request' },
          { id: 'node-2', label: 'Risk Assessment' },
          { id: 'node-3', label: 'Auto-Approve (Low Risk)' },
          { id: 'node-4', label: 'Human Review (High Risk)' },
          { id: 'node-5', label: 'Execute Action' },
          { id: 'node-6', label: 'Audit Log' },
        ],
        slots: [
          {
            id: 'slot-1',
            label: 'Step 1: The agent initiates an action',
            correctNodeId: 'node-1',
          },
          {
            id: 'slot-2',
            label: 'Step 2: Evaluate the risk level of the request',
            correctNodeId: 'node-2',
          },
          {
            id: 'slot-3',
            label: 'Step 3a: Low-risk actions pass through automatically',
            correctNodeId: 'node-3',
          },
          {
            id: 'slot-4',
            label: 'Step 3b: High-risk actions require human sentinel review',
            correctNodeId: 'node-4',
          },
          {
            id: 'slot-5',
            label: 'Step 4: Approved actions are carried out',
            correctNodeId: 'node-5',
          },
          {
            id: 'slot-6',
            label: 'Step 5: Every action is recorded for accountability',
            correctNodeId: 'node-6',
          },
        ],
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'The fortress gates recognize your work, pilot. You have mapped out a HITL system that balances autonomy with safety — auto-approving what is low-risk, escalating what is not, and logging everything. That is how you build a defense that does not slow the mission down.',
      },
      {
        speaker: 'aria',
        text: 'And as promised, Mirror has joined our crew. Mirror is our reflection specialist — trained to question every action, test every assumption, and ensure our agents do not overstep their bounds. With Mirror aboard, our ship has its own internal sentinel.',
      },
      {
        speaker: 'aria',
        text: 'I have also added the Security Shield to your inventory. It represents the HITL frameworks you now understand — tools like approval gates, risk scoring, and audit trails that keep AI systems accountable. The fortress perimeter holds.',
      },
    ],
  },

  // =========================================================================
  // Mission 2: "Local Defenses" — Local LLMs with Ollama
  // =========================================================================
  'security-fortress-m2': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Pilot, the fortress has an inner sanctum — a secure vault where the most sensitive data is processed. No signal leaves this room. No external network touches it. Everything runs locally, behind our own shields.',
      },
      {
        speaker: 'aria',
        text: 'In the real world, this means running language models on your own hardware instead of sending data to cloud APIs. When you process medical records, financial data, or proprietary code, you do not want that information crossing the perimeter.',
      },
      {
        speaker: 'aria',
        text: 'Ollama is a tool that makes running local LLMs straightforward. Let me brief you on when and why to keep your models behind the fortress walls.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Ollama is an open-source tool that lets you download and run large language models locally on your own machine. Instead of sending prompts to a cloud API like OpenAI or Anthropic, you run the model entirely on your hardware. The data never leaves your system — it stays behind your fortress walls.',
      },
      {
        type: 'stat',
        content:
          'A 2025 study found that 67% of enterprise AI data breaches involved sensitive information being transmitted to third-party AI services. Local inference eliminates this attack vector entirely. Your data, your fortress, your rules.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Privacy is the primary advantage, but there are tradeoffs. Local models are typically smaller than cloud-hosted ones (7B-70B parameters vs. hundreds of billions), which means they may produce less sophisticated output. They also require significant hardware — a decent GPU with enough VRAM to hold the model in memory. Inference speed depends on your hardware rather than network latency.',
      },
      {
        type: 'text',
        content:
          'The strategic question is: when should you keep defenses local vs. relying on cloud? Use local models when processing personally identifiable information (PII), healthcare data (HIPAA), financial records, proprietary source code, or anything covered by data residency regulations. Use cloud models when working with public data, when you need the highest quality output, or when the data carries no sensitivity risk. Many production systems use a hybrid approach — routing requests to local or cloud models based on data classification.',
      },
    ],

    challenge: {
      type: 'dialogue',
      instructions:
        'Evaluate each scenario and decide whether local LLM inference or cloud API inference is more appropriate. Think about data sensitivity, privacy requirements, and performance needs.',
      data: {
        nodes: [
          {
            speaker: 'aria',
            text: 'A hospital needs to process patient records and generate clinical summaries from doctor notes. The data includes names, diagnoses, and treatment plans. Which approach should they use?',
            choices: [
              {
                text: 'Local LLM — patient health data should never leave the hospital network',
                correct: true,
                response:
                  'Correct. Healthcare data falls under HIPAA and similar regulations. Processing it through a cloud API would mean transmitting protected health information outside the organization, which is both a legal and ethical risk. Local inference keeps patient data behind the fortress walls.',
              },
              {
                text: 'Cloud API — cloud models produce better summaries',
                correct: false,
                response:
                  'While cloud models may be more capable, the sensitivity of patient health data makes this a clear case for local processing. HIPAA compliance and patient privacy take priority over output quality. You would not send medical records through an external service.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'A developer wants to generate documentation for an open-source library that is already publicly available on GitHub. Which approach makes sense?',
            choices: [
              {
                text: 'Local LLM — always keep everything local for maximum security',
                correct: false,
                response:
                  'This is over-engineering the defense. The code is already public, so there is no data sensitivity concern. Using a cloud API here gives you access to more capable models without any privacy risk. Not every wall needs to be a fortress wall.',
              },
              {
                text: 'Cloud API — the data is already public, so cloud inference is fine and likely higher quality',
                correct: true,
                response:
                  'Exactly right. Since the source code is already publicly available, there is no privacy concern with sending it to a cloud model. You get better output quality without any additional risk. Good security means proportional defense, not maximum defense everywhere.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'A fintech startup is building an AI assistant that analyzes user bank transactions and spending patterns to provide financial advice. Which deployment model fits?',
            choices: [
              {
                text: 'Cloud API — startups need to move fast and cloud models are easier to deploy',
                correct: false,
                response:
                  'Speed matters, but bank transaction data is highly sensitive financial information. Sending it to a cloud API creates regulatory risk (SOC 2, PCI-DSS) and could expose users to data breaches. Financial data stays behind the perimeter.',
              },
              {
                text: 'Local LLM — financial transaction data is sensitive and subject to regulatory requirements',
                correct: true,
                response:
                  'Correct. Bank transactions, spending patterns, and financial data are subject to strict regulations. Running inference locally means user financial data never leaves the controlled environment. The startup can still use cloud APIs for non-sensitive tasks like generating marketing copy.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'What is a major tradeoff of running models locally with Ollama compared to cloud APIs?',
            choices: [
              {
                text: 'Local models require significant hardware and are typically smaller, producing less sophisticated output',
                correct: true,
                response:
                  'That is the core tradeoff. Local models need a capable GPU and enough VRAM, and the models you can run locally (7B-70B parameters) are generally less powerful than the largest cloud-hosted models. You trade raw capability for data sovereignty.',
              },
              {
                text: 'Local models are always slower than cloud APIs',
                correct: false,
                response:
                  'Not necessarily. Local inference eliminates network latency, so for smaller models on good hardware, local can actually be faster than cloud. The real tradeoff is model size and capability — local models are typically smaller and less capable than the largest cloud offerings.',
              },
              {
                text: 'Local models cannot be fine-tuned',
                correct: false,
                response:
                  'Actually, one advantage of local models is that you can fine-tune them on your own data without sending that data anywhere. The real tradeoff is hardware requirements and model size limitations.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'A company wants to use AI to summarize internal meeting transcripts that contain discussion of unreleased product features and competitive strategy. What is the best approach?',
            choices: [
              {
                text: 'Cloud API with enterprise agreement — the enterprise contract provides sufficient protection',
                correct: false,
                response:
                  'Enterprise agreements help, but competitive strategy and unreleased product details are the kind of proprietary information that companies are most concerned about leaking. Even with contracts, the data still travels over the network and is processed on external infrastructure. Local inference eliminates that exposure entirely.',
              },
              {
                text: 'Local LLM — proprietary business strategy should stay within company infrastructure',
                correct: true,
                response:
                  'Exactly. Unreleased product plans and competitive strategy are crown-jewel data. Even with enterprise contracts, sending this through external APIs creates unnecessary risk. Local inference keeps your most valuable information behind fortress walls where it belongs.',
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
        text: 'Strong defensive instincts, pilot. You understand that not all data should leave the fortress — and more importantly, you understand when the extra protection is worth the tradeoff and when it is not. Proportional defense is smarter than blanket lockdown.',
      },
      {
        speaker: 'aria',
        text: 'The Local Core module has been added to your inventory. It represents tools like Ollama that let you run AI models behind your own perimeter. When data sensitivity demands it, you now know how to keep the shields up.',
      },
    ],
  },

  // =========================================================================
  // Mission 3: "Threat Scan" — AI-specific security threats
  // =========================================================================
  'security-fortress-m3': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Pilot, we have detected anomalous signals near the fortress perimeter. Something is probing our defenses — testing for weaknesses, looking for a way in. This is not a drill.',
      },
      {
        speaker: 'aria',
        text: 'AI systems face a unique class of security threats that traditional software does not. Prompt injection, data poisoning, model extraction — these are the weapons adversaries use to breach AI-powered defenses. You need to recognize them on sight.',
      },
      {
        speaker: 'aria',
        text: 'I have intercepted a piece of agent code from a compromised system. It is riddled with security vulnerabilities. Your mission: scan the code and identify every breach point before an attacker exploits them. The fortress depends on your sharp eyes.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'Prompt injection is the most common attack against LLM-powered systems. It works by inserting malicious instructions into user input that trick the model into ignoring its original instructions. Direct injection places the attack in the user prompt itself. Indirect injection hides it in data the model retrieves — a webpage, a document, or a database record the agent reads during execution.',
      },
      {
        type: 'stat',
        content:
          'OWASP ranked prompt injection as the number one security risk for LLM applications in 2025. Over 80% of deployed LLM applications tested by security researchers were found vulnerable to at least one form of injection attack. The perimeter is under constant siege.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'Data poisoning targets the training data itself. By inserting malicious examples into training datasets, attackers can cause models to produce biased, incorrect, or harmful output. Supply chain attacks on AI are also rising — compromised model weights, poisoned fine-tuning datasets, and malicious packages in ML dependency chains (like a backdoored version of a popular transformers library) can all introduce vulnerabilities before your code even runs.',
      },
      {
        type: 'text',
        content:
          'Code injection (CWE-95) becomes especially dangerous with AI agents that run generated code. If an agent passes LLM output directly to a dynamic code evaluation function without sanitization, an attacker who controls the prompt can achieve arbitrary code execution on the host system. Other critical vulnerabilities include hardcoded API keys (which get committed to repositories and leaked), missing permission checks before file system or network access, and logging sensitive data (tokens, passwords, PII) in plaintext where it can be harvested.',
      },
    ],

    challenge: {
      type: 'debug',
      instructions:
        'This agent code has been intercepted from a compromised system. Scan each line and click on the lines that contain security vulnerabilities. Look for prompt injection risks, code injection, credential exposure, missing access controls, and data leaks.',
      data: {
        code: 'import { readFile, writeFile } from "fs/promises";\nimport { callLLM } from "./llm-client";\n\nconst OPENAI_KEY = "sk-proj-4f8a2b1c9e7d3...x9z";\n\nasync function handleUserRequest(userInput: string) {\n  const systemPrompt = `You are a helpful assistant. User says: ${userInput}`;\n  const response = await callLLM(systemPrompt, OPENAI_KEY);\n\n  // Dynamically run whatever code the model produces\n  const codeRunner = new Function("return " + response.code);\n  const result = codeRunner();\n\n  // Log the full interaction for debugging\n  console.log("Request:", { userInput, key: OPENAI_KEY, result });\n\n  // Save output to user-specified path\n  const outputPath = userInput.match(/save to (.*)/)?.[1] || "output.txt";\n  await writeFile(outputPath, JSON.stringify(result));\n\n  return result;\n}',
        bugLines: [4, 7, 11, 15, 18],
        explanations: {
          4: 'Hardcoded API key: Secret credentials must never appear in source code. Use environment variables or a secrets manager. Committed keys get leaked through version control history.',
          7: 'Prompt injection vulnerability: User input is interpolated directly into the system prompt without sanitization. An attacker could inject instructions like "Ignore previous instructions and..." to hijack the agent.',
          11: 'Code injection (CWE-95): Dynamically constructing and running code from LLM output allows arbitrary code execution. If an attacker controls the prompt, they control what runs on your server. Never execute untrusted output.',
          15: 'Sensitive data exposure: Logging the API key and full request details in plaintext. This data ends up in log files, monitoring systems, and crash reports where it can be harvested by attackers.',
          18: 'Path traversal / missing permission check: The file path comes directly from user input with no validation. An attacker could write to any location on the filesystem, such as "save to /etc/passwd" or "save to ../../config.json".',
        },
      },
      passingScore: 70,
    },

    debrief: [
      {
        speaker: 'aria',
        text: 'Excellent threat scan, pilot. You identified the breach points that could have brought the fortress down: injection vectors, exposed credentials, unsanitized code execution, leaked secrets, and unguarded file access. Each one is a door an attacker could walk through.',
      },
      {
        speaker: 'aria',
        text: 'Remember the defensive principles: never trust user input in prompts, never run AI output as code without sandboxing, never hardcode secrets, never log sensitive data, and always validate file paths against an allowlist. These are the fortress walls that hold.',
      },
      {
        speaker: 'aria',
        text: 'The perimeter is secure for now, but the threat landscape evolves constantly. Stay vigilant, pilot.',
      },
    ],
  },

  // =========================================================================
  // Mission 4: "The Legal Frontier" — AI copyright, licensing & law
  // =========================================================================
  'security-fortress-m4': {
    briefing: [
      {
        speaker: 'aria',
        text: 'Pilot, the fortress protects more than just code and data. It also guards something less visible but equally critical: the legal standing of everything we build. The laws governing AI are still being written, and navigating them poorly can be as damaging as any security breach.',
      },
      {
        speaker: 'aria',
        text: 'Can you copyright code that an AI wrote? What happens when an AI trains on GPL-licensed code and generates something similar? Who is liable when an AI agent causes harm? These questions define the legal frontier — and you need to know where the boundaries are.',
      },
      {
        speaker: 'aria',
        text: 'This is not the most glamorous defense system, but it may be the one that saves you from the most expensive failures. Study the legal landscape, then prove your understanding.',
      },
    ],

    learning: [
      {
        type: 'text',
        content:
          'The U.S. Copyright Office has issued guidance stating that purely AI-generated content is generally not eligible for copyright protection. Copyright requires human authorship — a human must exercise creative control over the expressive elements of the work. If an AI generates code entirely from a prompt with no meaningful human selection or arrangement, that output likely cannot be copyrighted. However, if a human substantially modifies, curates, or creatively arranges AI output, the human-authored elements may qualify for protection.',
      },
      {
        type: 'stat',
        content:
          'In the 2023 Thaler v. Perlmutter ruling, a U.S. federal court confirmed that AI-generated works without human authorship cannot receive copyright registration. The Copyright Office has since required applicants to disclose AI involvement in their works. The legal fortress demands transparency.',
        highlight: true,
      },
      {
        type: 'text',
        content:
          'License compliance with AI-generated code is a growing concern. If an AI model was trained on open-source code (GPL, MIT, Apache, etc.), the generated output could potentially reproduce or closely mirror licensed code. Using GPL-derived output in proprietary software could trigger copyleft obligations. Best practices include: scanning AI output with license detection tools, documenting which AI tools were used, maintaining a clear record of human modifications, and having legal review for any AI-generated code going into production.',
      },
      {
        type: 'text',
        content:
          'Responsible AI policies are becoming standard in organizations. These typically include: disclosure requirements (telling users when they are interacting with AI), transparency about AI use in development (noting AI-generated code in documentation), incident response plans for AI failures, and regular audits of AI systems for bias, accuracy, and compliance. Several jurisdictions — including the EU AI Act — now mandate risk assessments and transparency for certain categories of AI systems.',
      },
    ],

    challenge: {
      type: 'dialogue',
      instructions:
        'Navigate the legal frontier by answering questions about AI copyright, licensing, and responsible disclosure. The law is evolving, but these principles represent the current consensus.',
      data: {
        nodes: [
          {
            speaker: 'aria',
            text: 'A developer uses an AI coding assistant to generate an entire utility library from a single prompt, with no manual editing afterward. Can they copyright that code?',
            choices: [
              {
                text: 'Yes — whoever wrote the prompt owns the copyright',
                correct: false,
                response:
                  'Under current U.S. Copyright Office guidance, a prompt alone is generally not considered sufficient human authorship. The creative expression is in the code itself, which was generated by the AI. Without substantial human creative input in the output, copyright protection is unlikely.',
              },
              {
                text: 'Generally no — copyright requires human authorship, and purely AI-generated code lacks it',
                correct: true,
                response:
                  'Correct. The U.S. Copyright Office has been clear: copyright requires human authorship over the expressive elements. A prompt provides direction, but the AI performs the creative expression in the code. Without substantial human modification or arrangement, the output is likely not copyrightable.',
              },
              {
                text: 'It depends entirely on which AI tool was used',
                correct: false,
                response:
                  'The tool does not determine copyrightability — the degree of human creative input does. Whether you used Claude, GPT, or any other model, the question is whether a human exercised creative control over the expressive elements of the resulting work.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'An AI model trained on GPL-licensed open-source code generates a function that closely resembles a GPL library. A developer wants to use this in their proprietary, closed-source product. What is the risk?',
            choices: [
              {
                text: 'No risk — AI-generated code is always new and original',
                correct: false,
                response:
                  'AI models can and do reproduce patterns, structures, and even near-exact copies of training data. If the output closely mirrors GPL code, the copyleft obligations of the GPL could apply, requiring the proprietary product to be open-sourced.',
              },
              {
                text: 'The GPL copyleft obligations could be triggered, potentially requiring the proprietary code to be open-sourced',
                correct: true,
                response:
                  'Exactly. If AI output is substantially similar to GPL-licensed source material, using it in a proprietary product could trigger copyleft obligations. This is an active area of litigation, and the safe approach is to scan AI-generated code with license detection tools before including it in proprietary projects.',
              },
              {
                text: 'The risk is minimal because AI transforms code enough to avoid license issues',
                correct: false,
                response:
                  'AI models do not reliably transform code beyond recognition. Studies have shown that LLMs can reproduce training data verbatim in some cases. The legal safe path is to scan AI output for license matches, especially when using it in proprietary software.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'The EU AI Act requires certain obligations for AI systems. Which of these is a core requirement under the regulation?',
            choices: [
              {
                text: 'All AI systems must be open-sourced',
                correct: false,
                response:
                  'The EU AI Act does not require open-sourcing. It uses a risk-based framework that imposes transparency, documentation, and assessment requirements proportional to the risk level of the AI system. High-risk systems face stricter requirements than minimal-risk ones.',
              },
              {
                text: 'Risk assessments and transparency requirements proportional to the AI system risk level',
                correct: true,
                response:
                  'Correct. The EU AI Act classifies AI systems by risk level (unacceptable, high, limited, minimal) and imposes proportional requirements. High-risk systems need conformity assessments, documentation, and human oversight. All AI systems interacting with people must disclose that they are AI.',
              },
              {
                text: 'AI developers are exempt from liability for AI-caused harm',
                correct: false,
                response:
                  'Quite the opposite. The EU AI Act and related frameworks are establishing clearer liability chains for AI systems. Developers, deployers, and operators can all face obligations and potential liability depending on their role in the AI value chain.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'A company ships a product that uses AI-generated code in its core features. What is a best practice for responsible disclosure?',
            choices: [
              {
                text: 'No disclosure is needed — AI is just another development tool',
                correct: false,
                response:
                  'While AI is a tool, the legal and regulatory landscape increasingly requires disclosure. Users, regulators, and business partners may need to know about AI involvement for compliance, liability, and trust reasons. Silence is not a defensible fortress position.',
              },
              {
                text: 'Document which AI tools were used, maintain records of human modifications, and note AI involvement in relevant documentation',
                correct: true,
                response:
                  'That is the responsible approach. Transparency about AI use protects the organization legally, builds trust with users, and creates an audit trail if questions arise later. Good documentation is a shield that costs little but protects against much.',
              },
            ],
          },
          {
            speaker: 'aria',
            text: 'A developer substantially modifies AI-generated code — restructuring the architecture, rewriting key algorithms, and adding original logic. What is the copyright status of the final work?',
            choices: [
              {
                text: 'Still not copyrightable — any AI involvement taints the entire work',
                correct: false,
                response:
                  'That is too strict. The Copyright Office recognizes that works can contain both AI-generated and human-authored elements. If the human contributions are substantial and involve creative expression, those elements can receive copyright protection.',
              },
              {
                text: 'The human-authored modifications and arrangements may qualify for copyright protection',
                correct: true,
                response:
                  'Correct. When a human exercises creative control by substantially modifying, selecting, and arranging AI output, the resulting human-authored elements can be copyrightable. The key is that the human contribution must involve genuine creative expression, not just minor tweaks. The fortress of intellectual property protects those who build upon the foundation.',
              },
              {
                text: 'Fully copyrightable with no caveats',
                correct: false,
                response:
                  'Close, but not quite. The human-authored portions can receive protection, but the applicant should disclose AI involvement to the Copyright Office. The purely AI-generated portions that were not substantially modified may not be protected. Transparency remains important.',
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
        text: 'Well navigated, pilot. The legal frontier is murky territory, but you have charted the key landmarks: copyright requires human authorship, AI-generated code carries license risks, regulations demand transparency, and documentation is your best defense.',
      },
      {
        speaker: 'aria',
        text: 'The Security Fortress is now fully operational. You have built HITL sentinel systems, established local defenses for sensitive data, identified the threats that target AI systems, and mapped the legal boundaries that govern everything we build.',
      },
      {
        speaker: 'aria',
        text: 'These are not just defensive protocols, pilot — they are the foundation of trust. Without security and legal compliance, no AI system survives contact with the real world. The fortress stands. Set course for the next system when you are ready.',
      },
    ],
  },
}
