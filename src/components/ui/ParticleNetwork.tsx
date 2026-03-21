'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 140
const SPEED = 0.18

export default function ParticleNetwork() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Scene / Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 400

    // Particles
    const positions: number[] = []
    const velocities: THREE.Vector3[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * mount.clientWidth
      const y = (Math.random() - 0.5) * mount.clientHeight
      const z = (Math.random() - 0.5) * 100
      positions.push(x, y, z)
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * SPEED,
          (Math.random() - 0.5) * SPEED,
          0,
        ),
      )
    }

    const particleGeo = new THREE.BufferGeometry()
    const posArray = new Float32Array(positions)
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x0a0a0a,
      size: 2.5,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: false,
    })
    const points = new THREE.Points(particleGeo, particleMat)
    scene.add(points)

    // Lines (reused geometry)
    const lineGeo = new THREE.BufferGeometry()
    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT
    const linePos = new Float32Array(maxLines * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.08 }),
    )
    scene.add(lineMat)

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 30
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 30
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    let rafId: number
    const pos = particleGeo.attributes.position.array as Float32Array
    const halfW = mount.clientWidth / 2
    const halfH = mount.clientHeight / 2

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y

        // Wrap edges
        if (pos[i * 3] >  halfW) pos[i * 3] = -halfW
        if (pos[i * 3] < -halfW) pos[i * 3] =  halfW
        if (pos[i * 3 + 1] >  halfH) pos[i * 3 + 1] = -halfH
        if (pos[i * 3 + 1] < -halfH) pos[i * 3 + 1] =  halfH
      }
      particleGeo.attributes.position.needsUpdate = true

      // Build connections
      let lineIdx = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            linePos[lineIdx++] = pos[i * 3];     linePos[lineIdx++] = pos[i * 3 + 1]; linePos[lineIdx++] = pos[i * 3 + 2]
            linePos[lineIdx++] = pos[j * 3];     linePos[lineIdx++] = pos[j * 3 + 1]; linePos[lineIdx++] = pos[j * 3 + 2]
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3)
      lineGeo.attributes.position.needsUpdate = true

      // Camera parallax
      camera.position.x += (mouse.x - camera.position.x) * 0.04
      camera.position.y += (mouse.y - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}
