'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TerminalIntro from '@/components/sections/TerminalIntro'
import HeroObject from '@/components/ui/HeroObject'
import Link from 'next/link'
import profile from '@/data/profile.json'

const SEEN_KEY = 'sp_terminal_seen'

function DotGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #B8D4EE 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.5,
      }}
    />
  )
}

function WindowPanel({
  title,
  className = '',
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`border border-[#C0D8F0] bg-white shadow-sm shadow-[#C0D8F0]/40 ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#C0D8F0] bg-[#F4F9FF]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span
          className="ml-2 text-[10px] text-[#A4C0D8]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }))
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      className="text-[11px] text-[#8AAEC8]"
      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
    >
      {time}
    </span>
  )
}

const navCards = [
  {
    num: '01',
    title: 'About Me',
    sub: '경력 · 스킬 · 소개',
    href: '/about',
    filename: 'about.exe',
  },
  {
    num: '02',
    title: 'Projects',
    sub: '설계 · 구현 · 성과',
    href: '/projects',
    filename: 'projects.json',
  },
  {
    num: '03',
    title: 'Desktop',
    sub: '파일 · 에디터 · 탐색',
    href: '/desktop',
    filename: 'desktop.app',
  },
]

export default function Home() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(SEEN_KEY)) {
      setReady(true)
    }
  }, [])

  const handleComplete = () => {
    if (typeof window !== 'undefined') localStorage.setItem(SEEN_KEY, '1')
    setReady(true)
  }

  if (!ready) return <TerminalIntro onComplete={handleComplete} />

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-[#EBF3FD] flex flex-col overflow-hidden"
    >
      <DotGrid />

      {/* Menu bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-[#C0D8F0] bg-white/80 backdrop-blur-sm shrink-0">
        <span
          className="text-[11px] text-[#1677C8] tracking-[0.4em] uppercase font-bold"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          comet.dev
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navCards.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] text-[#8AAEC8] hover:text-[#0D2236] transition-colors tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {l.title}
            </Link>
          ))}
        </nav>


        <Clock />
      </header>

      {/* Desktop */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 md:px-8 py-8 md:py-10">
        <div className="w-full max-w-6xl grid md:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left — text + nav cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] text-[#1677C8] tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Frontend + AI Developer
            </motion.p>

            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,7vw,6.5rem)] font-extrabold text-[#0D2236] leading-[0.88] tracking-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                SEONGHYE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-4 flex-wrap"
              >
                <span
                  className="text-[clamp(3rem,7vw,6.5rem)] font-extrabold text-[#1677C8] leading-[0.88] tracking-tight"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  PARK
                </span>
                <span
                  className="text-[clamp(1.1rem,3vw,1.6rem)] text-[#8AAEC8] leading-none"
                  style={{ fontFamily: 'var(--font-black-han-sans)' }}
                >
                  {profile.name}
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-[#1A3A52]/60 max-w-sm mb-10 leading-relaxed italic"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', wordBreak: 'keep-all' }}
            >
              {profile.bio}
            </motion.p>

            {/* Navigation window cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="grid grid-cols-2 gap-3 max-w-sm w-full"
            >
              {navCards.map((card) => (
                <Link key={card.href} href={card.href} className="group block">
                  <WindowPanel
                    title={card.filename}
                    className="group-hover:border-[#1677C8] group-hover:shadow-[#1677C8]/20 transition-all duration-300"
                  >
                    <div className="p-3">
                      <p
                        className="text-[9px] text-[#1677C8] tracking-[0.3em] uppercase mb-1"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {card.num}
                      </p>
                      <h2
                        className="text-xs font-bold text-[#0D2236] tracking-tight mb-0.5"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {card.title}
                      </h2>
                      <p
                        className="text-[9px] text-[#8AAEC8]"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {card.sub}
                      </p>
                    </div>
                  </WindowPanel>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right — Three.js constellation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="h-[460px] w-full"
          >
            <HeroObject />
          </motion.div>

        </div>
      </div>

      {/* Status bar */}
      <footer className="relative z-10 px-6 py-2.5 border-t border-[#C0D8F0] bg-white/80 flex justify-between items-center shrink-0">
        <p
          className="text-[10px] text-[#A4C0D8]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6899BC] hover:text-[#1677C8] transition-colors tracking-widest uppercase font-medium"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6899BC] hover:text-[#1677C8] transition-colors tracking-widest uppercase font-medium"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            LinkedIn
          </a>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6899BC] hover:text-[#1677C8] transition-colors tracking-widest uppercase font-medium"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Resume
          </a>
        </div>
      </footer>
    </motion.main>
  )
}
