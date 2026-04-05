'use client'

import { motion } from 'framer-motion'
import skills from '@/data/skills.json'
import { Monitor, Brain, Layers, Wrench } from 'lucide-react'
import type { SkillCategory, SkillLevel } from '@/types'

const data = skills as SkillCategory[]

const ICONS: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={13} />,
  Brain:   <Brain size={13} />,
  Layers:  <Layers size={13} />,
  Wrench:  <Wrench size={13} />,
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 border-t border-[#C0D8F0] relative overflow-hidden">
      {/* Decorative number */}
      <div
        aria-hidden
        className="absolute -right-8 top-4 text-[22vw] font-extrabold text-[#0D2236]/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        03
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
          03 / Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl font-extrabold text-[#0D2236] mb-20 tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          기술 스택
        </motion.h2>

        <div className="space-y-0">
          {data.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.08 }}
              className="grid md:grid-cols-[260px_1fr] gap-8 border-t border-[#C0D8F0] py-8 items-start"
            >
              {/* Category label */}
              <div className="flex items-start gap-3 pt-1">
                <span className="text-[#1677C8] mt-0.5 shrink-0">
                  {ICONS[cat.icon] ?? null}
                </span>
                <div>
                  <h3
                    className="text-sm font-bold text-[#0D2236] mb-1 tracking-wide"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {cat.category}
                  </h3>
                  <p
                    className="text-[10px] text-[#6899BC] leading-relaxed"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skills inline */}
              <ul className="flex flex-wrap gap-2 items-center">
                {cat.skills.map((skill) => {
                  const isExpert = (skill.level as SkillLevel) === 'expert'
                  const isLearning = (skill.level as SkillLevel) === 'learning'
                  return (
                    <li
                      key={skill.name}
                      className={`group flex items-center gap-1.5 px-3 py-2 border transition-all duration-200 ${
                        isExpert
                          ? 'border-[#1677C8]/25 text-[#1A3A52] hover:border-[#1677C8]/60 hover:bg-[#1677C8]/5'
                          : isLearning
                          ? 'border-[#C0D8F0] text-[#A4C4E4] hover:border-[#A4C4E4] hover:text-[#6899BC]'
                          : 'border-[#C0D8F0] text-[#1A3A52]/60 hover:border-[#A4C4E4]'
                      }`}
                    >
                      {isExpert && (
                        <span className="w-1 h-1 rounded-full bg-[#1677C8] shrink-0" />
                      )}
                      <span
                        className="text-[11px]"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {skill.name}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
          <div className="border-t border-[#C0D8F0]" />
        </div>
      </div>
    </section>
  )
}
