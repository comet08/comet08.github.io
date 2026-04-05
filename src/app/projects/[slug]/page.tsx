import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import projects from '@/data/projects.json'
import type { Project } from '@/types'

const data = projects as Project[]

export function generateStaticParams() {
  return data.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = data.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — 박성혜`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = data.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-[#F0F6FF]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Back */}
        <Link
          href="/about#projects"
          className="inline-flex items-center gap-2 text-[10px] text-[#6899BC] hover:text-[#0D2236] transition-colors mb-16 tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          <ArrowLeft size={12} />
          프로젝트 목록
        </Link>

        {/* Header */}
        <header className="mb-14">
          {project.period && (
            <p
              className="text-[10px] text-[#6899BC] mb-4 tracking-widest"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {project.period}
            </p>
          )}
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#0D2236] mb-5 tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {project.title}
          </h1>
          <p
            className="text-[#1A3A52]/60 leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
          >
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] border border-[#C0D8F0] text-[#1A3A52] px-4 py-2.5 hover:border-[#6899BC] hover:text-[#1677C8] transition-colors tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                <Github size={12} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] border border-[#C0D8F0] text-[#1A3A52] px-4 py-2.5 hover:border-[#6899BC] hover:text-[#1677C8] transition-colors tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Sub-projects */}
        {project.subProjects && project.subProjects.length > 0 && (
          <div className="space-y-0 border-t border-[#C0D8F0]">
            {project.subProjects.map((sub, i) => (
              <div key={i} className="py-8 border-b border-[#C0D8F0] group">
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="text-[10px] text-[#A4C4E4] mt-1 shrink-0 w-6"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2
                    className="text-lg font-bold text-[#0D2236]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {sub.title}
                  </h2>
                </div>
                <div className="pl-10">
                  <p
                    className="text-sm text-[#1A3A52]/60 leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                  >
                    {sub.description}
                  </p>
                  <p
                    className="text-[11px] text-[#1677C8]/70"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    → {sub.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-12">
          <h3
            className="text-[10px] text-[#6899BC] uppercase tracking-[0.4em] mb-5"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Tech Stack
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="text-[10px] px-3 py-1.5 border border-[#C0D8F0] text-[#6899BC]"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
