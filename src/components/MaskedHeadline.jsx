import { useEffect, useState } from 'react'

// Word-by-word mask reveal. Splits the text into words and each word rises
// from below behind a clip mask. Use `delay` (ms) to stagger after parent
// fade-ins. `gradient` toggles the warm orange gradient for emphasis lines.
export default function MaskedHeadline({
  text,
  delay = 0,
  gradient = false,
  className = '',
  style = {},
  wordStaggerMs = 80,
  letterStaggerMs = 0,
  splitBy = 'word',
}) {
  const [start, setStart] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStart(true)
      return
    }
    const t = setTimeout(() => setStart(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const tokens = splitBy === 'letter' ? Array.from(text) : text.split(' ')

  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {tokens.map((tok, i) => {
        const isSpace = tok === ' '
        const transition = `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${i * (splitBy === 'letter' ? letterStaggerMs : wordStaggerMs)}ms`
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              lineHeight: 'inherit',
              paddingBottom: '0.12em',
              marginBottom: '-0.12em',
              whiteSpace: isSpace ? 'pre' : 'normal',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: start ? 'translateY(0)' : 'translateY(110%)',
                transition,
                willChange: 'transform',
                ...(gradient && {
                  backgroundImage: 'linear-gradient(135deg, #d46b1a 0%, #e88430 50%, #f0a040 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.12))',
                }),
              }}
            >
              {tok}
            </span>
            {splitBy === 'word' && i < tokens.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}
