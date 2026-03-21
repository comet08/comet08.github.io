import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import CustomCursor from '@/components/ui/CustomCursor'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '박성혜 — Frontend + AI Developer',
  description:
    'LG U+ 5년차 프론트엔드 개발자. AI 에이전트 인터페이스와 대규모 서비스 UI를 만듭니다.',
  openGraph: {
    title: '박성혜 — Frontend + AI Developer',
    description:
      '프론트엔드의 깊이로 AI를 연결하는 개발자. LG U+ 5년 경력.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
