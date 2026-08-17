'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'p-2 rounded-lg hover:bg-[--bg-card] transition-colors text-[--text-muted] hover:text-[--text-primary] theme-transition',
        className
      )}
      aria-label="Alternar tema"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
