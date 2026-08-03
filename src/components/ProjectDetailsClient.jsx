'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
    FaGithub,
    FaExternalLinkAlt,
    FaClock,
    FaUsers,
    FaTag,
    FaCheckCircle,
    FaLightbulb,
    FaBug,
    FaTools,
    FaRocket,
    FaArrowLeft,
    FaServer,
} from 'react-icons/fa'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
}

/** Card with a mouse-tracking radial spotlight border — matches the ambient-orb
 *  language used across the rest of the site (AnimatedBackground). */
function SpotlightCard({ children, className = '', tint = '124, 58, 237' }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
            }}
            className={`group/spot relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20 ${className}`}
            style={{ '--x': '50%', '--y': '50%' }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at var(--x) var(--y), rgba(${tint}, 0.12), transparent 70%)`,
                }}
            />
            <div className="relative">{children}</div>
        </motion.div>
    )
}

export default function ProjectDetailsClient({ project }) {
    if (!project) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-32 text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-white transition-colors"
                >
                    <FaArrowLeft /> Back to Projects
                </Link>
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden">
            {/* Ambient orbs — echoes AnimatedBackground.js, purple-only now */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div
                    className="absolute top-1/3 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse"
                    style={{ animationDelay: '1.5s' }}
                />
                <div
                    className="absolute bottom-0 left-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: '3s' }}
                />
            </div>

            <motion.div
                className="max-w-4xl mx-auto px-6 py-20 md:py-24"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Back link */}
                <motion.div variants={fadeUp}>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                        Back to Projects
                    </Link>
                </motion.div>

                {/* Thumbnail — signature hover moment */}
                <motion.div
                    variants={fadeUp}
                    className="group relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl shadow-purple-950/40"
                >
                    <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/40 via-transparent to-fuchsia-500/20 blur-sm -z-10" />

                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/0 transition-opacity duration-500 group-hover:from-black/70" />

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-[scan_2.5s_ease-in-out_infinite]" />
                    </div>

                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md text-purple-300 border border-purple-400/30 uppercase tracking-wider font-medium shadow-lg shadow-purple-950/30">
                            {project.category}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-violet-500/20 backdrop-blur-md text-violet-200 border border-violet-400/30 uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-lg shadow-violet-950/20">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-300 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-300" />
                            </span>
                            {project.status}
                        </span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/10 flex items-center gap-1.5">
                            <FaExternalLinkAlt className="text-[10px]" /> View project
                        </span>
                    </div>
                </motion.div>

                {/* Title + description */}
                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-[1.1] bg-gradient-to-br from-white via-white to-purple-300 bg-clip-text text-transparent"
                >
                    {project.title}
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-gray-400 leading-relaxed mb-8 text-base md:text-lg max-w-3xl"
                >
                    {project.fullDescription}
                </motion.p>

                {/* Quick info row */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 text-sm">
                    <div className="flex items-center gap-2 bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/30 rounded-full px-4 py-2 text-gray-300 transition-colors duration-300">
                        <FaClock className="text-purple-400" />
                        {project.duration}
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/30 rounded-full px-4 py-2 text-gray-300 transition-colors duration-300">
                        <FaUsers className="text-purple-400" />
                        {project.team}
                    </div>
                </motion.div>

                {/* Links */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
                    {project.liveUrl && (
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-shadow duration-300 overflow-hidden group/btn"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            <FaExternalLinkAlt className="relative z-10" />
                            <span className="relative z-10">Live Demo</span>
                        </motion.a>
                    )}
                    {project.githubUrl && (
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-purple-500/10 border border-purple-700/60 hover:border-purple-400/60 text-purple-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                        >
                            <FaGithub /> Client Code
                        </motion.a>
                    )}
                    {project.server && (
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            href={project.server}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-purple-500/10 border border-purple-700/60 hover:border-purple-400/60 text-purple-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                        >
                            <FaServer /> Server Code
                        </motion.a>
                    )}
                </motion.div>

                {/* Technologies */}
                <Section title="Technologies" icon={<FaTag />}>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <motion.span
                                key={tech}
                                variants={fadeUp}
                                whileHover={{ y: -3, scale: 1.05 }}
                                className="text-sm px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25 hover:border-purple-400/60 hover:bg-purple-500/20 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </Section>

                {/* Features */}
                <Section title="Features" icon={<FaCheckCircle />}>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {project.features.map((feature) => (
                            <SpotlightCard key={feature} className="px-4 py-3" tint="124, 58, 237">
                                <div className="flex items-start gap-3 text-gray-300 text-sm">
                                    <FaCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" />
                                    {feature}
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </Section>

                {/* Errors / Challenges */}
                {project.errors?.length > 0 && (
                    <Section title="Challenges & Solutions" icon={<FaBug />}>
                        <div className="space-y-4">
                            {project.errors.map((err) => (
                                <SpotlightCard key={err.title} className="p-5 bg-card" tint="124, 58, 237">
                                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                        <FaBug className="text-purple-400" /> {err.title}
                                    </h4>
                                    <div className="space-y-2.5 pl-1">
                                        <p className="text-gray-500 text-sm border-l-2 border-purple-500/40 pl-3">
                                            <span className="text-gray-300 font-medium">Problem: </span>
                                            {err.problem}
                                        </p>
                                        <p className="text-gray-500 text-sm border-l-2 border-violet-400/40 pl-3 flex items-start gap-2">
                                            <FaTools className="text-violet-300 mt-0.5 flex-shrink-0" />
                                            <span>
                                                <span className="text-gray-300 font-medium">Solution: </span>
                                                {err.solution}
                                            </span>
                                        </p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Lessons Learned */}
                <Section title="Lessons Learned" icon={<FaLightbulb />}>
                    <div className="space-y-2.5">
                        {project.lessonsLearned.map((lesson) => (
                            <motion.div
                                key={lesson}
                                variants={fadeUp}
                                whileHover={{ x: 4 }}
                                className="flex items-start gap-3 bg-fuchsia-500/[0.04] hover:bg-fuchsia-500/[0.09] border border-fuchsia-400/15 hover:border-fuchsia-400/40 rounded-xl px-4 py-3 text-gray-300 text-sm transition-all duration-300"
                            >
                                <FaLightbulb className="text-fuchsia-300 mt-0.5 flex-shrink-0" />
                                {lesson}
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* Future Plans */}
                {project.futurePlans?.length > 0 && (
                    <Section title="Future Plans" icon={<FaRocket />}>
                        <div className="space-y-2.5">
                            {project.futurePlans.map((plan) => (
                                <motion.div
                                    key={plan}
                                    variants={fadeUp}
                                    whileHover={{ x: 4 }}
                                    className="flex items-start gap-3 bg-purple-500/[0.04] hover:bg-purple-500/[0.09] border border-purple-500/15 hover:border-purple-500/40 rounded-xl px-4 py-3 text-gray-300 text-sm transition-all duration-300"
                                >
                                    <FaRocket className="text-purple-400 mt-0.5 flex-shrink-0" />
                                    {plan}
                                </motion.div>
                            ))}
                        </div>
                    </Section>
                )}
            </motion.div>
        </div>
    )
}

function Section({ title, icon, children }) {
    return (
        <motion.div
            variants={fadeUp}
            className="mb-12 pt-8 border-t border-white/5 first-of-type:border-t-0 first-of-type:pt-0"
        >
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                <span className="text-purple-400 text-lg">{icon}</span> {title}
            </h2>
            {children}
        </motion.div>
    )
}