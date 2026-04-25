import { useState, useEffect } from 'react'

const navLinks = [
  { to: '#science', label: 'The Science' },
  { to: '#pipeline', label: 'Pipeline' },
  { to: '#team', label: 'Team' },
  { to: '#partners', label: 'Partners' },
  { to: '#news', label: 'News' },
  { to: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      // Detect when we've scrolled past the light hero section into dark
      setPastHero(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Light nav when on hero, dark nav when past hero
  const isLightNavSurface = !pastHero

  const logoFilter = isLightNavSurface
    ? 'brightness(0) opacity(0.85)'
    : 'brightness(0) invert(1) opacity(0.95)'

  const logoWrapClass = isLightNavSurface
    ? scrolled
      ? 'bg-white/80 backdrop-blur-[24px] px-[24px] py-[12px] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
      : 'bg-transparent px-0 border border-transparent'
    : scrolled
      ? 'bg-[rgba(12,26,36,0.75)] backdrop-blur-[24px] px-[24px] py-[12px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
      : 'bg-transparent px-0 border border-transparent'

  const pillClass = isLightNavSurface
    ? scrolled
      ? 'bg-white/90 border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.05)]'
      : 'bg-white/50 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
    : scrolled
      ? 'bg-[rgba(12,26,36,0.75)] border border-[rgba(255,255,255,0.08)] shadow-[0_12px_40px_rgba(0,0,0,0.3)]'
      : 'bg-[rgba(12,26,36,0.3)] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'

  const linkClass = isLightNavSurface
    ? 'text-slate-500 hover:text-slate-900'
    : 'text-[#7e99a8] hover:text-white'

  const mobileBtnClass = isLightNavSurface
    ? 'bg-white/90 border border-slate-200 text-slate-800'
    : 'bg-[rgba(12,26,36,0.8)] border border-[rgba(255,255,255,0.1)] text-white'

  const mobileSheetClass = isLightNavSurface
    ? 'bg-white/95 border-b border-slate-200'
    : 'bg-[rgba(12,26,36,0.98)] border-b border-[rgba(255,255,255,0.05)]'

  const mobileLinkClass = isLightNavSurface
    ? 'text-slate-600 hover:text-slate-900'
    : 'text-[#7e99a8] hover:text-white'

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      id="navbar"
      className="fixed top-[24px] left-0 right-0 z-[100] pointer-events-none"
    >
      <div className="section-container flex items-center justify-between h-[64px] pointer-events-auto">

        {/* Left: Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className={`hoverable flex items-center no-underline transition-all duration-400 ease-out-expo rounded-full ${logoWrapClass}`}
        >
          <img
            src="/PLA_logos-03.svg"
            alt="Platypus Bio"
            className="h-[32px] object-contain"
            style={{ filter: logoFilter }}
          />
        </a>

        {/* Center: Frosted Glass Pill Links */}
        <div
          className={`hidden lg:flex items-center gap-[28px] rounded-full px-[28px] py-[12px] transition-all duration-400 ease-out-expo backdrop-blur-[24px] ${pillClass}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              onClick={(e) => handleNavClick(e, link.to)}
              className={`hoverable text-[0.75rem] font-semibold tracking-[0.04em] no-underline uppercase transition-colors ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`cta-button hoverable px-[28px] py-[12px] text-[0.8125rem] rounded-full transition-all duration-400 ${scrolled ? 'shadow-[0_16px_32px_rgba(212,107,26,0.15)]' : 'shadow-none'}`}
          >
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`lg:hidden hoverable p-[12px] rounded-full cursor-pointer pointer-events-auto backdrop-blur-[24px] shadow-sm ${mobileBtnClass}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 12h16M4 6h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`lg:hidden absolute top-[-24px] left-0 right-0 pt-[104px] pb-[40px] px-[32px] backdrop-blur-[24px] z-[-1] pointer-events-auto shadow-xl ${mobileSheetClass}`}
        >
          <div className="flex flex-col gap-[24px] text-center">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`text-[1.25rem] font-medium py-[8px] no-underline tracking-[0.02em] uppercase ${mobileLinkClass}`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="cta-button self-center mt-[16px] rounded-full">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
