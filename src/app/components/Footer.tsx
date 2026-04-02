'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Star, Send, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Footer() {
  const { data: session } = useSession()
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewText.trim()) {
      setSubmitError('Please write your review')
      return
    }
    
    if (!session) {
      signIn('google', { callbackUrl: '/' })
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          photo: session.user?.image,
          content: reviewText,
          rating,
          role: 'Student',
          country: 'Global'
        })
      })
      
      if (!response.ok) throw new Error('Failed to submit')
      
      setSubmitted(true)
      setReviewText('')
      setRating(5)
      
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      setSubmitError('Failed to submit. Please try again.')
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
              <Link href="https://www.instagram.com/rhythmmusic_institute?igsh=b2lhOHB1aDBjcGtz" target="_blank" className="text-white/40 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://youtube.com/@rhythmmusicinstitutetambar3965?si=5ZjpCvCUAoIE6bAR" target="_blank" className="text-white/40 hover:text-yellow-400 transition-colors">
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

          {/* Share Your Experience - With Google Sign In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-semibold mb-6">Share Your Experience</h3>
            
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-500 text-sm font-medium">Thank you for your review!</p>
                <p className="text-white/40 text-xs mt-1">Your feedback means a lot to us</p>
              </div>
            ) : !session ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-white/80 text-sm mb-4">Sign in to share your experience</p>
                <button
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </button>
                <p className="text-white/40 text-xs mt-3">We&apos;ll never post without your permission</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user?.name || 'User'}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-sm">
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{session.user?.name}</p>
                    <p className="text-white/40 text-xs">{session.user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-white/40 hover:text-yellow-400 transition-colors"
                    title="Sign out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>

                {submitError && (
                  <p className="text-red-400 text-xs text-center">{submitError}</p>
                )}

                {/* Review Text */}
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  required
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-colors text-sm resize-none"
                />

                {/* Rating Stars */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Review
                    </>
                  )}
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

        {/* Bottom Bar */}
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