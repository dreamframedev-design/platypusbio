import { useState } from 'react'

const CORRECT = 'energyarmor'
const ACCESS_KEY = 'platypusbio_site_access'

export function readSiteAccess() {
  try {
    return sessionStorage.getItem(ACCESS_KEY) === '1'
  } catch {
    return false
  }
}

function grantSiteAccess() {
  try {
    sessionStorage.setItem(ACCESS_KEY, '1')
  } catch {
    /* ignore */
  }
}

export default function SitePasswordWall({ onUnlocked }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function submit(e) {
    e.preventDefault()
    const ok = value.trim().toLowerCase() === CORRECT.toLowerCase()
    if (ok) {
      grantSiteAccess()
      setError(false)
      onUnlocked()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        className="glass-card hoverable"
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '48px 40px',
          borderRadius: 20,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#d46b1a',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Platypus Bio
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          This site is private
        </h1>
        <p style={{ color: '#7e99a8', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: 28 }}>
          Enter the access password to continue.
        </p>
        <form onSubmit={submit}>
          <label htmlFor="site-password" className="sr-only">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            placeholder="Password"
            className="hoverable"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '14px 16px',
              marginBottom: 16,
              background: '#122230',
              border: error ? '1px solid rgba(212, 107, 26, 0.45)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              color: '#ffffff',
              fontSize: '0.9375rem',
              outline: 'none',
            }}
          />
          {error && (
            <p style={{ color: '#e88430', fontSize: '0.8125rem', marginBottom: 16, fontWeight: 500 }}>Incorrect password.</p>
          )}
          <button type="submit" className="cta-button hoverable" style={{ width: '100%', justifyContent: 'center' }}>
            <span>Continue</span>
          </button>
        </form>
      </div>
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </main>
  )
}
