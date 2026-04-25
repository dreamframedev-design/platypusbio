import Hero from '../components/Hero'
import TheScience from '../components/TheScience'
import Pipeline from '../components/Pipeline'
import Team from '../components/Team'
import Partners from '../components/Partners'
import News from '../components/News'
import ContactSection from '../components/ContactSection'

export default function Home({ cursorPos }) {
  return (
    <main>
      <Hero cursorPos={cursorPos} />
      <TheScience />
      <Pipeline />
      <Team />
      <Partners />
      <News />
      <ContactSection />
    </main>
  )
}
