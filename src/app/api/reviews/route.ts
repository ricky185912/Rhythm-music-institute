import { NextResponse } from 'next/server'

interface Review {
  id: number
  name: string
  content: string
  rating: number
  role: string
  country: string
  date: string
}

interface GistFile {
  content?: string
}

interface GistData {
  files?: {
    'reviews.json'?: GistFile
  }
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GIST_ID = process.env.GIST_ID

// Helper to fetch reviews from gist
async function fetchReviewsFromGist(): Promise<Review[]> {
  if (!GITHUB_TOKEN || !GIST_ID) {
    console.error('GitHub token or Gist ID not configured')
    return []
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Rhythm-Music-Institute'
      },
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`)
      return []
    }

    const data: GistData = await response.json()
    const content = data.files?.['reviews.json']?.content || '[]'
    return JSON.parse(content) as Review[]
  } catch (error) {
    console.error('Error fetching from GitHub:', error)
    return []
  }
}

// Helper to update reviews on gist
async function updateReviewsOnGist(reviews: Review[]): Promise<boolean> {
  if (!GITHUB_TOKEN || !GIST_ID) return false

  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Rhythm-Music-Institute'
      },
      body: JSON.stringify({
        files: {
          'reviews.json': {
            content: JSON.stringify(reviews, null, 2)
          }
        }
      })
    })

    return response.ok
  } catch (error) {
    console.error('Error updating GitHub:', error)
    return false
  }
}

// GET - Fetch all reviews
export async function GET(): Promise<NextResponse> {
  try {
    const reviews = await fetchReviewsFromGist()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error in GET:', error)
    return NextResponse.json([])
  }
}

// POST - Add a new review
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { name, content, rating, role, country } = body

    // Validation
    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ratingNum = Number(rating)
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Get current reviews
    const currentReviews = await fetchReviewsFromGist()

    // Create new review
    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      rating: ratingNum,
      role: role?.trim() || 'Student',
      country: country?.trim() || 'Global',
      date: new Date().toISOString()
    }

    // Add to beginning and keep last 100
    const updatedReviews = [newReview, ...currentReviews].slice(0, 100)

    // Update GitHub
    const success = await updateReviewsOnGist(updatedReviews)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save to GitHub' },
        { status: 500 }
      )
    }

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('Error in POST:', error)
    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    )
  }
}