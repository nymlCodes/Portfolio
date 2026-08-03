'use client'

import { useState } from 'react'
import { FaLinkedin, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaCheckCircle } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  // Handle form input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submit - opens email client with pre-filled data
  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:neyamulislam946@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center mb-16 reveal">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">Let's Talk</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left - contact info */}
          <div className="reveal">
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

            <div className="space-y-4 mb-8">
              <ContactItem
                icon={<FaLinkedin />}
                label="LinkedIn"
                value="linkedin.com/in/neya-mul"
                href="https://www.linkedin.com/in/neya-mul/"
              />

              <ContactItem
                icon={<FaEnvelope />}
                label="Email"
                value="neyamulislam946@gmail.com"
                href="mailto:neyamulislam946@gmail.com"
              />

              <ContactItem
                icon={<FaPhoneAlt />}
                label="Phone"
                value="+880 1874062550"
                href="tel:+8801874062550"
              />

              <ContactItem
                icon={<FaWhatsapp />}
                label="WhatsApp"
                value="+880 1874062550"
                href="https://wa.me/8801874062550"
              />
            </div>
            {/* Availability badge */}
            <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-700/30 rounded-2xl">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div>
                <p className="text-green-400 font-semibold text-sm">Available for Work</p>
                <p className="text-gray-500 text-xs">Open to freelance & full-time opportunities</p>
              </div>
            </div>
          </div>

          {/* Right - contact form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-card border border-purple-700/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-card border border-purple-700/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-card border border-purple-700/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-glow w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>
                    <FaCheckCircle /> Message Sent!
                  </>
                ) : (
                  'Send Message →'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

// Contact info row
function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="card-hover bg-card rounded-xl p-4 flex items-center gap-4">
      <span className="text-2xl text-purple-400">{icon}</span>
      <div>
        <p className="text-gray-600 text-xs">{label}</p>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}
