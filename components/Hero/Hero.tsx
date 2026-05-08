'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'  // ← changed from @/context/ThemeContext

const roles = ['Full Stack Developer', 'Software Engineer', 'Web Developer']

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 22.222 24h.003z" />
  </svg>
)

const HachureArrow = ({ isDark }: { isDark: boolean }) => {
  const stroke = isDark ? 'rgba(255,255,255,0.18)' : '#2d2d2d'
  return (
    <svg viewBox="0 0 220 90" width="220" height="90" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 20 }}
      aria-hidden="true"
    >
      <path d="M 200 10 C 160 12, 80 30, 18 72" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 18 72 L 28 62 M 18 72 L 30 76" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      {[
        { x1: 185, y1: 13, x2: 183, y2: 20 },
        { x1: 165, y1: 18, x2: 162, y2: 25 },
        { x1: 144, y1: 25, x2: 141, y2: 32 },
        { x1: 123, y1: 34, x2: 120, y2: 41 },
        { x1: 103, y1: 44, x2: 100, y2: 51 },
        { x1: 82,  y1: 54, x2: 79,  y2: 61 },
        { x1: 60,  y1: 63, x2: 57,  y2: 70 },
        { x1: 40,  y1: 69, x2: 37,  y2: 76 },
      ].map((h, i) => (
        <line key={i} x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      ))}
    </svg>
  )
}

