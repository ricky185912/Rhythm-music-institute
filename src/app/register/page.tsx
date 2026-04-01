'use client'

import { Phone, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { lazy, Suspense } from 'react'
import Link from 'next/link'

// Lazy load Header and Footer
const Header = lazy(() => import('../components/Header').then(mod => ({ default: mod.default })))
const Footer = lazy(() => import('../components/Footer').then(mod => ({ default: mod.default })))

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-20 bg-black/50 animate-pulse" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const phoneNumber = '+918754727711'

  const handleCallClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`
    } else {
      window.open('https://wa.me/918754727711', '_blank')
    }
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <main className="min-h-screen bg-black">
        <Header />
        
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Start Your{' '}
                <span className="text-yellow-400">Journey</span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Take the first step towards your musical dreams
              </p>
              <div className="piano-line mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 md:p-12 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="w-10 h-10 text-yellow-400" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Book a Free Consultation Call
            </h2>
            
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Speak directly with our music experts. Discuss your goals, ask questions, and discover the perfect learning path for you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={16} className="text-yellow-400" />
                <span>15-min free consultation</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={16} className="text-yellow-400" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={16} className="text-yellow-400" />
                <span>Personalized guidance</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={16} className="text-yellow-400" />
                <span>Flexible scheduling</span>
              </div>
            </div>

            <button
              onClick={handleCallClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/25"
            >
              <Phone size={20} />
              Call Now: +91 87547 27711
              <ArrowRight size={18} />
            </button>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-sm mb-3">Or reach us on:</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://wa.me/918754727711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:text-yellow-400 hover:border-yellow-400/50 transition-all text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929h.003c3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.771-5.767-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.067-.248-.078-.57-.177-1.04-.36-.674-.26-1.102-.889-1.132-.93-.03-.041-.27-.354-.27-.675 0-.322.166-.483.238-.553.072-.07.157-.105.239-.155.083-.05.166-.083.239-.166.072-.083.12-.166.12-.332 0-.166-.083-.332-.166-.498-.036-.072-.078-.145-.12-.228-.042-.083-.084-.166-.126-.249-.041-.083 0-.166.083-.249.083-.083.312-.332.478-.415.166-.083.332-.083.415-.083.083 0 .166 0 .249.083.083.083.083.166.083.249 0 .083 0 .166-.083.249-.083.083-.166.166-.249.249-.083.083-.166.166-.166.249 0 .083.083.166.166.249.083.083.166.166.166.249 0 .083-.083.166-.166.249-.083.083-.166.166-.166.249 0 .083.083.166.166.249.083.083.166.166.166.249 0 .083-.083.166-.166.249z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:rgallenmusic@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:text-yellow-400 hover:border-yellow-400/50 transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-white/40 text-sm bg-white/5 px-4 py-2 rounded-full">
              <Clock size={14} />
              <span>Available all time</span>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  )
}