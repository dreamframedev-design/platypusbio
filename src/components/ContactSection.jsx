import { useState, useEffect, useRef } from 'react'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      setSubmitted(true)
      setName('')
      setOrganization('')
      setEmail('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const inputStyles = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px 18px',
    background: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(212,107,26,0.4)'
    e.target.style.background = 'rgba(212,107,26,0.03)'
    e.target.style.boxShadow = '0 0 20px rgba(212,107,26,0.06)'
  }
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(0,0,0,0.1)'
    e.target.style.background = 'rgba(0, 0, 0, 0.02)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '160px', overflow: 'hidden', backgroundColor: '#fbfbf9' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', height: '500px', pointerEvents: 'none' }}>
        <div className="ambient-glow" style={{ width: '100%', height: '100%', background: 'rgba(212,107,26,0.025)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)', gap: '80px', alignItems: 'flex-start' }}>

          {/* Left: Section Info */}
          <div className="reveal">
            <p style={{ color: '#d46b1a', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Join the Frontier
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '32px' }}>
              Get in{' '}
              <span className="gradient-text-cool">Touch</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.8, fontWeight: 300 }}>
                We are a pre-clinical biotechnology company developing TRICK, a first-in-class programmable CRISPR platform technology that kills cells based upon their transcriptome. The TRICK platform forms the intersection of precision and programmability
              </p>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.8, fontWeight: 300 }}>
                If you are a potential investor, pharma partner, or scientific collaborator, we want to hear from you.
              </p>
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ color: '#0f172a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Email</h4>
                <a href="mailto:info@platypusbio.com" className="hoverable" style={{ color: '#d46b1a', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#f0a040'}
                  onMouseLeave={e => e.target.style.color = '#d46b1a'}
                >
                  info@platypusbio.com
                </a>
              </div>
              <div>
                <h4 style={{ color: '#0f172a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Location</h4>
                <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 300 }}>Sydney, Australia</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal glass-card-light" style={{ padding: '48px', transitionDelay: '0.15s' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(212, 107, 26, 0.1)',
                  border: '1px solid rgba(212, 107, 26, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <svg style={{ width: '32px', height: '32px', color: '#d46b1a' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Message Received</h3>
                <p style={{ color: '#475569', fontSize: '1rem' }}>Thank you for reaching out. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="contact-name" style={{ color: '#475569', fontSize: '0.8125rem', fontWeight: 600 }}>Name *</label>
                  <input
                    id="contact-name" type="text" required
                    value={name} onChange={e => setName(e.target.value)}
                    style={inputStyles}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                {/* Organization */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="contact-org" style={{ color: '#475569', fontSize: '0.8125rem', fontWeight: 600 }}>Organization</label>
                  <input
                    id="contact-org" type="text"
                    value={organization} onChange={e => setOrganization(e.target.value)}
                    style={inputStyles}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="contact-email" style={{ color: '#475569', fontSize: '0.8125rem', fontWeight: 600 }}>Email *</label>
                  <input
                    id="contact-email" type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={inputStyles}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="contact-message" style={{ color: '#475569', fontSize: '0.8125rem', fontWeight: 600 }}>Message</label>
                  <textarea
                    id="contact-message" rows="5"
                    value={message} onChange={e => setMessage(e.target.value)}
                    style={{ ...inputStyles, resize: 'vertical' }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                <button type="submit" className="cta-button hoverable" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>
                  <span>Send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-simple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .ambient-glow {
          animation: float-simple 8s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
