import React from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

const statusColor = {
  live: '#4ade80',
  'in progress': '#facc15',
  archived: '#94a3b8',
}

export default function ProjectCard({ project, index }) {
  const dotColor = statusColor[project.status?.toLowerCase()] || '#a78bfa'

  return (
    <div
      className="project-card group relative reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
        .project-card {
          border-radius: 1.25rem;
        }
        .glow-frame {
          position: relative;
          border-radius: inherit;
        }
        .glow-frame::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(from var(--angle), #a855f7, #f472b6, #38bdf8, #a855f7);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .project-card:hover .glow-frame::before {
          opacity: 1;
          animation: spin-border 3s linear infinite;
        }
        .spot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), rgba(168,85,247,0.10), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .project-card:hover .spot::before {
          opacity: 1;
        }
        .thumb-wrap {
          position: relative;
          overflow: hidden;
        }
        .thumb-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }
        .project-card:hover .thumb-img {
          transform: scale(1.08);
          filter: saturate(1.1);
        }
        .thumb-fade {
          background: linear-gradient(to top, rgba(13,10,20,0.95) 0%, rgba(13,10,20,0.15) 55%, transparent 100%);
        }
        .tech-chip {
          transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
        }
        .project-card:hover .tech-chip {
          border-color: rgba(168,85,247,0.55);
        }
        .details-link {
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .details-link .arrow {
          transition: transform 0.25s ease;
        }
        .details-link:hover .arrow {
          transform: translate(2px, -2px);
        }
        .pulse-dot {
          box-shadow: 0 0 0 0 currentColor;
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          70% { box-shadow: 0 0 0 6px transparent; opacity: 0; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 0; }
        }
      `}</style>

      <div
        className="glow-frame spot h-full"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
          e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
        }}
      >
        <div className="relative bg-card rounded-2xl p-5 flex flex-col h-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1">

          {/* Thumbnail */}
          <div className="thumb-wrap w-full h-44 rounded-xl mb-4">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="thumb-img w-full h-full object-cover"
            />
            <div className="thumb-fade absolute inset-0 pointer-events-none" />

            {/* Status badge, floating over the image */}
            <span
              className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-100"
            >
              <span className="relative flex h-1.5 w-1.5" style={{ color: dotColor }}>
                <span className="pulse-dot absolute inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: dotColor }} />
              </span>
              {project.status}
            </span>

            {/* Category, bottom-left over the fade */}
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold tracking-wide uppercase text-purple-300">
              {project.category}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-4 mb-5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="tech-chip text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/details/${project._id}`}
            className="details-link flex items-center justify-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-white hover:bg-purple-500/10 border border-purple-700 rounded-full py-2"
          >
            View Details
            <FiArrowUpRight className="arrow" size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}