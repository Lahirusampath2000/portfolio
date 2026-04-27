'use client'
import React, { useState, useEffect, useRef } from 'react'
import { projects, Project, ProjectStatus, ProjectAssociation } from '@/constant/projects'
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiZap, FiClock, FiCheckCircle, FiChevronDown } from 'react-icons/fi'
import { useNeumorph } from '@/hooks/useNeumorph'

/* ── Config ── */
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

/* ── Animated Title ── */
function AnimatedTitle({ text, color }: { text: string; color: string }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    let i = 0
    const id = setInterval(() => { i++; setVisibleCount(i); if (i >= text.length) clearInterval(id) }, 28)
    return () => clearInterval(id)
  }, [text])

  return (
    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
      {text.split('').map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: i < visibleCount ? 1 : 0,
          transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          color: i < visibleCount && i >= visibleCount - 6 ? color : 'inherit',
          textShadow: i < visibleCount && i >= visibleCount - 3 ? `0 0 14px ${color}88` : 'none',
          whiteSpace: ch === ' ' ? 'pre' : 'normal',
        }}>{ch}</span>
      ))}
    </h2>
  )
}

/* ── Image Slider ── */
function ImageSlider({ images, coverLabel, accentColor, nm }: {
  images: string[]; coverLabel?: string; accentColor: string
  nm: ReturnType<typeof useNeumorph>
}) {
  const { isDark, bg, out, text3 } = nm
  const [idx, setIdx]       = useState(0)
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({})

  const validImages = images.filter((_, i) => !imgErr[i])
  const prev = () => setIdx(i => (i - 1 + validImages.length) % validImages.length)
  const next = () => setIdx(i => (i + 1) % validImages.length)
  useEffect(() => { setIdx(0); setImgErr({}) }, [images])

  if (validImages.length === 0) {
    return (
      <div className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ height: '300px', borderRadius: '20px 20px 0 0' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, ${bg} 40%, ${accentColor}10 100%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${accentColor}15 0%, transparent 40%)` }} />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="rmp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accentColor} strokeWidth="0.8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#rmp-grid)" />
        </svg>
        <div className="relative flex flex-col items-center gap-3">
          <div className="px-8 py-4 rounded-2xl" style={{ background: bg, boxShadow: out.xl }}>
            <span className="text-4xl font-black tracking-[0.3em]" style={{ color: accentColor, textShadow: `0 0 30px ${accentColor}55` }}>
              {coverLabel ?? '◆'}
            </span>
          </div>
          <span className="text-xs tracking-widest uppercase font-bold" style={{ color: text3 }}>Add project images</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '300px', borderRadius: '20px 20px 0 0' }}>
      {validImages.map((src, i) => (
        <img key={src} src={src} alt={`screenshot ${i + 1}`}
          onError={() => setImgErr(prev => ({ ...prev, [i]: true }))}
          className="absolute inset-0 w-full h-full object-contain transition-all duration-500"
          style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? 'scale(1)' : 'scale(1.03)', backgroundColor: isDark ? '#1e1e23' : '#e4e6ec' }} />
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
      {validImages.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: bg, boxShadow: out.sm, border: `1px solid rgba(255,255,255,${isDark ? '0.06' : '0.8'})` }}>
            <FiChevronLeft style={{ color: isDark ? '#9898a4' : '#6b7280', width: 16, height: 16 }} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: bg, boxShadow: out.sm, border: `1px solid rgba(255,255,255,${isDark ? '0.06' : '0.8'})` }}>
            <FiChevronRight style={{ color: isDark ? '#9898a4' : '#6b7280', width: 16, height: 16 }} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {validImages.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? '20px' : '6px', height: '6px', borderRadius: '9999px',
                background: i === idx ? accentColor : (isDark ? '#3a3a44' : '#d1d5db'),
                transition: 'all 0.3s ease', border: 'none', padding: 0, cursor: 'pointer',
              }} />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
        style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', backdropFilter: 'blur(4px)' }}>
        {idx + 1} / {validImages.length}
      </div>
    </div>
  )
}

/* ── Spotlight Panel ── */
function SpotlightPanel({ project, animKey, nm }: { project: Project; animKey: number; nm: ReturnType<typeof useNeumorph> }) {
  const { isDark, bg, text1, text2, text3, border, out, inn } = nm
  const { label: sLabel, color: sColor, Icon: SIcon } = STATUS_CFG[project.status]
  const ac = ASSOC_CFG[project.association]

  return (
    <div key={animKey} className="rounded-[24px] overflow-hidden"
      style={{ background: bg, boxShadow: inn.xl, animation: 'spotlightIn 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>

      <ImageSlider images={project.images ?? []} coverLabel={project.coverLabel} accentColor={ac.color} nm={nm} />

      <div className="p-6 md:p-8 flex flex-col gap-5">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.color}33` }}>
            {ac.label}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: bg, boxShadow: out.xs, color: sColor, border: `1px solid ${sColor}44` }}>
            <SIcon style={{ width: 10, height: 10 }} />{sLabel}
          </span>
          <span className="ml-auto text-[10px] font-bold tracking-widest uppercase" style={{ color: text3 }}>{project.period}</span>
        </div>

        <div style={{ color: text1 }}>
          <AnimatedTitle text={project.title} color={ac.color} />
        </div>
        <p className="text-sm font-semibold -mt-2" style={{ color: text3 }}>{project.tagline}</p>
        <div className="h-px" style={{ background: `linear-gradient(to right, ${ac.color}44, transparent)` }} />
        <p className="text-sm leading-relaxed" style={{ color: text2 }}>{project.description}</p>

        {/* Highlights */}
        <ul className="flex flex-col gap-2.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: text3, animation: `fadeUp 0.35s ease ${i * 60}ms both` }}>
              <span className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: ac.color, boxShadow: `0 0 5px ${ac.color}88` }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
              style={{ background: bg, boxShadow: out.xs, color: ac.color, border: `1px solid ${ac.color}2a` }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex items-center gap-3 flex-wrap pt-1">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 h-[42px] rounded-full text-xs font-black tracking-wide uppercase no-underline"
                style={{ background: bg, boxShadow: out.md, border: `1.5px solid ${ac.color}55`, color: ac.color, transition: 'box-shadow 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = inn.sm)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = out.md)}>
                <FiExternalLink style={{ width: 13, height: 13 }} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 h-[42px] rounded-full text-xs font-black tracking-wide uppercase no-underline"
                style={{ background: bg, boxShadow: out.md, border: `1.5px solid ${border}`, color: text2, transition: 'box-shadow 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = inn.sm)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = out.md)}>
                <FiGithub style={{ width: 13, height: 13 }} /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Project Row ── */
function ProjectRow({ project, index, isActive, inView, onClick, showChevron = false, nm }: {
  project: Project; index: number; isActive: boolean; inView: boolean
  onClick: () => void; showChevron?: boolean
  nm: ReturnType<typeof useNeumorph>
}) {
  const { bg, text2, text3, border, out, inn } = nm
  const ac = ASSOC_CFG[project.association]
  const sc = STATUS_CFG[project.status]

  return (
    <button onClick={onClick} className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left"
      style={{
        background: bg, cursor: 'pointer',
        boxShadow: isActive ? inn.md : out.md,
        border: `1.5px solid ${isActive ? ac.color + '55' : border}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s, box-shadow 0.25s ease, border 0.25s ease`,
      }}>
      {/* Number bubble */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
        style={{ background: bg, boxShadow: isActive ? inn.xs : out.xs, color: isActive ? ac.color : text3 }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title + tagline */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-black truncate transition-colors duration-300" style={{ color: isActive ? ac.color : text2 }}>{project.title}</p>
        <p className="text-[10px] truncate mt-0.5" style={{ color: text3 }}>{project.tagline}</p>
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="w-2 h-2 rounded-full"
          style={{ background: sc.color, boxShadow: isActive && project.status === 'live' ? `0 0 6px ${sc.color}` : 'none',
            ...(project.status === 'live' ? { animation: 'pulseDot 2s infinite' } : {}) }} />
        {showChevron && (
          <FiChevronDown style={{ width: 14, height: 14, color: isActive ? ac.color : text3,
            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, color 0.3s ease' }} />
        )}
      </div>
    </button>
  )
}

/* ── Stats Row ── */
function StatsRow({ inView, nm }: { inView: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const { bg, text3, border, out } = nm
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.5s' }}>
      {[
        { val: String(projects.filter(p => p.status === 'live').length),        label: 'Live',         color: '#4caf72' },
        { val: String(projects.filter(p => p.status === 'in-progress').length), label: 'In Progress',  color: '#f59e0b' },
        { val: String(projects.filter(p => p.status === 'completed').length),   label: 'Completed',    color: '#8aad95' },
        { val: String(projects.filter(p => p.association === 'nma').length),    label: 'NMA Projects', color: '#4caf72' },
      ].map(({ val, label, color }) => (
        <div key={label} className="flex flex-col items-center px-5 py-3 rounded-2xl"
          style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}>
          <span className="text-2xl font-black leading-none" style={{ color, textShadow: `0 0 12px ${color}55` }}>{val}</span>
          <span className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: text3 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Mobile Accordion ── */
function MobileAccordionLayout({ filtered, inView, nm }: { filtered: Project[]; inView: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const [activeId, setActiveId] = useState<number>(filtered[0]?.id ?? -1)
  const [animKey, setAnimKey]   = useState(0)

  useEffect(() => { setActiveId(filtered[0]?.id ?? -1); setAnimKey(k => k + 1) }, [filtered])

  const toggle = (id: number) => {
    setActiveId(prev => { if (prev === id) return -1; setAnimKey(k => k + 1); return id })
  }

  return (
    <div className="flex flex-col gap-3">
      {filtered.map((p, i) => {
        const isOpen = p.id === activeId
        return (
          <div key={p.id}>
            <ProjectRow project={p} index={i} isActive={isOpen} inView={inView} onClick={() => toggle(p.id)} showChevron nm={nm} />
            <div style={{
              overflow: 'hidden',
              maxHeight: isOpen ? '2000px' : '0px',
              opacity: isOpen ? 1 : 0,
              transition: isOpen
                ? 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease 0.1s'
                : 'max-height 0.35s cubic-bezier(0.4,0,1,1), opacity 0.2s ease',
            }}>
              <div className="pt-3">
                <SpotlightPanel project={p} animKey={isOpen ? animKey : 0} nm={nm} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Desktop Layout ── */
function DesktopSideBySideLayout({ filtered, inView, nm }: { filtered: Project[]; inView: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const [activeId, setActiveId] = useState<number>(filtered[0]?.id ?? projects[0].id)
  const [animKey, setAnimKey]   = useState(0)

  useEffect(() => {
    if (!filtered.find(p => p.id === activeId)) { setActiveId(filtered[0]?.id ?? projects[0].id); setAnimKey(k => k + 1) }
  }, [filtered])

  const select = (id: number) => { if (id === activeId) return; setActiveId(id); setAnimKey(k => k + 1) }
  const active = projects.find(p => p.id === activeId) ?? projects[0]

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 flex flex-col gap-3 w-[300px]">
        {filtered.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} isActive={p.id === activeId} inView={inView} onClick={() => select(p.id)} nm={nm} />
        ))}
      </div>
      <div className="flex-1 min-w-0"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
        <SpotlightPanel project={active} animKey={animKey} nm={nm} />
      </div>
    </div>
  )
}

/* ── Main Export ── */
export default function MyProjects() {
  const nm = useNeumorph()
  const { bg, text1, text2, text3, border, accent, out, inn } = nm

  const [filter, setFilter] = useState('all')
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.06 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.association === filter)

  return (
    <section ref={sectionRef} id="projects" className="w-full"
      style={{ background: bg, paddingTop: '3vh', paddingBottom: '10vh', transition: 'background 0.3s ease' }}>

      <style>{`
        @keyframes spotlightIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col items-center gap-4 mb-12 mt-3 max-w-xl text-center mx-auto">
          <p className="text-2xl md:text-3xl font-black leading-snug tracking-tight" style={{ color: text1 }}>
            Built with purpose.{' '}
            <span style={{ color: accent, textShadow: '0 0 18px rgba(76,175,114,0.35)' }}>Optimised for impact.</span>
          </p>
          <p className="text-sm font-semibold leading-relaxed max-w-sm" style={{ color: text3 }}>
            Real products, real users, real results — from production SaaS to academic breakthroughs.
          </p>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full mt-1"
            style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>✦ Pick a project</span>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: accent }}>→ click to reveal</span>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>✦</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTER_TABS.map(tab => {
            const assoc    = tab.id !== 'all' ? ASSOC_CFG[tab.id as ProjectAssociation] : null
            const isActive = filter === tab.id
            const tabColor = assoc?.color ?? accent
            return (
              <button key={tab.id} onClick={() => setFilter(tab.id)}
                className="flex items-center gap-2 px-5 h-[38px] rounded-full text-[11px] font-black tracking-wider uppercase"
                style={{
                  background: bg, cursor: 'pointer',
                  color: isActive ? tabColor : text3,
                  boxShadow: isActive ? inn.sm : out.sm,
                  border: `1px solid ${isActive ? tabColor + '55' : border}`,
                  transition: 'all 0.3s ease',
                }}>
                {tab.label}
                <span className="text-[10px] font-black px-1.5 rounded-full"
                  style={{ background: isActive ? tabColor + '22' : 'rgba(0,0,0,0.05)', color: isActive ? tabColor : text3 }}>
                  {tab.id === 'all' ? projects.length : projects.filter(p => p.association === tab.id).length}
                </span>
              </button>
            )
          })}
        </div>

        {/* Mobile */}
        <div className="xl:hidden"><MobileAccordionLayout filtered={filtered} inView={inView} nm={nm} /></div>

        {/* Desktop */}
        <div className="hidden xl:block"><DesktopSideBySideLayout filtered={filtered} inView={inView} nm={nm} /></div>

        <StatsRow inView={inView} nm={nm} />
      </div>
    </section>
  )
}