'use client'

import { useEffect, useRef } from 'react'

const TRAIL_MAX = 32
const FADE_RATE = 0.038

interface Point { x: number; y: number; life: number }

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const trail: Point[] = []
    const mouse = { x: -200, y: -200 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const last = trail[trail.length - 1]
      if (!last || Math.hypot(e.clientX - last.x, e.clientY - last.y) > 3) {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 })
        if (trail.length > TRAIL_MAX) trail.shift()
      }
    }
    window.addEventListener('mousemove', onMove)

    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Decay
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= FADE_RATE
        if (trail[i].life <= 0) trail.splice(i, 1)
      }

      // Draw tail — deep green comet trail
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i]
        const progress = i / (trail.length - 1 || 1)
        const radius  = 0.6 + progress * 3.2
        const opacity = t.life * progress * 0.4

        ctx.beginPath()
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(22,119,200,${opacity})`
        ctx.fill()
      }

      // Glow halo
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 14)
      grd.addColorStop(0,   'rgba(22,119,200,0.14)')
      grd.addColorStop(0.5, 'rgba(22,119,200,0.05)')
      grd.addColorStop(1,   'rgba(22,119,200,0)')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Nucleus dot
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(22,119,200,0.9)'
      ctx.fill()
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}
