import { NextResponse } from 'next/server'

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

    const data = await response.json()
    const content = data.files?.['reviews.json']?.content || '[]'
    return JSON.parse(content) as Review[]
  } catch (error) {
    console.error('Error fetching from GitHub:', error)
    return []
  }
}

// GET - Fetch all reviews
export async function GET() {
  try {
    const reviews = await fetchReviewsFromGist()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error in GET:', error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST - Add a new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, photo, content, rating, role, country } = body

    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const currentReviews = await fetchReviewsFromGist()

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      rating: Number(rating),
      role: role || 'Student',
      country: country || 'Global',
      photo: photo || '',
      date: new Date().toISOString()
    }

    const updatedReviews = [newReview, ...currentReviews].slice(0, 100)

    // Update GitHub
    if (GITHUB_TOKEN && GIST_ID) {
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
              content: JSON.stringify(updatedReviews, null, 2)
            }
          }
        })
      })

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Failed to save to GitHub' },
          { status: 500 }
        )
      }
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