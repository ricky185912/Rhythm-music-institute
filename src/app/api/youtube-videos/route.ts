import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Types
interface YouTubeSearchItem {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      high?: { url: string }
      medium?: { url: string }
    }
    publishedAt: string
    description: string
  }
}

interface YouTubeVideoDetails {
  id: string
  contentDetails?: {
    duration: string
  }
  statistics?: {
    viewCount: string
  }
}

interface CachedVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views: string
  duration: string
  youtubeUrl: string
  description: string
}

interface CacheData {
  timestamp: number
  videos: CachedVideo[]
}

// Cache file path
const CACHE_FILE = path.join(process.cwd(), '.cache', 'youtube-videos.json')
const CACHE_DURATION = 3600 * 1000 // 1 hour in milliseconds

// Ensure cache directory exists
async function ensureCacheDir(): Promise<void> {
  const cacheDir = path.join(process.cwd(), '.cache')
  try {
    await fs.access(cacheDir)
  } catch {
    await fs.mkdir(cacheDir, { recursive: true })
  }
}

// Read from cache
async function readCache(): Promise<CachedVideo[] | null> {
  try {
    await ensureCacheDir()
    const data = await fs.readFile(CACHE_FILE, 'utf-8')
    const cache: CacheData = JSON.parse(data)
    
    if (Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.videos
    }
    return null
  } catch {
    return null
  }
}

// Write to cache
async function writeCache(videos: CachedVideo[]): Promise<void> {
  try {
    await ensureCacheDir()
    await fs.writeFile(CACHE_FILE, JSON.stringify({
      timestamp: Date.now(),
      videos
    }))
  } catch (error) {
    console.error('Failed to write cache:', error)
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

export async function GET(): Promise<NextResponse> {
  // Try to read from cache first
  const cachedVideos = await readCache()
  if (cachedVideos) {
    return NextResponse.json(cachedVideos)
  }
  
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  
  // If no YouTube credentials, return empty
  if (!apiKey || !channelId) {
    return NextResponse.json([])
  }
  
  try {
    // Fetch from YouTube
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`
    const searchResponse = await fetch(searchUrl, {
      next: { revalidate: 3600 }
    })
    
    if (!searchResponse.ok) {
      return NextResponse.json([])
    }
    
    const searchData = await searchResponse.json()
    
    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json([])
    }
    
    const videoIds = searchData.items.map((item: YouTubeSearchItem) => item.id.videoId).join(',')
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics`
    const detailsResponse = await fetch(detailsUrl)
    
    if (!detailsResponse.ok) {
      return NextResponse.json([])
    }
    
    const detailsData = await detailsResponse.json()
    
    const videos: CachedVideo[] = searchData.items.map((item: YouTubeSearchItem) => {
      const videoId = item.id.videoId
      const details = detailsData.items?.find((d: YouTubeVideoDetails) => d.id === videoId)
      
      return {
        id: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || '',
        publishedAt: item.snippet.publishedAt,
        views: formatViews(parseInt(details?.statistics?.viewCount || '0')),
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        youtubeUrl: `https://www.youtube.com/embed/${videoId}`,
        description: item.snippet.description || '',
      }
    })
    
    // Save to cache
    await writeCache(videos)
    
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return NextResponse.json([])
  }
}