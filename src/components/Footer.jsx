import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--color-midnight)', overflow: 'hidden' }}>
      {/* Massive Watermark */}
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', opacity: 0.02, pointerEvents: 'none', transform: 'rotate(-15deg)' }}>
        <img src="/PLA_logos-01.svg" alt="" style={{ width: '100%' }} />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 10, paddingTop: '96px', paddingBottom: '48px' }}>
        
        {/* Top Massive CTA/Brand presense */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '64px', marginBottom: '64px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/PLA_logos-02.svg" alt="Platypus Bio" style={{ width: '64px', height: '64px', objectFit: 'contain', filter: 'brightness(1.15) drop-shadow(0 4px 12px rgba(212,107,26,0.3))' }} />
            <img src="/PLA_logos-03.svg" alt="platypusbio" style={{ height: '24px', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.95)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '800px' }}>
            Decoding the molecular intelligence of <span className="gradient-text-warm">Australia.</span>
          </h2>
        </div>

        {/* Links Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', marginBottom: '80px' }}>
          
          <div style={{ gridColumn: 'span 5' }}>
            <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.75, maxWidth: '360px' }}>
              We translate biological dark matter from Earth's most isolated ecosystems into next-generation precision medicines and RNA therapeutics.
            </p>
          </div>

          <div style={{ gridColumn: 'span 3', gridColumnStart: 7 }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { to: '/#narrative', label: 'The Edge' },
                { to: '/#pipeline', label: 'Pipeline' },
                { to: '/#team', label: 'Team' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ color: '#7e99a8', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#d46b1a'}
                  onMouseLeave={(e) => e.target.style.color = '#7e99a8'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Headquarters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:info@platypusbio.com" style={{ color: '#7e99a8', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#7e99a8'}>info@platypusbio.com</a>
              <p style={{ color: '#7e99a8', fontSize: '0.9375rem' }}>Sydney, Australia</p>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {[
                  { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#7e99a8', transition: 'all 0.3s', textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#d46b1a'; e.currentTarget.style.borderColor = 'rgba(212,107,26,0.3)'; e.currentTarget.style.background = 'rgba(212,107,26,0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#7e99a8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={social.path}/></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ color: '#3a5a6c', fontSize: '0.75rem', fontWeight: 500 }}>
            © {new Date().getFullYear()} Platypus Bio Pty Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Privacy Policy', 'Terms of Service'].map((text) => (
              <a key={text} href="#" style={{ color: '#3a5a6c', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#7e99a8'}
                onMouseLeave={(e) => e.target.style.color = '#3a5a6c'}
              >{text}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid > div {
            grid-column: span 12 !important;
          }
          .footer-grid > div:nth-child(2) {
            margin-top: 32px;
          }
        }
      `}</style>
    </footer>
  )
}
