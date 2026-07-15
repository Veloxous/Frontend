'use client'

import { Button, type ButtonVariant } from '../components'

export interface ConnectProps {
  onWallet: () => void
  onNew: () => void
  onCancel: () => void
}

export function Connect({ onWallet, onNew, onCancel }: ConnectProps) {
  return (
    <main id="main-content" style={{ maxWidth: 920, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem,3.6vw,2.8rem)',
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
            color: 'var(--ink)',
          }}
        >
          Welcome — come in.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-body-lg)',
            color: 'var(--ink-60)',
            margin: 0,
          }}
        >
          Two ways in, both equally welcome. No wrong door.
        </p>
      </div>

      <div className="hb-doors-grid" style={{ marginBottom: 28 }}>
        <Door
          title="I have a Stellar wallet"
          body="Connect Freighter, xBull, Albedo, Lobstr, Hana, or WalletConnect."
          cta="Connect wallet"
          variant="secondary"
          onClick={onWallet}
          chips={['Freighter', 'xBull', 'Albedo', 'Lobstr']}
        />
        <Door
          title="I'm new — start with email"
          body="We'll create a secure wallet for you and help you add funds. No jargon required."
          cta="Start with email or passkey"
          variant="primary"
          onClick={onNew}
          chips={['Email', 'Passkey', 'Add funds in-app']}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button
          onClick={onCancel}
          className="hb-textlink"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--type-small)',
            color: 'var(--ink-60)',
          }}
        >
          Keep exploring without connecting
        </button>
      </div>
    </main>
  )
}

interface DoorProps {
  title: string
  body: string
  cta: string
  variant: ButtonVariant
  onClick: () => void
  chips: string[]
}

function Door({ title, body, cta, variant, onClick, chips }: DoorProps) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--ink-12)',
        borderRadius: 'var(--radius-modal)',
        padding: 26,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--type-h3-sm)',
          letterSpacing: '-0.01em',
          margin: '0 0 8px',
          color: 'var(--ink)',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--type-data)',
          lineHeight: 1.5,
          color: 'var(--ink-60)',
          margin: '0 0 16px',
        }}
      >
        {body}
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {chips.map((c) => (
          <span
            key={c}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-caption)',
              color: 'var(--ink-60)',
              background: 'var(--ink-06)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 11px',
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <Button
        variant={variant}
        size="lg"
        style={{ width: '100%', marginTop: 'auto' }}
        onClick={onClick}
      >
        {cta}
      </Button>
    </div>
  )
}
