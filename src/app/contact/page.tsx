'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Tambaram, Chennai, Tamil Nadu, India'],
      subtext: null,
      coordinates: '12.926712,80.112589'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 87547 27711'],
      subtext: 'Mon-Sat, 9AM - 8PM'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Wednesday - Thursday & Saturday - Sunday: 11:00 AM - 1:00 PM & 5:00 PM - 8:00 PM'],
      subtext: null
    }
  ]

  // Google Maps embed URL without API key (using free embed)
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.11258933693367!3d12.926712471556273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f1f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sTambaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6">
              Get In{' '}
              <span className="bg-linear-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              Have questions? We'd love to hear from you. Reach out and let's make music together
            </p>
            <div className="piano-line mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-sm md:text-base">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-white/60 text-xs md:text-sm">{detail}</p>
                      ))}
                      {item.subtext && (
                        <p className="text-white/40 text-xs mt-1">{item.subtext}</p>
                      )}
                      {item.coordinates && (
                        <a 
                          href={`https://maps.google.com/?q=${item.coordinates}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 text-xs hover:underline mt-1 inline-block"
                        >
                          Open in Maps →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4 text-sm md:text-base">Follow Us</h3>
                <div className="flex gap-3 md:gap-4">
                  {[
                    { icon: Facebook, href: 'https://facebook.com/rhythmmusic', label: 'Facebook' },
                    { icon: Instagram, href: 'https://instagram.com/rhythmmusic', label: 'Instagram' },
                    { icon: Youtube, href: 'https://youtube.com/@rhythmmusic', label: 'YouTube' },
                    { icon: MessageCircle, href: 'https://wa.me/918754727711', label: 'WhatsApp' }
                  ].map((social, idx) => (
                    <Link
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-yellow-400 hover:bg-white/10 transition-all"
                    >
                      <social.icon size={16} className="md:w-[18px] md:h-[18px]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section - Embedded Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="relative w-full h-96">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.91258933693367%2C12.726712471556273%2C80.31258933693367%2C13.126712471556273&layer=mapnik&marker=12.926712471556273%2C80.11258933693367"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rhythm Music Institute Location"
                className="w-full h-full"
              />
              
              {/* Overlay with address */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Rhythm Music Institute</p>
                    <p className="text-white/60 text-xs">Tambaram, Chennai, Tamil Nadu 600045</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=12.926712,80.112589"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-yellow-400 text-black text-xs font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}