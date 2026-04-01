import { useEffect, useRef } from 'react'

const narrativeCards = [
  {
    title: 'Ancient Biodiversity',
    description: "Australia's 100-million-year isolation has produced an evolutionary library of microbial genomes unlike any other. This is not just data — it is a molecular vocabulary the rest of the world does not have.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <path d="M8 20c2-4 4-8 8-8s6 4 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.35"/>
        <circle cx="16" cy="9" r="1" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    title: 'Extremophile Intelligence',
    description: 'From hypersaline lakebeds to the deep-earth aquifers of the Pilbara, Australian extremophiles have engineered survival at the molecular level. We read that engineering.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path d="M16 4v24M4 16h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
        <circle cx="16" cy="8" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="22" cy="16" r="1.5" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'RNA-First Therapeutics',
    description: 'We leverage metagenomically-derived RNA platforms — ribozymes, regulatory non-coding RNAs, and novel riboswitches — to develop precision tools that conventional genomics cannot access.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path d="M6 26C10 18 14 14 16 16s4 0 6-4 2-6 4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="22" r="2" fill="currentColor" opacity="0.35"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5"/>
        <circle cx="22" cy="10" r="2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
]

export default function MetagenomeNarrative() {
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
    <section id="narrative" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '128px', overflow: 'hidden' }}>
      {/* Parallax abstract background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/abtract2.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.12,
        pointerEvents: 'none',
      }} />
      {/* Gradient overlay to blend edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, var(--color-midnight) 0%, transparent 20%, transparent 80%, var(--color-midnight) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'rgba(212,107,26,0.025)', borderRadius: '50%', filter: 'blur(160px)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        {/* Narrative Header */}
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto 80px', textAlign: 'center' }}>
          <p style={{ color: '#d46b1a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            The Australian Edge
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            An Entire Continent of{' '}
            <span className="gradient-text-warm" style={{ whiteSpace: 'nowrap' }}>Untapped Molecular Intelligence</span>
          </h2>
          <p style={{ color: '#7e99a8', fontSize: '1.125rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
            Australia's ancient landscapes harbour the most genetically distinct microbial ecosystems on Earth. We are translating this biological dark matter into the next generation of precision medicines.
          </p>
        </div>

        {/* Massive Stats Typography */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '120px', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>
              100K<span style={{ color: '#d46b1a' }}>+</span>
            </h3>
            <p style={{ color: '#7e99a8', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Unique Metagenomic Sequences</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap', marginTop: '16px' }}>
            <div>
              <h4 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>85<span style={{ color: '#2dd4bf' }}>%</span></h4>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Novel Enzymes</p>
            </div>
            <div>
              <h4 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>12</h4>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Biome Regions</p>
            </div>
            <div>
              <h4 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>3</h4>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Therapy Programs</p>
            </div>
          </div>
        </div>

        {/* Cinematic Bento Grid */}
        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          {/* Card 1: Full width on desktop */}
          <div className="reveal glass-card bento-full" style={{ gridColumn: 'span 12', padding: '64px 48px', display: 'flex', alignItems: 'center', gap: '48px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: '0 0 80px', color: '#d46b1a' }}>{narrativeCards[0].icon}</div>
            <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>{narrativeCards[0].title}</h3>
              <p style={{ color: '#7e99a8', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '600px' }}>{narrativeCards[0].description}</p>
            </div>
            {/* Massive watermark */}
            <div style={{ position: 'absolute', right: '-15%', top: '-30%', opacity: 0.025, width: '600px', transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
              <img src="/PLA_logo.svg" alt="" style={{ width: '100%' }} />
            </div>
          </div>
          
          {/* Card 2 & 3: Half widths on desktop */}
          <div className="reveal glass-card bento-half" style={{ gridColumn: 'span 6', padding: '48px', position: 'relative', transitionDelay: '0.1s' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ color: '#2dd4bf', marginBottom: '32px' }}>{narrativeCards[1].icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>{narrativeCards[1].title}</h3>
            <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.75 }}>{narrativeCards[1].description}</p>
          </div>
          
          <div className="reveal glass-card bento-half" style={{ gridColumn: 'span 6', padding: '48px', position: 'relative', transitionDelay: '0.2s' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(240, 160, 64, 0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ color: '#f0a040', marginBottom: '32px' }}>{narrativeCards[2].icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em' }}>{narrativeCards[2].title}</h3>
            <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.75 }}>{narrativeCards[2].description}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bento-full {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
            padding: 40px 32px !important;
          }
          .bento-half {
            grid-column: span 12 !important;
            padding: 40px 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
