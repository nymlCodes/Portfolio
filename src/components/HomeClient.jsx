'use client'

import { useState } from 'react'
import RouteSwitch from './layers/RouteSwitch'
import AnimatedBackground from './AnimatedBackground'
import CustomCursor from './Cursor'
import SplashScreen from './SplashScreen'
import PortfolioIntro from './PortfolioIntro'

export default function HomeClient({ children }) {
  const [splashDone, setSplashDone] = useState(false)
  const [introStage, setIntroStage] = useState('idle')

  const handleSplashFinished = () => {
    setSplashDone(true)
    setIntroStage('entering')
  }

  return (
    <main>
      {!splashDone && (
        <SplashScreen onFinished={handleSplashFinished} />
      )}

      {splashDone && (
        <PortfolioIntro onIntroStageChange={setIntroStage} />
      )}

      <AnimatedBackground />
      <CustomCursor />

      <div className="content">
        {children}
        <RouteSwitch introStage={introStage} />
      </div>
    </main>
  )
}