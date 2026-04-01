import { useEffect, useRef } from 'react'

export default function MetagenomeCanvas({ cursorPos }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef(null)

  useEffect(() => {
    mouseRef.current = { x: cursorPos.x, y: cursorPos.y }
  }, [cursorPos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Create particles
    const PARTICLE_COUNT = Math.min(120, Math.floor(width * height / 8000))
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.4,
        hue: Math.random() > 0.7 ? 25 : (Math.random() > 0.5 ? 170 : 35), // orange, teal, or amber
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    particlesRef.current = particles

    const CONNECTION_DIST = 150
    const MOUSE_RADIUS = 200

    function animate(time) {
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Pulse effect
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset)
        const currentRadius = p.radius + pulse * 0.5
        const currentOpacity = p.opacity + pulse * 0.1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)

        if (p.hue === 25) {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${currentOpacity})`
        } else if (p.hue === 170) {
          ctx.fillStyle = `hsla(${p.hue}, 60%, 55%, ${currentOpacity * 0.6})`
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${currentOpacity * 0.7})`
        }
        ctx.fill()

        // Glow effect for larger particles
        if (currentRadius > 1.5) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, currentRadius * 3
          )
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 55%, ${currentOpacity * 0.15})`)
          gradient.addColorStop(1, `hsla(${p.hue}, 80%, 55%, 0)`)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

          if (cdist < CONNECTION_DIST) {
            const alpha = (1 - cdist / CONNECTION_DIST) * 0.4

            // Check if near mouse for enhanced connection
            const midX = (p.x + p2.x) / 2
            const midY = (p.y + p2.y) / 2
            const mouseDist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2)
            const nearMouse = mouseDist < MOUSE_RADIUS

            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)

            if (nearMouse) {
              ctx.strokeStyle = `hsla(25, 80%, 55%, ${alpha * 2})`
              ctx.lineWidth = 1.5
            } else {
              ctx.strokeStyle = `rgba(138, 150, 163, ${alpha})`
              ctx.lineWidth = 1.0
            }
            ctx.stroke()
          }
        }
      }

      // Draw hex grid pattern (subtle)
      drawHexGrid(ctx, width, height, time)

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

function drawHexGrid(ctx, width, height, time) {
  const size = 60
  const cols = Math.ceil(width / (size * 1.5)) + 1
  const rows = Math.ceil(height / (size * Math.sqrt(3))) + 1
  const pulse = Math.sin(time * 0.001) * 0.3 + 0.7

  ctx.strokeStyle = `rgba(80, 100, 120, ${0.25 * pulse})`
  ctx.lineWidth = 0.8

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const x = col * size * 1.5
      const y = row * size * Math.sqrt(3) + (col % 2 ? size * Math.sqrt(3) / 2 : 0)

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * 0.4 * Math.cos(angle)
        const hy = y + size * 0.4 * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.stroke()
    }
  }
}
