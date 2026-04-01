import { useState, useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '128px' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'rgba(212,107,26,0.03)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        <div className="reveal" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '32px', padding: '8px 24px', borderRadius: '9999px',
            border: '1px solid rgba(212,107,26,0.15)',
            background: 'rgba(212,107,26,0.04)',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 12px rgba(212,107,26,0.5)' }} />
            <span style={{ color: '#d46b1a', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Early Access
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '24px' }}>
            Join the Frontier
          </h2>
          <p style={{ color: '#7e99a8', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '48px' }}>
            We're assembling a coalition of scientists, clinicians, and visionaries who believe the next great therapeutic breakthrough is already encoded in the Earth beneath our feet.
          </p>

          <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto 32px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institution.edu"
                required
                style={{
                  flex: 1, padding: '16px 20px',
                  background: '#122230', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', color: '#ffffff', fontSize: '0.875rem', fontWeight: 500,
                  outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(212,107,26,0.4)'; e.target.style.boxShadow = '0 0 20px rgba(212,107,26,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="submit" className="cta-button hoverable" style={{ borderRadius: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <span>{submitted ? '✓ Joined' : 'Request Access'}</span>
              </button>
            </div>
          </form>

          {submitted && (
            <p className="animate-fade-in" style={{ color: '#2dd4bf', fontSize: '0.875rem', fontWeight: 500, marginBottom: '16px' }}>
              Welcome to the frontier. We'll be in touch.
            </p>
          )}

          <p style={{ color: '#2a4052', fontSize: '0.6875rem', letterSpacing: '0.02em' }}>
            By joining, you agree to receive occasional research updates. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #contact form > div {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  )
}
