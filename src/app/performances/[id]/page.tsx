// app/performances/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Eye, ExternalLink } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface VideoPageProps {
  params: Promise<{ id: string }>
}

// Helper functions (same as above)
async function getVideoDetails(videoId: string) {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet,contentDetails,statistics`
  const response = await fetch(url)
  const data = await response.json()
  
  if (!data.items || data.items.length === 0) {
    return null
  }
  
  const video = data.items[0]
  
  return {
    id: videoId,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high?.url,
    publishedAt: video.snippet.publishedAt,
    views: formatViews(parseInt(video.statistics?.viewCount || '0')),
    duration: formatDuration(video.contentDetails?.duration || 'PT0S'),
  }
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  const hours = (match?.[1] || '').replace('H', '')
  const minutes = (match?.[2] || '').replace('M', '')
  const seconds = (match?.[3] || '').replace('S', '')
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  }
  return `${minutes}:${seconds.padStart(2, '0')}`
}

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  const video = await getVideoDetails(id)
  
  if (!video) {
    notFound()
  }
  
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        {/* Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        
        {/* Video Info */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {video.title}
        </h1>
        
        <div className="flex items-center gap-6 mb-6">
          <span className="flex items-center gap-2 text-white/40">
            <Calendar size={16} />
            {new Date(video.publishedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-2 text-white/40">
            <Eye size={16} />
            {video.views} views
          </span>
          <span className="text-white/40">{video.duration}</span>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">Description</h2>
          <p className="text-white/60 whitespace-pre-wrap">
            {video.description || 'No description available.'}
          </p>
        </div>
        
        {/* CTA */}
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all"
          >
            Start Your Journey
          </Link>
          <a
            href={`https://youtu.be/${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
          >
            Open on YouTube <ExternalLink size={16} />
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}