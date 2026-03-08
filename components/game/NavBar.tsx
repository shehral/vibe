'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { clsx } from 'clsx'
import { AudioToggle } from '@/components/audio/AudioManager'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    href: '/starmap',
    label: 'Map',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    href: '/cockpit',
    label: 'Cockpit',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    href: '/crew',
    label: 'Crew',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/inventory',
    label: 'Items',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: '/academy',
    label: 'Academy',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
]

// Hidden routes where nav bar should NOT appear
const HIDDEN_ROUTES = ['/', '/create']

export function NavBar() {
  const pathname = usePathname()

  // Don't render on title screen or character creation
  if (HIDDEN_ROUTES.includes(pathname)) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-lg border-t border-glass-border">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                isActive
                  ? 'text-starlight'
                  : 'text-starlight-dim hover:text-starlight/70'
              )}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-[10px] font-display uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          )
        })}
        {/* Audio toggle */}
        <div className="flex flex-col items-center gap-1 p-2">
          <AudioToggle />
          <span className="text-[10px] font-display uppercase tracking-wider text-starlight-dim">
            Audio
          </span>
        </div>
      </div>
    </nav>
  )
}
