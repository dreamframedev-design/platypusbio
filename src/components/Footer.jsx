import { useState, useEffect, useRef } from 'react'

const BokehParticles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        
        // Varying sizes for depth of field effect - tailored for footer (smaller, sharper)
        const sizeCategory = Math.random()
        if (sizeCategory > 0.95) {
          this.size = Math.random() * 2.5 + 1.5 // Largest are 1.5 to 4px
          this.blur = Math.random() * 1 + 0.5
          this.speedX = (Math.random() - 0.5) * 0.05
          this.speedY = (Math.random() - 0.5) * 0.05
        } else if (sizeCategory > 0.5) {
          this.size = Math.random() * 1.5 + 0.8 // Medium are 0.8 to 2.3px
          this.blur = Math.random() * 0.5
          this.speedX = (Math.random() - 0.5) * 0.1
          this.speedY = (Math.random() - 0.5) * 0.1
        } else {
          this.size = Math.random() * 0.8 + 0.3 // Tiny are 0.3 to 1.1px
          this.blur = 0
          this.speedX = (Math.random() - 0.5) * 0.15
          this.speedY = (Math.random() - 0.5) * 0.15
        }
        
        this.baseOpacity = Math.random() * 0.5 + 0.5 // Significantly higher opacity
        this.opacity = this.baseOpacity
        this.pulseSpeed = Math.random() * 0.008 + 0.003 // Faster pulse
        this.pulseDir = Math.random() > 0.5 ? 1 : -1
        
        // Orange/gold colors matching the image
        const colors = [
          '240, 160, 64',  // Gold/Orange
          '212, 107, 26',  // Deep Orange
          '255, 190, 100', // Light Gold
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around
        if (this.x < -50) this.x = canvas.width + 50
        if (this.x > canvas.width + 50) this.x = -50
        if (this.y < -50) this.y = canvas.height + 50
        if (this.y > canvas.height + 50) this.y = -50

        // Pulse opacity
        this.opacity += this.pulseSpeed * this.pulseDir
        if (this.opacity >= this.baseOpacity + 0.4) this.pulseDir = -1
        if (this.opacity <= Math.max(0, this.baseOpacity - 0.3)) this.pulseDir = 1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        
        // Create radial gradient for softer edges on larger particles
        if (this.blur > 0) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
          )
          gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
          gradient.addColorStop(1, `rgba(${this.color}, 0)`)
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        }
        
        ctx.fill()
        
        // Add a soft glow
        if (this.blur === 0) {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(${this.color}, ${this.opacity * 1.5})`
        } else {
          ctx.shadowBlur = 0
        }
      }
    }

    // Create particles
    const particles = Array.from({ length: 200 }, () => new Particle())

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
    />
  )
}

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
    <footer style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-midnight)', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      
      {/* Massive 3D background element */}
      <div className="absolute inset-0 z-0 animate-ambient-drift" style={{ backgroundImage: 'url("/heros/rna-crisper-hero (6).webp")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.85, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-midnight) 0%, rgba(12,26,36,0.3) 25%, rgba(12,26,36,0.8) 70%, var(--color-midnight) 100%)', pointerEvents: 'none' }} />
      
      {/* Bokeh Particles */}
      <BokehParticles />

      <div className="section-container reveal" style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: '160px 48px 0' }}>
        
        {/* Giant CTA Area */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '160px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '80px 40px',
          background: 'rgba(12, 26, 36, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '3rem',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle inner glow */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: '1000px', margin: '0 auto 32px' }}>
              <span style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>Transforming medicine with</span> <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#d46b1a] to-[#e88430] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 2px 0px rgba(0,0,0,0.8))' }}>precision cell killing.</span>
            </h2>
            
            <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', fontWeight: 300, color: '#b8cdd6', maxWidth: '700px', margin: '0 auto 56px', lineHeight: 1.6, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              A first-in-class programmable CRISPR platform technology.
            </p>
            
            <a href="#contact" className="hoverable inline-flex items-center justify-center gap-3 px-[40px] py-[18px] rounded-full bg-gradient-to-r from-[#d46b1a] to-[#f0a040] text-white font-bold text-[1.125rem] shadow-[0_8px_32px_rgba(212,107,26,0.3)] hover:shadow-[0_16px_48px_rgba(212,107,26,0.5)] hover:-translate-y-1 transition-all duration-300">
              <span>Get in Touch</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>

        {/* Structured Columns */}
        <div className="footer-grid-main" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          
          {/* Left Col - About */}
          <div style={{ gridColumn: 'span 5', paddingRight: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <img src="/PLA_logo.svg" alt="Platypus Mark" style={{ height: '36px', width: '36px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <img src="/PLA_logos-03.svg" alt="platypusbio" style={{ height: '24px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ color: '#b8cdd6', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
              We are a pre-clinical biotechnology company developing TRICK, a first-in-class programmable CRISPR platform technology that kills cells based upon their transcriptome.
            </p>
          </div>

          {/* Middle Col - Navigation */}
          <div style={{ gridColumn: 'span 4' }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, marginBottom: '32px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Navigation</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  style={{ color: '#b8cdd6', fontSize: '1.0625rem', textDecoration: 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '12px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#b8cdd6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <span style={{ width: '16px', height: '1px', backgroundColor: '#d46b1a', opacity: 0.5 }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Col - Contact */}
          <div style={{ gridColumn: 'span 3' }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, marginBottom: '32px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <span style={{ display: 'block', color: '#7e99a8', fontSize: '0.75rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Email</span>
                <a href="mailto:info@platypusbio.com" className="group relative inline-block text-white text-[1.125rem] font-light" style={{ textDecoration: 'none' }}>
                  info@platypusbio.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d46b1a] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
              <div>
                <span style={{ display: 'block', color: '#7e99a8', fontSize: '0.75rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Location</span>
                <span style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 300 }}>Sydney, Australia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ padding: '32px 0 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <p style={{ color: '#7e99a8', fontSize: '0.875rem', fontWeight: 400 }}>
            © {new Date().getFullYear()} Platypus Bio Pty Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            {['Privacy Policy', 'Terms of Service'].map((text) => (
              <a key={text} href="#" style={{ color: '#7e99a8', fontSize: '0.875rem', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#7e99a8'}
              >{text}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-main {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .footer-grid-main > div {
            grid-column: span 1 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}
