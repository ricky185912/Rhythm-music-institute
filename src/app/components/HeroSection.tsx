'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Music, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState<number>(1024)
  const [mounted, setMounted] = useState(false)
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Frequency mapping for piano notes (in Hz) - wrapped in useMemo
  const noteFrequencies = useMemo<Record<string, number>>(() => ({
    'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
    'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
    'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
  }), [])

  // Initialize Audio Context with proper typing
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    return audioContextRef.current
  }, [])

  // Play piano note with realistic envelope
  const playNote = useCallback((note: string, octave: number = 4, keyId: string) => {
    try {
      const audioContext = initAudio()
      const frequency = noteFrequencies[note]
      
      if (!frequency) return

      // Show key press animation
      setPressedKey(keyId)
      setTimeout(() => setPressedKey(null), 150)

      // Create oscillator and gain nodes for realistic piano sound
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filterNode = audioContext.createBiquadFilter()
      
      // Set oscillator type for piano-like sound (using triangle wave for softer tone)
      oscillator.type = 'triangle'
      oscillator.frequency.value = frequency * (octave === 4 ? 1 : octave === 3 ? 0.5 : 2)
      
      // Add filter for more realistic piano timbre
      filterNode.type = 'lowpass'
      filterNode.frequency.value = 2000
      filterNode.Q.value = 2
      
      // Create volume envelope (attack, decay, sustain, release)
      const now = audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01) // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.2) // Decay to sustain
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 1.5) // Release
      
      // Connect nodes
      oscillator.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Start and stop the sound
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 1.5)
      
    } catch (error) {
      console.error('Error playing note:', error)
    }
  }, [initAudio, noteFrequencies])

  // Get white key note with octave
  const getWhiteKeyNote = useCallback((index: number) => {
    const octave = 4 + Math.floor(index / 7)
    const noteIndex = index % 7
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    return { note: notes[noteIndex], octave, id: `white-${index}` }
  }, [])

  // Get black key note with octave
  const getBlackKeyNote = useCallback((index: number) => {
    const octave = 4 + Math.floor(index / 5)
    const noteIndex = index % 5
    const notes = ['C#', 'D#', 'F#', 'G#', 'A#']
    return { note: notes[noteIndex], octave, id: `black-${index}` }
  }, [])

  const floatingNotes = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: (i * 83) % 100,
      top: (i * 47) % 100,
      size: 20 + (i % 15),
      duration: 25 + (i % 15),
      delay: i * 0.8,
    }))
  }, [])

  const keySize = useMemo(() => {
    if (!mounted) {
      return { white: 'w-16 h-72', black: 'w-10 h-52', blackMargin: 40 }
    }
    if (windowWidth < 640) {
      return { white: 'w-8 h-32', black: 'w-5 h-24', blackMargin: 24 }
    }
    if (windowWidth < 1024) {
      return { white: 'w-12 h-48', black: 'w-8 h-36', blackMargin: 32 }
    }
    return { white: 'w-16 h-72', black: 'w-10 h-52', blackMargin: 40 }
  }, [mounted, windowWidth])

  const whiteKeyCount = useMemo(() => {
    if (!mounted) return 14
    return windowWidth < 640 ? 8 : windowWidth < 1024 ? 10 : 14
  }, [mounted, windowWidth])

  const blackKeyCount = useMemo(() => {
    if (!mounted) return 10
    return windowWidth < 640 ? 5 : windowWidth < 1024 ? 7 : 10
  }, [mounted, windowWidth])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setWindowWidth(window.innerWidth)
    
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="h-8 w-48 bg-white/5 rounded-full mx-auto lg:mx-0 mb-8 animate-pulse" />
              <div className="h-20 w-full bg-white/5 rounded-lg mb-6 animate-pulse" />
              <div className="h-12 w-3/4 bg-white/5 rounded-lg mb-8 animate-pulse" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="h-12 w-40 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-12 w-40 bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>
            <div className="order-1 lg:order-2 w-full">
              <div className="relative max-w-md lg:max-w-none mx-auto">
                <div className="flex justify-center">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-12 h-48 bg-white/5 rounded-t-lg mx-px animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 piano-key-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-black pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-radial-gradient from-yellow-400/10 via-transparent to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingNotes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute text-white/5 will-change-transform"
            style={{
              left: `${note.left}%`,
              top: `${note.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: note.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: note.delay,
            }}
          >
            <Music size={note.size} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8"
            >
              <Award className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <span className="text-xs md:text-sm text-white/80">Est. 2002 • 20+ Years of Excellence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6"
            >
              <span className="text-white">Bliss in the</span>
              <br />
              <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Art of Music
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/60 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Join 500+ students worldwide in mastering piano, Keyboard, Carnatic, Guitar, flute and Drum-kit. 
              Experience world-class music education with personalized attention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                prefetch={true}
                
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-yellow-400 text-black font-semibold rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/performances"
                prefetch={true}
                className="group px-6 md:px-8 py-3 md:py-4 border border-white/20 backdrop-blur-sm text-white font-semibold rounded-xl md:rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                Watch Performances
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: '500+', label: 'Students', icon: Users },
                { value: '20+', label: 'Years', icon: Award },
                { value: '50+', label: 'Performances', icon: Music },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 mx-auto mb-1 md:mb-2" />
                  <div className="text-lg md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Piano Keyboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 w-full mt-8 lg:mt-0"
          >
            <div className="relative max-w-md lg:max-w-none mx-auto">
              {/* White Keys */}
              <div className="flex justify-center px-2 sm:px-4">
                {[...Array(whiteKeyCount)].map((_, i) => {
                  const { note, octave, id } = getWhiteKeyNote(i)
                  const isPressed = pressedKey === id
                  
                  return (
                    <motion.div
                      key={id}
                      onClick={() => playNote(note, octave, id)}
                      animate={{
                        y: isPressed ? 4 : [0, -5, 0],
                      }}
                      transition={{
                        y: isPressed 
                          ? { duration: 0.05 }
                          : { duration: 3, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                      className={`
                        ${keySize.white} 
                        rounded-t-lg 
                        mx-px 
                        relative 
                        group 
                        cursor-pointer
                        transition-shadow
                        duration-75
                        ${isPressed 
                          ? 'bg-linear-to-b from-yellow-200 to-gray-300 shadow-inner' 
                          : 'bg-linear-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200'
                        }
                      `}
                    >
                      <div className={`
                        absolute inset-0 rounded-t-lg transition-opacity duration-75
                        ${isPressed 
                          ? 'bg-yellow-400/30' 
                          : 'bg-linear-to-t from-yellow-400/0 via-yellow-400/0 to-yellow-400/10 opacity-0 group-hover:opacity-100'
                        }
                      `} />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {note}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Black Keys */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center px-1 sm:px-2 md:px-4">
                {[...Array(blackKeyCount)].map((_, i) => {
                  let marginLeft = keySize.blackMargin
                  if (windowWidth < 640 && i % 2 === 1) marginLeft = 16
                  else if (windowWidth < 640 && i % 2 === 0) marginLeft = 24
                  else if (windowWidth < 1024 && i % 2 === 1) marginLeft = 20
                  else if (windowWidth < 1024 && i % 2 === 0) marginLeft = 32
                  else if (i % 2 === 1) marginLeft = 24
                  else marginLeft = 40
                  
                  if (windowWidth < 640 && i > 4) return null
                  
                  const { note, octave, id } = getBlackKeyNote(i)
                  const isPressed = pressedKey === id
                  
                  return (
                    <motion.div
                      key={id}
                      onClick={() => playNote(note, octave, id)}
                      animate={{
                        y: isPressed ? 3 : [0, -3, 0],
                      }}
                      transition={{
                        y: isPressed 
                          ? { duration: 0.05 }
                          : { duration: 2, delay: i * 0.15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                      className={`
                        ${keySize.black} 
                        rounded-t-lg 
                        mx-1 
                        sm:mx-2 
                        md:mx-3 
                        relative 
                        group 
                        cursor-pointer
                        transition-shadow
                        duration-75
                        ${isPressed 
                          ? 'bg-linear-to-b from-gray-700 to-black shadow-inner' 
                          : 'bg-linear-to-b from-gray-900 to-black hover:from-gray-800 hover:to-gray-900'
                        }
                      `}
                      style={{ marginLeft }}
                    >
                      <div className={`
                        absolute inset-0 rounded-t-lg transition-opacity duration-75
                        ${isPressed 
                          ? 'bg-yellow-400/40' 
                          : 'bg-linear-to-t from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100'
                        }
                      `} />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-yellow-400/60 opacity-0 group-hover:opacity-100 transition-opacity font-mono whitespace-nowrap">
                        {note}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-1.5 md:w-1 md:h-2 bg-yellow-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}