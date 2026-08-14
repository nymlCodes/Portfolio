'use client'

import { useEffect, useState, useRef } from 'react'
import { FaBook } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { SiGithub, SiFigma, SiNpm, SiVite, SiReactrouter, SiVercel } from 'react-icons/si'
import { MdOutlineDeveloperMode } from 'react-icons/md'

const skills = [
  { name: 'HTML5', level: 95, color: '#f97316' },
  { name: 'CSS3', level: 89, color: '#3b82f6' },
  { name: 'Tailwind CSS', level: 80, color: '#38bdf8' },
  { name: 'JavaScript-ES6', level: 85, color: '#facc15' },
  { name: 'TypeScript', level: 60, color: '#3178C6' },
  { name: 'React.js', level: 80, color: '#61dafb' },
  { name: 'Next.js', level: 87, color: '#FFC0CA' },
  { name: 'Node.js', level: 55, color: '#68a063' },
  { name: 'Express.js', level: 70, color: '#a3a3a3' },
  { name: 'Git & GitHub', level: 80, color: '#f97316' },
  { name: 'MongoDB', level: 70, color: '#4DB33D' },
]

const tools = [
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  { name: 'GitHub', icon: SiGithub, color: '#e5e5e5' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Chrome DevTools', icon: MdOutlineDeveloperMode, color: '#4285F4' },
  { name: 'npm', icon: SiNpm, color: '#CB3837' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'React Router', icon: SiReactrouter, color: '#CA4245' },
  { name: 'Vercel', icon: SiVercel, color: '#e5e5e5' },
]

const learning = [
  'Role Based Access Control (RBAC)',
  'TypeScript',
  'Payment Integration',
  'Backend with Express.js',
]

export default function Skills() {
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
        </div>

        {/* Skill circles */}
        <div className="reveal mb-20">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
            {skills.map((skill, i) => (
              <SkillCircle key={skill.name} skill={skill} animated={animated} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Tools & Currently Learning */}
        <div className="grid md:grid-cols-2 gap-12 items-start reveal">

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, i) => {
                const Icon = tool.icon
                return (
                  <span
                    key={tool.name}
                    className={`group flex items-center gap-2 bg-card border border-purple-700/20 text-gray-300 text-sm px-4 py-2 rounded-full hover:border-purple-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-default ${
                      animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: animated ? `${1200 + i * 60}ms` : '0ms' }}
                  >
                    <Icon
                      className="text-base transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tool.color }}
                    />
                    {tool.name}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Currently Learning */}
          <div
            className={`card-hover bg-card rounded-2xl p-6 relative overflow-hidden transition-all duration-700 ease-out ${
              animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: animated ? '1200ms' : '0ms' }}
          >
            {/* subtle glow accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <h4 className="text-white font-semibold mb-4 flex items-center gap-2 relative">
              <span className="text-lg bg-purple-500/15 text-purple-300 p-2 rounded-lg">
                <FaBook />
              </span>
              Currently Learning
            </h4>

            <TypewriterList items={learning} start={animated} startDelay={1200} />
          </div>
        </div>

      </div>
    </section>
  )
}

// Individual circular skill progress ring with count-up + entrance animation
function SkillCircle({ skill, animated, delay }) {
  const size = 100
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const [displayValue, setDisplayValue] = useState(0)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!animated) return

    const enterTimer = setTimeout(() => setEntered(true), delay)

    const duration = 1200
    const startDelay = delay + 100
    let rafId

    const countTimer = setTimeout(() => {
      const startTime = performance.now()
      const tick = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(eased * skill.level))
        if (progress < 1) rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(countTimer)
      cancelAnimationFrame(rafId)
    }
  }, [animated, delay, skill.level])

  const offset = animated
    ? circumference - (skill.level / 100) * circumference
    : circumference

  return (
    <div
      className={`flex flex-col items-center gap-3 group w-[100px] transition-all duration-500 ease-out ${
        entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4'
      }`}
    >
      <div
        className="relative transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={skill.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: `stroke-dashoffset 1.2s ease-out ${delay + 100}ms`,
              filter: `drop-shadow(0 0 6px ${skill.color}80)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm tabular-nums">{displayValue}%</span>
        </div>
      </div>
      <span className="text-gray-300 text-xs font-medium text-center group-hover:text-white transition-colors duration-200">
        {skill.name}
      </span>
    </div>
  )
}

// Types out a list of strings one after another, character by character
function TypewriterList({ items, start, startDelay = 0, charSpeed = 35, lineGap = 300 }) {
  const [lineIndex, setLineIndex] = useState(0)   // which line is currently typing
  const [charCount, setCharCount] = useState(0)   // how many chars of that line are shown
  const [started, setStarted] = useState(false)

  // Kick off after startDelay, once "start" flips true
  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [start, startDelay])

  // Type out the current line
  useEffect(() => {
    if (!started) return
    if (lineIndex >= items.length) return

    const currentText = items[lineIndex]

    if (charCount < currentText.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), charSpeed)
      return () => clearTimeout(t)
    }

    // finished this line — pause, then move to the next one
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharCount(0)
    }, lineGap)
    return () => clearTimeout(t)
  }, [started, charCount, lineIndex, items, charSpeed, lineGap])

  return (
    <ul className="space-y-3 text-gray-400 text-sm relative">
      {items.map((item, i) => {
        const isPast = i < lineIndex
        const isCurrent = i === lineIndex
        const isVisible = isPast || isCurrent

        const text = isPast ? item : isCurrent ? item.slice(0, charCount) : ''
        const isTypingThisLine = isCurrent && charCount < item.length

        return (
          <li
            key={item}
            className={`flex items-center gap-2 transition-opacity duration-300 hover:text-purple-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-purple-400 flex-shrink-0">→</span>
            <span>
              {text}
              {isTypingThisLine && (
                <span className="inline-block w-[2px] h-3.5 bg-purple-400 ml-0.5 -mb-0.5 animate-pulse" />
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}