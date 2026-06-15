import Link from 'next/link'
import { ArrowLeft, ArrowRight, Lock, Newspaper } from 'lucide-react'
import projects from '@/data/projects.json'
import type { Project } from '@/types'

export const metadata = {
  title: '프로젝트 — 박성혜',
  description: '박성혜의 주요 프로젝트 및 기술적 기여.',
}

const data = projects as Project[]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#EBF3FD]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] text-[#8AAEC8] hover:text-[#0D2236] transition-colors mb-10 tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            <ArrowLeft size={12} />
            sp.dev
          </Link>
          <p
            className="text-[10px] text-[#1677C8] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Projects
          </p>
          <h1
            className="text-5xl font-extrabold text-[#0D2236] tracking-tight leading-[0.9]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            주요 프로젝트
          </h1>
        </div>

        {/* Project list */}
        <div className="space-y-0 border-t border-[#C0D8F0]">
          {data.map((project, i) => (
            <article key={project.slug} className="group border-b border-[#C0D8F0] py-10">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 min-w-0">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] text-[#A4C0D8]"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {project.period && (
                      <span
                        className="text-[10px] text-[#8AAEC8]"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {project.period}
                      </span>
                    )}
                    {project.isPrivate && (
                      <span className="inline-flex items-center gap-1 text-[9px] text-[#A4C0D8]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                        <Lock size={9} />
                        private
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className="text-2xl font-bold text-[#0D2236] mb-3 tracking-tight group-hover:text-[#1677C8] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-sm text-[#1A3A52]/60 leading-relaxed mb-5 max-w-xl"
                    style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                  >
                    {project.description}
                  </p>

                  {/* Key highlights (first 2 subProjects) */}
                  {project.subProjects && project.subProjects.length > 0 && (
                    <ul className="space-y-1.5 mb-6">
                      {project.subProjects.slice(0, 2).map((sub, si) => (
                        <li key={si} className="flex items-start gap-2">
                          <span className="text-[#1677C8] text-[10px] mt-0.5 shrink-0" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>→</span>
                          <span className="text-[11px] text-[#1A3A52]/70" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                            <span className="text-[#1A3A52] font-medium">{sub.title}</span>
                            {sub.result && <span className="text-[#6899BC]"> — {sub.result}</span>}
                          </span>
                        </li>
                      ))}
                      {project.subProjects.length > 2 && (
                        <li className="text-[10px] text-[#A4C0D8]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                          +{project.subProjects.length - 2}개 더
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Press */}
                  {project.press && project.press.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.press.map((p, pi) => (
                        <a
                          key={pi}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 border border-[#1677C8]/30 text-[#1677C8] bg-[#1677C8]/5 hover:bg-[#1677C8]/10 transition-colors"
                          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                        >
                          <Newspaper size={9} />
                          {p.source} · {p.date}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-2 py-1 border border-[#C0D8F0] text-[#6899BC] bg-white/60"
                        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="text-[9px] px-2 py-1 text-[#A4C0D8]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                        +{project.tech.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* Detail link */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="shrink-0 flex items-center gap-1.5 text-[10px] text-[#8AAEC8] hover:text-[#1677C8] transition-colors mt-1 group/link"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  <span className="tracking-widest uppercase">자세히</span>
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/about"
            className="text-[10px] text-[#8AAEC8] hover:text-[#0D2236] transition-colors tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            ← About Me
          </Link>
          <Link
            href="/blog"
            className="text-[10px] text-[#8AAEC8] hover:text-[#0D2236] transition-colors tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Blog →
          </Link>
        </div>

      </div>
    </main>
  )
}
