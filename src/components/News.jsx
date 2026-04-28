import { useEffect, useRef } from 'react'

const newsItems = [
  {
    headline: 'Ginkgo Bioworks Partners with Carnegie-Mellon University to Develop Innovative New Cancer Screening Approach',
    description: 'Revolutionizing early cancer detection with at-home technology.',
    date: '2025',
    link: '#',
    hasImage: false,
  },
  {
    headline: 'NSW RNA Pipeline Grants 2025 — Platypus Bio Selected as Recipient',
    description: 'Platypus Bio receives support through the NSW RNA Pipeline Grants program to advance TRICK platform development.',
    date: '2025',
    link: 'https://www.nsw.gov.au/grants-and-funding/rna-pipeline-grants-2025/recipients',
    hasImage: false,
  },
]

export default function News() {
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
    <section id="news" ref={sectionRef} style={{ position: 'relative', paddingTop: '128px', paddingBottom: '128px', overflow: 'hidden', backgroundColor: '#fbfbf9' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', right: '0', width: '600px', height: '600px', background: 'rgba(240,160,64,0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-divider" style={{ marginBottom: '80px', opacity: 0.5 }} />

        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto 80px' }}>
          <p style={{ color: '#d46b1a', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            News
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Latest from{' '}
            <span className="gradient-text-warm">Platypus Bio.</span>
          </h2>
        </div>

        {/* News Grid */}
        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {newsItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="reveal glass-card-light hoverable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                overflow: 'hidden',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Image placeholder */}
              <div style={{
                width: '100%',
                height: '200px',
                background: 'linear-gradient(135deg, rgba(212,107,26,0.08) 0%, rgba(45,212,191,0.05) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `url(/abtract2.webp) center/cover`, filter: 'invert(1) contrast(1.2)', mixBlendMode: 'multiply', opacity: 0.15, pointerEvents: 'none' }} />
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.2, position: 'relative', zIndex: 1 }}>
                  <rect x="4" y="8" width="40" height="32" rx="4" stroke="#475569" strokeWidth="1.5"/>
                  <path d="M4 32l12-10 8 6 12-10 8 6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="16" cy="18" r="4" stroke="#475569" strokeWidth="1.5"/>
                </svg>
              </div>

              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Date */}
                <span style={{ color: '#d46b1a', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {item.date}
                </span>

                {/* Headline */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: '12px' }}>
                  {item.headline}
                </h3>

                {/* Description */}
                <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '24px', flex: 1, fontWeight: 300 }}>
                  {item.description}
                </p>

                {/* Read more */}
                <span style={{ color: '#d46b1a', fontSize: '0.8125rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .news-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
