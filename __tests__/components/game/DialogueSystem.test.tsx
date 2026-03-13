import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import type { DialogueNode } from '@/lib/types'

const mockPlaySFX = vi.fn()

vi.mock('@/components/audio/AudioManager', () => ({
  useAudio: () => ({ muted: false, toggleMute: vi.fn(), playSFX: mockPlaySFX }),
  AudioToggle: () => <button>Audio</button>,
  AudioProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/lib/data/crew', () => ({
  crewMembers: [
    {
      id: 'aria',
      name: 'ARIA',
      role: 'Ship AI / Narrator',
      agentPhase: 'Orchestrator',
      description: 'Your ship AI.',
      recruitedAt: 'start',
      portrait: '/images/characters/aria.svg',
      color: '#4a6fa5',
      quote: 'Every great journey begins with a single prompt.',
    },
    {
      id: 'scout',
      name: 'Scout',
      role: 'Perception Specialist',
      agentPhase: 'Perceive',
      description: 'Sees everything.',
      recruitedAt: 'agent-academy-m1',
      portrait: '/images/characters/scout.svg',
      color: '#6b9e78',
      quote: 'The world is data.',
    },
  ],
}))

// Mock TypewriterText to render instantly (avoids fake timer / waitFor conflicts)
vi.mock('@/components/ui/TypewriterText', () => ({
  TypewriterText: ({ text, onComplete, className, ...rest }: {
    text: string
    onComplete?: () => void
    className?: string
    speed?: number
    showCursor?: boolean
  }) => {
    // Call onComplete on mount via useEffect
    const { useEffect } = require('react')
    useEffect(() => {
      onComplete?.()
    }, [text, onComplete])
    return <span className={className}>{text}</span>
  },
}))

import { DialogueSystem } from '@/components/game/DialogueSystem'

// Helper: simple dialogue with no choices
function makeSimpleNodes(count: number): DialogueNode[] {
  return Array.from({ length: count }, (_, i) => ({
    speaker: 'aria',
    text: `Dialogue line ${i + 1}`,
  }))
}

// Helper: dialogue with a choice node
function makeChoiceNodes(): DialogueNode[] {
  return [
    { speaker: 'aria', text: 'What is vibe coding?' },
    {
      speaker: 'aria',
      text: 'Pick the correct answer:',
      choices: [
        { text: 'Writing code with AI assistance', correct: true, response: 'Correct!' },
        { text: 'Playing music while coding', correct: false, response: 'Not quite.' },
      ],
    },
    { speaker: 'aria', text: 'Good job, commander.' },
  ]
}

