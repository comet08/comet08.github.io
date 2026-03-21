'use client'

import { motion } from 'framer-motion'
import skills from '@/data/skills.json'
import { Monitor, Brain, Layers, Wrench } from 'lucide-react'
import type { SkillCategory, SkillLevel } from '@/types'

const data = skills as SkillCategory[]

const ICONS: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={16} />,
  Brain:   <Brain size={16} />,
  Layers:  <Layers size={16} />,
  Wrench:  <Wrench size={16} />,
}

const LEVEL_LABEL: Record<SkillLevel, string> = {
  expert:     'expert',
  proficient: 'proficient',
  learning:   'learning',
}

const LEVEL_DOT: Record<SkillLevel, string> = {
  expert:     'bg-[#0a0a0a]',
  proficient: 'bg-[#888888]',
  learning:   'bg-[#e0ddd8]',
}

const LEVEL_TEXT: Record<SkillLevel, string> = {
  expert:     'text-[#0a0a0a]',
  proficient: 'text-[#1a1a1a]',
  learning:   'text-[#888888]',
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-[#e0ddd8]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-[#888888] mb-3">03 / skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-16">
          기술 스택
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="border border-[#e0ddd8] rounded-lg p-6 bg-[#f7f6f3] cursor-default"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#888888]">
                  {ICONS[cat.icon] ?? null}
                </span>
                <h3 className="text-sm font-semibold text-[#0a0a0a]">
                  {cat.category}
                </h3>
              </div>
              <p className="text-xs text-[#888888] mb-6">{cat.description}</p>

              {/* Skills list */}
              <ul className="space-y-3">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="group flex items-center justify-between">
                    <span className={`text-sm ${LEVEL_TEXT[skill.level]}`}>
                      {skill.name}
                    </span>
                    <span className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_DOT[skill.level]}`} />
                      <span className="text-xs font-mono text-[#888888]">
                        {LEVEL_LABEL[skill.level]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
