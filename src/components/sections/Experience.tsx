'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import experience from '@/data/experience.json'
import type { Experience as ExperienceType } from '@/types'

const data = experience as unknown as ExperienceType[]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-32 border-t border-[#C0D8F0] relative overflow-hidden">
      {/* Decorative number */}
      <div
        aria-hidden
        className="absolute -right-8 top-4 text-[22vw] font-extrabold text-[#0D2236]/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        02
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#6899BC] text-[10px] tracking-[0.5em] uppercase mb-16"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          02 / Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl font-extrabold text-[#0D2236] mb-20 tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          경력
        </motion.h2>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-[#C0D8F0] hidden md:block overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#1677C8] origin-top"
              style={{ scaleY }}
            />
          </div>

          <div className="space-y-20">
            {data.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
                className="md:grid md:grid-cols-[200px_1fr] gap-12"
              >
                {/* Period */}
                <div className="md:text-right mb-4 md:mb-0 md:pr-12">
                  <p
                    className="text-[11px] text-[#6899BC] leading-relaxed"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {exp.period}
                  </p>
                  {exp.isCurrent && (
                    <span
                      className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-[#1677C8]/10 border border-[#1677C8]/30 text-[#1677C8] tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      current
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="md:pl-12 relative">
                  {/* Dot on line */}
                  <div
                    className={`absolute -left-[52px] top-[6px] w-2 h-2 hidden md:block ring-4 ring-[#F0F6FF] ${
                      exp.isCurrent ? 'bg-[#1677C8]' : 'bg-[#A4C4E4]'
                    }`}
                  />

                  <div className="mb-5">
                    <h3
                      className="text-xl md:text-2xl font-bold text-[#0D2236] mb-1 tracking-tight"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      className="text-[11px] text-[#6899BC]"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {exp.company} · {exp.location}
                    </p>
                  </div>

                  <p
                    className="text-sm text-[#1A3A52]/60 mb-6 leading-relaxed"
                    style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                  >
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-6">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-[#1A3A52]/55"
                        style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                      >
                        <span
                          className="text-[#1677C8] mt-0.5 shrink-0"
                          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                          —
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {exp.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 border border-[#1677C8]/30 text-[#1677C8] bg-[#1677C8]/5 hover:bg-[#1677C8]/10 transition-colors tracking-widest uppercase"
                          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                          ↗ {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  <ul className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <li
                        key={t}
                        className="text-[10px] px-2.5 py-1 border border-[#C0D8F0] text-[#6899BC] hover:border-[#6899BC] hover:text-[#1A3A52]/60 transition-colors"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
