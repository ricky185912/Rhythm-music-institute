//eslint-disable-next-line @typescript-eslint/consistent-type-imports 
'use client'

import { motion } from 'framer-motion'
import { MapPin, Music, Award, Users } from 'lucide-react'
import Image from 'next/image'

// Target countries for NRI Tamilian community
const countries = [
  { name: 'United States', flag: '🇺🇸', region: 'North America' },
  { name: 'Canada', flag: '🇨🇦', region: 'North America' },
  { name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  { name: 'UAE', flag: '🇦🇪', region: 'Middle East' },
]

export default function GlobalSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.03),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/80">Global NRI Community</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connecting{' '}
              <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Tamil Diaspora
              </span>
              <br />
              Through Music
            </h2>

            <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed">
              Preserving and celebrating Tamil musical heritage across continents. 
              Join our growing community of Tamil students mastering Carnatic vocal, 
              piano, and guitar from anywhere in the world.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Music className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">8+</div>
                <div className="text-xs text-white/40">Countries</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Users className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/40">Global Students</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-xs text-white/40">Years</div>
              </div>
            </div>

            {/* Country Flags Grid - Clean and Professional */}
            <div>
              <p className="text-white/40 text-sm mb-4">Our Global Community</p>
              <div className="flex flex-wrap gap-2">
                {countries.map((country, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-all duration-300 cursor-default">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-white/80 text-sm hidden sm:inline">{country.name}</span>
                      <span className="text-yellow-400/60 text-xs hidden md:inline">{country.region}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Professional Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 p-6 md:p-8">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl" />
              
              {/* Main Content */}
              <div className="relative text-center">
                {/* Tamil Cultural Symbol */}
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-400/20">
                    <Music className="w-10 h-10 text-yellow-400" />
                  </div>
                </div>
                
                {/* Quote */}
                <blockquote className="text-white/80 text-lg md:text-xl italic mb-6">
                  "இசை என்பது இறைவனின் மொழி"
                </blockquote>
                <p className="text-white/40 text-sm mb-8">
                  Music is the language of the divine
                </p>
                
                {/* Tamil Nadu Map Silhouette or Cultural Element */}
                <div className="relative aspect-square max-w-[280px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent rounded-full blur-xl" />
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-white/10">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎵</div>
                      <h3 className="text-white font-semibold mb-2">Preserving Tradition</h3>
                      <p className="text-white/40 text-sm">
                        Carnatic • Piano • Guitar • Flute and more
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}