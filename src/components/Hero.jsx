import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetagenomeCanvas from './MetagenomeCanvas'

export default function Hero({ cursorPos }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <MetagenomeCanvas cursorPos={cursorPos} />

      {/* Massive ambient background logo */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(5deg)', opacity: 0.02, width: '140vw', height: '140vh', pointerEvents: 'none', zIndex: 0 }}>
        <img src="/PLA_logos-01.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Gradient overlays — lightened to let network canvas show through */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,26,36,0.15), transparent 35%, var(--color-midnight))', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent, rgba(12,26,36,0.6))', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '960px', margin: '140px auto 0', padding: '0 32px' }}>
        {/* Animated Platypus Logo Mark — "dives in" on load */}
        <div className="logo-platypus" style={{ marginBottom: '40px' }}>
          <div className="logo-platypus-hover" style={{ display: 'inline-block' }}>
            <img
              src="/PLA_logos-02.svg"
              alt="Platypus Bio"
              style={{
                width: '110px',
                height: '110px',
                objectFit: 'contain',
                filter: 'brightness(1.2) drop-shadow(0 8px 32px rgba(191, 87, 0, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-up delay-200" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          marginBottom: '32px', padding: '8px 24px', borderRadius: '9999px',
          border: '1px solid rgba(212,107,26,0.15)',
          background: 'rgba(12, 26, 36, 0.7)',
          backdropFilter: 'blur(16px)',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 12px rgba(212,107,26,0.6)' }} />
          <span style={{ color: '#7e99a8', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Australian Deep-Tech Bioplatform
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-300" style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          fontWeight: 800, color: '#ffffff',
          lineHeight: 1.05, letterSpacing: '-0.04em',
          marginBottom: '28px',
        }}>
          Unlocking the Potential of{' '}
          <span className="gradient-text-warm">Australian Metagenomes</span>{' '}
          for Precision Medicine
        </h1>

        {/* Sub */}
        <p className="animate-fade-in-up delay-400" style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          color: '#7e99a8', maxWidth: '600px', margin: '0 auto 48px',
          lineHeight: 1.8, fontWeight: 300, letterSpacing: '0.01em',
        }}>
          We decode the molecular intelligence hidden within Australia's unique ecosystems — transforming metagenomic data into next-generation RNA therapeutics and diagnostics.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-500" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <Link to="/contact" className="cta-button hoverable">
            <span>Join the Frontier</span>
            <svg style={{ width: '16px', height: '16px', position: 'relative', zIndex: 1 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/#narrative"
            className="hoverable"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', color: '#7e99a8',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', fontSize: '0.875rem', fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.4s',
              backdropFilter: 'blur(8px)', background: 'rgba(12,26,36,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(212,107,26,0.25)'; e.currentTarget.style.background = 'rgba(12,26,36,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#7e99a8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(12,26,36,0.3)'; }}
          >
            Explore the Science
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in delay-800" style={{ marginTop: '80px' }}>
          <div style={{
            width: '24px', height: '42px', borderRadius: '9999px',
            border: '2px solid rgba(126,153,168,0.2)',
            display: 'flex', paddingTop: '8px', justifyContent: 'center',
            margin: '0 auto',
          }}>
            <div style={{
              width: '3px', height: '10px', borderRadius: '9999px',
              background: 'linear-gradient(to bottom, #d46b1a, transparent)',
              animation: 'float 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
