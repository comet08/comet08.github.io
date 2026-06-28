'use client'

import { useState, useMemo } from 'react'
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

const allCategories = ['전체', ...Array.from(new Set(allPosts.map((p) => p.category)))]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function readingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, '').length
  return Math.max(1, Math.ceil(words / 500))
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchCat = activeCategory === '전체' || p.category === activeCategory
      const q = query.trim().toLowerCase()
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [activeCategory, query])

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E9ECEF] sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/about"
            className="text-[13px] font-bold text-[#1677C8] tracking-[0.3em] uppercase hover:opacity-70 transition-opacity"
          >
            comet.dev
          </Link>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색"
              className="text-[12px] bg-[#F1F3F5] border-none outline-none px-3 py-1.5 rounded-full w-40 placeholder:text-[#ADB5BD] text-[#343A40]"
            />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-[#1677C8] text-white'
                  : 'bg-white text-[#495057] border border-[#DEE2E6] hover:border-[#1677C8] hover:text-[#1677C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <p className="text-[13px] text-[#ADB5BD] py-20 text-center">포스트가 없습니다.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-lg border border-[#E9ECEF] overflow-hidden hover:shadow-md hover:border-[#1677C8]/30 transition-all duration-200 h-full flex flex-col">
                  {/* Card color bar */}
                  <div className="h-1 bg-gradient-to-r from-[#1677C8] to-[#6899BC]" />

                  <div className="p-5 flex flex-col flex-1">
                    {/* Category */}
                    <span className="text-[10px] text-[#1677C8] tracking-[0.3em] uppercase mb-3">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2
                      className="text-[15px] font-bold text-[#212529] leading-snug mb-2 group-hover:text-[#1677C8] transition-colors line-clamp-2"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[12px] text-[#868E96] leading-relaxed line-clamp-3 flex-1 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F1F3F5]">
                      <span className="text-[11px] text-[#ADB5BD]">{formatDate(post.date)}</span>
                      <span className="text-[11px] text-[#ADB5BD]">{readingTime(post.content)}분 읽기</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
