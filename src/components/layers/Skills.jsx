'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { FaBook } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { SiGithub, SiFigma, SiNpm, SiVite, SiReactrouter, SiVercel } from 'react-icons/si'
import { MdOutlineDeveloperMode } from 'react-icons/md'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, color: '#f97316' },
      { name: 'CSS3', level: 89, color: '#3b82f6' },
      { name: 'Tailwind CSS', level: 80, color: '#38bdf8' },
      { name: 'JavaScript-ES6', level: 85, color: '#facc15' },
      { name: 'TypeScript', level: 30, color: '#3178C6' },
      { name: 'React.js', level: 80, color: '#61dafb' },
      { name: 'Next.js', level: 87, color: '#f472b6' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 55, color: '#68a063' },
      { name: 'Express.js', level: 70, color: '#a3a3a3' },
      { name: 'MongoDB', level: 70, color: '#4DB33D' },
    ],
  },
  {
    category: 'Tools',
    skills: [{ name: 'Git & GitHub', level: 80, color: '#f97316' }],
  },
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
  const spotlightRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect || !spotlightRef.current) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    spotlightRef.current.style.background = `radial-gradient(500px circle at ${x}% ${y}%, rgba(168,85,247,0.10), transparent 65%)`
  }, [])

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <style jsx>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.05); }
        }
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        @keyframes spin-counter { to { transform: rotate(-360deg); } }
        @keyframes spin-comet { to { transform: rotate(360deg); } }
        @keyframes spin-border { to { --angle: 360deg; } }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        @keyframes blink-cursor {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px 4px rgba(168,85,247,0.35); }
          50% { box-shadow: 0 0 34px 10px rgba(168,85,247,0.55); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .float-blob-a { animation: float-a 9s ease-in-out infinite; }
        .float-blob-b { animation: float-b 11s ease-in-out infinite; }
        .orbit-ring { animation: spin-ring var(--dur, 26s) linear infinite; }
        .orbit-ring:hover { animation-play-state: paused; }
        .orbit-counter { animation: spin-counter var(--dur, 26s) linear infinite; }
        .orbit-ring:hover .orbit-counter { animation-play-state: paused; }
        .orbit-comet { animation: spin-comet 4s linear infinite; }
        .orbit-ring:hover .orbit-comet { animation-play-state: paused; }
        .shimmer-el { animation: shimmer-sweep 2.2s ease-in-out infinite; }
        .cursor-blink { animation: blink-cursor 1s steps(1) infinite; }
        .hub-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .marquee-track { animation: marquee-scroll 22s linear infinite; }
        .shimmer-heading {
          background: linear-gradient(90deg, #c084fc, #f472b6, #a78bfa, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 4s linear infinite;
        }
        .spin-border { animation: spin-border 4s linear infinite; }
        .spin-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(from var(--angle), #a855f7, #f472b6, #38bdf8, #a855f7);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.7;
        }
        .tilt-card {
          transition: transform 0.15s ease-out;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Cursor-reactive spotlight */}
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 transition-[background] duration-150" />

      {/* Ambient background */}
      {/* Ambient background — masked so blobs/dots fade out before the section edge, no hard clip line */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <div className="absolute -top-10 left-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[110px] float-blob-a" />
        <div className="absolute bottom-0 right-1/5 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-[110px] float-blob-b" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(rgba(168,85,247,0.5) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3 font-mono">
            &gt; const expertise = () =&gt;
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            My <span className="shimmer-heading">Skills</span>
          </h2>
        </div>

        {/* Terminal hero — sits between the heading and the skill bars */}
        <TiltCard animated={animated}>
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-purple-700/20">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-gray-500 font-mono">skills.config.js</span>
          </div>
          <TerminalBody start={animated} />
        </TiltCard>

        {/* Skill bars, grouped by category */}
        <div className="mt-16 mb-24 space-y-12">
          {skillGroups.map((group, gi) => (
            <div key={group.category} className="reveal">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-4 w-1 rounded-full bg-gradient-to-b from-purple-400 to-fuchsia-500" />
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                  {group.category}
                </h3>
                <span className="text-[11px] text-gray-600 font-mono">({group.skills.length})</span>
                <span className="flex-1 h-px bg-gradient-to-r from-purple-700/30 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {group.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    animated={animated}
                    delay={gi * 250 + i * 90 + 300}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools orbit + Currently Learning */}
        <div className="grid md:grid-cols-2 gap-12 items-center reveal">

          {/* Orbiting tools with comet trail (desktop) */}
          <div className="hidden md:flex justify-center">
            <div className="relative" style={{ width: 320, height: 320 }}>
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-700/20" />
              <div className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-[#171226] border border-purple-500/40 hub-glow flex items-center justify-center z-10">
                <span className="text-purple-300 font-mono font-bold text-sm">MERN</span>
              </div>

              <div className="orbit-ring absolute inset-0" style={{ '--dur': '28s' }}>
                <div className="absolute top-1/2 left-1/2 w-0 h-0 orbit-comet">
                  <div className="-translate-x-1/2 -translate-y-1/2" style={{ transform: 'translateX(140px)' }}>
                    <div
                      className="w-2 h-2 rounded-full bg-fuchsia-400"
                      style={{ boxShadow: '0 0 12px 4px rgba(232,121,249,0.8)' }}
                    />
                  </div>
                </div>

                {tools.map((tool, i) => {
                  const angle = (360 / tools.length) * i
                  const radius = 140
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name}
                      className="absolute top-1/2 left-1/2 w-0 h-0"
                      style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                    >
                      <div
                        className="orbit-counter -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-card border border-purple-700/30 hover:scale-125 hover:border-purple-400 transition-transform duration-300"
                        style={{ '--dur': '28s' }}
                        title={tool.name}
                      >
                        <Icon className="text-lg" style={{ color: tool.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Marquee tools (mobile) */}
          <div className="md:hidden overflow-hidden relative">
            <div className="flex gap-3 w-max marquee-track">
              {[...tools, ...tools].map((tool, i) => {
                const Icon = tool.icon
                return (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-card border border-purple-700/20 text-gray-300 text-sm px-4 py-2 rounded-full flex-shrink-0"
                  >
                    <Icon className="text-base" style={{ color: tool.color }} />
                    {tool.name}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Currently Learning terminal */}
          <div
            className={`relative rounded-xl transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: animated ? '900ms' : '0ms' }}
          >
            <div className="relative rounded-xl overflow-hidden border border-purple-700/30 bg-[#0d0a17]/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-purple-700/20">
                <FaBook className="text-purple-300 text-sm" />
                <span className="text-xs text-gray-400 font-mono">currently-learning.log</span>
                <span className="ml-auto relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
              </div>
              <div className="p-5">
                <TypewriterList items={learning} start={animated} startDelay={900} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// Terminal wrapper: animated conic-gradient border + subtle 3D tilt following the cursor
function TiltCard({ animated, children }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) scale(1.01)`
  }
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'
  }

  return (
    <div
      className={`reveal max-w-2xl mx-auto relative rounded-xl spin-border transition-opacity duration-700 ${animated ? 'opacity-100' : 'opacity-0'
        }`}
      style={{ transitionDelay: animated ? '200ms' : '0ms' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="tilt-card relative rounded-xl overflow-hidden bg-[#0d0a17]/90 backdrop-blur-sm shadow-2xl"
      >
        {children}
      </div>
    </div>
  )
}

// Monospace "code" block that types itself out once, then blinks a cursor forever
function TerminalBody({ start }) {
  const lines = [
    { text: 'const developer = {', indent: 0 },
    { text: "role: 'MERN Stack Developer',", indent: 1 },
    { text: "strongest: ['HTML5', 'CSS3', 'Next.js'],", indent: 1 },
    { text: "learning: ['TypeScript', 'RBAC'],", indent: 1 },
    { text: 'shipping: true,', indent: 1 },
    { text: '};', indent: 0 },
  ]
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(t)
  }, [start])

  useEffect(() => {
    if (!started || done) return
    if (lineIndex >= lines.length) {
      setDone(true)
      return
    }
    const current = lines[lineIndex].text
    if (charCount < current.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 22)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharCount(0)
    }, 120)
    return () => clearTimeout(t)
  }, [started, charCount, lineIndex, done])

  const colorFor = (text) =>
    text
      .replace(/'([^']*)'/g, `<span class="text-yellow-300">'$1'</span>`)
      .replace(/\b(true|false)\b/g, `<span class="text-pink-400">$1</span>`)
      .replace(/^(const)\b/, `<span class="text-purple-400">$1</span>`)

  return (
    <div className="p-5 font-mono text-[13px] leading-relaxed">
      {lines.map((line, i) => {
        const isPast = i < lineIndex
        const isCurrent = i === lineIndex && !done
        if (!isPast && !isCurrent) return <div key={i} className="h-[1.6em]" />
        const text = isPast ? line.text : line.text.slice(0, charCount)
        return (
          <div key={i} style={{ paddingLeft: line.indent * 20 }} className="text-gray-300 whitespace-pre">
            <span dangerouslySetInnerHTML={{ __html: colorFor(text) }} />
            {isCurrent && <span className="inline-block w-[7px] h-[1em] bg-purple-400 ml-0.5 align-middle cursor-blink" />}
          </div>
        )
      })}
      {done && (
        <div className="text-gray-300">
          <span className="text-purple-400">export default</span> developer;
          <span className="inline-block w-[7px] h-[1em] bg-purple-400 ml-1 align-middle cursor-blink" />
        </div>
      )}
    </div>
  )
}

// Horizontal skill bar with count-up and a continuous shimmer sweep across the fill
function SkillBar({ skill, animated, delay }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!animated) return
    const enterTimer = setTimeout(() => setEntered(true), delay)
    const duration = 1100
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
    }, delay + 150)
    return () => {
      clearTimeout(enterTimer)
      clearTimeout(countTimer)
      cancelAnimationFrame(rafId)
    }
  }, [animated, delay, skill.level])

  return (
    <div className={`transition-all duration-500 ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
        <span className="text-xs font-mono tabular-nums" style={{ color: skill.color }}>
          {displayValue}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: entered ? `${skill.level}%` : '0%',
            background: skill.color,
            boxShadow: `0 0 10px ${skill.color}90`,
            transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay + 150}ms`,
          }}
        >
          {entered && (
            <span
              className="shimmer-el absolute top-0 left-0 h-full w-1/4"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Types out a list of strings one after another, character by character, loops with a trailing blinking cursor
function TypewriterList({ items, start, startDelay = 0, charSpeed = 30, lineGap = 300 }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [start, startDelay])

  useEffect(() => {
    if (!started) return
    if (lineIndex >= items.length) return
    const currentText = items[lineIndex]
    if (charCount < currentText.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), charSpeed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharCount(0)
    }, lineGap)
    return () => clearTimeout(t)
  }, [started, charCount, lineIndex, items, charSpeed, lineGap])

  return (
    <ul className="space-y-3 text-gray-400 text-sm font-mono">
      {items.map((item, i) => {
        const isPast = i < lineIndex
        const isCurrent = i === lineIndex
        const isVisible = isPast || isCurrent
        const text = isPast ? item : isCurrent ? item.slice(0, charCount) : ''
        const isTypingThisLine = isCurrent && charCount < item.length
        const isLastDone = isPast && i === items.length - 1

        return (
          <li key={item} className={`flex items-center gap-2 transition-opacity duration-300 hover:text-purple-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-purple-400 flex-shrink-0">→</span>
            <span>
              {text}
              {(isTypingThisLine || isLastDone) && (
                <span className="inline-block w-[2px] h-3.5 bg-purple-400 ml-0.5 -mb-0.5 cursor-blink" />
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}