'use client'
import React, { useEffect, useRef, useState } from 'react'

const traits = [
  {
    emoji: '⚡',
    label: 'Fast Learner',
    desc: 'Quickly adapts to new frameworks and tools — turning ideas into production-ready solutions with speed and precision.',
    color: '#f59e0b',
  },
  {
    emoji: '🤝',
    label: 'Team Player',
    desc: 'Enjoys collaborative development and building better code together.',
    color: '#3b82f6',
  },
  {
    emoji: '🧩',
    label: 'Problem Solver',
    desc: 'Breaks down complex systems into clean, elegant solutions with scalability in mind.',
    color: '#8b5cf6',
  },
  {
    emoji: '🔥',
    label: 'Self-Motivated',
    desc: 'Motivated by curiosity and responsibility, actively delivering value ahead of expectations.',
    color: '#ef4444',
  },
]

const stats = [
  { val: '2+', label: 'Years Exp', sub: 'Professional' },
  { val: '10+', label: 'Tech Stack', sub: 'Mastered' },
]

/* ─── Interactive Developer SVG Avatar ─── */
function DevAvatar({ hovered }: { hovered: boolean }) {
  const [tick, setTick] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTick((t) => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  //prevent ssr mismatch
  if (!mounted) {
    return (
      <svg viewBox="0 0 280 296" style={{ width: '100%', height: '100%' }} />
    )
  }

  const speed = hovered ? 1.6 : 1
  const t = tick * 0.04 * speed

  /* Orbiting dots */
  const orbitDots = Array.from({ length: 6 }, (_, i) => {
    const angle = t + (i * Math.PI * 2) / 6
    const r = 88 + Math.sin(t * 2 + i) * 4
    return {
      x: 140 + Math.cos(angle) * r,
      y: 148 + Math.sin(angle) * r * 0.38,
      size: 3 + Math.sin(t + i) * 1.2,
    }
  })

  /* Floating code tokens */
  const tokens = [
    { text: '<>', delay: 0 },
    { text: '/>', delay: 1.2 },
    { text: '{}', delay: 0.6 },
    { text: '=>', delay: 1.8 },
  ]

  const glowOpacity = hovered ? 0.22 : 0.09

  return (
    <svg
      viewBox="0 0 280 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Outer glow ring */}
      <ellipse
        cx="140"
        cy="148"
        rx={hovered ? 128 : 118}
        ry={hovered ? 128 : 118}
        fill={`rgba(76,175,114,${glowOpacity})`}
        style={{ transition: 'all 0.5s ease' }}
      />

      {/* Orbit track (ellipse) */}
      <ellipse
        cx="140"
        cy="148"
        rx="88"
        ry="33"
        stroke="rgba(76,175,114,0.18)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Orbiting dots */}
      {orbitDots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill="#4caf72"
          opacity={0.65 + Math.sin(t + i) * 0.3}
        />
      ))}

      {/* Main circle base (neumorphic feel) */}
      <circle cx="140" cy="148" r="96" fill="#eceef3" />
      <circle cx="140" cy="148" r="96" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" fill="none" />
      <circle cx="140" cy="148" r="90" stroke="rgba(76,175,114,0.25)" strokeWidth="1.5" fill="none" />

      {/* ── Stylised developer silhouette ── */}

      {/* Head */}
      <ellipse cx="140" cy="108" rx="26" ry="28" fill="#d1d3da" />
      {/* Neck */}
      <rect x="132" y="134" width="16" height="12" rx="4" fill="#c4c6ce" />

      {/* Shoulders / torso */}
      <path
        d="M90 196 Q90 162 140 158 Q190 162 190 196 L186 220 Q140 228 94 220 Z"
        fill="#c8cad1"
      />
      {/* Laptop screen */}
      <rect x="104" y="172" width="72" height="44" rx="6" fill="#eceef3" />
      <rect x="104" y="172" width="72" height="44" rx="6" stroke="rgba(76,175,114,0.35)" strokeWidth="1.5" fill="none" />

      {/* Code lines on screen */}
      <rect x="112" y="182" width="28" height="3" rx="1.5" fill="rgba(76,175,114,0.7)" />
      <rect x="112" y="190" width="44" height="3" rx="1.5" fill="rgba(76,175,114,0.4)" />
      <rect x="112" y="198" width="36" height="3" rx="1.5" fill="rgba(76,175,114,0.55)" />
      <rect x="112" y="206" width="20" height="3" rx="1.5" fill="rgba(76,175,114,0.35)" />

      {/* Keyboard base */}
      <rect x="96" y="218" width="88" height="8" rx="4" fill="#c0c2ca" />

      {/* Face details */}
      {/* Eyes */}
      <ellipse cx="130" cy="106" rx="4" ry="4.5" fill="#4a4a5a" />
      <ellipse cx="150" cy="106" rx="4" ry="4.5" fill="#4a4a5a" />
      <circle cx="131.5" cy="104.5" r="1.5" fill="white" />
      <circle cx="151.5" cy="104.5" r="1.5" fill="white" />

      {/* Smile */}
      <path d="M132 118 Q140 124 148 118" stroke="#4a4a5a" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Glasses */}
      <rect x="123" y="101" width="12" height="10" rx="5" stroke="#4caf72" strokeWidth="1.8" fill="none" opacity="0.8" />
      <rect x="145" y="101" width="12" height="10" rx="5" stroke="#4caf72" strokeWidth="1.8" fill="none" opacity="0.8" />
      <line x1="135" y1="106" x2="145" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" />
      <line x1="120" y1="104" x2="123" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <line x1="160" y1="104" x2="157" y2="106" stroke="#4caf72" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />

      {/* Floating code tokens */}
      {tokens.map(({ text, delay }, i) => {
        const angle = t * 0.35 + delay
        const baseR = 64
        const fx = 140 + Math.cos(angle) * baseR * (i % 2 === 0 ? 1.7 : 1.3)
        const fy = 148 + Math.sin(angle) * 40 * (i % 2 === 0 ? 1.4 : 1) - 20
        const op = 0.4 + Math.sin(t + delay) * 0.3
        return (
          <text
            key={i}
            x={fx}
            y={fy}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="700"
            fill="#4caf72"
            opacity={op}
          >
            {text}
          </text>
        )
      })}

      {/* Corner circuit nodes */}
      {[
        { cx: 56, cy: 60 },
        { cx: 224, cy: 60 },
        { cx: 56, cy: 236 },
        { cx: 224, cy: 236 },
      ].map(({ cx, cy }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#eceef3" stroke="rgba(76,175,114,0.3)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="rgba(76,175,114,0.45)" />
        </g>
      ))}

      {/* Pulse ring when hovered */}
      {hovered && (
        <circle
          cx="140"
          cy="148"
          r="104"
          stroke="rgba(76,175,114,0.3)"
          strokeWidth="2"
          fill="none"
          style={{
            animation: 'svgPulse 1.2s ease-out infinite',
          }}
        />
      )}

      <style>{`
        @keyframes svgPulse {
          0% { r: 100; opacity: 0.5; }
          100% { r: 128; opacity: 0; }
        }
      `}</style>
    </svg>
  )
}

