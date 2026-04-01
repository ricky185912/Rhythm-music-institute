'use client'

import { motion } from 'framer-motion'
import { Music, Globe, Award, Clock, Users, Video } from 'lucide-react'

const features = [
  {
    icon: Music,
    title: 'Multiple Instruments',
    description: 'Piano, Keyboard, Carnatic, Drum-kit, Flute and guitar with expert instructor',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    icon: Globe,
    title: 'Global Student Portal',
    description: 'Learn from anywhere through interactive online classes and resources',
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: Award,
    title: 'Certified Excellence',
    description: '20+ years of musical excellence and student success stories',
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Pause, resume, or adjust your learning pace as needed',
    color: 'from-green-400 to-green-500',
  },
  {
    icon: Users,
    title: 'Personal Attention',
    description: 'Small class sizes for focused learning and growth',
    color: 'from-red-400 to-red-500',
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black to-gray-900" />
      
      {/* Piano key pattern */}
      <div className="absolute inset-0 piano-key-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Rhythm
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Experience music education reimagined with cutting-edge technology and traditional excellence
          </p>
          <div className="piano-line mt-6" />
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                {/* Icon with gradient */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
              </div>

              {/* Decorative line */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}