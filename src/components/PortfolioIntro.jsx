'use client'

import { useState, useEffect } from 'react'

export default function PortfolioIntro({ onIntroStageChange }) {
  const [stage, setStage] = useState('entering')

  useEffect(() => {
    // Stage 1: 'entering' (0ms) -> Navigation buttons slither from TOP RIGHT like a snake one by one
    onIntroStageChange?.('entering')

    // Stage 2: 'focus' (1650ms) -> All buttons landed, glowing purple aura & discovery hint badge active
    const focusTimer = setTimeout(() => {
      setStage('focus')
      onIntroStageChange?.('focus')
    }, 1650)

    // Stage 3: 'collapsing' (3250ms) -> Discovery hint fades out, drawer slides into collapsed tab state
    const collapseTimer = setTimeout(() => {
      setStage('collapsing')
      onIntroStageChange?.('collapsing')
    }, 3250)

    // Stage 4: 'completed' (3750ms) -> Clean up intro, yield control to normal navigation
    const completeTimer = setTimeout(() => {
      setStage('completed')
      onIntroStageChange?.('completed')
    }, 3750)

    return () => {
      clearTimeout(focusTimer)
      clearTimeout(collapseTimer)
      clearTimeout(completeTimer)
    }
  }, [onIntroStageChange])

  return null
}
