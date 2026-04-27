'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useNeumorph } from '@/hooks/useNeumorph'

interface Service {
  id: number
  abbr: string
  short: string
  tagline: string
  desc: string
  tags: string[]
  features: string[]
  icon: React.ReactNode
}

const SERVICES: Service[] = [
  {
    id: 0, abbr: '01', short: 'Web Development',
    tagline: 'Sites that load fast and look sharp.',
    desc: 'Custom websites and web applications built from scratch — pixel-perfect, fully responsive, and production-ready from day one.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'MySQL', 'React.js', 'Laravel', 'SEO'],
    features: ['Custom UI design', 'REST API integration', 'Auth & user roles', 'Mobile responsive', 'Performance optimised', 'SEO-ready structure'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="24" height="18" rx="3" /><path d="M2 9h24M9 27h10M14 21v6" /><path d="M7 14l3.5 3.5L7 21M14.5 21h6" />
      </svg>
    ),
  },
  {
    id: 1, abbr: '02', short: 'E-Commerce',
    tagline: 'Stores built to convert.',
    desc: 'Full-featured online stores with product management, secure payment flows, and order tracking — everything you need to sell confidently.',
    tags: ['Stripe', 'PayPal', 'Laravel', 'MySQL', 'React.js', 'Node.js', 'PostgreSQL', 'Next.js'],
    features: ['Product catalogue', 'Secure checkout', 'Stripe & PayPal', 'Order management', 'Inventory tracking', 'Admin dashboard'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l3 13h14l3-9H8" /><circle cx="11" cy="23" r="2" /><circle cx="20" cy="23" r="2" /><path d="M12 11h8" />
      </svg>
    ),
  },
  {
    id: 2, abbr: '03', short: 'Web Application',
    tagline: 'Complex problems, elegant solutions.',
    desc: 'Data-driven web apps with real-time features, multi-role access control, and scalable architecture that grows with your users.',
    tags: ['WebSockets', 'Redux', 'AWS', 'TypeScript', 'React.js', 'Node.js', 'PostgreSQL'],
    features: ['Real-time updates', 'Multi-role access', 'Live dashboards', 'Cloud deployment', 'Scalable backend', 'Data visualisation'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="24" height="16" rx="2" /><circle cx="14" cy="12" r="3.5" /><path d="M14 8.5V6M14 18v-2.5M20 12h2M6 12h2" /><path d="M6 24h16M14 20v4" />
      </svg>
    ),
  },
  {
    id: 3, abbr: '04', short: 'SaaS Platform',
    tagline: 'From idea to recurring revenue.',
    desc: 'Multi-tenant SaaS platforms with subscription billing, onboarding flows, usage analytics, and the infrastructure to scale confidently.',
    tags: ['Stripe', 'AWS', 'Next.js', 'Node.js', 'PostgreSQL'],
    features: ['Subscription billing', 'Multi-tenancy', 'User onboarding', 'Usage analytics', 'Webhook events', 'API access'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l11 6.5v9L14 25 3 18.5v-9z" /><path d="M3 9.5l11 6.5 11-6.5M14 16v9" /><circle cx="14" cy="16" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 4, abbr: '05', short: 'SEO Optimisation',
    tagline: 'Rank higher. Get found. Stay there.',
    desc: 'Technical SEO and on-page optimisation baked into every project — from Core Web Vitals to schema markup, nothing is left to chance.',
    tags: ['Next.js', 'Meta tags', 'Sitemap', 'Core Web Vitals'],
    features: ['Technical SEO audit', 'Meta & OG tags', 'Sitemap & robots', 'Page speed tuning', 'Schema markup', 'Core Web Vitals'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" /><path d="M22 22l-4.5-4.5M12 8v8M8.5 12h7" />
      </svg>
    ),
  },
]

/* ── Animated Title ── */
function AnimatedTitle({ text, triggerKey, color }: { text: string; triggerKey: number; color: string }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    let i = 0
    const id = setInterval(() => { i++; setVisibleCount(i); if (i >= text.length) clearInterval(id) }, 28)
    return () => clearInterval(id)
  }, [text, triggerKey])

  return (
    <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
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
    </h3>
  )
}

