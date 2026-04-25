import { useEffect, useRef } from 'react'

const teamMembers = [
  {
    name: 'Chris Alma',
    role: 'Co-Founder & CEO',
    bio: 'Serial biotech entrepreneur with deep expertise in commercialisation, venture creation, and capital formation. Committed to taking TRICK from discovery to the clinic.',
    photo: '/Chris Alma Headshot.jpg',
    accentFrom: '#d46b1a',
    accentTo: '#e88430',
  },
  {
    name: 'Prof. Peter Fineran',
    role: 'Co-Founder & CSO',
    bio: 'World-leading CRISPR and phage biology researcher. Professor at the University of Otago with 150+ publications. The scientific foundation of the TRICK platform was built in his laboratory.',
    photo: '/Peter Fineran Headshot.png',
    accentFrom: '#0d9488',
    accentTo: '#0891b2',
  },
  {
    name: 'Rob Fagerlund',
    role: 'Co-Founder & CTO',
    bio: "Pioneer in RNA discovery platforms and metagenomic biology. The computational intelligence behind TRICK's target identification and platform design.",
    photo: '/Rob Fagerlund Headshot.jpg',
    accentFrom: '#d97706',
    accentTo: '#d46b1a',
  },
  {
    name: 'Simon Jackson',
    role: 'Co-Founder & COO',
    bio: 'Operations leader with a track record in scaling deep-tech startups from lab to market.',
    photo: '/Simon Jackson Headshot.png',
    accentFrom: '#059669',
    accentTo: '#0d9488',
  },
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
    <section id="team" ref={sectionRef} className="relative py-[160px] overflow-hidden bg-[#fbfbf9]">
      {/* Ambient background watermark */}
      <div className="absolute top-[10%] -left-[15%] opacity-[0.03] w-[1200px] h-[1200px] -rotate-12 pointer-events-none z-0 grayscale">
        <img src="/PLA_logo.svg" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(13,148,136,0.06)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      {/* Gradient overlay blending from previous dark section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--color-midnight)] to-transparent opacity-80 pointer-events-none z-1" />

      <div className="section-container relative z-10">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent max-w-[800px] mx-auto mb-[120px]" />

        {/* Header */}
        <div className="reveal max-w-[800px] mb-[100px]">
          <div className="inline-flex items-center gap-[10px] mb-[24px] px-[24px] py-[8px] rounded-full border border-orange-500/15 bg-orange-500/5">
            <span className="w-[7px] h-[7px] rounded-full bg-[#d46b1a] shadow-[0_0_12px_rgba(212,107,26,0.5)]" />
            <span className="text-[#d46b1a] text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">Our Team</span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-slate-900 leading-[1.05] tracking-[-0.03em] mb-[32px]">
            Built by Scientists,<br/>
            <span className="bg-gradient-to-br from-[#d46b1a] to-[#f0a040] bg-clip-text text-transparent">Driven by&nbsp;Discovery.</span>
          </h2>
          <p className="text-slate-600 text-[1.1875rem] leading-[1.7] max-w-[640px] font-light">
            The Platypus Bio founding team brings together the rarest combination in deep-tech biotech — world-leading academic science, CRISPR biology expertise, computational drug design, and the operational experience to take a platform technology into the clinic.
          </p>
        </div>

        {/* Staggered Cinematic Grid */}
        <div id="team-grid" className="grid grid-cols-2 gap-x-[64px] gap-y-[120px]">
          {teamMembers.map((member, i) => (
            <div 
              key={i} 
              className="reveal relative group" 
              style={{ 
                marginTop: i % 2 === 1 ? '160px' : '0',
                transitionDelay: `${(i % 2) * 0.2}s`
              }}
            >
              {/* Massive Offset Photo */}
              <div className="team-photo-wrapper absolute -top-[50px] z-20 w-[160px] h-[160px]" style={{
                [i % 2 === 0 ? 'right' : 'left']: '-30px',
              }}>
                <div className="w-full h-full rounded-[24px] p-px transition-all duration-[0.6s] ease-out-expo shadow-md group-hover:scale-105 group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)]" style={{
                  background: `linear-gradient(135deg, ${member.accentFrom}, ${member.accentTo})`
                }}>
                  <div className="w-full h-full rounded-[24px] overflow-hidden bg-white">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[15%] contrast-110 brightness-95 transition-all duration-[0.6s] ease-out-expo group-hover:grayscale-0 group-hover:brightness-100"
                    />
                  </div>
                </div>
              </div>

              {/* Glass Details Card */}
              <div 
                className="team-card-body relative z-10 flex flex-col justify-center min-h-[280px] p-[48px] pt-[60px] bg-white/70 backdrop-blur-[24px] border border-slate-200 rounded-[20px] shadow-sm transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-lg group-hover:-translate-y-1" 
                style={{ 
                  paddingRight: i % 2 === 0 ? '140px' : '48px',
                  paddingLeft: i % 2 === 1 ? '140px' : '48px',
                }}
              >
                <div className="absolute top-[24px] opacity-10" style={{ [i % 2 === 0 ? 'left' : 'right']: '24px' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={member.accentFrom} strokeWidth="2"><path d="M12 2L2 22h20L12 2z"/></svg>
                </div>
                
                <p className="text-[0.8125rem] font-bold tracking-[0.1em] uppercase mb-[8px]" style={{ color: member.accentFrom }}>
                  {member.role}
                </p>
                <h3 className="text-slate-900 text-[2rem] font-extrabold tracking-[-0.02em] mb-[24px]">
                  {member.name}
                </h3>
                <p className="text-slate-600 text-[1rem] leading-[1.8] font-light">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #team-grid {
            grid-template-columns: 1fr !important;
            row-gap: 80px !important;
          }
          #team-grid > div {
            margin-top: 0 !important;
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
      `}</style>
    </section>
  )
}
