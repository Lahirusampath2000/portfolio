'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useNeumorph } from '@/hooks/useNeumorph'
import {
  FiSend, FiUser, FiMail, FiMessageSquare,
  FiTerminal, FiCheckCircle, FiAlertCircle,
  FiGithub, FiLinkedin, FiTwitter, FiCopy, FiCheck,
} from 'react-icons/fi'

/* ── Types ── */
type FormState = 'idle' | 'typing' | 'sending' | 'success' | 'error'

interface Field {
  key: 'name' | 'email' | 'subject' | 'message'
  label: string
  placeholder: string
  type: 'input' | 'textarea'
  icon: React.ElementType
  validate: (v: string) => string | null
}

/* ── Field Config ── */
const FIELDS: Field[] = [
  {
    key: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'input', icon: FiUser,
    validate: v => v.trim().length < 2 ? 'Name must be at least 2 characters' : null,
  },
  {
    key: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'input', icon: FiMail,
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Please enter a valid email',
  },
  {
    key: 'subject', label: 'Subject', placeholder: 'Project collaboration / Job offer / Freelance...', type: 'input', icon: FiTerminal,
    validate: v => v.trim().length < 3 ? 'Subject too short' : null,
  },
  {
    key: 'message', label: 'Message', placeholder: 'Tell me about your project, idea, or opportunity...', type: 'textarea', icon: FiMessageSquare,
    validate: v => v.trim().length < 10 ? 'Message must be at least 10 characters' : null,
  },
]

/* ── Social Links ── */
const SOCIALS = [
  { icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/Lahirusampath2000',   color: '#6e76ae' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lahiru-sampath-9a0779373/', color: '#0a66c2' },
  // { icon: FiTwitter,  label: 'Twitter',  href: 'https://twitter.com/lahirusampath',  color: '#1da1f2' },
]

/* ── Animated Terminal Cursor ── */
function TerminalCursor({ color }: { color: string }) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{
      display: 'inline-block', width: 9, height: 17,
      background: on ? color : 'transparent',
      borderRadius: 2, verticalAlign: 'middle', marginLeft: 3,
      transition: 'background 0.1s',
    }} />
  )
}

/* ── Typing Headline ── */
function TypedHeadline({ accent }: { accent: string }) {
  const lines = [
    "Let's build something\namazing together.",
    "Have an idea?\nLet's make it real.",
    "Open to opportunities.\nLet's connect.",
  ]
  const [lineIdx, setLineIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause]       = useState(false)
  const full = lines[lineIdx]

  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1800); return () => clearTimeout(t) }
    if (!deleting && charIdx === full.length) { setPause(true); setDeleting(true); return }
    if (deleting && charIdx === 0) { setDeleting(false); setLineIdx(i => (i + 1) % lines.length); return }
    const speed = deleting ? 28 : 52
    const t = setTimeout(() => setCharIdx(i => i + (deleting ? -1 : 1)), speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, pause, full])

  return (
    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight min-h-[96px]"
      style={{ whiteSpace: 'pre-line' }}>
      {full.slice(0, charIdx).split('\n').map((line, i, arr) => (
        <span key={i}>
          {i === arr.length - 1
            ? <span style={{ color: accent, textShadow: `0 0 20px ${accent}55` }}>{line}</span>
            : line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
      <TerminalCursor color={accent} />
    </h2>
  )
}

/* ── Particle Ring ── */
function ParticleRing({ accent, active }: { accent: string; active: boolean }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  const count = 8
  const t = tick * 0.04

  return (
    <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute', top: -20, right: -20, opacity: active ? 0.7 : 0.3, transition: 'opacity 0.5s' }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = t + (i * Math.PI * 2) / count
        const r = 88 + Math.sin(t * 1.5 + i) * 6
        const x = 110 + Math.cos(angle) * r
        const y = 110 + Math.sin(angle) * r
        const size = 2.5 + Math.sin(t + i) * 1.2
        return <circle key={i} cx={x} cy={y} r={size} fill={accent} opacity={0.5 + Math.sin(t + i) * 0.4} />
      })}
      <circle cx="110" cy="110" r="84" stroke={accent} strokeWidth="1" fill="none" strokeDasharray="6 6" opacity="0.2"
        style={{ transformOrigin: '110px 110px', animation: 'spin 12s linear infinite' }} />
      <circle cx="110" cy="110" r="70" stroke={accent} strokeWidth="0.5" fill="none" strokeDasharray="3 9" opacity="0.15"
        style={{ transformOrigin: '110px 110px', animation: 'spinRev 18s linear infinite' }} />
    </svg>
  )
}

