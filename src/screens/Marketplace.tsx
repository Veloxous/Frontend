'use client'

import { Button } from '../components'

export function Marketplace() {
  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--ink)' }}>Marketplace</h1>
      <p style={{ color: 'var(--ink-60)', fontSize: '1.2rem', marginBottom: '32px' }}>Browse verified electronics, locked safely in Soroban escrow.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Placeholder item */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--ink)' }}>iPhone 13 Pro</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Condition: Excellent • 256GB</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--ink)' }}>350 USDC</span>
            <Button variant="primary" size="sm">Buy Now</Button>
          </div>
        </div>
        
        <div style={{ background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--ink)' }}>MacBook Air M1</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Condition: Good • 8GB RAM</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--ink)' }}>650 USDC</span>
            <Button variant="primary" size="sm">Buy Now</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