describe('DialogueSystem', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockPlaySFX.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first dialogue node speaker name and text', () => {
    const nodes = makeSimpleNodes(2)
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // Speaker name should be rendered (ARIA from our mock crew)
    expect(screen.getByText('ARIA')).toBeInTheDocument()
    expect(screen.getByText('Ship AI / Narrator')).toBeInTheDocument()

    // Text rendered instantly via mocked TypewriterText
    expect(screen.getByText('Dialogue line 1')).toBeInTheDocument()
  })

  it('shows progress indicator with correct count', () => {
    const nodes = makeSimpleNodes(5)
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    expect(screen.getByText('1 / 5')).toBeInTheDocument()
  })

  it('advances through dialogue when clicking the text area', () => {
    const nodes = makeSimpleNodes(3)
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    expect(screen.getByText('Dialogue line 1')).toBeInTheDocument()

    // Click the text area to advance to next node
    const textArea = screen.getByRole('button')
    fireEvent.click(textArea)

    // Now on node 2
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
    expect(screen.getByText('Dialogue line 2')).toBeInTheDocument()
  })

  it('renders choice buttons when a node has choices', () => {
    const nodes = makeChoiceNodes()
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // First node text rendered instantly
    expect(screen.getByText('What is vibe coding?')).toBeInTheDocument()

    // Click to advance to the choice node
    const textArea = screen.getByRole('button')
    fireEvent.click(textArea)

    // Choice node text + choices should be visible
    expect(screen.getByText('Writing code with AI assistance')).toBeInTheDocument()
    expect(screen.getByText('Playing music while coding')).toBeInTheDocument()
  })

  it('shows correct feedback when picking the right choice', () => {
    const nodes = makeChoiceNodes()
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // Advance to choice node
    fireEvent.click(screen.getByRole('button'))

    // Click the correct choice
    fireEvent.click(screen.getByText('Writing code with AI assistance'))

    // Feedback should appear
    expect(screen.getByText('Correct')).toBeInTheDocument()
    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(mockPlaySFX).toHaveBeenCalledWith('success')
  })

  it('shows wrong feedback when picking the incorrect choice', () => {
    const nodes = makeChoiceNodes()
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // Advance to choice node
    fireEvent.click(screen.getByRole('button'))

    // Click the wrong choice
    fireEvent.click(screen.getByText('Playing music while coding'))

    // Feedback should appear
    expect(screen.getByText('Not quite')).toBeInTheDocument()
    expect(screen.getByText('Not quite.')).toBeInTheDocument()
    expect(mockPlaySFX).toHaveBeenCalledWith('error')
  })

  it('calls onComplete when dialogue finishes and Continue is clicked', () => {
    const onComplete = vi.fn()
    const nodes = makeSimpleNodes(1)
    render(<DialogueSystem nodes={nodes} onComplete={onComplete} />)

    expect(screen.getByText('Dialogue line 1')).toBeInTheDocument()

    // Click to advance past the last node, triggering summary
    fireEvent.click(screen.getByRole('button'))

    // Summary screen should show
    expect(screen.getByText('Dialogue Complete')).toBeInTheDocument()

    // Click "Continue" to trigger onComplete
    fireEvent.click(screen.getByText('Continue'))
    expect(onComplete).toHaveBeenCalledWith(100) // No questions = 100% score
  })

  it('calculates score based on correct answers and shows it on summary', () => {
    // Two choice nodes: answer one correct, one wrong
    const nodes: DialogueNode[] = [
      {
        speaker: 'aria',
        text: 'Question 1',
        choices: [
          { text: 'Right answer', correct: true, response: 'Yes!' },
          { text: 'Wrong answer', correct: false, response: 'No.' },
        ],
      },
      {
        speaker: 'aria',
        text: 'Question 2',
        choices: [
          { text: 'Bad answer', correct: false, response: 'Nope.' },
          { text: 'Good answer', correct: true, response: 'Great!' },
        ],
      },
    ]

    const onComplete = vi.fn()
    render(<DialogueSystem nodes={nodes} onComplete={onComplete} />)

    // Choices should be visible for Q1 (text is instant)
    expect(screen.getByText('Right answer')).toBeInTheDocument()

    // Answer Q1 correctly
    fireEvent.click(screen.getByText('Right answer'))
    expect(mockPlaySFX).toHaveBeenCalledWith('success')

    // Auto-advance after correct feedback (1200ms)
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // Q2 should now be visible
    expect(screen.getByText('Bad answer')).toBeInTheDocument()

    // Answer Q2 incorrectly
    fireEvent.click(screen.getByText('Bad answer'))

    // Auto-advance after wrong feedback (2000ms)
    act(() => {
      vi.advanceTimersByTime(2500)
    })

    // Summary screen shows 1/2
    expect(screen.getByText('Dialogue Complete')).toBeInTheDocument()
    expect(screen.getByText('1/2')).toBeInTheDocument()
    expect(screen.getByText('correct answers')).toBeInTheDocument()

    // Click Continue, score should be 50%
    fireEvent.click(screen.getByText('Continue'))
    expect(onComplete).toHaveBeenCalledWith(50)
  })

  it('shows "Briefing acknowledged" on summary when there are no questions', () => {
    const nodes = makeSimpleNodes(1)
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText('Briefing acknowledged.')).toBeInTheDocument()
  })

  it('uses fallback speaker info for unknown speaker IDs', () => {
    const nodes: DialogueNode[] = [
      { speaker: 'unknown-person', text: 'Hello there.' },
    ]
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // Fallback: uses speakerId as name
    expect(screen.getByText('unknown-person')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('shows score tracker when there are question nodes', () => {
    const nodes: DialogueNode[] = [
      {
        speaker: 'aria',
        text: 'A question',
        choices: [
          { text: 'Option A', correct: true },
          { text: 'Option B', correct: false },
        ],
      },
    ]
    render(<DialogueSystem nodes={nodes} onComplete={vi.fn()} />)

    // Score tracker should be visible: "Score: 0/1"
    expect(screen.getByText('Score: 0/1')).toBeInTheDocument()
  })
})
