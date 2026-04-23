'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaJava, FaPython, FaPhp, FaReact, FaBootstrap, FaGithub, FaAws, FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiHtml5, SiExpress, SiLaravel, SiRedux, SiMysql, SiPostgresql, SiSocketdotio, SiFlask, SiOpencv, SiTensorflow, SiPycharm, SiPostman, SiStripe, SiBitbucket, SiIntellijidea, SiLeaflet } from 'react-icons/si'
import { BsRobot, BsFiletypeCss, BsFiletypeSql } from 'react-icons/bs'
import { MdLanguage, MdOutlineTranslate } from 'react-icons/md'

type CategoryId = 'languages' | 'frameworks' | 'tools' | 'ai' | 'aitools' | 'spoken'

interface Skill {
  label: string
  icon: React.ElementType
  color: string
}

const categories: { id: CategoryId; label: string; emoji: string; color: string; skills: Skill[] }[] = [
  {
    id: 'languages', label: 'Programming Languages', emoji: '💻', color: '#4caf72',
    skills: [
      { label: 'JavaScript', icon: SiJavascript,  color: '#f7df1e' },
      { label: 'HTML5',      icon: SiHtml5,        color: '#e34f26' },
      { label: 'CSS',       icon: BsFiletypeCss,  color: '#1572b6' },
      { label: 'Python',     icon: FaPython,       color: '#3776ab' },
      { label: 'SQL',        icon: BsFiletypeSql,  color: '#4caf72' },
      { label: 'PHP',        icon: FaPhp,          color: '#777bb4' },
      { label: 'Java',       icon: FaJava,         color: '#ed8b00' },
    ],
  },
  {
    id: 'frameworks', label: 'Frameworks and Libraries', emoji: '⚙️', color: '#68c98a',
    skills: [
      { label: 'React.js',   icon: FaReact,       color: '#61dafb' },
      { label: 'Node.js',    icon: FaNodeJs,      color: '#68a063' },
      { label: 'Express.js', icon: SiExpress,     color: '#4caf72' },
      { label: 'Redux',      icon: SiRedux,       color: '#764abc' },
      { label: 'Bootstrap',  icon: FaBootstrap,   color: '#7952b3' },
      { label: 'Socket.io',  icon: SiSocketdotio, color: '#0a0a0a' },
      { label: 'Laravel',    icon: SiLaravel,     color: '#ff2d20' },
      { label: 'Leaflet',    icon: SiLeaflet,     color: '#199900' },
      { label: 'Flask',      icon: SiFlask,       color: '#4caf72' },
    ],
  },
  {
    id: 'tools', label: 'Tools', emoji: '🛠️', color: '#8aad95',
    skills: [
      { label: 'PostgreSQL', icon: SiPostgresql,  color: '#336791' },
      { label: 'MySQL',      icon: SiMysql,       color: '#4479a1' },
      { label: 'AWS',     icon: FaAws,         color: '#ff9900' },
      { label: 'Postman',    icon: SiPostman,     color: '#ff6c37' },
      { label: 'GitHub',     icon: FaGithub,      color: '#050505' },
      { label: 'Bitbucket',  icon: SiBitbucket,   color: '#0052cc' },
      { label: 'Stripe',     icon: SiStripe,      color: '#635bff' },
      { label: 'PyCharm',    icon: SiPycharm,     color: '#090a09' },
      { label: 'IntelliJ',   icon: SiIntellijidea,color: '#080707' },
    ],
  },
  {
    id: 'ai', label: 'AI & ML', emoji: '🧠', color: '#4caf72',
    skills: [
      { label: 'OpenCV',          icon: SiOpencv,    color: '#5c3ee8' },
      { label: 'TensorFlow',      icon: SiTensorflow,color: '#ff6f00' },
      { label: 'Flask ML',        icon: SiFlask,     color: '#4caf72' },
      { label: 'Img Processing',  icon: SiOpencv,    color: '#5c3ee8' },
    ],
  },
  {
    id: 'aitools', label: 'AI Tools', emoji: '🤖', color: '#68c98a',
    skills: [
      { label: 'Claude',  icon: BsRobot, color: '#cc785c' },
      { label: 'ChatGPT', icon: BsRobot, color: '#10a37f' },
      { label: 'Gemini',  icon: BsRobot, color: '#4285f4' },
      { label: 'Grok',    icon: BsRobot, color: '#1da1f2' },
    ],
  },
  {
    id: 'spoken', label: 'Spoken Languages', emoji: '🌐', color: '#8aad95',
    skills: [
      { label: 'English', icon: MdLanguage,         color: '#4caf72' },
      { label: 'Sinhala', icon: MdOutlineTranslate, color: '#ff9900' },
    ],
  },
]

