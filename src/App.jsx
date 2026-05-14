import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import LoadingCurtain from './components/LoadingCurtain'
import KeyboardNav from './components/KeyboardNav'

function App() {
  // Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    }

    observeAll()

    const mutationObserver = new MutationObserver(() => {
      observeAll()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <>
      <SmoothScroll />
      <LoadingCurtain />
      <ScrollProgress />
      <KeyboardNav />
      <div className="genomic-noise" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
