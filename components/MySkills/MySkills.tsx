'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaJava, FaPython, FaPhp, FaReact, FaBootstrap, FaGithub, FaAws, FaNodeJs, FaChartBar } from 'react-icons/fa'
import { SiJavascript, SiHtml5, SiExpress, SiLaravel, SiRedux, SiPaypal, SiTypescript, SiTailwindcss, SiNextdotjs, SiMysql, SiPostgresql, SiSocketdotio, SiFlask, SiOpencv, SiTensorflow, SiPycharm, SiPostman, SiStripe, SiBitbucket, SiIntellijidea, SiLeaflet } from 'react-icons/si'
import { BsRobot, BsFiletypeCss, BsFiletypeSql } from 'react-icons/bs'
import { MdLanguage, MdOutlineTranslate } from 'react-icons/md'
import { useNeumorph } from '@/hooks/useNeumorph'

type CategoryId = 'languages' | 'frameworks' | 'tools' | 'ai' | 'aitools' | 'spoken'

interface Skill { label: string; icon: React.ElementType; color: string }

const categories: { id: CategoryId; label: string; emoji: string; color: string; skills: Skill[] }[] = [
  {
    id: 'languages', label: 'Programming Languages', emoji: '💻', color: '#4caf72',
    skills: [
      { label: 'JavaScript', icon: SiJavascript,  color: '#f7df1e' },
      { label: 'TypeScript', icon: SiTypescript,  color: '#3178c6' },
      { label: 'HTML5',      icon: SiHtml5,        color: '#e34f26' },
      { label: 'CSS',        icon: BsFiletypeCss,  color: '#1572b6' },
      { label: 'Python',     icon: FaPython,        color: '#3776ab' },
      { label: 'SQL',        icon: BsFiletypeSql,  color: '#4caf72' },
      { label: 'PHP',        icon: FaPhp,           color: '#777bb4' },
      { label: 'Java',       icon: FaJava,          color: '#ed8b00' },
    ],
  },
  {
    id: 'frameworks', label: 'Frameworks and Libraries', emoji: '⚙️', color: '#68c98a',
    skills: [
      { label: 'React.js',     icon: FaReact,       color: '#61dafb' },
      { label: 'Node.js',      icon: FaNodeJs,      color: '#68a063' },
      { label: 'Next.js',      icon: SiNextdotjs,   color: '#9898a4' },
      { label: 'Express.js',   icon: SiExpress,     color: '#4caf72' },
      { label: 'Redux',        icon: SiRedux,       color: '#764abc' },
      { label: 'Bootstrap',    icon: FaBootstrap,   color: '#7952b3' },
      { label: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
      { label: 'Socket.io',    icon: SiSocketdotio, color: '#9898a4' },
      { label: 'Laravel',      icon: SiLaravel,     color: '#ff2d20' },
      { label: 'Leaflet',      icon: SiLeaflet,     color: '#199900' },
      { label: 'rechart',      icon: FaChartBar,    color: '#4caf72' },
      { label: 'Flask',        icon: SiFlask,       color: '#9898a4' },
    ],
  },
  {
    id: 'tools', label: 'Tools', emoji: '🛠️', color: '#8aad95',
    skills: [
      { label: 'PostgreSQL', icon: SiPostgresql,   color: '#336791' },
      { label: 'MySQL',      icon: SiMysql,        color: '#4479a1' },
      { label: 'AWS',        icon: FaAws,          color: '#ff9900' },
      { label: 'Postman',    icon: SiPostman,      color: '#ff6c37' },
      { label: 'GitHub',     icon: FaGithub,       color: '#9898a4' },
      { label: 'Bitbucket',  icon: SiBitbucket,    color: '#0052cc' },
      { label: 'Stripe',     icon: SiStripe,       color: '#635bff' },
      { label: 'PayPal',     icon: SiPaypal,       color: '#003087' },
      { label: 'PyCharm',    icon: SiPycharm,      color: '#9898a4' },
      { label: 'IntelliJ',   icon: SiIntellijidea, color: '#9898a4' },
    ],
  },
  {
    id: 'ai', label: 'AI & ML', emoji: '🧠', color: '#4caf72',
    skills: [
      { label: 'OpenCV',           icon: SiOpencv,     color: '#5c3ee8' },
      { label: 'TensorFlow',       icon: SiTensorflow, color: '#ff6f00' },
      { label: 'Flask ML',         icon: SiFlask,      color: '#4caf72' },
      { label: 'Image Processing', icon: SiOpencv,     color: '#5c3ee8' },
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
  const nm = useNeumorph()
  const { isDark, bg, shDark, shLite, inDark, inLite, text1, text2, text3, border, accent, out, inn } = nm

  const [activeCategory, setActiveCategory] = useState<CategoryId>('languages')
  const [inView, setInView]                 = useState(false)
  const [hoveredSkill, setHoveredSkill]     = useState<string | null>(null)
  const [animKey, setAnimKey]               = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
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
      className="w-full"
      style={{ background: bg, paddingTop: '3vh', paddingBottom: '10vh', transition: 'background 0.3s ease' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Caption */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center max-w-lg mx-auto">
          <h2 className="text-4xl font-black leading-tight tracking-tight" style={{ color: text1 }}>
            Learned by building.{' '}
            <span style={{ color: accent }}>Proven in practice.</span>
          </h2>
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: accent, boxShadow: '0 0 6px #4caf72' }} />
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: text3 }}>Pick a category</span>
            <span className="text-[11px] font-black tracking-wider uppercase" style={{ color: accent }}>→ skills reveal</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className="flex items-center gap-2 px-5 h-[40px] rounded-full text-xs font-black tracking-wider uppercase"
              style={{
                background: bg,
                color: activeCategory === cat.id ? cat.color : text3,
                boxShadow: activeCategory === cat.id ? inn.sm : out.sm,
                border: `1px solid ${activeCategory === cat.id ? cat.color + '55' : border}`,
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

        {/* Section title bar */}
        <div
          key={activeCategory + '-title'}
          className="flex items-center gap-3 mb-10"
          style={{ animation: 'fadeUp 0.35s ease both' }}
        >
          <span className="text-3xl">{current.emoji}</span>
          <div>
            <h3 className="text-lg font-black tracking-tight"
              style={{ color: current.color, textShadow: `0 0 16px ${current.color}55` }}>
              {current.label}
            </h3>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: text3 }}>{current.skills.length} skills</p>
          </div>
          <div className="flex-1 h-[2px] ml-4 rounded-full"
            style={{ background: `linear-gradient(to right, ${current.color}55, transparent)` }} />
        </div>

        {/* Skills grid */}
        <div
          key={animKey}
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
        >
          {current.skills.map((skill, i) => {
            const Icon  = skill.icon
            const isHov = hoveredSkill === skill.label

            /* icon circle: in dark mode pitch-black icons get a lighter fallback */
            const iconColor = isDark && ['#000000', '#0a0a0a', '#050505', '#060606', '#090a09', '#080707'].includes(skill.color)
              ? '#9898a4'
              : skill.color

            return (
              <div
                key={skill.label}
                onMouseEnter={() => setHoveredSkill(skill.label)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default overflow-hidden select-none"
                style={{
                  background: bg,
                  boxShadow: isHov
                    ? `${inn.md}, 0 0 28px ${iconColor}44`
                    : out.lg,
                  border: `1.5px solid ${isHov ? iconColor + '77' : border}`,
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? `translateY(${isHov ? -4 : 0}px) scale(${isHov ? 1.05 : 1})`
                    : 'translateY(24px) scale(0.94)',
                  animation: inView && !isHov
                    ? `fadeInCard 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s both, floatCard 2.8s ease-in-out ${i * 0.22}s infinite`
                    : `fadeInCard 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.055}s both`,
                  transition: isHov
                    ? 'box-shadow 0.28s ease, border 0.28s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)'
                    : 'box-shadow 0.28s ease, border 0.28s ease, transform 0.28s ease',
                }}
              >
                {/* Radial bloom */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    opacity: isHov ? 1 : 0,
                    background: `radial-gradient(circle at 50% 38%, ${iconColor}28 0%, transparent 65%)`,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Icon circle */}
                <div style={{
                  width: '58px', height: '58px', borderRadius: '9999px', background: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isHov
                    ? `${inn.sm}, 0 0 0 2.5px ${iconColor}99, 0 0 20px ${iconColor}66`
                    : out.md,
                  transform: isHov ? 'scale(1.16) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <Icon style={{
                    width: '26px', height: '26px',
                    color: iconColor,
                    filter: isHov
                      ? `drop-shadow(0 0 10px ${iconColor}ee)`
                      : `drop-shadow(0 0 3px ${iconColor}66)`,
                    transition: 'filter 0.3s ease',
                  }} />
                </div>

                {/* Label */}
                <span className="text-[11px] font-black tracking-wide text-center leading-tight"
                  style={{
                    color: isHov ? iconColor : text3,
                    textShadow: isHov ? `0 0 10px ${iconColor}88` : 'none',
                    transition: 'all 0.28s ease',
                  }}>
                  {skill.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Bottom stats */}
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
              style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}
            >
              <span className="text-xl font-black" style={{ color: accent, textShadow: '0 0 10px rgba(76,175,114,0.55)' }}>{val}</span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: text3 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(24px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0px)  scale(1);    }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px)  scale(1); }
          50%       { transform: translateY(-5px) scale(1); }
        }
      `}</style>
    </section>
  )
}