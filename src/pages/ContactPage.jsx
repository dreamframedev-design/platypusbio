import { useState, useRef, useEffect } from 'react'

export default function ContactPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [institution, setInstitution] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)

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
    if (email.trim() && name.trim()) {
      setSubmitted(true)
      setEmail('')
      setName('')
      setInstitution('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <main ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', paddingTop: '160px', paddingBottom: '128px', overflow: 'hidden' }}>
      {/* Massive Background SVG */}
      <div 
        style={{ 
          position: 'absolute', top: '10%', right: '-20%', opacity: 0.02, 
          width: '1200px', height: '1200px', transform: 'rotate(15deg)', 
          pointerEvents: 'none', zIndex: 0 
        }}
      >
        <img src="/PLA_logos-01.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ position: 'absolute', top: '20%', left: '0%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(212,107,26,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)', gap: '80px', alignItems: 'flex-start' }}>
          
          {/* Left Side: Context */}
          <div className="reveal" style={{ top: '160px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '32px', padding: '8px 24px', borderRadius: '9999px',
              border: '1px solid rgba(212,107,26,0.15)',
              background: 'rgba(212,107,26,0.04)',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 12px rgba(212,107,26,0.5)' }} />
              <span style={{ color: '#d46b1a', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Contact & Collaboration
              </span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px' }}>
              Let's map the <br/> <span className="gradient-text-warm">unknown.</span>
            </h1>

            <p style={{ color: '#7e99a8', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px' }}>
              Whether you're looking to partner on therapeutic discovery, request early access to our platform, or join our growing team of pioneers — we're ready to collaborate.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Headquarters</h3>
                <p style={{ color: '#7e99a8', fontSize: '1rem' }}>
                  Sydney, Australia<br/>
                  Gadigal Land
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>General Inquiries</h3>
                <a href="mailto:hello@platypusbio.com" className="hoverable" style={{ color: '#2dd4bf', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#2dd4bf'}>
                  hello@platypusbio.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="reveal delay-200 glass-card" style={{ padding: '48px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg style={{ width: '32px', height: '32px', color: '#2dd4bf' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Transmission Received</h3>
                <p style={{ color: '#7e99a8', fontSize: '1rem' }}>We've received your message and will route it to the appropriate team member.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 500 }}>Full Name *</label>
                    <input 
                      id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                      style={{ 
                        width: '100%', padding: '16px', background: 'rgba(18, 34, 48, 0.5)', border: '1px solid rgba(255,255,255,0.06)', 
                        borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.3s' 
                      }} 
                      onFocus={e => { e.target.style.borderColor = 'rgba(212,107,26,0.4)'; e.target.style.background = 'rgba(18, 34, 48, 0.8)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(18, 34, 48, 0.5)'; }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 500 }}>Email Address *</label>
                    <input 
                      id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      style={{ 
                        width: '100%', padding: '16px', background: 'rgba(18, 34, 48, 0.5)', border: '1px solid rgba(255,255,255,0.06)', 
                        borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.3s' 
                      }} 
                      onFocus={e => { e.target.style.borderColor = 'rgba(212,107,26,0.4)'; e.target.style.background = 'rgba(18, 34, 48, 0.8)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(18, 34, 48, 0.5)'; }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="institution" style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 500 }}>Organization / Institution</label>
                  <input 
                    id="institution" type="text" value={institution} onChange={e => setInstitution(e.target.value)}
                    style={{ 
                      width: '100%', padding: '16px', background: 'rgba(18, 34, 48, 0.5)', border: '1px solid rgba(255,255,255,0.06)', 
                      borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.3s' 
                    }} 
                    onFocus={e => { e.target.style.borderColor = 'rgba(212,107,26,0.4)'; e.target.style.background = 'rgba(18, 34, 48, 0.8)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(18, 34, 48, 0.5)'; }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="message" style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 500 }}>How can we help?</label>
                  <textarea 
                    id="message" rows="5" value={message} onChange={e => setMessage(e.target.value)}
                    style={{ 
                      width: '100%', padding: '16px', background: 'rgba(18, 34, 48, 0.5)', border: '1px solid rgba(255,255,255,0.06)', 
                      borderRadius: '12px', color: '#ffffff', outline: 'none', transition: 'all 0.3s', resize: 'vertical'
                    }} 
                    onFocus={e => { e.target.style.borderColor = 'rgba(212,107,26,0.4)'; e.target.style.background = 'rgba(18, 34, 48, 0.8)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(18, 34, 48, 0.5)'; }}
                  />
                </div>

                <button type="submit" className="cta-button hoverable" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                  <span>Initiate Contact</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact-grid {
            grid-template-columns: 1fr !important;
          }
          #contact-grid > div:first-child {
            padding-right: 0 !important;
          }
        }
        @media (max-width: 600px) {
          form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
