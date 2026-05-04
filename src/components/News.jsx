import { useEffect, useRef } from 'react'

const newsItems = [
  {
    headline: 'Ginkgo Bioworks Partners with Carnegie-Mellon University to Develop Innovative New Cancer Screening Approach',
    date: 'Apr 21, 2026',
    link: '#',
  },
  {
    headline: 'NSW RNA Pipeline Grants 2025: Platypus Bio Selected as Recipient',
    date: 'Jan 15, 2025',
    link: 'https://www.nsw.gov.au/grants-and-funding/rna-pipeline-grants-2025/recipients',
  },
]

const eventItems = [
  {
    headline: 'Platypus Bio to Present Final Phase II Data at the AACR Annual Meeting 2026',
    date: 'Mar 17, 2026',
    link: '#',
  },
  {
    headline: 'Platypus Bio will host Capital Markets Day',
    date: 'Jun 1, 2025',
    link: '#',
  }
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

        <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto 80px', textAlign: 'center' }}>
          <p style={{ color: '#d46b1a', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Updates
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            News &amp; <span className="gradient-text-warm">Events</span>
          </h2>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px' }}>
          
          {/* News Section */}
          <div className="reveal glass-card-light" style={{ padding: '48px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid rgba(13,148,136,0.2)' }}>
              Press Releases &amp; Other News
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {newsItems.map((item, i) => (
                <li key={i} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', display: 'block' }} className="news-list-item">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ color: '#d46b1a', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                        {item.date}
                      </span>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4, margin: 0, transition: 'color 0.2s ease' }} className="news-title">
                        {item.headline}
                      </h4>
                      <span style={{ color: '#0d9488', fontSize: '0.875rem', fontWeight: 600, marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Read more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Section */}
          <div className="reveal glass-card-light" style={{ padding: '48px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid rgba(212,107,26,0.2)' }}>
              Events
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {eventItems.map((item, i) => (
                <li key={i} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', display: 'block' }} className="news-list-item">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ color: '#0d9488', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                        {item.date}
                      </span>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4, margin: 0, transition: 'color 0.2s ease' }} className="news-title">
                        {item.headline}
                      </h4>
                      <span style={{ color: '#d46b1a', fontSize: '0.875rem', fontWeight: 600, marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Read more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <style>{`
        .news-list-item:hover .news-title {
          color: #d46b1a !important;
        }
      `}</style>
    </section>
  )
}