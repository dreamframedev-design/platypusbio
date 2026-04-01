import { useState, useEffect, useRef } from 'react'

/**
 * AnimatedCounter — counts from 0 to `end` when scrolled into view.
 * @param {number} end — target number
 * @param {string} suffix — appended after (e.g. "+", "%", "K+")
 * @param {number} duration — animation duration in ms (default 2000)
 * @param {object} style — optional inline styles
 */
export default function AnimatedCounter({ end, suffix = '', duration = 2000, style = {} }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return (
    <span ref={ref} style={style}>
      {count}{suffix}
    </span>
  )
}