export default function MySkills() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('languages')
  const [inView, setInView]                 = useState(false)
  const [hoveredSkill, setHoveredSkill]     = useState<string | null>(null)
  const [animKey, setAnimKey]               = useState(0)
  const [floatMap, setFloatMap]             = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const map: Record<string, number> = {}
      categories.forEach(cat =>
        cat.skills.forEach((s, i) => {
          map[s.label] = Math.sin(Date.now() / 1300 + i * 0.85) * 3
        })
      )
      setFloatMap(map)
    }, 50)
    return () => clearInterval(id)
  }, [])

  const handleCategory = (id: CategoryId) => {
    setActiveCategory(id)
    setAnimKey(k => k + 1)
  }

  const current = categories.find(c => c.id === activeCategory)!

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full bg-[#eceef3]"
      style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Centered heading ── */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <div
            className="flex items-center gap-3 px-7 py-3 rounded-full"
            style={{
              background: '#eceef3',
              boxShadow: '5px 5px 14px #d1d3da, -5px -5px 14px #ffffff',
              border: '1px solid rgba(255,255,255,0.75)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 18px rgba(76,175,114,0.5)' }}
            />
            <span className="text-lg font-black tracking-[0.25em] uppercase text-gray-500">Skills</span>
          </div>
          <div
            className="h-[3px] w-20 rounded-full"
            style={{ background: 'linear-gradient(to right, transparent, #4caf72, transparent)' }}
          />
        </div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className="flex items-center gap-2 px-5 h-[40px] rounded-full text-xs font-black tracking-wider uppercase"
              style={{
                background: '#eceef3',
                color: activeCategory === cat.id ? cat.color : '#9ca3af',
                boxShadow: activeCategory === cat.id
                  ? 'inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff'
                  : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                border: `1px solid ${activeCategory === cat.id ? cat.color + '55' : 'rgba(255,255,255,0.6)'}`,
                textShadow: activeCategory === cat.id ? `0 0 8px ${cat.color}88` : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── Section title bar ── */}
        <div
          key={activeCategory + '-title'}
          className="flex items-center gap-3 mb-10"
          style={{ animation: 'fadeUp 0.35s ease both' }}
        >
          <span className="text-3xl">{current.emoji}</span>
          <div>
            <h3
              className="text-lg font-black tracking-tight"
              style={{ color: current.color, textShadow: `0 0 16px ${current.color}55` }}
            >
              {current.label}
            </h3>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">{current.skills.length} skills</p>
          </div>
          <div
            className="flex-1 h-[2px] ml-4 rounded-full"
            style={{ background: `linear-gradient(to right, ${current.color}55, transparent)` }}
          />
        </div>

        {/* ── Skills grid ── */}
        <div
          key={animKey}
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
        >
          {current.skills.map((skill, i) => {
            const Icon  = skill.icon
            const isHov = hoveredSkill === skill.label
            const floatY = floatMap[skill.label] ?? 0

            return (
              <div
                key={skill.label}
                onMouseEnter={() => setHoveredSkill(skill.label)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default overflow-hidden select-none"
                style={{
                  background: '#eceef3',
                  boxShadow: isHov
                    ? `inset 4px 4px 10px #c8cad1, inset -4px -4px 10px #ffffff, 0 0 28px ${skill.color}44`
                    : '5px 5px 14px #d1d3da, -5px -5px 14px #ffffff',
                  border: `1.5px solid ${isHov ? skill.color + '77' : 'rgba(255,255,255,0.8)'}`,
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? `translateY(${isHov ? -4 : floatY}px) scale(${isHov ? 1.05 : 1})`
                    : 'translateY(24px) scale(0.94)',
                  transition: isHov
                    ? 'box-shadow 0.28s ease, border 0.28s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)'
                    : `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s, box-shadow 0.28s ease, border 0.28s ease`,
                }}
              >
                {/* Radial bloom */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    opacity: isHov ? 1 : 0,
                    background: `radial-gradient(circle at 50% 38%, ${skill.color}28 0%, transparent 65%)`,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Icon circle — always brand colored */}
                <div
                  style={{
                    width: '58px', height: '58px',
                    borderRadius: '9999px',
                    background: '#eceef3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isHov
                      ? `inset 3px 3px 8px #c8cad1, inset -3px -3px 8px #ffffff, 0 0 0 2.5px ${skill.color}99, 0 0 20px ${skill.color}66`
                      : '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff',
                    transform: isHov ? 'scale(1.16) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                >
                  <Icon
                    style={{
                      width: '26px', height: '26px',
                      color: skill.color,
                      filter: isHov
                        ? `drop-shadow(0 0 10px ${skill.color}ee)`
                        : `drop-shadow(0 0 3px ${skill.color}66)`,
                      transition: 'filter 0.3s ease',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className="text-[11px] font-black tracking-wide text-center leading-tight"
                  style={{
                    color: isHov ? skill.color : '#9ca3af',
                    textShadow: isHov ? `0 0 10px ${skill.color}88` : 'none',
                    transition: 'all 0.28s ease',
                  }}
                >
                  {skill.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* ── Bottom stats ── */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s',
          }}
        >
          {[
            { val: '7+', label: 'Languages'  },
            { val: '8+', label: 'Frameworks' },
            { val: '9+', label: 'Tools'      },
            { val: '4',  label: 'AI Tools'   },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: '#eceef3',
                boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff',
                border: '1px solid rgba(255,255,255,0.7)',
              }}
            >
              <span
                className="text-xl font-black"
                style={{ color: '#4caf72', textShadow: '0 0 10px rgba(76,175,114,0.55)' }}
              >
                {val}
              </span>
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}