'use client'

import { motion } from 'framer-motion'
import profile from '@/data/profile.json'
import HeroObject from '@/components/ui/HeroObject'

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' }
  })
}

export default function Hero() {
  const letters = profile.name.split('')

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-sm text-[#888888] mb-6"
            >
              안녕하세요,
            </motion.p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-4">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl text-[#888888] mb-8"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base md:text-lg text-[#1a1a1a] max-w-lg mb-12 leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-[#f0eee9] text-[#0a0a0a] text-sm font-medium rounded hover:bg-[#e5e3de] transition-colors"
              >
                Project
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-[#e0ddd8] text-[#1a1a1a] text-sm font-medium rounded hover:border-[#0a0a0a]/40 transition-colors"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* 3D Object */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden md:block h-[420px]"
          >
            <HeroObject />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
