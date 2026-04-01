// Centralized image handling
export const getImageSrc = (path: string) => {
  // Check if image exists, return placeholder if not
  return path || '/images/placeholder.svg'
}

export const logoFallback = '/images/logo-placeholder.svg'
export const performanceFallback = '/images/performance-placeholder.svg'