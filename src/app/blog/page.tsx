'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import posts from '@/data/posts.json'
import BlogHeader from '@/components/blog/BlogHeader'

const allPosts = [...posts].filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date))
const categoryCounts = allPosts.reduce<Record<string, number>>((acc, post) => ({ ...acc, [post.category]: (acc[post.category] ?? 0) + 1 }), {})
const categories = Object.keys(categoryCounts)
const recentPosts = allPosts.slice(0, 3)
const tagCounts = allPosts.flatMap((post) => post.tags ?? []).reduce<Record<string, number>>((acc, tag) => ({ ...acc, [tag]: (acc[tag] ?? 0) + 1 }), {})
const allTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b))

export default function BlogPage() {
  const [tag, setTag] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initial = params.get('tag')
    const initialCategory = params.get('category')
    // 정적 export라 쿼리스트링은 마운트 후에만 읽을 수 있다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial && tagCounts[initial]) setTag(initial)
    if (initialCategory && categoryCounts[initialCategory]) setCategory(initialCategory)
  }, [])
  const filtered = allPosts.filter((post) =>
    (!category || post.category === category) &&
    (!tag || post.tags?.includes(tag)) &&
    `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(' ') ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())
  )
  const filtering = Boolean(query || tag || category)

  return (
    <div className="dev-blog">
      <BlogHeader />
      <main className="blog-index">
        <section className="blog-intro">
          <p className="blog-eyebrow">BUILD · DEBUG · LEARN</p>
          <h1>개발하며 남긴 기록<span>.</span></h1>
          <p>프론트엔드부터 AI 에이전트까지.<br className="sm:hidden" /> 문제를 정의하고, 해결하고, 배운 것을 씁니다.</p>
        </section>
        <div className="blog-index-layout">
          <aside className="blog-filters" aria-label="글 필터">
            <label className="blog-search">
              <Search size={16} aria-hidden="true" />
              <input type="search" aria-label="글 검색" placeholder="글 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <p className="blog-eyebrow">CATEGORIES</p>
            <div className="blog-category-list">
              <button aria-pressed={!category} onClick={() => setCategory(null)}><span>전체</span><span>{allPosts.length}</span></button>
              {categories.map((item) => (
                <button key={item} aria-pressed={category === item} onClick={() => setCategory(category === item ? null : item)}>
                  <span>{item}</span><span>{categoryCounts[item]}</span>
                </button>
              ))}
            </div>
            <p className="blog-eyebrow">TAGS</p>
            <div className="blog-tag-cloud">
              {allTags.map((item) => (
                <button key={item} aria-pressed={tag === item} onClick={() => setTag(tag === item ? null : item)}>
                  <span className="blog-tag-hash">#</span>{item}<span className="blog-tag-count">{tagCounts[item]}</span>
                </button>
              ))}
            </div>
            <div className="blog-recent">
              <p className="blog-eyebrow">RECENT</p>
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <strong>{post.title}</strong>
                  <time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
                </Link>
              ))}
            </div>
          </aside>
          <section aria-label="글 목록" className="min-w-0">
            <div className="blog-list-heading"><h2>{[category, tag && `#${tag}`].filter(Boolean).join(' · ') || '모든 글'}</h2><span aria-live="polite">{filtered.length}개의 기록</span></div>
            {filtered.length ? filtered.map((post) => (
              <article key={post.slug} className="blog-post-row">
                <Link href={`/blog/${post.slug}`}>
                  <div className="blog-post-meta"><span>{post.category}</span><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time></div>
                  <h3>{post.title}<ArrowUpRight size={20} aria-hidden="true" /></h3>
                  <p>{post.excerpt}</p>
                  {post.tags && <ul className="blog-tags" aria-label="태그">{post.tags.map((item) => <li key={item}>#{item}</li>)}</ul>}
                  <span className="blog-read-time">{Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 500))}분 읽기</span>
                </Link>
              </article>
            )) : <div className="blog-empty"><h3>{filtering ? '검색 결과가 없습니다.' : '첫 번째 글을 준비하고 있습니다.'}</h3><p>{filtering ? '다른 검색어나 주제로 찾아보세요.' : '개발 과정에서 문제를 정의하고 해결한 이야기를 곧 기록할게요.'}</p>{(filtering) && <button onClick={() => { setQuery(''); setTag(null); setCategory(null) }}>전체 글 보기 →</button>}</div>}
          </section>
        </div>
        <footer className="blog-footer">comet.dev <span>생각의 과정까지 남기는 개발 기록.</span></footer>
      </main>
    </div>
  )
}
