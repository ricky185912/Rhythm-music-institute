'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Calendar, MapPin, Filter } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Review {
  id: number
  name: string
  content: string
  rating: number
  role: string
  country: string
  date: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'highest' | 'lowest'>('latest')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fetch reviews from API
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      setError(false)
      
      const response = await fetch('/api/reviews')
      
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // Filter and sort reviews with useMemo for performance
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews]
    
    // Apply filter
    if (filterRating !== null) {
      filtered = filtered.filter(review => review.rating === filterRating)
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        default:
          return 0
      }
    })
    
    return filtered
  }, [reviews, filterRating, sortBy])

  // Calculate stats with useMemo
  const stats = useMemo(() => {
    const total = reviews.length
    const avgRating = total > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : '0'
    const recommended = total > 0
      ? Math.round((reviews.filter(r => r.rating >= 4).length / total) * 100)
      : 0
    
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length
    }))
    
    return { total, avgRating, recommended, distribution }
  }, [reviews])

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40">Loading reviews...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <Quote className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Reviews</h2>
              <p className="text-white/60 mb-6">Please try again later.</p>
              <button
                onClick={fetchReviews}
                className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  // Empty state
  if (reviews.length === 0) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Student{' '}
                <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  Reviews
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Be the first to share your experience
              </p>
              <div className="piano-line mt-6 mx-auto w-24 h-px bg-linear-to-r from-transparent via-yellow-400/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Quote className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">No Reviews Yet</h2>
            <p className="text-white/60 mb-8">
              Be the first to share your musical journey with us!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-all"
            >
              Share Your Experience
              <Star size={16} />
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    )
  }

  // Main content
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Student{' '}
              <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Reviews
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              What our students say about their musical journey
            </p>
            <div className="piano-line mt-6 mx-auto w-24 h-px bg-linear-to-r from-transparent via-yellow-400/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.avgRating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(parseFloat(stats.avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
              ))}
            </div>
            <p className="text-white/40 text-sm">Overall Rating</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.total}</div>
            <p className="text-white/40 text-sm">Total Reviews</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.recommended}%</div>
            <p className="text-white/40 text-sm">Recommended</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Filter size={16} />
                Filter by Rating
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${!filterRating ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5'}`}
                >
                  All Reviews ({stats.total})
                </button>
                {stats.distribution.map(({ rating, count }) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${filterRating === rating ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5'}`}
                  >
                    <span className="flex items-center gap-2">
                      {rating} <Star size={14} className="fill-current" />
                    </span>
                    <span className="text-xs">({count})</span>
                  </button>
                ))}
              </div>

              <h3 className="text-white font-semibold mt-6 mb-4">Sort by</h3>
              <div className="space-y-2">
                {[
                  { value: 'latest', label: 'Latest First' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'highest', label: 'Highest Rating' },
                  { value: 'lowest', label: 'Lowest Rating' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as 'latest' | 'oldest' | 'highest' | 'lowest')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${sortBy === option.value ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredAndSortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                        <span className="text-yellow-400 font-bold text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{review.name}</h3>
                        <p className="text-sm text-white/40">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4 leading-relaxed">{review.content}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {review.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {filteredAndSortedReviews.length === 0 && (
                <div className="text-center py-12 bg-white/5 rounded-2xl">
                  <Quote className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No reviews match your filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}