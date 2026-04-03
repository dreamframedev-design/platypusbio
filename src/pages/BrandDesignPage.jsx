import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const COLOR_TOKENS = [
  { name: 'Midnight', var: '--color-midnight', hex: '#0c1a24', role: 'Page background, shell' },
  { name: 'Midnight light', var: '--color-midnight-light', hex: '#122230', role: 'Inputs, elevated surfaces' },
  { name: 'Midnight lighter', var: '--color-midnight-lighter', hex: '#1e3745', role: 'Original print navy; mid-depth UI' },
  { name: 'Slate', var: '--color-slate', hex: '#2a4052', role: 'Quiet text, borders' },
  { name: 'Slate light', var: '--color-slate-light', hex: '#3a5a6c', role: 'Scrollbar, footer meta' },
  { name: 'Silver', var: '--color-silver', hex: '#7e99a8', role: 'Secondary body, labels' },
  { name: 'Pearl', var: '--color-pearl', hex: '#b8cdd6', role: 'Default body text on dark' },
  { name: 'Ivory', var: '--color-ivory', hex: '#e0eaf0', role: 'Light tints, shimmer text' },
  { name: 'Platypus orange', var: '--color-platypus-orange', hex: '#d46b1a', role: 'Primary digital orange, CTAs' },
  { name: 'Platypus amber', var: '--color-platypus-amber', hex: '#e88430', role: 'Hover layers, gradients' },
  { name: 'Platypus gold', var: '--color-platypus-gold', hex: '#f0a040', role: 'Warm accents, pipeline' },
  { name: 'Platypus deep', var: '--color-platypus-deep', hex: '#a84d0e', role: 'Gradient shadow end' },
  { name: 'Platypus burnt', var: '--color-platypus-burnt', hex: '#bf5700', role: 'Original print orange' },
  { name: 'Bio teal', var: '--color-bio-teal', hex: '#2dd4bf', role: 'Science accent, links' },
  { name: 'Bio cyan', var: '--color-bio-cyan', hex: '#22d3ee', role: 'Team gradients, variety' },
  { name: 'Bio emerald', var: '--color-bio-emerald', hex: '#34d399', role: 'Team accents' },
]

const PRINT_BRAND = [
  { name: 'Orange (print)', hex: '#bf5700' },
  { name: 'Navy (print)', hex: '#1e3745' },
  { name: 'Light grey (print)', hex: '#f5f5f5', note: 'Collateral on white; site is dark-first' },
]

