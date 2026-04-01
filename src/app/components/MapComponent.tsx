'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

// Coordinates for Tambaram, Chennai
const LATITUDE = 12.926712
const LONGITUDE = 80.112589
const LOCATION_NAME = 'Tambaram, Chennai, Tamil Nadu'

export default function MapComponent() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simple timeout to simulate loading (maps load quickly)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="relative h-96 bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-400/20 rounded-full animate-pulse mx-auto mb-4" />
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse mx-auto mb-2" />
          <div className="h-3 w-48 bg-white/10 rounded animate-pulse mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-2xl">
      {/* Embedded OpenStreetMap (Free, no API key needed) */}
      <iframe
        title="Rhythm Music Institute Location"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${LONGITUDE - 0.05}%2C${LATITUDE - 0.05}%2C${LONGITUDE + 0.05}%2C${LATITUDE + 0.05}&layer=mapnik&marker=${LATITUDE}%2C${LONGITUDE}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
      
      {/* Overlay with address */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Rhythm Music Institute</p>
            <p className="text-white/60 text-xs">{LOCATION_NAME}</p>
          </div>
          <a
            href={`https://maps.google.com/?q=${LATITUDE},${LONGITUDE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-yellow-400 text-black text-xs font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
}