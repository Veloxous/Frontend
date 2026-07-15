'use client'

import { Button } from '../components'
import type { Screen } from '../types'

export interface LandingProps {
  onConnect: () => void
  onNav: (screen: Screen) => void
}

export function Landing({ onConnect, onNav }: LandingProps) {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="hb-hero-grid hb-rise"
        style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px 40px' }}
      >
        <div>
          <div className="hb-eyebrow" style={{ marginBottom: 20 }}>
            Web3 Circular Economy
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)',
              lineHeight: 0.99,
              letterSpacing: '-0.02em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Don't throw it away.
            <br />
            <span style={{ color: 'var(--ink-60)' }}>Swap it. Repair it. Sell it.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-h4)',
              lineHeight: 1.5,
              color: 'var(--ink-60)',
              maxWidth: 520,
              margin: '22px 0 32px',
            }}
          >
            Veloxous is the trustless marketplace for electronics. Backed by Soroban Escrow on Stellar, ensuring you get exactly what you paid for—or your USDC back.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={onConnect}>
              Connect Wallet
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('explore')}>
              Explore Marketplace
            </Button>
          </div>
        </div>

        <div className="hb-hero-helio" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 400, height: 400, margin: '0 auto' }}>
          {/* Pulsing Solar Core */}
          <div style={{ 
            position: 'absolute',
            width: 320, 
            height: 320, 
            borderRadius: '50%', 
            background: 'radial-gradient(circle at center, var(--solar) 0%, transparent 70%)',
            opacity: 0.85,
            animation: 'hb-breath 4s ease-in-out infinite',
          }} />
          
          {/* Rotating Text Ring */}
          <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'hb-spin 20s linear infinite', zIndex: 1 }}>
            <path id="ring" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="none" />
            <text fill="var(--ink)" style={{ fontFamily: 'var(--font-data)', fontSize: 15, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              <textPath href="#ring" startOffset="0" textLength="940">
                SWAP • BUY • REPAIR • RECYCLE • SWAP • BUY • REPAIR • RECYCLE • 
              </textPath>
            </text>
          </svg>
        </div>
      </section>

      {/* How it works strip */}
      <section
        id="how"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--ink-12)',
          borderBottom: '1px solid var(--ink-12)',
          scrollMarginTop: 68,
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
              color: 'var(--ink)',
            }}
          >
            How it works
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body)',
              color: 'var(--ink-60)',
              margin: '0 0 36px',
              maxWidth: 560,
            }}
          >
            Secure, trustless, and simple.
          </p>
          <div className="hb-how-grid">
            <div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--type-caption)', color: 'var(--solar)', marginBottom: 10 }}>
                <span style={{ color: 'var(--ink)' }}>01</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--type-h5)', margin: '0 0 6px', color: 'var(--ink)' }}>Find an Item</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-small)', lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>Browse the marketplace or swap engine for electronics.</p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--type-caption)', color: 'var(--solar)', marginBottom: 10 }}>
                <span style={{ color: 'var(--ink)' }}>02</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--type-h5)', margin: '0 0 6px', color: 'var(--ink)' }}>Lock Funds</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-small)', lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>Deposit USDC into the Veloxous Soroban Escrow contract.</p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--type-caption)', color: 'var(--solar)', marginBottom: 10 }}>
                <span style={{ color: 'var(--ink)' }}>03</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--type-h5)', margin: '0 0 6px', color: 'var(--ink)' }}>Verify Receipt</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-small)', lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>Inspect the physical item when it arrives.</p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--type-caption)', color: 'var(--solar)', marginBottom: 10 }}>
                <span style={{ color: 'var(--ink)' }}>04</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--type-h5)', margin: '0 0 6px', color: 'var(--ink)' }}>Release Funds</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-small)', lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>Approve the transaction to release funds to the seller.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}