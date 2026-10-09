import posts from '@/data/posts.json'
import { SITE_URL, SITE_NAME, AUTHOR, postUrl, postDate } from '@/lib/site'

export const dynamic = 'force-static'

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const published = posts.filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date))
  const items = published
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <pubDate>${new Date(postDate(post.date)).toUTCString()}</pubDate>
      <category>${escape(post.category)}</category>
      <description>${escape(post.excerpt)}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} — 개발 기록</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escape(`${AUTHOR}의 개발 기록. 프론트엔드부터 AI 에이전트까지.`)}</description>
    <language>ko-KR</language>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
