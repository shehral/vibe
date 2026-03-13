import { render, screen } from '@testing-library/react'
import { GlassPanel } from '@/components/ui/GlassPanel'

describe('GlassPanel', () => {
  it('renders children', () => {
    render(<GlassPanel>Panel Content</GlassPanel>)
    expect(screen.getByText('Panel Content')).toBeInTheDocument()
  })

  it('applies glass styling', () => {
    render(<GlassPanel>Glass</GlassPanel>)
    const panel = screen.getByText('Glass').closest('[class]')!
    expect(panel.className).toContain('bg-glass')
    expect(panel.className).toContain('backdrop-blur-md')
    expect(panel.className).toContain('border')
    expect(panel.className).toContain('border-glass-border')
    expect(panel.className).toContain('rounded-xl')
  })

  describe('glow variants', () => {
    it('applies nebula glow', () => {
      render(<GlassPanel glow="nebula">Nebula</GlassPanel>)
      const panel = screen.getByText('Nebula').closest('[class]')!
      expect(panel.className).toContain('shadow-glow-nebula')
    })

    it('applies signal glow', () => {
      render(<GlassPanel glow="signal">Signal</GlassPanel>)
      const panel = screen.getByText('Signal').closest('[class]')!
      expect(panel.className).toContain('shadow-glow-signal')
    })

    it('applies terracotta glow', () => {
      render(<GlassPanel glow="terracotta">Terracotta</GlassPanel>)
      const panel = screen.getByText('Terracotta').closest('[class]')!
      expect(panel.className).toContain('shadow-glow-terracotta')
    })

    it('applies starlight glow', () => {
      render(<GlassPanel glow="starlight">Starlight</GlassPanel>)
      const panel = screen.getByText('Starlight').closest('[class]')!
      expect(panel.className).toContain('shadow-glow-starlight')
    })

    it('does not apply glow by default', () => {
      render(<GlassPanel>No Glow</GlassPanel>)
      const panel = screen.getByText('No Glow').closest('[class]')!
      expect(panel.className).not.toContain('shadow-glow')
    })
  })

  describe('padding variants', () => {
    it('default padding is md (p-5)', () => {
      render(<GlassPanel>Default Padding</GlassPanel>)
      const panel = screen.getByText('Default Padding').closest('[class]')!
      expect(panel.className).toContain('p-5')
    })

    it('applies no padding', () => {
      render(<GlassPanel padding="none">No Pad</GlassPanel>)
      const panel = screen.getByText('No Pad').closest('[class]')!
      expect(panel.className).not.toContain('p-3')
      expect(panel.className).not.toContain('p-5')
      expect(panel.className).not.toContain('p-8')
    })

    it('applies sm padding (p-3)', () => {
      render(<GlassPanel padding="sm">Small Pad</GlassPanel>)
      const panel = screen.getByText('Small Pad').closest('[class]')!
      expect(panel.className).toContain('p-3')
    })

    it('applies md padding (p-5)', () => {
      render(<GlassPanel padding="md">Medium Pad</GlassPanel>)
      const panel = screen.getByText('Medium Pad').closest('[class]')!
      expect(panel.className).toContain('p-5')
    })

    it('applies lg padding (p-8)', () => {
      render(<GlassPanel padding="lg">Large Pad</GlassPanel>)
      const panel = screen.getByText('Large Pad').closest('[class]')!
      expect(panel.className).toContain('p-8')
    })
  })

  describe('hover prop', () => {
    it('does not apply hover styles by default', () => {
      render(<GlassPanel>No Hover</GlassPanel>)
      const panel = screen.getByText('No Hover').closest('[class]')!
      expect(panel.className).not.toContain('cursor-pointer')
      expect(panel.className).not.toContain('hover:bg-glass-hover')
    })

    it('applies hover styles when hover is true', () => {
      render(<GlassPanel hover>Hoverable</GlassPanel>)
      const panel = screen.getByText('Hoverable').closest('[class]')!
      expect(panel.className).toContain('cursor-pointer')
      expect(panel.className).toContain('hover:bg-glass-hover')
      expect(panel.className).toContain('hover:border-glass-active')
    })
  })

  describe('as prop (rendered element)', () => {
    it('renders as div by default', () => {
      const { container } = render(<GlassPanel>Div Panel</GlassPanel>)
      const element = container.firstElementChild!
      expect(element.tagName.toLowerCase()).toBe('div')
    })

    it('renders as section', () => {
      const { container } = render(<GlassPanel as="section">Section Panel</GlassPanel>)
      const element = container.firstElementChild!
      expect(element.tagName.toLowerCase()).toBe('section')
    })

    it('renders as article', () => {
      const { container } = render(<GlassPanel as="article">Article Panel</GlassPanel>)
      const element = container.firstElementChild!
      expect(element.tagName.toLowerCase()).toBe('article')
    })
  })

  it('applies custom className', () => {
    render(<GlassPanel className="custom-test-class">Custom</GlassPanel>)
    const panel = screen.getByText('Custom').closest('[class]')!
    expect(panel.className).toContain('custom-test-class')
  })
})