/* ── Service Row ── */
function ServiceRow({ service, index, isActive, inView, onClick, showChevron = false, nm }: {
  service: Service; index: number; isActive: boolean; inView: boolean
  onClick: () => void; showChevron?: boolean
  nm: ReturnType<typeof useNeumorph>
}) {
  const { bg, text1, text2, text3, border, accent, out, inn } = nm

  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left"
      style={{
        background: bg, cursor: 'pointer',
        border: `1.5px solid ${isActive ? accent + '55' : border}`,
        boxShadow: isActive ? inn.md : out.md,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s, box-shadow 0.25s ease, border 0.25s ease`,
      }}
    >
      {/* Number bubble */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
        style={{ background: bg, boxShadow: isActive ? inn.xs : out.xs, color: isActive ? accent : text3, transition: 'color 0.25s' }}>
        {service.abbr}
      </div>

      {/* Icon box */}
      <div style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg,
        boxShadow: isActive ? inn.xs : out.xs,
        border: `1px solid ${isActive ? accent + '44' : border}`,
        color: isActive ? accent : text3,
        transition: 'color 0.25s, border-color 0.25s, box-shadow 0.25s',
      }}>
        {service.icon}
      </div>

      {/* Name + tagline */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-black truncate transition-colors duration-300" style={{ color: isActive ? accent : text2 }}>{service.short}</p>
        <p className="text-[10px] truncate mt-0.5 font-semibold" style={{ color: text3 }}>{service.tagline}</p>
      </div>

      {/* Arrow */}
      {showChevron ? (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"
          style={{ flexShrink: 0, color: isActive ? accent : text3, transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, color 0.3s ease' }}>
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"
          style={{ flexShrink: 0, color: isActive ? accent : text3, transform: isActive ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.25s ease, color 0.25s ease' }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

/* ── Service Detail Panel ── */
function ServiceDetail({ service, animKey, nm }: { service: Service; animKey: number; nm: ReturnType<typeof useNeumorph> }) {
  const { isDark, bg, text1, text2, text3, border, accent, out, inn } = nm

  return (
    <div
      key={animKey}
      className="rounded-[24px] overflow-hidden"
      style={{
        background: bg,
        boxShadow: inn.xl,
        border: `1.5px solid ${border}`,
        animation: 'spotlightIn 0.45s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: 'linear-gradient(to right, transparent, #4caf72, transparent)' }} />

      <div className="p-6 md:p-8 flex flex-col gap-5" style={{ position: 'relative' }}>

        {/* Ghost watermark number */}
        <div className="absolute font-black select-none pointer-events-none"
          style={{ bottom: -16, right: 8, fontSize: 160, lineHeight: 1, letterSpacing: '-0.06em',
            color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(31,41,55,0.04)' }}>
          {service.abbr}
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: 'rgba(76,175,114,0.12)', border: '1px solid rgba(76,175,114,0.25)', color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accent, animation: 'pulseDot 2s infinite' }} />
            Service {service.abbr}
          </span>
        </div>

        {/* Icon + Animated title */}
        <div className="flex items-start gap-5">
          <div style={{
            width: 68, height: 68, borderRadius: 18, flexShrink: 0, background: bg,
            boxShadow: out.lg, border: `1.5px solid ${border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accent, animation: 'iconFloat 6s ease-in-out infinite',
          }}>
            {service.icon}
          </div>
          <div className="pt-1" style={{ color: text1 }}>
            <AnimatedTitle text={service.short} triggerKey={animKey} color={accent} />
            <p className="text-sm font-semibold mt-1.5" style={{ color: text3 }}>{service.tagline}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="rounded-sm" style={{ height: 1.5, background: `linear-gradient(to right, rgba(76,175,114,0.4), rgba(76,175,114,0.08), transparent)` }} />

        {/* Description */}
        <p className="text-sm leading-relaxed max-w-[52ch]" style={{ color: text2 }}>{service.desc}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, ti) => (
            <span key={`${tag}-${ti}`} className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: bg, boxShadow: out.xs, border: '1px solid rgba(76,175,114,0.2)', color: accent,
                opacity: 0, animation: `tagPop 0.32s ${ti * 0.07}s ease forwards` }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px rounded" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(209,211,218,0.7)' }} />

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(172px, 1fr))', gap: 10 }}>
          {service.features.map((feat, fi) => (
            <div key={feat} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
              style={{ background: bg, boxShadow: out.sm, border: `1px solid ${border}`,
                opacity: 0, animation: `fadeUp 0.32s ${0.08 + fi * 0.055}s ease forwards` }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7.5" cy="7.5" r="7.5" fill="rgba(76,175,114,0.14)" />
                <path d="M4.5 7.8l2.2 2.2 3.8-4.2" stroke="#4caf72" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: text2 }}>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile Accordion ── */
function MobileAccordionLayout({ inView, nm }: { inView: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const [activeId, setActiveId] = useState(0)
  const [animKey, setAnimKey]   = useState(0)

  const toggle = (id: number) => {
    setActiveId(prev => {
      if (prev === id) return -1
      setAnimKey(k => k + 1)
      return id
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {SERVICES.map((svc, i) => {
        const isOpen = svc.id === activeId
        return (
          <div key={svc.id}>
            <ServiceRow service={svc} index={i} isActive={isOpen} inView={inView} onClick={() => toggle(svc.id)} showChevron nm={nm} />
            <div style={{
              overflow: 'hidden',
              maxHeight: isOpen ? '2000px' : '0px',
              opacity: isOpen ? 1 : 0,
              transition: isOpen
                ? 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease 0.1s'
                : 'max-height 0.35s cubic-bezier(0.4,0,1,1), opacity 0.2s ease',
            }}>
              <div className="pt-3">
                <ServiceDetail service={svc} animKey={isOpen ? animKey : 0} nm={nm} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Desktop Layout ── */
function DesktopLayout({ inView, nm }: { inView: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const { isDark, bg, text3, border, accent, out, inn } = nm
  const [activeId, setActiveId] = useState(0)
  const [animKey, setAnimKey]   = useState(0)

  const select = (id: number) => { if (id === activeId) return; setActiveId(id); setAnimKey(k => k + 1) }
  const active = SERVICES.find(s => s.id === activeId) ?? SERVICES[0]

  return (
    <div className="flex gap-6 items-start">
      {/* Sidebar */}
      <div className="flex-shrink-0 flex flex-col gap-3 w-[310px]">
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.id} service={svc} index={i} isActive={svc.id === activeId} inView={inView} onClick={() => select(svc.id)} nm={nm} />
        ))}

        {/* Progress pips */}
        <div className="flex items-center gap-2 px-5 py-4 mt-1 rounded-2xl"
          style={{ background: bg, boxShadow: inn.sm, border: `1px solid ${border}` }}>
          {SERVICES.map(svc => (
            <button key={svc.id} onClick={() => select(svc.id)} aria-label={svc.short}
              style={{
                height: 6, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer',
                width: activeId === svc.id ? 26 : 8,
                background: activeId === svc.id ? accent : (isDark ? '#3a3a44' : '#c8cad1'),
                boxShadow: activeId === svc.id ? '0 0 10px rgba(76,175,114,0.55)' : 'none',
                transition: 'all 0.38s cubic-bezier(0.34,1.4,0.64,1)',
              }} />
          ))}
          <span className="ml-auto text-[10px] font-black tracking-widest uppercase" style={{ color: text3 }}>
            {String(activeId + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex-1 min-w-0"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
        <ServiceDetail service={active} animKey={animKey} nm={nm} />
      </div>
    </div>
  )
}

/* ── Main Export ── */
export default function MyServices() {
  const nm = useNeumorph()
  const { bg, text1, text2, text3, border, accent, out, inn } = nm

  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.06 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="w-full"
      style={{ background: bg, paddingTop: '3vh', paddingBottom: '10vh', transition: 'background 0.3s ease' }}>

      <style>{`
        @keyframes spotlightIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tagPop { from { opacity: 0; transform: scale(0.82) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes iconFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 40% { transform: translateY(-6px) rotate(-2deg); } 70% { transform: translateY(-3px) rotate(2deg); } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col items-center gap-4 mb-12 mt-3 max-w-xl text-center mx-auto">
          <p className="text-2xl md:text-3xl font-black leading-snug tracking-tight" style={{ color: text1 }}>
            Built to solve.{' '}
            <span style={{ color: accent, textShadow: '0 0 18px rgba(76,175,114,0.35)' }}>Designed to scale.</span>
          </p>
          <p className="text-sm font-semibold leading-relaxed max-w-sm" style={{ color: text3 }}>
            From landing pages to SaaS platforms — engineered for performance and built with care.
          </p>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full mt-1"
            style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>✦ Pick a service</span>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: accent }}>→ click to reveal</span>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>✦</span>
          </div>
        </div>

        {/* Mobile */}
        <div className="xl:hidden"><MobileAccordionLayout inView={inView} nm={nm} /></div>

        {/* Desktop */}
        <div className="hidden xl:block"><DesktopLayout inView={inView} nm={nm} /></div>
      </div>
    </section>
  )
}