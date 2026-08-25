'use client'

import { MotionConfig } from 'framer-motion'

import { Hero } from './Hero'
import { ProductOverview } from './ProductOverview'
import { HowItWorks } from './HowItWorks'
import { LandingFooter } from './LandingFooter'
import './landing.css'

/**
 * Responsive marketing landing page — Emerald Tech (#10B981) on Deep Navy
 * (#0B0F19), with Framer Motion scroll-reveal animations throughout.
 * Motion is disabled for users who prefer reduced motion.
 */
export function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main id="main-content" className="vl-landing" data-testid="landing-page">
        <Hero />
        <ProductOverview />
        <HowItWorks />
        <LandingFooter />
      </main>
    </MotionConfig>
  )
}
