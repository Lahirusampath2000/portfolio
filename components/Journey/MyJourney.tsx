'use client'
import React, { useState, useEffect } from 'react'
import { entries, type JourneyEntry, type NodeId } from './journey'

const NODE_SPACING  = 200
const TRUNK_TOP     = 80
const TRUNK_BOTTOM  = TRUNK_TOP + (entries.length - 1) * NODE_SPACING
const TREE_HEIGHT   = TRUNK_BOTTOM + 160

const nodeY = (idx: number): number => TRUNK_TOP + idx * NODE_SPACING

export default function MyJourney() {
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
    setAnimKey((k) => k + 1)
  }

  const activeEntry: JourneyEntry = entries.find((e) => e.id === active) ?? entries[0]

  return (
    <section
      id="about"
      className="w-full bg-[#eceef3]"
      style={{ minHeight: '100vh', paddingTop: '14vh', paddingBottom: '8vh' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: '#eceef3',
              boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff',
              border: '1px solid rgba(255,255,255,0.7)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 18px rgba(76,175,114,0.5)' }}
            />
            <span className="text-sm font-black tracking-[0.3em] uppercase text-gray-500">My Journey</span>
          </div>
          <div
            className="h-px w-48"
            style={{ background: 'linear-gradient(to right, transparent, rgba(76,175,114,0.5), transparent)' }}
          />
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-start gap-20 justify-center">

          {/* Tree column */}
          <div className="flex-shrink-0 flex justify-center" style={{ minWidth: '180px' }}>
            <div className="relative" style={{ width: '160px', height: `${TREE_HEIGHT}px` }}>

              {/* Canopy glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '160px', height: '120px',
                  top: '0px', left: '50%', transform: 'translateX(-50%)',
                  background: 'radial-gradient(ellipse, rgba(76,175,114,0.15) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />

              {/* Trunk */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000"
                style={{
                  top: `${TRUNK_TOP}px`,
                  height: treeMounted ? `${TRUNK_BOTTOM - TRUNK_TOP}px` : '0px',
                  width: '6px',
                  background: 'linear-gradient(to bottom, #4caf72 0%, #68c98a 30%, #8aad95 55%, #a0b8a8 75%, #7a5c3a 100%)',
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
                <div
                  key={i}
                  className="absolute rounded-full transition-all duration-1000"
                  style={{
                    top: `${TRUNK_BOTTOM}px`,
                    left: `calc(50% + ${ml})`,
                    width: '3px',
                    height: treeMounted ? `${h}px` : '0px',
                    background: 'linear-gradient(to bottom, #7a5c3a, transparent)',
                    transform: `rotate(${rot}deg)`,
                    transformOrigin: 'top center',
                    transitionDelay: `${delay}ms`,
                  }}
                />
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
                      <span
                        className="text-[8px] font-black tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                        style={{ background: '#7a5c3a', color: '#f5e6d3' }}
                      >
                        ROOT
                      </span>
                    )}

                    <div
                      className="relative transition-all duration-300 flex items-center justify-center text-xl"
                      style={{
                        width: isActive ? '56px' : '46px',
                        height: isActive ? '56px' : '46px',
                        borderRadius: '9999px',
                        background: '#eceef3',
                        boxShadow: isActive
                          ? `inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff, 0 0 0 3px ${entry.color}, 0 0 20px ${entry.color}55`
                          : '5px 5px 14px #d1d3da, -5px -5px 14px #ffffff',
                        border: `2px solid ${isActive ? entry.color : 'rgba(255,255,255,0.7)'}`,
                      }}
                    >
                      {entry.isRoot && (
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            border: '1.5px dashed #a07850',
                            margin: '5px',
                            borderRadius: '9999px',
                            opacity: 0.65,
                          }}
                        />
                      )}
                      {entry.icon}
                    </div>

                    <div
                      className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-300"
                      style={{
                        background: '#eceef3',
                        boxShadow: isActive
                          ? 'inset 2px 2px 5px #c8cad1, inset -2px -2px 5px #ffffff'
                          : '2px 2px 5px #d1d3da, -2px -2px 5px #ffffff',
                        minWidth: '128px',
                      }}
                    >
                      <span
                        className="text-[10px] font-black tracking-wide uppercase text-center transition-colors duration-300"
                        style={{ color: isActive ? entry.color : '#9ca3af' }}
                      >
                        {entry.label}
                      </span>
                      {entry.resultLine ? (
                        <span
                          className="text-[8px] font-semibold tracking-wider text-center"
                          style={{ color: '#a07850' }}
                        >
                          {entry.resultLine}
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-gray-400 tracking-wider text-center">
                          {entry.period}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}

            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 flex flex-col gap-6" style={{ paddingTop: `${TRUNK_TOP - 20}px` }}>

            {/* Header */}
            <div
              key={active + '-header'}
              className="flex items-center gap-4"
              style={{ animation: 'fadeSlideIn 0.4s ease' }}
            >
              <div
                className="flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: '#eceef3',
                  boxShadow: 'inset 4px 4px 10px #d1d3da, inset -4px -4px 10px #ffffff',
                }}
              >
                {activeEntry.icon}
              </div>
              <div>
                <h3
                  className="text-xl font-black tracking-tight"
                  style={{ color: activeEntry.color, textShadow: `0 0 16px ${activeEntry.color}60` }}
                >
                  {activeEntry.label}
                </h3>
                <p className="text-sm font-semibold text-gray-400">{activeEntry.sub}</p>
                {activeEntry.resultLine ? (
                  <p className="text-xs mt-0.5" style={{ color: '#a07850' }}>
                    {activeEntry.resultLine}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">{activeEntry.period}</p>
                )}
              </div>
            </div>

            {/* Detail card */}
            <div
              key={active + '-card-' + animKey}
              className="rounded-2xl p-6"
              style={{
                background: '#eceef3',
                boxShadow: 'inset 5px 5px 12px #d1d3da, inset -5px -5px 12px #ffffff',
                animation: 'fadeSlideIn 0.45s ease',
              }}
            >
              <p className="text-sm font-semibold text-gray-500 mb-4 leading-relaxed">
                {activeEntry.detail.title}
              </p>
              <ul className="flex flex-col gap-3">
                {activeEntry.detail.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeEntry.color, boxShadow: `0 0 6px ${activeEntry.color}aa` }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 flex-wrap">
              {entries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNode(entry.id)}
                  className="flex items-center gap-2 px-4 h-[36px] rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: '#eceef3',
                    color: active === entry.id ? entry.color : '#9ca3af',
                    boxShadow:
                      active === entry.id
                        ? 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
                        : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                    border: `1px solid ${active === entry.id ? entry.color + '44' : 'rgba(255,255,255,0.6)'}`,
                  }}
                >
                  <span>{entry.icon}</span>
                  <span>{entry.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 flex-wrap mt-1">
              {[
                { val: '2+',  label: 'Years Exp'  },
                { val: '5+',  label: 'Projects'   },
                { val: '10+', label: 'Tech Stack' },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{
                    background: '#eceef3',
                    boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff',
                    border: '1px solid rgba(255,255,255,0.7)',
                  }}
                >
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ color: '#4caf72', textShadow: '0 0 12px rgba(76,175,114,0.6)' }}
                  >
                    {val}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-1">
                    {label}
                  </span>
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