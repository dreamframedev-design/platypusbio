import { useEffect, useRef } from 'react'

const newsItems = [
  {
    headline: 'Ginkgo Bioworks Partners with Carnegie-Mellon University to Develop Innovative New Cancer Screening Approach',
    descriptor: 'Revolutionizing early cancer detection with at-home technology',
    date: 'Apr 21, 2026',
    link: 'https://npd-web.matrix.squiz.cloud/ocse/industry-development/commercialisation-grants/rna-pipeline-grants',
    image: '/heros/hero1.webp',
  },
  {
    headline: 'NSW RNA Pipeline Grants 2025: Platypus Bio Selected as Recipient',
    descriptor: 'Platypus Bio receives funding to advance RNA-targeted therapeutics.',
    date: 'Jan 15, 2025',
    link: 'https://www.nsw.gov.au/grants-and-funding/rna-pipeline-grants-2025/recipients',
    image: '/abtract2.webp',
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
            News
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Latest from <span className="gradient-text-warm">Platypus Bio.</span>
          </h2>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          
          {newsItems.map((item, i) => (
            <div key={i} className="reveal glass-card-light" style={{ display: 'flex', flexDirection: 'column', borderRadius: '24px', overflow: 'hidden', transitionDelay: `${i * 0.15}s`, padding: 0 }}>
              {/* Image Block */}
              <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.headline} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="news-image" />
              </div>
              
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ color: '#d46b1a', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '12px' }}>
                  {item.date}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '16px' }}>
                  {item.headline}
                </h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  {item.descriptor}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0d9488', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }} className="news-link">
                  Read more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>

      <style>{`
        .glass-card-light:hover .news-image {
          transform: scale(1.05);
        }
        .glass-card-light:hover .news-link {
          color: #d46b1a !important;
        }
        .news-link {
          transition: color 0.3s ease;
        }
      `}</style>
    </section>
  )
}