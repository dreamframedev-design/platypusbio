import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import TheScience from '../components/TheScience'
import Pipeline from '../components/Pipeline'
import Team from '../components/Team'
import News from '../components/News'
import ContactSection from '../components/ContactSection'
import Marquee from '../components/Marquee'

const marqueeItems = [
  'Trigger RNA-Induced Cell Killing',
  'Programmable Precision Oncology',
  'Intracellular Targeting',
  'Multiplexable Architecture',
  'Durable Cell Killing',
  'TRICK Platform',
]

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <main>
      <Hero />
      <TheScience />
      <Pipeline />
      <div style={{ background: '#fbfbf9', position: 'relative' }}>
        <Marquee
          items={marqueeItems}
          speed={70}
          color="rgba(15,23,42,0.32)"
          background="transparent"
          border
        />
      </div>
      <Team />
      <div id="partners"></div>
      <News />
      <ContactSection />
    </main>
  )
}
