'use client'

import { useState, useEffect } from 'react'

export default function PortfolioIntro({ onIntroStageChange }) {
  const [stage, setStage] = useState('entering')

  useEffect(() => {
    // Stage 1: 'entering' (0ms) -> Navigation buttons drop from TOP into position
    onIntroStageChange?.('entering')

    // Stage 2: 'focus' (850ms) -> Buttons landed, glowing purple aura & discovery hint active
    const focusTimer = setTimeout(() => {
      setStage('focus')
      onIntroStageChange?.('focus')
    }, 850)

    // Stage 3: 'collapsing' (2200ms) -> Discovery hint fades out, drawer slides into collapsed tab state
    const collapseTimer = setTimeout(() => {
      setStage('collapsing')
      onIntroStageChange?.('collapsing')
    }, 2200)

    // Stage 4: 'completed' (2700ms) -> Clean up intro, yield control to normal navigation
    const completeTimer = setTimeout(() => {
      setStage('completed')
      onIntroStageChange?.('completed')
    }, 2700)

    return () => {
      clearTimeout(focusTimer)
      clearTimeout(collapseTimer)
      clearTimeout(completeTimer)
    }
  }, [onIntroStageChange])

  return null
}
