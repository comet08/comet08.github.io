'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** 4-pointed star sprite texture (✦) */
function createStarTexture(): THREE.Texture {
  const s = 64
  const canvas = document.createElement('canvas')
  canvas.width = s; canvas.height = s
  const ctx = canvas.getContext('2d')!
  const cx = s / 2, cy = s / 2
  ctx.clearRect(0, 0, s, s)

  const outer = cx * 0.88
  const inner = cx * 0.10
  ctx.beginPath()
  for (let i = 0; i < 4; i++) {
    const a1 = (i / 4) * Math.PI * 2 - Math.PI / 2
    const a2 = ((i + 0.5) / 4) * Math.PI * 2 - Math.PI / 2
    const ox = cx + outer * Math.cos(a1), oy = cy + outer * Math.sin(a1)
    const ix = cx + inner * Math.cos(a2), iy = cy + inner * Math.sin(a2)
    if (i === 0) ctx.moveTo(ox, oy); else ctx.lineTo(ox, oy)
    ctx.lineTo(ix, iy)
  }
  ctx.closePath()

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, outer)
  grd.addColorStop(0,    'rgba(10,10,10,1)')
  grd.addColorStop(0.2,  'rgba(10,10,10,0.95)')
  grd.addColorStop(0.65, 'rgba(10,10,10,0.4)')
  grd.addColorStop(1,    'rgba(10,10,10,0.05)')
  ctx.fillStyle = grd
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

/** Distribute points evenly on a sphere surface */
function spherePositions(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = radius * Math.cos(phi)
  }
  return arr
}

/** Connect nearby stars with constellation lines */
function buildConstellationLines(pos: Float32Array, count: number, maxDist: number): Float32Array {
  const lines: number[] = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = pos[i*3] - pos[j*3]
      const dy = pos[i*3+1] - pos[j*3+1]
      const dz = pos[i*3+2] - pos[j*3+2]
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < maxDist) {
        lines.push(pos[i*3], pos[i*3+1], pos[i*3+2], pos[j*3], pos[j*3+1], pos[j*3+2])
      }
    }
  }
  return new Float32Array(lines)
}

export default function HeroObject() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 2.8

    const tex = createStarTexture()
    const group = new THREE.Group()
    scene.add(group)

    const matProps = (size: number, opacity: number) => new THREE.PointsMaterial({
      map: tex, size, transparent: true, opacity,
      alphaTest: 0.01, sizeAttenuation: true, depthWrite: false,
    })

    // Layer 1 — bright large stars (constellation anchors)
    const bigPos  = spherePositions(14, 1.0)
    const bigGeo  = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(bigPos, 3))
    const bigMat  = matProps(0.20, 0.80)
    group.add(new THREE.Points(bigGeo, bigMat))

    // Layer 2 — medium stars
    const medPos  = spherePositions(28, 1.0)
    const medGeo  = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(medPos, 3))
    const medMat  = matProps(0.11, 0.55)
    group.add(new THREE.Points(medGeo, medMat))

    // Layer 3 — small faint stars
    const smallPos = spherePositions(50, 1.0)
    const smallGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(smallPos, 3))
    const smallMat = matProps(0.055, 0.30)
    group.add(new THREE.Points(smallGeo, smallMat))

    // Constellation lines — connect bright stars within ~45° arc
    const lineArr = buildConstellationLines(bigPos, 14, 0.78)
    if (lineArr.length) {
      const lineGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(lineArr, 3))
      group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
        color: 0x0a0a0a, transparent: true, opacity: 0.12, depthWrite: false,
      })))
    }

    // ── Interaction ─────────────────────────────────────────────
    let isDragging = false, autoRotate = true
    let prevX = 0, prevY = 0
    const vel = { x: 0, y: 0 }
    let idleTimer: ReturnType<typeof setTimeout>

    mount.addEventListener('pointerdown', (e) => {
      isDragging = true; autoRotate = false
      prevX = e.clientX; prevY = e.clientY
      vel.x = 0; vel.y = 0
      clearTimeout(idleTimer)
      mount.setPointerCapture(e.pointerId)
    })
    mount.addEventListener('pointermove', (e) => {
      if (!isDragging) return
      const dx = e.clientX - prevX, dy = e.clientY - prevY
      vel.x = dx; vel.y = dy
      group.rotation.y += dx * 0.013
      group.rotation.x += dy * 0.013
      prevX = e.clientX; prevY = e.clientY
    })
    mount.addEventListener('pointerup', () => {
      isDragging = false
      idleTimer = setTimeout(() => { autoRotate = true }, 2000)
    })

    window.addEventListener('resize', () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    })

    // ── Animation ───────────────────────────────────────────────
    let rafId: number, t = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.012

      if (autoRotate) {
        group.rotation.y += 0.0035
        group.rotation.x += 0.0009
      } else if (!isDragging) {
        vel.x *= 0.90; vel.y *= 0.90
        group.rotation.y += vel.x * 0.009
        group.rotation.x += vel.y * 0.009
      }

      // Twinkling — each layer oscillates at different phase
      bigMat.opacity   = 0.72 + 0.12 * Math.sin(t * 1.1)
      medMat.opacity   = 0.50 + 0.12 * Math.sin(t * 0.7 + 1.4)
      smallMat.opacity = 0.26 + 0.10 * Math.sin(t * 1.5 + 2.7)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
      tex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: 'grab' }}
      data-cursor-hover
    />
  )
}
