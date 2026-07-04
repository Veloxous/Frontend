'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Mark } from '../brand/Mark'

/**
 * Footer — quiet, honest. Includes "Talk to a human" (trust is shown, not
 * claimed) and a discreet link to the internal admin/oracle console.
 */
export function Footer() {
  const t = useTranslations('Footer')
  return (
    <footer className="hb-footer">
      <div className="hb-footer__inner">
        <div className="hb-footer__brand">
          <Mark size={24} />
          <span className="hb-footer__wordmark">heliobond</span>
        </div>
        <div className="hb-footer__links">
          {links.map((l) => (
            <button key={l} className="hb-textlink hb-footer__link">
              {l}
            </button>
          ))}
          <button className="hb-textlink hb-footer__link hb-footer__link--strong">
            {t('talk')}
          </button>
          <Link href="/admin" className="hb-textlink hb-footer__admin">
        <nav
          style={{
            display: 'flex',
            gap: 22,
            alignItems: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--ink-60)',
            flexWrap: 'wrap',
          }}
          aria-label={t('trustLinks')}
        >
          <a
            href="/verify"
            className="hb-textlink"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'var(--ink-60)',
              textDecoration: 'none',
            }}
          >
            {t('verify')}
          </a>
          <a
            href="/risk"
            className="hb-textlink"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'var(--ink-60)',
              textDecoration: 'none',
            }}
          >
            {t('risk')}
          </a>
          <a
            href="/learn"
            className="hb-textlink"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'var(--ink-60)',
              textDecoration: 'none',
            }}
          >
            {t('learn')}
          </a>
          <a
            href="/talk"
            className="hb-textlink"
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'var(--ink)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {t('talk')}
          </a>
          <Link
            href="/admin"
            className="hb-textlink"
            style={{
              color: 'var(--ink-40)',
              textDecoration: 'none',
              fontFamily: 'inherit',
              fontSize: 13,
            }}
          >
            {t('admin')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
