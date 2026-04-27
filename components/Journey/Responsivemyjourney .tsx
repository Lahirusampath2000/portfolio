'use client'
import React, { useState, useEffect } from 'react'
import { entries, type JourneyEntry, type NodeId } from './journey'
import MyJourney from './MyJourney'
import { useNeumorph } from '@/hooks/useNeumorph'

/* ── Mobile tree geometry (compact) ── */
const M_SPACING   = 90
const M_TRUNK_TOP = 46
const M_TRUNK_BOT = M_TRUNK_TOP + (entries.length - 1) * M_SPACING
const M_HEIGHT    = M_TRUNK_BOT + 68
const mNodeY = (i: number) => M_TRUNK_TOP + i * M_SPACING

function JourneyHeadline({ text1, accent }: { text1: string; accent: string }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 150)
    return () => clearTimeout(t)
  }, [])

  const gray  = ['Every', 'step,']
  const green = ['every', 'skill.']

  return (
    <p className="text-2xl md:text-3xl font-black leading-snug tracking-tight text-center">
      {gray.map((w, i) => (
        <span key={w} style={{
          display: 'inline-block', marginRight: '0.28em', color: text1,
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s ease ${i * 0.1}s`,
        }}>{w}</span>
      ))}
      {green.map((w, i) => (
        <span key={w} style={{
          display: 'inline-block', marginRight: i < green.length - 1 ? '0.28em' : 0,
          color: accent,
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
          textShadow: shown ? '0 0 20px rgba(76,175,114,0.4)' : 'none',
          transition: `opacity 0.45s ease ${(gray.length + i) * 0.1}s, transform 0.45s ease ${(gray.length + i) * 0.1}s`,
        }}>{w}</span>
      ))}
    </p>
  )
}

/* ── Mobile-only layout ── */
function MobileJourney() {
  const nm = useNeumorph()
  const { isDark, bg, shDark, shLite, text1, text2, text3, border, accent, out, inn } = nm

  const [active, setActive]           = useState<NodeId>(entries[0].id)
  const [animKey, setAnimKey]         = useState(0)
  const [treeMounted, setTreeMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTreeMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  const handleNode = (id: NodeId) => {
    if (id === active) return
    setActive(id)
    setAnimKey(k => k + 1)
  }

  const activeEntry: JourneyEntry = entries.find(e => e.id === active) ?? entries[0]

  const trunkGradient = isDark
    ? 'linear-gradient(to bottom, #4caf72 0%, #5ab87a 30%, #4a7a5a 55%, #3a5a48 75%, #6b4f2e 100%)'
    : 'linear-gradient(to bottom, #4caf72 0%, #68c98a 30%, #8aad95 55%, #a0b8a8 75%, #7a5c3a 100%)'
  const rootGradient = isDark
    ? 'linear-gradient(to bottom, #6b4f2e, transparent)'
    : 'linear-gradient(to bottom, #7a5c3a, transparent)'

  return (
    <section
      id="about"
      className="w-full"
      style={{ background: bg, minHeight: '100vh', paddingTop: '3vh', paddingBottom: '8vh', transition: 'background 0.3s ease' }}
    >
      <div className="mx-auto px-4" style={{ maxWidth: '100vw' }}>

        {/* Heading */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div className="flex flex-col items-center gap-3 mt-2 text-center max-w-sm">
            <JourneyHeadline text1={text1} accent={accent} />
            <p className="text-sm font-semibold leading-relaxed" style={{ color: text3 }}>
              From classroom to production — school, internship, and a Junior Software engineering role.
            </p>
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: accent, boxShadow: '0 0 6px #4caf72' }} />
              <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>Tap a node</span>
              <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: accent }}>→ reveal the chapter</span>
            </div>
          </div>
        </div>

        {/* Main: compact tree LEFT · detail RIGHT */}
        <div className="flex flex-row items-start gap-3">

          {/* Compact tree */}
          <div className="flex-shrink-0" style={{ width: '62px' }}>
            <div className="relative" style={{ height: `${M_HEIGHT}px` }}>

              {/* Trunk */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000"
                style={{
                  top: `${M_TRUNK_TOP}px`,
                  height: treeMounted ? `${M_TRUNK_BOT - M_TRUNK_TOP}px` : '0px',
                  width: '4px', background: trunkGradient,
                  boxShadow: treeMounted ? '0 0 10px rgba(76,175,114,0.25)' : 'none',
                  transformOrigin: 'top center',
                }}
              />

              {/* Roots */}
              {[
                { rot: -20, h: 26, delay: 300 },
                { rot: 0,   h: 34, delay: 380 },
                { rot: 20,  h: 26, delay: 460 },
              ].map(({ rot, h, delay }, i) => (
                <div key={i} className="absolute rounded-full transition-all duration-1000" style={{
                  top: `${M_TRUNK_BOT}px`, left: '50%', width: '2px',
                  height: treeMounted ? `${h}px` : '0px',
                  background: rootGradient,
                  transform: `rotate(${rot}deg)`, transformOrigin: 'top center',
                  transitionDelay: `${delay}ms`,
                }} />
              ))}

              {/* Nodes */}
              {entries.map((entry, idx) => {
                const isActive = active === entry.id
                return (
                  <button
                    key={entry.id}
                    onClick={() => handleNode(entry.id)}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ top: `${mNodeY(idx)}px`, zIndex: 10 }}
                  >
                    {entry.isRoot && (
                      <span
                        className="absolute -top-4 text-[5px] font-black tracking-[0.12em] uppercase px-1 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: isDark ? '#4a3520' : '#7a5c3a', color: isDark ? '#f0d5b0' : '#f5e6d3' }}
                      >
                        ROOT
                      </span>
                    )}
                    <div
                      className="relative flex items-center justify-center transition-all duration-300"
                      style={{
                        width:    isActive ? '46px' : '36px',
                        height:   isActive ? '46px' : '36px',
                        fontSize: isActive ? '20px' : '15px',
                        borderRadius: '9999px', background: bg,
                        boxShadow: isActive
                          ? `${inn.xs}, 0 0 0 2.5px ${entry.color}, 0 0 16px ${entry.color}55`
                          : out.md,
                        border: `1.5px solid ${isActive ? entry.color : border}`,
                      }}
                    >
                      {entry.isRoot && (
                        <div className="absolute inset-0 rounded-full pointer-events-none"
                          style={{ border: `1px dashed ${isDark ? '#8a6040' : '#a07850'}`, margin: '4px', opacity: 0.65 }} />
                      )}
                      {entry.icon}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">

            {/* Header */}
            <div key={active + '-hdr'} className="flex items-center gap-2.5" style={{ animation: 'fadeSlideIn 0.38s ease' }}>
              <div className="flex-shrink-0 flex items-center justify-center text-lg"
                style={{ width: '42px', height: '42px', borderRadius: '12px', background: bg, boxShadow: inn.sm }}>
                {activeEntry.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black tracking-tight leading-snug"
                  style={{ color: activeEntry.color, textShadow: `0 0 12px ${activeEntry.color}60` }}>
                  {activeEntry.label}
                </h3>
                <p className="text-[11px] font-semibold leading-tight truncate" style={{ color: text3 }}>{activeEntry.sub}</p>
                <p className="text-[10px] leading-tight" style={{ color: text3 }}>
                  {activeEntry.resultLine ?? activeEntry.period}
                </p>
              </div>
            </div>

            {/* Pill nav */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {entries.map(e => (
                <button
                  key={e.id}
                  onClick={() => handleNode(e.id)}
                  className="flex items-center gap-1 px-2.5 h-[28px] rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: bg,
                    color: active === e.id ? e.color : text3,
                    boxShadow: active === e.id ? inn.xs : out.xs,
                    border: `1px solid ${active === e.id ? e.color + '44' : border}`,
                  }}
                >
                  <span className="text-xs">{e.icon}</span>
                  <span>{e.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Detail card */}
            <div
              key={active + '-card-' + animKey}
              className="rounded-2xl p-4"
              style={{ background: bg, boxShadow: inn.md, animation: 'fadeSlideIn 0.42s ease' }}
            >
              <p className="text-[11px] font-semibold mb-3 leading-relaxed" style={{ color: text2 }}>{activeEntry.detail.title}</p>
              <ul className="flex flex-col gap-2">
                {activeEntry.detail.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: text3 }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeEntry.color, boxShadow: `0 0 5px ${activeEntry.color}aa` }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2">
              {[{ val: '2+', label: 'Yrs Exp' }, { val: '5+', label: 'Projects' }, { val: '10+', label: 'Tech Stack' }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center px-2 py-2 rounded-xl flex-1"
                  style={{ background: bg, boxShadow: out.sm, border: `1px solid ${border}` }}>
                  <span className="text-base font-black leading-none"
                    style={{ color: accent, textShadow: '0 0 10px rgba(76,175,114,0.6)' }}>{val}</span>
                  <span className="text-[8px] font-semibold tracking-wider uppercase mt-0.5 text-center leading-tight" style={{ color: text3 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

/* ── Public export ── */
export default function ResponsiveMyJourney() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile === null) return null
  if (isMobile) return <MobileJourney />
  return <MyJourney />
}