'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, FileText, Folder, FolderOpen, Search, X } from 'lucide-react'
import Link from 'next/link'
import posts from '@/data/posts.json'

interface Post {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

const allPosts = posts as Post[]

// Group by category
const grouped = allPosts.reduce<Record<string, Post[]>>((acc, post) => {
  if (!acc[post.category]) acc[post.category] = []
  acc[post.category].push(post)
  return acc
}, {})

export default function BlogPage() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
    Object.keys(grouped).reduce((a, k) => ({ ...a, [k]: true }), {})
  )
  const [active, setActive] = useState<Post>(allPosts[0])
  const [query, setQuery] = useState('')

  const toggleFolder = (cat: string) =>
    setOpenFolders((prev) => ({ ...prev, [cat]: !prev[cat] }))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return grouped
    const result: Record<string, Post[]> = {}
    for (const [cat, posts] of Object.entries(grouped)) {
      const match = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      )
      if (match.length) result[cat] = match
    }
    return result
  }, [query])

  return (
    <div className="min-h-screen bg-[#F0F6FF] flex flex-col">
      {/* IDE title bar */}
      <div className="h-10 bg-[#D8E9F9] border-b border-[#C0D8F0] flex items-center px-4 gap-4 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#C0D8F0]" />
          <div className="w-3 h-3 rounded-full bg-[#C0D8F0]" />
          <div className="w-3 h-3 rounded-full bg-[#1677C8]/40" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span
            className="text-[11px] text-[#6899BC]"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            blog — sp.dev
          </span>
        </div>
        <Link
          href="/"
          className="text-[10px] text-[#6899BC] hover:text-[#0D2236] transition-colors tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          ← home
        </Link>
      </div>

      {/* Tab bar */}
      <div className="bg-[#E4EFFC] border-b border-[#C0D8F0] flex items-end px-0 shrink-0 overflow-x-auto">
        <AnimatePresence>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-5 py-2.5 bg-[#F0F6FF] border-r border-[#C0D8F0] border-t-2 border-t-[#1677C8] flex items-center gap-2 shrink-0"
          >
            <FileText size={11} className="text-[#1677C8]" />
            <span
              className="text-[11px] text-[#0D2236] whitespace-nowrap max-w-[180px] truncate"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {active.slug}.md
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="flex-1 border-b border-[#C0D8F0]" />
      </div>

      {/* Main IDE layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — file explorer */}
        <aside className="w-56 bg-[#E4EFFC] border-r border-[#C0D8F0] flex flex-col shrink-0 overflow-y-auto">
          {/* Sidebar header */}
          <div
            className="px-3 py-2.5 text-[9px] text-[#6899BC] tracking-[0.35em] uppercase border-b border-[#C0D8F0]"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Explorer
          </div>

          {/* Search bar */}
          <div className="px-2 py-2 border-b border-[#C0D8F0]">
            <div className="flex items-center gap-1.5 bg-[#F0F6FF] border border-[#C0D8F0] px-2 py-1.5 focus-within:border-[#1677C8] transition-colors">
              <Search size={10} className="text-[#A4C4E4] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색..."
                className="flex-1 bg-transparent text-[11px] text-[#1A3A52] placeholder:text-[#A4C4E4] outline-none min-w-0"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="shrink-0 text-[#A4C4E4] hover:text-[#6899BC] transition-colors">
                  <X size={10} />
                </button>
              )}
            </div>
          </div>

          {/* File tree */}
          <div className="py-2">
            <div
              className="px-3 py-1.5 text-[9px] text-[#6899BC] tracking-[0.3em] uppercase flex items-center gap-1"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              <ChevronRight size={10} className="rotate-90" />
              Blog
            </div>

            {Object.keys(filtered).length === 0 && (
              <p
                className="px-4 py-3 text-[10px] text-[#A4C4E4]"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              >
                결과 없음
              </p>
            )}

            {Object.entries(filtered).map(([category, catPosts]) => (
              <div key={category}>
                {/* Folder row */}
                <button
                  onClick={() => toggleFolder(category)}
                  title={category}
                  className="w-full flex items-center gap-1.5 px-4 py-1.5 hover:bg-[#C0D8F0]/60 transition-colors"
                >
                  <ChevronRight
                    size={10}
                    className={`text-[#6899BC] transition-transform duration-150 ${openFolders[category] ? 'rotate-90' : ''}`}
                  />
                  {openFolders[category]
                    ? <FolderOpen size={12} className="text-[#1677C8] shrink-0" />
                    : <Folder size={12} className="text-[#6899BC] shrink-0" />
                  }
                  <span
                    className="text-[11px] text-[#1A3A52] truncate"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {category}
                  </span>
                </button>

                {/* Files */}
                {openFolders[category] && catPosts.map((post) => (
                  <button
                    key={post.slug}
                    onClick={() => setActive(post)}
                    title={`${post.title}\n${post.slug}.md`}
                    className={`w-full flex items-center gap-1.5 pl-9 pr-3 py-1.5 text-left transition-colors ${
                      active.slug === post.slug
                        ? 'bg-[#C0D8F0] text-[#0D2236]'
                        : 'hover:bg-[#C0D8F0]/40 text-[#6899BC] hover:text-[#1A3A52]'
                    }`}
                  >
                    <FileText size={11} className={active.slug === post.slug ? 'text-[#1677C8]' : 'text-[#A4C4E4]'} />
                    <span
                      className="text-[11px] truncate"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {post.slug}.md
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom status */}
          <div className="mt-auto border-t border-[#C0D8F0] px-3 py-2">
            <p
              className="text-[9px] text-[#A4C4E4]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {allPosts.length} posts
            </p>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto px-10 py-12"
            >
              {/* Post header */}
              <div className="mb-10 pb-8 border-b border-[#C0D8F0]">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] px-2 py-0.5 border border-[#1677C8]/25 text-[#1677C8]"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {active.category}
                  </span>
                  <span
                    className="text-[10px] text-[#6899BC]"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                  >
                    {active.date}
                  </span>
                </div>
                <h1
                  className="text-2xl md:text-3xl font-bold text-[#0D2236] tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {active.title}
                </h1>
                <p
                  className="text-[#1A3A52]/60 leading-relaxed italic"
                  style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 300 }}
                >
                  {active.excerpt}
                </p>
              </div>

              {/* Post content */}
              <div
                className="prose prose-stone prose-sm max-w-none"
                style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
                dangerouslySetInnerHTML={{ __html: active.content }}
              />

              {/* Post footer */}
              <div className="mt-12 pt-6 border-t border-[#C0D8F0] flex justify-between items-center">
                <span
                  className="text-[10px] text-[#A4C4E4]"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  {active.slug}.md
                </span>
                <Link
                  href="/"
                  className="text-[10px] text-[#6899BC] hover:text-[#0D2236] transition-colors tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  ← home
                </Link>
              </div>
            </motion.article>
          </AnimatePresence>
        </main>

        {/* Right minimap strip */}
        <div className="w-12 bg-[#E4EFFC] border-l border-[#C0D8F0] hidden lg:flex flex-col items-center pt-4 gap-2 shrink-0">
          {allPosts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setActive(post)}
              title={post.title}
              className={`w-6 h-0.5 transition-all duration-200 ${
                active.slug === post.slug ? 'bg-[#1677C8]' : 'bg-[#C0D8F0] hover:bg-[#6899BC]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 bg-[#1677C8] flex items-center px-4 gap-6 shrink-0">
        <span
          className="text-[9px] text-[#F0F6FF]/80 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {active.category}
        </span>
        <span
          className="text-[9px] text-[#F0F6FF]/60 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Markdown
        </span>
        <span
          className="ml-auto text-[9px] text-[#F0F6FF]/60 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {active.date}
        </span>
      </div>
    </div>
  )
}
