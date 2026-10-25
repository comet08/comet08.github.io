'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type BlogTheme = 'light' | 'dark'

const STORAGE_KEY = 'comet-blog-theme'

function preferredTheme(): BlogTheme {
  if (typeof window === 'undefined') return 'light'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: BlogTheme) {
  document.documentElement.dataset.blogTheme = theme
  document.documentElement.style.colorScheme = theme
}

export default function BlogThemeToggle() {
  const [theme, setTheme] = useState<BlogTheme>('light')

  useEffect(() => {
    const initialTheme = preferredTheme()
    // 서버 렌더링 뒤 localStorage와 시스템 설정을 기준으로 버튼 상태를 맞춘다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const label = nextTheme === 'dark' ? '다크 모드로 전환' : '라이트 모드로 전환'

  const toggleTheme = () => {
    setTheme(nextTheme)
    applyTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  return (
    <button
      type="button"
      className="blog-theme-toggle"
      aria-label={label}
      title={label}
      aria-pressed={theme === 'dark'}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
      <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}
