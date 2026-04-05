import type { Metadata } from 'next'
import { Syne, IBM_Plex_Serif, IBM_Plex_Mono, Black_Han_Sans } from 'next/font/google'
import CustomCursor from '@/components/ui/CustomCursor'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

const ibmPlexSerif = IBM_Plex_Serif({
  variable: '--font-ibm-plex-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const blackHanSans = Black_Han_Sans({
  variable: '--font-black-han-sans',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: '박성혜 — Frontend + AI Developer',
  description:
    'LG U+ 5년차 프론트엔드 개발자. AI 에이전트 인터페이스와 대규모 서비스 UI를 만듭니다.',
  openGraph: {
    title: '박성혜 — Frontend + AI Developer',
    description: '프론트엔드의 깊이로 AI를 연결하는 개발자. LG U+ 5년 경력.',
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
      <body
        className={`${syne.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} ${blackHanSans.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
