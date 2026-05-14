import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

// Decoder/scramble effect for short eyebrow labels. Triggers once when the
// element is in view. Preserves spaces. Designed to feel "genomic" — fast
// settle, light touch.
export default function ScrambleText({
  text,
  duration = 900,
  className,
  style,
  as: Tag = 'span',
}) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState(text)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplayed(text)
      setDone(true)
      return
    }
    setDisplayed('')
    setDone(false)
    const node = ref.current
    if (!node) return

    let started = false
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(node)

    let rafId
    const run = () => {
      const start = performance.now()
      const totalLen = text.length
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        // Reveal letters left-to-right with a small overlap of scrambling
        const revealCount = Math.floor(t * (totalLen + 4))
        let out = ''
        for (let i = 0; i < totalLen; i++) {
          const ch = text[i]
          if (ch === ' ') {
            out += ' '
          } else if (i < revealCount - 4) {
            out += ch
          } else if (i < revealCount) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            out += ' '
          }
        }
        setDisplayed(out)
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setDisplayed(text)
          setDone(true)
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [text, duration])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum"',
        whiteSpace: 'pre',
        ...style,
      }}
      data-done={done ? 'true' : 'false'}
    >
      {displayed || ' '}
    </Tag>
  )
}
