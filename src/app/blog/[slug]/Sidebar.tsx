import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
}

interface Props {
  recent: Post[]
  categories: { name: string; count: number }[]
  tags: { name: string; count: number }[]
  currentSlug: string
}

export default function Sidebar({ recent, categories, tags, currentSlug }: Props) {
  return (
    <div className="blog-side">
      <p className="blog-eyebrow">RECENT</p>
      <div className="blog-side-posts">
        {recent.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} aria-current={post.slug === currentSlug ? 'page' : undefined}>
            <span>{post.title}</span>
            <time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
          </Link>
        ))}
      </div>
      <p className="blog-eyebrow">CATEGORIES</p>
      <div className="blog-category-list">
        {categories.map((category) => (
          <Link key={category.name} href={`/blog?category=${encodeURIComponent(category.name)}`}><span>{category.name}</span><span>{category.count}</span></Link>
        ))}
      </div>
      {tags.length > 0 && (
        <>
          <p className="blog-eyebrow">TAGS</p>
          <div className="blog-side-tags">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/blog?tag=${encodeURIComponent(tag.name)}`}>#{tag.name}<span>{tag.count}</span></Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
