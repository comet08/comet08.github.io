'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  category: string
}

interface Props {
  grouped: Record<string, Post[]>
  currentSlug: string
}

export default function Sidebar({ grouped, currentSlug }: Props) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.keys(grouped).reduce((a, k) => ({ ...a, [k]: true }), {})
  )

  const toggle = (cat: string) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }))

  return (
    <div className="sticky top-24 space-y-1">
      <p
        className="text-[10px] text-[#6899BC] tracking-[0.35em] uppercase mb-4"
        style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
      >
        Posts
      </p>
      {Object.entries(grouped).map(([category, posts]) => (
        <div key={category}>
          <button
            aria-expanded={openCategories[category]}
            onClick={() => toggle(category)}
            className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded hover:bg-[#E4EFFC] transition-colors"
          >
            <span
              className="text-[11px] font-medium text-[#1A3A52]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {category}
            </span>
            <span className="text-[10px] text-[#6899BC]">
              {openCategories[category] ? '▾' : '▸'}
            </span>
          </button>
          {openCategories[category] && posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              aria-current={p.slug === currentSlug ? "page" : undefined}
              className={`block px-3 py-1.5 ml-2 rounded text-[12px] transition-colors truncate ${
                p.slug === currentSlug
                  ? 'text-[#1677C8] font-medium bg-[#1677C8]/10'
                  : 'text-[#4A7499] hover:text-[#0D2236] hover:bg-[#E4EFFC]'
              }`}
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {p.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
