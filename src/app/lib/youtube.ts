// app/lib/youtube.ts

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views: string
  duration: string
  description: string
}

interface YouTubeSearchItem {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      high?: { url: string }
      default?: { url: string }
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

// Convert ISO 8601 duration (PT5M30S) to readable format (5:30)
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

// Format view count (1000 -> 1K, 1000000 -> 1M)
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  
  if (!apiKey || !channelId) {
    console.error('YouTube API key or Channel ID not configured')
    return []
  }
  
  try {
    // Step 1: Fetch latest videos from channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`
    const searchResponse = await fetch(searchUrl)
    
    if (!searchResponse.ok) {
      console.error(`YouTube search API error: ${searchResponse.status}`)
      return []
    }
    
    const searchData = await searchResponse.json()
    
    if (!searchData.items || searchData.items.length === 0) {
      return []
    }
    
    // Step 2: Get video IDs for details
    const videoIds = searchData.items.map((item: YouTubeSearchItem) => item.id.videoId).join(',')
    
    // Step 3: Fetch video details (duration, view count)
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics`
    const detailsResponse = await fetch(detailsUrl)
    
    if (!detailsResponse.ok) {
      console.error(`YouTube details API error: ${detailsResponse.status}`)
      return []
    }
    
    const detailsData = await detailsResponse.json()
    
    // Step 4: Combine data
    const videos: YouTubeVideo[] = searchData.items.map((item: YouTubeSearchItem) => {
      const videoId = item.id.videoId
      const details = detailsData.items?.find((d: YouTubeVideoDetails) => d.id === videoId)
      
      return {
        id: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || '',
        publishedAt: item.snippet.publishedAt,
        views: formatViews(parseInt(details?.statistics?.viewCount || '0')),
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        description: item.snippet.description || '',
      }
    })
    
    return videos
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}