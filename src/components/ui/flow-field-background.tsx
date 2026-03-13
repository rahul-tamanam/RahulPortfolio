'/* eslint-disable */\n'
'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'

import { cn } from '@/utils/cn'

interface NeuralBackgroundProps {
  className?: string
  /**
   * Color of the particles.
   * Defaults to Indigo.
   */
  color?: string
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.15
   */
  trailOpacity?: number
  /**
   * Number of particles. Default: 600
   */
  particleCount?: number
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number
}

export default function NeuralBackground(props: NeuralBackgroundProps) {
  const { className, color = '#6366f1', trailOpacity = 0.15, particleCount = 600, speed = 1 } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // --- CONFIGURATION ---
    let width = container.clientWidth
    let height = container.clientHeight
    let particles: Particle[] = []
    let animationFrameId = 0
    const mouse = { x: -1000, y: -1000 } // Start off-screen

    // --- PARTICLE CLASS ---
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      age: number
      life: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        // Random lifespan to create natural recycling
        this.life = Math.random() * 200 + 100
      }

      update() {
        // 1. Flow Field Math (Simplex-ish noise)
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI

        // 2. Add force from flow field
        this.vx += Math.cos(angle) * 0.2 * speed
        this.vy += Math.sin(angle) * 0.2 * speed

        // 3. Mouse Repulsion
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.hypot(dx, dy)
        const interactionRadius = 150

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius
          this.vx -= dx * force * 0.05
          this.vy -= dy * force * 0.05
        }

        // 4. Apply Velocity & Friction
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.95
        this.vy *= 0.95

        // 5. Aging
        this.age++
        if (this.age > this.life) {
          this.reset()
        }

        // 6. Wrap around screen
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color
        // Fade in and out based on age
        const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2
        context.globalAlpha = alpha
        context.fillRect(this.x, this.y, 1.5, 1.5)
      }
    }

    // --- INITIALIZATION ---
    const init = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      // Reset transform so we don't accumulate scaling across resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // --- ANIMATION LOOP ---
    const tick = () => {
      // Trails: draw a semi-transparent black rect over previous frame
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        p.update()
        p.draw(ctx)
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(tick)
    }

    // --- EVENT LISTENERS ---
    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    // Start
    init()
    tick()

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, trailOpacity, particleCount, speed])

  return (
    <div ref={containerRef} className={cn('relative size-full overflow-hidden bg-black', className)}>
      <canvas ref={canvasRef} className='block size-full' />
    </div>
  )
}
