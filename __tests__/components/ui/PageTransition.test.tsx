import { render, screen } from '@testing-library/react'
import { PageTransition } from '@/components/ui/PageTransition'

describe('PageTransition', () => {
  it('renders children', () => {
    render(<PageTransition>Transition Content</PageTransition>)
    expect(screen.getByText('Transition Content')).toBeInTheDocument()
  })

  it('default variant is fade (renders without error)', () => {
    const { container } = render(<PageTransition>Fade Default</PageTransition>)
    expect(container.firstElementChild).toBeInTheDocument()
    expect(screen.getByText('Fade Default')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(
      <PageTransition className="custom-transition">Styled</PageTransition>
    )
    const wrapper = container.firstElementChild!
    expect(wrapper.className).toContain('custom-transition')
  })

  it('renders with fade variant', () => {
    render(<PageTransition variant="fade">Fade</PageTransition>)
    expect(screen.getByText('Fade')).toBeInTheDocument()
  })

  it('renders with warp variant', () => {
    render(<PageTransition variant="warp">Warp</PageTransition>)
    expect(screen.getByText('Warp')).toBeInTheDocument()
  })

  it('renders with slide variant', () => {
    render(<PageTransition variant="slide">Slide</PageTransition>)
    expect(screen.getByText('Slide')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    const { container } = render(<PageTransition>Div Check</PageTransition>)
    expect(container.firstElementChild!.tagName.toLowerCase()).toBe('div')
  })

  it('renders complex children', () => {
    render(
      <PageTransition>
        <h1>Title</h1>
        <p>Paragraph</p>
      </PageTransition>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
  })
})
