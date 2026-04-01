'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Star, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName.trim() || !reviewText.trim()) {
      setError('Please fill in all fields')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewName,
          content: reviewText,
          rating,
          role: 'Student',
          country: 'Global'
        })
      })
      
      if (!response.ok) throw new Error('Failed to submit')
      
      setSubmitted(true)
      setReviewName('')
      setReviewText('')
      setRating(5)
      
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative bg-black border-t border-white/10"
    >
      <div className="absolute inset-0 piano-key-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.jpeg"
                  alt="Rhythm Music Institute"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">RHYTHM</span>
                <span className="text-xs text-yellow-400">MUSIC INSTITUTE</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Excellence in music education since 2002. Join our global community of musicians.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white/40 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white/40 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#https://youtube.com/@rhythmmusicinstitutetambar3965?si=5ZjpCvCUAoIE6bAR" className="text-white/40 hover:text-yellow-400 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Courses', 'Performances', 'About Us', 'Contact', 'Reviews'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/40 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-white/40 text-sm">Tambaram, Chennai, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-white/40 text-sm">+91 87547 27711</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-white/40 text-sm">rgallenmusic@gmail.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Share Your Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white font-semibold mb-6">Share Your Experience</h3>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-500 text-sm font-medium">Thank you for your review!</p>
                <p className="text-white/40 text-xs mt-1">Your feedback means a lot to us</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {error && (
                  <p className="text-red-500 text-xs text-center">{error}</p>
                )}
                <div>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-colors text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={20}
                          className={`${
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-white/20 fill-white/20'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  {!isSubmitting && <Send size={14} />}
                </button>
              </form>
            )}
            <Link
              href="/reviews"
              className="block text-center mt-4 text-yellow-400 text-xs hover:underline"
            >
              See all reviews →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 text-sm">
            © 2026 Rhythm Music Institute. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}