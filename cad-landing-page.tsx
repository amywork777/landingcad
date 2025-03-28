"use client"

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { createClient } from '@supabase/supabase-js'

const inter = Inter({ subsets: ['latin'] })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CADLandingPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    useCase: ''
  })

  const [text, setText] = useState('')
  const [showImage, setShowImage] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const fullText = 'Design a coffee grinder like this...'

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Start showing left half immediately
    setShowImage(true)
    
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(interval)
        setIsTyping(false)
        setShowFullImage(true)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.email.trim() || !formData.name.trim()) {
      setError('Email and name are required')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: formData.email,
            name: formData.name,
            use_case: formData.useCase
          }
        ])

      if (error) throw error

      setSuccess(true)
      setFormData({ email: '', name: '', useCase: '' })
    } catch (err) {
      console.error('Submission error:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-[#333333] flex flex-col ${inter.className}`}>
      {/* Header */}
      <div className="w-full bg-[#333333] p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <a href="https://taiyaki.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src="/fishlogo.svg" alt="Taiyaki Logo" className="h-10 w-10 [filter:invert(1)]" />
            <span className="text-xl font-bold text-white">taiyaki</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4">
        <div className="max-w-7xl w-full grid md:grid-cols-[1fr_2.5fr] gap-4 md:gap-6 rounded-xl overflow-hidden">
          {/* Form Column - Now First */}
          <div className="order-2 md:order-1 bg-[#333333] p-4 md:p-6 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/10">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              <span className="text-white">AI-Powered </span>
              <span className="text-[#7bdbe6]">CAD</span>
            </h1>
            <p className="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Fully editable parametric STEP files</p>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block font-medium text-white/80 text-sm">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="name" className="block font-medium text-white/80 text-sm">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="useCase" className="block font-medium text-white/80 text-sm">
                  How do you plan to use this in your work? (Optional)
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  placeholder="Tell us about your use case"
                  rows={4}
                  className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7bdbe6]/30 resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-10 mt-2 text-sm text-white font-medium rounded-md bg-[#7bdbe6] hover:bg-[#7bdbe6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Join the waitlist'}
              </button>

              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}

              {success && (
                <p className="mt-2 text-sm text-green-400">Successfully joined the waitlist!</p>
              )}

              <p className="text-center text-xs text-white/40 mt-2">
                By signing up, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>

          {/* Main Content Column - Now Second */}
          <div className="order-1 md:order-2 p-4 md:p-6 bg-[#333333]">
            <div className="bg-[#333333]/50 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)] p-4 md:p-6 border border-white/10">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-[#7bdbe6]/20 rounded-full p-2 md:p-2.5">
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6 text-[#7bdbe6]"
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
                <div className="bg-white/5 rounded-lg p-3 md:p-4 text-white/80 text-base md:text-lg w-full">
                  {isTyping ? (
                    <>
                      {text}<span className="animate-pulse">|</span>
                    </>
                  ) : (
                    text
                  )}
                </div>
              </div>

              <div className="flex justify-center py-3 md:py-4">
                <div className={`relative w-full h-[200px] md:h-[400px] rounded-lg overflow-hidden transition-all duration-500 ${showImage ? 'opacity-100' : 'opacity-0'}`}>
                  <img
                    src="/coffee-grinder.jpg"
                    alt="Coffee Grinder"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 95%' }}
                  />
                  <div 
                    className={`absolute top-0 right-0 w-1/2 h-full bg-[#333333] transition-transform duration-500 ${showFullImage ? 'translate-x-full' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

