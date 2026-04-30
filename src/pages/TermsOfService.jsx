import { useEffect } from 'react'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#0a1118] pt-[160px] pb-[120px] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'url("/heros/rna-crisper-hero (2).webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1118] via-[#0c1a24]/80 to-[#0a1118]" />
      </div>

      <div className="section-container relative z-10 max-w-[900px] mx-auto px-8">
        <div className="reveal mb-16 text-center">
          <p className="text-[#0d9488] text-[1.125rem] font-extrabold tracking-[0.3em] uppercase mb-[16px]">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black text-white leading-[1.1] tracking-[-0.03em] drop-shadow-lg">
            Terms of Service
          </h1>
        </div>

        <div className="reveal p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.4)] bg-[#0c1a24]/40 backdrop-blur-[24px] relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(13,148,136,0.08)_0%,transparent_70%)] blur-[40px] pointer-events-none" />
          
          <div className="max-w-none relative z-10 text-[#b8cdd6] font-light leading-[1.85]">
            <p className="text-sm font-semibold text-[#7e99a8] uppercase tracking-wider mb-8">Last Updated: April 2026</p>
            
            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">1. Agreement to Terms</h2>
            <p className="mb-6">
              By accessing or using the Platypus Bio Pty Ltd ("Platypus Bio", "we", "us", or "our") website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">2. Use License</h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) on Platypus Bio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Platypus Bio's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="mb-6">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Platypus Bio at any time.
            </p>

            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">3. Disclaimer</h2>
            <p className="mb-6">
              The materials on Platypus Bio's website are provided on an 'as is' basis. Platypus Bio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mb-6">
              Further, Platypus Bio does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. The information provided on this website is for general informational purposes only and does not constitute medical or professional advice.
            </p>

            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">4. Limitations</h2>
            <p className="mb-6">
              In no event shall Platypus Bio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Platypus Bio's website, even if Platypus Bio or a Platypus Bio authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">5. Revisions and Errata</h2>
            <p className="mb-6">
              The materials appearing on Platypus Bio's website could include technical, typographical, or photographic errors. Platypus Bio does not warrant that any of the materials on its website are accurate, complete, or current. Platypus Bio may make changes to the materials contained on its website at any time without notice. However, Platypus Bio does not make any commitment to update the materials.
            </p>

            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mt-12 mb-6">6. Governing Law</h2>
            <p className="mb-6">
              These terms and conditions are governed by and construed in accordance with the laws of New South Wales, Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
