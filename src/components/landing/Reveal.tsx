'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal wrapper — fades content up once it enters the viewport.
 * Honors the user's reduced-motion preference by rendering without
 * the initial hidden state, so content is always visible immediately.
 */
export interface RevealProps {
  children: ReactNode
  /** Seconds to wait before animating (used for stagger). */
  delay?: number
  /** Vertical travel distance in px. */
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
