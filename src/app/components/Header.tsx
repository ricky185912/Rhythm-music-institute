'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { memo } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Performances', href: '/performances' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient background with blur */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-transparent backdrop-blur-xl" />
      
      {/* Piano key line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400/50 to-transparent" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-16 h-16 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpeg"
                alt="Rhythm Music Institute"
                fill
                priority
                sizes="(max-width: 768px) 64px, 64px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <span className="text-3xl md:text-5xl font-extrabold text-white block leading-none tracking-tight">
                RHYTHM
              </span>
              <span className="text-sm md:text-base text-yellow-400 tracking-[0.3em] block font-semibold">
                MUSIC INSTITUTE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="px-4 py-2 text-sm text-white/80 hover:text-yellow-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/register"
              prefetch={true}
              className="ml-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute left-0 right-0 top-20 bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-white/80 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/register"
                className="block px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg text-center hover:bg-yellow-300 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}