'use client'
import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'

export function useNeumorph() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount, always return light tokens to match SSR
  const isDark = mounted && theme === 'dark'

  const bg     = isDark ? '#27272e' : '#eceef3'
  const shDark = isDark ? '#17171c' : '#d1d3da'
  const shLite = isDark ? '#37373f' : '#ffffff'
  const inDark = isDark ? '#1b1b20' : '#c8cad1'
  const inLite = isDark ? '#333339' : '#ffffff'
  const text1  = isDark ? '#e4e4e9' : '#1f2937'
  const text2  = isDark ? '#9898a4' : '#6b7280'
  const text3  = isDark ? '#5c5c68' : '#9ca3af'
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.60)'
  const accent = '#4caf72'

  const out = {
    xs:  `2px 2px 5px ${shDark}, -2px -2px 5px ${shLite}`,
    sm:  `3px 3px 8px ${shDark}, -3px -3px 8px ${shLite}`,
    md:  `4px 4px 10px ${shDark}, -4px -4px 10px ${shLite}`,
    lg:  `6px 6px 14px ${shDark}, -6px -6px 14px ${shLite}`,
    xl:  `8px 8px 20px ${shDark}, -8px -8px 20px ${shLite}`,
    xxl: `12px 12px 28px ${shDark}, -12px -12px 28px ${shLite}`,
  }

  const inn = {
    xs:  `inset 2px 2px 5px ${inDark}, inset -2px -2px 5px ${inLite}`,
    sm:  `inset 3px 3px 7px ${inDark}, inset -3px -3px 7px ${inLite}`,
    md:  `inset 4px 4px 10px ${inDark}, inset -4px -4px 10px ${inLite}`,
    lg:  `inset 6px 6px 14px ${inDark}, inset -6px -6px 14px ${inLite}`,
    xl:  `inset 8px 8px 20px ${inDark}, inset -8px -8px 20px ${inLite}`,
  }

  return {
    isDark,
    bg, shDark, shLite, inDark, inLite,
    text1, text2, text3, border, accent,
    out, inn,
  }
}