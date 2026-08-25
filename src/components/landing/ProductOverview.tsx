'use client'

import { Reveal } from './Reveal'
import { EscrowIcon, SwapIcon, WrenchIcon } from './icons'

const FEATURES = [
  {
    icon: EscrowIcon,
    title: 'Trustless Escrow',
    body: 'Soroban smart contracts hold USDC until both sides are satisfied. No middlemen holding your money — code does the custody.',
  },
  {
    icon: SwapIcon,
    title: 'Instant Swaps',
    body: 'A dual-pane swap engine matches buyers and sellers in real time, with on-chain pricing and sub-second settlement on Stellar.',
  },
  {
    icon: WrenchIcon,
    title: 'Verified Repair Network',
    body: 'Independent technicians compete for your repair with transparent quotes and milestone-based escrow payouts.',
  },
]

export function ProductOverview() {
  return (
    <section
      className="vl-section"
      id="overview"
      data-testid="landing-overview"
      aria-labelledby="overview-heading"
    >
      <div className="vl-container">
        <Reveal className="vl-overview__head">
          <span className="vl-eyebrow">Product Overview</span>
          <h2 className="vl-heading" id="overview-heading">
            One platform. Every loop of the lifecycle.
          </h2>
          <p className="vl-subcopy">
            Buy, swap, and repair electronics without trusting a stranger with your money. Veloxous
            keeps funds in escrow until value is delivered — both ways.
          </p>
        </Reveal>

        <div className="vl-feature-grid">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <article className="vl-feature-card">
                <div className="vl-feature-card__icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