/* ── Copy Email Button ── */
function CopyEmail({ email, nm }: { email: string; nm: ReturnType<typeof useNeumorph> }) {
  const [copied, setCopied] = useState(false)
  const { bg, text2, text3, accent, out, inn, border } = nm
  const copy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300"
      style={{
        background: bg, color: copied ? accent : text2,
        boxShadow: copied ? inn.sm : out.sm,
        border: `1px solid ${copied ? accent + '55' : border}`,
        cursor: 'pointer',
      }}>
      {copied ? <FiCheck style={{ width: 13, height: 13 }} /> : <FiCopy style={{ width: 13, height: 13 }} />}
      {copied ? 'Copied!' : email}
    </button>
  )
}

/* ── Form Field ── */
function FormField({
  field, value, error, focused, onChange, onFocus, onBlur, nm,
}: {
  field: Field; value: string; error: string | null
  focused: boolean; onChange: (v: string) => void
  onFocus: () => void; onBlur: () => void
  nm: ReturnType<typeof useNeumorph>
}) {
  const { isDark, bg, text1, text2, text3, accent, border, out, inn } = nm
  const Icon = field.icon
  const hasVal = value.length > 0
  const baseInput: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none', outline: 'none',
    color: text1, fontFamily: 'inherit', resize: 'none',
    fontSize: '14px', fontWeight: 500, lineHeight: '1.6',
  }

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <div className="flex items-center gap-2">
        <Icon style={{ width: 12, height: 12, color: focused ? accent : text3, transition: 'color 0.3s' }} />
        <label className="text-[10px] font-black tracking-[0.2em] uppercase"
          style={{ color: focused ? accent : text3, transition: 'color 0.3s' }}>
          {field.label}
        </label>
        {error && (
          <span className="ml-auto flex items-center gap-1 text-[9px] font-bold" style={{ color: '#ef4444' }}>
            <FiAlertCircle style={{ width: 10, height: 10 }} />{error}
          </span>
        )}
        {hasVal && !error && (
          <FiCheckCircle style={{ width: 10, height: 10, color: accent, marginLeft: 'auto' }} />
        )}
      </div>

      {/* Input wrapper */}
      <div style={{
        background: bg,
        boxShadow: focused ? inn.md : error ? `${inn.sm}, 0 0 0 1.5px #ef444444` : out.sm,
        border: `1.5px solid ${focused ? accent + '66' : error ? '#ef444433' : border}`,
        borderRadius: 16, padding: field.type === 'textarea' ? '12px 16px' : '0 16px',
        display: 'flex', alignItems: field.type === 'textarea' ? 'flex-start' : 'center',
        gap: 10, minHeight: field.type === 'textarea' ? 120 : 48,
        transition: 'all 0.3s ease',
      }}>
        {field.type === 'input' ? (
          <input
            type={field.key === 'email' ? 'email' : 'text'}
            value={value}
            placeholder={focused ? '' : field.placeholder}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{ ...baseInput, flex: 1 }}
          />
        ) : (
          <textarea
            value={value}
            placeholder={focused ? '' : field.placeholder}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={5}
            style={{ ...baseInput, flex: 1, paddingTop: 4 }}
          />
        )}

        {/* Character count for message */}
        {field.key === 'message' && (
          <div className="flex-shrink-0 self-end mb-1">
            <span className="text-[9px] font-bold" style={{ color: value.length > 500 ? '#ef4444' : text3 }}>
              {value.length}/500
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main Contact Section ── */
export default function Contact() {
  const nm = useNeumorph()
  const { isDark, bg, text1, text2, text3, accent, border, out, inn } = nm

  const [values, setValues]   = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]   = useState<Record<string, string | null>>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [inView, setInView]   = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.08 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const validate = (key: string, val: string) => {
    const field = FIELDS.find(f => f.key === key)
    return field ? field.validate(val) : null
  }

  const handleChange = (key: string, val: string) => {
    setValues(v => ({ ...v, [key]: val }))
    if (touched[key]) setErrors(e => ({ ...e, [key]: validate(key, val) }))
  }

  const handleBlur = (key: string) => {
    setFocused(null)
    setTouched(t => ({ ...t, [key]: true }))
    setErrors(e => ({ ...e, [key]: validate(key, values[key as keyof typeof values]) }))
  }

  const allValid = FIELDS.every(f => !validate(f.key, values[f.key]))

  const handleSubmit = async () => {
    // Touch all fields to show errors
    const newTouched = Object.fromEntries(FIELDS.map(f => [f.key, true]))
    setTouched(newTouched)
    const newErrors = Object.fromEntries(FIELDS.map(f => [f.key, validate(f.key, values[f.key])]))
    setErrors(newErrors)
    if (!allValid) return

    setFormState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Failed')
      setFormState('success')
      setValues({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
    } catch {
      setFormState('error')
    }
  }

  const resetForm = () => { setFormState('idle'); setErrors({}) }

  /* ── Progress indicator ── */
  const filledCount = FIELDS.filter(f => !validate(f.key, values[f.key as keyof typeof values])).length
  const progress = (filledCount / FIELDS.length) * 100

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full"
      style={{ background: bg, paddingTop: '3vh', paddingBottom: '12vh', transition: 'background 0.3s ease' }}
    >
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg);  } }
        @keyframes spinRev { to { transform: rotate(-360deg); } }
        @keyframes sendPop {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        .contact-input::placeholder { color: ${text3}; opacity: 0.55; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div
          className="flex flex-col items-center gap-3 mb-14 mt-3 text-center"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{ background: bg, boxShadow: out.xs, border: `1px solid ${border}` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: text3 }}>Available for Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: text1 }}>
            Get In <span style={{ color: accent, textShadow: '0 0 20px rgba(76,175,114,0.4)' }}>Touch</span>
          </h2>
          <p className="text-sm font-semibold max-w-xs" style={{ color: text3 }}>
            Whether it's a project, job offer, or just a hello — I read every message.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT PANEL ── */}
          <div
            className="lg:col-span-2 flex flex-col gap-6"
            style={{
              opacity: inView ? 1 : 0,
              animation: inView ? 'slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) both' : 'none',
            }}
          >
            {/* Typed headline card */}
            <div
              className="relative rounded-3xl p-7 overflow-hidden"
              style={{ background: bg, boxShadow: inn.lg }}
            >
              {/* Decorative particle ring */}
              <ParticleRing accent={accent} active={focused !== null} />

              <div className="relative z-10">
                <TypedHeadline accent={accent} />
                <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${accent}55, transparent)` }} />
                <p className="mt-4 text-sm font-semibold leading-relaxed" style={{ color: text2 }}>
                  I'm currently open to freelance projects, full-time roles, and exciting collaborations.
                  Response time is usually within <span style={{ color: accent }}>24 hours</span>.
                </p>
              </div>
            </div>

            {/* Contact info card */}
            <div
              className="rounded-3xl p-6"
              style={{ background: bg, boxShadow: out.xl, border: `1px solid ${border}` }}
            >
              <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4" style={{ color: text3 }}>
                Direct Contact
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg, boxShadow: out.sm }}>
                    <FiMail style={{ width: 14, height: 14, color: accent }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: text3 }}>Email</span>
                    <CopyEmail email="phlsampath2000@gmail.com" nm={nm} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg, boxShadow: out.sm }}>
                    <FiTerminal style={{ width: 14, height: 14, color: accent }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: text3 }}>Based In</span>
                    <span className="text-xs font-bold" style={{ color: text2 }}>Sri Lanka 🇱🇰 · Open to Work</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px" style={{ background: `linear-gradient(to right, transparent, ${border}, transparent)` }} />

              {/* Social links */}
              <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3" style={{ color: text3 }}>Find Me Online</p>
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    title={label}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 no-underline"
                    style={{ background: bg, boxShadow: out.sm, border: `1px solid ${border}`, color: text3 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = color
                      e.currentTarget.style.boxShadow = inn.sm
                      e.currentTarget.style.borderColor = color + '55'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = text3
                      e.currentTarget.style.boxShadow = out.sm
                      e.currentTarget.style.borderColor = border
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Icon style={{ width: 17, height: 17 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Response time card */}
            <div
              className="rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{ background: bg, boxShadow: out.md, border: `1px solid ${border}` }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: bg, boxShadow: inn.sm }}>
                  <span style={{ fontSize: 22, animation: 'floatUp 3s ease-in-out infinite' }}>⚡</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-black" style={{ color: text1 }}>Fast Response Guaranteed</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: text3 }}>
                  Avg. reply in <span style={{ color: accent }}>under 12 hours</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Form ── */}
          <div
            className="lg:col-span-3"
            style={{
              opacity: inView ? 1 : 0,
              animation: inView ? 'slideInRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both' : 'none',
            }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: bg, boxShadow: inn.xl }}
            >
              {/* Form header bar */}
              <div
                className="flex items-center gap-3 px-6 py-4 border-b"
                style={{ borderColor: border }}
              >
                <div className="flex gap-1.5">
                  {['#ef4444', '#f59e0b', '#4caf72'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                  style={{ background: bg, boxShadow: out.xs, flex: 1, maxWidth: 280 }}>
                  <FiTerminal style={{ width: 11, height: 11, color: accent }} />
                  <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: text3 }}>
                    contact Form
                  </span>
                </div>
                {/* Progress */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? '#2a2a32' : '#d1d3da' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, background: accent, boxShadow: `0 0 8px ${accent}88` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold" style={{ color: text3 }}>{filledCount}/{FIELDS.length}</span>
                </div>
              </div>

              {/* Form body */}
              <div className="p-6 md:p-8">

                {/* ── SUCCESS STATE ── */}
                {formState === 'success' && (
                  <div
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                    style={{ animation: 'sendPop 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
                  >
                    <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
                      style={{ background: bg, boxShadow: out.xl }}>
                      <div className="absolute inset-0 rounded-3xl" style={{ background: `${accent}18`, animation: 'spin 6s linear infinite' }} />
                      <FiCheckCircle style={{ width: 36, height: 36, color: accent }} />
                    </div>
                    <div>
                      <p className="text-2xl font-black" style={{ color: text1 }}>Message Sent! 🎉</p>
                      <p className="text-sm font-semibold mt-2" style={{ color: text3 }}>
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="px-7 h-[42px] rounded-full text-xs font-black tracking-wide uppercase"
                      style={{ background: bg, color: accent, boxShadow: out.md, border: `1.5px solid ${accent}55`, cursor: 'pointer' }}
                    >
                      Send Another
                    </button>
                  </div>
                )}

                {/* ── ERROR STATE ── */}
                {formState === 'error' && (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <FiAlertCircle style={{ width: 40, height: 40, color: '#ef4444' }} />
                    <div>
                      <p className="text-xl font-black" style={{ color: text1 }}>Something went wrong</p>
                      <p className="text-sm mt-1" style={{ color: text3 }}>Check the console or try again in a moment.</p>
                    </div>
                    <button onClick={resetForm} className="px-6 h-10 rounded-full text-xs font-black tracking-wide uppercase"
                      style={{ background: bg, color: '#ef4444', boxShadow: out.sm, border: '1.5px solid #ef444455', cursor: 'pointer' }}>
                      Try Again
                    </button>
                  </div>
                )}

                {/* ── FORM STATE ── */}
                {(formState === 'idle' || formState === 'typing' || formState === 'sending') && (
                  <div className="flex flex-col gap-5">
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {FIELDS.slice(0, 2).map(field => (
                        <FormField
                          key={field.key} field={field}
                          value={values[field.key]}
                          error={touched[field.key] ? errors[field.key] ?? null : null}
                          focused={focused === field.key}
                          onChange={v => handleChange(field.key, v)}
                          onFocus={() => { setFocused(field.key); setFormState('typing') }}
                          onBlur={() => handleBlur(field.key)}
                          nm={nm}
                        />
                      ))}
                    </div>

                    {/* Subject + Message */}
                    {FIELDS.slice(2).map(field => (
                      <FormField
                        key={field.key} field={field}
                        value={values[field.key]}
                        error={touched[field.key] ? errors[field.key] ?? null : null}
                        focused={focused === field.key}
                        onChange={v => handleChange(field.key, v)}
                        onFocus={() => { setFocused(field.key); setFormState('typing') }}
                        onBlur={() => handleBlur(field.key)}
                        nm={nm}
                      />
                    ))}

                    {/* Submit button */}
                    <button
                      onClick={handleSubmit}
                      disabled={formState === 'sending'}
                      className="w-full h-[52px] rounded-2xl flex items-center justify-center gap-3 text-sm font-black tracking-wide uppercase transition-all duration-300"
                      style={{
                        background: formState === 'sending'
                          ? bg
                          : allValid
                            ? `linear-gradient(135deg, ${accent}, ${accent}cc)`
                            : bg,
                        color: allValid && formState !== 'sending' ? '#fff' : text3,
                        boxShadow: allValid && formState !== 'sending'
                          ? `0 8px 24px ${accent}44, ${out.md}`
                          : inn.sm,
                        border: `1.5px solid ${allValid ? accent + '55' : border}`,
                        cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                        transform: allValid ? 'translateY(0)' : 'none',
                      }}
                      onMouseEnter={e => {
                        if (allValid && formState !== 'sending')
                          e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      {formState === 'sending' ? (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2"
                            style={{ borderColor: `${accent} transparent transparent transparent`, animation: 'spin 0.8s linear infinite' }}
                          />
                          <span style={{ color: accent }}>Sending…</span>
                        </>
                      ) : (
                        <>
                          <FiSend style={{ width: 16, height: 16 }} />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* Disclaimer */}
                    <p className="text-center text-[10px]" style={{ color: text3 }}>
                      🔒 No spam — your data stays between us. Powered by{' '}
                      <span style={{ color: accent }}>Resend</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}