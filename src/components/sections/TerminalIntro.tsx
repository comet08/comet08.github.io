'use client'

import { useState, useEffect, useCallback } from 'react'

const LINES = [
  { type: 'cmd' as const,    text: '$ whoami' },
  { type: 'out' as const,    text: '→ 박성혜  ·  Frontend + AI Developer  ·  LG U+' },
  { type: 'cmd' as const,    text: '$ cat tagline.txt' },
  { type: 'out' as const,    text: '→ 프론트엔드의 깊이로 AI를 연결합니다' },
  { type: 'cmd' as const,    text: '$ echo $NAME_REVERSED' },
  { type: 'out' as const,    text: '→ 혜성 ✦' },
]

const CHAR_DELAY = 38   // ms per character
const LINE_GAP   = 320  // ms pause between lines
const END_HOLD   = 700  // ms hold after last line before auto-close

interface Props {
  onComplete: () => void
}

export default function TerminalIntro({ onComplete }: Props) {
  const [committed, setCommitted] = useState<string[]>([])
  const [typing, setTyping]       = useState('')
  const [done, setDone]           = useState(false)

  const finish = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    let cancelled = false

    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms))

    const run = async () => {
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return
        const full = LINES[i].text

        for (let j = 1; j <= full.length; j++) {
          if (cancelled) return
          await sleep(CHAR_DELAY)
          setTyping(full.slice(0, j))
        }

        if (cancelled) return
        setCommitted((prev) => [...prev, full])
        setTyping('')

        if (i < LINES.length - 1) await sleep(LINE_GAP)
      }

      if (cancelled) return
      setDone(true)
      await sleep(END_HOLD)
      if (!cancelled) finish()
    }

    run()
    return () => { cancelled = true }
  }, [finish])

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Terminal chrome */}
        <div className="border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#111111] px-4 py-3 flex items-center gap-2 border-b border-[#2a2a2a]">
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <span className="ml-3 text-xs text-[#737373] font-mono select-none">
              seonghye@portfolio ~
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-[#0a0a0a] px-6 py-6 font-mono text-sm min-h-[160px] space-y-1">
            {committed.map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith('→')
                    ? 'text-[#f0eee9]'
                    : 'text-[#737373]'
                }
              >
                {line}
              </p>
            ))}

            {/* Currently typing line */}
            {!done && (
              <p
                className={
                  typing.startsWith('→') ? 'text-[#f0eee9]' : 'text-[#737373]'
                }
              >
                {typing}
                <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle cursor-blink" />
              </p>
            )}

            {/* Idle cursor after done */}
            {done && (
              <p className="text-[#737373]">
                <span className="inline-block w-[2px] h-[1em] bg-current align-middle cursor-blink" />
              </p>
            )}
          </div>
        </div>

        {/* Skip — always visible, no animation delay */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={finish}
            className="text-xs text-[#737373] hover:text-[#f0f0f0] transition-colors font-mono px-2 py-1"
          >
            skip →
          </button>
        </div>
      </div>
    </div>
  )
}
