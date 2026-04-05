'use client'

import { motion } from 'framer-motion'
import profile from '@/data/profile.json'
import HeroObject from '@/components/ui/HeroObject'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 overflow-hidden bg-[#F0F6FF]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid md:grid-cols-2 gap-0 items-center">

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[#6899BC] text-[10px] tracking-[0.5em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Frontend + AI Developer
            </motion.p>

            {/* Name — split into two lines */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold text-[#0D2236] leading-[0.9] tracking-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                SEONGHYE
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                  박성혜
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              className="text-base md:text-lg text-[#1A3A52]/60 max-w-md mb-12 leading-relaxed italic"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 300 }}
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-[#1677C8] text-[#F0F6FF] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#0E5FA0] transition-colors"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Projects
              </a>
              <a
                href="/blog"
                className="px-6 py-3 border border-[#C0D8F0] text-[#6899BC] text-[10px] tracking-[0.3em] uppercase hover:border-[#6899BC] hover:text-[#1A3A52] transition-colors"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                Blog
              </a>
            </motion.div>
          </div>

          {/* 3D Constellation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.2 }}
            className="hidden md:flex md:items-center md:justify-center h-[520px]"
          >
            <HeroObject />
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-14 bg-gradient-to-b from-[#1677C8]/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
