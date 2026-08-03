'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)       // the small sharp dot that follows exactly
  const ringRef = useRef(null)      // the big ring that lags behind smoothly
  const trailsRef = useRef([])      // array of trail dots
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable custom cursor if the device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setEnabled(mediaQuery.matches)

    const handleChange = (e) => {
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

    // Current real mouse position
    let mouseX = 0
    let mouseY = 0

    // Ring lags behind - these are its "smooth" position
    let ringX = 0
    let ringY = 0

    // Trail dots - each one lags a little more than the last
    const trailPositions = Array.from({ length: 8 }, () => ({ x: 0, y: 0 }))

    // Hide the default browser cursor
    document.body.style.cursor = 'none'

    // Track mouse position
    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot snaps instantly to cursor
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'
    }

    // When hovering a clickable element - make ring bigger
    function onMouseOver(e) {
      const tag = e.target.tagName.toLowerCase()
      const isClickable = ['a', 'button', 'input', 'textarea'].includes(tag)
        || e.target.closest('a, button')

      if (isClickable) {
        ring.style.width  = '50px'
        ring.style.height = '50px'
        ring.style.borderColor = '#a78bfa'
        ring.style.backgroundColor = 'rgba(124,58,237,0.1)'
        dot.style.width  = '6px'
        dot.style.height = '6px'
      } else {
        ring.style.width  = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(167,139,250,0.8)'
        ring.style.backgroundColor = 'transparent'
        dot.style.width  = '8px'
        dot.style.height = '8px'
      }
    }

    // When clicking - burst effect
    function onMouseDown() {
      ring.style.transform = 'translate(-50%, -50%) scale(0.7)'
      dot.style.transform  = 'translate(-50%, -50%) scale(1.5)'
    }
    function onMouseUp() {
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.transform  = 'translate(-50%, -50%) scale(1)'
    }

    // Show/hide cursor when leaving/entering window
    function onMouseLeave() {
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }
    function onMouseEnter() {
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseup',    onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    let animationFrameId

    // Animation loop - smoothly moves the ring and trail toward mouse
    function animate() {
      // Ring follows with lerp (linear interpolation) - feels smooth and floaty
      // 0.12 = how fast it catches up (lower = more lag)
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'

      // Each trail dot follows the one before it
      trailsRef.current.forEach((el, i) => {
        if (!el) return
        const target = i === 0
          ? { x: mouseX, y: mouseY }
          : trailPositions[i - 1]

        trailPositions[i].x += (target.x - trailPositions[i].x) * (0.25 - i * 0.02)
        trailPositions[i].y += (target.y - trailPositions[i].y) * (0.25 - i * 0.02)

        el.style.left = trailPositions[i].x + 'px'
        el.style.top  = trailPositions[i].y + 'px'

        // Trail fades out toward the end
        el.style.opacity = ((8 - i) / 8) * 0.4
        const size = (8 - i) * 1.2 + 'px'
        el.style.width  = size
        el.style.height = size
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Restore default cursor when component is removed
    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Sharp dot - snaps to cursor instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 0 6px #a78bfa, 0 0 12px #7c3aed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s',
        }}
      />

      {/* Glowing ring - lags behind smoothly */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(167,139,250,0.8)',
          boxShadow: '0 0 8px rgba(124,58,237,0.4), inset 0 0 8px rgba(124,58,237,0.1)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s, transform 0.1s',
        }}
      />

      {/* Trail dots - 8 dots that follow the cursor */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailsRef.current[i] = el }}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            background: `rgba(167, 139, 250, 1)`,
            boxShadow: '0 0 4px #7c3aed',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99997,
          }}
        />
      ))}
    </>
  )
}
