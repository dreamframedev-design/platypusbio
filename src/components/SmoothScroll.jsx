import { useEffect } from 'react'
import Lenis from 'lenis'

// Lenis-based smooth scroll. Skipped on touch devices and when the user
// prefers reduced motion so the experience stays native there.
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (reduce || isTouch) return

    const lenis = new Lenis({
      // Snappy but smooth — tuned for responsiveness over drift.
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Hook in-page anchor clicks so #pipeline etc. ride Lenis
    const onAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }
    document.addEventListener('click', onAnchorClick)

    // Expose so other components (e.g. keyboard nav) can use it
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
