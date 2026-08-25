'use client'

import { Reveal } from './Reveal'

const STEPS = [
  {
    title: 'Find an Item',
    body: 'Browse the marketplace or swap engine for the electronics you need.',
  },
  {
    title: 'Lock Funds',
    body: 'Deposit USDC into the trustless Soroban escrow contract. Funds leave your wallet, but not to the seller yet.',
  },
  {
    title: 'Verify Receipt',
    body: 'Inspect the physical item when it arrives at your doorstep. You stay in control.',
  },
  {
    title: 'Release Funds',
    body: 'Approve the transaction and escrow releases USDC to the seller. Not happy? Open a dispute.',
  },
]

export function HowItWorks() {
  return (
    <section
      className="vl-section"
      id="how"
      data-testid="landing-how-it-works"
      aria-labelledby="how-heading"
    >
      <div className="vl-container">
        <Reveal className="vl-how__head">
          <span className="vl-eyebrow">How It Works</span>
          <h2 className="vl-heading" id="how-heading">
            Escrow in four steps
          </h2>
          <p className="vl-subcopy">
            Secure, trustless, and simple. Your funds are protected by a Soroban smart contract
            until you are completely satisfied.
          </p>
        </Reveal>

        <ol className="vl-steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {STEPS.map(({ title, body }, i) => (
            <li key={title} className="vl-step">
              <Reveal delay={i * 0.12}>
                <div className="vl-step__dot" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
