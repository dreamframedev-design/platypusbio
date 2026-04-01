import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed', top: '24px', left: 0, right: 0, zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', pointerEvents: 'auto' }}>
        
        {/* Left: Logo */}
        <Link to="/" className="hoverable" style={{ 
          display: 'flex', alignItems: 'center', textDecoration: 'none', 
          background: scrolled ? 'rgba(12, 26, 36, 0.75)' : 'transparent', 
          backdropFilter: scrolled ? 'blur(24px)' : 'none', 
          padding: scrolled ? '12px 24px' : '0', 
          borderRadius: '32px', 
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent', 
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}>
          <img src="/PLA_logos-03.svg" alt="Platypus Bio" style={{ height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.95)' }} />
        </Link>

        {/* Center: Frosted Glass Pill Links */}
        <div className="hidden md:flex" style={{ 
          alignItems: 'center', gap: '40px',
          background: scrolled ? 'rgba(12, 26, 36, 0.75)' : 'rgba(12, 26, 36, 0.3)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '9999px',
          padding: '12px 36px',
          boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {[
            { to: '/#narrative', label: 'The Edge' },
            { to: '/#pipeline', label: 'Pipeline' },
            { to: '/#team', label: 'Team' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hoverable"
              style={{
                color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 600,
                letterSpacing: '0.04em', textDecoration: 'none',
                transition: 'color 0.3s', textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#7e99a8'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:block">
          <Link to="/contact" className="cta-button hoverable" style={{ padding: '12px 28px', fontSize: '0.8125rem', borderRadius: '9999px', boxShadow: scrolled ? '0 16px 32px rgba(212,107,26,0.15)' : 'none' }}>
            <span>Join the Frontier</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden hoverable"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#ffffff', background: 'rgba(12, 26, 36, 0.8)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', cursor: 'pointer', padding: '12px', pointerEvents: 'auto' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 12h16M4 6h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" style={{
          background: 'rgba(12, 26, 36, 0.98)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 32px 40px',
          position: 'absolute', top: '-24px', left: 0, right: 0, zIndex: -1,
          pointerEvents: 'auto',
          paddingTop: '104px' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>
            {[
              { to: '/#narrative', label: 'The Edge' },
              { to: '/#pipeline', label: 'Pipeline' },
              { to: '/#team', label: 'Team' },
            ].map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{ color: '#7e99a8', fontSize: '1.25rem', fontWeight: 500, padding: '8px 0', textDecoration: 'none', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="cta-button" style={{ display: 'inline-flex', alignSelf: 'center', marginTop: '16px', borderRadius: '9999px' }}>
              <span>Join the Frontier</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
