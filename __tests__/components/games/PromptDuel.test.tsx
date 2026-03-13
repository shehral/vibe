import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockPlaySFX = vi.fn()

vi.mock('@/components/audio/AudioManager', () => ({
  useAudio: () => ({ muted: false, toggleMute: vi.fn(), playSFX: mockPlaySFX }),
  AudioToggle: () => <button>Audio</button>,
  AudioProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { PromptDuel } from '@/components/games/PromptDuel'

const defaultProps = {
  scenario: 'Write a prompt that asks an AI to build a REST API with authentication and rate limiting.',
  requiredConcepts: ['authentication', 'rate limiting', 'REST'],
  onComplete: vi.fn(),
}

describe('PromptDuel', () => {
  beforeEach(() => {
    mockPlaySFX.mockClear()
    defaultProps.onComplete.mockClear()
  })

  it('renders the scenario text', () => {
    render(<PromptDuel {...defaultProps} />)
    expect(screen.getByText(defaultProps.scenario)).toBeInTheDocument()
  })

  it('renders the "Prompt Duel" heading', () => {
    render(<PromptDuel {...defaultProps} />)
    expect(screen.getByText('Prompt Duel')).toBeInTheDocument()
  })

  it('has a textarea for writing the prompt', () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('shows character count that updates as user types', () => {
    render(<PromptDuel {...defaultProps} />)
    expect(screen.getByText('0 characters')).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, { target: { value: 'Hello' } })

    expect(screen.getByText('5 characters')).toBeInTheDocument()
  })

  it('disables Submit button when textarea is empty', () => {
    render(<PromptDuel {...defaultProps} />)
    const submitButton = screen.getByText('Submit Prompt')
    expect(submitButton).toBeDisabled()
  })

  it('enables Submit button when textarea has text', () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, { target: { value: 'Build me an API' } })

    const submitButton = screen.getByText('Submit Prompt')
    expect(submitButton).not.toBeDisabled()
  })

  it('disables Submit button when textarea has only whitespace', () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, { target: { value: '   ' } })

    const submitButton = screen.getByText('Submit Prompt')
    expect(submitButton).toBeDisabled()
  })

  it('shows results screen after submitting', async () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, {
      target: { value: 'Build a REST API with authentication and rate limiting' },
    })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument()
    })
  })

  it('scores 100% when all required concepts are present (case-insensitive)', async () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, {
      target: { value: 'Build a REST API with authentication and rate limiting' },
    })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    expect(mockPlaySFX).toHaveBeenCalledWith('success')
  })

  it('scores 0% when no required concepts are present', async () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, {
      target: { value: 'Build me something cool' },
    })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(screen.getByText('0%')).toBeInTheDocument()
    })

    expect(mockPlaySFX).toHaveBeenCalledWith('error')
  })

  it('scores partial when some concepts are present', async () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    // Only includes "REST" (1 out of 3 concepts)
    fireEvent.change(textarea, {
      target: { value: 'Create a REST endpoint' },
    })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      // 1/3 = 33%
      expect(screen.getByText('33%')).toBeInTheDocument()
    })

    expect(mockPlaySFX).toHaveBeenCalledWith('error') // <70% plays error
  })

  it('shows checkmarks for found concepts and X marks for missing ones', async () => {
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    // Includes "authentication" and "REST", but not "rate limiting"
    fireEvent.change(textarea, {
      target: { value: 'Build a REST API with authentication' },
    })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument()
    })

    // Each concept should be listed
    expect(screen.getByText('authentication')).toBeInTheDocument()
    expect(screen.getByText('rate limiting')).toBeInTheDocument()
    expect(screen.getByText('REST')).toBeInTheDocument()

    // Checkmarks and X marks (Unicode characters)
    const checkmarks = screen.getAllByText('\u2713')
    const xmarks = screen.getAllByText('\u2717')
    expect(checkmarks).toHaveLength(2) // authentication and REST
    expect(xmarks).toHaveLength(1) // rate limiting
  })

  it('displays the submitted prompt in the results view', async () => {
    const promptText = 'My awesome prompt about REST and authentication'
    render(<PromptDuel {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, { target: { value: promptText } })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      // The "Your Prompt" section should show
      expect(screen.getByText('Your Prompt')).toBeInTheDocument()
      expect(screen.getByText(promptText)).toBeInTheDocument()
    })
  })

  it('calls onComplete with the calculated score when Continue is clicked', async () => {
    const onComplete = vi.fn()
    render(
      <PromptDuel
        scenario="Test scenario"
        requiredConcepts={['api', 'database']}
        onComplete={onComplete}
      />
    )

    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    fireEvent.change(textarea, { target: { value: 'build an api' } })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Continue'))

    // 1/2 concepts found = 50
    expect(onComplete).toHaveBeenCalledWith(50)
  })

  it('plays success SFX for scores >= 70', async () => {
    render(
      <PromptDuel
        scenario="Test"
        requiredConcepts={['api', 'server', 'deploy']}
        onComplete={vi.fn()}
      />
    )

    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    // 3/3 = 100% >= 70
    fireEvent.change(textarea, { target: { value: 'api server deploy' } })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(mockPlaySFX).toHaveBeenCalledWith('success')
    })
  })

  it('plays error SFX for scores < 70', async () => {
    render(
      <PromptDuel
        scenario="Test"
        requiredConcepts={['api', 'server', 'deploy']}
        onComplete={vi.fn()}
      />
    )

    const textarea = screen.getByPlaceholderText('Write your prompt here...')
    // 1/3 = 33% < 70
    fireEvent.change(textarea, { target: { value: 'just an api' } })
    fireEvent.click(screen.getByText('Submit Prompt'))

    await waitFor(() => {
      expect(mockPlaySFX).toHaveBeenCalledWith('error')
    })
  })
})
