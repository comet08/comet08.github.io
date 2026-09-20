import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import posts from '@/data/posts.json'
import BlogHeader from '@/components/blog/BlogHeader'
import Sidebar from './Sidebar'

interface Post { slug: string; title: string; date: string; category: string; excerpt: string; content: string; image?: string; draft?: boolean }
const sourcePosts = posts as Post[]
const allPosts = sourcePosts.filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date))
const grouped = allPosts.reduce<Record<string, Post[]>>((acc, post) => {
  (acc[post.category] ??= []).push(post)
  return acc
}, {})

export function generateStaticParams() { return sourcePosts.map((post) => ({ slug: post.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((item) => item.slug === slug)
  return { title: post ? `${post.title} — comet.dev` : '글을 찾을 수 없습니다', description: post?.excerpt }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((item) => item.slug === slug)
  if (!post) notFound()
  const headings: { id: string; title: string; level: string }[] = []
  const content = post.content.replace(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level: string, title: string) => {
    const id = `section-${headings.length + 1}`
    headings.push({ id, title: title.replace(/<[^>]+>/g, ''), level })
    return `<h${level} id="${id}">${title}</h${level}>`
  })
  const index = allPosts.findIndex((item) => item.slug === slug)
  const newer = allPosts[index - 1]
  const older = allPosts[index + 1]

  return (
    <div className="dev-blog">
      <BlogHeader />
      <main className="blog-reader-layout">
        <aside className="blog-reader-nav"><Sidebar grouped={grouped} currentSlug={slug} /></aside>
        <article className="blog-article">
          <Link className="blog-back" href="/blog">← 모든 글</Link>
          <header className="blog-article-header">
            <p className="blog-eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p className="blog-deck">{post.excerpt}</p>
            <div className="blog-post-meta"><span>박성혜</span><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time><span>{Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 500))}분 읽기</span></div>
          </header>
          {post.image && <Image src={post.image} alt={post.title} width={960} height={540} className="blog-cover" />}
          {headings.length > 0 && <details className="blog-mobile-toc"><summary>이 글의 목차</summary><nav aria-label="본문 목차">{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav></details>}
          <div className="prose blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          <footer className="blog-article-footer"><strong>박성혜</strong><p>프론트엔드에서 AI 에이전트까지, 개발하며 배운 것을 기록합니다.</p><Link href="/about">포트폴리오 보기 ↗</Link></footer>
          <nav className="blog-adjacent" aria-label="다른 글">
            {newer && <Link href={`/blog/${newer.slug}`}><span>← 최신 글</span><strong>{newer.title}</strong></Link>}
            {older && <Link href={`/blog/${older.slug}`}><span>이전 글 →</span><strong>{older.title}</strong></Link>}
          </nav>
        </article>
        {headings.length > 0 && <aside className="blog-toc"><nav aria-label="본문 목차"><p className="blog-eyebrow">ON THIS PAGE</p>{headings.map((heading) => <a key={heading.id} className={heading.level === '3' ? 'blog-toc-nested' : ''} href={`#${heading.id}`}>{heading.title}</a>)}</nav></aside>}
      </main>
    </div>
  )
}
