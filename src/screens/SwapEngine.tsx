'use client'

import { Button } from '../components'

export function SwapEngine() {
  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--ink)' }}>Swap Engine</h1>
      <p style={{ color: 'var(--ink-60)', fontSize: '1.2rem', marginBottom: '32px' }}>Trade your old gadgets for new ones with collateralized escrow.</p>
      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ color: 'var(--ink)', margin: '0 0 8px' }}>Your Item</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Select an item from your inventory</p>
          <Button variant="secondary" size="sm">Select Item</Button>
        </div>
        
        <div style={{ fontSize: '2rem', color: 'var(--ink-40)' }}>⇌</div>
        
        <div style={{ flex: '1 1 300px', background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ color: 'var(--ink)', margin: '0 0 8px' }}>Target Item</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Select an item you want to swap for</p>
          <Button variant="secondary" size="sm">Browse</Button>
        </div>
      </div>
      
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Button variant="primary" size="lg">Calculate Collateral</Button>
      </div>
    </main>
  )
}
