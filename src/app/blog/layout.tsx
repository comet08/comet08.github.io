import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME, OG_IMAGE } from '@/lib/site'

export const metadata: Metadata = {
  title: '개발 기록 — comet.dev',
  description: '프론트엔드부터 AI 에이전트까지, 문제를 정의하고 해결하며 배운 것을 기록합니다.',
  alternates: {
    canonical: `${SITE_URL}/blog/`,
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog/`,
    title: '개발 기록 — comet.dev',
    description: '프론트엔드부터 AI 에이전트까지, 문제를 정의하고 해결하며 배운 것을 기록합니다.',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
}

const themeBootstrap = `
try {
  const saved = localStorage.getItem('comet-blog-theme');
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.blogTheme = theme;
  document.documentElement.style.colorScheme = theme;
} catch {}
`

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      {children}
    </>
  )
}
