'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { GraduationCap, Check, ArrowRight, Circle, Globe, Rocket, BookOpen, Layers, ExternalLink, Award, ShieldCheck } from 'lucide-react'
import { FaUniversity, FaLaptopCode, FaReact, FaJs, FaNodeJs } from 'react-icons/fa'
import { LiaUniversitySolid } from 'react-icons/lia'
import { SiExpress, SiNextdotjs, SiTailwindcss } from 'react-icons/si'

const educationData = [
    {
        degree: 'Bachelors of Business Administration (BBA)',
        institution: 'Govt. Haraganga College, Munshiganj',
        year: '2025 - 2026',
        description: 'Currently pursuing my Bachelors degree with a major in Accounting.',
        grade: 'Ongoing',
        icon: <GraduationCap size={20} />,
        color: '#22c55e',
        ongoing: true,
    },
    {
        degree: 'Higher Secondary Certificate (HSC)',
        institution: 'Govt. Haraganga College, Munshiganj',
        year: '2023 - 2025',
        description: 'Business Studies group. Focused on Accounting, Management, and Finance.',
        grade: 'GPA : 4.42/5.00',
        icon: <GraduationCap size={20} />,
        color: '#7c3aed',
    },
    {
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Kazi Kamoruddin Govt. Institution, Munshiganj',
        year: '2021 - 2023',
        description: 'Business Studies group. Achieved good results with strong foundation in Accounting and Finance.',
        grade: 'GPA : 4.22/5.00',
        icon: <FaUniversity size={18} />,
        color: '#3b82f6',
    },
]

