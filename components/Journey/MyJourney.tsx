'use client'
import React, { useState, useEffect } from 'react'

type NodeId = 'nma' | 'intern' | 'edu' |'school'

const nodes: { id: NodeId; label: string; sub: string; period: string; icon: string; color: string; isRoot?: boolean }[] = [
  { id: 'nma', label: 'NMA Software', sub: 'Junior Software Engineer', period: 'Apr 2025 – Present', icon: '🌿', color: '#4caf72' },
  { id: 'intern', label: 'Apps Technologies', sub: 'Software Engineer Intern', period: 'Sep 2023 – Sep 2024', icon: '🌱', color: '#68c98a' },
  { id: 'edu', label: 'Informatic Institute of Technology', sub: 'BEng (Hons) Software Engineering', period: '2021 – 2025', icon: '🌰', color: '#8aad95' },
  { id: 'school', label: 'St. Aloysius College, Galle',       sub: 'A/L Physical Science', period: '(School)', icon: '🏫', color: '#7a5c3a', isRoot: true },
]

const nodeDetails: Record<NodeId, { title: string; bullets: string[] }> = {
  nma: {
    title: 'Building scalable web applications at NMA Software',
    bullets: [
      'Developed full-stack Carpool Management System with real-time GPS map integration',
      'Built Dental E-commerce platform using React, Redux, Node.js, SQL, AWS, PayPal, and Stripe',
      'Developed fundraising platform with secure payments and user management',
      'Developed RESTful backend APIs with Node.js & Express',
      'Built dynamic frontends using React & Redux',
      'Managed complex PostgreSQL schemas & queries',
      'Implemented real-time features using WebSockets',
      'Handled AWS S3 media storage & secure file uploads',
    ],
  },
  intern: {
    title: 'Contributed to multiple web projects at Apps Technologies',
    bullets: [
      'Built and maintained web applications using Laravel & PHP with full-stack contributions',
      'Collaborated with team members and mentors on Pinthanna ERP system development',
      'Participated in code reviews, received feedback, and improved code quality through iteration',
      'Migrated Seylan Mail Management System from CodeIgniter to Laravel',
      'Contributed to technical article writing and documentation',
      'Enhanced UI interactions using jQuery & JavaScript',
      'Worked with GitHub for version control and team collaboration',
    ],
  },
  edu: {
    title: 'Software Engineering graduate with strong CS foundations',
    bullets: [
      'BEng (Hons) Software Engineering — IIT / University of Westminster, UK',
      'Covered Database Systems, Machine Learning, Web Development, Cybersecurity, Algorithms, and System Design & Architecture',
      'Strong foundation in core computer science principles and practical applications',
    ],
  },
  school: {
    title: 'Foundation years at St. Aloysius College, Galle',
    bullets: [
      'Completed A/L Physical Science stream',
      'Chemistry — Grade C',
      'Combined Mathematics — Grade 2',
      'Physics — Grade S',
    ],
  },
}

const NODE_Y: Record<number, number> = { 0: 80, 1: 280, 2: 480, 3: 660 }

// New: tab label lookup — previously the school tab fell through to 'Education'
const TAB_LABEL: Record<NodeId, string> = {
  nma: 'NMA',
  intern: 'Internship',
  edu: 'Education',
  school: 'School', // New school tab label
}

