'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronUp,
  ChevronDown,
  Home,
  User,
  Code2,
  GraduationCap,
  Briefcase,
  Mail,
  ChevronRight,
  X,
  Compass,
} from 'lucide-react'

const routes = [
  { path: '/', name: 'Home', icon: Home },
  { path: '/about', name: 'About', icon: User },
  { path: '/skills', name: 'Skills', icon: Code2 },
  { path: '/education', name: 'Education', icon: GraduationCap },
  { path: '/projects', name: 'Projects', icon: Briefcase },
  { path: '/contact', name: 'Contact', icon: Mail },
]

export default function RouteSwitch() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)

  // Find current index, defaulting Projects index if on a project detail page
  let currentIndex = routes.findIndex((r) => r.path === pathname)
  if (pathname.startsWith('/details/')) {
    currentIndex = 4 // Index of Projects
  }
  if (currentIndex === -1) {
    currentIndex = 0
  }

  const prevIndex = (currentIndex - 1 + routes.length) % routes.length
  const nextIndex = (currentIndex + 1) % routes.length

  const prevRoute = routes[prevIndex]
  const nextRoute = routes[nextIndex]

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
    setIsHovered(false)
  }, [pathname])

  // Close menu on outside click or touch
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const isExpanded = isHovered || isOpen

  return (
    <>
      {/* Navigation Outer Container fixed on left screen edge */}
      <aside
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 select-none group"
        aria-label="Side Navigation"
      >
        {/* Drawer Panel containing ALL route buttons */}
        <div
          className={`flex items-center transition-all duration-300 ease-out transform ${
            isExpanded
              ? 'translate-x-2 sm:translate-x-4 opacity-100'
              : '-translate-x-[calc(100%-14px)] opacity-95'
          }`}
        >
          {/* Main Glass Dock */}
          <div className="bg-card/95 backdrop-blur-2xl border border-purple-500/30 rounded-r-2xl p-3 shadow-[0_0_40px_rgba(124,58,237,0.3)] flex flex-col items-center gap-2 max-h-[85vh] overflow-y-auto scrollbar-hide min-w-[165px]">
            
            {/* Header */}
            <div className="flex items-center justify-between w-full px-2 pt-1 pb-2 border-b border-purple-500/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-widest">
                <Compass size={14} className="text-purple-400 animate-spin-slow" />
                <span>Navigation</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/20 transition-colors sm:hidden"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>

            {/* Previous / Up Button */}
            <Link
              href={prevRoute.path}
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-white/[0.08] transition-all duration-300 group/btn relative flex items-center justify-center w-full"
              title={`Previous: ${prevRoute.name}`}
            >
              <ChevronUp size={18} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
              <span className="text-xs text-purple-300/80 ml-1.5 font-medium">Prev ({prevRoute.name})</span>
            </Link>

            <div className="w-full h-px bg-white/10 my-0.5" />

            {/* ALL 6 Route Buttons */}
            <div className="flex flex-col gap-1.5 w-full">
              {routes.map((route, i) => {
                const Icon = route.icon
                const isActive = i === currentIndex

                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`group/item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 font-semibold scale-[1.02]'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-purple-400 group-hover/item:text-purple-300'} />
                    <span className="text-xs font-medium tracking-wide">
                      {route.name}
                    </span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-glow" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="w-full h-px bg-white/10 my-0.5" />

            {/* Next / Down Button */}
            <Link
              href={nextRoute.path}
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-white/[0.08] transition-all duration-300 group/btn relative flex items-center justify-center w-full"
              title={`Next: ${nextRoute.name}`}
            >
              <ChevronDown size={18} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
              <span className="text-xs text-purple-300/80 ml-1.5 font-medium">Next ({nextRoute.name})</span>
            </Link>
          </div>

          {/* Edge Handle / Tab sticking out on left edge when unhovered */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`py-6 px-1 bg-card/95 backdrop-blur-xl border border-l-0 border-purple-500/40 rounded-r-xl text-purple-400 shadow-lg cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:bg-purple-950/80 hover:text-white ${
              isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            title="Hover or Tap to open routes menu"
            aria-label="Open routes menu"
          >
            <ChevronRight size={14} className="animate-pulse text-purple-300" />
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
          </button>
        </div>
      </aside>

      {/* Footer Branding & Copyright */}
      <footer className="w-full px-4 py-8 mt-16 text-center border-t border-purple-900/10">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Neyamul Islam. Built with Next.js & Tailwind CSS 💜
        </p>
      </footer>
    </>
  )
}
