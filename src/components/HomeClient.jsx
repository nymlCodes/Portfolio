'use client'
import RouteSwitch from './layers/RouteSwitch'
import AnimatedBackground from './AnimatedBackground'
import CustomCursor from './Cursor'
import SplashScreen from './SplashScreen'
import { useState, useEffect } from 'react'

export default function HomeClient({ children }) {
  const [splashDone, setSplashDone] = useState(true)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setSplashDone(true)
    } else {
      setSplashDone(false)
    }
  }, [])

  const handleSplashFinished = () => {
    sessionStorage.setItem('hasSeenSplash', 'true')
    setSplashDone(true)
  }

  return (
    <main>
      {!splashDone && (
        <SplashScreen onFinished={handleSplashFinished} />
      )}

      <AnimatedBackground />
      <CustomCursor />

      <div className="content">
        {children}
        <RouteSwitch />
      </div>
    </main>
  )
}