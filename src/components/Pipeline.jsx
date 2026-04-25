import { useEffect, useRef } from 'react'

const programs = [
  {
    id: '01',
    code: 'AML',
    name: 'ACUTE MYELOID LEUKEMIA',
    accent: '#d46b1a',
    borderColor: 'rgba(212, 107, 26, 0.25)',
    glowColor: 'rgba(212, 107, 26, 0.05)',
    phase: 0, // 0 = Discovery
  },
  {
    id: '02',
    code: 'HCC',
    name: 'HEPATOCELLULAR CARCINOMA',
    accent: '#2dd4bf',
    borderColor: 'rgba(45, 212, 191, 0.25)',
    glowColor: 'rgba(45, 212, 191, 0.05)',
    phase: 0,
  },
]

const phases = ['Discovery', 'Lead Optimization', 'IND-Enabling']

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
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/abstract%20background.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed',
        opacity: 0.08,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, var(--color-midnight) 0%, transparent 25%, transparent 75%, var(--color-midnight) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: '25%', right: 0, width: '500px', height: '500px', background: 'rgba(45,212,191,0.02)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '15%', left: 0, width: '600px', height: '600px', background: 'rgba(212,107,26,0.02)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-divider" style={{ marginBottom: '80px' }} />

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <p style={{ color: '#2dd4bf', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Pipeline
          </p>
        </div>

        {/* Intro callout */}
        <div className="reveal" style={{ maxWidth: '780px', margin: '0 auto 80px', textAlign: 'center' }}>
          <p style={{ color: '#b8cdd6', fontSize: '1.0625rem', lineHeight: 1.85 }}>
            TRICK's first clinical applications target two cancers with defined RNA signatures, high unmet need, and established delivery pathways — proving the platform where it can make the fastest difference for patients and the clearest case for partners and investors.
          </p>
        </div>

        {/* Program Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '900px', margin: '0 auto' }}>
          {programs.map((program, i) => (
            <div
              key={i}
              className="reveal glass-card"
              style={{
                padding: '56px 48px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: `1px solid ${program.borderColor}`,
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              {/* Program number watermark */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '20px',
                fontSize: '12rem',
                fontWeight: 900,
                lineHeight: 1,
                color: program.accent,
                opacity: 0.03,
                pointerEvents: 'none',
                userSelect: 'none',
                letterSpacing: '-0.05em',
              }}>
                {program.id}
              </div>

              <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Program label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: `linear-gradient(135deg, ${program.accent}15, transparent)`,
                    border: `1px solid ${program.borderColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `inset 0 0 20px ${program.glowColor}`,
                  }}>
                    <span style={{ color: program.accent, fontWeight: 700, fontSize: '0.875rem' }}>{program.id}</span>
                  </div>
                  <div>
                    <p style={{ color: program.accent, fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      PROGRAM {program.id} | {program.code}
                    </p>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '32px', letterSpacing: '-0.02em' }}>
                  {program.name}
                </h3>

                {/* Phase tracker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '8px' }}>
                  {phases.map((phase, j) => {
                    const isActive = j <= program.phase
                    const isCurrent = j === program.phase
                    return (
                      <div key={j} style={{ flex: 1, position: 'relative' }}>
                        {/* Track */}
                        <div style={{
                          height: '4px',
                          background: isActive
                            ? `linear-gradient(90deg, ${program.accent}, ${program.accent}80)`
                            : 'rgba(255,255,255,0.06)',
                          borderRadius: j === 0 ? '2px 0 0 2px' : j === phases.length - 1 ? '0 2px 2px 0' : '0',
                          position: 'relative',
                        }}>
                          {isCurrent && (
                            <div style={{
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translate(50%, -50%)',
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              background: program.accent,
                              boxShadow: `0 0 16px ${program.accent}80`,
                              border: '2px solid var(--color-midnight)',
                            }} />
                          )}
                        </div>
                        <p style={{
                          color: isActive ? '#b8cdd6' : '#3a5a6c',
                          fontSize: '0.6875rem',
                          fontWeight: isActive ? 600 : 500,
                          marginTop: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}>
                          {phase}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #pipeline .glass-card {
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
