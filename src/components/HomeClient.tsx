'use client'

import React, { useState } from 'react'
import RouteSwitch from './layers/RouteSwitch'
import AnimatedBackground from './AnimatedBackground'
import CustomCursor from './Cursor'
import SplashScreen from './SplashScreen'
import PortfolioIntro from './PortfolioIntro'
import { IntroStage } from '../types'

interface HomeClientProps {
  children: React.ReactNode
}

export default function HomeClient({ children }: HomeClientProps) {
  const [splashDone, setSplashDone] = useState(false)
  const [introStage, setIntroStage] = useState<IntroStage>('idle')

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
        {splashDone && <RouteSwitch introStage={introStage} />}
      </div>
    </main>
  )
}
