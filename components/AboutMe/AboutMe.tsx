'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useNeumorph } from '@/hooks/useNeumorph'

const traits = [
  { emoji: '⚡', label: 'Fast Learner',    desc: 'Quickly adapts to new frameworks and tools — turning ideas into production-ready solutions with speed and precision.', color: '#f59e0b' },
  { emoji: '🤝', label: 'Team Player',     desc: 'Enjoys collaborative development and building better code together.',                                                    color: '#3b82f6' },
  { emoji: '🧩', label: 'Problem Solver',  desc: 'Breaks down complex systems into clean, elegant solutions with scalability in mind.',                                    color: '#8b5cf6' },
  { emoji: '🔥', label: 'Self-Motivated',  desc: 'Motivated by curiosity and responsibility, actively delivering value ahead of expectations.',                            color: '#ef4444' },
]

const stats = [
  { val: '2+',  label: 'Years Experience', sub: 'Professional' },
  { val: '10+', label: 'Tech Stack',        sub: 'Mastered'     },
]

/* ─── DevAvatar ─── */
function DevAvatar({ hovered, isDark, bg, shDark, shLite }: {
  hovered: boolean
  isDark: boolean
  bg: string
  shDark: string
  shLite: string
}) {
  const [tick, setTick]       = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return <svg viewBox="0 0 280 296" style={{ width: '100%', height: '100%' }} />

  const speed = hovered ? 1.6 : 1
  const t     = tick * 0.04 * speed

  const orbitDots = Array.from({ length: 6 }, (_, i) => {
    const angle = t + (i * Math.PI * 2) / 6
    const r     = 88 + Math.sin(t * 2 + i) * 4
    return { x: 140 + Math.cos(angle) * r, y: 148 + Math.sin(angle) * r * 0.38, size: 3 + Math.sin(t + i) * 1.2 }
  })

  const tokens      = [{ text: '<>', delay: 0 }, { text: '/>', delay: 1.2 }, { text: '{}', delay: 0.6 }, { text: '=>', delay: 1.8 }]
  const glowOpacity = hovered ? 0.22 : 0.09
  const faceColor   = isDark ? '#3a3a44' : '#d1d3da'
  const neckColor   = isDark ? '#2e2e38' : '#c4c6ce'
  const bodyColor   = isDark ? '#33333c' : '#c8cad1'
  const screenBg    = bg
  const eyeColor    = isDark ? '#c8c8d0' : '#4a4a5a'

  return (
    <svg viewBox="0 0 280 296" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Glow ring */}
      <ellipse cx="140" cy="148" rx={hovered ? 128 : 118} ry={hovered ? 128 : 118}
        fill={`rgba(76,175,114,${glowOpacity})`} style={{ transition: 'all 0.5s ease' }} />

      {/* Orbit track */}
      <ellipse cx="140" cy="148" rx="88" ry="33" stroke="rgba(76,175,114,0.18)" strokeWidth="1" strokeDasharray="4 4" fill="none" />

      {/* Orbiting dots */}
      {orbitDots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dot.size} fill="#4caf72" opacity={0.65 + Math.sin(t + i) * 0.3} />
      ))}

      {/* Main circle */}
      <circle cx="140" cy="148" r="96" fill={bg} />
      <circle cx="140" cy="148" r="96" stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)'} strokeWidth="2.5" fill="none" />
      <circle cx="140" cy="148" r="90" stroke="rgba(76,175,114,0.25)" strokeWidth="1.5" fill="none" />

      {/* Head */}
      <ellipse cx="140" cy="108" rx="26" ry="28" fill={faceColor} />
      {/* Neck */}
      <rect x="132" y="134" width="16" height="12" rx="4" fill={neckColor} />
      {/* Torso */}
      <path d="M90 196 Q90 162 140 158 Q190 162 190 196 L186 220 Q140 228 94 220 Z" fill={bodyColor} />
      {/* Laptop screen */}
      <rect x="104" y="172" width="72" height="44" rx="6" fill={screenBg} />
      <rect x="104" y="172" width="72" height="44" rx="6" stroke="rgba(76,175,114,0.35)" strokeWidth="1.5" fill="none" />
      {/* Code lines */}
      <rect x="112" y="182" width="28" height="3" rx="1.5" fill="rgba(76,175,114,0.7)" />
      <rect x="112" y="190" width="44" height="3" rx="1.5" fill="rgba(76,175,114,0.4)" />
      <rect x="112" y="198" width="36" height="3" rx="1.5" fill="rgba(76,175,114,0.55)" />
      <rect x="112" y="206" width="20" height="3" rx="1.5" fill="rgba(76,175,114,0.35)" />
      {/* Keyboard */}
      <rect x="96" y="218" width="88" height="8" rx="4" fill={isDark ? '#2a2a32' : '#c0c2ca'} />
      {/* Eyes */}
      <ellipse cx="130" cy="106" rx="4" ry="4.5" fill={eyeColor} />
      <ellipse cx="150" cy="106" rx="4" ry="4.5" fill={eyeColor} />
      <circle cx="131.5" cy="104.5" r="1.5" fill={isDark ? '#e4e4e9' : 'white'} />
      <circle cx="151.5" cy="104.5" r="1.5" fill={isDark ? '#e4e4e9' : 'white'} />
      {/* Smile */}
      <path d="M132 118 Q140 124 148 118" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Glasses */}
      <rect x="123" y="101" width="12" height="10" rx="5" stroke="#4caf72" strokeWidth="1.8" fill="none" opacity="0.8" />
      <rect x="145" y="101" width="12" height="10" rx="5" stroke="#4caf72" strokeWidth="1.8" fill="none" opacity="0.8" />
      <line x1="135" y1="106" x2="145" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" />
      <line x1="120" y1="104" x2="123" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <line x1="160" y1="104" x2="157" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      {/* Floating tokens */}
      {tokens.map(({ text, delay }, i) => {
        const angle = t * 0.35 + delay
        const fx    = 140 + Math.cos(angle) * 64 * (i % 2 === 0 ? 1.7 : 1.3)
        const fy    = 148 + Math.sin(angle) * 40 * (i % 2 === 0 ? 1.4 : 1) - 20
        return (
          <text key={i} x={fx} y={fy} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700"
            fill="#4caf72" opacity={0.4 + Math.sin(t + delay) * 0.3}>
            {text}
          </text>
        )
      })}
      {/* Corner nodes */}
      {[{ cx: 56, cy: 60 }, { cx: 224, cy: 60 }, { cx: 56, cy: 236 }, { cx: 224, cy: 236 }].map(({ cx, cy }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill={bg} stroke="rgba(76,175,114,0.3)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="rgba(76,175,114,0.45)" />
        </g>
      ))}
      {hovered && (
        <circle cx="140" cy="148" r="104" stroke="rgba(76,175,114,0.3)" strokeWidth="2" fill="none"
          style={{ animation: 'svgPulse 1.2s ease-out infinite' }} />
      )}
      <style>{`@keyframes svgPulse { 0% { r: 100; opacity: 0.5; } 100% { r: 128; opacity: 0; } }`}</style>
    </svg>
  )
}