/* ─── Trait Card ─── */
function TraitCard({ emoji, label, desc, color, index, inView }: {
  emoji: string
  label: string
  desc: string
  color: string
  index: number
  inView: boolean
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      className="cursor-pointer"
      style={{
        perspective: '800px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${0.4 + index * 0.08}s, transform 0.5s ease ${0.4 + index * 0.08}s`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#eceef3',
            boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '26px' }}>{emoji}</span>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>
            {label}
          </span>
          <span style={{ fontSize: '8px', color: 'rgba(156,163,175,0.6)', letterSpacing: '0.05em' }}>tap to flip</span>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#eceef3',
            boxShadow: `inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff, 0 0 0 2px ${color}33`,
            border: `1px solid ${color}44`,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 10px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: '6px' }}>
            {label}
          </span>
          <span style={{ fontSize: '10px', color: '#6b7280', lineHeight: '1.5', fontWeight: 500 }}>{desc}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export default function AboutMe() {
  const [inView, setInView] = useState(false)
  const [avatarHovered, setAvatarHovered] = useState(false)
  const [copyPulse, setCopyPulse] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCopy = () => {
    navigator.clipboard?.writeText('lahirusampath.dev@gmail.com')
    setCopyPulse(true)
    setTimeout(() => setCopyPulse(false), 1800)
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-[#eceef3]"
      style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Section label */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ background: '#eceef3', boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 18px rgba(76,175,114,0.5)' }} />
            <span className="text-sm font-black tracking-[0.3em] uppercase text-gray-500">About Me</span>
          </div>
          <div className="h-px w-48" style={{ background: 'linear-gradient(to right, transparent, rgba(76,175,114,0.5), transparent)' }} />
        </div>

        {/* Main grid */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* LEFT — SVG Avatar + Stats */}
          <div
            className="flex flex-col gap-6 flex-shrink-0"
            style={{
              width: '280px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Avatar card */}
            <div
              className="relative overflow-hidden rounded-3xl flex-shrink-0 flex items-center justify-center"
              style={{
                height: '280px',
                background: '#eceef3',
                boxShadow: avatarHovered
                  ? '12px 12px 28px #c8cad1, -12px -12px 28px #ffffff, 0 0 40px rgba(76,175,114,0.15)'
                  : '8px 8px 20px #d1d3da, -8px -8px 20px #ffffff',
                border: `1px solid ${avatarHovered ? 'rgba(76,175,114,0.35)' : 'rgba(255,255,255,0.8)'}`,
                transition: 'all 0.4s ease',
                cursor: 'default',
                padding: '8px',
              }}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
            >
              <DevAvatar hovered={avatarHovered} />

              {/* Name tag */}
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1">
                <span className="text-base font-black text-gray-700 tracking-tight">Lahiru Sampath</span>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ color: '#4caf72', background: 'rgba(236,238,243,0.92)', boxShadow: '2px 2px 6px #d1d3da, -2px -2px 6px #ffffff', textShadow: '0 0 8px rgba(76,175,114,0.5)' }}
                >
                  Full Stack Developer
                </span>
              </div>

              {/* Status badge */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(236,238,243,0.92)', boxShadow: '2px 2px 6px #d1d3da, -2px -2px 6px #ffffff', color: '#4caf72' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4caf72] animate-pulse" />
                Available
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-3">
              {stats.map(({ val, label, sub }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-5 py-3 rounded-2xl"
                  style={{
                    background: '#eceef3',
                    boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff',
                    border: '1px solid rgba(255,255,255,0.7)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s`,
                  }}
                >
                  <span className="text-2xl font-black leading-none" style={{ color: '#4caf72', textShadow: '0 0 12px rgba(76,175,114,0.6)', minWidth: '48px' }}>{val}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-600 tracking-wide uppercase">{label}</span>
                    <span className="text-[10px] text-gray-400 tracking-wider">{sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy email mini-CTA */}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={{
                background: '#eceef3',
                color: copyPulse ? '#4caf72' : '#9ca3af',
                boxShadow: copyPulse
                  ? 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff, 0 0 0 2px rgba(76,175,114,0.4)'
                  : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                border: `1px solid ${copyPulse ? 'rgba(76,175,114,0.35)' : 'rgba(255,255,255,0.6)'}`,
              }}
            >
              <span>{copyPulse ? '✓' : '📋'}</span>
              <span>{copyPulse ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* RIGHT — Content */}
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
              style={{ background: '#eceef3', boxShadow: 'inset 6px 6px 14px #d1d3da, inset -6px -6px 14px #ffffff' }}
            >
              <span
                className="absolute -top-2 left-4 text-8xl font-black leading-none pointer-events-none select-none"
                style={{ color: 'rgba(76,175,114,0.12)' }}
              >"</span>

              <p className="relative text-gray-500 text-base leading-relaxed font-medium mt-4">
                I'm a <span style={{ color: '#4caf72', fontWeight: 700, textShadow: '0 0 8px rgba(76,175,114,0.4)' }}>Software Engineering graduate</span> from{' '}
                <span className="font-semibold text-gray-600">IIT (University of Westminster)</span>, currently working as a{' '}
                <span style={{ color: '#4caf72', fontWeight: 700, textShadow: '0 0 8px rgba(76,175,114,0.4)' }}>Junior Software Engineer at NMA Software</span>.
                I specialize in building scalable, full-stack web applications — from architecting{' '}
                <span className="font-semibold text-gray-600">REST APIs with Node.js & Express</span> to crafting{' '}
                <span className="font-semibold text-gray-600">dynamic React frontends</span> backed by{' '}
                <span className="font-semibold text-gray-600">PostgreSQL</span>. I thrive on solving real-world problems through clean, efficient code.
              </p>

              <div className="mt-5 h-px" style={{ background: 'linear-gradient(to right, rgba(76,175,114,0.5), transparent)' }} />
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4caf72', boxShadow: '0 0 6px #4caf72' }} />
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Lahiru Sampath · 2025</span>
              </div>
            </div>

            {/* Flip Trait Cards */}
            <div>
              <p className="text-xs font-black tracking-[0.25em] uppercase text-gray-400 mb-3">
                What Defines Me <span style={{ fontSize: '9px', color: '#b0b4bc' }}>(tap to reveal)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {traits.map((trait, i) => (
                  <TraitCard key={trait.label} {...trait} index={i} inView={inView} />
                ))}
              </div>
            </div>

            {/* Interactive skill orbs — horizontal scrollable highlight */}
            <div
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: '#eceef3', boxShadow: 'inset 4px 4px 10px #d1d3da, inset -4px -4px 10px #ffffff' }}
            >
              <p className="text-xs font-black tracking-[0.25em] uppercase text-gray-400 mb-4">Currently Focused On</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Node.js', glow: '#68a063' },
                  { label: 'React', glow: '#61dafb' },
                  { label: 'PostgreSQL', glow: '#336791' },
                  { label: 'WebSockets', glow: '#4caf72' },
                  { label: 'AWS S3', glow: '#ff9900' },
                  { label: 'REST APIs', glow: '#4caf72' },
                ].map(({ label, glow }) => (
                  <FocusPill key={label} label={label} glow={glow} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Glow Pill with hover state ─── */
function FocusPill({ label, glow }: { label: string; glow: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider cursor-default transition-all duration-300"
      style={{
        background: '#eceef3',
        color: hov ? glow : '#9ca3af',
        boxShadow: hov
          ? `inset 2px 2px 5px #c8cad1, inset -2px -2px 5px #ffffff, 0 0 12px ${glow}44`
          : '2px 2px 6px #d1d3da, -2px -2px 6px #ffffff',
        border: `1px solid ${hov ? glow + '55' : 'rgba(255,255,255,0.6)'}`,
        transform: hov ? 'translateY(-1px)' : 'translateY(0)',
        textShadow: hov ? `0 0 8px ${glow}99` : 'none',
      }}
    >
      {label}
    </div>
  )
}