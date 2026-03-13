import { render, screen, act, fireEvent } from '@testing-library/react'
import { TypewriterText } from '@/components/ui/TypewriterText'

describe('TypewriterText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with empty/partial text before timers advance', () => {
    const { container } = render(<TypewriterText text="Hello World" showCursor={false} />)
    // Before any interval fires, the displayed text should be empty
    const span = container.firstElementChild!
    expect(span.textContent).toBe('')
  })

  it('eventually renders the full text', () => {
    render(<TypewriterText text="Hello" />)

    // Advance past all characters (5 chars * 30ms default speed + buffer)
    act(() => {
      vi.advanceTimersByTime(5 * 30 + 50)
    })

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders text character by character', () => {
    const { container } = render(<TypewriterText text="ABC" speed={100} />)
    const span = container.firstElementChild!

    // After first interval: "A"
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(span.textContent).toContain('A')

    // After second interval: "AB"
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(span.textContent).toContain('AB')

    // After third interval: "ABC"
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(span.textContent).toContain('ABC')
  })

  it('speed prop affects rendering time', () => {
    const fastText = 'Fast'
    const { container: fastContainer } = render(
      <TypewriterText text={fastText} speed={10} />
    )

    // At 10ms speed, 4 chars should complete in 40ms + buffer
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(fastContainer.textContent).toContain('Fast')
  })

  it('slower speed takes longer to render', () => {
    render(<TypewriterText text="Slow" speed={200} />)

    // At 200ms speed, after 100ms only 0 chars should be rendered
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.queryByText('Slow')).not.toBeInTheDocument()

    // After all chars rendered (4 * 200ms + buffer)
    act(() => {
      vi.advanceTimersByTime(800)
    })
    expect(screen.getByText('Slow')).toBeInTheDocument()
  })

  it('calls onComplete when text finishes typing', () => {
    const onComplete = vi.fn()
    render(<TypewriterText text="Hi" speed={50} onComplete={onComplete} />)

    // Before completion
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(onComplete).not.toHaveBeenCalled()

    // After all chars + final interval
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('shows cursor while typing', () => {
    const { container } = render(<TypewriterText text="Cursor test" />)

    // The cursor span has animate-pulse class
    const cursorSpan = container.querySelector('.animate-pulse')
    expect(cursorSpan).toBeInTheDocument()
  })

  it('hides cursor when showCursor is false', () => {
    const { container } = render(
      <TypewriterText text="No cursor" showCursor={false} />
    )

    const cursorSpan = container.querySelector('.animate-pulse')
    expect(cursorSpan).not.toBeInTheDocument()
  })

  it('hides cursor after typing completes', () => {
    const { container } = render(<TypewriterText text="Done" speed={10} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    const cursorSpan = container.querySelector('.animate-pulse')
    expect(cursorSpan).not.toBeInTheDocument()
  })

  it('skips to end when clicked during typing', () => {
    const onComplete = vi.fn()
    const { container } = render(
      <TypewriterText text="Click to skip" speed={100} onComplete={onComplete} />
    )

    const span = container.firstElementChild!

    // Only advance part-way
    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Click to skip to end
    act(() => {
      fireEvent.click(span)
    })

    expect(span.textContent).toContain('Click to skip')
    expect(onComplete).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <TypewriterText text="Styled" className="text-red-500" />
    )
    const span = container.firstElementChild!
    expect(span.className).toContain('text-red-500')
  })

  it('resets when text prop changes', () => {
    const { container, rerender } = render(
      <TypewriterText text="First" speed={10} />
    )

    // Complete first text
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(container.textContent).toContain('First')

    // Change text
    rerender(<TypewriterText text="Second" speed={10} />)

    // Text should reset — not showing "Second" yet (or showing partial)
    // After enough time, it should show the new text
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(container.textContent).toContain('Second')
  })
})
