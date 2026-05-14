import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 200,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '100%',
          transform: 'scaleX(0)',
          transformOrigin: '0 50%',
          background: 'linear-gradient(90deg, #d46b1a 0%, #f0a040 35%, #2dd4bf 70%, #22d3ee 100%)',
          boxShadow: '0 0 12px rgba(212,107,26,0.45), 0 0 24px rgba(45,212,191,0.25)',
          transition: 'transform 0.08s linear',
        }}
      />
    </div>
  )
}
