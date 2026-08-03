'use client'

import { useEffect, useState } from 'react'

// This component creates the animated background:
// - 3 glowing orbs that move slowly
// - A grid pattern overlay
// - Small floating particles

export default function AnimatedBackground() {
  return (
    <>
      {/* Blurry moving orbs */}
      <div className="bg-animated">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Grid lines pattern */}
      <div className="grid-bg" />

      {/* Floating particles */}
      <Particles />
    </>
  )
}

// Creates floating particles.
// Optimizes particle count on mobile screens to prevent layout and paint bottlenecks.
function Particles() {
  const [particleCount, setParticleCount] = useState(0)

  useEffect(() => {
    // Only run on client side. Detect if mobile screen size.
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    setParticleCount(isMobile ? 15 : 60)
  }, [])

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 10}s`,
    size: `${2 + Math.random() * 3}px`,
  }))

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </>
  )
}
