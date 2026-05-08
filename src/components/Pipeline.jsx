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
  }
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
    <section id="pipeline" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '160px', overflow: 'hidden', backgroundColor: '#fbfbf9' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/abstract%20background.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed',
        opacity: 0.15,
        filter: 'invert(1) contrast(1.2)',
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 25%, rgba(251,251,249,0.4) 75%, #fbfbf9 100%)',
        pointerEvents: 'none',
      }} />
      <div className="ambient-glow" style={{ position: 'absolute', top: '25%', right: 0, width: '500px', height: '500px', background: 'rgba(45,212,191,0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />
      <div className="ambient-glow" style={{ position: 'absolute', bottom: '15%', left: 0, width: '600px', height: '600px', background: 'rgba(212,107,26,0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-divider" style={{ marginBottom: '80px', opacity: 0.5 }} />

        <div
          className="reveal"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '40px 36px 44px',
            borderRadius: '16px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            background: 'rgba(255, 255, 255, 0.72)',
            boxShadow: '0 12px 40px rgba(12, 26, 36, 0.06)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 28px' }}>
            <p style={{ color: '#0d9488', fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Pipeline
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
              Broad by Design,<br />
              <span className="gradient-text-warm">Focused by Strategy</span>
            </h2>
          </div>

          {/* Intro callout */}
          <div style={{ maxWidth: '780px', margin: '0 auto 36px', textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '16px' }}>
              Platypus Bio’s lead program is focused on acute myeloid leukemia, a cancer with high unmet need and strong technical fit for the TRICK platform.
            </p>
            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
              AML is characterized by well-defined genetic mutations, making it an attractive first indication for programmable RNA-guided cell killing. The disease also has significant therapeutic need, with high relapse rates and limited curative options.
            </p>
          </div>

          {/* Program Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
          {programs.map((program, i) => (
            <div
              key={i}
              className="reveal glass-card-light"
              style={{
                padding: '56px 48px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: `2px solid ${program.borderColor}`,
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
                opacity: 0.05,
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

                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '32px', letterSpacing: '-0.02em' }}>
                  {program.name}
                </h3>

                {/* Phase tracker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '8px' }}>
                  {phases.map((phase, j) => {
                    const isActive = j <= program.phase
                    const isCurrent = j === program.phase
                    return (
                      <div key={j} style={{ flex: 1, position: 'relative' }}>
                        {/* Base Track */}
                        <div style={{
                          height: '6px',
                          background: 'rgba(0,0,0,0.06)',
                          borderRadius: j === 0 ? '3px 0 0 3px' : j === phases.length - 1 ? '0 3px 3px 0' : '0',
                          position: 'relative',
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          {/* Active Track Overlay */}
                          {isActive && (
                            <div className="pipe-animated" style={{
                              position: 'absolute',
                              top: 0, left: 0, bottom: 0,
                              width: '0%',
                              background: `linear-gradient(90deg, ${program.accent}, #f0a040, ${program.accent})`,
                              backgroundSize: '200% auto',
                              borderRadius: j === 0 ? '3px 0 0 3px' : j === phases.length - 1 ? '0 3px 3px 0' : '0',
                              animationDelay: `${j * 0.4 + 0.4}s, 0s`,
                              opacity: 0,
                              boxShadow: `0 0 12px ${program.glowColor}`,
                              transformOrigin: 'left center'
                            }} />
                          )}
                          {/* Current Dot */}
                          {isCurrent && (
                            <div className="pipe-dot-animated" style={{
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translate(50%, -50%) scale(0.5)',
                              zIndex: 2,
                              opacity: 0,
                              animationDelay: `${(j * 0.4) + 0.8 + 0.4}s`
                            }}>
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: program.accent,
                                border: '3px solid #ffffff',
                                animation: 'pulse-dot 2s infinite',
                              }} />
                            </div>
                          )}
                        </div>
                        <p style={{
                          color: isActive ? '#334155' : '#94a3b8',
                          fontSize: '0.6875rem',
                          fontWeight: isActive ? 700 : 500,
                          marginTop: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          transition: 'color 0.5s ease',
                          transitionDelay: `${j * 0.4}s`
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
      </div>

      <style>{`
        @keyframes pipeline-flow {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes pipe-grow {
          0% { width: 0%; opacity: 0.5; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes fade-in-dot {
          0% { opacity: 0; transform: translate(50%, -50%) scale(0.5); }
          100% { opacity: 1; transform: translate(50%, -50%) scale(1); }
        }
        .pipe-animated {
          width: 0%;
          opacity: 0;
        }
        .reveal.visible .pipe-animated {
          animation: pipe-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, pipeline-flow 3s linear infinite;
        }
        .pipe-dot-animated {
          opacity: 0;
          transform: translate(50%, -50%) scale(0.5);
        }
        .reveal.visible .pipe-dot-animated {
          animation: fade-in-dot 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(212, 107, 26, 0.6); }
          70% { box-shadow: 0 0 0 12px rgba(212, 107, 26, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 107, 26, 0); }
        }
        @keyframes float-simple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .ambient-glow {
          animation: float-simple 8s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          #pipeline .glass-card {
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
