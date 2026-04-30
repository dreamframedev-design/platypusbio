import { useEffect } from 'react'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#fbfbf9] pt-[160px] pb-[120px] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fbfbf9]" />
        <div 
          className="absolute inset-0 opacity-20 mix-blend-multiply filter invert contrast-125"
          style={{ backgroundImage: 'url("/heros/rna-crisper-hero (1).webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>

      <div className="section-container relative z-10 max-w-[900px] mx-auto px-8">
        <div className="reveal mb-16 text-center">
          <p className="text-[#d46b1a] text-[1.125rem] font-extrabold tracking-[0.3em] uppercase mb-[16px]">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black text-slate-900 leading-[1.1] tracking-[-0.03em] drop-shadow-sm">
            Privacy Policy
          </h1>
        </div>

        <div className="reveal glass-card-light p-8 md:p-16 rounded-[2rem] border-t-2 border-[#d46b1a]/60 shadow-[0_16px_48px_rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,107,26,0.05)_0%,transparent_70%)] blur-[40px] pointer-events-none" />
          
          <div className="max-w-none relative z-10 text-slate-600 font-light leading-[1.85]">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Last Updated: April 2026</p>
            
            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">1. Introduction</h2>
            <p className="mb-6">
              Platypus Bio Pty Ltd ("Platypus Bio", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">2. The Data We Collect About You</h2>
            <p className="mb-6">
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li><strong className="font-semibold text-slate-800">Identity Data</strong> includes first name, last name, username or similar identifier, title, and organization.</li>
              <li><strong className="font-semibold text-slate-800">Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong className="font-semibold text-slate-800">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong className="font-semibold text-slate-800">Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>

            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">3. How We Use Your Personal Data</h2>
            <p className="mb-6">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">4. Data Security</h2>
            <p className="mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">5. Your Legal Rights</h2>
            <p className="mb-6">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
            </p>

            <h2 className="text-[1.75rem] font-bold text-slate-900 tracking-tight mt-12 mb-6">6. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br/><br/>
              <strong className="font-semibold text-slate-800">Email:</strong> info@platypusbio.com<br/>
              <strong className="font-semibold text-slate-800">Location:</strong> Sydney, Australia
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
