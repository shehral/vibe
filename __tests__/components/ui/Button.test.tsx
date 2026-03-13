import { render, screen, fireEvent } from '@testing-library/react'

const mockPlaySFX = vi.fn()

vi.mock('@/components/audio/AudioManager', () => ({
  useAudio: () => ({ muted: false, toggleMute: vi.fn(), playSFX: mockPlaySFX }),
}))

import { Button } from '@/components/ui/Button'

describe('Button', () => {
  beforeEach(() => {
    mockPlaySFX.mockClear()
  })

  it('renders children text', () => {
    render(<Button>Launch Mission</Button>)
    expect(screen.getByRole('button', { name: 'Launch Mission' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('plays click SFX when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(mockPlaySFX).toHaveBeenCalledWith('click')
  })

  it('does NOT call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does NOT play SFX when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(mockPlaySFX).not.toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.className).toContain('opacity-40')
    expect(button.className).toContain('cursor-not-allowed')
  })

  it('default variant is primary', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-nebula/20')
    expect(button.className).toContain('border-nebula/40')
    expect(button.className).toContain('text-nebula')
  })

  it('default size is md', () => {
    render(<Button>Medium</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('px-5')
    expect(button.className).toContain('py-2.5')
    expect(button.className).toContain('text-base')
  })

  describe('variant classes', () => {
    it('applies primary variant classes', () => {
      render(<Button variant="primary">Primary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-nebula/20')
      expect(button.className).toContain('text-nebula')
    })

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-glass')
      expect(button.className).toContain('text-starlight')
    })

    it('applies danger variant classes', () => {
      render(<Button variant="danger">Danger</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-terracotta/20')
      expect(button.className).toContain('text-terracotta')
    })

    it('applies success variant classes', () => {
      render(<Button variant="success">Success</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-signal/20')
      expect(button.className).toContain('text-signal')
    })

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-transparent')
      expect(button.className).toContain('border-transparent')
      expect(button.className).toContain('text-starlight-dim')
    })
  })

  describe('size classes', () => {
    it('applies sm size classes', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-3')
      expect(button.className).toContain('py-1.5')
      expect(button.className).toContain('text-sm')
    })

    it('applies md size classes', () => {
      render(<Button size="md">Medium</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-5')
      expect(button.className).toContain('py-2.5')
      expect(button.className).toContain('text-base')
    })

    it('applies lg size classes', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-8')
      expect(button.className).toContain('py-3.5')
      expect(button.className).toContain('text-lg')
    })
  })

  it('applies custom className', () => {
    render(<Button className="my-custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('my-custom-class')
  })

  it('type defaults to button', () => {
    render(<Button>Default Type</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('applies common base styles', () => {
    render(<Button>Base</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('uppercase')
    expect(button.className).toContain('tracking-wider')
    expect(button.className).toContain('rounded-xl')
    expect(button.className).toContain('backdrop-blur-sm')
  })
})
