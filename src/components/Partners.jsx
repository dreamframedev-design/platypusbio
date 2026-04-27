import { useEffect, useRef } from 'react'

export default function Partners() {
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

  return (
    <section id="partners" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '128px', overflow: 'hidden' }}>
      {/* Subtle Swoop boundary line from light Team section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px]">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,0 L0,0 Z" fill="#fbfbf9"></path>
        </svg>
      </div>

      {/* Background glow */}
      <div className="ambient-glow" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'rgba(45,212,191,0.02)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        <div className="reveal" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ color: '#2dd4bf', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Partners
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '32px' }}>
            Strategic Partnerships
          </h2>
          <p style={{ color: '#7e99a8', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '64px' }}>
            We are actively building partnerships with leading pharmaceutical companies, research institutions, and clinical collaborators to bring TRICK-based therapeutics to patients.
          </p>
        </div>

        {/* Placeholder cards */}
        <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(12, 26, 36, 0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '80px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,212,191,0.03) 0%, transparent 50%, rgba(212,107,26,0.03) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{
                    width: '140px', height: '60px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#3a5a6c', fontSize: '0.75rem', fontWeight: 500 }}>Partner Logo</span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#3a5a6c', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                Partnership announcements forthcoming
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
