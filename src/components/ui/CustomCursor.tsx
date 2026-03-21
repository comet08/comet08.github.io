'use client'

import { useEffect, useRef } from 'react'

const TRAIL_MAX = 28
const FADE_RATE = 0.04

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
      // Only push if moved enough
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

      // Draw tail — tapered circles oldest→newest
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i]
        const progress = i / (trail.length - 1 || 1) // 0=oldest 1=newest
        const radius  = 0.8 + progress * 3.5
        const opacity = t.life * progress * 0.55

        ctx.beginPath()
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,10,10,${opacity})`
        ctx.fill()
      }

      // Head — comet nucleus with glow
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 7)
      grd.addColorStop(0,   'rgba(10,10,10,0.9)')
      grd.addColorStop(0.4, 'rgba(10,10,10,0.35)')
      grd.addColorStop(1,   'rgba(10,10,10,0)')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Nucleus dot
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(10,10,10,1)'
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
