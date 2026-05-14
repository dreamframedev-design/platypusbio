import { useEffect, useRef, useState } from 'react'

// TRICK mechanism loop — pure SVG + CSS keyframes.
// Six-phase cycle:
//   1. mRNA strand drifting
//   2. Guide RNA enters, scans
//   3. Locks onto target codon, base-pairing pulse
//   4. Effector "DNA shredder" beam fires
//   5. DNA fragments
//   6. Reset, loop
//
// Designed to be deterministic and lightweight — no canvas, no WebGL, no
// runtime randomness. Pauses when offscreen.

const RNA_BASES = ['A', 'U', 'G', 'C', 'A', 'U', 'C', 'G', 'A', 'U', 'G', 'C', 'A', 'U', 'C', 'G', 'A', 'U', 'G', 'C', 'A', 'U']
const TARGET_INDEX = 10 // which base on the strand is the "match"

export default function TrickAnimation() {
  const wrapRef = useRef(null)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!wrapRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setRunning(e.isIntersecting))
      },
      { threshold: 0.05 }
    )
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`trick-anim ${running ? 'is-playing' : 'is-paused'}`}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        aspectRatio: '900 / 420',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(12,26,36,0.92) 0%, rgba(18,34,48,0.96) 100%)',
        border: '1px solid rgba(212,107,26,0.18)',
        boxShadow: '0 24px 80px rgba(12,26,36,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Background grid + ambient glow */}
      <div className="trick-bg-grid" />
      <div className="trick-ambient trick-ambient-orange" />
      <div className="trick-ambient trick-ambient-teal" />

      <svg
        viewBox="0 0 900 420"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          {/* Gradient for guide RNA */}
          <linearGradient id="trick-guide-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0a040" />
            <stop offset="100%" stopColor="#d46b1a" />
          </linearGradient>
          {/* Gradient for effector beam */}
          <linearGradient id="trick-beam-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f0a040" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#d46b1a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.75" />
          </linearGradient>
          {/* Soft glow */}
          <filter id="trick-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          {/* mRNA tube clip */}
          <clipPath id="trick-rna-clip">
            <rect x="40" y="86" width="820" height="48" rx="24" />
          </clipPath>
        </defs>

        {/* ──────── Top label ──────── */}
        <g className="trick-label trick-label-rna">
          <text x="50" y="70" fill="#7e99a8" fontSize="11" fontWeight="700" letterSpacing="3">
            mRNA TRANSCRIPT (TARGET)
          </text>
          <line x1="50" y1="76" x2="220" y2="76" stroke="#d46b1a" strokeWidth="1" opacity="0.4" />
        </g>

        {/* ──────── mRNA tube + drifting bases ──────── */}
        <rect x="40" y="86" width="820" height="48" rx="24" fill="rgba(255,255,255,0.02)" stroke="rgba(212,107,26,0.18)" strokeWidth="1" />
        <g clipPath="url(#trick-rna-clip)">
          <g className="trick-rna-track">
            {[...RNA_BASES, ...RNA_BASES].map((b, i) => {
              const isTarget = i % RNA_BASES.length === TARGET_INDEX
              const isFlanking = Math.abs((i % RNA_BASES.length) - TARGET_INDEX) <= 1
              return (
                <g key={i} transform={`translate(${50 + i * 38}, 110)`}>
                  <circle
                    r="14"
                    fill={isTarget ? 'rgba(240,160,64,0.18)' : 'rgba(126,153,168,0.06)'}
                    stroke={isTarget ? 'rgba(240,160,64,0.6)' : isFlanking ? 'rgba(212,107,26,0.25)' : 'rgba(126,153,168,0.18)'}
                    strokeWidth="1"
                    className={isTarget ? 'trick-target-base' : ''}
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontFamily="ui-monospace, Menlo, monospace"
                    fontWeight="700"
                    fontSize="13"
                    fill={isTarget ? '#f0a040' : '#b8cdd6'}
                  >
                    {b}
                  </text>
                </g>
              )
            })}
          </g>
        </g>

        {/* ──────── Guide RNA scanner ──────── */}
        <g className="trick-guide">
          <g filter="url(#trick-glow)" opacity="0.7">
            <rect x="-46" y="-30" width="92" height="60" rx="14" fill="url(#trick-guide-grad)" opacity="0.35" />
          </g>
          <rect x="-46" y="-30" width="92" height="60" rx="14" fill="url(#trick-guide-grad)" />
          <rect x="-46" y="-30" width="92" height="60" rx="14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <text x="0" y="-8" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" letterSpacing="2">GUIDE</text>
          <text x="0" y="6" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" letterSpacing="2">RNA</text>
          {/* Tick marks suggesting base-pairing */}
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="-30" y1="22" x2="-30" y2="32" />
            <line x1="-15" y1="22" x2="-15" y2="32" />
            <line x1="0"   y1="22" x2="0"   y2="32" />
            <line x1="15"  y1="22" x2="15"  y2="32" />
            <line x1="30"  y1="22" x2="30"  y2="32" />
          </g>
        </g>

        {/* ──────── Recognition pulse rings (fire on lock) ──────── */}
        <g className="trick-pulse" transform="translate(430, 110)">
          <circle r="28" fill="none" stroke="#f0a040" strokeWidth="2" />
          <circle r="28" fill="none" stroke="#f0a040" strokeWidth="1.5" className="trick-pulse-ring trick-pulse-ring-2" />
        </g>

        {/* ──────── Effector "DNA shredder" beam ──────── */}
        <g className="trick-beam">
          <rect x="424" y="138" width="12" height="100" rx="3" fill="url(#trick-beam-grad)" />
          <rect x="421" y="138" width="18" height="100" rx="3" fill="url(#trick-beam-grad)" opacity="0.4" filter="url(#trick-glow)" />
        </g>

        {/* ──────── DNA double helix ──────── */}
        <g className="trick-dna" transform="translate(0, 280)">
          <text x="50" y="-22" fill="#7e99a8" fontSize="11" fontWeight="700" letterSpacing="3">
            GENOMIC DNA
          </text>
          <line x1="50" y1="-16" x2="190" y2="-16" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />

          {/* Two strands as smooth sine paths + base-pair rungs */}
          <path
            className="trick-dna-strand"
            d="M 40 30 C 140 -20, 240 80, 340 30 S 540 -20, 640 30 S 840 80, 860 30"
            stroke="#22d3ee"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
          <path
            className="trick-dna-strand"
            d="M 40 30 C 140 80, 240 -20, 340 30 S 540 80, 640 30 S 840 -20, 860 30"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />

          {/* Base-pair rungs — these are the ones that "shred" */}
          <g className="trick-rungs">
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 50 + i * 47
              return (
                <line
                  key={i}
                  x1={x}
                  y1="12"
                  x2={x}
                  y2="48"
                  stroke="rgba(45,212,191,0.45)"
                  strokeWidth="1.5"
                  className="trick-rung"
                  style={{ animationDelay: `${i * 0.04}s` }}
                />
              )
            })}
          </g>

          {/* Fragmenting debris that scatters during shred */}
          <g className="trick-debris">
            {Array.from({ length: 14 }).map((_, i) => {
              const x = 380 + (i - 7) * 28
              const y = 30 + (i % 2 === 0 ? -1 : 1) * 8
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill={i % 3 === 0 ? '#f0a040' : '#2dd4bf'}
                  className="trick-debris-bit"
                  style={{ '--dx': `${(i - 7) * 14}px`, '--dy': `${(i % 2 === 0 ? -1 : 1) * 50 + (i % 3) * 8}px`, animationDelay: `${i * 0.03}s` }}
                />
              )
            })}
          </g>
        </g>

        {/* ──────── Phase caption (changes per phase) ──────── */}
        <g className="trick-caption">
          <text x="450" y="395" textAnchor="middle" fill="#7e99a8" fontSize="11" fontWeight="700" letterSpacing="4">
            <tspan className="trick-caption-1">SCANNING TRANSCRIPT</tspan>
            <tspan className="trick-caption-2" x="450">RECOGNIZING TARGET RNA</tspan>
            <tspan className="trick-caption-3" x="450">ACTIVATING DNA SHREDDER</tspan>
            <tspan className="trick-caption-4" x="450">CELL DEATH</tspan>
          </text>
        </g>
      </svg>

      <style>{`
        .trick-anim {
          isolation: isolate;
        }
        .trick-anim.is-paused * {
          animation-play-state: paused !important;
        }

        /* Background grid */
        .trick-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,107,26,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .trick-ambient {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          animation: trick-ambient-drift 9s ease-in-out infinite alternate;
        }
        .trick-ambient-orange {
          background: rgba(212,107,26,0.18);
          top: -120px;
          left: -120px;
        }
        .trick-ambient-teal {
          background: rgba(45,212,191,0.14);
          bottom: -120px;
          right: -120px;
          animation-delay: -4s;
        }
        @keyframes trick-ambient-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(40px, 30px); }
        }

        /* mRNA bases drifting left continuously */
        .trick-rna-track {
          animation: trick-rna-drift 10s linear infinite;
        }
        @keyframes trick-rna-drift {
          from { transform: translateX(0); }
          to   { transform: translateX(-${RNA_BASES.length * 38}px); }
        }
        .trick-target-base {
          animation: trick-target-glow 6s ease-in-out infinite;
        }
        @keyframes trick-target-glow {
          0%, 35%, 90%, 100% { opacity: 1; }
          45%, 70% { opacity: 1; transform-origin: center; }
          50% { stroke-width: 2; }
        }

        /* Guide RNA — slides in, scans, locks at center */
        .trick-guide {
          animation: trick-guide-cycle 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes trick-guide-cycle {
          0%   { transform: translate(80px,  170px) scale(0.85); opacity: 0; }
          8%   { transform: translate(160px, 170px) scale(0.95); opacity: 1; }
          25%  { transform: translate(280px, 145px) scale(1); }
          42%  { transform: translate(430px, 110px) scale(1.05); }
          55%  { transform: translate(430px, 110px) scale(1.05); }
          75%  { transform: translate(430px, 110px) scale(1); opacity: 0.9; }
          88%  { transform: translate(430px, 110px) scale(0.92); opacity: 0; }
          100% { transform: translate(80px,  170px) scale(0.85); opacity: 0; }
        }

        /* Recognition pulse — fires when guide locks */
        .trick-pulse {
          opacity: 0;
          animation: trick-pulse-cycle 6s ease-out infinite;
        }
        @keyframes trick-pulse-cycle {
          0%, 41%   { opacity: 0; transform: translate(430px, 110px) scale(0.4); }
          45%       { opacity: 1; transform: translate(430px, 110px) scale(0.6); }
          60%       { opacity: 0; transform: translate(430px, 110px) scale(2.2); }
          100%      { opacity: 0; transform: translate(430px, 110px) scale(2.2); }
        }
        .trick-pulse-ring-2 {
          animation: trick-pulse-ring2 6s ease-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes trick-pulse-ring2 {
          0%, 45%   { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 0.9; transform: scale(1); }
          68%       { opacity: 0; transform: scale(2.6); }
          100%      { opacity: 0; }
        }

        /* Effector beam — fires after lock */
        .trick-beam {
          opacity: 0;
          transform-origin: 430px 138px;
          animation: trick-beam-cycle 6s ease-in-out infinite;
        }
        @keyframes trick-beam-cycle {
          0%, 55%  { opacity: 0; transform: scaleY(0); }
          60%      { opacity: 1; transform: scaleY(0.4); }
          70%      { opacity: 1; transform: scaleY(1); }
          82%      { opacity: 0.7; transform: scaleY(1); }
          88%      { opacity: 0; transform: scaleY(1.05); }
          100%     { opacity: 0; transform: scaleY(0); }
        }

        /* DNA helix lines */
        .trick-dna-strand {
          stroke-dasharray: 1500;
          stroke-dashoffset: 0;
          animation: trick-strand-shred 6s ease-in-out infinite;
        }
        @keyframes trick-strand-shred {
          0%, 65%  { stroke-dashoffset: 0; opacity: 0.85; filter: none; }
          75%      { stroke-dashoffset: 0; opacity: 0.4; filter: blur(0.5px); }
          82%      { stroke-dashoffset: -200; opacity: 0.2; filter: blur(1.5px); }
          90%      { stroke-dashoffset: -400; opacity: 0; }
          95%      { stroke-dashoffset: 0; opacity: 0; }
          100%     { stroke-dashoffset: 0; opacity: 0.85; }
        }

        /* DNA rungs — fragment around the cut site */
        .trick-rung {
          transform-origin: center;
          animation: trick-rung-shred 6s ease-in-out infinite;
        }
        @keyframes trick-rung-shred {
          0%, 68%   { opacity: 0.45; transform: scaleY(1) translateY(0); }
          78%       { opacity: 0.8; transform: scaleY(1.1) translateY(0); }
          85%       { opacity: 0; transform: scaleY(0.2) translateY(8px); }
          95%       { opacity: 0; }
          100%      { opacity: 0.45; transform: scaleY(1) translateY(0); }
        }

        /* Debris particles flying out on shred */
        .trick-debris-bit {
          opacity: 0;
          animation: trick-debris-fly 6s ease-out infinite;
        }
        @keyframes trick-debris-fly {
          0%, 70%   { opacity: 0; transform: translate(0, 0); }
          75%       { opacity: 1; transform: translate(0, 0); }
          92%       { opacity: 0; transform: translate(var(--dx), var(--dy)); }
          100%      { opacity: 0; transform: translate(var(--dx), var(--dy)); }
        }

        /* Captions — cross-fade through phases */
        .trick-caption tspan {
          opacity: 0;
        }
        .trick-caption-1 { animation: trick-cap 6s ease-in-out infinite; }
        .trick-caption-2 { animation: trick-cap 6s ease-in-out infinite; animation-delay: -4.5s; }
        .trick-caption-3 { animation: trick-cap 6s ease-in-out infinite; animation-delay: -2.4s; }
        .trick-caption-4 { animation: trick-cap 6s ease-in-out infinite; animation-delay: -0.9s; }
        @keyframes trick-cap {
          0%, 22%, 100% { opacity: 0; }
          5%, 18%       { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .trick-anim *,
          .trick-anim *::before,
          .trick-anim *::after {
            animation: none !important;
          }
          .trick-guide { transform: translate(430px, 110px); }
        }
      `}</style>
    </div>
  )
}
