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

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Track mouse position
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // When hovering a clickable element - expand ring & enhance glow
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target || !ring || !dot) return
      const tag = target.tagName ? target.tagName.toLowerCase() : ''
      const isClickable =
        ['a', 'button', 'input', 'textarea'].includes(tag) ||
        Boolean(target.closest?.('a, button'))

      if (isClickable) {
        ring.style.width = '52px'
        ring.style.height = '52px'
        ring.style.borderColor = '#c084fc'
        ring.style.backgroundColor = 'rgba(168, 85, 247, 0.14)'
        ring.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.6), inset 0 0 12px rgba(168, 85, 247, 0.25)'
        dot.style.width = '5px'
        dot.style.height = '5px'
        dot.style.backgroundColor = '#f3e8ff'
      } else {
        ring.style.width = '34px'
        ring.style.height = '34px'
        ring.style.borderColor = 'rgba(167, 139, 250, 0.75)'
        ring.style.backgroundColor = 'transparent'
        ring.style.boxShadow = '0 0 10px rgba(124, 58, 237, 0.35), inset 0 0 6px rgba(124, 58, 237, 0.1)'
        dot.style.width = '7px'
        dot.style.height = '7px'
        dot.style.backgroundColor = '#ffffff'
      }
    }

    // When clicking - elastic burst effect
    function onMouseDown() {
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(0.65)'
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
      // 1. Center dot smoothly catches up with a gentle micro-transition (slower than instant)
      dotX += (mouseX - dotX) * 0.32
      dotY += (mouseY - dotY) * 0.32

      if (dot) {
        dot.style.left = `${dotX}px`
        dot.style.top = `${dotY}px`
      }

      // 2. Outer ring catches up with a slower, floatier lag (0.072 factor for luxurious smoothness)
      ringX += (mouseX - ringX) * 0.072
      ringY += (mouseY - ringY) * 0.072

      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }

      // 3. Trailing particles follow smoothly in a delicate cascade
      trailsRef.current.forEach((el, i) => {
        if (!el) return
        const target = i === 0 ? { x: dotX, y: dotY } : trailPositions[i - 1]

        // Slower cascading interpolation factor
        const speed = 0.15 - i * 0.012
        trailPositions[i].x += (target.x - trailPositions[i].x) * speed
        trailPositions[i].y += (target.y - trailPositions[i].y) * speed

        el.style.left = `${trailPositions[i].x}px`
        el.style.top = `${trailPositions[i].y}px`

        // Soft progressive fade and scale
        el.style.opacity = String(((8 - i) / 8) * 0.35)
        const size = (8 - i) * 1.05 + 'px'
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
        @keyframes ring-breathe {
          0%, 100% {
            filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.45));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(192, 132, 252, 0.8));
          }
        }
        .cursor-ring-animated {
          animation: ring-breathe 3s ease-in-out infinite;
        }
      `}</style>

      {/* Center sharp dot with smooth micro-gliding transition */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 0 8px #c084fc, 0 0 16px #7c3aed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, transform 0.15s ease',
        }}
      />

      {/* Outer floating ring with slower magnetic lag and breathing glow */}
      <div
        ref={ringRef}
        className="cursor-ring-animated"
        style={{
          position: 'fixed',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1.5px solid rgba(167, 139, 250, 0.75)',
          boxShadow: '0 0 10px rgba(124, 58, 237, 0.35), inset 0 0 6px rgba(124, 58, 237, 0.1)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition:
            'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.3s ease, transform 0.15s ease',
        }}
      />

      {/* Trail dots - 8 graceful cascading particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            background: 'rgba(167, 139, 250, 0.95)',
            boxShadow: '0 0 6px #7c3aed',
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
