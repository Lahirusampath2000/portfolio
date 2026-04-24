'use client'
import React, { useState, useEffect, useRef } from 'react'
import { projects, Project, ProjectStatus, ProjectAssociation } from '@/constant/projects'
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiZap, FiClock, FiCheckCircle, FiChevronDown } from 'react-icons/fi'

// ─── Shared config ───────────────────────────────────────────────

const STATUS_CFG: Record<ProjectStatus, { label: string; color: string; Icon: React.ElementType }> = {
  'live':        { label: 'Live',        color: '#4caf72', Icon: FiZap         },
  'in-progress': { label: 'In Progress', color: '#f59e0b', Icon: FiClock       },
  'completed':   { label: 'Completed',   color: '#8aad95', Icon: FiCheckCircle },
}

const ASSOC_CFG: Record<ProjectAssociation, { label: string; color: string; bg: string }> = {
  nma:        { label: 'NMA Software',      color: '#4caf72', bg: 'rgba(76,175,114,0.12)'  },
  internship: { label: 'Apps Technologies', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)'  },
  personal:   { label: 'Personal',          color: '#a855f7', bg: 'rgba(168,85,247,0.12)'  },
  academic:   { label: 'Academic',          color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
}

const FILTER_TABS = [
  { id: 'all',        label: 'All Projects' },
  { id: 'nma',        label: 'NMA Software' },
  { id: 'internship', label: 'Internship'   },
  { id: 'academic',   label: 'Academic'     },
]

// ─── Animated title ──────────────────────────────────────────────
function AnimatedTitle({ text, color }: { text: string; color: string }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= text.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [text])

  return (
    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight" style={{ color: '#1f2937' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
            color: i < visibleCount && i >= visibleCount - 6 ? color : '#1f2937',
            textShadow: i < visibleCount && i >= visibleCount - 3 ? `0 0 14px ${color}88` : 'none',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch}
        </span>
      ))}
    </h2>
  )
}

// ─── Image slider ────────────────────────────────────────────────
function ImageSlider({ images, coverLabel, accentColor }: {
  images: string[]
  coverLabel?: string
  accentColor: string
}) {
  const [idx, setIdx]       = useState(0)
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({})

  const validImages = images.filter((_, i) => !imgErr[i])
  const prev = () => setIdx(i => (i - 1 + validImages.length) % validImages.length)
  const next = () => setIdx(i => (i + 1) % validImages.length)

  useEffect(() => { setIdx(0); setImgErr({}) }, [images])

  if (validImages.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ height: '300px', borderRadius: '20px 20px 0 0' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, #eceef3 40%, ${accentColor}10 100%)` }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${accentColor}15 0%, transparent 40%)` }} />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rmp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accentColor} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rmp-grid)" />
        </svg>
        <div className="relative flex flex-col items-center gap-3">
          <div
            className="px-8 py-4 rounded-2xl"
            style={{ background: '#eceef3', boxShadow: '8px 8px 20px #d1d3da, -8px -8px 20px #ffffff' }}
          >
            <span
              className="text-4xl font-black tracking-[0.3em]"
              style={{ color: accentColor, textShadow: `0 0 30px ${accentColor}55` }}
            >
              {coverLabel ?? '◆'}
            </span>
          </div>
          <span className="text-xs text-gray-400 tracking-widest uppercase font-bold">Add project images</span>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full pointer-events-none animate-pulse" style={{ background: `radial-gradient(circle, ${accentColor}22, transparent 70%)` }} />
        <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full pointer-events-none animate-pulse" style={{ background: `radial-gradient(circle, ${accentColor}18, transparent 70%)`, animationDelay: '1s' }} />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '300px', borderRadius: '20px 20px 0 0' }}>
      {validImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`screenshot ${i + 1}`}
          onError={() => setImgErr(prev => ({ ...prev, [i]: true }))}
          className="absolute inset-0 w-full h-full object-contain transition-all duration-500"
          style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? 'scale(1)' : 'scale(1.03)', backgroundColor: '#e4e6ec' }}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, #eceef3, transparent)' }} />
      {validImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: '#eceef3', boxShadow: '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff', border: '1px solid rgba(255,255,255,0.8)' }}
          >
            <FiChevronLeft style={{ color: '#6b7280', width: 16, height: 16 }} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: '#eceef3', boxShadow: '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff', border: '1px solid rgba(255,255,255,0.8)' }}
          >
            <FiChevronRight style={{ color: '#6b7280', width: 16, height: 16 }} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {validImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: i === idx ? accentColor : '#d1d5db',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', backdropFilter: 'blur(4px)' }}>
        {idx + 1} / {validImages.length}
      </div>
    </div>
  )
}

