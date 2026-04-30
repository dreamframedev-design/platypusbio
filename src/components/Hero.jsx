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
        
        // Varying sizes for depth of field effect
        const sizeCategory = Math.random()
        if (sizeCategory > 0.85) {
          this.size = Math.random() * 15 + 10 // Smaller large particles
          this.blur = Math.random() * 10 + 8
          this.speedX = (Math.random() - 0.5) * 0.1
          this.speedY = (Math.random() - 0.5) * 0.1
        } else if (sizeCategory > 0.5) {
          this.size = Math.random() * 6 + 4 // Medium, slightly blurry
          this.blur = Math.random() * 4 + 2
          this.speedX = (Math.random() - 0.5) * 0.2
          this.speedY = (Math.random() - 0.5) * 0.2
        } else {
          this.size = Math.random() * 2.5 + 1 // Small, sharp, defined orbs
          this.blur = Math.random() * 1 + 0
          this.speedX = (Math.random() - 0.5) * 0.3
          this.speedY = (Math.random() - 0.5) * 0.3
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
    const particles = Array.from({ length: 50 }, () => new Particle())

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

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Highly optimized scroll listener for parallax
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (parallaxRef.current) {
            // translate3d forces GPU acceleration, preventing lag
            parallaxRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.15}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    
    // passive: true makes scrolling much smoother by telling the browser we won't call preventDefault
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Parallax Wrapper */}
      <div ref={parallaxRef} className="absolute inset-0 z-0 will-change-transform">
        {/* Main Background Image */}
        <div 
          className={`absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat transition-opacity duration-[2s] ease-out ${loaded ? 'opacity-100 animate-ambient-drift' : 'opacity-0'}`}
          style={{ 
            backgroundImage: 'url(/heros/hero1.webp)',
          }}
        />
      </div>

      {/* Bokeh Particles */}
      <BokehParticles />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 lg:px-16 flex justify-end items-center h-full pt-20">
        <div className="w-full max-w-[720px] text-left p-8 md:p-12 lg:p-14 rounded-[2.5rem] backdrop-blur-2xl bg-white/40 border border-white/60 shadow-[0_32px_64px_rgba(0,0,0,0.15)] relative overflow-hidden">
          
          {/* Subtle inner glow for the glass card */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />

          {/* Large Watermark Logo in Background of Card */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 pointer-events-none animate-watermark mix-blend-overlay">
            <img src="/PLA_logos-02.svg" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="relative z-10">
            {/* Headline */}
            <h1 className="animate-fade-in-up delay-300 text-[clamp(2.5rem,3.8vw,4rem)] font-black text-slate-900 leading-[1.05] tracking-[-0.04em] mb-[24px]">
              <span className="drop-shadow-sm">Transforming <br className="hidden md:block" />
              medicine with</span> <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#d46b1a] to-[#e88430] bg-clip-text text-transparent whitespace-nowrap" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' }}>precision cell killing</span>
            </h1>

            {/* Sub */}
            <p className="animate-fade-in-up delay-400 text-[clamp(1.05rem,1.15vw,1.15rem)] text-slate-800 mb-[48px] leading-[1.8] font-medium tracking-[0.01em] max-w-[600px] drop-shadow-sm">
              TRICK (Trigger RNA-Induced Cell Killing) is a first-in-class programmable CRISPR platform that targets any RNA inside a cancer cell — unlocking the full transcriptome as a therapeutic target space.
            </p>

            {/* CTA */}
            <div className="animate-fade-in-up delay-500 flex flex-wrap items-center gap-[16px]">
              <a href="#contact" className="hoverable inline-flex items-center justify-center gap-2 px-[32px] py-[14px] rounded-full bg-slate-900 text-white font-semibold text-[1rem] shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300">
                Get in Touch
                <svg className="w-[18px] h-[18px] relative z-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#science"
                className="hoverable inline-flex items-center justify-center gap-2 px-[32px] py-[14px] rounded-full bg-white/50 border border-white/60 text-slate-900 font-semibold text-[1rem] backdrop-blur-md shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore the Science
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-fade-in delay-800">
        <div className="w-[24px] h-[42px] rounded-full border-2 border-slate-900/20 flex justify-center pt-[8px] bg-white/30 backdrop-blur-sm">
          <div className="w-[3px] h-[10px] rounded-full bg-gradient-to-b from-[#d46b1a] to-[#f0a040] animate-[float_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
