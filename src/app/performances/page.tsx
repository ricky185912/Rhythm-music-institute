'use client'

import { motion } from 'framer-motion'
import { Play, Calendar, Eye, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views: string
  duration: string
  description: string
}

export default function PerformancesPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube-videos')
        const data = await response.json()
        
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data)
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchVideos()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40">Loading performances...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

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
                Performances
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Watch our talented students showcase their musical journey through captivating performances
            </p>
            <div className="piano-line mt-6 mx-auto w-24" />
          </motion.div>
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
            href="https://youtube.com/@rhythmmusicinstitutetambar3965?si=5ZjpCvCUAoIE6bAR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 text-center hover:bg-yellow-400/20 transition-all">
              <p className="text-white/80 text-sm flex items-center justify-center gap-2">
                🎵 Subscribe to our YouTube Channel for all performances
                <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </a>
        </div>
      </section>

      {!error && videos.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/performances/${video.id}`}>
                    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all hover:scale-[1.02] duration-300">
                      <div className="relative aspect-video">
                        {video.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/images/placeholder-video.jpg'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl">
                            🎵
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-black ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {video.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {video.description || 'Watch this amazing performance by our talented student'}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-white/40">
                            <Calendar size={14} />
                            {new Date(video.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1 text-white/40">
                            <Eye size={14} />
                            {video.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!error && videos.length === 0 && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-2xl font-bold text-white mb-4">No Performances Yet</h2>
              <p className="text-white/60">Check back soon for student performances!</p>
            </div>
          </div>
        </section>
      )}

      {error && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Performances</h2>
              <p className="text-white/60 mb-6">Please check back later or visit our YouTube channel.</p>
              <a
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition-all"
              >
                Visit YouTube Channel
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-transparent border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Inspired by what you see?
            </h2>
            <p className="text-white/60 mb-8">
              Join our community of musicians and start your musical journey today
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-all hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
            >
              Start Your Journey
              <Play size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}