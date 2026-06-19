'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useDragControls, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FileText, Braces, Briefcase, Layers, Mail, X, ChevronLeft, User } from 'lucide-react'
import Image from 'next/image'
import profile from '@/data/profile.json'
import skillsData from '@/data/skills.json'
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'

// ─── Types ─────────────────────────────────────────────────────────────────────

type WindowId = 'readme' | 'skills' | 'experience' | 'projects' | 'contact' | 'photo'

interface WindowInstance {
  id: WindowId
  zIndex: number
}

// ─── Background ────────────────────────────────────────────────────────────────

function DotGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #9BBFE0 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.35,
      }}
    />
  )
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }))
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="text-[11px] text-[#6899BC]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
      {time}
    </span>
  )
}

// ─── Syntax tokens (VS Code Light) ────────────────────────────────────────────

const K  = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#0070C1' }}>{children}</span>
const Sv = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#A31515' }}>{children}</span>
const Cm = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#267F26' }}>{children}</span>
const Ac = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#1677C8' }}>{children}</span>
const Mu = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#6899BC' }}>{children}</span>
const Pn = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#767676' }}>{children}</span>
const Wh = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#1A3A52' }}>{children}</span>

// ─── Editor line ───────────────────────────────────────────────────────────────

function Line({ n, indent = 0, children }: { n: number; indent?: number; children?: React.ReactNode }) {
  return (
    <div className="flex hover:bg-[#EBF5FF] group">
      <span
        className="select-none w-10 text-right pr-4 shrink-0 transition-colors text-[#AACDE8] group-hover:text-[#6899BC]"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', lineHeight: '22px' }}
      >
        {n}
      </span>
      <span
        className="flex-1 min-w-0"
        style={{
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: '12px',
          lineHeight: '22px',
          paddingLeft: indent * 14,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {children ?? '\u00A0'}
      </span>
    </div>
  )
}

// ─── Content renderers ─────────────────────────────────────────────────────────

function ReadmeContent() {
  const rows: React.ReactNode[] = []
  let n = 1
  const l = (indent: number, content: React.ReactNode) => { rows.push(<Line key={n} n={n} indent={indent}>{content}</Line>); n++ }
  const blank = () => { rows.push(<Line key={n} n={n} />); n++ }

  l(0, <><Ac># 박성혜 (Seonghye Park)</Ac></>)
  l(0, <><Mu>## Frontend + AI Developer</Mu></>)
  blank()
  l(0, <><Pn>&gt; </Pn><Sv>"{profile.bio}"</Sv></>)
  blank()
  l(0, <><Cm>{'<!-- about -->'}</Cm></>)
  l(0, <Wh>{profile.bioDetail}</Wh>)
  blank()
  l(0, <><Ac>## Interests</Ac></>)
  profile.interests.forEach((i) => l(0, <><Pn>- </Pn><Sv>{i}</Sv></>))
  blank()
  l(0, <><Ac>## Stats</Ac></>)
  l(0, <><Pn>- </Pn><K>projects shipped</K><Pn>: </Pn><Sv>{profile.stats.projectsShipped}</Sv></>)
  l(0, <><Pn>- </Pn><K>open source contributions</K><Pn>: </Pn><Sv>{profile.stats.openSourceContributions}</Sv></>)
  blank()
  l(0, <><Ac>## Location</Ac></>)
  l(0, <><Pn>- </Pn><Sv>{profile.location}</Sv></>)

  return <>{rows}</>
}

function SkillsContent() {
  const rows: React.ReactNode[] = []
  let n = 1
  const l = (indent: number, content: React.ReactNode) => { rows.push(<Line key={n} n={n} indent={indent}>{content}</Line>); n++ }
  const blank = () => { rows.push(<Line key={n} n={n} />); n++ }

  l(0, <><Pn>{'{'}</Pn></>)
  skillsData.forEach((cat, ci) => {
    l(1, <><Cm>{`// ${cat.description}`}</Cm></>)
    l(1, <><K>"{cat.category}"</K><Pn>: [</Pn></>)
    cat.skills.forEach((skill, si) => {
      const isLast = si === cat.skills.length - 1
      const lc = skill.level === 'expert' ? '#0070C1' : skill.level === 'proficient' ? '#1677C8' : '#6899BC'
      l(2, <><Pn>{'{ '}</Pn><K>"name"</K><Pn>: </Pn><Sv>"{skill.name}"</Sv><Pn>, </Pn><K>"level"</K><Pn>: </Pn><span style={{ color: lc }}>"{skill.level}"</span><Pn>{isLast ? ' }' : ' },'}</Pn></>)
    })
    l(1, <><Pn>{ci < skillsData.length - 1 ? '],' : ']'}</Pn></>)
    if (ci < skillsData.length - 1) blank()
  })
  l(0, <><Pn>{'}'}</Pn></>)

  return <>{rows}</>
}

function ExperienceContent() {
  const rows: React.ReactNode[] = []
  let n = 1
  const l = (indent: number, content: React.ReactNode) => { rows.push(<Line key={n} n={n} indent={indent}>{content}</Line>); n++ }
  const blank = () => { rows.push(<Line key={n} n={n} />); n++ }

  experienceData.forEach((job, i) => {
    l(0, <><Ac># {job.company} — {job.role}</Ac></>)
    l(0, <><Mu>## {job.team} · {job.period}</Mu></>)
    blank()
    l(0, <><Pn>&gt; </Pn><Sv>{job.description}</Sv></>)
    blank()
    job.highlights.forEach((h) => l(0, <><Pn>- </Pn><Wh>{h}</Wh></>))
    blank()
    l(0, <><Cm>{`// tech: ${job.tech.join(', ')}`}</Cm></>)
    if (i < experienceData.length - 1) { blank(); l(0, <><Mu>{'─'.repeat(48)}</Mu></>); blank() }
  })

  return <>{rows}</>
}

function ProjectsContent() {
  const rows: React.ReactNode[] = []
  let n = 1
  const l = (indent: number, content: React.ReactNode) => { rows.push(<Line key={n} n={n} indent={indent}>{content}</Line>); n++ }
  const blank = () => { rows.push(<Line key={n} n={n} />); n++ }

  l(0, <><Pn>[</Pn></>)
  projectsData.forEach((proj, pi) => {
    l(1, <><Pn>{'{'}</Pn></>)
    l(2, <><K>"title"</K><Pn>: </Pn><Ac>"{proj.title}"</Ac><Pn>,</Pn></>)
    l(2, <><K>"period"</K><Pn>: </Pn><Sv>"{proj.period}"</Sv><Pn>,</Pn></>)
    l(2, <><K>"description"</K><Pn>: </Pn><Wh>"{proj.description}"</Wh><Pn>,</Pn></>)
    blank()
    l(2, <><K>"tech"</K><Pn>: [</Pn>{proj.tech.map((t, ti) => <span key={ti}><Sv>"{t}"</Sv>{ti < proj.tech.length - 1 && <Pn>, </Pn>}</span>)}<Pn>],</Pn></>)
    if (proj.subProjects?.length) {
      blank()
      l(2, <><Cm>// sub-projects:</Cm></>)
      proj.subProjects.forEach((sp) => {
        l(2, <><Pn>// </Pn><K>{sp.title}</K></>)
        l(2, <><Pn>// </Pn><Cm>→ {sp.result}</Cm></>)
      })
    }
    blank()
    l(1, <><Pn>{pi < projectsData.length - 1 ? '},' : '}'}</Pn></>)
  })
  l(0, <><Pn>]</Pn></>)

  return <>{rows}</>
}

function ContactContent() {
  const rows: React.ReactNode[] = []
  let n = 1
  const l = (indent: number, content: React.ReactNode) => { rows.push(<Line key={n} n={n} indent={indent}>{content}</Line>); n++ }
  const blank = () => { rows.push(<Line key={n} n={n} />); n++ }

  l(0, <><Pn>{'{'}</Pn></>)
  l(1, <><K>"email"</K><Pn>: </Pn><Sv>"{profile.email}"</Sv><Pn>,</Pn></>)
  l(1, <><K>"github"</K><Pn>: </Pn><Sv>"{profile.social.github}"</Sv><Pn>,</Pn></>)
  l(1, <><K>"linkedin"</K><Pn>: </Pn><Sv>"{profile.social.linkedin}"</Sv><Pn>,</Pn></>)
  l(1, <><K>"resume"</K><Pn>: </Pn><Sv>"{profile.resume}"</Sv><Pn>,</Pn></>)
  blank()
  l(1, <><Cm>// Prefer async comms. Response within 1–2 days.</Cm></>)
  l(0, <><Pn>{'}'}</Pn></>)

  return <>{rows}</>
}

// ─── Window config ─────────────────────────────────────────────────────────────

const WIN_CFG: Record<
  WindowId,
  { filename: string; Icon: React.FC<{ size?: number; className?: string }>; width: number; height: number; initialPos: { x: number; y: number } }
> = {
  photo:      { filename: 'profile.jpg',   Icon: User,     width: 320, height: 380, initialPos: { x: 120, y: 60  } },
  readme:     { filename: 'README.md',     Icon: FileText, width: 560, height: 420, initialPos: { x: 180, y: 70  } },
  skills:     { filename: 'skills.json',   Icon: Braces,   width: 580, height: 440, initialPos: { x: 210, y: 95  } },
  experience: { filename: 'experience.md', Icon: Briefcase,width: 660, height: 500, initialPos: { x: 200, y: 80  } },
  projects:   { filename: 'projects.json', Icon: Layers,   width: 680, height: 500, initialPos: { x: 230, y: 90  } },
  contact:    { filename: 'contact.json',  Icon: Mail,     width: 460, height: 320, initialPos: { x: 260, y: 105 } },
}

function PhotoContent() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F4F9FF]">
      <Image src="/profile.JPG" alt="박성혜" width={320} height={380} className="object-cover w-full h-full" />
    </div>
  )
}

function EditorContent({ id }: { id: WindowId }) {
  switch (id) {
    case 'photo':      return <PhotoContent />
    case 'readme':     return <ReadmeContent />
    case 'skills':     return <SkillsContent />
    case 'experience': return <ExperienceContent />
    case 'projects':   return <ProjectsContent />
    case 'contact':    return <ContactContent />
  }
}

// ─── Editor window ─────────────────────────────────────────────────────────────

function EditorWindow({ id, zIndex, onClose, onFocus }: { id: WindowId; zIndex: number; onClose: (id: WindowId) => void; onFocus: (id: WindowId) => void }) {
  const cfg = WIN_CFG[id]
  const dragControls = useDragControls()
  const Icon = cfg.Icon
  const [size, setSize] = useState({ width: cfg.width, height: cfg.height })
  const sizeRef = useRef(size)
  sizeRef.current = size

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startW = sizeRef.current.width
    const startH = sizeRef.current.height
    const onMove = (ev: PointerEvent) => {
      setSize({
        width: Math.max(280, startW + ev.clientX - startX),
        height: Math.max(200, startH + ev.clientY - startY),
      })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      className="absolute"
      style={{
        left: cfg.initialPos.x,
        top: cfg.initialPos.y,
        width: size.width,
        zIndex,
        filter: 'drop-shadow(0 8px 24px rgba(22,119,200,0.18)) drop-shadow(0 2px 4px rgba(22,119,200,0.10))',
      }}
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.18 }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2.5 border border-b-0 border-[#B8D4EC] bg-[#D4E8F8] cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <button onClick={(e) => { e.stopPropagation(); onClose(id) }} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF3B30] transition-colors border border-[#D94F47] shrink-0" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#D9A025] shrink-0" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#22A835] shrink-0" />
        <div className="flex-1 flex items-center justify-center gap-1.5 pointer-events-none">
          <Icon size={11} className="text-[#6899BC]" />
          <span className="text-[11px] text-[#4A7A9E]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {cfg.filename}
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-x border-[#B8D4EC] bg-[#E4F0FA]">
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#B8D4EC] bg-white border-b-2 border-b-[#1677C8]">
          <Icon size={10} className="text-[#1677C8]" />
          <span className="text-[11px] text-[#1A3A52]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            {cfg.filename}
          </span>
          <button onClick={(e) => { e.stopPropagation(); onClose(id) }} className="ml-1 text-[#8AAEC8] hover:text-[#1A3A52] transition-colors">
            <X size={9} />
          </button>
        </div>
        <div className="flex-1 bg-[#D4E8F8]/60" />
      </div>

      {/* Editor body */}
      <div className="border border-t-0 border-[#B8D4EC] bg-white overflow-y-auto relative" style={{ height: size.height }}>
        <div className="py-2 h-full">
          <EditorContent id={id} />
        </div>
        {/* Resize handle */}
        <div
          onPointerDown={onResizePointerDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{ zIndex: 1 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#C0D8F0]">
            <path d="M14 14L8 14M14 14L14 8M14 14L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Desktop icon ──────────────────────────────────────────────────────────────

function DesktopIcon({ id, isOpen, onClick }: { id: WindowId; isOpen: boolean; onClick: (id: WindowId) => void }) {
  const { Icon, filename } = WIN_CFG[id]

  return (
    <button onClick={() => onClick(id)} className="flex flex-col items-center gap-1.5 p-1.5 group focus:outline-none">
      <div className={`w-[52px] h-[52px] flex items-center justify-center border transition-all duration-150 ${
        isOpen
          ? 'border-[#1677C8] bg-[#EBF3FD]'
          : 'border-[#C0D8F0] bg-white group-hover:border-[#7AB3DC] group-hover:bg-[#F0F7FF]'
      }`}>
        <Icon size={20} className={isOpen ? 'text-[#1677C8]' : 'text-[#6899BC] group-hover:text-[#1677C8] transition-colors'} />
      </div>
      <span
        className={`text-[9px] text-center leading-tight max-w-[64px] break-all transition-colors ${isOpen ? 'text-[#1677C8]' : 'text-[#6899BC] group-hover:text-[#1A3A52]'}`}
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        {filename}
      </span>
    </button>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DesktopPage() {
  const [windows, setWindows] = useState<WindowInstance[]>([{ id: 'photo', zIndex: 100 }])
  const topZRef = useRef(100)

  const openWindow = (id: WindowId) => {
    topZRef.current += 1
    const newZ = topZRef.current
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id)
      if (exists) return prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      return [...prev, { id, zIndex: newZ }]
    })
  }

  const closeWindow = (id: WindowId) => setWindows((prev) => prev.filter((w) => w.id !== id))

  const bringToFront = (id: WindowId) => {
    topZRef.current += 1
    const newZ = topZRef.current
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w)))
  }

  const openIds = new Set(windows.map((w) => w.id))

  return (
    <div className="relative min-h-screen bg-[#EBF3FD] flex flex-col" style={{ overflow: 'hidden' }}>
      <DotGrid />

      {/* Menu bar */}
      <header className="relative flex items-center justify-between px-6 py-3 border-b border-[#C0D8F0] bg-white/90 backdrop-blur-sm shrink-0" style={{ zIndex: 9999 }}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-[11px] text-[#6899BC] hover:text-[#0D2236] transition-colors" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            <ChevronLeft size={12} />
            sp.dev
          </Link>
          <span className="text-[#C0D8F0] text-xs select-none">|</span>
          <span className="text-[11px] text-[#1677C8] tracking-widest uppercase" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            desktop
          </span>
        </div>
        <nav className="flex gap-8">
          <Link href="/about" className="text-[11px] text-[#6899BC] hover:text-[#0D2236] transition-colors tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>About</Link>
          <Link href="/blog" className="text-[11px] text-[#6899BC] hover:text-[#0D2236] transition-colors tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>Blog</Link>
        </nav>
        <Clock />
      </header>

      {/* Desktop area */}
      <div className="relative flex-1">

        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          <div
            className="absolute right-[-1%] top-[6%] text-[clamp(5rem,13vw,13rem)] font-extrabold leading-[0.88] tracking-tight text-[#1677C8] select-none"
            style={{ fontFamily: 'var(--font-syne)', opacity: 0.07 }}
          >
            SEONGHYE<br />PARK
          </div>

          {profile.interests.map((interest, i) => (
            <div
              key={i}
              className="absolute text-[9px] text-[#6899BC] border border-[#C0D8F0] bg-white/70 px-2 py-0.5 select-none"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)', left: `${18 + i * 14}%`, top: `${68 + (i % 3) * 9}%` }}
            >
              {interest}
            </div>
          ))}

          <div className="absolute bottom-10 right-8 text-right select-none" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
            <div className="text-[9px] text-[#8AAEC8]">{profile.stats.projectsShipped} projects shipped</div>
            <div className="text-[9px] text-[#8AAEC8]">{profile.stats.openSourceContributions} open source</div>
          </div>

          {windows.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute text-[10px] text-[#6899BC] select-none"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)', left: 'calc(80px + 1.5rem)', top: '1.75rem' }}
            >
              ← click an icon to open
            </motion.div>
          )}
        </div>

        {/* Icons */}
        <div className="absolute left-4 top-4 flex flex-col gap-1" style={{ zIndex: 10 }}>
          {(Object.keys(WIN_CFG) as WindowId[]).map((id) => (
            <DesktopIcon key={id} id={id} isOpen={openIds.has(id)} onClick={openWindow} />
          ))}
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map((win) => (
            <EditorWindow key={win.id} id={win.id} zIndex={win.zIndex} onClose={closeWindow} onFocus={bringToFront} />
          ))}
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <footer className="relative flex items-center justify-between px-6 py-2 border-t border-[#C0D8F0] bg-white/90 shrink-0" style={{ zIndex: 9999 }}>
        <span className="text-[10px] text-[#8AAEC8]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          {windows.length > 0 ? `${windows.length} file${windows.length > 1 ? 's' : ''} open` : '\u00A0'}
        </span>
        <span className="text-[10px] text-[#1677C8]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
          ● {profile.title}
        </span>
      </footer>
    </div>
  )
}
