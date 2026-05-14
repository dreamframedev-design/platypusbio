import { useEffect, useRef } from 'react'

// Subtle magnetic pull on hover. Movement capped at `strength` px.
// Designed for buttons / CTAs — does NOT change the cursor.
export default function useMagnetic({ strength = 10 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let active = false

    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.sqrt(x * x + y * y)
      const radius = Math.max(rect.width, rect.height) * 0.9
      const factor = Math.max(0, 1 - dist / radius)
      tx = (x / rect.width) * strength * factor * 2
      ty = (y / rect.height) * strength * factor * 2
      if (!active) {
        active = true
        loop()
      }
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      if (!active) {
        active = true
        loop()
      }
    }

    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      node.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        frame = requestAnimationFrame(loop)
      } else {
        node.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        active = false
      }
    }

    // Listen on a slightly inflated zone around the node for a softer pull
    const onWindowMove = (e) => {
      const rect = node.getBoundingClientRect()
      const pad = 60
      if (
        e.clientX > rect.left - pad &&
        e.clientX < rect.right + pad &&
        e.clientY > rect.top - pad &&
        e.clientY < rect.bottom + pad
      ) {
        onMove(e)
      } else if (tx !== 0 || ty !== 0) {
        onLeave()
      }
    }

    window.addEventListener('mousemove', onWindowMove, { passive: true })
    node.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onWindowMove)
      node.removeEventListener('mouseleave', onLeave)
      node.style.transform = ''
    }
  }, [strength])

  return ref
}
