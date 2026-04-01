import { useEffect, useRef } from 'react'

const teamMembers = [
  {
    name: 'Chris Alma',
    role: 'Co-Founder & CEO',
    bio: 'Serial entrepreneur with deep expertise in biotech commercialisation and venture creation.',
    photo: '/Chris Alma Headshot.jpg',
    accentFrom: '#d46b1a',
    accentTo: '#e88430',
  },
  {
    name: 'Prof. Peter Fineran',
    role: 'Co-Founder & CSO',
    bio: 'World-leading CRISPR and phage biology researcher. Professor at the University of Otago with 150+ publications.',
    photo: '/Peter Fineran Headshot.png',
    accentFrom: '#2dd4bf',
    accentTo: '#22d3ee',
  },
  {
    name: 'Rob Fagerlund',
    role: 'Co-Founder & CTO',
    bio: 'Expert in metagenomic sequencing and computational biology. Pioneer in environmental RNA discovery platforms.',
    photo: '/Rob Fagerlund Headshot.jpg',
    accentFrom: '#f0a040',
    accentTo: '#d46b1a',
  },
  {
    name: 'Simon Jackson',
    role: 'Co-Founder & COO',
    bio: 'Operations leader with a track record in scaling deep-tech startups from lab to market.',
    photo: '/Simon Jackson Headshot.png',
    accentFrom: '#34d399',
    accentTo: '#2dd4bf',
  },
]

const partners = [
  'Bioplatforms Australia',
  'CSIRO',
  'NSW Health',
  'University of Sydney',
  'Garvan Institute',
  'WEHI',
]

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" ref={sectionRef} style={{ position: 'relative', paddingTop: '160px', paddingBottom: '160px', overflow: 'hidden' }}>
      {/* Ambient background watermark */}
      <div style={{ position: 'absolute', top: '10%', left: '-15%', opacity: 0.015, width: '1200px', height: '1200px', transform: 'rotate(-10deg)', pointerEvents: 'none', zIndex: 0 }}>
        <img src="/PLA_logo.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(45, 212, 191, 0.04) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '120px' }} />

        {/* Header */}
        <div className="reveal" style={{ maxWidth: '800px', marginBottom: '100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px', padding: '8px 24px', borderRadius: '9999px', border: '1px solid rgba(212,107,26,0.15)', background: 'rgba(212,107,26,0.04)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 12px rgba(212,107,26,0.5)' }} />
            <span style={{ color: '#d46b1a', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Team</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px' }}>
            Built by Scientists,<br/>
            <span className="gradient-text-warm">Driven by&nbsp;Discovery.</span>
          </h2>
          <p style={{ color: '#7e99a8', fontSize: '1.1875rem', lineHeight: 1.7, maxWidth: '600px' }}>
            Our founding team combines deep expertise in metagenomics, CRISPR biology, computational drug design, and biotech commercialisation.
          </p>
        </div>

        {/* Master Level Staggered Cinematic Grid */}
        <div id="team-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', 
          columnGap: '64px', 
          rowGap: '120px', 
          marginBottom: '160px' 
        }}>
          {teamMembers.map((member, i) => (
            <div 
              key={i} 
              className="reveal" 
              style={{ 
                position: 'relative',
                marginTop: i % 2 === 1 ? '160px' : '0',
                transitionDelay: `${(i % 2) * 0.2}s`
              }}
            >
              {/* Massive Offset Photo */}
              <div className="team-photo-wrapper" style={{
                position: 'absolute',
                top: '-50px',
                [i % 2 === 0 ? 'right' : 'left']: '-30px',
                width: '160px',
                height: '160px',
                zIndex: 20
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '24px',
                  background: `linear-gradient(135deg, ${member.accentFrom}, ${member.accentTo})`,
                  padding: '1px',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', background: '#0c1a24' }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'grayscale(15%) contrast(1.1) brightness(0.95)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="team-img-hover"
                    />
                  </div>
                </div>
              </div>

              {/* Glass Details Card */}
              <div 
                className="glass-card team-card-body" 
                style={{ 
                  padding: '48px',
                  paddingTop: '60px',
                  paddingRight: i % 2 === 0 ? '140px' : '48px',
                  paddingLeft: i % 2 === 1 ? '140px' : '48px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  minHeight: '280px',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                <div style={{ position: 'absolute', top: '24px', [i % 2 === 0 ? 'left' : 'right']: '24px', opacity: 0.1 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={member.accentFrom} strokeWidth="1"><path d="M12 2L2 22h20L12 2z"/></svg>
                </div>
                
                <p style={{ color: member.accentFrom, fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {member.role}
                </p>
                <h3 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.8 }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Strip */}
        <div className="reveal glass-card" style={{ padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(212,107,26,0.05), transparent 50%, rgba(45, 212, 191, 0.05))' }} />
          <h4 style={{ position: 'relative', color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '40px' }}>
            Trusted by world-leading <span style={{ color: '#2dd4bf' }}>research institutions</span>
          </h4>
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '32px 64px' }}>
            {partners.map((partner, i) => (
              <span key={i} style={{ 
                color: '#7e99a8', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '0.02em',
                transition: 'color 0.4s', cursor: 'default'
              }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#7e99a8'}>
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #team-grid {
            grid-template-columns: 1fr !important;
            rowGap: 80px !important;
          }
          #team-grid > div {
            marginTop: 0 !important;
          }
          .team-photo-wrapper {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            left: 0 !important;
            margin-bottom: -40px !important;
            margin-left: 24px !important;
            width: 120px !important;
            height: 120px !important;
          }
          .team-card-body {
            padding: 40px 32px !important;
            padding-top: 60px !important;
          }
        }
        .team-card-body:hover {
          border-color: rgba(255,255,255,0.15) !important;
        }
        .team-card-body:hover ~ .team-photo-wrapper > div {
          transform: scale(1.04) !important;
          box-shadow: 0 32px 64px rgba(0,0,0,0.6) !important;
        }
        .team-card-body:hover ~ .team-photo-wrapper img {
          filter: grayscale(0%) contrast(1.1) brightness(1) !important;
        }
        /* Handle direct hover on photo too */
        .team-photo-wrapper:hover > div {
          transform: scale(1.04) !important;
        }
        .team-photo-wrapper:hover img {
          filter: grayscale(0%) contrast(1.1) brightness(1) !important;
        }
      `}</style>
    </section>
  )
}