export default function MyJourney() {
  const [active, setActive] = useState<NodeId>('nma')
  const [animKey, setAnimKey] = useState(0)
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

  const TRUNK_TOP    = NODE_Y[0]  
  const TRUNK_BOTTOM = NODE_Y[3] 
  const TREE_HEIGHT  = 820

  const activeNode = nodes.find((n) => n.id === active)!

  return (
    <section id="about" className="w-full bg-[#eceef3]" style={{ minHeight: '100vh', paddingTop: '14vh', paddingBottom: '8vh' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Section heading — centered */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ background: '#eceef3', boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 18px rgba(76,175,114,0.5)' }} />
            <span className="text-sm font-black tracking-[0.3em] uppercase text-gray-500">My Journey</span>
          </div>
          <div className="h-px w-48" style={{ background: 'linear-gradient(to right, transparent, rgba(76,175,114,0.5), transparent)' }} />
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-start gap-20 justify-center">

          {/* TREE COLUMN */}
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
              {nodes.map((node, idx) => {
                //  Y position sourced from NODE_Y map — correctly places school at 660px
                const yPos     = NODE_Y[idx]
                const isActive = active === node.id
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNode(node.id)}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
                    style={{ top: `${yPos}px`, zIndex: 10 }}
                  >
                    {node.isRoot && (
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
                        // outer ring color now uses node.color (brown for school)
                        boxShadow: isActive
                          ? `inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff, 0 0 0 3px ${node.color}, 0 0 20px ${node.color}55`
                          : '5px 5px 14px #d1d3da, -5px -5px 14px #ffffff',
                        border: `2px solid ${isActive ? node.color : 'rgba(255,255,255,0.7)'}`,
                      }}
                    >
                      {node.isRoot && (
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
                      {node.icon}
                    </div>

                    {/* Label card below node */}
                    <div
                      className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-300"
                      style={{
                        background: '#eceef3',
                        boxShadow: isActive
                          ? 'inset 2px 2px 5px #c8cad1, inset -2px -2px 5px #ffffff'
                          : '2px 2px 5px #d1d3da, -2px -2px 5px #ffffff',
                        //  widened slightly from 120px to 128px to fit school name
                        minWidth: '128px',
                      }}
                    >
                      <span
                        className="text-[10px] font-black tracking-wide uppercase text-center transition-colors duration-300"
                        style={{ color: isActive ? node.color : '#9ca3af' }}
                      >
                        {node.label}
                      </span>
                      {node.isRoot ? (
                        <span className="text-[8px] font-semibold tracking-wider text-center" style={{ color: '#a07850' }}>
                          Chem: C · Maths: 2 · Phy: S
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-gray-400 tracking-wider text-center">{node.period}</span>
                      )}
                    </div>
                  </button>
                )
              })}

            </div>
          </div>

          {/* DETAIL PANEL — vertically centered with tree */}
          <div className="flex-1 flex flex-col gap-6" style={{ paddingTop: `${TRUNK_TOP - 20}px` }}>

            {/* Active node header */}
            <div key={active + '-header'} className="flex items-center gap-4" style={{ animation: 'fadeSlideIn 0.4s ease' }}>
              <div
                className="flex items-center justify-center text-2xl flex-shrink-0"
                style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#eceef3', boxShadow: 'inset 4px 4px 10px #d1d3da, inset -4px -4px 10px #ffffff' }}
              >
                {activeNode.icon}
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight" style={{ color: activeNode.color, textShadow: `0 0 16px ${activeNode.color}60` }}>
                  {activeNode.label}
                </h3>
                <p className="text-sm font-semibold text-gray-400">{activeNode.sub}</p>
                {/*  school node shows A/L grade summary instead of a period date */}
                {activeNode.isRoot
                  ? <p className="text-xs mt-0.5" style={{ color: '#a07850' }}>Chem: C &nbsp;·&nbsp; Combined Maths: 2 &nbsp;·&nbsp; Physics: S</p>
                  : <p className="text-xs text-gray-400 mt-0.5">{activeNode.period}</p>
                }
              </div>
            </div>

            {/* Description card */}
            <div
              key={active + '-card-' + animKey}
              className="rounded-2xl p-6"
              style={{ background: '#eceef3', boxShadow: 'inset 5px 5px 12px #d1d3da, inset -5px -5px 12px #ffffff', animation: 'fadeSlideIn 0.45s ease' }}
            >
              <p className="text-sm font-semibold text-gray-500 mb-4 leading-relaxed">{nodeDetails[active].title}</p>
              <ul className="flex flex-col gap-3">
                {nodeDetails[active].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeNode.color, boxShadow: `0 0 6px ${activeNode.color}aa` }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNode(node.id)}
                  className="flex items-center gap-2 px-4 h-[36px] rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: '#eceef3',
                    color: active === node.id ? node.color : '#9ca3af',
                    boxShadow: active === node.id ? 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff' : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                    border: `1px solid ${active === node.id ? node.color + '44' : 'rgba(255,255,255,0.6)'}`,
                  }}
                >
                  <span>{node.icon}</span>
                  <span>{TAB_LABEL[node.id]}</span>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 flex-wrap mt-1">
              {[{ val: '2+', label: 'Years Exp' }, { val: '5+', label: 'Projects' }, { val: '10+', label: 'Tech Stack' }].map(({ val, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{ background: '#eceef3', boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}
                >
                  <span className="text-2xl font-black leading-none" style={{ color: '#4caf72', textShadow: '0 0 12px rgba(76,175,114,0.6)' }}>{val}</span>
                  <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mt-1">{label}</span>
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