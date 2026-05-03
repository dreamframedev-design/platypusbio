import { useEffect, useRef } from 'react'

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

/* ── Pillar data ─────────────────────────────── */
const pillars = [
  {
    title: 'Precision is built into the design.',
    body: 'TRICK operates with single-nucleotide resolution, allowing us to distinguish diseased cells from healthy ones with extraordinary specificity. That level of control is foundational to achieving a strong safety profile as therapies scale into complex clinical settings.',
    icon: <PrecisionIcon />,
    accent: '#d46b1a',
  },
  {
    title: 'One platform, multiple targets.',
    body: 'Diseases are rarely driven by a single mutation. TRICK is designed to multiplex, bundling multiple genetic targets into a single therapeutic, so we can address biological complexity without increasing treatment burden.',
    icon: <MultiplexIcon />,
    accent: '#2dd4bf',
  },
  {
    title: 'Freedom from sequence constraints.',
    body: 'Many CRISPR systems are limited by sequence requirements. TRICK is PAM-independent, meaning virtually any RNA sequence can be targeted. This dramatically expands the universe of addressable diseases and enables faster design cycles for new therapeutics.',
    icon: <PAMIcon />,
    accent: '#f0a040',
  },
  {
    title: 'Built to work independently.',
    body: 'TRICK is effector-free, so its activity does not depend on recruiting the immune system or engineering immune cells like CAR-T. That independence simplifies development, broadens patient eligibility, and supports more predictable performance across indications.',
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
          SECTION 2: A FRESH APPROACH TO CRISPR
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '56px', paddingBottom: '168px', backgroundColor: '#fbfbf9' }}>
        {/* Background glow */}
        <div className="ambient-glow" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'rgba(212,107,26,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Parallax abstract background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/abtract2.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
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
              The Science
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '40px' }}>
              <span className="gradient-text-cool">A FRESH APPROACH</span> to{' '}
              CRISPR
            </h2>
          </div>

          <div className="reveal" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
              At Platypus Bio, we're building TRICK (Trigger RNA Induced Cell Killing), a programmable RNA-targeted CRISPR platform designed to find the molecular signals that define diseased cells and trigger irreversible genomic DNA damage and ultimately cell death, only where it's needed.
            </p>
            <p style={{ color: '#64748b', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
              Instead of relying on proteins on the cell surface, TRICK looks directly inside the cell, reading RNA to identify diseased cells, all while leaving healthy cells unharmed. This shift in targeting opens access to the full transcriptome, including intracellular, low-abundance, and non-coding transcripts that have traditionally been out of reach for targeted therapies.
            </p>
            <p style={{ color: '#64748b', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
              TRICK turns RNA signatures into precise instructions for eliminating disease-driving cells, unlocking a fundamentally new way to target and treat complex diseases at scale.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3: WHY TRICK IS A GAME-CHANGER
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '128px', backgroundColor: 'var(--color-midnight)' }}>
        {/* Solid Swoop Edge from Light to Dark */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[51px] md:h-[102px]">
            <path d="M0,100 C480,62 960,62 1440,100 Z" fill="var(--color-midnight)" />
          </svg>
        </div>
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abstract%20background.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.15, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, var(--color-midnight) 0%, rgba(12, 26, 36, 0.5) 20%, rgba(12, 26, 36, 0.5) 80%, var(--color-midnight) 100%)', pointerEvents: 'none' }} />
        <div className="ambient-glow" style={{ position: 'absolute', top: '30%', right: '0', width: '600px', height: '600px', background: 'rgba(45,212,191,0.02)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto 80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Why <span className="gradient-text-cool">TRICK</span> Is a Game-Changer
            </h2>
          </div>

          {/* 4-Pillar Bento Grid */}
          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                className="reveal glass-card"
                style={{
                  padding: '48px 40px',
                  position: 'relative',
                  overflow: 'hidden',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Accent glow */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: `radial-gradient(circle, ${p.accent}10 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ color: p.accent, marginBottom: '24px', position: 'relative', zIndex: 1 }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
                  {p.title}
                </h3>
                <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          {/* Closing paragraph */}
          <div className="reveal" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#b8cdd6', fontSize: '1.0625rem', lineHeight: 1.85 }}>
              Together, these capabilities position TRICK as a flexible, programmable platform for targeting disease with precision, unlocking a new generation of scalable, RNA-guided therapeutics.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 4: BROAD BY DESIGN, FOCUSED BY STRATEGY
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '128px', backgroundColor: '#fbfbf9' }}>
        {/* Solid Swoop Edge from Dark to Light */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[51px] md:h-[102px]">
            <path d="M0,100 C480,62 960,62 1440,100 Z" fill="#fbfbf9" />
          </svg>
        </div>
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abtract2.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 25%, rgba(251,251,249,0.4) 75%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-divider" style={{ marginBottom: '80px', opacity: 0.5 }} />

          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '40px' }}>
              Broad by Design,
              <br />
              <span className="gradient-text-warm" style={{ whiteSpace: 'nowrap' }}>Focused by Strategy</span>
            </h2>
            <p style={{ color: '#475569', fontSize: '1.125rem', lineHeight: 1.85, maxWidth: '780px', margin: '0 auto', fontWeight: 300 }}>
              From ultra-deep biodiscovery and proprietary sequence data to programmable genetic tools and precision diagnostics, Platypus Bio has assembled the core capabilities needed to innovate across modern biotechnology. Yet our mission is centered on therapeutics, using this integrated engine to develop targeted medicines that can address complex disease with precision. The result is a platform that scales across applications, but ultimately converges on what matters most: delivering new treatments to patients.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 5: THE CHALLENGE
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '32px', backgroundColor: '#fbfbf9' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abstract%20background.webp)', backgroundSize: 'cover', backgroundPosition: 'center bottom', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 20%, rgba(251,251,249,0.4) 80%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal glass-card-light" style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 56px', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(240,160,64,0.6)' }}>
            <p style={{ color: '#d46b1a', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>
              The Challenge
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '32px' }}>
              The Challenge Faced by Current Precision Cancer Therapies
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
                The current generation of precision oncology therapies has proven that targeted cell killing works, but it has also revealed the limits of protein-based targeting. Most approved modalities depend on identifying cell surface antigens that are highly expressed in tumors and minimally present in normal tissue, <span style={{ color: '#0f172a', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(45,212,191,0.2)', borderBottom: '1px solid rgba(45,212,191,0.8)' }}>a combination that is surprisingly rare</span>.
              </p>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
                This constraint restricts pipeline expansion, complicates safety, and leaves tumors room to escape through antigen loss or biological variability. The result is a therapeutic landscape where innovation is often bounded by target availability rather than scientific ambition.
              </p>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
                Platypus Bio is building a new targeting paradigm designed to break that constraint, using RNA signatures to enable precise, programmable elimination of disease-driving cells across a much broader range of indications.
              </p>
            </div>

            {/* Diagram 1 */}
            <div style={{ marginTop: '48px', textAlign: 'center' }}>
              <img src="/diagram1.png" alt="The Challenge Diagram" style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 6: TRICK TURNS MOLECULAR RECOGNITION INTO ACTION
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#fbfbf9', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abtract2.webp)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 20%, rgba(251,251,249,0.4) 80%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="ambient-glow" style={{ position: 'absolute', top: '10%', right: '-10%', width: '800px', height: '800px', background: 'rgba(45,212,191,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Full Width Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '10px 28px', borderRadius: '10px', border: '1px solid rgba(45,212,191,0.2)', backgroundColor: 'rgba(45,212,191,0.05)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0d9488', boxShadow: '0 0 12px rgba(13,148,136,0.6)' }} />
                <span style={{ color: '#0d9488', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  Mechanism of Action
                </span>
              </div>
              
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: '1000px' }}>
                TRICK turns molecular recognition into action
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
                    <h4 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>Target Identification</h4>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      The system begins by using a programmable CRISPR complex to identify a specific RNA sequence that marks a diseased cell.
                    </p>
                  </div>
                </div>

                <div className="glass-card-light" style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, padding: '32px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#d46b1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, boxShadow: '0 8px 16px rgba(212,107,26,0.25)' }}>2</div>
                  </div>
                  <div>
                    <h4 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>Signal Amplification</h4>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      Once that signal is detected, TRICK amplifies the response internally, generating a surge of activating molecules that ensures the system engages even when the target signal is faint.
                    </p>
                  </div>
                </div>

                <div className="glass-card-light" style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, padding: '32px', borderRadius: '14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#22d3ee', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, boxShadow: '0 8px 16px rgba(34,211,238,0.35)' }}>3</div>
                  </div>
                  <div>
                    <h4 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>Controlled Cell Death</h4>
                    <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, fontWeight: 400 }}>
                      That amplified signal switches on a cytotoxic nuclease, which introduces widespread genomic DNA damage that the cell cannot recover from, resulting in controlled cell death. Because the components are modular, the platform can be adapted to different biological contexts and therapeutic strategies. The result is a mechanism that combines precision sensing with reliable execution, enabling targeted elimination of cells defined by their RNA signatures.
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
          SECTION 7: WHERE PRECISION MEETS EXECUTION
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '32px', backgroundColor: '#fbfbf9' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abstract%20background.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 25%, rgba(251,251,249,0.4) 75%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="reveal glass-card-light" style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 56px', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(212,107,26,0.6)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '32px' }}>
              Where precision meets execution
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 300 }}>
                The TRICK pipeline is designed to showcase the breadth and repeatability of our platform across multiple cancer types. By anchoring each program to disease-defining RNA signatures, we can address targets that are inaccessible to conventional therapies while maintaining a consistent development framework. Our lead indications, AML and HCC, represent clinically validated settings where precision cell elimination can deliver meaningful impact, but they also serve a broader purpose: demonstrating that a single programmable technology can scale across heterogeneous diseases.
              </p>
              <p style={{ color: '#334155', fontSize: '1.0625rem', lineHeight: 1.85, fontWeight: 400 }}>
                As our target discovery engine expands, the pipeline is designed to grow in parallel, enabling efficient entry into new indications without reinventing the underlying therapeutic architecture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          INTRO: PRECISION ONCOLOGY HAS A TARGETING PROBLEM
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '64px', backgroundColor: '#fbfbf9' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abtract2.webp)', backgroundSize: 'cover', backgroundPosition: 'center bottom', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 15%, rgba(251,251,249,0.4) 85%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-divider" style={{ marginBottom: '80px', opacity: 0.5 }} />

          <div className="reveal glass-card-light" style={{ maxWidth: '1000px', margin: '0 auto', padding: '56px 64px', borderRadius: '32px', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(45,212,191,0.6)' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            
            <div className="trick-solution-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ width: '40px', height: '2px', backgroundColor: '#d46b1a' }} />
                  <span style={{ color: '#d46b1a', fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>The Challenge</span>
                </div>
                
                <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Precision oncology<br />has a targeting problem.
                </h3>
                
                <p style={{ color: '#475569', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
                  Every approved therapy (ADCs, CAR-T, BiTEs, monoclonal antibodies) is chasing the same thing: proteins on the surface of cancer cells. When that target disappears, the cancer wins.
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '48px', display: 'flex', alignItems: 'center', gap: '24px', opacity: 0.6 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px dashed #7e99a8', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #7e99a8' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d46b1a', position: 'absolute' }} />
                    {/* Crosshairs */}
                    <div style={{ position: 'absolute', top: '-6px', bottom: '-6px', left: '50%', width: '1px', backgroundColor: '#7e99a8', transform: 'translateX(-50%)', opacity: 0.5 }} />
                    <div style={{ position: 'absolute', left: '-6px', right: '-6px', top: '50%', height: '1px', backgroundColor: '#7e99a8', transform: 'translateY(-50%)', opacity: 0.5 }} />
                  </div>
                  <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(126,153,168,0.3), transparent)' }} />
                </div>
              </div>
              
              <div style={{ padding: '48px', backgroundColor: 'rgba(45,212,191,0.04)', borderRadius: '24px', border: '1px solid rgba(45,212,191,0.2)', position: 'relative', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.5)' }}>
                <div style={{ position: 'absolute', top: '0', left: '48px', transform: 'translateY(-50%)', backgroundColor: '#0d9488', color: '#fff', padding: '8px 24px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', boxShadow: '0 8px 16px rgba(13,148,136,0.25)' }}>
                  The TRICK Solution
                </div>
                <p style={{ color: '#334155', fontSize: '1.125rem', lineHeight: 1.85, fontWeight: 400 }}>
                  TRICK (Trigger RNA-Induced Cell Killing) is a fresh approach to CRISPR, and the first fully programmable platform capable of targeting any RNA inside a cancer cell. Coding or non-coding. Low-expression or intracellular. TRICK converts that RNA signal into irreparable genomic DNA damage and selective cell death.
                </p>
                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(13,148,136,0.2)' }}>
                  <p style={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.6 }}>
                    Programmable, precise, and applicable to all RNA therapeutics. We have unlocked the full transcriptome as a therapeutic target space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TRICK IS THE NEXT EVOLUTION OF CRISPR PLATFORMS
          ═══════════════════════════════════════════ */}
      <div style={{ position: 'relative', paddingTop: '64px', paddingBottom: '128px', backgroundColor: '#fbfbf9' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/abstract%20background.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.15, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #fbfbf9 0%, rgba(251,251,249,0.4) 15%, rgba(251,251,249,0.4) 85%, #fbfbf9 100%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-divider" style={{ marginBottom: '80px', opacity: 0.5 }} />

          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#d46b1a', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
              The Science
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '48px' }}>
              <span className="gradient-text-warm">TRICK is the Next Evolution</span>
              {' '}of CRISPR Platforms
            </h2>
          </div>

          {/* CRISPR COMPARISON GRAPHIC: Cas9 vs Cas3 vs Cas13 */}
          <div className="reveal crispr-comparison-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', maxWidth: '1000px', margin: '0 auto 64px' }}>

            {/* ─── CRISPR Cas9 ─── */}
            <div className="glass-card-light" style={{ padding: '36px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(126,153,168,0.6)' }}>
              <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '150px', background: 'radial-gradient(circle, rgba(126,153,168,0.06) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              <h4 style={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '6px', position: 'relative', zIndex: 1 }}>CRISPR Cas9</h4>
              <p style={{ color: '#0d9488', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '28px', position: 'relative', zIndex: 1 }}>Targets DNA with single cleavage</p>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
                <svg width="100%" height="auto" viewBox="0 0 280 200" fill="none" style={{ maxWidth: '280px' }}>
                  <defs>
                    <linearGradient id="proteinGrad9" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8a9baa" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#5a6d7a" stopOpacity="0.4"/>
                    </linearGradient>
                    <filter id="proteinShadow9" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                      <feOffset dy="3" result="offsetBlur"/>
                      <feFlood floodColor="#000000" floodOpacity="0.25"/>
                      <feComposite in2="offsetBlur" operator="in"/>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    
                    <clipPath id="leftCyan"><rect x="30" y="100" width="95" height="80" /></clipPath>
                    {/* Orange exactly highlights the distinct 140 bubble region spanning exactly one loop */}
                    <clipPath id="midOrange"><rect x="125" y="100" width="30" height="80" /></clipPath>
                    <clipPath id="rightCyan"><rect x="155" y="100" width="100" height="80" /></clipPath>
                    {/* Cap defines exactly 4 full loops plus the precise 1x / 2x half-caps specified */}
                    <clipPath id="dnaCap"><rect x="50" y="100" width="150" height="80" /></clipPath>

                    {/* Symmetrical DNA Base Waves passing rigidly through center points every 30px */}
                    <path id="dna-base-wave" d="M 5,140 Q 20,115 35,140 T 65,140 T 95,140 T 125,140 T 155,140 T 185,140 T 215,140 T 245,140" fill="none" strokeWidth="4" />

                    <g id="dna-waves" clipPath="url(#dnaCap)">
                      {/* Rungs drawn UNDER the waves to mask precise connection gaps resulting from phase shifts */}
                      <path d="M60,132v16 M70,132v16 M80,128v24 M90,132v16 M100,132v16 M110,128v24 M120,132v16 M130,132v16 M140,128v24 M150,132v16 M160,132v16 M170,128v24 M180,132v16 M190,132v16 M200,128v24" strokeWidth="2.5" opacity="0.9" strokeLinecap="round" />
                      {/* 114 degree Phase shift implemented mechanically via +-9.5px translation on the base centerline wave, generating identical Ableton Tremolo-style projection! */}
                      <use href="#dna-base-wave" transform="translate(9.5, 0)" opacity="0.8" />
                      <use href="#dna-base-wave" transform="translate(-9.5, 0)" opacity="0.6" />
                    </g>
                  </defs>

                  {/* Redesigned Jellybean correctly modeling the right-heavy 'hat' shape seen in reference */}
                  <g filter="url(#proteinShadow9)" opacity="0.8">
                    <path d="M 50,115
                             C 25,115 25,65 60,65
                             C 110,65 140,20 190,20
                             C 250,20 260,115 220,115
                             Z" 
                          fill="url(#proteinGrad9)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M 70,60 C 110,60 140,25 180,25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </g>
                  
                  {/* Comb structure with uniformly spaced teeth mapping to the 5-5-4 constraints */}
                  <g id="rna-comb-visual">
                    <path d="M70,65 L115,65 M70,65v13 M80,65v13 M90,65v13 M100,65v13 M110,65v13" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
                    <path d="M115,65 L165,65 M120,65v13 M130,65v13 M140,65v13 M150,65v13 M160,65v13" stroke="#f0a040" strokeWidth="4" strokeLinecap="round" />
                    <path d="M165,65 L200,65 M170,65v13 M180,65v13 M190,65v13 M200,65v13" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
                  </g>

                  {/* Overlain DNA structurally distinct with highlight matching exactly the 140 bubble site */}
                  <use href="#dna-waves" stroke="#2dd4bf" clipPath="url(#leftCyan)" />
                  <use href="#dna-waves" stroke="#f0a040" clipPath="url(#midOrange)" />
                  <use href="#dna-waves" stroke="#2dd4bf" clipPath="url(#rightCyan)" />

                  {/* Scissors perfectly targeted at center 140. Upwards loops intersecting lowered comb teeth */}
                  <g transform="translate(140, 102) scale(1) rotate(180)">
                    <circle cx="-6.5" cy="18" r="4.5" fill="none" stroke="#e0e0e0" strokeWidth="1.5" />
                    <circle cx="6.5" cy="18" r="4.5" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="-5" y1="14" x2="-2" y2="2" stroke="#e0e0e0" strokeWidth="2" />
                    <line x1="5" y1="14" x2="2" y2="2" stroke="#ffffff" strokeWidth="2" />
                    <path d="M -1.5,1 L 6,-16 L 8,-14 L 1.5,3 Z" fill="#e0e0e0" />
                    <path d="M 1.5,1 L -6,-16 L -8,-14 L -1.5,3 Z" fill="#ffffff" />
                    <circle cx="0" cy="2" r="2" fill="#555" />
                  </g>
                </svg>
              </div>
            </div>

            {/* ─── CRISPR Cas3 ─── */}
            <div className="glass-card-light" style={{ padding: '36px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(240,160,64,0.6)' }}>
              <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '150px', background: 'radial-gradient(circle, rgba(240,160,64,0.06) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              <h4 style={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '6px', position: 'relative', zIndex: 1 }}>CRISPR Cas3</h4>
              <p style={{ color: '#0d9488', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '28px', position: 'relative', zIndex: 1 }}>Targets DNA with processive cleavage of DNA</p>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
                <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="proteinGrad3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8a9baa" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#5a6d7a" stopOpacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="pacmanGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f0a040" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#d46b1a" stopOpacity="0.7"/>
                    </linearGradient>
                    <filter id="proteinShadow3" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                      <feOffset dy="3" result="offsetBlur"/>
                      <feFlood floodColor="#000000" floodOpacity="0.25"/>
                      <feComposite in2="offsetBlur" operator="in"/>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* DNA Double Helix: left portion (intact) */}
                  <path d="M10 130 C25 115, 40 145, 55 130 S85 115, 100 130" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                  <path d="M10 130 C25 145, 40 115, 55 130 S85 145, 100 130" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>

                  {/* Base-pair rungs: left portion */}
                  <line x1="18" y1="125" x2="18" y2="135" stroke="#f0a040" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <line x1="32" y1="133" x2="32" y2="127" stroke="#f0a040" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <line x1="46" y1="138" x2="46" y2="122" stroke="#f0a040" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <line x1="62" y1="134" x2="62" y2="126" stroke="#f0a040" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <line x1="78" y1="124" x2="78" y2="136" stroke="#f0a040" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <line x1="93" y1="127" x2="93" y2="133" stroke="#f0a040" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>

                  {/* Protein blob */}
                  <g filter="url(#proteinShadow3)">
                    <path d="M65 55 C50 40, 75 20, 105 28 C125 15, 150 30, 148 50 C160 55, 155 80, 140 85 C145 100, 120 110, 100 100 C85 110, 55 100, 60 82 C45 78, 45 60, 65 55Z" fill="url(#proteinGrad3)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                    <path d="M80 40 C85 32, 110 28, 120 35" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </g>

                  {/* Guide RNA inside protein */}
                  <path d="M78 70 L85 65 L95 72 L105 62 L112 68" stroke="#2dd4bf" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" fill="none"/>

                  {/* Pac-Man mouth on right side of protein: helicase/nuclease domain */}
                  <path d="M148 62 L168 72 L148 82" fill="url(#pacmanGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  {/* "Teeth" */}
                  <circle cx="155" cy="68" r="1.5" fill="#ffffff" opacity="0.5"/>
                  <circle cx="155" cy="76" r="1.5" fill="#ffffff" opacity="0.5"/>

                  {/* Processive degradation arrows */}
                  <g opacity="0.8">
                    <polygon points="172,69 180,72 172,75" fill="#ffffff" opacity="0.7"/>
                    <polygon points="186,69 194,72 186,75" fill="#ffffff" opacity="0.55"/>
                    <polygon points="200,69 208,72 200,75" fill="#ffffff" opacity="0.4"/>
                  </g>

                  {/* Degraded DNA fragments on right side */}
                  <path d="M175 130 C180 125, 185 135, 195 128" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" opacity="0.15"/>
                  <path d="M190 132 C195 127, 200 134, 210 130" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" opacity="0.1"/>
                  <line x1="178" y1="128" x2="178" y2="132" stroke="#f0a040" strokeWidth="1.5" opacity="0.15" strokeLinecap="round"/>
                  <line x1="195" y1="130" x2="195" y2="134" stroke="#f0a040" strokeWidth="1.5" opacity="0.1" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* ─── CRISPR Cas13 ─── */}
            <div className="glass-card-light" style={{ padding: '36px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(45,212,191,0.6)' }}>
              <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '150px', background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              <h4 style={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '6px', position: 'relative', zIndex: 1 }}>CRISPR Cas13</h4>
              <p style={{ color: '#0d9488', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '28px', position: 'relative', zIndex: 1 }}>Targets RNA with collateral cleavage of RNA</p>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
                <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="proteinGrad13" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8a9baa" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#5a6d7a" stopOpacity="0.4"/>
                    </linearGradient>
                    <filter id="proteinShadow13" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                      <feOffset dy="3" result="offsetBlur"/>
                      <feFlood floodColor="#000000" floodOpacity="0.25"/>
                      <feComposite in2="offsetBlur" operator="in"/>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* DNA Double Helix: Bottom (stays intact, unaffected) */}
                  <path d="M10 145 C25 135, 40 155, 55 145 S85 135, 100 145 S130 155, 145 145 S175 135, 190 145 S215 155, 230 145" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                  <path d="M10 145 C25 155, 40 135, 55 145 S85 155, 100 145 S130 135, 145 145 S175 155, 190 145 S215 135, 230 145" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" opacity="0.15"/>

                  {/* Base-pair rungs: bottom DNA (faded) */}
                  <line x1="18" y1="142" x2="18" y2="148" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="46" y1="148" x2="46" y2="142" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="78" y1="142" x2="78" y2="148" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="108" y1="148" x2="108" y2="142" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="138" y1="142" x2="138" y2="148" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="168" y1="148" x2="168" y2="142" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
                  <line x1="198" y1="142" x2="198" y2="148" stroke="#f0a040" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>

                  {/* Protein blob */}
                  <g filter="url(#proteinShadow13)">
                    <path d="M85 55 C70 40, 95 18, 125 26 C145 13, 170 28, 168 48 C180 53, 175 78, 160 84 C165 98, 140 108, 120 98 C105 108, 75 98, 80 80 C65 76, 65 58, 85 55Z" fill="url(#proteinGrad13)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                    <path d="M100 38 C105 30, 130 26, 140 33" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </g>

                  {/* Guide RNA inside protein */}
                  <path d="M98 68 L105 63 L115 70 L125 60 L132 66" stroke="#2dd4bf" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" fill="none"/>

                  {/* Collateral RNA fragments: flying off in multiple directions */}
                  {/* Top-right fragment */}
                  <g opacity="0.7">
                    <path d="M170 35 C175 30, 180 36, 188 28 C192 24, 198 30, 205 25" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                  {/* Top fragment */}
                  <g opacity="0.55">
                    <path d="M135 15 C140 10, 147 18, 152 12" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  {/* Right fragment */}
                  <g opacity="0.5">
                    <path d="M185 65 C190 60, 197 68, 204 62 C208 58, 215 64, 222 58" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  {/* Bottom-right fragment */}
                  <g opacity="0.4">
                    <path d="M175 100 C180 95, 186 102, 194 96" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  {/* Left fragment */}
                  <g opacity="0.45">
                    <path d="M55 38 C50 32, 42 40, 35 34" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                  {/* Bottom-left fragment */}
                  <g opacity="0.35">
                    <path d="M65 100 C60 94, 52 102, 45 95" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Body text */}
          <div className="reveal" style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.85, maxWidth: '780px', margin: '0 auto 48px', fontWeight: 300 }}>
              TRICK accesses the full transcriptome, including non-coding RNAs, low-expression targets, and intracellular sequences. A target space that remains completely inaccessible to every approved precision therapy today. This is not an incremental improvement on existing CRISPR technologies. It is a new class of medicine.
            </p>
          </div>

          {/* How TRICK Works: Diagram Area */}
          <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', textAlign: 'center', marginBottom: '32px', letterSpacing: '-0.02em' }}>
              How TRICK Works
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '24px',
              padding: '12px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
            }}>
              <div style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '16px', 
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src="/heros/rna-crisper-hero (4).webp" 
                  alt="How TRICK Works" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxHeight: '600px', 
                    objectFit: 'cover', 
                    display: 'block' 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>



      <style>{`
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
