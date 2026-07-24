'use client'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Contact from './Contact'
import Footer from './Footer'
import AnimatedBackground from './AnimatedBackground'
import CustomCursor from './Cursor'
import Education from './Education'
import SplashScreen from './SplashScreen'
import { useState } from 'react'

export default function HomeClient({ children }) {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <main>
      {!splashDone && (
        <SplashScreen onFinished={() => setSplashDone(true)} />
      )}

      <AnimatedBackground />
      <CustomCursor />
      <Navbar />

      <div className="content">
        <Hero />
        <About />
        <Skills />
        <Education />
        {children}
        <Contact />
        <Footer />
      </div>
    </main>
  )
}