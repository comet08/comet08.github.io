import Link from 'next/link'
import BlogThemeToggle from './BlogThemeToggle'

export default function BlogHeader() {
  return (
    <header className="blog-header">
      <div className="blog-header-inner">
        <Link href="/blog" className="blog-brand">comet<span>.dev</span><span className="blog-brand-divider">/</span><span className="blog-brand-label">engineering notes</span></Link>
        <div className="blog-header-actions">
          <nav aria-label="블로그 메뉴">
            <Link href="/blog">글 목록</Link>
            <Link href="/about">포트폴리오 ↗</Link>
          </nav>
          <BlogThemeToggle />
        </div>
      </div>
    </header>
  )
}
