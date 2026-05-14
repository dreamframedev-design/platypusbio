import { useEffect, useRef } from 'react'

// Mouse-driven 3D tilt for cards. Applies perspective transforms based on
// cursor position relative to the element center. Ships a soft return spring.
// Disabled on touch + reduced-motion.
export default function useTilt({ max = 6, scale = 1.015, glare = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let active = false
    let glareEl = null

    if (glare) {
      glareEl = document.createElement('div')
      glareEl.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s ease;
        background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.18), transparent 50%);
        mix-blend-mode: overlay;
        z-index: 5;
      `
      // Ensure parent supports absolute positioning of the glare layer
      const computedPos = window.getComputedStyle(node).position
      if (computedPos === 'static') node.style.position = 'relative'
      node.appendChild(glareEl)
    }

    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      targetX = (y - 0.5) * -2 * max
      targetY = (x - 0.5) * 2 * max
      if (glareEl) {
        glareEl.style.setProperty('--gx', `${x * 100}%`)
        glareEl.style.setProperty('--gy', `${y * 100}%`)
      }
      if (!active) {
        active = true
        loop()
      }
    }

    const onEnter = () => {
      if (glareEl) glareEl.style.opacity = '1'
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      if (glareEl) glareEl.style.opacity = '0'
      if (!active) {
        active = true
        loop()
      }
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      const sx = Math.abs(targetX) > 0.01 || Math.abs(targetY) > 0.01 ? scale : 1
      node.style.transform = `perspective(1100px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${sx})`
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frame = requestAnimationFrame(loop)
      } else {
        node.style.transform = `perspective(1100px) rotateX(${targetX}deg) rotateY(${targetY}deg) scale(${sx})`
        active = false
      }
    }

    node.style.transformStyle = 'preserve-3d'
    node.style.willChange = 'transform'
    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
      if (glareEl && glareEl.parentNode) glareEl.parentNode.removeChild(glareEl)
      node.style.transform = ''
    }
  }, [max, scale, glare])

  return ref
}
