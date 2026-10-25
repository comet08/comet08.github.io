import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export const metadata = {
  title: '박성혜 — Developer',
  description: '통신·상담 앱과 웹, 앱↔웹뷰 연동, AI 응답 스트리밍을 만들어 온 5년차 개발자입니다.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
