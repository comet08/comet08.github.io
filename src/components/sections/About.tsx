'use client'

import { motion } from 'framer-motion'
import profile from '@/data/profile.json'

export default function About() {
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

        <div className="grid md:grid-cols-[1fr_300px] gap-16 items-start">
          {/* Bio — large editorial serif quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <blockquote
              className="text-xl md:text-2xl leading-relaxed text-[#0D2236] italic mb-10 border-l-2 border-[#1677C8] pl-8"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 300 }}
            >
              &ldquo;{profile.bioDetail}&rdquo;
            </blockquote>
            <p
              className="text-base text-[#1A3A52]/60 leading-relaxed"
              style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
            >
              {profile.bio}
            </p>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="space-y-10 pt-1"
          >
            <div>
              <h3
                className="text-[#1677C8] text-[10px] tracking-[0.4em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                현재 집중
              </h3>
              <p
                className="text-[#1A3A52]/70 text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
              >
                변화 속에서 제품의 가치를 찾고, 지속 가능한 구조 위에 사용자 경험을 쌓는 것
              </p>
            </div>

            <div>
              <h3
                className="text-[#1677C8] text-[10px] tracking-[0.4em] uppercase mb-5"
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
