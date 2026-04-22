'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const roles = ['Full Stack Developer', 'Software Engineer', 'Web Developer']

const Hero = () => {
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex((c) => c + 1) }, 80)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex((c) => c - 1) }, 40)
    } else {
      setDeleting(false); setRoleIndex((r) => (r + 1) % roles.length); setCharIndex(0)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  return (
    <div className="w-full bg-[#eceef3]" style={{ minHeight: '100vh', paddingTop: '18vh', display: 'flex', alignItems: 'flex-start' }}>
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-24 py-10">

        {/* Left */}
        <div className="flex flex-col items-start gap-4 max-w-lg w-full">

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#eceef3] shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/60">
            <span className="w-2 h-2 rounded-full bg-[#4caf72] animate-pulse" style={{ boxShadow: '0 0 6px #4caf72, 0 0 12px #4caf72' }} />
            <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">2+ Years Experience</span>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-[#4caf72]">Hello, I'm</span>
            <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight">
              <span className="text-gray-700">Lahiru </span>
              <span className="text-gray-600 font-extrabold" style={{ textShadow: '0 0 20px rgba(76,175,114,0.4), 0 0 40px rgba(76,175,114,0.2)' }}>Sampath</span>
            </h1>
          </div>

          {/* Typewriter */}
          <div className="flex items-center gap-3 h-9">
            <div className="h-px w-8 bg-[#4caf72] shrink-0" style={{ boxShadow: '0 0 6px #4caf72' }} />
            <p className="text-lg md:text-xl font-bold tracking-wide" style={{ color: '#4caf72', textShadow: '0 0 8px rgba(76,175,114,1), 0 0 20px rgba(76,175,114,0.7), 0 0 40px rgba(76,175,114,0.5), 0 0 80px rgba(76,175,114,0.3)' }}>
              {displayed}
              <span className="inline-block w-[2px] h-5 ml-[2px] align-middle animate-pulse" style={{ background: '#4caf72', boxShadow: '0 0 8px #4caf72, 0 0 16px #4caf72' }} />
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            IIT (University of Westminster) Software Engineering graduate, currently working as a{' '}
            <span className="font-semibold" style={{ color: '#4caf72', textShadow: '0 0 8px rgba(76,175,114,0.6)' }}>Junior Software Engineer at NMA Software</span>.
            {' '}Experienced in building scalable web applications with Node.js, React, and PostgreSQL. Passionate about solving real-world problems through clean, efficient code.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-1 flex-wrap">
            <button className="flex items-center gap-2 px-6 h-[44px] rounded-full bg-[#eceef3] text-gray-600 font-semibold text-sm tracking-wide shadow-[4px_4px_10px_#d1d3da,-4px_-4px_10px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
              View Projects
            </button>
            <button className="flex items-center gap-2 px-6 h-[44px] rounded-full bg-[#eceef3] text-gray-600 font-semibold text-sm tracking-wide shadow-[4px_4px_10px_#d1d3da,-4px_-4px_10px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
              Contact Me
            </button>
          </div>

        </div>

        {/* Right — Image */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div
            className="relative rounded-full bg-[#eceef3] flex items-center justify-center cursor-pointer transition-all duration-500"
            style={{
              width: '360px', height: '360px',
              boxShadow: isHovered
                ? '16px 16px 36px #c8cad1, -16px -16px 36px #ffffff, 0 0 40px rgba(76,175,114,0.2), 0 0 80px rgba(76,175,114,0.1)'
                : '12px 12px 28px #d1d3da, -12px -12px 28px #ffffff'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '16s', border: '2px dashed rgba(76,175,114,0.35)' }} />
            <div className="absolute inset-4 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse', border: '1.5px dotted rgba(76,175,114,0.2)' }} />
            <div className="absolute inset-0 rounded-full transition-all duration-500" style={{ background: isHovered ? 'radial-gradient(circle, rgba(76,175,114,0.08) 0%, transparent 70%)' : 'transparent' }} />

            <div style={{ width: '300px', height: '300px', borderRadius: '9999px', background: '#eceef3', boxShadow: 'inset 6px 6px 16px #d1d3da, inset -6px -6px 16px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                className="relative overflow-hidden rounded-full transition-all duration-500"
                style={{
                  width: '252px', height: '252px',
                  border: '4px solid rgba(255,255,255,0.9)',
                  boxShadow: isHovered
                    ? '0 0 0 3px rgba(76,175,114,0.5), 0 0 20px rgba(76,175,114,0.4), 0 0 50px rgba(76,175,114,0.25), 6px 6px 16px #d1d3da, -6px -6px 16px #ffffff'
                    : '0 0 0 2px rgba(76,175,114,0.2), 6px 6px 16px #d1d3da, -6px -6px 16px #ffffff',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)'
                }}
              >
                <Image src="/images/homa.jpg" alt="Lahiru Sampath" fill className="object-cover object-top transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }} />
                <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(76,175,114,0.08) 100%)' }} />
              </div>
            </div>

            {/* Ping dot */}
            <div className="absolute top-5 right-5 flex items-center justify-center" style={{ width: '22px', height: '22px', borderRadius: '9999px', background: '#eceef3', boxShadow: '2px 2px 6px #d1d3da, -2px -2px 6px #ffffff' }}>
              <span className="animate-ping absolute inline-flex rounded-full bg-[#4caf72] opacity-50" style={{ width: '10px', height: '10px' }} />
              <span className="relative inline-flex rounded-full bg-[#4caf72]" style={{ width: '10px', height: '10px', boxShadow: '0 0 6px #4caf72, 0 0 14px #4caf72, 0 0 28px rgba(76,175,114,0.6)' }} />
            </div>

            {/* 2+ years card */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col items-center px-4 py-3 rounded-2xl" style={{ background: '#eceef3', boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}>
              <span className="text-xl font-black" style={{ color: '#4caf72', textShadow: '0 0 10px rgba(76,175,114,0.7), 0 0 20px rgba(76,175,114,0.4)' }}>2+</span>
              <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Years</span>
            </div>

            {/* Bottom badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap" style={{ background: '#eceef3', boxShadow: '4px 4px 12px #d1d3da, -4px -4px 12px #ffffff', border: '1px solid rgba(255,255,255,0.7)' }}>
              <span className="w-2 h-2 rounded-full bg-[#4caf72] animate-pulse" style={{ boxShadow: '0 0 6px #4caf72, 0 0 14px #4caf72' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#4caf72', textShadow: '0 0 8px rgba(76,175,114,0.9), 0 0 20px rgba(76,175,114,0.5)' }}>Full Stack Developer</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero