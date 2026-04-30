import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const BokehParticles = ({ 
  colors = ['240, 160, 64', '212, 107, 26', '255, 190, 100'],
  particleCount = 200
}) => {
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
    const particles = Array.from({ length: particleCount }, () => new Particle())

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

const AnimatedPlatypusLogo = () => {
  return (
    <div className="group relative w-[72px] h-[72px] flex items-center justify-center cursor-pointer">
      {/* The SVG */}
      <svg 
        viewBox="0 0 358 349" 
        className="w-full h-full relative z-10 transition-all duration-500 group-hover:scale-105 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]"
      >
        <defs>
          <linearGradient id="platypus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="platypus-stop-1" />
            <stop offset="100%" className="platypus-stop-2" />
          </linearGradient>
        </defs>
        <g fill="url(#platypus-gradient)">
          <path d="M76.38,198.41c-.11,1.09-.8,1.75-1.27,2.52-.7,1.13-1.45,2.23-2.08,3.41-2.48,4.68-2.42,9.35-.13,14.13,2.39,4.98,6.01,8.74,10.65,11.6,3.47,2.15,7.08,4.04,10.77,5.78,4.44,2.09,8.84,4.26,13.26,6.41,11.87,5.77,21.9,13.86,30.26,24.04,9.34,11.37,16.73,23.82,20.9,38.02,1.5,5.13,2.43,10.36,2.26,15.75-.06,1.84-.28,3.66-.68,5.44-2.08,9.27-8.61,15.14-18,16.67-4.81.78-9.46.06-14.12-.8-21.62-4-40.61-13.66-57.47-27.51-29.47-24.21-48.33-55.04-56.38-92.35-3.34-15.49-3.92-31.16-2.44-46.94,1.79-18.96,7.54-36.74,15.64-53.87,6.24-13.19,13.23-25.95,21.72-37.84,13.55-18.98,30.35-34.34,50.81-45.69,17.55-9.73,35.77-17.69,55.3-22.49,12.17-2.99,24.51-4.71,37.04-4.7,34.77.02,65.34,11.58,92.03,33.69,5.46,4.52,10.54,9.44,15.17,14.82.73.85,1.38,1.67,1.11,2.89-.3,1.38-.87,2.59-2.4,2.87-1.49.27-2.84.26-4.05-1.13-8.85-10.2-19.15-18.71-30.6-25.84-16.85-10.49-35.12-17.01-54.84-19.36-18.76-2.23-37.22-.38-55.39,4.5-22.06,5.91-42.49,15.52-61.52,28.02-13.05,8.57-24.07,19.48-33.48,31.9-15.06,19.86-26.19,41.83-34.07,65.46-2.99,8.98-4.37,18.25-5.29,27.63-.79,8.05-1.08,16.09-.59,24.18,1.11,18.32,5.52,35.81,13.18,52.45,12.71,27.6,31.58,49.95,57.32,66.29,12.34,7.83,25.64,13.38,40.07,16.03,3.66.67,7.32,1.5,11.13.94,9-1.31,13.49-6.27,13.77-15.44.15-4.96-.78-9.78-2.24-14.49-4.08-13.25-11.17-24.81-19.96-35.43-8.56-10.35-19.24-17.79-31.3-23.46-6.32-2.97-12.72-5.79-18.76-9.33-5.76-3.38-10.89-7.46-13.97-13.54-3.08-6.08-3.39-12.29-.06-18.42,1.41-2.6,3.43-4.7,5.98-6.24.76-.46,1.55-1.02,2.72-.55Z"/>
          <path d="M328.38,126.15c-12.55-.31-23.18-5.36-32.54-13.39-5.36-4.6-9.65-10.09-12.75-16.46-.4-.81-.86-1.61-.71-2.6.21-1.41,1.18-2.6,2.42-2.87,1.76-.38,3.67.39,4.42,1.97,1.75,3.72,3.99,7.12,6.73,10.16,7.29,8.05,16.06,13.67,26.89,15.61,5.31.95,10.6.82,15.72-1.18,1.09-.43,2.09-1,3.09-1.61,3.37-2.06,3.76-6.49,1.94-9.21-1.4-2.1-3.18-3.84-5.06-5.48-4.22-3.67-8.87-6.74-13.54-9.78-6.98-4.53-13.59-9.58-20.17-14.67-.94-.73-2.72-1.7-2.15-2.69.73-1.26,2.4-.1,3.54.35,10.27,3.99,19.99,9.04,29,15.4,3.88,2.74,7.69,5.55,11,8.99,2.69,2.8,5,5.87,5.39,9.89.44,4.55-.8,8.55-4.33,11.67-3.83,3.4-8.5,4.79-13.41,5.51-1.8.27-3.63.51-5.47.39Z"/>
          <path d="M197.18,151.67c-1.47.72-2.67.35-3.69.02-11.47-3.78-19.8-11.02-23.03-22.86-2.1-7.69.31-14.71,6.11-20.25,5.36-5.12,12.32-4.88,17.6.34,1.07,1.06,2.01,2.22,2.81,3.49,5.46,8.66,13.4,13.92,23.07,16.79.71.21,1.45.25,2,.89.96,1.12,1.19,2.58.49,3.68-.75,1.17-2.02,1.73-3.43,1.34-10.52-2.91-19.29-8.43-25.72-17.39-.92-1.28-1.75-2.64-2.76-3.85-3.22-3.85-6.96-3.99-10.49-.46-4.41,4.4-5.73,11.66-2.79,17.32,3.7,7.12,8.83,13.06,15.5,17.62,1.42.97,3.03,1.71,4.34,3.32Z"/>
          <path d="M102.88,214.41c-1.29.64-2.36.15-3.27-.29-8.47-4.11-14.3-10.39-16.18-19.89-.35-1.77-.15-3.5.26-5.19,1.2-4.86,3.5-9.15,6.95-12.79.23-.24.46-.48.71-.7,5.35-4.84,11.25-4.15,15.29,1.8.84,1.24,1.57,2.55,2.43,3.78,3.85,5.51,9.08,9.18,15.34,11.48.77.28,1.62.38,2.17,1.11.85,1.13.98,2.7.24,3.73-.79,1.1-2.1,1.55-3.53,1.07-8.23-2.77-14.94-7.56-19.74-14.88-.82-1.25-1.56-2.57-2.49-3.74-1.49-1.88-2.82-2.08-4.73-.65-3.41,2.54-5.22,6.17-6.58,10.08-1.06,3.05-.25,5.88.92,8.7,2.29,5.57,5.67,10.33,10.3,14.21.51.43,1,.88,1.46,1.36.16.16.23.42.45.83Z"/>
          <path d="M279.42,103.24c-.88,1.21-2.05,1.4-3.15,1.7-5.15,1.41-10.37,1.18-15.6.7-7.52-.69-14.33-3.41-20.72-7.34-4.62-2.84-9.46-5.19-14.72-6.63-3.07-.84-6.16-1.44-9.34-1.32-1.54.06-2.53-.63-3.31-1.8-1.52-2.25-.1-5.1,2.64-5.23,3.68-.18,7.3.35,10.85,1.27,5.51,1.43,10.73,3.57,15.56,6.56,10.61,6.56,22.21,9.96,34.53,11.17,1.06.1,2.15.07,3.25.91Z"/>
          <path d="M118.37,172.71c.34-1.24,1.43-1.62,2.34-2.11,2.19-1.18,4.43-2.29,6.66-3.41,9-4.49,17.86-9.23,26.15-14.97,3.15-2.18,6.09-4.63,8.97-7.14.63-.55,1.24-1.11,2.1-1.28,1.61-.31,2.95.29,3.58,1.59.77,1.58.57,3.52-.59,4.57-2.65,2.4-5.43,4.64-8.29,6.79-10.32,7.74-21.64,13.27-34.38,15.69-1.39.26-2.78.53-4.17.71-.79.1-1.65.26-2.36-.44Z"/>
          <path d="M223.68,99.21c2.16.02,2.97,1.08,2.25,3.03-.48,1.32-1.16,2.61-2.27,3.52-2.82,2.32-5.67,4.6-8.56,6.83-1.42,1.09-2.85,1.07-4.14.18-1.26-.87-1.79-2.23-1.42-3.7.21-.83.67-1.51,1.34-2.04,2.79-2.23,5.57-4.45,8.36-6.68,1.33-1.06,2.93-1.01,4.44-1.14Z"/>
          <path d="M217.2,169.62c.14-.43.19-.77.34-1.04,2.04-3.54,1.52-6.99-.32-10.4-1.43-2.64-3.15-5.06-5.18-7.27-.39-.43-.81-.84-1.14-1.31-.63-.9-.36-1.79.34-2.47.71-.69,1.77-.97,2.49-.25,4.61,4.58,8.67,9.5,8.13,16.58-.18,2.29-1.21,4.3-3.07,5.78-.38.3-.76.67-1.59.39Z"/>
          <path d="M226.36,162.23c-.23-.47.01-.75.17-.99,1.93-2.85,1.46-5.66-.18-8.42-1.84-3.09-4.19-5.76-6.8-8.22-.48-.45-1.05-.86-1.4-1.41-.52-.83-.49-1.75.17-2.54.65-.78,1.88-.99,2.67-.29,4.03,3.52,7.81,7.26,9.25,12.66.78,2.93.67,5.78-1.64,8.13-.61.62-1.25,1.32-2.25,1.08Z"/>
          <path d="M132.22,226.74c.15-.51.22-.92.38-1.28,1.89-4.04,1.1-7.73-1.41-11.22-1.46-2.03-3.03-3.95-4.92-5.59-.5-.43-1.07-.83-1.45-1.36-.59-.81-.6-1.76.03-2.54.62-.76,1.52-1.01,2.47-.58,4.97,2.23,9.97,11.19,9.26,16.59-.29,2.22-1.28,4.1-2.95,5.59-.31.28-.63.55-1.41.38Z"/>
          <path d="M122.07,223.56c.34-3.5-1.15-6.28-3.44-8.76-1.42-1.54-1.36-2.3.14-3.66.72-.65,1.34-.82,2.11,0,2.25,2.38,4.19,4.95,4.97,8.22.58,2.42.24,4.63-1.75,6.37-.49.43-1.01,1.02-1.73.67-.64-.31-.37-1.02-.39-1.57-.02-.41.06-.83.09-1.24Z"/>
          <path d="M210.98,162.7c.03,2.64-.9,4.21-2.57,5.39-.42.3-.89.47-1.39.2-.56-.3-.5-.85-.39-1.32,1.02-4.18-.42-7.68-2.95-10.89-.41-.52-.95-1-.47-1.75.55-.85,1.16-1.64,2.18-1.94.37-.11.63.16.85.4,2.68,2.99,4.47,6.38,4.74,9.91Z"/>
          <path d="M115.99,222.91c-.14,1.4-.8,2.5-2.04,3.19-.91.51-1.75.15-1.78-.88-.06-2.67-1.15-4.75-3.07-6.54-.89-.83-.52-1.76.79-3.11.8-.82,1.37-.58,2.06.1,2.03,2.02,3.73,4.21,4.03,7.23Z"/>
        </g>
      </svg>
    </div>
  )
}

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

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

  const parallaxRef = useRef(null)
  const minimalParallaxRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const rect = parallaxRef.current.parentElement.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrolled = window.innerHeight - rect.top
              parallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.25}px, 0)`
            }
          }
          if (minimalParallaxRef.current) {
            const rect = minimalParallaxRef.current.parentElement.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrolled = window.innerHeight - rect.top
              minimalParallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.08}px, 0)`
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-midnight)', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      
      {/* Background Elements */}
      {location.pathname === '/' ? (
        <>
          {/* Parallax Wrapper for Homepage */}
          <div ref={parallaxRef} className="absolute inset-0 z-0 will-change-transform" style={{ top: '-15%', height: '130%' }}>
            {/* Massive 3D background element */}
            <div className="absolute inset-0 z-0 animate-ambient-drift" style={{ backgroundImage: 'url("/heros/rna-crisper-hero (6).webp")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.85, pointerEvents: 'none' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-midnight) 0%, rgba(12,26,36,0.3) 25%, rgba(12,26,36,0.8) 70%, var(--color-midnight) 100%)', pointerEvents: 'none', zIndex: 1 }} />
          
          {/* Bokeh Particles */}
          <BokehParticles />
        </>
      ) : (
        <>
          {/* Static Textured Background for Subpages with Subtle Parallax */}
          <div ref={minimalParallaxRef} className="absolute inset-0 z-0 will-change-transform" style={{ top: '-5%', height: '110%' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ 
              backgroundImage: 'url("/heros/rna-crisper-hero (7).webp")', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center right', 
              opacity: 0.8 
            }} />
          </div>
          {/* Heavy navy on left fading to highly transparent on right */}
          <div className="absolute inset-0 z-1 pointer-events-none" style={{ 
            background: 'linear-gradient(to right, var(--color-midnight) 45%, rgba(12,26,36,0.8) 65%, rgba(12,26,36,0.1) 100%)' 
          }} />
          {/* Top/Bottom fade to blend with page */}
          <div className="absolute inset-0 z-1 pointer-events-none" style={{ 
            background: 'linear-gradient(to bottom, var(--color-midnight) 0%, transparent 15%, transparent 85%, var(--color-midnight) 100%)' 
          }} />
          
          {/* Subtle mixed-color Bokeh Particles */}
          <BokehParticles 
            colors={['240, 160, 64', '212, 107, 26', '34, 211, 238', '45, 212, 191']} 
            particleCount={80} 
          />
        </>
      )}

      <div className="section-container reveal" style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: location.pathname === '/' ? '160px 48px 0' : '80px 48px 0' }}>
        
        {/* Giant CTA Area - Only show on homepage */}
        {location.pathname === '/' && (
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
              
              <a href={location.pathname === '/' ? '#contact' : '/#contact'} onClick={(e) => handleNavClick(e, '#contact')} className="hoverable inline-flex items-center justify-center gap-3 px-[40px] py-[18px] rounded-full bg-gradient-to-r from-[#d46b1a] to-[#f0a040] text-white font-bold text-[1.125rem] shadow-[0_8px_32px_rgba(212,107,26,0.3)] hover:shadow-[0_16px_48px_rgba(212,107,26,0.5)] hover:-translate-y-1 transition-all duration-300">
                <span>Get in Touch</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        )}

        {/* Structured Columns */}
        <div className="footer-grid-main" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          
          {/* Left Col - About */}
          <div style={{ gridColumn: 'span 5', paddingRight: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <AnimatedPlatypusLogo />
              <img src="/PLA_logos-03.svg" alt="platypusbio" style={{ height: '48px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
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
                  href={location.pathname === '/' ? link.to : `/${link.to}`}
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
            &copy; {new Date().getFullYear()} Platypus Bio Pty Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            <Link to="/privacy" style={{ color: '#7e99a8', fontSize: '0.875rem', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#7e99a8'}
            >Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#7e99a8', fontSize: '0.875rem', fontWeight: 400, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#7e99a8'}
            >Terms of Service</Link>
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
        .platypus-stop-1 { stop-color: #ffffff; transition: stop-color 0.5s ease; }
        .platypus-stop-2 { stop-color: #ffffff; transition: stop-color 0.5s ease; }
        .group:hover .platypus-stop-1 { stop-color: #d46b1a; }
        .group:hover .platypus-stop-2 { stop-color: #2dd4bf; }
      `}</style>
    </footer>
  )
}
