'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useIsDark() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount, read directly from the DOM attribute set by the blocking script
  // This way there's zero flash even before React hydrates
  if (!mounted) {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark'
    }
    return false
  }

  return resolvedTheme === 'dark'
}