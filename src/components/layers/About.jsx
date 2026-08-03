'use client'

import { SiNextdotjs } from 'react-icons/si'
import { FiPackage } from 'react-icons/fi'
import { FaDumbbell, FaGlobeAsia, FaMapMarkerAlt } from 'react-icons/fa'

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left - visual card */}
          <div className="reveal">
            <div className="card-hover bg-card rounded-3xl p-8">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                <StatCard number="24+" label="Repositories" icon={<FiPackage />} />
                <StatCard number="100%" label="Dedication" icon={<FaDumbbell />} />
                <StatCard number="Next JS" label="Main Stack" icon={<SiNextdotjs />} />
                <StatCard number="BD" label="Bangladesh" icon={<FaGlobeAsia />} />
              </div>

              {/* Quote */}
              <div className="mt-8 p-4 border border-purple-700/20 rounded-2xl bg-purple-900/10">
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "Beginner to coding, but passionate about building great things on the web."
                </p>
                <p className="text-purple-400 text-sm mt-2 font-semibold">— Neyamul Islam</p>
              </div>
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
            <p className="text-gray-400 leading-relaxed mb-8 flex items-center gap-2">
              When I'm not coding, I'm a big anime fan — you might have noticed my
              Attack on Titan shirt! 
            </p>

            {/* Info list */}
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
              <InfoRow label="Status" value="Open to Opportunities" highlight />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Small stat card component
function StatCard({ number, label, icon }) {
  return (
    <div className="bg-[rgba(10,10,15,0.5)] rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1 flex justify-center text-purple-400">{icon}</div>
      <div className="text-xl font-bold text-white">{number}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

// Info row used in the about text
function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 w-24 text-sm">{label}:</span>
      <span className={`text-sm font-medium ${highlight ? 'text-green-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}
