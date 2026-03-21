'use client'

import { useRouter } from 'next/navigation'
import TerminalIntro from '@/components/sections/TerminalIntro'

export default function Home() {
  const router = useRouter()

  return (
    <TerminalIntro onComplete={() => router.push('/about')} />
  )
}
