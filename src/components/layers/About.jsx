'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { SiNextdotjs, SiExpress, SiNodedotjs, SiMongodb } from 'react-icons/si'
import { FiPackage } from 'react-icons/fi'
import { FaDumbbell, FaGlobeAsia, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'
import neyamul from '../../../public/neyamul.png'

const quickFacts = [
  { icon: <FaGlobeAsia size={14} />, label: 'Based in Bangladesh', color: '#4ade80' },
  { icon: <FiPackage size={14} />, label: 'MERN Stack', color: '#a78bfa' },
  { icon: <FaDumbbell size={14} />, label: 'Anime & discipline', color: '#f472b6' },
]

export default function About() {
  const sectionRef = useRef(null)
  const spotlightRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect || !spotlightRef.current) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    spotlightRef.current.style.background = `radial-gradient(500px circle at ${x}% ${y}%, rgba(168,85,247,0.07), transparent 65%)`
  }, [])

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <style jsx>{`
        @keyframes blob-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes blob-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.05); }
        }
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes spin-border { to { --angle: 360deg; } }
        @keyframes spin-halo { to { transform: rotate(360deg); } }
        @keyframes spin-halo-rev { to { transform: rotate(-360deg); } }
        @keyframes bob-pill {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -6px); }
        }
        @keyframes ping-soft {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .blob-a { animation: blob-a 10s ease-in-out infinite; }
        .blob-b { animation: blob-b 12s ease-in-out infinite; }
        .shimmer-heading {
          background: linear-gradient(90deg, #c084fc, #f472b6, #a78bfa, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 5s linear infinite;
        }
        .glow-border { animation: spin-border 4s linear infinite; }
        .glow-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(from var(--angle), #4ade80, #a855f7, #38bdf8, #4ade80);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.75;
        }
        .halo-ring {
          animation: spin-halo 40s linear infinite;
        }
        .halo-dot-wrap {
          animation: spin-halo-rev 40s linear infinite;
        }
        .tech-pill {
          animation: bob-pill 4s ease-in-out infinite;
        }
        .ping-soft {
          animation: ping-soft 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .spot-card { position: relative; }
        .spot-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.12), transparent 60%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .spot-card:hover::before { opacity: 1; }
        .tilt-photo {
          transition: transform 0.15s ease-out;
          transform-style: preserve-3d;
        }
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;
        }
        .icon-box :global(svg) { display: block; }
      `}</style>

      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 transition-[background] duration-150" />

      <div className="pointer-events-none absolute -top-10 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[110px] blob-a" />
      <div className="pointer-events-none absolute bottom-0 right-1/5 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-[110px] blob-b" />

      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            About <span className="shimmer-heading">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left - visual card */}
          <div className="reveal">
            <div className="relative max-w-md mx-auto pb-6">
              <PhotoCard />
            </div>
          </div>

          {/* Right - text content */}
          <div className="reveal">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hi! I'm <span className="text-purple-400">Neyamul Islam</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm a MERN Stack developer from Bangladesh with a passion for building
              beautiful, functional web experiences. I love turning ideas into reality
              using code and design.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              I work with JavaScript, TypeScript, NextJS, TailwindCSS, ExpressJS and MongoDB to create responsive and
              visually appealing websites. I'm always learning new technologies to
              level up my skills.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6 flex items-center gap-2">
              When I'm not coding, I'm a big anime fan — you might have noticed my
              Attack on Titan shirt!
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {quickFacts.map((fact) => (
                <span
                  key={fact.label}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ backgroundColor: `${fact.color}12`, borderColor: `${fact.color}30`, color: fact.color }}
                >
                  {fact.icon}
                  {fact.label}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <InfoRow label="Name" value="Neyamul Islam" />
              <InfoRow
                label="Location"
                value={
                  <span className="flex items-center gap-1.5">
                    Bangladesh <FaMapMarkerAlt className="text-purple-400" size={12} />
                  </span>
                }
              />
              <InfoRow label="Focus" value="Full Stack" />
              <InfoRow label="Status" value="Open to Opportunities" highlight live />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Profile photo — slow rotating halo behind it, a status ribbon in the corner,
// and one glass tech pill anchored to the bottom edge instead of loose floating icons
function PhotoCard() {
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
    <div className="relative">
      {/* Slow rotating halo ring, sits behind the card */}
      <div className="absolute -inset-6 flex items-center justify-center pointer-events-none">
        <div className="halo-ring absolute inset-0 rounded-full border border-dashed border-purple-700/25" />
        <div className="halo-dot-wrap absolute inset-0">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400" style={{ boxShadow: '0 0 8px 2px rgba(168,85,247,0.7)' }} />
        </div>
        <div className="halo-ring absolute inset-3 rounded-full border border-dashed border-fuchsia-700/15" style={{ animationDuration: '55s', animationDirection: 'reverse' }} />
      </div>

      <div className="relative rounded-3xl glow-border">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="tilt-photo spot-card card-hover bg-card rounded-3xl p-4 md:p-6 relative overflow-hidden"
        >
          {/* Status ribbon, top-left, overlaying the photo */}
          <div className="absolute top-7 left-7 z-10 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-green-500/30 text-green-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-soft absolute inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Open to work
          </div>

          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={neyamul}
              alt="Neyamul Islam"
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>

      {/* Tech pill anchored to the bottom edge of the card */}
      <div
        className="tech-pill absolute left-1/2 bottom-0 z-10 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#171226]/90 backdrop-blur-md border border-purple-700/30 shadow-xl"
        style={{ transform: 'translate(-50%, 0)' }}
      >
        <span className="icon-box" style={{ color: '#e5e5e5' }}><SiNextdotjs size={15} /></span>
        <span className="icon-box" style={{ color: '#ffffff' }}><SiExpress size={17} /></span>
        <span className="icon-box" style={{ color: '#68a063' }}><SiNodedotjs size={17} /></span>
        <span className="icon-box" style={{ color: '#47a248' }}><SiMongodb size={17} /></span>
        <span className="w-px h-3.5 bg-purple-700/40" />
        {/* <span className="text-xs font-medium text-gray-300 whitespace-nowrap">MERN Stack</span> */}
      </div>
    </div>
  )
}

// Info row used in the about text
function InfoRow({ label, value, highlight, live }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 w-24 text-sm flex-shrink-0">{label}:</span>
      <span className={`text-sm font-medium flex items-center gap-2 ${highlight ? 'text-green-400' : 'text-white'}`}>
        {live && (
          <span className="relative flex h-2 w-2">
            <span className="ping-soft absolute inline-flex h-2 w-2 rounded-full bg-green-400" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
        )}
        {value}
      </span>
    </div>
  )
}