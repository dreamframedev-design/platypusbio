import { useEffect, useState } from 'react'

// `g` then a section letter scrolls there. Power-user touch.
// Shows a tiny on-screen toast the first time so users know it exists.
const TARGETS = {
  h: '#hero',
  s: '#science',
  p: '#pipeline',
  t: '#team',
  n: '#news',
  c: '#contact',
}

export default function KeyboardNav() {
  const [hint, setHint] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    let armTimer
    const onKey = (e) => {
      // Ignore when typing into a field
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      if (!armed) {
        if (e.key.toLowerCase() === 'g') {
          setArmed(true)
          setHint(true)
          clearTimeout(armTimer)
          armTimer = setTimeout(() => {
            setArmed(false)
            setHint(false)
          }, 1500)
        }
        return
      }

      const key = e.key.toLowerCase()
      const sel = TARGETS[key]
      setArmed(false)
      setHint(false)
      if (!sel) return
      const el = document.querySelector(sel)
      if (!el) return
      e.preventDefault()
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(armTimer)
    }
  }, [armed])

  if (!hint) return null

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 18px',
        borderRadius: '999px',
        background: 'rgba(12,26,36,0.92)',
        border: '1px solid rgba(212,107,26,0.25)',
        backdropFilter: 'blur(12px)',
        color: '#e0eaf0',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
        animation: 'kbd-hint-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <kbd style={kbdStyle}>g</kbd>
      <span style={{ opacity: 0.7 }}>then</span>
      <kbd style={kbdStyle}>h</kbd>
      <kbd style={kbdStyle}>s</kbd>
      <kbd style={kbdStyle}>p</kbd>
      <kbd style={kbdStyle}>t</kbd>
      <kbd style={kbdStyle}>n</kbd>
      <kbd style={kbdStyle}>c</kbd>
      <style>{`
        @keyframes kbd-hint-in {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  )
}

const kbdStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '22px',
  height: '22px',
  padding: '0 6px',
  borderRadius: '6px',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#f0a040',
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: '0.7rem',
  fontWeight: 700,
}
