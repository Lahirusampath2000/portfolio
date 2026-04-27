'use client'
import React, { useState, useEffect } from 'react'
import { entries, type JourneyEntry, type NodeId } from './journey'
import { useNeumorph } from '@/hooks/useNeumorph'

const NODE_SPACING  = 200
const TRUNK_TOP     = 80
const TRUNK_BOTTOM  = TRUNK_TOP + (entries.length - 1) * NODE_SPACING
const TREE_HEIGHT   = TRUNK_BOTTOM + 160
const nodeY = (idx: number): number => TRUNK_TOP + idx * NODE_SPACING

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

export default function MyJourney() {
  const nm = useNeumorph()
  const { isDark, bg, shDark, shLite, inDark, inLite, text1, text2, text3, border, accent, out, inn } = nm

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

  /* Tree colors adapt to theme */
  const trunkGradient = isDark
    ? 'linear-gradient(to bottom, #4caf72 0%, #5ab87a 30%, #4a7a5a 55%, #3a5a48 75%, #6b4f2e 100%)'
    : 'linear-gradient(to bottom, #4caf72 0%, #68c98a 30%, #8aad95 55%, #a0b8a8 75%, #7a5c3a 100%)'
  const rootGradient  = isDark
    ? 'linear-gradient(to bottom, #6b4f2e, transparent)'
    : 'linear-gradient(to bottom, #7a5c3a, transparent)'

  return (
    <section
      id="about"
      className="w-full"
      style={{ background: bg, minHeight: '100vh', paddingTop: '3vh', paddingBottom: '8vh', transition: 'background 0.3s ease' }}
    >
      <div className="max-w-5xl mx-auto px-6">

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

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-20 justify-center">

          {/* ── Tree column ── */}
          <div className="flex-shrink-0 flex justify-center order-2 md:order-1" style={{ minWidth: '180px' }}>
            <div className="relative" style={{ width: '160px', height: `${TREE_HEIGHT}px` }}>

              {/* Canopy glow */}
              <div className="absolute pointer-events-none" style={{
                width: '160px', height: '120px', top: '0px', left: '50%', transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse, rgba(76,175,114,0.15) 0%, transparent 70%)',
                filter: 'blur(10px)',
              }} />

              {/* Trunk */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000"
                style={{
                  top: `${TRUNK_TOP}px`,
                  height: treeMounted ? `${TRUNK_BOTTOM - TRUNK_TOP}px` : '0px',
                  width: '6px',
                  background: trunkGradient,
                  boxShadow: treeMounted ? '0 0 12px rgba(76,175,114,0.25)' : 'none',
                  transformOrigin: 'top center',
                }}
              />

              {/* Roots */}
              {[
                { ml: '-16px', rot: -22, h: 44, delay: 300 },
                { ml: '0px',   rot: 0,   h: 54, delay: 380 },
                { ml: '16px',  rot: 22,  h: 44, delay: 460 },
              ].map(({ ml, rot, h, delay }, i) => (
                <div key={i} className="absolute rounded-full transition-all duration-1000" style={{
                  top: `${TRUNK_BOTTOM}px`,
                  left: `calc(50% + ${ml})`,
                  width: '3px',
                  height: treeMounted ? `${h}px` : '0px',
                  background: rootGradient,
                  transform: `rotate(${rot}deg)`, transformOrigin: 'top center',
                  transitionDelay: `${delay}ms`,
                }} />
              ))}

              {/* Nodes */}
              {entries.map((entry, idx) => {
                const yPos    = nodeY(idx)
                const isActive = active === entry.id
                return (
                  <button
                    key={entry.id}
                    onClick={() => handleNode(entry.id)}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
                    style={{ top: `${yPos}px`, zIndex: 10 }}
                  >
                    {entry.isRoot && (
                      <span className="text-[8px] font-black tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: isDark ? '#4a3520' : '#7a5c3a', color: isDark ? '#f0d5b0' : '#f5e6d3' }}>
                        ROOT
                      </span>
                    )}
                    <div
                      className="relative transition-all duration-300 flex items-center justify-center text-xl"
                      style={{
                        width:  isActive ? '56px' : '46px',
                        height: isActive ? '56px' : '46px',
                        borderRadius: '9999px', background: bg,
                        boxShadow: isActive
                          ? `${inn.sm}, 0 0 0 3px ${entry.color}, 0 0 20px ${entry.color}55`
                          : out.lg,
                        border: `2px solid ${isActive ? entry.color : border}`,
                      }}
                    >
                      {entry.isRoot && (
                        <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                          border: `1.5px dashed ${isDark ? '#8a6040' : '#a07850'}`,
                          margin: '5px', borderRadius: '9999px', opacity: 0.65,
                        }} />
                      )}
                      {entry.icon}
                    </div>

                    <div
                      className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-300"
                      style={{
                        background: bg,
                        boxShadow: isActive ? inn.xs : out.xs,
                        minWidth: '128px',
                      }}
                    >
                      <span className="text-[10px] font-black tracking-wide uppercase text-center transition-colors duration-300"
                        style={{ color: isActive ? entry.color : text3 }}>
                        {entry.label}
                      </span>
                      {entry.resultLine ? (
                        <span className="text-[8px] font-semibold tracking-wider text-center"
                          style={{ color: isDark ? '#a07050' : '#a07850' }}>{entry.resultLine}</span>
                      ) : (
                        <span className="text-[9px] font-semibold tracking-wider text-center" style={{ color: text3 }}>{entry.period}</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Detail panel ── */}
          <div className="flex-1 flex flex-col gap-6 order-1 md:order-2 pt-0 md:pt-[60px] w-full">

            {/* Header */}
            <div key={active + '-header'} className="flex items-center gap-4" style={{ animation: 'fadeSlideIn 0.4s ease' }}>
              <div
                className="flex items-center justify-center text-2xl flex-shrink-0"
                style={{ width: '56px', height: '56px', borderRadius: '16px', background: bg, boxShadow: inn.md }}
              >
                {activeEntry.icon}
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight"
                  style={{ color: activeEntry.color, textShadow: `0 0 16px ${activeEntry.color}60` }}>
                  {activeEntry.label}
                </h3>
                <p className="text-sm font-semibold" style={{ color: text3 }}>{activeEntry.sub}</p>
                {activeEntry.resultLine ? (
                  <p className="text-xs mt-0.5" style={{ color: isDark ? '#a07050' : '#a07850' }}>{activeEntry.resultLine}</p>
                ) : (
                  <p className="text-xs mt-0.5" style={{ color: text3 }}>{activeEntry.period}</p>
                )}
              </div>
            </div>

            {/* Detail card */}
            <div
              key={active + '-card-' + animKey}
              className="rounded-2xl p-6"
              style={{ background: bg, boxShadow: inn.lg, animation: 'fadeSlideIn 0.45s ease' }}
            >
              <p className="text-sm font-semibold mb-4 leading-relaxed" style={{ color: text2 }}>{activeEntry.detail.title}</p>
              <ul className="flex flex-col gap-3">
                {activeEntry.detail.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: text3 }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeEntry.color, boxShadow: `0 0 6px ${activeEntry.color}aa` }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tab pills */}
            <div className="flex items-center gap-3 flex-wrap">
              {entries.map(entry => (
                <button
                  key={entry.id}
                  onClick={() => handleNode(entry.id)}
                  className="flex items-center gap-2 px-4 h-[36px] rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: bg,
                    color: active === entry.id ? entry.color : text3,
                    boxShadow: active === entry.id ? inn.sm : out.sm,
                    border: `1px solid ${active === entry.id ? entry.color + '44' : border}`,
                  }}
                >
                  <span>{entry.icon}</span>
                  <span>{entry.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 flex-wrap mt-1">
              {[{ val: '2+', label: 'Years Exp' }, { val: '10+', label: 'Projects' }, { val: '10+', label: 'Tech Stack' }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}>
                  <span className="text-2xl font-black leading-none"
                    style={{ color: accent, textShadow: '0 0 12px rgba(76,175,114,0.6)' }}>{val}</span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase mt-1" style={{ color: text3 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}