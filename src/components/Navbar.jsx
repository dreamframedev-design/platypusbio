import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { to: '#science', label: 'The Science' },
  { to: '#pipeline', label: 'Pipeline' },
  { to: '#team', label: 'Team' },
  { to: '#news', label: 'News' },
  { to: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      // Detect when we've scrolled past the light hero section into dark
      setPastHero(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLightNavSurface = true

  const logoFilter = 'brightness(0) opacity(0.85)'

  const linkClass = 'text-slate-600 hover:text-slate-900 font-medium'

  const activePillBg = 'bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'

  const mobileBtnClass = 'bg-white/80 border border-slate-200 text-slate-800'

  const mobileSheetClass = 'bg-white/95 border-b border-slate-200'

  const mobileLinkClass = 'text-slate-600 hover:text-slate-900'

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    setMenuOpen(false)
    
    if (location.pathname !== '/') {
      navigate(`/${hash}`)
      return
    }

    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      id="navbar"
      className="fixed top-[24px] left-1/2 -translate-x-1/2 w-[94%] max-w-[1100px] z-[100] pointer-events-none flex justify-between lg:justify-center items-center"
    >
      {/* Universal Floating Pill Container */}
      <div 
        className={`pointer-events-auto flex items-center justify-between lg:justify-center w-full lg:w-auto transition-all duration-700 ease-out-expo rounded-full ${activePillBg} px-[20px] lg:px-[32px] py-[8px] lg:gap-[28px]`}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="hoverable flex items-center no-underline transition-all duration-500 ease-out-expo rounded-full shrink-0"
        >
          <img
            src="/PLA_logos-03.svg"
            alt="Platypus Bio"
            className="h-[30px] lg:h-[34px] object-contain transition-all duration-500"
            style={{ filter: logoFilter }}
          />
        </Link>

        {/* Center: Links */}
        <div className="hidden lg:flex items-center gap-[32px]">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={location.pathname === '/' ? link.to : `/${link.to}`}
              onClick={(e) => handleNavClick(e, link.to)}
              className={`hoverable text-[0.8125rem] font-semibold tracking-[0.05em] no-underline uppercase transition-colors duration-300 whitespace-nowrap ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden lg:block shrink-0">
          <a
            href={location.pathname === '/' ? '#contact' : '/#contact'}
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hoverable inline-flex items-center justify-center px-[20px] py-[8px] text-[0.8125rem] font-bold tracking-wide rounded-full bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`lg:hidden hoverable p-[10px] rounded-full cursor-pointer pointer-events-auto backdrop-blur-[24px] shadow-sm transition-all duration-300 shrink-0 ${mobileBtnClass}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 12h16M4 6h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className={`lg:hidden absolute top-[-24px] left-1/2 -translate-x-1/2 w-[100vw] pt-[120px] pb-[40px] px-[32px] backdrop-blur-[32px] z-[-1] pointer-events-auto shadow-2xl transition-all duration-500 ${mobileSheetClass}`}
        >
          <div className="flex flex-col gap-[28px] text-center max-w-[400px] mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={location.pathname === '/' ? link.to : `/${link.to}`}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`text-[1.35rem] font-bold py-[8px] no-underline tracking-[0.03em] uppercase transition-colors ${mobileLinkClass}`}
              >
                {link.label}
              </a>
            ))}
            <a href={location.pathname === '/' ? '#contact' : '/#contact'} onClick={(e) => handleNavClick(e, '#contact')} className="cta-button self-center mt-[24px] px-[32px] py-[16px] text-[1.1rem] rounded-full shadow-lg">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
