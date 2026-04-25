import { useState, useEffect } from 'react'
import MetagenomeCanvas from './MetagenomeCanvas'

export default function Hero({ cursorPos }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#fbfbf9]">
      <MetagenomeCanvas cursorPos={cursorPos} />

      {/* Massive ambient background logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 opacity-[0.03] w-[140vw] h-[140vh] pointer-events-none z-0">
        <img src="/PLA_logos-01.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Gradient overlays for light theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbfbf9] z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent,rgba(251,251,249,0.6))] z-1" />

      <div className="relative z-10 text-center max-w-[960px] mx-auto mt-[140px] px-8">
        {/* Animated Platypus Logo Mark */}
        <div className="logo-platypus mb-[40px]">
          <div className="logo-platypus-hover inline-block">
            <img
              src="/PLA_logos-02.svg"
              alt="Platypus Bio"
              className="w-[110px] h-[110px] object-contain drop-shadow-[0_8px_32px_rgba(191,87,0,0.3)] filter brightness-100"
            />
          </div>
        </div>

        {/* Headline — verbatim from sitemap */}
        <h1 className="animate-fade-in-up delay-300 text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold text-slate-900 leading-[1.05] tracking-[-0.04em] mb-[28px]">
          Transforming medicine with{' '}
          <span className="gradient-text-warm">precision cell killing</span>
        </h1>

        {/* Sub — TRICK positioning */}
        <p className="animate-fade-in-up delay-400 text-[clamp(1rem,1.5vw,1.2rem)] text-slate-600 max-w-[640px] mx-auto mb-[48px] leading-[1.8] font-light tracking-[0.01em]">
          TRICK (Trigger RNA-Induced Cell Killing) is a first-in-class programmable CRISPR platform that targets any RNA inside a cancer cell — unlocking the full transcriptome as a therapeutic target space.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up delay-500 flex flex-wrap items-center justify-center gap-[16px]">
          <a href="#contact" className="cta-button hoverable shadow-lg shadow-orange-500/20">
            <span>Get in Touch</span>
            <svg className="w-[16px] h-[16px] relative z-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#science"
            className="hoverable inline-flex items-center gap-[8px] px-[28px] py-[14px] text-slate-600 border border-slate-200 rounded-xl text-[0.875rem] font-medium no-underline transition-all duration-400 backdrop-blur-[8px] bg-white/50 hover:bg-white hover:text-slate-900 hover:border-orange-500/30 hover:shadow-md"
          >
            Explore the Science
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in delay-800 mt-[80px]">
          <div className="w-[24px] h-[42px] rounded-full border-2 border-slate-200 flex justify-center pt-[8px] mx-auto bg-white/30 backdrop-blur-sm">
            <div className="w-[3px] h-[10px] rounded-full bg-gradient-to-b from-[#d46b1a] to-transparent animate-[float_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Hero Art Placeholder — for when custom art is made */}
      {/* The MetagenomeCanvas above provides the animated background */}
    </section>
  )
}
