'use client'

import { Button } from '../components'

export function FixItDirectory() {
  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--ink)' }}>Fix-It Directory</h1>
      <p style={{ color: 'var(--ink-60)', fontSize: '1.2rem', marginBottom: '32px' }}>Find vetted technicians to repair your electronics.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--ink)' }}>Alex Tech Repair</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Specializes in Apple Devices • 4.9 ★</p>
          <Button variant="primary" size="sm">Request Quote</Button>
        </div>
        
        <div style={{ background: 'var(--surface)', border: '1px solid var(--ink-12)', padding: '24px', borderRadius: 'var(--radius-card)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--ink)' }}>Screen Savers LLC</h3>
          <p style={{ color: 'var(--ink-60)', margin: '0 0 16px' }}>Android & Tablet Repairs • 4.7 ★</p>
          <Button variant="primary" size="sm">Request Quote</Button>
        </div>
      </div>
    </main>
  )
}
