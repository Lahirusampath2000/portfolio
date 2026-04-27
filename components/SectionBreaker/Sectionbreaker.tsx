'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useNeumorph } from '@/hooks/useNeumorph'

interface SectionBreakerProps {
  to: string
  icon: React.ReactNode
  watermarkIcon: React.ReactNode
}

export default function SectionBreaker({ to, icon, watermarkIcon }: SectionBreakerProps) {
  const nm = useNeumorph()
  const { isDark, bg, shDark, shLite, inDark, inLite, text3, border, accent, out, inn } = nm

  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.25 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const chars = to.split('')

  /* Character color cycle — green / dim / text3 */
  const charColor = (i: number) => {
    if (i % 3 === 0) return accent
    return isDark ? 'rgba(255,255,255,0.18)' : '#d1d3da'
  }

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden flex flex-col items-center justify-center gap-4"
      style={{
        background: bg,
        minHeight: 200, paddingTop: 32, paddingBottom: 32,
        userSelect: 'none',
        transition: 'background 0.3s ease',
      }}
    >

      {/* Giant icon watermark */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(140px, 24vw, 260px)',
        height: 'clamp(140px, 24vw, 260px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: `rgba(76,175,114,${isDark ? '0.05' : '0.07'})`,
        pointerEvents: 'none',
        opacity: vis ? 1 : 0,
        transition: 'opacity 0.8s ease 0.1s',
      }}>
        <div style={{ width: '100%', height: '100%' }}>{watermarkIcon}</div>
      </div>

      {/* Rails + badge row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        width: '100%', maxWidth: 900, padding: '0 24px',
        opacity: vis ? 1 : 0,
        transition: 'opacity 0.5s ease 0.15s',
      }}>
        {/* Left rail */}
        <div style={{ flex: 1, height: 1.5, position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, rgba(76,175,114,${isDark ? '0.18' : '0.22'}))` }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: `linear-gradient(to right, transparent, ${accent}, transparent)`, animation: 'railLeft 2s ease-in-out infinite' }} />
        </div>

        {/* Centre badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 18px', borderRadius: 999,
          background: bg,
          boxShadow: out.md,
          border: `1px solid ${border}`,
          flexShrink: 0,
        }}>
          {/* Icon circle */}
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: bg, boxShadow: inn.sm,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accent,
          }}>
            {icon}
          </div>
          {/* Pulse dot */}
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 8px rgba(76,175,114,0.8)`,
            animation: 'dotPulse 1.6s ease-in-out infinite',
            flexShrink: 0,
          }} />
        </div>

        {/* Right rail */}
        <div style={{ flex: 1, height: 1.5, position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, transparent, rgba(76,175,114,${isDark ? '0.18' : '0.22'}))` }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: `linear-gradient(to left, transparent, ${accent}, transparent)`, animation: 'railRight 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Big section name */}
      <div style={{ textAlign: 'center', lineHeight: 1, position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontSize: 'clamp(48px, 9vw, 104px)', fontWeight: 900,
          letterSpacing: '-0.04em', margin: 0,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 2px',
        }}>
          {chars.map((ch, i) => (
            <span key={i} style={{
              display: 'inline-block',
              color: charColor(i),
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.75)',
              transition: `opacity 0.45s ease ${0.2 + i * 0.045}s, transform 0.55s cubic-bezier(0.34,1.4,0.64,1) ${0.2 + i * 0.045}s`,
              textShadow: i % 3 === 0 ? '0 0 32px rgba(76,175,114,0.28)' : 'none',
              whiteSpace: ch === ' ' ? 'pre' : 'normal',
              minWidth: ch === ' ' ? '0.3em' : undefined,
            }}>
              {ch}
            </span>
          ))}
        </h2>
      </div>

      {/* Bottom accent line */}
      <div style={{
        width: vis ? 72 : 0, height: 3, borderRadius: 2,
        background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
        transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s',
      }} />

      {/* Floating particles */}
      {[
        { left: '8%',  top: '28%', delay: '0s',   size: 3 },
        { left: '20%', top: '72%', delay: '0.6s', size: 2 },
        { left: '80%', top: '32%', delay: '0.3s', size: 3 },
        { left: '90%', top: '68%', delay: '0.9s', size: 2 },
        { left: '50%', top: '12%', delay: '1.1s', size: 2 },
        { left: '36%', top: '82%', delay: '0.4s', size: 2 },
        { left: '64%', top: '80%', delay: '0.7s', size: 2 },
      ].map(({ left, top, delay, size }, i) => (
        <div key={i} style={{
          position: 'absolute', left, top,
          width: size, height: size, borderRadius: '50%',
          background: accent,
          opacity: vis ? (isDark ? 0.3 : 0.22) : 0,
          animation: `floatDot ${2.8 + i * 0.25}s ease-in-out ${delay} infinite`,
          transition: 'opacity 1s ease',
        }} />
      ))}

      <style>{`
        @keyframes railLeft  { 0% { left: -40%; }  100% { left: 110%; }  }
        @keyframes railRight { 0% { right: -40%; } 100% { right: 110%; } }
        @keyframes dotPulse  { 0%, 100% { transform: scale(1);   opacity: 1;   } 50% { transform: scale(1.6); opacity: 0.4; } }
        @keyframes floatDot  { 0%, 100% { transform: translateY(0px);   } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  )
}