'use client'

import { useEffect, useState } from 'react'
import { Star, Quote, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Review {
  id: number
  name: string
  content: string
  rating: number
  role: string
  country: string
  photo?: string
  date: string
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        if (Array.isArray(data)) {
          // Sort by date (latest first) and take first 4
          const sorted = [...data].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          setReviews(sorted.slice(0, 4))
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-64 bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.03),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Student{' '}
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hear what our students say about their musical journey
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote size={28} className="text-yellow-400/20 mb-3" />

                {/* Review Content */}
                <p className="text-white/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                  {review.content}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  {review.photo ? (
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-sm">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm truncate">{review.name}</h4>
                    <p className="text-white/40 text-xs">{review.role} • {review.country}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 hover:text-yellow-400 hover:border-yellow-400/50 rounded-lg transition-all group text-sm"
          >
            View All Reviews
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}