// Pure-CSS marquee strip. Duplicates content twice so the loop is seamless.
// Designed as a thin transitional accent between sections — low contrast,
// slow speed.
export default function Marquee({
  items,
  speed = 60,
  direction = 'left',
  background = 'transparent',
  color = 'rgba(15,23,42,0.45)',
  border = false,
}) {
  const dir = direction === 'right' ? 'reverse' : 'normal'
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background,
        borderTop: border ? '1px solid rgba(15,23,42,0.06)' : 'none',
        borderBottom: border ? '1px solid rgba(15,23,42,0.06)' : 'none',
        padding: '18px 0',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: dir,
          willChange: 'transform',
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: 'inline-flex', alignItems: 'center', gap: '64px', paddingRight: '64px' }}>
            {items.map((it, i) => (
              <span
                key={`${dup}-${i}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '64px',
                  color,
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                {it}
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d46b1a', flexShrink: 0, opacity: 0.7 }} />
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] [style*="marquee-scroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
