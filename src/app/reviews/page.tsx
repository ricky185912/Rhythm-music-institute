'use client'

import { useEffect, useState } from 'react'
import { Star, Quote, Calendar, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 9

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          setReviews(sorted)
          setFilteredReviews(sorted)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  // Filter by rating
  useEffect(() => {
    if (filterRating === null) {
      setFilteredReviews(reviews)
    } else {
      setFilteredReviews(reviews.filter(r => r.rating === filterRating))
    }
    setCurrentPage(1)
  }, [filterRating, reviews])

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)

  // Stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }))

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

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Student{' '}
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Reviews
              </span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Real stories from our global community of musicians
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{averageRating}</div>
            <div className="flex justify-center gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.round(parseFloat(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
              ))}
            </div>
            <p className="text-white/40 text-xs">Rating</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{reviews.length}</div>
            <p className="text-white/40 text-xs">Reviews</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) : 0}%
            </div>
            <p className="text-white/40 text-xs">Recommend</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 sticky top-24">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                <Filter size={14} />
                Filter by Rating
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${!filterRating ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5'}`}
                >
                  All Reviews ({reviews.length})
                </button>
                {ratingCounts.map(({ rating, count }) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all flex items-center justify-between ${filterRating === rating ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/60 hover:bg-white/5'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      {rating} <Star size={12} className="fill-current" />
                    </span>
                    <span className="text-xs">({count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="flex-1">
            {currentReviews.length === 0 ? (
              <div className="text-center py-16 bg-white/5 rounded-xl">
                <Quote size={48} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/60">No reviews match your filter</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {review.photo ? (
                            <img src={review.photo} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                              <span className="text-yellow-400 font-bold text-sm">{review.name.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                          <div>
                            <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                            <p className="text-white/40 text-xs">{review.role} • {review.country}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-3">{review.content}</p>
                      <div className="flex items-center gap-3 text-white/40 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-sm transition-all ${currentPage === i + 1 ? 'bg-yellow-400 text-black' : 'border border-white/10 text-white/60 hover:text-yellow-400'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}