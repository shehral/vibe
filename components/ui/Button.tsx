'use client'

import { motion } from 'motion/react'
import { clsx } from 'clsx'
import { useAudio } from '@/components/audio/AudioManager'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const variantStyles = {
  primary: 'bg-nebula/20 border-nebula/40 text-nebula hover:bg-nebula/30 hover:border-nebula/60',
  secondary: 'bg-glass border-glass-border text-starlight hover:bg-glass-hover',
  danger: 'bg-terracotta/20 border-terracotta/40 text-terracotta hover:bg-terracotta/30',
  success: 'bg-signal/20 border-signal/40 text-signal hover:bg-signal/30',
  ghost: 'bg-transparent border-transparent text-starlight-dim hover:text-starlight hover:bg-glass',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

export function Button({ children, variant = 'primary', size = 'md', disabled, onClick, className, type = 'button' }: ButtonProps) {
  const { playSFX } = useAudio()

  const handleClick = onClick
    ? () => {
        if (!disabled) playSFX('click')
        onClick()
      }
    : undefined

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'font-display uppercase tracking-wider border rounded-xl backdrop-blur-sm transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}
