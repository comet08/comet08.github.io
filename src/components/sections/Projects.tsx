'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import projects from '@/data/projects.json'
import type { Project } from '@/types'

const data = projects as Project[]

export default function Projects() {
  const featured = data.filter((p) => p.featured)
  const [expanded, setExpanded] = useState<string | null>(featured[0]?.slug ?? null)

  return (
    <section id="projects" className="py-32 border-t border-[#C0D8F0] relative overflow-hidden">
      {/* Decorative number */}
      <div
        aria-hidden
        className="absolute -right-8 top-4 text-[22vw] font-extrabold text-[#0D2236]/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        04
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
          04 / Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl font-extrabold text-[#0D2236] mb-20 tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          주요 프로젝트
        </motion.h2>

        <div>
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
              className="border-t border-[#C0D8F0]"
            >
              {/* Project row */}
              <button
                className="w-full py-10 flex items-start justify-between gap-6 text-left group"
                onClick={() => setExpanded(expanded === project.slug ? null : project.slug)}
              >
                <div className="flex items-start gap-8 flex-1 min-w-0">
                  <span
                    className="text-[10px] text-[#A4C4E4] mt-3 shrink-0 w-6"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-2xl md:text-3xl font-bold text-[#0D2236] group-hover:text-[#1677C8] transition-colors duration-300 mb-3 tracking-tight"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm text-[#1A3A52]/55 leading-relaxed max-w-2xl mb-4"
                      style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {project.tech.slice(0, 7).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2.5 py-1 border border-[#C0D8F0] text-[#6899BC]"
                          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.isPrivate && (
                        <span
                          className="text-[10px] px-2.5 py-1 border border-[#1677C8]/15 text-[#1677C8]/50"
                          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                          private
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-3 text-[#6899BC] transition-all duration-300 shrink-0 ${
                    expanded === project.slug ? 'rotate-180 text-[#1677C8]' : ''
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Expanded sub-projects */}
              <AnimatePresence>
                {expanded === project.slug && project.subProjects && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-14 space-y-0">
                      {project.subProjects.map((sub, i) => (
                        <div
                          key={i}
                          className="grid md:grid-cols-[1fr_auto] gap-6 items-start border-l border-[#1677C8]/15 pl-6 py-5 hover:border-[#1677C8]/40 transition-colors group/sub"
                        >
                          <div>
                            <p
                              className="text-sm font-bold text-[#1A3A52] mb-2 group-hover/sub:text-[#0D2236] transition-colors"
                              style={{ fontFamily: 'var(--font-syne)' }}
                            >
                              {sub.title}
                            </p>
                            <p
                              className="text-sm text-[#1A3A52]/50 leading-relaxed"
                              style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                            >
                              {sub.description}
                            </p>
                          </div>
                          <p
                            className="text-[11px] text-[#1677C8]/70 whitespace-nowrap mt-1 group-hover/sub:text-[#1677C8] transition-colors"
                            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                          >
                            → {sub.result}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-[#C0D8F0]" />
        </div>
      </div>
    </section>
  )
}
