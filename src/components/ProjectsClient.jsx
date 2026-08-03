'use client'
import React from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectsClient({ projects }) {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Here are some of my projects from GitHub. Each one helped me learn something new!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(projects) && projects.map((project, index) => (
            <ProjectCard key={project._id || project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a
            href="https://github.com/neya-mul"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 border border-purple-700 text-purple-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View All Repos on GitHub
          </a>
        </div>

      </div>
    </section>
  )
}