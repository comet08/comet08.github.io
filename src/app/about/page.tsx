import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export const metadata = {
  title: '박성혜 — Frontend + AI Developer',
  description: 'LG U+ 프론트엔드 개발자. AI 에이전트 인터페이스를 만듭니다.',
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
