import { render, screen } from '@testing-library/react'
import * as navigation from 'next/navigation'

vi.mock('@/components/audio/AudioManager', () => ({
  useAudio: () => ({ muted: false, toggleMute: vi.fn(), playSFX: vi.fn() }),
  AudioToggle: () => <button>Audio</button>,
  AudioProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { NavBar } from '@/components/game/NavBar'

describe('NavBar', () => {
  function renderWithPathname(pathname: string) {
    vi.spyOn(navigation, 'usePathname').mockReturnValue(pathname)
    return render(<NavBar />)
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders all five nav items on a game route', () => {
    renderWithPathname('/cockpit')

    expect(screen.getByText('Map')).toBeInTheDocument()
    expect(screen.getByText('Cockpit')).toBeInTheDocument()
    expect(screen.getByText('Crew')).toBeInTheDocument()
    expect(screen.getByText('Items')).toBeInTheDocument()
    expect(screen.getByText('Academy')).toBeInTheDocument()
  })

  it('renders the audio toggle', () => {
    renderWithPathname('/cockpit')
    // AudioToggle renders a button with text "Audio" (from our mock)
    // Plus the label "Audio" below it
    const audioElements = screen.getAllByText('Audio')
    expect(audioElements.length).toBeGreaterThanOrEqual(1)
  })

  it('does NOT render on the title screen (pathname "/")', () => {
    const { container } = renderWithPathname('/')
    expect(container.innerHTML).toBe('')
  })

  it('does NOT render on the character creation screen (pathname "/create")', () => {
    const { container } = renderWithPathname('/create')
    expect(container.innerHTML).toBe('')
  })

  it('renders on the cockpit route', () => {
    renderWithPathname('/cockpit')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders on the starmap route', () => {
    renderWithPathname('/starmap')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders on planet sub-routes', () => {
    renderWithPathname('/planets/vibe-world')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('highlights the active nav item for /cockpit', () => {
    renderWithPathname('/cockpit')

    const cockpitLink = screen.getByText('Cockpit').closest('a')
    expect(cockpitLink).toHaveClass('text-starlight')

    // Other items should not have the active class
    const mapLink = screen.getByText('Map').closest('a')
    expect(mapLink).toHaveClass('text-starlight-dim')
  })

  it('highlights the active nav item for /starmap', () => {
    renderWithPathname('/starmap')

    const mapLink = screen.getByText('Map').closest('a')
    expect(mapLink).toHaveClass('text-starlight')

    const cockpitLink = screen.getByText('Cockpit').closest('a')
    expect(cockpitLink).toHaveClass('text-starlight-dim')
  })

  it('highlights Academy when on /academy sub-route', () => {
    renderWithPathname('/academy/section-1')

    const academyLink = screen.getByText('Academy').closest('a')
    expect(academyLink).toHaveClass('text-starlight')
  })

  it('nav items link to correct routes', () => {
    renderWithPathname('/cockpit')

    expect(screen.getByText('Map').closest('a')).toHaveAttribute('href', '/starmap')
    expect(screen.getByText('Cockpit').closest('a')).toHaveAttribute('href', '/cockpit')
    expect(screen.getByText('Crew').closest('a')).toHaveAttribute('href', '/crew')
    expect(screen.getByText('Items').closest('a')).toHaveAttribute('href', '/inventory')
    expect(screen.getByText('Academy').closest('a')).toHaveAttribute('href', '/academy')
  })
})