const ROOT_TOKENS = [
  { name: '--glass-border', value: 'rgba(255, 255, 255, 0.07)' },
  { name: '--glass-bg', value: 'rgba(12, 26, 36, 0.65)' },
  { name: '--glass-bg-hover', value: 'rgba(12, 26, 36, 0.8)' },
  { name: '--ease-out-expo', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { name: '--ease-out-quart', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },
]

const ANIMATIONS = [
  { name: 'fadeInUp', class: '.animate-fade-in-up', note: 'Hero lines, entrance' },
  { name: 'fadeIn', class: '.animate-fade-in', note: 'Scroll cue, subtle reveals' },
  { name: 'pulseGlow', class: '@keyframes pulseGlow', note: 'Available in CSS' },
  { name: 'float', class: '@keyframes float', note: 'Scroll indicator dot' },
  { name: 'shimmer', class: '.shimmer-text', note: 'Animated metallic headline' },
  { name: 'logoSwimIn', class: '.logo-platypus', note: 'Logo mark entrance' },
  { name: 'wordmarkSlideIn', class: '.logo-wordmark', note: 'Wordmark (if used)' },
  { name: 'logoBreath', class: '.logo-platypus-hover:hover', note: 'Playful logo hover' },
  { name: 'statGlow', class: '.stat-number', note: 'Large metric figures' },
]

function Swatch({ name, varName, hex, role }) {
  return (
    <div className="glass-card hoverable" style={{ padding: '18px', borderRadius: '16px' }}>
      <div
        style={{
          height: 76,
          borderRadius: 12,
          background: `var(${varName})`,
          marginBottom: 14,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      />
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#ffffff', marginBottom: 6, letterSpacing: '-0.02em' }}>{name}</div>
      <code style={{ fontSize: '0.6875rem', color: '#7e99a8', display: 'block', marginBottom: 6, wordBreak: 'break-all' }}>{varName}</code>
      <div style={{ fontSize: '0.75rem', color: '#b8cdd6', fontFamily: 'ui-monospace, monospace', marginBottom: 8 }}>{hex}</div>
      <div style={{ fontSize: '0.6875rem', color: '#3a5a6c', lineHeight: 1.45 }}>{role}</div>
    </div>
  )
}

function CodeBlock({ children }) {
  return (
    <pre
      style={{
        margin: '16px 0 0',
        padding: '16px 18px',
        borderRadius: 12,
        background: 'var(--color-midnight-light)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontSize: '0.75rem',
        lineHeight: 1.55,
        color: '#b8cdd6',
        overflowX: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      <code>{children}</code>
    </pre>
  )
}

function SectionTitle({ id, eyebrow, title, children }) {
  return (
    <header id={id} style={{ marginBottom: 40, scrollMarginTop: 100 }}>
      {eyebrow && (
        <p style={{ color: '#d46b1a', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: children ? 16 : 0 }}>
        {title}
      </h2>
      {children}
    </header>
  )
}

export default function BrandDesignPage() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Design system · Platypus Bio (internal)'

    let meta = document.querySelector('meta[name="robots"]')
    let createdMeta = false
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
      createdMeta = true
    }
    const prevRobots = meta.getAttribute('content') ?? ''
    meta.setAttribute('content', 'noindex, nofollow')

    return () => {
      document.title = prevTitle
      if (createdMeta) {
        meta.remove()
      } else {
        if (prevRobots) meta.setAttribute('content', prevRobots)
        else meta.removeAttribute('content')
      }
    }
  }, [])

  const toc = [
    { id: 'foundations', label: 'Foundations' },
    { id: 'colors', label: 'Colour tokens' },
    { id: 'typography', label: 'Typography' },
    { id: 'components', label: 'Components' },
    { id: 'surfaces', label: 'Surfaces & effects' },
    { id: 'motion', label: 'Motion' },
    { id: 'layout', label: 'Layout & grids' },
    { id: 'patterns', label: 'Page patterns' },
    { id: 'assets', label: 'Assets' },
  ]

  return (
    <main style={{ position: 'relative', paddingTop: 100, paddingBottom: 120, minHeight: '100vh' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 10, maxWidth: 1120 }}>
        {/* Confidential strip */}
        <div
          className="reveal visible"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '14px 20px',
            borderRadius: 12,
            marginBottom: 48,
            background: 'rgba(168, 77, 14, 0.12)',
            border: '1px solid rgba(212, 107, 26, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 10px rgba(212,107,26,0.5)' }} />
            <span style={{ color: '#f0a040', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Internal · not linked in navigation
            </span>
          </div>
          <span style={{ color: '#7e99a8', fontSize: '0.75rem' }}>URL: <code style={{ color: '#b8cdd6' }}>/__design</code></span>
        </div>

        <div className="reveal visible" style={{ marginBottom: 56 }}>
          <p style={{ color: '#2dd4bf', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            Platypus Bio · design system v2
          </p>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 20 }}>
            Brand &amp; interface <span className="gradient-text">style guide</span>
          </h1>
          <p style={{ color: '#7e99a8', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: 640 }}>
            Single reference for colours, type, components, motion, and layout conventions used across the marketing site. Source of truth:{' '}
            <code style={{ color: '#b8cdd6' }}>src/index.css</code> and section components.
          </p>
        </div>

        {/* TOC */}
        <nav
          aria-label="On this page"
          className="glass-card"
          style={{
            padding: '20px 24px',
            marginBottom: 56,
            borderRadius: 16,
            position: 'sticky',
            top: 88,
            zIndex: 20,
          }}
        >
          <p style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>On this page</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {toc.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hoverable"
                style={{
                  padding: '6px 12px',
                  borderRadius: 9999,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#7e99a8',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(12,26,36,0.4)',
                  transition: 'all 0.3s var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = 'rgba(45,212,191,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#7e99a8'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Foundations */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="foundations" eyebrow="Strategy" title="Foundations">
            <p style={{ color: '#7e99a8', fontSize: '1rem', lineHeight: 1.75, maxWidth: 720 }}>
              The live site extends the original print palette (orange, navy, light grey) into a dark-first digital system: midnight neutrals, a warmer orange ramp for interaction, and teal–cyan–emerald accents for scientific clarity.
            </p>
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div className="glass-card" style={{ padding: 28, borderRadius: 16 }}>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>Original print brand</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PRINT_BRAND.map((p) => (
                  <div key={p.hex} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: p.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }} />
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>{p.name}</div>
                      <div style={{ color: '#7e99a8', fontSize: '0.75rem', fontFamily: 'monospace' }}>{p.hex}</div>
                      {p.note && <div style={{ color: '#3a5a6c', fontSize: '0.6875rem', marginTop: 4 }}>{p.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card" style={{ padding: 28, borderRadius: 16 }}>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>:root utilities</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {ROOT_TOKENS.map((t) => (
                  <li key={t.name} style={{ marginBottom: 12, fontSize: '0.8125rem', color: '#7e99a8' }}>
                    <code style={{ color: '#2dd4bf' }}>{t.name}</code>
                    <div style={{ color: '#b8cdd6', marginTop: 4, wordBreak: 'break-all', fontSize: '0.75rem' }}>{t.value}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Colours */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="colors" eyebrow="Tokens" title="Colour system">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>
              Defined in <code style={{ color: '#b8cdd6' }}>@theme</code> in <code style={{ color: '#b8cdd6' }}>index.css</code>. Use CSS variables for inline styles; Tailwind v4 maps these to utilities (e.g. <code style={{ color: '#b8cdd6' }}>text-pearl</code>, <code style={{ color: '#b8cdd6' }}>bg-midnight</code>).
            </p>
          </SectionTitle>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {COLOR_TOKENS.map((c) => (
              <Swatch key={c.var} name={c.name} varName={c.var} hex={c.hex} role={c.role} />
            ))}
          </div>
          <div className="glass-card" style={{ marginTop: 28, padding: 24, borderRadius: 16 }}>
            <h4 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>Common overlays (inline)</h4>
            <CodeBlock>{`rgba(12, 26, 36, 0.65–0.8)  — glass surfaces
rgba(255, 255, 255, 0.05–0.1) — borders
rgba(212, 107, 26, 0.15–0.35) — orange glow / focus
::selection — rgba(212, 107, 26, 0.3) on text`}</CodeBlock>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Typography */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="typography" eyebrow="Type" title="Typography">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>
              <strong style={{ color: '#b8cdd6', fontWeight: 600 }}>Inter</strong> (300–900) from Google Fonts. Body default: pearl on midnight, line-height ~1.6–1.8.
            </p>
          </SectionTitle>
          <div className="glass-card" style={{ padding: 32, borderRadius: 16, marginBottom: 20 }}>
            <p style={{ color: '#7e99a8', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Eyebrow / label</p>
            <p style={{ color: '#d46b1a', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>Alternate accent colour for labels</p>
            <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
              Display headline — clamp, weight 800
            </h3>
            <h4 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Section title
            </h4>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 300, color: '#7e99a8', lineHeight: 1.8, letterSpacing: '0.01em', marginBottom: 16 }}>
              Hero subcopy pattern: lighter weight, silver, generous line-height.
            </p>
            <p style={{ fontSize: '1rem', color: '#b8cdd6', lineHeight: 1.75 }}>Standard body on dark cards and long-form readability.</p>
          </div>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 700, marginBottom: 12 }}>.gradient-text</p>
              <p className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Orange → amber → teal
              </p>
            </div>
            <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 700, marginBottom: 12 }}>.gradient-text-warm</p>
              <p className="gradient-text-warm" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Orange → gold
              </p>
            </div>
            <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
              <p style={{ color: '#7e99a8', fontSize: '0.75rem', fontWeight: 700, marginBottom: 12 }}>.shimmer-text</p>
              <p className="shimmer-text" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Shimmer headline
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Components */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="components" eyebrow="UI" title="Components">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>Interactive primitives and content blocks used in Hero, Navbar, forms, and sections.</p>
          </SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 28 }}>
            <Link to="/contact" className="cta-button hoverable">
              <span>.cta-button</span>
              <svg style={{ width: 16, height: 16, position: 'relative', zIndex: 1 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/"
              className="hoverable"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                color: '#7e99a8',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                background: 'rgba(12,26,36,0.3)',
              }}
            >
              Secondary ghost
            </Link>
            <Link to="/" className="cta-button hoverable" style={{ padding: '12px 28px', fontSize: '0.8125rem', borderRadius: 9999 }}>
              <span>Navbar pill CTA</span>
            </Link>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28, padding: '8px 24px', borderRadius: 9999, border: '1px solid rgba(212,107,26,0.15)', background: 'rgba(12, 26, 36, 0.7)', backdropFilter: 'blur(16px)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#d46b1a', boxShadow: '0 0 12px rgba(212,107,26,0.6)' }} />
            <span style={{ color: '#7e99a8', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Hero badge pattern</span>
          </div>
          <div className="glass-card" style={{ padding: 28, borderRadius: 16, maxWidth: 480 }}>
            <p style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 16 }}>Form field pattern (contact)</p>
            <label style={{ color: '#7e99a8', fontSize: '0.8125rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Label</label>
            <input
              readOnly
              placeholder="Input"
              className="hoverable"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 16px',
                background: '#122230',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                color: '#ffffff',
                fontSize: '0.9375rem',
                outline: 'none',
              }}
            />
            <p style={{ color: '#3a5a6c', fontSize: '0.6875rem', marginTop: 16 }}>Focus states: brighten border; keep 12px radius.</p>
          </div>
          <div style={{ marginTop: 24 }}>
            <CodeBlock>{`.hoverable     — expands custom cursor hit targets (see App.jsx)
a, button, input, textarea — also cursor targets`}</CodeBlock>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Surfaces */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="surfaces" eyebrow="Depth" title="Surfaces & global effects">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>Glassmorphism, dividers, and atmospheric layers.</p>
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div className="glass-card hoverable" style={{ padding: 32, borderRadius: 20 }}>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>.glass-card</h4>
              <p style={{ color: '#7e99a8', fontSize: '0.875rem', lineHeight: 1.65 }}>Blur 24px, 20px radius, hover lift with orange border glow.</p>
            </div>
            <div style={{ padding: 32, borderRadius: 20, background: 'var(--color-midnight-light)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Flat panel</h4>
              <p style={{ color: '#7e99a8', fontSize: '0.875rem', lineHeight: 1.65 }}>Midnight light fill — used for form fields and dense UI.</p>
            </div>
          </div>
          <p style={{ color: '#7e99a8', fontSize: '0.8125rem', marginTop: 28, marginBottom: 12 }}>.section-divider</p>
          <div className="section-divider" style={{ maxWidth: '100%' }} />
          <p style={{ color: '#7e99a8', fontSize: '0.8125rem', marginTop: 32, marginBottom: 12 }}>.genomic-noise (fixed, site-wide)</p>
          <p style={{ color: '#3a5a6c', fontSize: '0.8125rem' }}>Applied in App root — subtle SVG fractal noise at 2.5% opacity.</p>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Motion */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="motion" eyebrow="Motion" title="Animation & reveal">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>
              Easing defaults to <code style={{ color: '#b8cdd6' }}>--ease-out-expo</code>. Section entrances use IntersectionObserver on <code style={{ color: '#b8cdd6' }}>.reveal</code> and <code style={{ color: '#b8cdd6' }}>.reveal-scale</code>.
            </p>
          </SectionTitle>
          <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <span className="animate-fade-in-up" style={{ padding: '10px 16px', background: 'rgba(45,212,191,0.12)', borderRadius: 8, color: '#2dd4bf', fontSize: '0.8125rem', fontWeight: 600 }}>
                .animate-fade-in-up
              </span>
              <span className="animate-fade-in" style={{ padding: '10px 16px', background: 'rgba(212,107,26,0.12)', borderRadius: 8, color: '#f0a040', fontSize: '0.8125rem', fontWeight: 600 }}>
                .animate-fade-in
              </span>
            </div>
            <p style={{ color: '#7e99a8', fontSize: '0.8125rem', marginBottom: 8 }}>Stagger: <code style={{ color: '#b8cdd6' }}>.delay-100</code> … <code style={{ color: '#b8cdd6' }}>.delay-800</code></p>
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--color-midnight-light)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', color: '#b8cdd6', fontWeight: 600 }}>Animation</th>
                  <th style={{ padding: '12px 16px', color: '#b8cdd6', fontWeight: 600 }}>Class / hook</th>
                  <th style={{ padding: '12px 16px', color: '#b8cdd6', fontWeight: 600 }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                {ANIMATIONS.map((row, i) => (
                  <tr key={row.name} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 ? 'rgba(12,26,36,0.35)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '12px 16px', color: '#2dd4bf', fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.class}</td>
                    <td style={{ padding: '12px 16px', color: '#7e99a8' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Layout */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="layout" eyebrow="Grid" title="Layout & spacing">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>
              Horizontal rhythm is controlled by <code style={{ color: '#b8cdd6' }}>.section-container</code> (max-width 1280px; padding 24 → 48 → 64px by breakpoint).
            </p>
          </SectionTitle>
          <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 12 }}>12-column bento (Metagenome narrative)</h4>
            <p style={{ color: '#7e99a8', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 12 }}>
              <code style={{ color: '#b8cdd6' }}>.bento-grid</code> with <code style={{ color: '#b8cdd6' }}>.bento-full</code> (span 12) and <code style={{ color: '#b8cdd6' }}>.bento-half</code> (span 6 → 12 on small screens). Gap 24px.
            </p>
          </div>
          <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 12 }}>Pipeline cards</h4>
            <p style={{ color: '#7e99a8', fontSize: '0.875rem', lineHeight: 1.65 }}>
              <code style={{ color: '#b8cdd6' }}>.glass-card.pipeline-card</code> + <code style={{ color: '#b8cdd6' }}>.pipeline-flex</code> — stacks on narrow viewports (see Pipeline.jsx embedded media queries).
            </p>
          </div>
          <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 12 }}>Team grid</h4>
            <p style={{ color: '#7e99a8', fontSize: '0.875rem', lineHeight: 1.65 }}>
              <code style={{ color: '#b8cdd6' }}>#team-grid</code> with photo wrapper + <code style={{ color: '#b8cdd6' }}>.team-card-body</code> glass cards; hover choreography in Team.jsx.
            </p>
          </div>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Patterns */}
        <section style={{ marginBottom: 80 }} className="reveal visible">
          <SectionTitle id="patterns" eyebrow="Pages" title="Section & page patterns">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>Recurring structure across routes.</p>
          </SectionTitle>
          <ul style={{ color: '#b8cdd6', lineHeight: 2, paddingLeft: 20, fontSize: '0.9375rem' }}>
            <li>
              <strong style={{ color: '#fff' }}>Home</strong> — Hero (MetagenomeCanvas + gradient scrim), narrative bento, pipeline, team, contact teaser, CTA band.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Contact</strong> — Split layout: gradient headline + glass form; teal accent on email and success state.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Navbar</strong> — Transparent to blurred glass on scroll; mobile sheet; pill CTA.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Footer</strong> — Large gradient wordmark line, multi-column links, social chips, legal row in slate-light.
            </li>
          </ul>
        </section>

        <div className="section-divider" style={{ marginBottom: 64 }} />

        {/* Assets */}
        <section style={{ marginBottom: 48 }} className="reveal visible">
          <SectionTitle id="assets" eyebrow="Files" title="Brand assets">
            <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginTop: 8 }}>Public static paths referenced in components.</p>
          </SectionTitle>
          <div className="glass-card" style={{ padding: 28, borderRadius: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#b8cdd6', lineHeight: 2, fontSize: '0.875rem' }}>
              <li>
                <code style={{ color: '#2dd4bf' }}>/PLA_logos-01.svg</code> — ambient watermark (Hero)
              </li>
              <li>
                <code style={{ color: '#2dd4bf' }}>/PLA_logos-02.svg</code> — mark + favicon
              </li>
            </ul>
            <p style={{ color: '#3a5a6c', fontSize: '0.8125rem', marginTop: 20, lineHeight: 1.6 }}>
              Logo treatments: <code style={{ color: '#7e99a8' }}>.logo-platypus</code>, <code style={{ color: '#7e99a8' }}>.logo-platypus-hover</code>; drop-shadow may use original orange <code style={{ color: '#7e99a8' }}>rgba(191, 87, 0, …)</code>.
            </p>
          </div>
        </section>

        {/* Headshot demo */}
        <section style={{ marginBottom: 56 }} className="reveal visible">
          <h3 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.02em' }}>.headshot-container</h3>
          <div className="glass-card hoverable" style={{ padding: 40, borderRadius: 20, maxWidth: 320, textAlign: 'center' }}>
            <div className="headshot-container">
              <img src="/PLA_logos-02.svg" alt="" style={{ objectFit: 'contain', padding: '18%', filter: 'none' }} />
            </div>
            <p style={{ color: '#7e99a8', fontSize: '0.8125rem' }}>Gradient ring orange → teal; inner midnight ring; grayscale relaxes on card hover.</p>
          </div>
        </section>

        <div className="glass-card" style={{ padding: 32, borderRadius: 20, textAlign: 'center' }}>
          <p style={{ color: '#7e99a8', fontSize: '0.9375rem', marginBottom: 20 }}>This URL is intentionally omitted from navigation. Share only with the team.</p>
          <Link to="/" className="cta-button hoverable">
            <span>Back to site</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
