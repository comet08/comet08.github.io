import Link from 'next/link'
import { notFound } from 'next/navigation'
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

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').length / 500))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E9ECEF] sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/about"
            className="text-[13px] font-bold text-[#1677C8] tracking-[0.3em] uppercase hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            comet.dev
          </Link>
          <Link
            href="/blog"
            className="text-[11px] text-[#868E96] hover:text-[#1677C8] transition-colors tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            ← 목록
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Meta */}
        <div className="mb-8">
          <span
            className="text-[10px] text-[#1677C8] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {post.category}
          </span>
          <h1
            className="text-3xl md:text-4xl font-extrabold text-[#212529] tracking-tight leading-tight mt-3 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {post.title}
          </h1>
          <div
            className="flex items-center gap-4 text-[12px] text-[#ADB5BD]"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{readingTime(post.content)}분 읽기</span>
          </div>
        </div>

        <hr className="border-[#E9ECEF] mb-10" />

        {/* Content */}
        <div
          className="prose prose-stone max-w-none"
          style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
