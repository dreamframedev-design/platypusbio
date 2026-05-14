import { useEffect, useRef } from 'react'
import ScrambleText from './ScrambleText'
import ShaderBackground from './ShaderBackground'
import TrickAnimation from './TrickAnimation'
import useTilt from '../hooks/useTilt'

/* ── Icon SVGs ───────────────────────────────── */
const PrecisionIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.8"/>
    <path d="M16 2v6M16 24v6M2 16h6M24 16h6" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
  </svg>
)

const MultiplexIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <path d="M8 8h6v6H8zM18 8h6v6h-6zM8 18h6v6H8zM18 18h6v6h-6z" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.7"/>
    <path d="M14 11h4M14 21h4M11 14v4M21 14v4" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
)

const PAMIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <path d="M6 26C10 18 14 14 16 16s4 0 6-4 2-6 4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" opacity="0.15" strokeDasharray="3 3"/>
    <path d="M4 16h24" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="2 2"/>
    <circle cx="10" cy="21" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="22" cy="10" r="2" fill="currentColor" opacity="0.6"/>
  </svg>
)

const EffectorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    <path d="M12 16l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
  </svg>
)

/* ── Pillar card with 3D tilt ────────────────── */
const PillarCard = ({ p, i }) => {
  const tiltRef = useTilt({ max: 5, scale: 1.01, glare: true })
  return (
    <div
      ref={tiltRef}
      className="reveal glass-card"
      style={{
        padding: '48px 40px',
        position: 'relative',
        overflow: 'hidden',
        transitionDelay: `${i * 0.1}s`,
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: `radial-gradient(circle, ${p.accent}10 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ color: p.accent, marginBottom: '24px', position: 'relative', zIndex: 1 }}>{p.icon}</div>
      <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
        {p.title}
      </h3>
      <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
        {p.body}
      </p>
    </div>
  )
}

/* ── Pillar data ─────────────────────────────── */
const pillars = [
  {
    title: 'Intracellular Targeting',
    body: 'TRICK is designed to reach disease-defining signals inside the cell, unlocking targets beyond the reach of many current precision therapies.',
    icon: <PrecisionIcon />,
    accent: '#d46b1a',
  },
  {
    title: 'Programmable Design',
    body: 'The platform can be programmed to recognize specific RNA sequences, creating the potential to target defined mutations across cancer types and patient populations.',
    icon: <PAMIcon />,
    accent: '#2dd4bf',
  },
  {
    title: 'Multiplexable Architecture',
    body: 'Multiple guide RNAs can be incorporated into a single product, enabling broader patient coverage and reducing the risk of tumor escape.',
    icon: <MultiplexIcon />,
    accent: '#f0a040',
  },
  {
    title: 'Durable Cell Killing',
    body: 'By recognizing more than one disease-driving RNA signature, TRICK can target heterogeneous cancer cell populations and make it harder for tumors to evade treatment through single-mutation loss or pathway adaptation.',
    icon: <EffectorIcon />,
    accent: '#22d3ee',
  },
]


export default function TheScience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.06 }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-scale')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="science" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ═══════════════════════════════════════════
          SECTION 2: Reaching Disease Signals Others Cannot
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '56px', paddingBottom: '168px', backgroundColor: '#fbfbf9' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', pointerEvents: 'none', zIndex: 0 }}>
          <div className="ambient-glow" style={{ width: '100%', height: '100%', background: 'rgba(212,107,26,0.04)', borderRadius: '50%', filter: 'blur(80px)' }} />
        </div>
        {/* Parallax abstract background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/abtract2.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15,
          filter: 'invert(1) contrast(1.2)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.6) 20%, rgba(251,251,249,0.6) 80%, #fbfbf9 100%)',
          pointerEvents: 'none',
        }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-divider" style={{ marginBottom: '36px', opacity: 0.5 }} />

          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#d46b1a', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <ScrambleText text="The Science" />
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '40px' }}>
              <span className="gradient-text-cool">Reaching Disease Signals</span> Others Cannot
            </h2>
          </div>

          <div className="reveal" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <p style={{ color: '#1e293b', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
              Many of cancer’s most important mutations are found inside the cell. Yet most of today’s precision therapies, including antibody-drug conjugates and cell therapies, are limited to targets on the cell surface.
            </p>
            <p style={{ color: '#1e293b', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
              This leaves a major gap in precision oncology. Platypus Bio was created to close that gap.
            </p>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '24px', marginBottom: '8px' }}>The TRICK Platform</h3>
            <p style={{ color: '#1e293b', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
              TRICK -Trigger RNA-induced Cell Killing - is a programmable platform designed to selectively kill cancer cells based on the RNA sequences they express.
            </p>
            <p style={{ color: '#1e293b', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
              Unlike approaches that rely on surface markers alone, TRICK is designed to access the full transcriptome, enabling therapeutic targeting of intracellular disease signals, including mutations that have historically been difficult or impossible to drug.
            </p>

            {/* TRICK Platform Image */}
            <div style={{ marginTop: '32px', textAlign: 'center', width: '100%', perspective: '1200px' }}>
              <img 
                src="/trick selectively kills cancer cells image.png" 
                alt="TRICK selectively kills cancer cells" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '16px', 
                  boxShadow: '0 32px 64px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: 'center center',
                  cursor: 'pointer'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 48px 80px rgba(0,0,0,0.2), 0 24px 40px rgba(0,0,0,0.12)';
                  e.currentTarget.style.border = '1px solid rgba(212,107,26,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)';
                  e.currentTarget.style.border = '1px solid rgba(15,23,42,0.08)';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 6: How TRICK Works
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#fbfbf9', overflow: 'clip' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abtract2.webp)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 20%, rgba(251,251,249,0.4) 80%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="ambient-glow" style={{ position: 'absolute', top: '10%', right: '-10%', width: '800px', height: '800px', background: 'rgba(45,212,191,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Full Width Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: '1000px' }}>
                How TRICK Works
              </h2>
            </div>
            
            <div className="action-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'start' }}>
              {/* Text Side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '19px', width: '2px', background: 'linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(212,107,26,0.2))', zIndex: 0 }} />

                <div className="glass-card-light" style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, padding: '32px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, boxShadow: '0 8px 16px rgba(13,148,136,0.25)' }}>1</div>
                  </div>
                  <div>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      TRICK uses a guide RNA to identify a target RNA sequence inside the cancer cell with single-nucleotide precision.
                    </p>
                  </div>
                </div>

                <div className="glass-card-light" style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, padding: '32px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#d46b1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, boxShadow: '0 8px 16px rgba(212,107,26,0.25)' }}>2</div>
                  </div>
                  <div>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      Once the target RNA is recognized, a conformational change activates production of signaling molecules.
                    </p>
                  </div>
                </div>

                <div className="glass-card-light" style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, padding: '32px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#22d3ee', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, boxShadow: '0 8px 16px rgba(34,211,238,0.35)' }}>3</div>
                  </div>
                  <div>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      These signaling molecules then activate an accessory nuclease - the platform’s “DNA Shredder” - which causes irreparable genomic DNA damage and ultimately cell death.
                    </p>
                  </div>
                </div>
              </div>
            
              {/* Image Side - Now Sticky so it stays visible while reading steps */}
              <div className="reveal-scale" style={{ position: 'sticky', top: '120px' }}>
                {/* Decorative framing elements */}
                <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '120px', height: '120px', borderTop: '2px solid rgba(45,212,191,0.4)', borderLeft: '2px solid rgba(45,212,191,0.4)', borderRadius: '12px 0 0 0', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', borderBottom: '2px solid rgba(212,107,26,0.4)', borderRight: '2px solid rgba(212,107,26,0.4)', borderRadius: '0 0 12px 0', pointerEvents: 'none' }} />
                
                {/* Diffused Glow behind image */}
                <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

                <div style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 32px 100px rgba(12, 26, 36, 0.2)', 
                  border: '1px solid rgba(255,255,255,0.8)',
                  background: '#fff',
                  position: 'relative',
                  zIndex: 2,
                  transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg) scale(1.02)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: 'center right'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.05) translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 40px 120px rgba(12, 26, 36, 0.25)';
                  e.currentTarget.style.border = '1px solid rgba(212,107,26,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(2deg) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 32px 100px rgba(12, 26, 36, 0.2)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.8)';
                }}
                >
                  <img src="/diagram2.png" alt="Mechanism of Action Diagram" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
          
          <style>{`
            @media (max-width: 1024px) {
              .action-grid {
                grid-template-columns: 1fr !important;
                gap: 64px !important;
              }
              .reveal-scale > div:nth-child(3) {
                transform: none !important;
              }
            }
          `}</style>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3: TRICK Platform Advantages
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '128px', backgroundColor: 'var(--color-midnight)' }}>
        {/* Solid Swoop Edge from Light to Dark */}
        <div className="wave-divider absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[51px] md:h-[102px]">
            <path d="M0,100 C480,62 960,62 1440,100 Z" fill="var(--color-midnight)" />
          </svg>
        </div>
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abstract%20background.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.10, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        {/* WebGL animated noise field — adds living motion to the dark section */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <ShaderBackground opacity={0.32} blendMode="screen" />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, var(--color-midnight) 0%, rgba(12, 26, 36, 0.55) 20%, rgba(12, 26, 36, 0.55) 80%, var(--color-midnight) 100%)', pointerEvents: 'none' }} />
        <div className="ambient-glow" style={{ position: 'absolute', top: '30%', right: '0', width: '600px', height: '600px', background: 'rgba(45,212,191,0.02)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              <span className="gradient-text-cool">TRICK</span> Platform Advantages
            </h2>
          </div>

          {/* Mechanism animation — looping SVG of the TRICK cycle */}
          <div className="reveal" style={{ marginBottom: '72px', transitionDelay: '0.1s' }}>
            <TrickAnimation />
          </div>

          {/* 4-Pillar Bento Grid */}
          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {pillars.map((p, i) => (
              <PillarCard key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-simple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .ambient-glow {
          animation: float-simple 8s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .crispr-comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .trick-solution-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
