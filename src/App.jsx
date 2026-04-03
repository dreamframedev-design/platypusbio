import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import BrandDesignPage from './pages/BrandDesignPage'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import SitePasswordWall, { readSiteAccess } from './components/SitePasswordWall'

// Scroll handler hook
function ScrollHandler() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50) // tiny delay so React finishes rendering page
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

function MainLayout({ cursorPos }) {
  const { pathname } = useLocation()
  const isPublic = pathname === '/__design'
  const [unlocked, setUnlocked] = useState(() => readSiteAccess())

  useEffect(() => {
    if (!isPublic) setUnlocked(readSiteAccess())
  }, [pathname, isPublic])

  if (!isPublic && !unlocked) {
    return <SitePasswordWall onUnlocked={() => setUnlocked(true)} />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cursorPos={cursorPos} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/__design" element={<BrandDesignPage />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

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
    <BrowserRouter>
      <ScrollHandler />
      <div className="genomic-noise" />
      <CustomCursor x={cursorPos.x} y={cursorPos.y} isHovering={isHovering} />

      <MainLayout cursorPos={cursorPos} />
    </BrowserRouter>
  )
}

export default App
