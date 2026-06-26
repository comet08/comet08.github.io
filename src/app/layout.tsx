import type { Metadata } from 'next'
import { Syne, IBM_Plex_Serif, IBM_Plex_Mono, Black_Han_Sans } from 'next/font/google'
import Script from 'next/script'
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8794204253291841"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZGRBV3E0C7"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-ZGRBV3E0C7');`,
          }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PS926PLR');`,
          }}
        />
      </head>
      <body
        className={`${syne.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} ${blackHanSans.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PS926PLR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
