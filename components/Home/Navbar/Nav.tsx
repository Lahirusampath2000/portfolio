'use client'
import { NavLinks } from '@/constant/constant'
import React from 'react'
import { BiDownload } from 'react-icons/bi'
import { FaCode } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { useTheme } from '@/context/ThemeContext'

/* ── Moon / Sun icons (inline SVG, no deps) ── */
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

const Nav = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className="fixed top-0 left-0 w-full h-[12vh] z-50 flex items-center">
      <div
        className="relative flex items-center h-[64px] w-[90%] mx-auto px-6 rounded-full border"
        style={{
          background: 'var(--nm-bg, #eceef3)',
          boxShadow: isDark
            ? '8px 8px 20px var(--nm-sh-dark, #131316), -8px -8px 20px var(--nm-sh-lite, #252529)'
            : '8px 8px 20px #d1d3da, -8px -8px 20px #ffffff',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.80)',
        }}
      >

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--nm-bg, #eceef3)',
              boxShadow: isDark
                ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
            }}
          >
            <FaCode className="w-5 h-5" style={{ color: isDark ? '#9898a4' : '#6b7280' }} />
          </div>
          <span
            className="font-bold text-lg tracking-wide leading-none"
            style={{ color: isDark ? '#e4e4e9' : '#4b5563' }}
          >
            Lahiru Sampath
          </span>
        </div>

        {/* NavLinks (Centered) */}
        <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
          {NavLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.id}
                href={link.url}
                className="group flex items-center justify-center gap-2 px-5 h-[38px] rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300"
                style={{
                  background: 'var(--nm-bg, #eceef3)',
                  color: isDark ? '#9898a4' : '#6b7280',
                  boxShadow: isDark
                    ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                    : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.50)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#4caf72'
                  e.currentTarget.style.boxShadow = isDark
                    ? 'inset 3px 3px 7px var(--nm-in-dark, #161619), inset -3px -3px 7px var(--nm-in-lite, #242428)'
                    : 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isDark ? '#9898a4' : '#6b7280'
                  e.currentTarget.style.boxShadow = isDark
                    ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                    : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff'
                }}
              >
                <Icon className="w-[15px] h-[15px] shrink-0 transition-colors duration-300" />
                <span className="leading-none translate-y-[0.5px]">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Right: Theme toggle + Download CV + Hamburger */}
        <div className="ml-auto flex items-center space-x-3">

          {/* ── Dark mode toggle ── */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'var(--nm-bg, #eceef3)',
              color: isDark ? '#4caf72' : '#9ca3af',
              boxShadow: isDark
                ? 'inset 3px 3px 7px var(--nm-in-dark, #161619), inset -3px -3px 7px var(--nm-in-lite, #242428), 0 0 10px rgba(76,175,114,0.15)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
              border: isDark
                ? '1px solid rgba(76,175,114,0.25)'
                : '1px solid rgba(255,255,255,0.50)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#4caf72'
              if (!isDark) {
                e.currentTarget.style.boxShadow = 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isDark ? '#4caf72' : '#9ca3af'
              e.currentTarget.style.boxShadow = isDark
                ? 'inset 3px 3px 7px var(--nm-in-dark, #161619), inset -3px -3px 7px var(--nm-in-lite, #242428), 0 0 10px rgba(76,175,114,0.15)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff'
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
                transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-30deg) scale(0.9)',
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          {/* Download CV */}
          <button
            className="group flex items-center justify-center gap-2 px-5 h-[38px] rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
            style={{
              background: 'var(--nm-bg, #eceef3)',
              color: isDark ? '#9898a4' : '#6b7280',
              boxShadow: isDark
                ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.50)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#4caf72'
              e.currentTarget.style.boxShadow = isDark
                ? 'inset 3px 3px 7px var(--nm-in-dark, #161619), inset -3px -3px 7px var(--nm-in-lite, #242428)'
                : 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isDark ? '#9898a4' : '#6b7280'
              e.currentTarget.style.boxShadow = isDark
                ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff'
            }}
          >
            <BiDownload className="w-[15px] h-[15px] shrink-0 transition-colors duration-300" />
            <span className="hidden sm:inline leading-none translate-y-[0.5px]">Download CV</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'var(--nm-bg, #eceef3)',
              color: isDark ? '#9898a4' : '#6b7280',
              boxShadow: isDark
                ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.50)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#4caf72'
              e.currentTarget.style.boxShadow = isDark
                ? 'inset 3px 3px 7px var(--nm-in-dark, #161619), inset -3px -3px 7px var(--nm-in-lite, #242428)'
                : 'inset 3px 3px 7px #c8cad1, inset -3px -3px 7px #ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isDark ? '#9898a4' : '#6b7280'
              e.currentTarget.style.boxShadow = isDark
                ? '3px 3px 8px var(--nm-sh-dark, #131316), -3px -3px 8px var(--nm-sh-lite, #252529)'
                : '3px 3px 8px #d1d3da, -3px -3px 8px #ffffff'
            }}
          >
            <HiBars3BottomRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Nav