"use client";

import { useState, useEffect, useCallback } from "react";

const LINES = [
  { type: "cmd" as const, text: "$ whoami" },
  { type: "out" as const, text: "→ 박성혜  ·  Developer" },
  // { type: 'cmd' as const,    text: '$ echo $NAME_REVERSED' },
  // { type: 'out' as const,    text: '→ 혜성 ✦' },
];

const CHAR_DELAY = 38;
const LINE_GAP = 320;
const END_HOLD = 700;

interface Props {
  onComplete: () => void;
}

export default function TerminalIntro({ onComplete }: Props) {
  const [committed, setCommitted] = useState<string[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const run = async () => {
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return;
        const full = LINES[i].text;

        for (let j = 1; j <= full.length; j++) {
          if (cancelled) return;
          await sleep(CHAR_DELAY);
          setTyping(full.slice(0, j));
        }

        if (cancelled) return;
        setCommitted((prev) => [...prev, full]);
        setTyping("");

        if (i < LINES.length - 1) await sleep(LINE_GAP);
      }

      if (cancelled) return;
      setDone(true);
      await sleep(END_HOLD);
      if (!cancelled) finish();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [finish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Terminal chrome */}
        <div className="border border-[#1C1C1C] overflow-hidden shadow-2xl">
          <div className="bg-[#0E0E0E] px-4 py-3 flex items-center gap-2 border-b border-[#1C1C1C]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]/30" />
            <span
              className="ml-3 text-[10px] text-[#484848] select-none tracking-widest"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              seonghye@portfolio ~
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="bg-[#080808] px-6 py-6 text-sm min-h-[180px] space-y-1.5"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            {committed.map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("→") ? "text-[#38BDF8]" : "text-[#484848]"
                }
              >
                {line}
              </p>
            ))}

            {/* Currently typing line */}
            {!done && (
              <p
                className={
                  typing.startsWith("→") ? "text-[#38BDF8]" : "text-[#484848]"
                }
              >
                {typing}
                <span className="inline-block w-[2px] h-[1em] bg-[#38BDF8] ml-[2px] align-middle cursor-blink" />
              </p>
            )}

            {/* Idle cursor after done */}
            {done && (
              <p className="text-[#484848]">
                <span className="inline-block w-[2px] h-[1em] bg-[#38BDF8] align-middle cursor-blink" />
              </p>
            )}
          </div>
        </div>

        {/* Skip */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={finish}
            className="text-[10px] text-[#484848] hover:text-[#E2DDD5] transition-colors px-2 py-1 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
          >
            skip →
          </button>
        </div>
      </div>
    </div>
  );
}
