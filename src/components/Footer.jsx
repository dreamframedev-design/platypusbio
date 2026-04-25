export default function Footer() {
  const navLinks = [
    { to: '#science', label: 'The Science' },
    { to: '#pipeline', label: 'Pipeline' },
    { to: '#team', label: 'Team' },
    { to: '#partners', label: 'Partners' },
    { to: '#news', label: 'News' },
    { to: '#contact', label: 'Contact' },
  ]

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--color-midnight)', overflow: 'hidden' }}>
      {/* Massive Watermark */}
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', opacity: 0.02, pointerEvents: 'none', transform: 'rotate(-15deg)' }}>
        <img src="/PLA_logos-01.svg" alt="" style={{ width: '100%' }} />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 10, paddingTop: '96px', paddingBottom: '48px' }}>
        
        {/* Top Brand */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '64px', marginBottom: '64px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="/PLA_logos-02.svg" alt="Platypus Bio" style={{ width: '80px', height: '80px', objectFit: 'contain', filter: 'brightness(1.15) drop-shadow(0 4px 12px rgba(212,107,26,0.3))' }} />
            <img src="/PLA_logos-03.svg" alt="platypusbio" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.95)' }} />
          </div>
          <p style={{ fontSize: '1.0625rem', color: '#7e99a8', lineHeight: 1.75, maxWidth: '520px' }}>
            Transforming medicine with precision cell killing. A first-in-class programmable CRISPR platform technology.
          </p>
        </div>

        {/* Links Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', marginBottom: '80px' }}>
          
          <div style={{ gridColumn: 'span 5' }}>
            <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.75, maxWidth: '380px' }}>
              We are a pre-clinical biotechnology company developing TRICK, a first-in-class programmable CRISPR platform technology that kills cells based upon their transcriptome.
            </p>
          </div>

          <div style={{ gridColumn: 'span 3', gridColumnStart: 7 }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  style={{ color: '#7e99a8', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#d46b1a'}
                  onMouseLeave={(e) => e.target.style.color = '#7e99a8'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:info@platypusbio.com" style={{ color: '#7e99a8', fontSize: '0.9375rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#7e99a8'}>info@platypusbio.com</a>
              <p style={{ color: '#7e99a8', fontSize: '0.9375rem' }}>Sydney, Australia</p>
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
