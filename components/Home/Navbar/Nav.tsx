'use client';
import { NavLinks } from '@/constant/constant';
import React, { useEffect, useState } from 'react';
import { BiDownload } from 'react-icons/bi';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { useTheme } from 'next-themes';
import { useNeumorph } from '@/hooks/useNeumorph';

interface Star { x: number; y: number; s: number; d: number }

/* Immersive Theme Toggle */
function ThemeToggle({ isDark, mounted, onToggle }: { isDark: boolean; mounted: boolean; onToggle: () => void }) {
  const [hov, setHov] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 5 }, () => ({
        x: 8 + Math.random() * 52,
        y: 10 + Math.random() * 80,
        s: 0.7 + Math.random() * 0.8,
        d: Math.random() * 1.5,
      }))
    );
  }, []);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      style={{
        width: 62,
        height: 32,
        borderRadius: 99,
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        border: 'none',
        padding: 0,
        transform: hov ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Track */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 99,
          background: isDark
            ? 'linear-gradient(135deg, #0d0d1a 0%, #1a1a35 50%, #0f1629 100%)'
            : 'linear-gradient(135deg, #87ceeb 0%, #4a9ede 40%, #1e6bb8 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Stars */}
      {stars.map((st, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${st.x.toFixed(2)}%`,
            top: `${st.y.toFixed(2)}%`,
            width: st.s * 2,
            height: st.s * 2,
            borderRadius: '50%',
            background: 'white',
            opacity: isDark ? 0.6 + st.s * 0.4 : 0,
            animationName: isDark ? 'twinkle' : 'none',
            animationDuration: `${1.4 + st.d}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${st.d * 0.3}s`,
          }}
                  />
      ))}

      {/* Clouds (Light mode) */}
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 24,
          width: 16,
          height: 5,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.88)',
          opacity: isDark ? 0 : 1,
          transition: 'opacity 0.4s ease',
          filter: 'blur(0.4px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 17,
          left: 30,
          width: 10,
          height: 4,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.68)',
          opacity: isDark ? 0 : 0.8,
          transition: 'opacity 0.4s ease 0.06s',
          filter: 'blur(0.4px)',
        }}
      />

      {/* Knob */}
      <div
        style={{
          position: 'absolute',
          top: 4,
          left: isDark ? 34 : 4,
          width: 24,
          height: 24,
          borderRadius: '50%',
          transition: 'left 0.42s cubic-bezier(0.34,1.56,0.64,1)',
          background: isDark
            ? 'radial-gradient(circle at 38% 36%, #dde0f0, #b8bcd8)'
            : 'radial-gradient(circle at 38% 30%, #fff5a0, #f9ca24 55%, #f0932b)',
          boxShadow: isDark
            ? '2px 2px 5px rgba(0,0,0,0.5), -0.5px -0.5px 2px rgba(255,255,255,0.1)'
            : '0 0 12px rgba(249,202,36,0.95), 0 0 28px rgba(249,202,36,0.45)',
        }}
      >
        {mounted && isDark && (
          <>
            <div style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.13)', top: 5, left: 8 }} />
            <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: 'rgba(0,0,0,0.10)', top: 13, left: 14 }} />
          </>
        )}
      </div>
    </button>
  );
}

/* Logo */
function Logo({ isDark, nm }: { isDark: boolean; nm: ReturnType<typeof useNeumorph> }) {
  const { bg, text1, text2, accent, out } = nm;
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => !t), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: bg,
          boxShadow: out.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${isDark ? 'rgba(76,175,114,0.2)' : 'rgba(255,255,255,0.65)'}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 2,
            borderRadius: '50%',
            border: `1.5px dashed rgba(76,175,114,${isDark ? '0.35' : '0.22'})`,
            animation: 'spinSlow 8s linear infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 900,
            fontSize: 13,
            color: accent,
            textShadow: '0 0 10px rgba(76,175,114,0.6)',
            zIndex: 1,
          }}
        >
          &lt;/&gt;
        </span>
      </div>

      <div className="flex flex-col leading-none">
        <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.01em', color: text1 }}>
          Lahiru<span style={{ color: accent, marginLeft: 3 }}>Sampath</span>
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 9,
            letterSpacing: '0.18em',
            color: text2,
            textTransform: 'uppercase',
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
              animation: 'pulseDot 1.6s ease-in-out infinite',
            }}
          />
          Full Stack Dev
          <span
            style={{
              display: 'inline-block',
              width: 1.5,
              height: 9,
              background: accent,
              marginLeft: 1,
              opacity: tick ? 1 : 0,
            }}
          />
        </span>
      </div>
    </div>
  );
}

/* Main Nav */
const Nav = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const nm = useNeumorph();

  const [mountedNav, setMountedNav] = useState(false);
useEffect(() => { setMountedNav(true); }, []);
const isDark = mountedNav ? resolvedTheme === 'dark' : false;
  const { bg, shDark, shLite, text2, border, accent, out, inn } = nm;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const ids = NavLinks.map((l) => l.url.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { rootMargin: '-40% 0px -50% 0px' }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navBg = scrolled ? bg : isDark ? 'rgba(39,39,46,0.65)' : 'rgba(236,238,243,0.65)';
  const navShadow = scrolled
    ? `8px 8px 20px ${shDark}, -8px -8px 20px ${shLite}`
    : isDark
    ? '0 4px 24px rgba(0,0,0,0.4)'
    : '0 4px 24px rgba(0,0,0,0.1)';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <nav className="fixed top-0 left-0 w-full h-[12vh] z-50 flex items-center">
      <div
        className="relative flex items-center h-[64px] w-[90%] mx-auto px-5 rounded-full"
        style={{
          background: navBg,
          backdropFilter: 'blur(14px)',
          boxShadow: navShadow,
          border: isDark ? `1px solid ${border}` : '1px solid rgba(255,255,255,0.75)',
          transition: 'all 0.4s ease',
        }}
      >
        <Logo isDark={isDark} nm={nm} />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NavLinks.map((link) => {
            const Icon = link.icon;
            const id = link.url.replace('#', '');
            const isActive = activeSection === id;

            return (
              <a
                key={link.id}
                href={link.url}
                className="relative flex items-center gap-1.5 px-4 h-[36px] rounded-full font-semibold text-xs tracking-wider uppercase transition-all"
                style={{
                  background: isActive ? bg : 'transparent',
                  color: isActive ? accent : text2,
                  boxShadow: isActive ? inn.sm : 'none',
                }}
              >
                <Icon style={{ width: 13, height: 13 }} />
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle isDark={isDark} mounted={mountedNav} onToggle={toggleTheme} />
          <a href="/Lahiru_sampath_junior_software_engineer.pdf" download>
            <button
              className="hidden sm:flex items-center gap-2 px-4 h-[36px] rounded-full font-semibold text-xs tracking-wide cursor-pointer"
              style={{ background: bg, color: text2, boxShadow: out.sm, border: `1px solid ${border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accent;
                e.currentTarget.style.boxShadow = inn.sm;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = text2;
                e.currentTarget.style.boxShadow = out.sm;
              }}
            >
              <BiDownload style={{ width: 14, height: 14 }} />
              Download CV
            </button>
          </a>
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: bg, color: text2, boxShadow: out.sm, border: `1px solid ${border}` }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accent; e.currentTarget.style.boxShadow = inn.sm; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = text2; e.currentTarget.style.boxShadow = out.sm; }}
          >
            <HiBars3BottomRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.55); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </nav>
  );
};

export default Nav;