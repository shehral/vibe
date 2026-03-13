import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockPlaySFX = vi.fn()

vi.mock('@/components/audio/AudioManager', () => ({
  useAudio: () => ({ muted: false, toggleMute: vi.fn(), playSFX: mockPlaySFX }),
  AudioToggle: () => <button>Audio</button>,
  AudioProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { Debug } from '@/components/games/Debug'

const sampleCode = `function greet(name) {
  console.log("Hello, " + name)
  return name.toUppercase()
  const unused = 42
}`

const defaultProps = {
  code: sampleCode,
  bugLines: [3, 4],
  explanations: {
    3: 'toUppercase should be toUpperCase (capital C)',
    4: 'Variable declared but never used',
  } as Record<number, string>,
  onComplete: vi.fn(),
}

describe('Debug', () => {
  beforeEach(() => {
    mockPlaySFX.mockClear()
    defaultProps.onComplete.mockClear()
  })

  it('renders the "Debug Scanner" heading', () => {
    render(<Debug {...defaultProps} />)
    expect(screen.getByText('Debug Scanner')).toBeInTheDocument()
  })

  it('renders instructions text', () => {
    render(<Debug {...defaultProps} />)
    expect(
      screen.getByText('Find the bugs in this code. Click on the lines you think contain issues.')
    ).toBeInTheDocument()
  })

  it('renders all code lines with line numbers', () => {
    render(<Debug {...defaultProps} />)

    const lines = sampleCode.split('\n')
    lines.forEach((line, i) => {
      // Line numbers
      expect(screen.getByText(String(i + 1))).toBeInTheDocument()
    })

    // Verify some code content is visible
    expect(screen.getByText('function greet(name) {')).toBeInTheDocument()
  })

  it('shows "0 lines selected" initially', () => {
    render(<Debug {...defaultProps} />)
    expect(screen.getByText('0 lines selected')).toBeInTheDocument()
  })

  it('toggles line selection on click', () => {
    render(<Debug {...defaultProps} />)

    // Click on line 3 (the bug line) — re-query after each click
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)

    expect(screen.getByText('1 line selected')).toBeInTheDocument()
    expect(mockPlaySFX).toHaveBeenCalledWith('click')

    // Click again to deselect — re-query fresh reference
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    expect(screen.getByText('0 lines selected')).toBeInTheDocument()
  })

  it('uses singular "line" for 1 selection and plural "lines" for multiple', () => {
    render(<Debug {...defaultProps} />)

    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    expect(screen.getByText('1 line selected')).toBeInTheDocument()

    fireEvent.click(screen.getByText('const unused = 42').closest('button')!)
    expect(screen.getByText('2 lines selected')).toBeInTheDocument()
  })

  it('disables Submit button when no lines are selected', () => {
    render(<Debug {...defaultProps} />)
    const submitButton = screen.getByText('Submit Analysis')
    expect(submitButton).toBeDisabled()
  })

  it('enables Submit button when at least one line is selected', () => {
    render(<Debug {...defaultProps} />)
    const line3Button = screen.getByText('return name.toUppercase()').closest('button')
    fireEvent.click(line3Button!)

    const submitButton = screen.getByText('Submit Analysis')
    expect(submitButton).not.toBeDisabled()
  })

  it('shows results phase after submit with score of 100% for perfect identification', async () => {
    render(<Debug {...defaultProps} />)

    // Select both bug lines (3 and 4)
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('const unused = 42').closest('button')!)

    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText('Analysis Results')).toBeInTheDocument()
      expect(screen.getByText('100%')).toBeInTheDocument()
    })

    expect(mockPlaySFX).toHaveBeenCalledWith('success')
  })

  it('scores 50% when only 1 of 2 bugs is found with no false positives', async () => {
    render(<Debug {...defaultProps} />)

    // Select only line 3 (one of two bugs)
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText('50%')).toBeInTheDocument()
    })
  })

  it('penalizes false positives in the score', async () => {
    render(<Debug {...defaultProps} />)

    // Select line 1 (NOT a bug) and line 3 (a bug)
    fireEvent.click(screen.getByText('function greet(name) {').closest('button')!)
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)

    fireEvent.click(screen.getByText('Submit Analysis'))

    // Score = max(0, ((1 correct - 1 false positive) / 2 bugs) * 100) = 0%
    await waitFor(() => {
      expect(screen.getByText('0%')).toBeInTheDocument()
    })
  })

  it('shows explanations for correctly identified bugs', async () => {
    render(<Debug {...defaultProps} />)

    // Select both bug lines
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('const unused = 42').closest('button')!)

    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(
        screen.getByText('toUppercase should be toUpperCase (capital C)')
      ).toBeInTheDocument()
      expect(screen.getByText('Variable declared but never used')).toBeInTheDocument()
    })
  })

  it('shows "No bug here" for false positives', async () => {
    render(<Debug {...defaultProps} />)

    // Select line 1 (not a bug)
    fireEvent.click(screen.getByText('function greet(name) {').closest('button')!)
    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText('No bug here')).toBeInTheDocument()
    })
  })

  it('shows "Missed!" for unselected bug lines', async () => {
    render(<Debug {...defaultProps} />)

    // Select only line 3, missing line 4
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText(/Missed!/)).toBeInTheDocument()
    })
  })

  it('calls onComplete with the score when Continue is clicked', async () => {
    const onComplete = vi.fn()
    render(<Debug {...defaultProps} onComplete={onComplete} />)

    // Select both bug lines
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('const unused = 42').closest('button')!)

    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Continue'))
    expect(onComplete).toHaveBeenCalledWith(100)
  })

  it('plays success SFX for scores >= 70', async () => {
    render(<Debug {...defaultProps} />)

    // Select both bug lines for 100%
    fireEvent.click(screen.getByText('return name.toUppercase()').closest('button')!)
    fireEvent.click(screen.getByText('const unused = 42').closest('button')!)
    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(mockPlaySFX).toHaveBeenCalledWith('success')
    })
  })

  it('plays error SFX for scores < 70', async () => {
    render(<Debug {...defaultProps} />)

    // Select only line 1 (false positive, no correct hits) = 0%
    fireEvent.click(screen.getByText('function greet(name) {').closest('button')!)
    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(mockPlaySFX).toHaveBeenCalledWith('error')
    })
  })

  it('clamps score to 0 when false positives exceed correct selections', async () => {
    render(<Debug {...defaultProps} />)

    // Select 3 wrong lines and 0 correct: score should clamp to 0
    fireEvent.click(screen.getByText('function greet(name) {').closest('button')!)
    fireEvent.click(screen.getByText(/console\.log/).closest('button')!)
    fireEvent.click(screen.getByText('}').closest('button')!)

    fireEvent.click(screen.getByText('Submit Analysis'))

    await waitFor(() => {
      expect(screen.getByText('0%')).toBeInTheDocument()
    })
  })
})
