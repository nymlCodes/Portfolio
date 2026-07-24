import React from 'react'
import Link from 'next/link'

export default function ProjectCard({ project, index }) {
  return (
    <div
      className="card-hover bg-card rounded-2xl p-6 flex flex-col reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <span className="text-xs text-purple-400 uppercase tracking-wide mb-2">
        {project.category} · {project.status}
      </span>

      <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>

      <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">
        {project.fullDescription}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={`/details/${project._id}`}
        className="text-center text-sm font-semibold text-purple-400 hover:text-white border border-purple-700 rounded-full py-2 transition-colors"
      >
        View Details
      </Link>
    </div>
  )
}