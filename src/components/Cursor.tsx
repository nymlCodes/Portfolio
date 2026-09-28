'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null) // the center glowing dot
  const ringRef = useRef<HTMLDivElement | null>(null) // the outer magnetic ring
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]) // array of trail dots
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable custom cursor if the device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setEnabled(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) return

    // Target mouse position
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Dot position - smooth micro-gliding transition
    let dotX = mouseX
    let dotY = mouseY

    // Ring position - smooth floaty lag (slower and more fluid)
    let ringX = mouseX
    let ringY = mouseY

    // Trail dots - each one smoothly lags behind the previous
    const trailPositions = Array.from({ length: 8 }, () => ({ x: mouseX, y: mouseY }))

    // Hide default browser cursor
    document.body.style.cursor = 'none'

    // Track mouse position
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // When hovering a clickable element - expand ring & enhance bold glow
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target || !ring || !dot) return
      const tag = target.tagName ? target.tagName.toLowerCase() : ''
      const isClickable =
        ['a', 'button', 'input', 'textarea'].includes(tag) ||
        Boolean(target.closest?.('a, button'))

      if (isClickable) {
        ring.style.width = '58px'
        ring.style.height = '58px'
        ring.style.borderWidth = '2.5px'
        ring.style.borderColor = '#c084fc'
        ring.style.backgroundColor = 'rgba(168, 85, 247, 0.22)'
        ring.style.boxShadow =
          '0 0 28px rgba(192, 132, 252, 0.85), 0 0 50px rgba(124, 58, 237, 0.5), inset 0 0 16px rgba(168, 85, 247, 0.35)'
        dot.style.width = '7px'
        dot.style.height = '7px'
        dot.style.backgroundColor = '#fdf4ff'
      } else {
        ring.style.width = '38px'
        ring.style.height = '38px'
        ring.style.borderWidth = '2px'
        ring.style.borderColor = 'rgba(192, 132, 252, 0.95)'
        ring.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'
        ring.style.boxShadow =
          '0 0 16px rgba(168, 85, 247, 0.65), 0 0 32px rgba(124, 58, 237, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)'
        dot.style.width = '10px'
        dot.style.height = '10px'
        dot.style.backgroundColor = '#ffffff'
      }
    }

    // When clicking - elastic burst effect
    function onMouseDown() {
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(0.7)'
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1.6)'
    }
    function onMouseUp() {
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(1)'
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    // Show/hide cursor when leaving/entering window
    function onMouseLeave() {
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
      trailsRef.current.forEach((el) => {
        if (el) el.style.opacity = '0'
      })
    }
    function onMouseEnter() {
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown, { passive: true })
    document.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

    let animationFrameId: number

    // Slower, silkier physics animation loop
    function animate() {
      // 1. Center dot smoothly catches up with a gentle micro-transition
      dotX += (mouseX - dotX) * 0.32
      dotY += (mouseY - dotY) * 0.32

      if (dot) {
        dot.style.left = `${dotX}px`
        dot.style.top = `${dotY}px`
      }

      // 2. Outer ring catches up with a slower, floatier lag (0.072 factor)
      ringX += (mouseX - ringX) * 0.072
      ringY += (mouseY - ringY) * 0.072

      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }

      // 3. Trailing particles follow smoothly with bold visibility
      trailsRef.current.forEach((el, i) => {
        if (!el) return
        const target = i === 0 ? { x: dotX, y: dotY } : trailPositions[i - 1]

        const speed = 0.15 - i * 0.012
        trailPositions[i].x += (target.x - trailPositions[i].x) * speed
        trailPositions[i].y += (target.y - trailPositions[i].y) * speed

        el.style.left = `${trailPositions[i].x}px`
        el.style.top = `${trailPositions[i].y}px`

        // Bold trail opacity & size
        el.style.opacity = String(((8 - i) / 8) * 0.65)
        const size = (8 - i) * 1.4 + 'px'
        el.style.width = size
        el.style.height = size
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <style jsx>{`
        @keyframes ring-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.75));
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(192, 132, 252, 0.95));
          }
        }
        .cursor-ring-animated {
          animation: ring-glow-pulse 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* Center bold glowing dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 0 12px #c084fc, 0 0 24px #7c3aed, 0 0 36px rgba(168, 85, 247, 0.8)',
          border: '1.5px solid #e9d5ff',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, transform 0.15s ease',
        }}
      />

      {/* Outer bold magnetic ring */}
      <div
        ref={ringRef}
        className="cursor-ring-animated"
        style={{
          position: 'fixed',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '2px solid rgba(192, 132, 252, 0.95)',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          boxShadow:
            '0 0 16px rgba(168, 85, 247, 0.65), 0 0 32px rgba(124, 58, 237, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition:
            'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, border-width 0.25s ease, background-color 0.25s ease, box-shadow 0.3s ease, transform 0.15s ease',
        }}
      />

      {/* Trail dots - 8 prominent glowing particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            background: 'rgba(192, 132, 252, 1)',
            boxShadow: '0 0 8px #a855f7, 0 0 16px rgba(124, 58, 237, 0.7)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99997,
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}
    </>
  )
}
