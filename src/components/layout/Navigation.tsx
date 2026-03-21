'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e0ddd8]'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#0a0a0a] origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/about" className="font-mono text-sm text-[#0a0a0a] hover:opacity-70 transition-opacity">
          sp.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#888888] hover:text-[#1a1a1a] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>


        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1a1a1a] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f7f6f3] border-t border-[#e0ddd8] px-6 py-6">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#1a1a1a] text-sm hover:text-[#0a0a0a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
