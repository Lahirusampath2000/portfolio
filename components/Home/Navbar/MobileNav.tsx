'use client'
import { NavLinks } from '@/constant/constant'
import React, { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import { BiDownload } from 'react-icons/bi'
import { FaCode } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bg = isDark ? '#1c1c21' : '#eceef3'
  const shadow = isDark
    ? '3px 3px 8px #131316, -3px -3px 8px #252529'
    : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff'
  const inset = isDark
    ? 'inset 3px 3px 7px #161619, inset -3px -3px 7px #242428'
    : 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
  const textColor = isDark ? '#9898a4' : '#6b7280'
  const border = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.60)'
  const divider = isDark
    ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)'
    : 'linear-gradient(to right, transparent, #d1d5db, transparent)'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
      />

      {/* Drawer */}
      <div
        className={`fixed top-4 bottom-4 right-4 w-[80%] max-w-[300px] z-50 lg:hidden rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'}`}
        style={{
          background: bg,
          boxShadow: isDark ? '0px 8px 40px #060608' : '0px 8px 40px #c4c6cd',
        }}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: bg, boxShadow: shadow }}
            >
              <FaCode className="w-4 h-4" style={{ color: textColor }} />
            </div>
            <span className="font-bold text-base tracking-wide" style={{ color: isDark ? '#e4e4e9' : '#374151' }}>
              Lahiru
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: bg, boxShadow: shadow, border, color: textColor }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4caf72'; e.currentTarget.style.boxShadow = inset }}
            onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.boxShadow = shadow }}
          >
            <HiX className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px mb-2" style={{ background: divider }} />

        {/* Nav Links */}
        <nav className="flex flex-col gap-3 px-5 py-5 flex-1">
          {NavLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.id}
                href={link.url}
                onClick={onClose}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm tracking-widest uppercase transition-all duration-300"
                style={{ background: bg, color: textColor, boxShadow: shadow, border }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4caf72'; e.currentTarget.style.boxShadow = inset }}
                onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.boxShadow = shadow }}
              >
                <Icon className="w-4 h-4 transition-colors duration-300" />
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="mx-5 h-px mb-4" style={{ background: divider }} />

        {/* Download CV */}
        <div className="px-5 pb-5">
          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300"
            style={{ background: bg, color: isDark ? '#e4e4e9' : '#4b5563', boxShadow: shadow, border }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4caf72'; e.currentTarget.style.boxShadow = inset }}
            onMouseLeave={e => { e.currentTarget.style.color = isDark ? '#e4e4e9' : '#4b5563'; e.currentTarget.style.boxShadow = shadow }}
          >
            <BiDownload className="w-4 h-4" />
            Download CV
          </button>
        </div>

      </div>
    </>
  )
}

export default MobileNav