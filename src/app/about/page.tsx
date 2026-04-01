'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-6xl mb-6">🎵</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-white/60 mb-8 max-w-md">
          We're crafting something amazing for you. Stay tuned!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-all"
        >
          <ArrowLeft size={18} />
          Return Home
        </Link>
      </div>
    </main>
  )
}