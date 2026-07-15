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

          {/* Alternating Timeline Styles */}
          <style dangerouslySetInnerHTML={{__html: `
            .hb-timeline { position: relative; max-width: 1000px; margin: 0 auto; padding: 40px 0; display: flex; flex-direction: column; }
            .hb-timeline::before { content: ''; position: absolute; left: 50%; top: 40px; bottom: 40px; width: 2px; background: var(--ink-12); transform: translateX(-50%); z-index: 0; }
            
            .hb-step { position: relative; width: 50%; z-index: 1; margin-bottom: 40px; cursor: default; }
            .hb-step.left { align-self: flex-start; padding-right: 48px; text-align: right; }
            .hb-step.right { align-self: flex-end; padding-left: 48px; text-align: left; }
            
            .hb-dot {
              position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; 
              background: linear-gradient(135deg, var(--solar) 0%, #FFD700 100%); 
              border: 4px solid var(--background); box-shadow: 0 0 12px rgba(255, 215, 0, 0.4); 
              display: flex; align-items: center; justify-content: center;
              color: var(--ink); font-family: var(--font-display); font-weight: 800; font-size: 1.25rem;
              z-index: 2; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .hb-step.left .hb-dot { right: -24px; }
            .hb-step.right .hb-dot { left: -24px; }
            
            .hb-card {
              background: var(--surface); border: 1px solid var(--ink-12); border-radius: 24px; padding: 32px; 
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 24px rgba(0,0,0,0.02);
            }
            .hb-step.left .hb-card { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
            .hb-step.right .hb-card { text-align: left; display: flex; flex-direction: column; align-items: flex-start; }
            
            .hb-step.left:hover .hb-card { transform: translateX(-8px); border-color: var(--solar); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
            .hb-step.right:hover .hb-card { transform: translateX(8px); border-color: var(--solar); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
            .hb-step:hover .hb-dot { transform: translateY(-50%) scale(1.15); }

            @media (max-width: 768px) {
              .hb-timeline::before { left: 32px; transform: none; }
              .hb-step { width: 100%; margin-bottom: 32px; align-self: center !important; padding-left: 88px !important; padding-right: 0 !important; text-align: left !important; }
              .hb-step.left .hb-dot, .hb-step.right .hb-dot { left: 8px; right: auto; top: 48px; transform: translateY(-50%); }
              .hb-step:hover .hb-dot { transform: translateY(-50%) scale(1.15); }
              .hb-step.left .hb-card { text-align: left; align-items: flex-start; }
              .hb-step.left:hover .hb-card, .hb-step.right:hover .hb-card { transform: translateX(8px); }
            }
          `}} />

          <div className="hb-timeline">
            {/* Step 1 */}
            <div className="hb-step left">
              <div className="hb-dot">1</div>
              <div className="hb-card">
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--solar)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Step 1</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px', color: 'var(--ink)' }}>Find an Item</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0, maxWidth: '300px' }}>Browse the marketplace or swap engine for electronics.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="hb-step right">
              <div className="hb-dot">2</div>
              <div className="hb-card">
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--solar)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Step 2</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px', color: 'var(--ink)' }}>Lock Funds</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0, maxWidth: '300px' }}>Deposit USDC into the trustless Soroban Escrow contract.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="hb-step left">
              <div className="hb-dot">3</div>
              <div className="hb-card">
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--solar)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Step 3</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px', color: 'var(--ink)' }}>Verify Receipt</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0, maxWidth: '300px' }}>Inspect the physical item when it arrives at your doorstep.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="hb-step right" style={{ marginBottom: 0 }}>
              <div className="hb-dot">4</div>
              <div className="hb-card">
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--solar)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Step 4</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px', color: 'var(--ink)' }}>Release Funds</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-60)', margin: 0, maxWidth: '300px' }}>Approve the transaction to securely release funds to the seller.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}