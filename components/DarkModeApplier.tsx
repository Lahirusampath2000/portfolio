'use client'
import { useEffect } from 'react'

/*
  DarkModeApplier
  ─────────────────────────────────────────────────────
  Since most portfolio components use INLINE styles with
  hardcoded neumorphic values, this component observes
  data-theme changes on <html> and swaps those values
  globally via a <style> tag that targets inline-style
  attribute patterns.

  Dark mode values use #27272e as the base — a mid-dark
  gray that gives the ~35-unit spread needed for neumorphic
  shadows to be visible (vs the old #1c1c21 which was
  too close to the shadow colors).
*/

const LIGHT = {
  bg:        '#eceef3',
  shDark:    '#d1d3da',
  shLite:    '#ffffff',
  inDark:    '#c8cad1',
  inLite:    '#ffffff',
  text1:     '#1f2937',
  text2:     '#6b7280',
  text3:     '#9ca3af',
  text4:     '#d1d5db',
}

const DARK = {
  bg:        '#27272e',   /* mid-dark gray — NOT pitch black */
  shDark:    '#17171c',   /* 35+ units darker → visible depth */
  shLite:    '#37373f',   /* 35+ units lighter → visible depth */
  inDark:    '#1b1b20',
  inLite:    '#333339',
  text1:     '#e4e4e9',
  text2:     '#9898a4',
  text3:     '#5c5c68',
  text4:     '#383840',
}

