import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import PerformancesSection from './components/PerformancesSection'
import CoursesSection from './components/CoursesSection'
import GlobalSection from './components/GlobalSection'
import CTASection from './components/CTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection /> {/* HeroSection */ }
      <FeaturesSection /> {/* FeaturesSection */ }
      <PerformancesSection /> {/* PerformancesSection */}
      <CoursesSection /> {/* CoursesSection */}
      <GlobalSection /> {/* GlobalSection */}
      <CTASection /> {/* CTASection */ }
    </main>
  )
}