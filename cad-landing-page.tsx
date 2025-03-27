"use client"

import { useState } from 'react'

export default function CADLandingPage() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-[#333333] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6 rounded-xl overflow-hidden">
        {/* Left Column */}
        <div className="p-6 md:p-8 bg-[#333333]">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-white">AI-Powered </span>
            <span className="text-[#7bdbe6]">CAD Generation</span>
          </h1>

          <p className="text-white/80 mb-4">Convert your ideas into CAD files instantly.</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#7bdbe6]/20 rounded-full p-1">
                <svg
                  className="h-4 w-4 text-[#7bdbe6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-white/80 text-sm">Upload text, images, or sketches</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#7bdbe6]/20 rounded-full p-1">
                <svg
                  className="h-4 w-4 text-[#7bdbe6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-white/80 text-sm">Get accurate 3D models instantly</span>
            </div>
          </div>

          <div className="bg-[#333333]/50 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)] p-3 border border-white/10">
            <div className="flex items-start gap-2 mb-3">
              <div className="bg-[#7bdbe6]/20 rounded-full p-1.5">
                <svg
                  className="h-4 w-4 text-[#7bdbe6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-white/80 text-sm w-full">Design a 3D model...</div>
            </div>

            <div className="flex justify-center py-4">
              <div className="relative h-32 w-32">
                <img src="/placeholder.svg?height=128&width=128" alt="3D Model Preview" className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#333333] p-6 md:p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/10">
          <h2 className="text-2xl font-bold mb-2 text-white">Request Early Access</h2>
          <p className="text-white/60 mb-6">Join the waitlist for exclusive beta access.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block font-medium text-white/80 text-sm">
                Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="company" className="block font-medium text-white/80 text-sm">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="role" className="block font-medium text-white/80 text-sm">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="Your position"
                className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30"
              />
            </div>

            <button type="submit" className="w-full h-10 mt-2 text-sm text-white font-medium rounded-md bg-[#7bdbe6] hover:bg-[#7bdbe6]/90 transition-colors">
              Apply for Early Access
            </button>

            <p className="text-center text-xs text-white/40 mt-2">
              By signing up, you agree to our terms and privacy policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

