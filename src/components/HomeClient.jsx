'use client'
import RouteSwitch from './layers/RouteSwitch'
import AnimatedBackground from './AnimatedBackground'
import CustomCursor from './Cursor'
import SplashScreen from './SplashScreen'
import { useState, useEffect, useLayoutEffect } from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function HomeClient({ children }) {
  const [splashDone, setSplashDone] = useState(false)

  useIsomorphicLayoutEffect(() => {
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