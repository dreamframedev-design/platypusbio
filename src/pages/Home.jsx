import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import TheScience from '../components/TheScience'
import Pipeline from '../components/Pipeline'
import Team from '../components/Team'
import Partners from '../components/Partners'
import News from '../components/News'
import ContactSection from '../components/ContactSection'

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
      <Team />
      <Partners />
      <News />
      <ContactSection />
    </main>
  )
}
