'use client'

import { motion } from 'framer-motion'
import { Play, Calendar, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views: string
  duration: string
  youtubeUrl: string
  description: string
}

// Fallback data for when API fails
const fallbackPerformances: YouTubeVideo[] = [
  {
    id: 'fallback-1',
    title: 'Piano Recital 2024 - Student Showcase',
    thumbnail: '/images/placeholder-video.jpg',
    publishedAt: new Date().toISOString(),
    views: '2.5K',
    duration: '4:30',
    youtubeUrl: '',
    description: 'Beautiful piano performance by our talented student.'
  },
  {
    id: 'fallback-2',
    title: 'Carnatic Vocal Night',
    thumbnail: '/images/placeholder-video.jpg',
    publishedAt: new Date().toISOString(),
    views: '1.8K',
    duration: '6:15',
    youtubeUrl: '',
    description: 'Traditional Carnatic vocal performance.'
  },
  {
    id: 'fallback-3',
    title: 'Guitar Ensemble',
    thumbnail: '/images/placeholder-video.jpg',
    publishedAt: new Date().toISOString(),
    views: '3.2K',
    duration: '5:45',
    youtubeUrl: '',
    description: 'Energetic guitar ensemble performance.'
  },
  {
    id: 'fallback-4',
    title: 'Student Showcase',
    thumbnail: '/images/placeholder-video.jpg',
    publishedAt: new Date().toISOString(),
    views: '4.1K',
    duration: '8:20',
    youtubeUrl: '',
    description: 'Annual student showcase featuring all instruments.'
  }
]

export default function PerformancesSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch('/api/youtube-videos')
      const data = await response.json()
      
      if (Array.isArray(data) && data.length > 0) {
        setVideos(data.slice(0, 4))
      } else {
        setVideos(fallbackPerformances.slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching videos, using fallback:', error)
      setVideos(fallbackPerformances.slice(0, 4))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  if (loading) {
    return (
      <section className="relative py-32 overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white/5">
                <div className="aspect-video bg-white/10 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Recent{' '}
            <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Performances
            </span>
          </h2>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Watch our students showcase their talent in these captivating performances
          </p>
          <div className="piano-line mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <Link href={`/performances/${video.id}`} prefetch={true}>
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                    {video.thumbnail && video.thumbnail !== '/images/placeholder-video.jpg' ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-800 to-gray-900">
                        🎵
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-black ml-0.5 md:ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md font-mono">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base text-white font-semibold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs md:text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {video.views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link
            href="/performances"
            prefetch={true}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-yellow-400/50 transition-all group"
          >
            View All Performances
            <Play size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}