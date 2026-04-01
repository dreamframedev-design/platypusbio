import Hero from '../components/Hero'
import MetagenomeNarrative from '../components/MetagenomeNarrative'
import Pipeline from '../components/Pipeline'
import Team from '../components/Team'
import { Link } from 'react-router-dom'

export default function Home({ cursorPos }) {
  return (
    <main>
      <Hero cursorPos={cursorPos} />
      <MetagenomeNarrative />
      <Pipeline />
      <Team />
      
      {/* Mini CTA taking them to Contact Page */}
      <section style={{ padding: '128px 24px', textAlign: 'center', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'rgba(212,107,26,0.03)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }} />
         <div className="reveal" style={{ position: 'relative', zIndex: 10 }}>
           <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>
             Join the Frontier
           </h2>
           <p style={{ color: '#7e99a8', fontSize: '1.0625rem', maxWidth: '600px', margin: '0 auto 40px' }}>
             We're assembling a coalition of scientists, clinicians, and visionaries who believe the next great therapeutic breakthrough is already encoded in the Earth beneath our feet.
           </p>
           <Link to="/contact" className="cta-button hoverable">
             <span>Get Early Access</span>
           </Link>
         </div>
      </section>
    </main>
  )
}