// ─── Shared spotlight panel ──────────────────────────────────────
function SpotlightPanel({ project, animKey }: { project: Project; animKey: number }) {
  const { label: sLabel, color: sColor, Icon: SIcon } = STATUS_CFG[project.status]
  const ac = ASSOC_CFG[project.association]

  return (
    <div
      key={animKey}
      className="rounded-[24px] overflow-hidden"
      style={{
        background: '#eceef3',
        boxShadow: 'inset 6px 6px 18px #d1d3da, inset -6px -6px 18px #ffffff',
        animation: 'spotlightIn 0.45s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <ImageSlider images={project.images ?? []} coverLabel={project.coverLabel} accentColor={ac.color} />

      <div className="p-6 md:p-8 flex flex-col gap-5">
        {/* Badge row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.color}33` }}
          >
            {ac.label}
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: '#eceef3', boxShadow: '2px 2px 6px #d1d3da, -2px -2px 6px #ffffff', color: sColor, border: `1px solid ${sColor}44` }}
          >
            <SIcon style={{ width: 10, height: 10 }} />
            {sLabel}
          </span>
          <span className="ml-auto text-[10px] font-bold text-gray-400 tracking-widest uppercase">{project.period}</span>
        </div>

        <AnimatedTitle text={project.title} color={ac.color} />
        <p className="text-sm font-semibold text-gray-400 -mt-2">{project.tagline}</p>
        <div className="h-px" style={{ background: `linear-gradient(to right, ${ac.color}44, transparent)` }} />
        <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>

        {/* Highlights */}
        <ul className="flex flex-col gap-2.5">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"
              style={{ animation: `fadeUp 0.35s ease ${i * 60}ms both` }}
            >
              <span className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: ac.color, boxShadow: `0 0 5px ${ac.color}88` }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map(t => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
              style={{ background: '#eceef3', boxShadow: '2px 2px 5px #d1d3da, -2px -2px 5px #ffffff', color: ac.color, border: `1px solid ${ac.color}2a` }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex items-center gap-3 flex-wrap pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 h-[42px] rounded-full text-xs font-black tracking-wide uppercase no-underline"
                style={{ background: '#eceef3', boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff', border: `1.5px solid ${ac.color}55`, color: ac.color, transition: 'box-shadow 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = 'inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff')}
              >
                <FiExternalLink style={{ width: 13, height: 13 }} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 h-[42px] rounded-full text-xs font-black tracking-wide uppercase no-underline"
                style={{ background: '#eceef3', boxShadow: '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff', border: '1.5px solid rgba(107,114,128,0.3)', color: '#6b7280', transition: 'box-shadow 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = 'inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff')}
              >
                <FiGithub style={{ width: 13, height: 13 }} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Shared project list row ─────────────────────────────────────
function ProjectRow({
  project,
  index,
  isActive,
  inView,
  onClick,
  showChevron = false,
}: {
  project:     Project
  index:       number
  isActive:    boolean
  inView:      boolean
  onClick:     () => void
  showChevron?: boolean
}) {
  const ac = ASSOC_CFG[project.association]
  const sc = STATUS_CFG[project.status]

  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left"
      style={{
        background: '#eceef3',
        cursor: 'pointer',
        boxShadow: isActive
          ? 'inset 4px 4px 10px #c8cad1, inset -4px -4px 10px #ffffff'
          : '4px 4px 10px #d1d3da, -4px -4px 10px #ffffff',
        border: `1.5px solid ${isActive ? ac.color + '55' : 'rgba(255,255,255,0.7)'}`,
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s, box-shadow 0.25s ease, border 0.25s ease`,
      }}
    >
      {/* Number bubble */}
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
        style={{
          background: '#eceef3',
          boxShadow: isActive
            ? 'inset 2px 2px 5px #c8cad1, inset -2px -2px 5px #ffffff'
            : '2px 2px 5px #d1d3da, -2px -2px 5px #ffffff',
          color: isActive ? ac.color : '#9ca3af',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title + tagline */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-black truncate transition-colors duration-300" style={{ color: isActive ? ac.color : '#6b7280' }}>
          {project.title}
        </p>
        <p className="text-[10px] text-gray-400 truncate mt-0.5">{project.tagline}</p>
      </div>

      {/* Status dot + optional chevron */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: sc.color,
            boxShadow: isActive && project.status === 'live' ? `0 0 6px ${sc.color}` : 'none',
            ...(project.status === 'live' ? { animation: 'pulseDot 2s infinite' } : {}),
          }}
        />
        {showChevron && (
          <FiChevronDown
            style={{
              width: 14,
              height: 14,
              color: isActive ? ac.color : '#9ca3af',
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.3s ease',
            }}
          />
        )}
      </div>
    </button>
  )
}

// ─── Stats row ───────────────────────────────────────────────────
function StatsRow({ inView }: { inView: boolean }) {
  return (
    <div
      className="mt-12 flex flex-wrap items-center justify-center gap-4"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.5s' }}
    >
      {[
        { val: String(projects.filter(p => p.status === 'live').length),        label: 'Live',         color: '#4caf72' },
        { val: String(projects.filter(p => p.status === 'in-progress').length), label: 'In Progress',  color: '#f59e0b' },
        { val: String(projects.filter(p => p.status === 'completed').length),   label: 'Completed',    color: '#8aad95' },
        { val: String(projects.filter(p => p.association === 'nma').length),    label: 'NMA Projects', color: '#4caf72' },
      ].map(({ val, label, color }) => (
        <div
          key={label}
          className="flex flex-col items-center px-5 py-3 rounded-2xl"
          style={{ background: '#eceef3', boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}
        >
          <span className="text-2xl font-black leading-none" style={{ color, textShadow: `0 0 12px ${color}55` }}>{val}</span>
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// LAYOUT A — Mobile / Tablet  (< xl breakpoint)
// ═══════════════════════════════════════════════════════════════
function MobileAccordionLayout({ filtered, inView }: { filtered: Project[]; inView: boolean }) {
  const [activeId, setActiveId] = useState<number>(filtered[0]?.id ?? -1)
  const [animKey, setAnimKey]   = useState(0)

  // Reset open item when filter changes
  useEffect(() => {
    setActiveId(filtered[0]?.id ?? -1)
    setAnimKey(k => k + 1)
  }, [filtered])

  const toggle = (id: number) => {
    setActiveId(prev => {
      if (prev === id) return -1          // collapse
      setAnimKey(k => k + 1)
      return id                           // expand
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {filtered.map((p, i) => {
        const isOpen = p.id === activeId
        return (
          <div key={p.id}>
            <ProjectRow
              project={p}
              index={i}
              isActive={isOpen}
              inView={inView}
              onClick={() => toggle(p.id)}
              showChevron
            />

            {/* Inline accordion panel */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '2000px' : '0px',
                opacity: isOpen ? 1 : 0,
                transition: isOpen
                  ? 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease 0.1s'
                  : 'max-height 0.35s cubic-bezier(0.4,0,1,1), opacity 0.2s ease',
              }}
            >
              <div className="pt-3">
                <SpotlightPanel project={p} animKey={isOpen ? animKey : 0} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// LAYOUT B — Desktop  (xl+ breakpoint)
// ═══════════════════════════════════════════════════════════════
function DesktopSideBySideLayout({ filtered, inView }: { filtered: Project[]; inView: boolean }) {
  const [activeId, setActiveId] = useState<number>(filtered[0]?.id ?? projects[0].id)
  const [animKey, setAnimKey]   = useState(0)

  useEffect(() => {
    if (!filtered.find(p => p.id === activeId)) {
      setActiveId(filtered[0]?.id ?? projects[0].id)
      setAnimKey(k => k + 1)
    }
  }, [filtered])

  const select = (id: number) => {
    if (id === activeId) return
    setActiveId(id)
    setAnimKey(k => k + 1)
  }

  const active = projects.find(p => p.id === activeId) ?? projects[0]

  return (
    <div className="flex gap-6 items-start">
      {/* List */}
      <div className="flex-shrink-0 flex flex-col gap-3 w-[300px]">
        {filtered.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            isActive={p.id === activeId}
            inView={inView}
            onClick={() => select(p.id)}
          />
        ))}
      </div>

      {/* Spotlight */}
      <div
        className="flex-1 min-w-0"
        style={{
          opacity:   inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s',
        }}
      >
        <SpotlightPanel project={active} animKey={animKey} />
      </div>
    </div>
  )
}
export default function ResponsiveMyProjects() {
  const [filter, setFilter] = useState('all')
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.06 },
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.association === filter)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full bg-[#eceef3]"
      style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Heading ── */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div
            className="flex items-center gap-3 px-7 py-3 rounded-full"
            style={{ background: '#eceef3', boxShadow: '5px 5px 14px #d1d3da, -5px -5px 14px #ffffff', border: '1px solid rgba(255,255,255,0.75)' }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 18px rgba(76,175,114,0.5)' }}
            />
            <span className="text-lg font-black tracking-[0.25em] uppercase text-gray-500">Projects</span>
          </div>
          <div className="h-[3px] w-20 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #4caf72, transparent)' }} />
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTER_TABS.map(tab => {
            const assoc    = tab.id !== 'all' ? ASSOC_CFG[tab.id as ProjectAssociation] : null
            const isActive = filter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className="flex items-center gap-2 px-5 h-[38px] rounded-full text-[11px] font-black tracking-wider uppercase"
                style={{
                  background: '#eceef3',
                  cursor: 'pointer',
                  color: isActive ? (assoc?.color ?? '#4caf72') : '#9ca3af',
                  boxShadow: isActive
                    ? 'inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff'
                    : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                  border: `1px solid ${isActive ? (assoc?.color ?? '#4caf72') + '55' : 'rgba(255,255,255,0.6)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                {tab.label}
                <span
                  className="text-[10px] font-black px-1.5 rounded-full"
                  style={{
                    background: isActive ? (assoc?.color ?? '#4caf72') + '22' : 'rgba(0,0,0,0.05)',
                    color: isActive ? (assoc?.color ?? '#4caf72') : '#9ca3af',
                  }}
                >
                  {tab.id === 'all' ? projects.length : projects.filter(p => p.association === tab.id).length}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Mobile / Tablet layout  (hidden on xl+) ── */}
        <div className="xl:hidden">
          <MobileAccordionLayout filtered={filtered} inView={inView} />
        </div>

        {/* ── Desktop layout  (hidden below xl) ── */}
        <div className="hidden xl:block">
          <DesktopSideBySideLayout filtered={filtered} inView={inView} />
        </div>

        <StatsRow inView={inView} />
      </div>

      <style>{`
        @keyframes spotlightIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1;   }
          50%      { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}