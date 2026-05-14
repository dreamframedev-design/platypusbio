import { useEffect, useState } from 'react'

// First-paint reveal. Two-panel orange curtain with the wordmark logo, then
// it slices apart and the content drops in. Only runs on the initial mount of
// the home route — sessionStorage flag suppresses it on subsequent navigations.
export default function LoadingCurtain() {
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('platypus_curtain_done') === '1') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      sessionStorage.setItem('platypus_curtain_done', '1')
      return
    }

    document.body.style.overflow = 'hidden'
    setPhase('show')

    const t1 = setTimeout(() => setPhase('split'), 900)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      sessionStorage.setItem('platypus_curtain_done', '1')
    }, 1900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'idle' || phase === 'done') return null

  const isSplit = phase === 'split'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        pointerEvents: 'none',
      }}
    >
      {/* Top panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, #0c1a24 0%, #122230 100%)',
          transform: isSplit ? 'translateY(-101%)' : 'translateY(0)',
          transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
        }}
      />
      {/* Bottom panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(0deg, #0c1a24 0%, #122230 100%)',
          transform: isSplit ? 'translateY(101%)' : 'translateY(0)',
          transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
        }}
      />

      {/* Centerpiece logo + accent line */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          opacity: isSplit ? 0 : 1,
          transform: isSplit ? 'scale(0.92)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        <img
          src="/PLA_logos-02.svg"
          alt=""
          style={{
            width: '120px',
            height: '120px',
            filter: 'brightness(0) invert(1)',
            opacity: 0.95,
            animation: 'curtain-logo-float 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
        <div
          style={{
            width: '180px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #d46b1a, #f0a040, #2dd4bf, transparent)',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            animation: 'curtain-line-grow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
          }}
        />
        <p
          style={{
            margin: 0,
            color: '#b8cdd6',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            opacity: 0,
            animation: 'curtain-fade-in 0.7s ease 0.55s forwards',
          }}
        >
          Platypus Bio
        </p>
      </div>

      <style>{`
        @keyframes curtain-logo-float {
          0% { opacity: 0; transform: translateY(20px) scale(0.85); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes curtain-line-grow {
          to { transform: scaleX(1); }
        }
        @keyframes curtain-fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