const coursesData = {
    name: 'Complete Web Development',
    platform: 'Programming Hero',
    batch: 'Batch-13',
    year: '2026',
    icon: <FaLaptopCode size={20} />,
    color: '#a78bfa',
    skills: [
        { name: 'JavaScript ES6+', icon: <FaJs />, color: '#facc15' },
        { name: 'React.js', icon: <FaReact />, color: '#61dafb' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#e5e5e5' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
        { name: 'Express.js', icon: <SiExpress />, color: '#68a063' },
    ],
}

const certificatesData = [
    {
        title: 'Complete Web Development Certificate',
        issuer: 'Programming Hero',
        type: 'Main Certificate',
        link: 'https://drive.google.com/file/d/1YEQQXqg_0QGOXrJtrJ53nZ2seQHY3838/view?usp=drive_link',
        description: 'Successfully completed the Programming Hero Web Development course, gaining hands-on experience in modern web development with HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and related technologies.',
        icon: <Award size={16} className="text-purple-400" />,
        badgeColor: '#a78bfa',
    },
    {
        title: 'Programming Hero Black Belt',
        issuer: 'Programming Hero',
        type: 'Special Recognition',
        link: 'https://drive.google.com/file/d/14qtUbABw949PCnx8ghlpSpue9grgMZtL/view?usp=drive_link',
        description: 'A recognition awarded for successfully completing the Programming Hero Web Development journey with strong performance, consistency, and dedication across assignments, projects, and assessments.',
        icon: <ShieldCheck size={16} className="text-amber-400" />,
        badgeColor: '#f59e0b',
    },
]

const goals = [
    { label: 'TypeScript', active: true },
    { label: 'PostgreeSQL', active: true },
    { label: 'Prisma', active: true },
]

export default function Education() {
    const [animated, setAnimated] = useState(false)
    const sectionRef = useRef(null)
    const spotlightRef = useRef(null)

    const doneCount = goals.filter(g => g.done).length
    const progressPct = Math.round((doneCount / goals.length) * 100)

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
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${x}% ${y}%, rgba(74,222,128,0.06), transparent 65%)`
    }, [])

    return (
        <section
            id="education"
            className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
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
                @keyframes travel-dot {
                    0% { top: 0%; opacity: 0; }
                    8% { opacity: 1; }
                    92% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes pulse-ring {
                    0%, 100% { box-shadow: 0 0 0 0 var(--ring-color); }
                    50% { box-shadow: 0 0 0 8px transparent; }
                }
                @keyframes shimmer-text {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes spin-border { to { --angle: 360deg; } }
                @keyframes bar-shimmer {
                    0% { transform: translateX(-120%); }
                    100% { transform: translateX(220%); }
                }
                @keyframes pop-in {
                    0% { transform: scale(0.4); opacity: 0; }
                    60% { transform: scale(1.15); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @property --angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }
                .float-blob-a { animation: float-a 10s ease-in-out infinite; }
                .float-blob-b { animation: float-b 12s ease-in-out infinite; }
                .travel-dot { animation: travel-dot 3.5s ease-in-out infinite; }
                .pulse-node { animation: pulse-ring 2s ease-in-out infinite; }
                .shimmer-heading {
                    background: linear-gradient(90deg, #c084fc, #4ade80, #a78bfa, #c084fc);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer-text 5s linear infinite;
                }
                .ongoing-border { animation: spin-border 3.5s linear infinite; }
                .ongoing-border::before {
                    content: '';
                    position: absolute;
                    inset: -1.5px;
                    border-radius: inherit;
                    padding: 1.5px;
                    background: conic-gradient(from var(--angle), #22c55e, #a3e635, #22c55e);
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0.8;
                }
                .course-border { animation: spin-border 4.5s linear infinite; }
                .course-border::before {
                    content: '';
                    position: absolute;
                    inset: -1.5px;
                    border-radius: inherit;
                    padding: 1.5px;
                    background: conic-gradient(from var(--angle), #a78bfa, #c084fc, #38bdf8, #a78bfa);
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0.7;
                }
                .spot-card { position: relative; }
                .spot-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.14), transparent 60%);
                    opacity: 0;
                    transition: opacity 0.25s ease;
                    pointer-events: none;
                }
                .spot-card:hover::before { opacity: 1; }
                .bar-shimmer { animation: bar-shimmer 2s ease-in-out infinite; }
                .pop-check { animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
                .skill-chip {
                    transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
                }
                .skill-chip:hover {
                    transform: translateY(-2px);
                }
                @media (max-width: 380px) {
                    .stat-ring-wrap { transform: scale(0.85); }
                }
            `}</style>

            {/* Cursor-reactive spotlight */}
            <div ref={spotlightRef} className="pointer-events-none absolute inset-0 transition-[background] duration-150" />

            {/* Ambient background */}
            <div className="pointer-events-none absolute -top-10 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-green-600/10 rounded-full blur-[90px] sm:blur-[110px] float-blob-a" />
            <div className="pointer-events-none absolute bottom-10 left-1/5 w-56 h-56 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[90px] sm:blur-[110px] float-blob-b" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

                {/* Section heading */}
                <div className="text-center mb-8 sm:mb-10 reveal">
                    <p className="text-purple-400 text-xs sm:text-sm tracking-widest uppercase mb-3">My Journey</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                        Education <span className="shimmer-heading">& Learning</span>
                    </h2>
                </div>

                {/* Stat rings */}
                <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 mb-12 sm:mb-16 md:mb-20 reveal flex-wrap">
                    <div className="stat-ring-wrap">
                        <StatRing
                            icon={<GraduationCap size={16} />}
                            label="Milestones"
                            value={educationData.length}
                            max={educationData.length}
                            display={String(educationData.length)}
                            color="#7c3aed"
                            animated={animated}
                            delay={0}
                        />
                    </div>
                    <div className="stat-ring-wrap">
                        <StatRing
                            icon={<BookOpen size={16} />}
                            label="Skills covered"
                            value={coursesData.skills.length}
                            max={coursesData.skills.length}
                            display={String(coursesData.skills.length)}
                            color="#38bdf8"
                            animated={animated}
                            delay={150}
                        />
                    </div>
                    <div className="stat-ring-wrap">
                        <StatRing
                            icon={<Layers size={16} />}
                            label="Core stack"
                            value={progressPct}
                            max={100}
                            display={`${progressPct}%`}
                            color="#4ade80"
                            animated={animated}
                            delay={300}
                        />
                    </div>
                </div>

                {/* TOP ROW - Education + Online Courses side by side on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12 items-start">

                    {/* Left - Academic timeline */}
                    <div className="reveal">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
                            <LiaUniversitySolid />
                            Academic Background
                        </h3>
                        <div className="relative">
                            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-700 via-purple-700/50 to-transparent" />
                            <div className="absolute left-5 top-0 bottom-0 w-px overflow-visible">
                                <span
                                    className="travel-dot absolute -left-[3px] w-[7px] h-[7px] rounded-full bg-purple-300"
                                    style={{ boxShadow: '0 0 10px 3px rgba(196,132,252,0.8)' }}
                                />
                            </div>
                            <div className="space-y-6 sm:space-y-8">
                                {educationData.map((edu, index) => (
                                    <TimelineItem key={index} edu={edu} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Online Course */}
                    <div className="reveal">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
                            <Globe size={20} className="text-purple-400" /> Online Course
                        </h3>
                        <CourseCard course={coursesData} />
                    </div>

                </div>

                {/* Self Learning Goals - centered */}
                <div className="reveal flex justify-center">
                    <div className="spot-card card-hover bg-card rounded-2xl p-6 sm:p-8 border border-purple-700/20 w-full max-w-lg">
                        <h4 className="text-white font-bold text-base sm:text-lg mb-2 flex items-center justify-center gap-2 text-center">
                            <Rocket size={18} className="text-purple-400 flex-shrink-0" /> Self Learning Goals
                        </h4>
                        <p className="text-center text-gray-600 text-xs mb-5">
                            {doneCount} of {goals.length} completed
                        </p>

                        <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-6 sm:mb-7 relative">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-green-400 to-purple-400 relative overflow-hidden"
                                style={{ width: `${progressPct}%`, boxShadow: '0 0 10px rgba(168,85,247,0.6)' }}
                            >
                                <span
                                    className="bar-shimmer absolute top-0 left-0 h-full w-1/4"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {goals.map((g) => (
                                <GoalItem key={g.label} label={g.label} done={g.done} active={g.active} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

// Small circular stat ring with count-up, matching the Skills page's ring motif
function StatRing({ icon, label, value, max, display, color, animated, delay }) {
    const size = 84
    const strokeWidth = 6
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const [displayNum, setDisplayNum] = useState(0)
    const [entered, setEntered] = useState(false)

    useEffect(() => {
        if (!animated) return
        const enterTimer = setTimeout(() => setEntered(true), delay)
        const duration = 1100
        let rafId
        const countTimer = setTimeout(() => {
            const start = performance.now()
            const tick = (now) => {
                const elapsed = now - start
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplayNum(Math.round(eased * value))
                if (progress < 1) rafId = requestAnimationFrame(tick)
            }
            rafId = requestAnimationFrame(tick)
        }, delay + 100)
        return () => {
            clearTimeout(enterTimer)
            clearTimeout(countTimer)
            cancelAnimationFrame(rafId)
        }
    }, [animated, delay, value])

    const pct = max ? value / max : 0
    const offset = entered ? circumference - pct * circumference : circumference
    const isPercent = display.includes('%')

    return (
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: `stroke-dashoffset 1.1s ease-out ${delay + 100}ms`,
                            filter: `drop-shadow(0 0 6px ${color}80)`,
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                    <span style={{ color }}>{icon}</span>
                    <span className="text-white font-bold text-sm tabular-nums">
                        {isPercent ? `${displayNum}%` : displayNum}
                    </span>
                </div>
            </div>
            <span className="text-gray-500 text-xs font-medium">{label}</span>
        </div>
    )
}

function useSpotlight() {
    const ref = useRef(null)
    const handleMove = (e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    return { ref, handleMove }
}

function TimelineItem({ edu }) {
    const { ref, handleMove } = useSpotlight()

    return (
        <div className="relative pl-12 sm:pl-14">
            <div
                className={`absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 z-10 ${edu.ongoing ? 'pulse-node' : ''}`}
                style={{
                    backgroundColor: `${edu.color}25`,
                    borderColor: edu.color,
                    color: edu.color,
                    '--ring-color': `${edu.color}60`,
                }}
            >
                {edu.icon}
            </div>

            {edu.ongoing ? (
                <div className="relative rounded-2xl ongoing-border">
                    <div ref={ref} onMouseMove={handleMove} className="spot-card card-hover bg-card rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                        <TimelineCardBody edu={edu} />
                    </div>
                </div>
            ) : (
                <div ref={ref} onMouseMove={handleMove} className="spot-card card-hover bg-card rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                    <TimelineCardBody edu={edu} />
                </div>
            )}
        </div>
    )
}

function TimelineCardBody({ edu }) {
    return (
        <>
            <div className="flex items-start justify-between gap-2 mb-2 relative flex-wrap">
                <h4 className="text-white font-bold text-sm leading-snug">{edu.degree}</h4>
                <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0 ${edu.ongoing ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                >
                    {edu.grade}
                </span>
            </div>
            <p className="text-purple-400 text-xs font-semibold mb-1 relative">{edu.institution}</p>
            <p className="text-gray-600 text-xs mb-3 relative">{edu.year}</p>
            <p className="text-gray-500 text-xs leading-relaxed relative">{edu.description}</p>
        </>
    )
}

function CourseCard({ course }) {
    const { ref, handleMove } = useSpotlight()

    return (
        <div className="relative rounded-2xl course-border">
            <div
                ref={ref}
                onMouseMove={handleMove}
                className="spot-card card-hover bg-card rounded-2xl p-5 sm:p-6 relative overflow-hidden"
            >

                {/* Course Header */}
                <div className="flex items-start justify-between gap-3 mb-5 relative flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                        <span
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${course.color}20`, color: course.color }}
                        >
                            {course.icon}
                        </span>
                        <div className="min-w-0">
                            <h4 className="text-white font-bold text-sm leading-snug">{course.name}</h4>
                            <p className="text-purple-400 text-xs font-semibold mt-0.5">
                                {course.platform} · {course.batch}
                            </p>
                        </div>
                    </div>
                    <span
                        className="text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0 animate-pulse"
                        style={{ backgroundColor: `${course.color}20`, color: course.color }}
                    >
                        {course.year}
                    </span>
                </div>

                {/* Skills Covered */}
                <p className="text-gray-400 text-xs font-medium mb-2.5 relative">What it covers</p>
                <div className="flex flex-wrap gap-2 relative mb-6">
                    {course.skills.map((skill) => (
                        <SkillChip key={skill.name} skill={skill} />
                    ))}
                </div>

                {/* Certificates Section */}
                <div className="relative pt-5 border-t border-purple-700/20">
                    <p className="text-gray-300 text-xs font-semibold mb-3 flex items-center gap-1.5">
                        <Award size={15} className="text-purple-400" /> Certificates & Recognition
                    </p>
                    <div className="space-y-3">
                        {certificatesData.map((cert, idx) => (
                            <CertificateLink key={idx} cert={cert} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CertificateLink({ cert }) {
    return (
        <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cert block p-3 sm:p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-purple-500/30 transition-all duration-200"
        >
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="flex-shrink-0">{cert.icon}</span>
                    <h5 className="text-xs font-semibold text-white truncate group-hover/cert:text-purple-300 transition-colors">
                        {cert.title}
                    </h5>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                        style={{ backgroundColor: `${cert.badgeColor}20`, color: cert.badgeColor }}
                    >
                        {cert.type}
                    </span>
                    <ExternalLink
                        size={13}
                        className="text-gray-500 group-hover/cert:text-purple-400 group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 transition-all ml-1 flex-shrink-0"
                    />
                </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 pl-6">
                {cert.description}
            </p>
        </a>
    )
}

function SkillChip({ skill }) {
    return (
        <span
            className="skill-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{
                backgroundColor: `${skill.color}14`,
                borderColor: `${skill.color}40`,
                color: skill.color,
            }}
        >
            <span className="text-sm flex items-center">{skill.icon}</span>
            {skill.name}
        </span>
    )
}

// Goal checklist item — completed checks pop in with a spring bounce
function GoalItem({ label, done, active }) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
        ${done ? 'bg-green-500/20 text-green-400' :
                    active ? 'bg-purple-500/20 text-purple-400 animate-pulse' :
                        'bg-gray-800 text-gray-600'}`}
            >
                {done ? <Check size={12} className="pop-check" /> : active ? <ArrowRight size={12} /> : <Circle size={8} />}
            </div>
            <span className={`text-sm flex-1 min-w-0
        ${done ? 'text-gray-400 line-through' :
                    active ? 'text-purple-300 font-medium' :
                        'text-gray-600'}`}
            >
                {label}
            </span>
            {active && (
                <span className="text-xs bg-purple-900/40 text-purple-400 px-2 py-0.5 rounded-full flex-shrink-0">
                    learning
                </span>
            )}
        </div>
    )
}