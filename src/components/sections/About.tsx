'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import profile from '@/data/profile.json'

export default function About() {
  const [lightbox, setLightbox] = useState(false)

  return (
    <section id="about" className="py-32 border-t border-[#C0D8F0] relative overflow-hidden">
      {/* Decorative section number */}
      <div
        aria-hidden
        className="absolute -right-8 top-4 text-[22vw] font-extrabold text-[#0D2236]/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        01
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#6899BC] text-[10px] tracking-[0.5em] uppercase mb-16"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          01 / About
        </motion.p>

        <div className="grid md:grid-cols-[260px_1fr] gap-16 items-start">
          {/* Left — profile image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start gap-5"
          >
            <button
              onClick={() => setLightbox(true)}
              className="w-56 h-56 rounded-full overflow-hidden border-2 border-[#C0D8F0] hover:border-[#1677C8] transition-colors cursor-zoom-in block"
            >
              <Image src="/profile.JPG" alt="박성혜" width={224} height={224} className="object-cover w-full h-full" />
            </button>
            <div>
              <p className="text-sm font-bold text-[#0D2236]" style={{ fontFamily: 'var(--font-syne)' }}>{profile.nameEn}</p>
              <p className="text-[11px] text-[#6899BC] mt-0.5" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>{profile.title}</p>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-zoom-out"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20"
                >
                  <Image src="/profile.JPG" alt="박성혜" width={384} height={384} className="object-cover w-full h-full" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right — bio text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 pt-1"
          >
            <p
              className="text-lg md:text-xl leading-relaxed text-[#0D2236]"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 300, wordBreak: 'keep-all' }}
            >
              {profile.bioDetail}
            </p>
            <p
              className="text-sm text-[#1A3A52]/60 leading-relaxed"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', wordBreak: 'keep-all' }}
            >
              {profile.bio}
            </p>

            <div>
              <h3
                className="text-[#1677C8] text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                관심 분야
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profile.interests.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] px-3 py-1.5 border border-[#C0D8F0] text-[#6899BC] hover:border-[#6899BC] hover:text-[#0D2236] transition-all duration-200"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
