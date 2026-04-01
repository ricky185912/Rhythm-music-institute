// Static fallback data (used when YouTube API fails)
export const fallbackPerformances = [
  {
    id: 'fallback-1',
    title: 'Piano Recital 2024 - Student Showcase',
    thumbnail: '/images/performances/piano-recital.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishedAt: new Date().toISOString(),
    views: '2.5K',
    duration: '4:30',
    description: 'Beautiful piano performance by our advanced student.',
  },
  {
    id: 'fallback-2',
    title: 'Carnatic Vocal Night',
    thumbnail: '/images/performances/carnatic-vocal.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishedAt: new Date().toISOString(),
    views: '1.8K',
    duration: '6:15',
    description: 'Traditional Carnatic vocal performance.',
  },
  // Add more fallback videos...
]