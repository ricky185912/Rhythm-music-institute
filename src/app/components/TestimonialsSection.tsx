'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'

interface Review {
  id: number
  name: string
  content: string
  rating: number
  role: string
  country: string
  date?: string
  created_at?: string
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/reviews')
      const data = await response.json()
      
      if (Array.isArray(data) && data.length > 0) {
        // Normalize data - handle both date and created_at
        const normalized = data.map((review: Review) => ({
          ...review,
          date: review.date || review.created_at || new Date().toISOString()
        }))
        setReviews(normalized.slice(0, 3))
      } else {
        setReviews([])
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      setReviews([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // Loading skeleton
  if (loading) {
    return (
      <section className="relative py-32 overflow-hidden bg-linear-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-12 w-64 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-8 animate-pulse">
                <div className="h-5 w-24 bg-white/10 rounded mb-4" />
                <div className="h-20 bg-white/10 rounded mb-4" />
                <div className="h-12 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // No reviews - don't show section
  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="relative py-32 overflow-hidden bg-linear-to-b from-gray-900 to-black">
      <div className="absolute inset-0 piano-key-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Student{' '}
            <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Hear from our global community of musicians
          </p>
          <div className="piano-line mt-6 mx-auto w-24 h-px bg-linear-to-r from-transparent via-yellow-400/50 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.2, 0.4), duration: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-yellow-400/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-white/80 mb-6 leading-relaxed line-clamp-4">{review.content}</p>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{review.name}</h4>
                    <p className="text-sm text-white/40">{review.role} • {review.country}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-yellow-400/50 transition-all group"
          >
            Read All Reviews
            <Star size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}