const Hero = () => {
  const { resolvedTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : false

  const bg      = isDark ? '#27272e' : '#eceef3'
  const shDark  = isDark ? '#17171c' : '#d1d3da'
  const shLite  = isDark ? '#37373f' : '#ffffff'
  const inDark  = isDark ? '#1b1b20' : '#c8cad1'
  const inLite  = isDark ? '#333339' : '#ffffff'
  const text1   = isDark ? '#e4e4e9' : '#1f2937'
  const text2   = isDark ? '#9898a4' : '#6b7280'
  const text3   = isDark ? '#5c5c68' : '#9ca3af'
  const border  = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.60)'

  const nmOutSm  = `3px 3px 8px ${shDark}, -3px -3px 8px ${shLite}`
  const nmOutMd  = `4px 4px 10px ${shDark}, -4px -4px 10px ${shLite}`
  const nmOutLg  = `6px 6px 14px ${shDark}, -6px -6px 14px ${shLite}`
  const nmOutXl  = `12px 12px 28px ${shDark}, -12px -12px 28px ${shLite}`
  const nmOutXxl = `16px 16px 36px ${shDark}, -16px -16px 36px ${shLite}`
  const nmInMd   = `inset 4px 4px 10px ${inDark}, inset -4px -4px 10px ${inLite}`
  const nmInLg   = `inset 6px 6px 16px ${inDark}, inset -6px -6px 16px ${inLite}`
  const nmInSm   = `inset 3px 3px 7px ${inDark}, inset -3px -3px 7px ${inLite}`

  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1) }, 80)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c - 1) }, 40)
    } else {
      setDeleting(false); setRoleIndex(r => (r + 1) % roles.length); setCharIndex(0)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  const px = (mouse.x - 0.5) * 30
  const py = (mouse.y - 0.5) * 30

  return (
    <div
      className="w-full relative overflow-hidden"
      id="home"
      style={{ background: bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', transition: mounted ? 'background 0.3s ease' : 'none' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(76,175,114,${isDark ? '0.07' : '0.10'}) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          opacity: isDark ? 0.6 : 1,
        }}
      />

      {/* Parallax orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          width: 560, height: 560,
          background: `radial-gradient(circle, rgba(76,175,114,${isDark ? '0.06' : '0.08'}) 0%, transparent 70%)`,
          top: -180, right: -80,
          transform: `translate(${-px * 0.8}px, ${-py * 0.8}px)`,
          transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
        }} />
        <div className="absolute rounded-full" style={{
          width: 380, height: 380,
          background: `radial-gradient(circle, rgba(76,175,114,${isDark ? '0.05' : '0.06'}) 0%, transparent 70%)`,
          bottom: 60, left: '5%',
          transform: `translate(${px * 0.6}px, ${py * 0.6}px)`,
          transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>

      {/* Ghost watermark */}
      {(['LAHIRU', 'Sampath'] as const).map((word, i) => (
        <div key={word} className="absolute pointer-events-none select-none" style={{
          fontSize: 'clamp(90px, 14vw, 200px)', fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: `1.7px rgba(${isDark ? '76,175,114,0.07' : '67,150,99,0.11'})`,
          top: i === 0 ? '8%' : '30%', left: i === 0 ? '2%' : '8%',
          letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap', userSelect: 'none',
        }}>
          {word}
        </div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute z-20 hidden lg:flex flex-col items-center"
        style={{ bottom: 400, right: 52, gap: 0, opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.8s' }}>
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: '0.28em',
          color: '#4caf72', textTransform: 'uppercase', marginBottom: 8,
          animation: 'neonFade 2s ease-in-out infinite',
          textShadow: '0 0 6px rgba(76,175,114,0.8), 0 0 14px rgba(76,175,114,0.5)',
        }}>Scroll Me</span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 6 }}>
          {[0, 1].map(i => (
            <svg key={i} width="16" height="10" viewBox="0 0 16 10" fill="none"
              style={{ animation: 'arrowUp 1.8s ease-in-out infinite', animationDelay: `${i * 0.2}s`, opacity: 0 }}>
              <path d="M1.5 8L8 2L14.5 8" stroke="#4caf72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>

        <div style={{
          width: 32, height: 50, borderRadius: 16, background: bg,
          boxShadow: `5px 5px 12px ${shDark}, -5px -5px 12px ${shLite}`,
          border: '2px solid rgba(76,175,114,0.4)',
          position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1.5, height: 18, background: 'linear-gradient(to bottom, rgba(76,175,114,0.5), transparent)' }} />
          <div style={{ position: 'absolute', top: 18, left: 5, right: 5, height: 1, borderRadius: 1, background: 'rgba(76,175,114,0.2)' }} />
          <div style={{
            position: 'absolute', top: 23, left: '50%', transform: 'translateX(-50%)',
            width: 6, height: 12, borderRadius: 3,
            background: 'linear-gradient(to bottom, #4caf72, rgba(76,175,114,0.4))',
            boxShadow: '0 0 8px rgba(76,175,114,0.7)',
            animation: 'wheelScroll 1.8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 18,
            background: 'radial-gradient(ellipse at center bottom, rgba(76,175,114,0.2) 0%, transparent 80%)',
            animation: 'glowPulse 1.8s ease-in-out infinite',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 6 }}>
          {[0, 1].map(i => (
            <svg key={i} width="16" height="10" viewBox="0 0 16 10" fill="none"
              style={{ animation: 'arrowDown 1.8s ease-in-out infinite', animationDelay: `${i * 0.2}s`, opacity: 0 }}>
              <path d="M1.5 2L8 8L14.5 2" stroke="#4caf72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-10 relative z-10 flex flex-col flex-1"
        style={{ paddingTop: '14vh', paddingBottom: '8vh' }}>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 flex-1 relative">

          {/* Hachure arrow */}
          <div className="hidden lg:block" style={{
            position: 'absolute', right: '32%', top: '22%',
            opacity: mounted ? 0.75 : 0, transition: 'opacity 1s ease 0.6s',
            transform: 'rotate(-6deg)',
          }}>
            <HachureArrow isDark={isDark} />
          </div>

          {/* Left */}
          <div className="flex flex-col items-start gap-5 max-w-xl w-full" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: bg, boxShadow: nmOutSm, border: `1px solid ${border}` }}>
              <span className="w-2 h-2 rounded-full bg-[#4caf72] animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: text2 }}>
                Available for Work
              </span>
            </div>

            <div className="flex flex-col gap-0">
              <span className="text-md font-semibold tracking-[0.3em] uppercase text-[#4caf72] mb-1">Hello, I'm</span>
              <h1 className="leading-[1.0] tracking-tight" style={{ fontSize: 'clamp(46px, 5.5vw, 78px)', fontWeight: 900 }}>
                <span className="block" style={{ color: isDark ? '#c8c8d0' : '#374151' }}>Lahiru</span>
                <span className="block" style={{
                  marginLeft: 'clamp(18px, 2.5vw, 36px)', color: text1,
                  textShadow: isDark
                    ? `3px 3px 6px ${shDark}, -2px -2px 5px ${shLite}`
                    : `3px 3px 6px #d1d3da, -2px -2px 5px #ffffff, 0 1px 0px rgba(255,255,255,0.9)`,
                  letterSpacing: '-0.01em',
                }}>Sampath</span>
              </h1>
            </div>

            <div className="flex items-center gap-0 h-8">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-[#4caf72]">
                {displayed}
                <span className="inline-block w-[2px] h-5 ml-[2px] align-middle animate-pulse" style={{ background: '#4caf72' }} />
              </p>
            </div>

            <p className="text-[15px] leading-relaxed max-w-md" style={{ color: text3 }}>
              IIT graduate crafting scalable full-stack solutions.<br />
              Turning complex problems into clean, efficient products.
            </p>

            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <a href="#projects">
              <button
                className="flex items-center gap-2 px-7 h-[46px] rounded-full font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer"
                style={{ background: bg, color: '#4caf72', boxShadow: nmOutMd, border: `1px solid ${border}` }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = nmInSm }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = nmOutMd }}
              >
                View Projects
              </button>
            </a>
            <a href="#contact">
              <button
                className="flex items-center gap-2 px-7 h-[46px] rounded-full font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer"
                style={{ background: bg, color: text2, boxShadow: nmOutMd, border: `1px solid ${border}` }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = nmInSm;
                  e.currentTarget.style.color = '#4caf72';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = nmOutMd;
                  e.currentTarget.style.color = text2;
                }}
              >
                Contact Me
              </button>
            </a>
            </div>

            <div className="flex items-center gap-3 mt-1">
            {[
              { href: 'https://github.com/Lahirusampath2000', icon: <GitHubIcon />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/lahiru-sampath-9a0779373/', icon: <LinkedInIcon />, label: 'LinkedIn' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                style={{
                  background: bg,
                  color: text3,
                  boxShadow: nmOutSm,
                  border: `1px solid ${border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#4caf72'
                  e.currentTarget.style.boxShadow = `inset 2px 2px 5px ${inDark}, inset -2px -2px 5px ${inLite}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = text3
                  e.currentTarget.style.boxShadow = nmOutSm
                }}
              >
                {icon}
              </a>
            ))}
          </div>
          </div>

          {/* Right — Photo */}
          <div className="flex-shrink-0 flex items-center justify-center relative" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            {['top-0 left-0 border-t-2 border-l-2 rounded-tl', 'top-0 right-0 border-t-2 border-r-2 rounded-tr',
              'bottom-0 left-0 border-b-2 border-l-2 rounded-bl', 'bottom-0 right-0 border-b-2 border-r-2 rounded-br',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-7 h-7 border-[#4caf72] ${cls}`} style={{ opacity: isDark ? 0.55 : 0.45 }} />
            ))}

            <div className="relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-500"
              style={{
                width: 360, height: 360, background: bg,
                boxShadow: isHovered ? `${nmOutXxl}, 0 0 40px rgba(76,175,114,${isDark ? '0.12' : '0.08'})` : nmOutXl,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{ animationDuration: '18s', border: `2px dashed rgba(76,175,114,${isDark ? '0.28' : '0.22'})` }} />
              <div className="absolute inset-5 rounded-full animate-spin"
                style={{ animationDuration: '11s', animationDirection: 'reverse', border: `1.5px dotted rgba(76,175,114,${isDark ? '0.16' : '0.12'})` }} />
              <div className="absolute inset-0 rounded-full transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0, background: `radial-gradient(circle, rgba(76,175,114,${isDark ? '0.08' : '0.06'}) 0%, transparent 70%)` }} />

              <div style={{
                width: 300, height: 300, borderRadius: '9999px', background: bg,
                boxShadow: nmInLg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div className="relative overflow-hidden rounded-full transition-all duration-500" style={{
                  width: 252, height: 252,
                  border: `4px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)'}`,
                  boxShadow: isHovered
                    ? `0 0 0 3px rgba(76,175,114,0.4), 6px 6px 16px ${shDark}, -6px -6px 16px ${shLite}`
                    : `0 0 0 2px rgba(76,175,114,${isDark ? '0.25' : '0.15'}), 6px 6px 16px ${shDark}, -6px -6px 16px ${shLite}`,
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                }}>
                  <Image src="/images/lahiru sampath.jpg" alt="Lahiru Sampath" fill className="object-cover object-top"
                    style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
                  <div className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: isHovered ? 1 : 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(76,175,114,0.06) 100%)' }} />
                </div>
              </div>

              <div className="absolute top-5 right-6 flex items-center justify-center"
                style={{ width: 22, height: 22, borderRadius: '9999px', background: bg, boxShadow: `2px 2px 6px ${shDark}, -2px -2px 6px ${shLite}` }}>
                <span className="animate-ping absolute inline-flex rounded-full bg-[#4caf72] opacity-40" style={{ width: 10, height: 10 }} />
                <span className="relative inline-flex rounded-full bg-[#4caf72]" style={{ width: 10, height: 10 }} />
              </div>

              <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex-col items-center px-4 py-3 rounded-2xl hidden sm:flex"
                style={{ background: bg, boxShadow: `4px 4px 12px ${shDark}, -4px -4px 12px ${shLite}`, border: `1px solid ${border}` }}>
                <span className="text-xl font-black text-[#4caf72]">2+</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: text3 }}>Years</span>
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap"
                style={{
                  background: bg,
                  boxShadow: `4px 4px 12px ${shDark}, -4px -4px 12px ${shLite}`,
                  border: `1px solid ${isDark ? 'rgba(76,175,114,0.2)' : border}`,
                }}>
                <span className="w-2 h-2 rounded-full bg-[#4caf72] animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#4caf72]">Full Stack Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}>
          <div className="flex items-stretch gap-4 flex-wrap">
            {[{ value: '10+', label: 'Projects Built' }, { value: '2+', label: 'Years Exp.' }].map(({ value, label }) => (
              <div key={label} className="flex flex-col justify-center px-8 py-5 rounded-2xl relative overflow-hidden"
                style={{ background: bg, boxShadow: nmOutLg, border: `1px solid ${border}`, minWidth: 140 }}>
                <div style={{
                  position: 'absolute', left: 0, top: '18%', bottom: '18%', width: 3, borderRadius: 2,
                  background: 'linear-gradient(to bottom, #4caf72, rgba(76,175,114,0.3))',
                }} />
                <div className="font-black leading-none" style={{ fontSize: 36, color: text1 }}>{value}</div>
                <div className="text-[11px] font-semibold tracking-widest uppercase mt-1.5" style={{ color: text3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wheelScroll {
          0%   { transform: translateX(-50%) translateY(0);    opacity: 1;   }
          60%  { transform: translateX(-50%) translateY(6px);  opacity: 0.3; }
          61%  { transform: translateX(-50%) translateY(-4px); opacity: 0;   }
          100% { transform: translateX(-50%) translateY(0);    opacity: 1;   }
        }
        @keyframes arrowDown {
          0%   { opacity: 0; transform: translateY(-4px); }
          40%  { opacity: 1; transform: translateY(0);    }
          80%  { opacity: 0; transform: translateY(4px);  }
          100% { opacity: 0; transform: translateY(4px);  }
        }
        @keyframes arrowUp {
          0%   { opacity: 0; transform: translateY(4px);  }
          40%  { opacity: 1; transform: translateY(0);    }
          80%  { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
        @keyframes glowPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes neonFade {
          0%, 100% { opacity: 0.4; text-shadow: 0 0 4px rgba(76,175,114,0.4), 0 0 10px rgba(76,175,114,0.2); }
          50%       { opacity: 1;   text-shadow: 0 0 8px rgba(76,175,114,1), 0 0 20px rgba(76,175,114,0.8), 0 0 40px rgba(76,175,114,0.4); }
        }
      `}</style>
    </div>
  )
}

export default Hero