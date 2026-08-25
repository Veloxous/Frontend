'use client'

import Link from 'next/link'
import { Reveal } from './Reveal'

const PRODUCT_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Swap Engine', href: '/swap' },
  { label: 'Repairs', href: '/repair' },
]

const NETWORK_LINKS = [
  { label: 'Technicians', href: '/technicians' },
  { label: 'Product Overview', href: '#overview' },
  { label: 'How It Works', href: '#how' },
]

export function LandingFooter() {
  return (
    <footer className="vl-footer" data-testid="landing-footer">
      <div className="vl-container">
        <Reveal>
          <div className="vl-footer__top">
            <div>
              <div className="vl-footer__brand">veloxous</div>
              <p className="vl-footer__tagline">
                Sunlight made financial. The trustless marketplace where electronics change hands
                without trust changing hands.
              </p>
            </div>

            <nav className="vl-footer__col" aria-label="Product">
              <h4>Product</h4>
              <ul>
                {PRODUCT_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link className="vl-footer__link" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="vl-footer__col" aria-label="Network">
              <h4>Network</h4>
              <ul>
                {NETWORK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link className="vl-footer__link" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="vl-footer__bottom">
            <span>© 2026 Veloxous. Built on Stellar.</span>
            <div className="vl-footer__socials">
              <a className="vl-social-btn" href="#" aria-label="Veloxous on X">
                <XIcon />
              </a>
              <a className="vl-social-btn" href="#" aria-label="Veloxous on GitHub">
                <GitHubIcon />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m2 2 12 12M14 2 2 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5a6.5 6.5 0 0 0-2.06 12.67c.33.06.45-.14.45-.31v-1.22c-1.78.39-2.16-.75-2.16-.75-.3-.74-.72-.94-.72-.94-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.57 1 1.5.7 1.87.54.06-.43.23-.71.41-.88-1.42-.16-2.92-.71-2.92-3.17 0-.7.25-1.28.66-1.73-.07-.16-.29-.81.06-1.7 0 0 .54-.17 1.77.66a6.1 6.1 0 0 1 3.2 0c1.23-.83 1.77-.66 1.77-.66.35.89.13 1.54.06 1.7.41.45.66 1.03.66 1.73 0 2.47-1.5 3-2.93 3.17.23.2.44.6.44 1.2v1.77c0 .17.12.38.45.31A6.5 6.5 0 0 0 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
