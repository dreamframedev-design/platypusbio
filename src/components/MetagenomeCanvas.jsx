import { useEffect, useRef } from 'react'

export default function MetagenomeCanvas({ cursorPos }) {
  const canvasRef = useRef(null)
  const blobsRef = useRef([])
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

    // Create soft organic blobs
    const BLOB_COUNT = 6
    const blobs = []

    const colors = [
      'rgba(212, 107, 26, 0.4)',  // orange
      'rgba(45, 212, 191, 0.3)',  // teal
      'rgba(240, 160, 64, 0.3)',  // amber
      'rgba(212, 107, 26, 0.25)', // orange lighter
      'rgba(45, 212, 191, 0.2)',  // teal lighter
      'rgba(232, 132, 48, 0.3)',  // amber deeper
    ]

    for (let i = 0; i < BLOB_COUNT; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        baseRadius: (Math.random() * 0.2 + 0.15) * Math.max(width, height),
        color: colors[i % colors.length],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.005,
      })
    }
    blobsRef.current = blobs

    function animate(time) {
      ctx.clearRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'screen'

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]

        // Slowly drift
        b.x += b.vx
        b.y += b.vy
        b.angle += b.speed

        // Gentle pull towards mouse for interactivity
        const dx = mx - b.x
        const dy = my - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 0 && dist < width) {
          b.vx += (dx / dist) * 0.015
          b.vy += (dy / dist) * 0.015
        }

        // Friction to prevent infinite acceleration
        b.vx *= 0.98
        b.vy *= 0.98

        // Bounce off soft boundaries
        if (b.x < -b.baseRadius) b.vx += 0.05
        if (b.x > width + b.baseRadius) b.vx -= 0.05
        if (b.y < -b.baseRadius) b.vy += 0.05
        if (b.y > height + b.baseRadius) b.vy -= 0.05

        // Wobble radius
        const radius = b.baseRadius + Math.sin(b.angle) * (b.baseRadius * 0.15)

        ctx.beginPath()
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over' // Reset for grid

      // Draw subtle hex grid or cellular pattern for biological theme
      drawCellularGrid(ctx, width, height, time)

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
      style={{ width: '100%', height: '100%', opacity: 0.8, filter: 'blur(90px)' }}
    />
  )
}

function drawCellularGrid(ctx, width, height, time) {
  const size = 80
  const cols = Math.ceil(width / (size * 1.5)) + 1
  const rows = Math.ceil(height / (size * Math.sqrt(3))) + 1
  const pulse = Math.sin(time * 0.0005) * 0.5 + 0.5

  ctx.strokeStyle = `rgba(203, 213, 225, ${0.3 + 0.2 * pulse})` // Light theme slate color
  ctx.lineWidth = 1

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const x = col * size * 1.5
      const y = row * size * Math.sqrt(3) + (col % 2 ? size * Math.sqrt(3) / 2 : 0)

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        // Soften the hex corners to look more cellular
        const hx = x + size * 0.45 * Math.cos(angle)
        const hy = y + size * 0.45 * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.stroke()
    }
  }
}
