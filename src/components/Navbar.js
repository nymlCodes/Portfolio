'use client'
import { useState, useEffect } from 'react'

// Navigation links - each one scrolls to a section by ID
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Change navbar style when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar transition-all duration-300 ${scrolled ? 'py-3 shadow-lg shadow-purple-900/20' : 'py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo text */}
        <a href="#home" className="text-xl font-bold gradient-text">
          Neyamul<span className="text-white">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            
             <a key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-glow bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-lg border-t border-purple-900/20 px-6 py-4">
          {navLinks.map((link) => (
            
             <a key={link.href}
              href={link.href}
              className="block py-3 text-gray-400 hover:text-purple-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}