function buildDarkCSS(): string {
  const D = DARK
  return `
[data-theme="dark"] {
  background-color: ${D.bg};
}

/* ── Background: light nm surface → dark nm surface ── */
[data-theme="dark"] [style*="background: #eceef3"],
[data-theme="dark"] [style*="background:#eceef3"],
[data-theme="dark"] [style*="background-color: #eceef3"],
[data-theme="dark"] [style*="background-color:#eceef3"] {
  background: ${D.bg} !important;
  background-color: ${D.bg} !important;
}

/* ── Outset shadows ── */
[data-theme="dark"] [style*="4px 4px 10px #d1d3da, -4px -4px 10px #ffffff"],
[data-theme="dark"] [style*="4px 4px 10px #d1d3da,-4px -4px 10px #ffffff"] {
  box-shadow: 4px 4px 10px ${D.shDark}, -4px -4px 10px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="3px 3px 8px #d1d3da, -3px -3px 8px #ffffff"],
[data-theme="dark"] [style*="3px 3px 8px #d1d3da,-3px -3px 8px #ffffff"] {
  box-shadow: 3px 3px 8px ${D.shDark}, -3px -3px 8px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="5px 5px 14px #d1d3da, -5px -5px 14px #ffffff"],
[data-theme="dark"] [style*="5px 5px 14px #d1d3da,-5px -5px 14px #ffffff"] {
  box-shadow: 5px 5px 14px ${D.shDark}, -5px -5px 14px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="4px 4px 12px #d1d3da, -4px -4px 12px #ffffff"],
[data-theme="dark"] [style*="4px 4px 12px #d1d3da,-4px -4px 12px #ffffff"] {
  box-shadow: 4px 4px 12px ${D.shDark}, -4px -4px 12px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="6px 6px 14px #d1d3da, -6px -6px 14px #ffffff"],
[data-theme="dark"] [style*="6px 6px 14px #d1d3da,-6px -6px 14px #ffffff"] {
  box-shadow: 6px 6px 14px ${D.shDark}, -6px -6px 14px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="8px 8px 20px #d1d3da, -8px -8px 20px #ffffff"],
[data-theme="dark"] [style*="8px 8px 20px #d1d3da,-8px -8px 20px #ffffff"] {
  box-shadow: 8px 8px 20px ${D.shDark}, -8px -8px 20px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="7px 7px 18px #d1d3da, -7px -7px 18px #ffffff"],
[data-theme="dark"] [style*="7px 7px 18px #d1d3da,-7px -7px 18px #ffffff"] {
  box-shadow: 7px 7px 18px ${D.shDark}, -7px -7px 18px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="2px 2px 6px #d1d3da, -2px -2px 6px #ffffff"],
[data-theme="dark"] [style*="2px 2px 6px #d1d3da,-2px -2px 6px #ffffff"] {
  box-shadow: 2px 2px 6px ${D.shDark}, -2px -2px 6px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="2px 2px 5px #d1d3da, -2px -2px 5px #ffffff"],
[data-theme="dark"] [style*="2px 2px 5px #d1d3da,-2px -2px 5px #ffffff"] {
  box-shadow: 2px 2px 5px ${D.shDark}, -2px -2px 5px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="12px 12px 28px #d1d3da, -12px -12px 28px #ffffff"],
[data-theme="dark"] [style*="12px 12px 28px #d1d3da,-12px -12px 28px #ffffff"] {
  box-shadow: 12px 12px 28px ${D.shDark}, -12px -12px 28px ${D.shLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="16px 16px 36px #c8cad1, -16px -16px 36px #ffffff"],
[data-theme="dark"] [style*="16px 16px 36px #c8cad1,-16px -16px 36px #ffffff"] {
  box-shadow: 16px 16px 36px ${D.inDark}, -16px -16px 36px ${D.shLite} !important;
  background: ${D.bg} !important;
}

/* ── Inset shadows ── */
[data-theme="dark"] [style*="inset 4px 4px 10px #d1d3da, inset -4px -4px 10px #ffffff"],
[data-theme="dark"] [style*="inset 4px 4px 10px #d1d3da,inset -4px -4px 10px #ffffff"] {
  box-shadow: inset 4px 4px 10px ${D.inDark}, inset -4px -4px 10px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 6px 6px 18px #d1d3da, inset -6px -6px 18px #ffffff"],
[data-theme="dark"] [style*="inset 6px 6px 18px #d1d3da,inset -6px -6px 18px #ffffff"] {
  box-shadow: inset 6px 6px 18px ${D.inDark}, inset -6px -6px 18px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 5px 5px 12px #d1d3da, inset -5px -5px 12px #ffffff"],
[data-theme="dark"] [style*="inset 5px 5px 12px #d1d3da,inset -5px -5px 12px #ffffff"] {
  box-shadow: inset 5px 5px 12px ${D.inDark}, inset -5px -5px 12px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 3px 3px 8px #d1d3da, inset -3px -3px 8px #ffffff"],
[data-theme="dark"] [style*="inset 3px 3px 8px #d1d3da,inset -3px -3px 8px #ffffff"] {
  box-shadow: inset 3px 3px 8px ${D.inDark}, inset -3px -3px 8px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 4px 4px 10px #c8cad1, inset -4px -4px 10px #ffffff"],
[data-theme="dark"] [style*="inset 4px 4px 10px #c8cad1,inset -4px -4px 10px #ffffff"] {
  box-shadow: inset 4px 4px 10px ${D.inDark}, inset -4px -4px 10px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 2px 2px 6px #d1d3da, inset -2px -2px 6px #ffffff"],
[data-theme="dark"] [style*="inset 2px 2px 6px #d1d3da,inset -2px -2px 6px #ffffff"] {
  box-shadow: inset 2px 2px 6px ${D.inDark}, inset -2px -2px 6px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 2px 2px 5px #c8cad1, inset -2px -2px 5px #ffffff"],
[data-theme="dark"] [style*="inset 2px 2px 5px #c8cad1,inset -2px -2px 5px #ffffff"] {
  box-shadow: inset 2px 2px 5px ${D.inDark}, inset -2px -2px 5px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff"],
[data-theme="dark"] [style*="inset 3px 3px 8px #c8cad1,inset -3px -3px 8px #ffffff"] {
  box-shadow: inset 3px 3px 8px ${D.inDark}, inset -3px -3px 8px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 6px 6px 14px #d1d3da, inset -6px -6px 14px #ffffff"],
[data-theme="dark"] [style*="inset 6px 6px 14px #d1d3da,inset -6px -6px 14px #ffffff"] {
  box-shadow: inset 6px 6px 14px ${D.inDark}, inset -6px -6px 14px ${D.inLite} !important;
  background: ${D.bg} !important;
}
[data-theme="dark"] [style*="inset 4px 4px 10px #d1d3da"],
[data-theme="dark"] [style*="inset 8px 8px 20px #d1d3da"] {
  box-shadow: inset 8px 8px 20px ${D.inDark}, inset -8px -8px 20px ${D.inLite} !important;
  background: ${D.bg} !important;
}

/* ── Mixed inset + outset ── */
[data-theme="dark"] [style*="inset 4px 4px 10px #c8cad1, inset -4px -4px 10px #ffffff, 0 0 28px"] {
  box-shadow: inset 4px 4px 10px ${D.inDark}, inset -4px -4px 10px ${D.inLite} !important;
  background: ${D.bg} !important;
}

/* ── Nav bar inline override (Nav.tsx uses isDark conditional) ── */
[data-theme="dark"] [style*="8px 8px 20px #d1d3da, -8px -8px 20px #ffffff"],
[data-theme="dark"] [style*="8px 8px 20px #d1d3da,-8px -8px 20px #ffffff"] {
  box-shadow: 8px 8px 20px ${D.shDark}, -8px -8px 20px ${D.shLite} !important;
  background: ${D.bg} !important;
}

/* ── Nav link hover inset (pressed pill) ── */
[data-theme="dark"] [style*="inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff"],
[data-theme="dark"] [style*="inset 3px 3px 7px #c8cad1,inset -3px -3px 7px #ffffff"] {
  box-shadow: inset 3px 3px 7px ${D.inDark}, inset -3px -3px 7px ${D.inLite} !important;
  background: ${D.bg} !important;
}

/* ── Text colors (inline style) ── */
[data-theme="dark"] [style*="color: #1f2937"],
[data-theme="dark"] [style*="color:#1f2937"] { color: ${D.text1} !important; }
[data-theme="dark"] [style*="color: #6b7280"],
[data-theme="dark"] [style*="color:#6b7280"] { color: ${D.text2} !important; }
[data-theme="dark"] [style*="color: #9ca3af"],
[data-theme="dark"] [style*="color:#9ca3af"] { color: ${D.text3} !important; }
[data-theme="dark"] [style*="color: #374151"],
[data-theme="dark"] [style*="color:#374151"] { color: ${D.text1} !important; }

/* ── Border colors (inline style) ── */
[data-theme="dark"] [style*="border: 1.5px solid rgba(255,255,255,0.85)"],
[data-theme="dark"] [style*="border: 1.5px solid rgba(255,255,255,0.7)"],
[data-theme="dark"] [style*="border: 1px solid rgba(255,255,255,0.7)"],
[data-theme="dark"] [style*="border: 1px solid rgba(255,255,255,0.8)"],
[data-theme="dark"] [style*="border: 1px solid rgba(255,255,255,0.75)"],
[data-theme="dark"] [style*="border: 1px solid rgba(255,255,255,0.6)"],
[data-theme="dark"] [style*="border: 1px solid rgba(255,255,255,0.50)"] {
  border-color: rgba(255, 255, 255, 0.07) !important;
}

/* ── Divider lines ── */
[data-theme="dark"] [style*="background: rgba(209,211,218,0.7)"] {
  background: rgba(255,255,255,0.08) !important;
}
[data-theme="dark"] .h-px {
  opacity: 0.25;
}

/* ── Ghost watermark numbers ── */
[data-theme="dark"] [style*="color: rgba(31,41,55,0.04)"] {
  color: rgba(255,255,255,0.03) !important;
}

/* ── Progress pip track ── */
[data-theme="dark"] [style*="background: #c8cad1"] {
  background: #222227 !important;
}

/* ── Skill card floating animation bg ── */
[data-theme="dark"] [style*="background: #e4e6ec"] {
  background: ${D.bg} !important;
}

/* ── Input / image bg ── */
[data-theme="dark"] img[style*="backgroundColor: #e4e6ec"] {
  background-color: #1e1e23 !important;
}

/* ── Section breaker radial gradient ── */
[data-theme="dark"] [style*="radial-gradient(circle, rgba(76,175,114,0.07)"] {
  opacity: 0.5 !important;
}

/* ── Dot grid in Hero ── */
[data-theme="dark"] [style*="radial-gradient(circle, rgba(76,175,114,0.1) 1px"] {
  opacity: 0.35 !important;
}

/* ── About me quote block ── */
[data-theme="dark"] [style*="inset 6px 6px 14px #d1d3da, inset -6px -6px 14px #ffffff"] {
  box-shadow: inset 6px 6px 14px ${D.inDark}, inset -6px -6px 14px ${D.inLite} !important;
  background: ${D.bg} !important;
}

/* ── Journey tree trunk ── */
[data-theme="dark"] [style*="background: linear-gradient(to bottom, #4caf72"] {
  opacity: 0.9;
}

/* ── Root lines in journey ── */
[data-theme="dark"] [style*="background: linear-gradient(to bottom, #7a5c3a"] {
  opacity: 0.6;
}

/* ── Pill nav badges bg ── */
[data-theme="dark"] [style*="background: rgba(236,238,243,0.92)"] {
  background: rgba(39,39,46,0.92) !important;
}

/* ── Mobile nav close button bg ── */
[data-theme="dark"] .fixed .rounded-full {
  background: ${D.bg} !important;
}

/* ── Mobile drawer drop shadow ── */
[data-theme="dark"] [style*="0px 8px 40px #c4c6cd"] {
  box-shadow: 0px 8px 40px #0d0d10 !important;
}
`
}

export default function DarkModeApplier() {
  useEffect(() => {
    const styleId = 'nm-dark-mode-styles'
    let el = document.getElementById(styleId) as HTMLStyleElement | null

    if (!el) {
      el = document.createElement('style')
      el.id = styleId
      document.head.appendChild(el)
    }

    el.textContent = buildDarkCSS()
  }, [])

  return null
}