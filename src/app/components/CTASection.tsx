'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Music, Award } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with piano keys */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 piano-key-pattern opacity-20" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center"
          >
            <Music className="w-10 h-10 text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your{' '}
            <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Musical Journey?
            </span>
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Join 500+ students worldwide and experience world-class music education 
            with personalized attention and flexible scheduling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Begin Your Journey
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              Talk to an Advisor
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="text-sm">20+ Years Excellence</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="text-sm">500+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">⭐ 4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}