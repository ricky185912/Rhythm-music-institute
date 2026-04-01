// app/loading.tsx
'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [activeNote, setActiveNote] = useState(0)

  // Animated progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + Math.random() * 15, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Animated music notes
  useEffect(() => {
    const noteInterval = setInterval(() => {
      setActiveNote(prev => (prev + 1) % 6)
    }, 400)

    return () => clearInterval(noteInterval)
  }, [])

  const notes = ['♪', '♫', '♩', '♪', '♫', '♩']
  const floatingSymbols = ['♪', '♫', '♩', '🎵', '🎶']
  
  // Pre-defined positions for floating symbols (deterministic)
  const floatingPositions = [
    { left: 15, top: 20, delay: 0.2, duration: 8, fontSize: 28 },
    { left: 75, top: 60, delay: 1.5, duration: 12, fontSize: 36 },
    { left: 45, top: 80, delay: 2.8, duration: 10, fontSize: 24 },
    { left: 85, top: 25, delay: 0.5, duration: 14, fontSize: 32 },
    { left: 25, top: 70, delay: 3.2, duration: 9, fontSize: 20 },
    { left: 55, top: 40, delay: 1.0, duration: 11, fontSize: 40 },
    { left: 35, top: 55, delay: 2.0, duration: 13, fontSize: 26 },
    { left: 65, top: 85, delay: 0.8, duration: 7, fontSize: 30 }
  ]
  
  const pianoKeys = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-radial-gradient-circle-at-50-50 from-yellow-400/3 to-transparent" />
      
      {/* Animated piano keys background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-center">
          {pianoKeys.map((i) => (
            <div
              key={i}
              className="w-8 md:w-12 h-full bg-white mx-px rounded-t-lg"
              style={{
                animation: `pianoKeyFloat ${1 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                transform: `translateY(${Math.sin(i) * 10}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto bg-linear-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl md:text-5xl font-bold text-black">♪</span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            RHYTHM
          </h1>
          <p className="text-yellow-400 text-sm tracking-wider mt-1">
            MUSIC INSTITUTE
          </p>
        </div>

        {/* Animated Music Notes */}
        <div className="flex justify-center gap-4 md:gap-6 mb-8">
          {notes.map((note, index) => (
            <div
              key={index}
              className="text-yellow-400 text-2xl md:text-3xl transition-all duration-300"
              style={{
                opacity: activeNote === index ? 1 : 0.2,
                transform: activeNote === index ? 'translateY(-8px) scale(1.2)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              {note}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/40">
            <span>Loading experience</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-sm animate-pulse">
            Preparing your musical journey...
          </p>
        </div>
      </div>

      {/* Floating musical symbols - deterministic positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute text-yellow-400/10 animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
              fontSize: `${pos.fontSize}px`,
            }}
          >
            {floatingSymbols[index % floatingSymbols.length]}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pianoKeyFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .bg-radial-gradient-circle-at-50-50 {
          background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03), transparent 70%);
        }
      `}</style>
    </div>
  )
}