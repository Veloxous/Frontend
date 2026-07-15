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
          background: 'var(--background)',
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.02em',
                margin: '0 0 16px',
                color: 'var(--ink)',
              }}
            >
              How it works
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--ink-60)',
                margin: '0 auto',
                maxWidth: 600,
                lineHeight: 1.6
              }}
            >
              Secure, trustless, and simple. Your funds are protected by our Soroban smart contract until you're completely satisfied.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Step 1 */}
            <div 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--ink-12)', 
                borderRadius: '24px', 
                padding: '40px', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
              }} 
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--solar)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }} 
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--ink-12)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)' }}
            >
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '56px', height: '56px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, var(--solar) 0%, #FFD700 100%)', 
                color: 'var(--ink)', fontSize: '24px', fontWeight: '800', 
                marginBottom: '32px', fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}>
                1
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 12px', color: 'var(--ink)' }}>Find an Item</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0 }}>Browse the marketplace or swap engine for electronics.</p>
            </div>

            {/* Step 2 */}
            <div 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--ink-12)', 
                borderRadius: '24px', 
                padding: '40px', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
              }} 
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--solar)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }} 
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--ink-12)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)' }}
            >
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '56px', height: '56px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, var(--solar) 0%, #FFD700 100%)', 
                color: 'var(--ink)', fontSize: '24px', fontWeight: '800', 
                marginBottom: '32px', fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}>
                2
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 12px', color: 'var(--ink)' }}>Lock Funds</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0 }}>Deposit USDC into the trustless Soroban Escrow contract.</p>
            </div>

            {/* Step 3 */}
            <div 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--ink-12)', 
                borderRadius: '24px', 
                padding: '40px', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
              }} 
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--solar)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }} 
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--ink-12)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)' }}
            >
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '56px', height: '56px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, var(--solar) 0%, #FFD700 100%)', 
                color: 'var(--ink)', fontSize: '24px', fontWeight: '800', 
                marginBottom: '32px', fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}>
                3
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 12px', color: 'var(--ink)' }}>Verify Receipt</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0 }}>Inspect the physical item when it arrives at your doorstep.</p>
            </div>

            {/* Step 4 */}
            <div 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--ink-12)', 
                borderRadius: '24px', 
                padding: '40px', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
              }} 
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--solar)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }} 
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--ink-12)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)' }}
            >
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '56px', height: '56px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, var(--solar) 0%, #FFD700 100%)', 
                color: 'var(--ink)', fontSize: '24px', fontWeight: '800', 
                marginBottom: '32px', fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}>
                4
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 12px', color: 'var(--ink)' }}>Release Funds</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0 }}>Approve the transaction to securely release funds to the seller.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}