/* ─── TraitCard ─── */
function TraitCard({ emoji, label, desc, color, index, inView, nm }: {
  emoji: string; label: string; desc: string; color: string
  index: number; inView: boolean
  nm: ReturnType<typeof useNeumorph>
}) {
  const [flipped, setFlipped] = useState(false)
  const { bg, out, inn, text3 } = nm

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      className="cursor-pointer"
      style={{
        perspective: '800px',
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${0.4 + index * 0.08}s, transform 0.5s ease ${0.4 + index * 0.08}s`,
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: bg, boxShadow: out.md,
          border: `1px solid ${nm.border}`, borderRadius: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '26px' }}>{emoji}</span>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: text3 }}>{label}</span>
          <span style={{ fontSize: '8px', color: text3, opacity: 0.6, letterSpacing: '0.05em' }}>tap to flip</span>
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: bg,
          boxShadow: `${inn.sm}, 0 0 0 2px ${color}33`,
          border: `1px solid ${color}44`, borderRadius: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '12px 10px', textAlign: 'center',
        }}>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: '6px' }}>{label}</span>
          <span style={{ fontSize: '10px', color: nm.text2, lineHeight: '1.5', fontWeight: 500 }}>{desc}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── FocusPill ─── */
function FocusPill({ label, glow, nm }: { label: string; glow: string; nm: ReturnType<typeof useNeumorph> }) {
  const [hov, setHov] = useState(false)
  const { bg, out, inn, text3, border } = nm
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider cursor-default transition-all duration-300"
      style={{
        background: bg,
        color: hov ? glow : text3,
        boxShadow: hov ? `${inn.xs}, 0 0 12px ${glow}44` : out.xs,
        border: `1px solid ${hov ? glow + '55' : border}`,
        transform: hov ? 'translateY(-1px)' : 'translateY(0)',
        textShadow: hov ? `0 0 8px ${glow}99` : 'none',
      }}
    >
      {label}
    </div>
  )
}

/* ─── Main ─── */
export default function AboutMe() {
  const nm = useNeumorph()
  const { isDark, bg, shDark, shLite, inDark, inLite, text1, text2, text3, border, accent, out, inn } = nm

  const [inView, setInView]             = useState(false)
  const [avatarHovered, setAvatarHovered] = useState(false)
  const sectionRef                      = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full"
      style={{ background: bg, paddingTop: '3vh', paddingBottom: '10vh', transition: 'background 0.3s ease' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* ── LEFT: Avatar + Stats ── */}
          <div
            className="flex flex-col gap-6 flex-shrink-0 items-center lg:items-start w-full lg:w-[280px]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Avatar card */}
            <div
              className="relative overflow-hidden rounded-3xl flex-shrink-0 flex items-center justify-center"
              style={{
                maxWidth: '320px', height: '280px',
                background: bg,
                boxShadow: avatarHovered
                  ? `12px 12px 28px ${shDark}, -12px -12px 28px ${shLite}, 0 0 40px rgba(76,175,114,0.15)`
                  : out.xl,
                border: `1px solid ${avatarHovered ? 'rgba(76,175,114,0.35)' : border}`,
                transition: 'all 0.4s ease',
                cursor: 'default', padding: '8px',
              }}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
            >
              <DevAvatar hovered={avatarHovered} isDark={isDark} bg={bg} shDark={shDark} shLite={shLite} />

              {/* Name tag */}
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1">
                <span className="text-base font-black tracking-tight" style={{ color: text1 }}>Lahiru Sampath</span>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    color: accent,
                    background: isDark ? 'rgba(39,39,46,0.92)' : 'rgba(236,238,243,0.92)',
                    boxShadow: out.xs,
                    textShadow: '0 0 8px rgba(76,175,114,0.5)',
                  }}
                >
                  Full Stack Developer
                </span>
              </div>

              {/* Available badge */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                style={{
                  background: isDark ? 'rgba(39,39,46,0.92)' : 'rgba(236,238,243,0.92)',
                  boxShadow: out.xs,
                  color: accent,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4caf72] animate-pulse" />
                Available
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-3 w-full lg:w-[280px]" style={{ maxWidth: '320px' }}>
              {stats.map(({ val, label, sub }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-5 py-3 rounded-2xl"
                  style={{
                    background: bg, boxShadow: out.md, border: `1px solid ${border}`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s`,
                  }}
                >
                  <span className="text-2xl font-black leading-none" style={{ color: accent, textShadow: '0 0 12px rgba(76,175,114,0.6)', minWidth: '48px' }}>{val}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black tracking-wide uppercase" style={{ color: text1 }}>{label}</span>
                    <span className="text-[10px] tracking-wider" style={{ color: text3 }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div
            className="flex-1 flex flex-col gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            {/* Quote block */}
            <div
              className="relative rounded-3xl p-7 overflow-hidden"
              style={{ background: bg, boxShadow: inn.lg }}
            >
              <span
                className="absolute -top-2 left-4 text-8xl font-black leading-none pointer-events-none select-none"
                style={{ color: 'rgba(76,175,114,0.12)' }}
              >"</span>
              <p className="relative text-base leading-relaxed font-medium mt-4" style={{ color: text2 }}>
                I'm a{' '}
                <span style={{ color: accent, fontWeight: 700, textShadow: '0 0 8px rgba(76,175,114,0.4)' }}>Software Engineering graduate</span>{' '}
                from <span className="font-semibold" style={{ color: text1 }}>IIT (University of Westminster)</span>, currently working as a{' '}
                <span style={{ color: accent, fontWeight: 700, textShadow: '0 0 8px rgba(76,175,114,0.4)' }}>Junior Software Engineer at NMA Software</span>.
                I specialize in building scalable, full-stack web applications — from architecting{' '}
                <span className="font-semibold" style={{ color: text1 }}>REST APIs with Node.js & Express</span> to crafting{' '}
                <span className="font-semibold" style={{ color: text1 }}>dynamic React frontends</span> backed by{' '}
                <span className="font-semibold" style={{ color: text1 }}>PostgreSQL</span>. I thrive on solving real-world problems through clean, efficient code.
              </p>
              <div className="mt-5 h-px" style={{ background: 'linear-gradient(to right, rgba(76,175,114,0.5), transparent)' }} />
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: '0 0 6px #4caf72' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: text3 }}>Lahiru Sampath</span>
              </div>
            </div>

            {/* Trait cards */}
            <div>
              <p className="text-xs font-black tracking-[0.25em] uppercase mb-3" style={{ color: text3 }}>
                What Defines Me <span style={{ fontSize: '9px', color: text3, opacity: 0.6 }}>(tap to reveal)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {traits.map((trait, i) => (
                  <TraitCard key={trait.label} {...trait} index={i} inView={inView} nm={nm} />
                ))}
              </div>
            </div>

            {/* Focus pills */}
            <div
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: bg, boxShadow: inn.md }}
            >
              <p className="text-xs font-black tracking-[0.25em] uppercase mb-4" style={{ color: text3 }}>Currently Focused On</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Node.js',    glow: '#68a063' },
                  { label: 'React',      glow: '#61dafb' },
                  { label: 'PostgreSQL', glow: '#336791' },
                  { label: 'WebSockets', glow: '#4caf72' },
                  { label: 'AWS S3',     glow: '#ff9900' },
                  { label: 'REST APIs',  glow: '#4caf72' },
                ].map(({ label, glow }) => (
                  <FocusPill key={label} label={label} glow={glow} nm={nm} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}