import { useEffect, useRef } from 'react'

const steps = [
  {
    step: '01',
    title: 'Metagenomic Discovery',
    subtitle: 'Sample → Sequence → Decode',
    description: "We extract and sequence microbial communities from Australia's most biodiverse and extreme environments. Our proprietary bioinformatics pipeline identifies novel functional RNA elements, enzymes, and biosynthetic gene clusters invisible to conventional approaches.",
    details: ['Environmental DNA extraction', 'Long-read nanopore sequencing', 'AI-driven functional annotation'],
    accentColor: '#d46b1a',
    borderColor: 'rgba(212, 107, 26, 0.25)',
    glowColor: 'rgba(212, 107, 26, 0.05)',
  },
  {
    step: '02',
    title: 'Computational Translation',
    subtitle: 'Data → Therapeutics Architecture',
    description: 'Machine learning models trained on our proprietary metagenome atlas predict therapeutic potential, binding affinity, and delivery mechanisms. We compress years of wet-lab iteration into weeks of computational design.',
    details: ['Structure prediction & molecular docking', 'Pharmacokinetic modeling', 'Toxicology risk scoring'],
    accentColor: '#2dd4bf',
    borderColor: 'rgba(45, 212, 191, 0.25)',
    glowColor: 'rgba(45, 212, 191, 0.05)',
  },
  {
    step: '03',
    title: 'Precision Delivery',
    subtitle: 'Molecule → Medicine → Patient',
    description: 'Validated RNA candidates enter our precision medicine pipeline — optimized for stability, specificity, and clinical delivery. Each therapeutic is designed for a defined patient population with clear molecular endpoints.',
    details: ['Lipid nanoparticle formulation', 'Targeted tissue delivery', 'IND-enabling studies'],
    accentColor: '#f0a040',
    borderColor: 'rgba(240, 160, 64, 0.25)',
    glowColor: 'rgba(240, 160, 64, 0.05)',
  },
]

export default function Pipeline() {
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
    <section id="pipeline" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '160px', overflow: 'hidden' }}>
      {/* Parallax abstract background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/abstract%20background.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed',
        opacity: 0.1,
        pointerEvents: 'none',
      }} />
      {/* Gradient overlay to blend edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, var(--color-midnight) 0%, transparent 25%, transparent 75%, var(--color-midnight) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: '25%', right: 0, width: '500px', height: '500px', background: 'rgba(45,212,191,0.025)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', left: 0, width: '600px', height: '600px', background: 'rgba(212,107,26,0.02)', borderRadius: '50%', filter: 'blur(160px)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 100px' }}>
          <p style={{ color: '#2dd4bf', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Precision Medicine Pipeline
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            From Soil to{' '}
            <span className="gradient-text" style={{ whiteSpace: 'nowrap' }}>Therapeutic Insight</span>
          </h2>
          <p style={{ color: '#7e99a8', fontSize: '1.125rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
            Our three-stage pipeline transforms raw metagenomic data into clinically validated RNA therapeutics — each step engineered for speed, precision, and immense scale.
          </p>
        </div>

        {/* Staggered Cascade Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal"
              style={{ 
                position: 'relative', 
                display: 'flex', 
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                transitionDelay: `${i * 0.15}s` 
              }}
            >
              {/* Cinematic Connecting Lines (Background) */}
              {i !== 0 && (
                <div className="hidden md:block" style={{
                  position: 'absolute',
                  top: '-48px',
                  [i % 2 === 0 ? 'left' : 'right']: '360px',
                  width: '2px',
                  height: '48px',
                  background: `linear-gradient(to bottom, transparent, ${step.accentColor}40)`,
                  zIndex: 0
                }} />
              )}

              {/* Card */}
              <div className="glass-card pipeline-card" style={{ 
                width: '100%', maxWidth: '720px', 
                padding: '64px 48px', 
                position: 'relative', 
                overflow: 'hidden',
                zIndex: 10,
                borderTop: `1px solid ${step.borderColor}`
              }}>
                {/* Step Number Massive Watermark */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  [i % 2 === 0 ? 'right' : 'left']: '-10px',
                  fontSize: '14rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: step.accentColor,
                  opacity: 0.03,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  letterSpacing: '-0.05em'
                }}>
                  {step.step}
                </div>

                <div className="pipeline-flex" style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', position: 'relative', zIndex: 10 }}>
                  <div style={{ 
                    width: '56px', height: '56px', borderRadius: '16px', 
                    background: `linear-gradient(135deg, ${step.accentColor}15, transparent)`, 
                    border: `1px solid ${step.borderColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `inset 0 0 20px ${step.glowColor}`
                  }}>
                    <span style={{ color: step.accentColor, fontWeight: 700, fontSize: '0.9375rem' }}>{step.step}</span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: step.accentColor, marginBottom: '24px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {step.subtitle}
                    </p>
                    <p style={{ color: '#7e99a8', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '32px' }}>
                      {step.description}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      {step.details.map((detail, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', color: '#7e99a8', fontWeight: 500 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: step.accentColor, flexShrink: 0, marginTop: '8px', boxShadow: `0 0 10px ${step.accentColor}` }} />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pipeline-card {
            padding: 40px 32px !important;
          }
          .pipeline-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
