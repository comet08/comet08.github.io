'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import projects from '@/data/projects.json'
import type { Project } from '@/types'

const data = projects as Project[]

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const featured = data.filter((p) => p.featured)

  return (
    <section id="projects" className="py-24 border-t border-[#e0ddd8]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-[#888888] mb-3">04 / projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-16">
          주요 프로젝트
        </h2>

        <div className="space-y-8">
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
            >
              <TiltCard>
                <article className="border border-[#e0ddd8] rounded-lg bg-[#f7f6f3] overflow-hidden">
                  {/* Header */}
                  <div className="px-8 pt-8 pb-6 border-b border-[#e0ddd8]">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-[#0a0a0a]">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0 mt-0.5">
                        {project.isPrivate && (
                          <span className="text-xs font-mono px-2 py-0.5 border border-[#e0ddd8] text-[#888888] rounded">
                            사내 프로젝트
                          </span>
                        )}
                        {project.period && (
                          <span className="text-xs font-mono text-[#888888]">
                            {project.period}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#888888] leading-relaxed mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 bg-white border border-[#e0ddd8] text-[#888888] rounded font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-projects */}
                  {project.subProjects && project.subProjects.length > 0 && (
                    <div className="divide-y divide-[#e0ddd8]">
                      {project.subProjects.map((sub, i) => (
                        <div key={i} className="px-8 py-5 group hover:bg-[#f0eee9] transition-colors">
                          <div className="flex items-start gap-4">
                            <span className="font-mono text-xs text-[#e0ddd8] group-hover:text-[#888888] transition-colors mt-0.5 shrink-0 w-4">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#0a0a0a] mb-1.5">
                                {sub.title}
                              </p>
                              <p className="text-xs text-[#888888] leading-relaxed mb-2">
                                {sub.description}
                              </p>
                              <p className="text-xs text-[#0a0a0a] font-mono">
                                → {sub.result}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
