import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Improves performance
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap', // Improves performance
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rhythmmusicinstitute.com'), // Replace with your actual domain
  title: {
    default: 'Rhythm Music Institute | Premier Music Education Since 2005',
    template: '%s | Rhythm Music Institute'
  },
  description: 'Best music classes near you! Learn Piano, Carnatic Vocal, Guitar from experts. 500+ students trained. Located in [Your City]. Book your free trial class today!',
  manifest: '/manifest.json',
  keywords: [
    'music classes near me',
    'Rhythm Music Institute',
    'piano lessons near me',
    'carnatic vocal classes',
    'guitar classes near me',
    'music school',
    'music institute',
    'learn music',
    'piano teacher',
    'vocal training',
    'best music classes',
    'music academy'
  ].join(', '),
  authors: [{ name: 'Rhythm Music Institute', url: 'https://rhythmmusicinstitute.com' }],
  creator: 'Rhythm Music Institute',
  publisher: 'Rhythm Music Institute',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: 'Rhythm Music Institute - Best Music Classes Near You',
    description: 'Join 500+ successful students. Professional training in Piano, Carnatic Vocal, Guitar. Award-winning instructors. Enroll now!',
    url: 'https://rhythmmusicinstitute.com',
    siteName: 'Rhythm Music Institute',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rhythm Music Institute - Music Education Excellence',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Music Institute - Best Music Classes Near You',
    description: 'Professional music education in Piano, Carnatic Vocal & Guitar. 20+ years of excellence.',
    images: ['/images/logo.jpeg'],
    creator: '@rhythmmusic',
    site: '@rhythmmusic',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console code
    // yandex: 'your-yandex-code',
    // yahoo: 'your-yahoo-code',
  },
  category: 'education',
  classification: 'Music Education Institute',
  alternates: {
    canonical: 'https://rhythmmusicinstitute.com',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/jpeg" href="/images/logo.jpeg" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <meta name="msapplication-TileImage" content="/images/logo.jpeg" />
        
        {/* Local Business Schema for "music classes near me" SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicSchool",
              "name": "Rhythm Music Institute",
              "description": "Premier music education institute offering Piano, Carnatic Vocal, and Guitar classes",
              "url": "https://rhythmmusicinstitute.com",
              "logo": "https://rhythmmusicinstitute.com/images/logo.jpeg",
              "image": "https://rhythmmusicinstitute.com/images/logo.jpeg",
              "telephone": "+91 YOUR-PHONE-NUMBER",
              "email": "info@rhythmmusicinstitute.com",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "Your PIN Code",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "YOUR_LATITUDE",
                "longitude": "YOUR_LONGITUDE"
              },
              "openingHours": "Mo-Sa 09:00-20:00",
              "sameAs": [
                "https://www.facebook.com/rhythmmusic",
                "https://www.instagram.com/rhythmmusic",
                "https://www.youtube.com/rhythmmusic"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Music Courses",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Piano Classes",
                      "description": "Professional piano training for all levels"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Carnatic Vocal",
                      "description": "Traditional Carnatic vocal training"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Guitar Classes",
                      "description": "Learn acoustic and electric guitar"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "150"
              }
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rhythm Music Institute",
              "url": "https://rhythmmusicinstitute.com",
              "logo": "https://rhythmmusicinstitute.com/images/logo.jpeg",
              "sameAs": [
                "https://www.facebook.com/rhythmmusic",
                "https://www.instagram.com/rhythmmusic",
                "https://www.youtube.com/rhythmmusic"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 YOUR-PHONE-NUMBER",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi", "Tamil"]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black`}>
        <Header/>
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        }>
          <main className="pt-20"> {/* Add padding top for fixed header */}
            {children}
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}