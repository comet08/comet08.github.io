'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TerminalIntro from '@/components/sections/TerminalIntro'
import HeroObject from '@/components/ui/HeroObject'
import Link from 'next/link'
import profile from '@/data/profile.json'

const SEEN_KEY = 'sp_terminal_seen'

export default function Home() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(SEEN_KEY)) {
      setReady(true)
    }
  }, [])

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SEEN_KEY, '1')
    }
    setReady(true)
  }

  if (!ready) {
    return <TerminalIntro onComplete={handleComplete} />
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#F0F6FF] flex flex-col"
    >
      {/* Top bar */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-[#C0D8F0] shrink-0">
        <span
          className="text-[11px] text-[#1677C8] tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          sp.
        </span>
        <nav className="flex items-center gap-8">
          {[
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[10px] text-[#6899BC] hover:text-[#0D2236] transition-colors tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content — centered two-column */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[10px] text-[#6899BC] tracking-[0.5em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Frontend + AI Developer
            </motion.p>

            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold text-[#0D2236] leading-[0.9] tracking-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                SEONGHYE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-4 flex-wrap"
              >
                <span
                  className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold text-[#0D2236] leading-[0.9] tracking-tight"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  PARK
                </span>
                <span
                  className="text-[clamp(1rem,2vw,1.5rem)] text-[#1677C8] leading-none"
                  style={{ fontFamily: 'var(--font-black-han-sans)' }}
                >
                  {profile.name}
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm text-[#1A3A52]/60 max-w-sm mb-12 leading-relaxed italic"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 300 }}
            >
              {profile.bio}
            </motion.p>

            {/* Navigation cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.5 }}
              className="grid grid-cols-2 gap-3 max-w-sm"
            >
              <Link
                href="/about"
                className="group p-5 border border-[#C0D8F0] hover:border-[#1677C8] transition-all duration-300 hover:bg-[#E4EFFC]"
              >
                <p
                  className="text-[10px] text-[#6899BC] group-hover:text-[#1677C8] tracking-[0.3em] uppercase mb-2 transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  01
                </p>
                <h2
                  className="text-sm font-bold text-[#0D2236] tracking-tight mb-0.5"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  About Me
                </h2>
                <p
                  className="text-[10px] text-[#6899BC]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  경력 · 스킬 · 프로젝트
                </p>
              </Link>

              <Link
                href="/blog"
                className="group p-5 border border-[#C0D8F0] hover:border-[#1677C8] transition-all duration-300 hover:bg-[#E4EFFC]"
              >
                <p
                  className="text-[10px] text-[#6899BC] group-hover:text-[#1677C8] tracking-[0.3em] uppercase mb-2 transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  02
                </p>
                <h2
                  className="text-sm font-bold text-[#0D2236] tracking-tight mb-0.5"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Blog
                </h2>
                <p
                  className="text-[10px] text-[#6899BC]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  글 · 생각 · 기록
                </p>
              </Link>
            </motion.div>
          </div>

          {/* Three.js constellation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="h-[480px] w-full"
          >
            <HeroObject />
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-5 border-t border-[#C0D8F0] flex justify-between items-center shrink-0">
        <p
          className="text-[10px] text-[#A4C4E4]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#A4C4E4] hover:text-[#0D2236] transition-colors tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#A4C4E4] hover:text-[#0D2236] transition-colors tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </motion.main>
  )
}
