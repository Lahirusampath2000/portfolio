'use client'
import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return {
    theme: (mounted ? resolvedTheme : 'light') as 'light' | 'dark',
    toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    mounted,
  }
}