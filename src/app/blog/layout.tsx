import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개발 기록 — comet.dev',
  description: '프론트엔드부터 AI 에이전트까지, 문제를 정의하고 해결하며 배운 것을 기록합니다.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
