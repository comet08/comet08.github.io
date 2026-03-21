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
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#f0f0f0] transition-colors font-mono mb-12"
        >
          <ArrowLeft size={14} />
          프로젝트 목록
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="font-mono text-xs text-[#737373] mb-3">{project.year}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#f0eee9] mb-4">
            {project.title}
          </h1>
          <p className="text-[#737373] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm border border-[#2a2a2a] text-[#f0f0f0] px-4 py-2 rounded hover:border-[#f0eee9]/40 transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm border border-[#2a2a2a] text-[#f0f0f0] px-4 py-2 rounded hover:border-[#f0eee9]/40 transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="space-y-10 border-t border-[#2a2a2a] pt-10">
          <section>
            <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-4">
              Problem
            </h2>
            <p className="text-[#f0f0f0] leading-relaxed">{project.problem}</p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-4">
              Solution
            </h2>
            <p className="text-[#f0f0f0] leading-relaxed">{project.solution}</p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-4">
              Result
            </h2>
            <p className="text-[#f0eee9] leading-relaxed font-medium">{project.result}</p>
          </section>

          {/* Tech */}
          <section>
            <h2 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-4">
              Tech Stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="text-xs px-3 py-1.5 bg-[#111111] border border-[#2a2a2a] text-[#737373] rounded font-mono"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
