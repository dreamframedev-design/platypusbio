import { useEffect, useRef, useState } from 'react'

// Counts up to `to` when scrolled into view. Uses rAF for buttery interpolation.
// Respects prefers-reduced-motion (jumps straight to the end value).
export default function Counter({
  to,
  from = 0,
  duration = 1800,
  suffix = '',
  prefix = '',
  className,
  style,
}) {
  const ref = useRef(null)
  const [val, setVal] = useState(from)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const start = performance.now()
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration)
              // ease-out-quart for a nice settle
              const eased = 1 - Math.pow(1 - t, 4)
              setVal(Math.round(from + (to - from) * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [to, from, duration])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}
      {val}
      {suffix}
    </span>
  )
}
