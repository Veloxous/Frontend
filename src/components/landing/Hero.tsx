'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const PROOF_POINTS = [
  { label: 'USDC Escrow', icon: ShieldIcon },
  { label: 'Stellar Network', icon: BoltIcon },
  { label: 'Verified Technicians', icon: CheckIcon },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="vl-hero" data-testid="landing-hero" aria-labelledby="hero-heading">
      <div className="vl-hero__grid-bg" aria-hidden="true" />
      <motion.div
        className="vl-hero__glow vl-hero__glow--primary"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="vl-hero__glow vl-hero__glow--secondary" aria-hidden="true" />

      <motion.div
        className="vl-container vl-hero__inner"
        variants={reduceMotion ? undefined : container}
        initial="hidden"
        animate="show"
      >
        <motion.div>
          <span className="vl-eyebrow">Web3 Circular Economy</span>
        </motion.div>

        <motion.h1 className="vl-hero__title" id="hero-heading" variants={item}>
          Don&apos;t throw it away. <span>Swap it. Repair it. Sell it.</span>
        </motion.h1>

        <motion.p className="vl-hero__lede" variants={item}>
          Veloxous is the trustless marketplace for electronics — backed by Soroban escrow on
          Stellar. You get exactly what you paid for, or your USDC back.
        </motion.p>

        <motion.div className="vl-cta-row" variants={item}>
          <Link href="/connect" className="vl-btn vl-btn--primary" data-testid="cta-connect">
            Connect Wallet
          </Link>
          <Link href="/marketplace" className="vl-btn vl-btn--secondary" data-testid="cta-explore">
            Explore Marketplace
          </Link>
        </motion.div>

        <motion.ul
          className="vl-hero__proof"
          variants={item}
          style={{ listStyle: 'none', padding: 0 }}
        >
          {PROOF_POINTS.map(({ label, icon: Icon }) => (
            <li key={label} className="vl-proof-chip">
              <Icon />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5 13.5 3.5v4c0 3.2-2.3 5.9-5.5 7-3.2-1.1-5.5-3.8-5.5-7v-4L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m5.8 7.9 1.6 1.6 2.8-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9 1.5 3 9h4l-1 5.5L12 7H8l1-5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m5.4 8.2 1.7 1.7 3.5-3.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
