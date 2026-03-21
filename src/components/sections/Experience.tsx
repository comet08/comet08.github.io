'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import experience from '@/data/experience.json'
import type { Experience as ExperienceType } from '@/types'

const data = experience as ExperienceType[]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-24 border-t border-[#e0ddd8]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-[#888888] mb-3">02 / experience</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-16">
          경력
        </h2>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line — draw on scroll */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-[3px] bg-[#e0ddd8] hidden md:block overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#0a0a0a] origin-top"
              style={{ scaleY }}
            />
          </div>

          <div className="space-y-16">
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
                  <p className="font-mono text-xs text-[#888888] leading-relaxed">
                    {exp.period}
                  </p>
                  {exp.isCurrent && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 border border-[#0a0a0a]/20 text-[#0a0a0a] rounded font-mono">
                      현재
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="md:pl-12 relative">
                  {/* Dot — centered on 3px line (line center=201.5px, col2 left=248px → offset=52.5px) */}
                  <div className="absolute -left-[52.5px] top-[5px] w-3 h-3 rounded-full bg-[#0a0a0a] hidden md:block ring-4 ring-white" />

                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#888888] mb-4">
                    {exp.company} · {exp.location}
                  </p>
                  <p className="text-[#1a1a1a] text-sm mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#888888]">
                        <span className="text-[#0a0a0a] mt-0.5 shrink-0">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <ul className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <li
                        key={t}
                        className="text-xs px-2 py-1 bg-[#f7f6f3] text-[#888888] rounded font-mono"
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
