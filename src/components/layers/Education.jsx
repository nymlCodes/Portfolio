'use client'

import { GraduationCap, Check, ArrowRight, Circle, Globe, Rocket } from 'lucide-react'
import { FaUniversity, FaLaptopCode, FaReact, FaJs } from 'react-icons/fa'
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

const coursesData = [
    { name: 'Complete Web Development', platform: 'Programming Hero', icon: <FaLaptopCode />, year: '2026' },
    { name: 'React JS Masterclass', platform: 'Programming Hero', icon: <FaReact />, year: '2026' },
    { name: 'Next.js Complete Course', platform: 'Programming Hero', icon: <SiNextdotjs />, year: '2026' },
    { name: 'Tailwind CSS Full Course', platform: 'Programming Hero', icon: <SiTailwindcss />, year: '2026' },
    { name: 'JavaScript ES6+', platform: 'Programming Hero', icon: <FaJs />, year: '2026' },
    { name: 'Node.js & Express.js', platform: 'Programming Hero', icon: <SiExpress />, year: '2026' },
]

export default function Education() {
    return (
        <section id="education" className="py-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section heading */}
                <div className="text-center mb-16 reveal">
                    <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">My Journey</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Education <span className="gradient-text">& Learning</span>
                    </h2>
                </div>

                {/* TOP ROW - Education + Online Courses side by side */}
                <div className="grid md:grid-cols-2 gap-12 mb-12 items-center">

                    {/* Left - Academic timeline */}
                    <div className="reveal">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <LiaUniversitySolid />
                            Academic Background
                        </h3>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-700 via-purple-700/50 to-transparent" />
                            <div className="space-y-8">
                                {educationData.map((edu, index) => (
                                    <TimelineItem key={index} edu={edu} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Online Courses */}
                    <div className="reveal">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Globe size={20} className="text-purple-400" /> Online Courses
                        </h3>
                        <div className="space-y-3">
                            {coursesData.map((course, i) => (
                                <CourseCard key={i} course={course} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* BOTTOM ROW - Self Learning Goals centered */}
                <div className="reveal flex justify-center">
                    <div className="card-hover bg-card rounded-2xl p-8 border border-purple-700/20 w-full max-w-lg">
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-center gap-2">
                            <Rocket size={18} className="text-purple-400" /> Self Learning Goals
                        </h4>
                        <div className="space-y-3">
                            <GoalItem done label="HTML & CSS Fundamentals" />
                            <GoalItem done label="JavaScript Basics" />
                            <GoalItem done label="React JS" />
                            <GoalItem done label="Tailwind CSS" />
                            <GoalItem done label="Next.js" />
                            <GoalItem label="TypeScript" active />
                            <GoalItem label="Node.js & Express" active />
                            <GoalItem label="MongoDB" active />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

// Single timeline card
function TimelineItem({ edu }) {
    return (
        <div className="relative pl-14">
            <div
                className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{ backgroundColor: `${edu.color}25`, borderColor: edu.color, color: edu.color }}
            >
                {edu.icon}
            </div>
            <div className="card-hover bg-card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white font-bold text-sm leading-snug">{edu.degree}</h4>
                    <span
                        className="text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0"
                        style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                    >
                        {edu.grade}
                    </span>
                </div>
                <p className="text-purple-400 text-xs font-semibold mb-1">{edu.institution}</p>
                <p className="text-gray-600 text-xs mb-3">{edu.year}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{edu.description}</p>
            </div>
        </div>
    )
}

// Online course row card
function CourseCard({ course }) {
    return (
        <div className="card-hover bg-card rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-xl text-purple-400">{course.icon}</span>
                <div>
                    <p className="text-white text-sm font-medium">{course.name}</p>
                    <p className="text-gray-600 text-xs">{course.platform}</p>
                </div>
            </div>
            <span className="text-gray-700 text-xs">{course.year}</span>
        </div>
    )
}

// Goal checklist item
function GoalItem({ label, done, active }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
        ${done ? 'bg-green-500/20 text-green-400' :
                    active ? 'bg-purple-500/20 text-purple-400 animate-pulse' :
                        'bg-gray-800 text-gray-600'}`}
            >
                {done ? <Check size={12} /> : active ? <ArrowRight size={12} /> : <Circle size={8} />}
            </div>
            <span className={`text-sm
        ${done ? 'text-gray-400 line-through' :
                    active ? 'text-purple-300 font-medium' :
                        'text-gray-600'}`}
            >
                {label}
            </span>
            {active && (
                <span className="text-xs bg-purple-900/40 text-purple-400 px-2 py-0.5 rounded-full">
                    learning
                </span>
            )}
        </div>
    )
}
