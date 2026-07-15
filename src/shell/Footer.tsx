'use client'

import Link from 'next/link'
import { Mark } from '../brand/Mark'

export function Footer() {
  return (
    <footer className="hb-footer">
      <div className="hb-footer__inner">
        <div className="hb-footer__brand">
          <Mark size={24} />
          <span className="hb-footer__wordmark">veloxous</span>
        </div>
        <div className="hb-footer__links">
          <button className="hb-textlink hb-footer__link hb-footer__link--strong">
            Talk to a human
          </button>
        </div>
      </div>
    </footer>
  )
}
