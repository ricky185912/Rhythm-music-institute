'use client'

import { motion } from 'framer-motion'
import { Music, Keyboard, Guitar, Drum, Piano, Star } from 'lucide-react'

const courses = [
  {
    icon: Piano,
    title: 'Piano',
    level: 'Beginner to Advanced',
    color: 'from-yellow-400 to-yellow-500',
    duration: 'Flexible Schedule',
  },
  {
    icon: Keyboard,
    title: 'Keyboard',
    level: 'All Levels',
    description: 'Western Classical, Carnatic, Cine-style',
    color: 'from-blue-400 to-blue-500',
    duration: 'Flexible Schedule',
  },
  {
    icon: Guitar,
    title: 'Guitar',
    level: 'Beginner to Advanced',
    description: 'Western Classical, Cine-style',
    color: 'from-purple-400 to-purple-500',
    duration: 'Flexible Schedule',
  },
  {
    icon: Music,
    title: 'Flute',
    level: 'All Levels',
    description: 'Carnatic, Cine-style',
    color: 'from-green-400 to-green-500',
    duration: 'Flexible Schedule',
  },
  {
    icon: Drum,
    title: 'Drum-kit',
    level: 'All Levels',
    color: 'from-red-400 to-red-500',
    duration: 'Flexible Schedule',
  },
  {
    icon: Star,
    title: 'Advanced Performance',
    level: 'Advanced',
    description: 'Appear for Trinity College London exams. Earn globally recognized certificates',
    color: 'from-pink-400 to-pink-500',
    duration: 'Monthly',
  },
]

export default function CoursesSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Comprehensive music education for every passion and skill level
          </p>
          <div className="piano-line mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        </motion.div>

        {/* Courses grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} p-3 mb-4`}>
                  <course.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-yellow-400 mb-2">{course.level}</p>
                <p className="text-white/60 text-sm mb-4">{course.description}</p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-white/40">
                  <span>{course.duration}</span>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}