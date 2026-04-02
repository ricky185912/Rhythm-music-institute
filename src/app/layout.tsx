import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rhythmmusicinstitute.com'),
  title: {
    default: 'Rhythm Music Institute - Best Music Classes in Chennai | Piano, Guitar, Carnatic Vocal',
    template: '%s | Rhythm Music Institute'
  },
  description: '⭐ 4.9 Rated | 500+ Students | 20+ Years Excellence. Best music classes near you in Tambaram, Chennai. Learn Piano, Carnatic Vocal, Guitar from experts. Free trial class available!',
  manifest: '/manifest.json',
  keywords: [
    'Rhythm Music Institute',
    'music classes near me',
    'piano classes near me',
    'guitar classes near me',
    'carnatic vocal classes near me',
    'best music school in Chennai',
    'music academy Tambaram',
    'piano lessons Chennai',
    'guitar lessons Tambaram',
    'carnatic music classes',
    'music institute Chennai',
    'learn music online',
    'music classes for beginners',
    'western classical piano',
    'music teacher near me'
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
    title: 'Rhythm Music Institute - ⭐ 4.9 Rated | Best Music Classes in Chennai',
    description: 'Join 500+ successful students. Professional training in Piano, Carnatic Vocal, Guitar. 20+ years of excellence. Free trial class!',
    url: 'https://rhythmmusicinstitute.com',
    siteName: 'Rhythm Music Institute',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rhythm Music Institute - Premier Music Education in Chennai',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhythm Music Institute - Best Music Classes in Chennai',
    description: 'Professional music education in Piano, Carnatic Vocal & Guitar. 20+ years of excellence. Free trial class!',
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
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://rhythmmusicinstitute.com',
  },
  category: 'education',
  classification: 'Music Education Institute',
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
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="12.926712;80.112589" />
        <meta name="ICBM" content="12.926712, 80.112589" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicSchool",
              "name": "Rhythm Music Institute",
              "description": "Premier music education institute offering Piano, Carnatic Vocal, and Guitar classes in Tambaram, Chennai",
              "url": "https://rhythmmusicinstitute.com",
              "logo": "https://rhythmmusicinstitute.com/images/logo.jpeg",
              "image": "https://rhythmmusicinstitute.com/images/logo.jpeg",
              "telephone": "+918754727711",
              "email": "rgallenmusic@gmail.com",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tambaram West",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "600045",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "12.926712",
                "longitude": "80.112589"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "20:00"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/rhythmmusic_institute",
                "https://youtube.com/@rhythmmusicinstitutetambar3965"
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
                      "description": "Professional piano training - Western Classical, Carnatic, Cine-style",
                      "occupationalCredentialAwarded": "Certificate"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Carnatic Vocal",
                      "description": "Traditional Carnatic vocal training for all levels",
                      "occupationalCredentialAwarded": "Certificate"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Guitar Classes",
                      "description": "Acoustic, Classical, and Cine-style guitar training",
                      "occupationalCredentialAwarded": "Certificate"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Student"
                  }
                }
              ]
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
                "https://www.instagram.com/rhythmmusic_institute",
                "https://youtube.com/@rhythmmusicinstitutetambar3965"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+918754727711",
                "contactType": "customer service",
                "contactOption": "TollFree",
                "areaServed": "IN",
                "availableLanguage": ["English", "Tamil", "Hindi"]
              },
              "foundingDate": "2005",
              "foundingLocation": "Chennai, India",
              "numberOfEmployees": 15,
              "knowsAbout": ["Piano", "Carnatic Vocal", "Guitar", "Music Theory", "Western Classical"]
            })
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rhythm Music Institute",
              "url": "https://rhythmmusicinstitute.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://rhythmmusicinstitute.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black`}>
        <Header />
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        }>
          <main className="pt-20">
            {children}
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}