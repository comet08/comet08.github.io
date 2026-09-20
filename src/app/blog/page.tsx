'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import posts from '@/data/posts.json'
import BlogHeader from '@/components/blog/BlogHeader'

const allPosts = [...posts].filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date))
const categories = ['전체', ...new Set(allPosts.map((post) => post.category))]

export default function BlogPage() {
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const filtered = allPosts.filter((post) =>
    (category === '전체' || post.category === category) &&
    `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase())
  )

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
            <p className="blog-eyebrow">TOPICS</p>
            <div className="blog-topic-list">
              {categories.map((item) => (
                <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
                  <span>{item}</span><span>{item === '전체' ? allPosts.length : allPosts.filter((post) => post.category === item).length}</span>
                </button>
              ))}
            </div>
            <div className="blog-author-note"><strong>박성혜</strong><p>Frontend → AI Agent<br />직접 겪은 문제와 선택의 기록.</p></div>
          </aside>
          <section aria-label="글 목록" className="min-w-0">
            <div className="blog-list-heading"><h2>{category === '전체' ? '모든 글' : category}</h2><span aria-live="polite">{filtered.length}개의 기록</span></div>
            {filtered.length ? filtered.map((post) => (
              <article key={post.slug} className="blog-post-row">
                <Link href={`/blog/${post.slug}`}>
                  <div className="blog-post-meta"><span>{post.category}</span><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time></div>
                  <h3>{post.title}<ArrowUpRight size={20} aria-hidden="true" /></h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-read-time">{Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 500))}분 읽기</span>
                </Link>
              </article>
            )) : <div className="blog-empty"><h3>{query || category !== '전체' ? '검색 결과가 없습니다.' : '첫 번째 글을 준비하고 있습니다.'}</h3><p>{query || category !== '전체' ? '다른 검색어나 주제로 찾아보세요.' : '개발 과정에서 문제를 정의하고 해결한 이야기를 곧 기록할게요.'}</p>{(query || category !== '전체') && <button onClick={() => { setQuery(''); setCategory('전체') }}>전체 글 보기 →</button>}</div>}
          </section>
        </div>
        <footer className="blog-footer">comet.dev <span>생각의 과정까지 남기는 개발 기록.</span></footer>
      </main>
    </div>
  )
}
