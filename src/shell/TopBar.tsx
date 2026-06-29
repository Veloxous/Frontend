'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button, ChevronDownIcon, MoonIcon, SunIcon } from '../components'
import { Mark } from '../brand/Mark'
import { useLocaleSwitcher } from '../i18n/LocaleProvider'
import { useWallet, shortAddress } from '../wallet/WalletProvider'
import { useTheme } from '../theme/ThemeProvider'

/**
 * TopBar — persistent nav rendered by the root layout. Analemma mark + Explore /
 * How it works / Learn / Creator, network status dot, theme toggle, language
 * switcher, Connect (or the connected wallet pill). Active state derives from the
 * route (and a scroll-spy for the landing anchors); connection from the wallet.
 */
const NAV = [
  { href: '/explore', key: 'explore' },
  { href: '/#how', key: 'how' },
  { href: '/#verify', key: 'learn' },
  { href: '/creator', key: 'creator' },
] as const

export function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Nav')
  const { locale, switchLocale } = useLocaleSwitcher()
  const { connected, address, connecting, isDemo } = useWallet()
  const { theme, toggle } = useTheme()

  // Theme state starts 'light' on server/first render (to avoid a hydration
  // mismatch), so the toggle icon can't be trusted until after mount — a
  // dark-mode user would briefly see the wrong icon. Gate it on `mounted`.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  // Scroll-spy for the anchor nav items (How it works / Learn). usePathname()
  // drops the hash, so observe the landing sections instead. SSR-safe.
  const [activeHash, setActiveHash] = useState('')
  useEffect(() => {
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveHash('')
      return
    }
    const sections = ['how', 'verify']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top) setActiveHash(`#${top.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header className="hb-topbar">
      <Link href="/" aria-label="Heliobond — home" className="hb-topbar__home">
        <Mark />
        <span className="hb-topbar__wordmark">heliobond</span>
      </Link>

      <nav className="hb-topbar-nav hb-topbar__nav">
        {NAV.map(({ href, key }) => {
          const active = href.includes('#')
            ? pathname === '/' && activeHash === href.slice(href.indexOf('#'))
            : pathname === href
          return (
            <Link
              key={key}
              href={href}
              aria-current={active ? 'page' : undefined}
              className="hb-topbar__nav-link"
            >
              {t(key)}
            </Link>
          )
        })}
      </nav>

      <div className="hb-topbar__actions">
        <span role="status" aria-label={t('networkStatus')} className="hb-topbar__status">
          <span aria-hidden="true" className="hb-topbar__status-dot" />
          {t('testnet')}
        </span>

        <button
          onClick={toggle}
          aria-label={mounted && theme === 'dark' ? t('switchToLight') : t('switchToDark')}
          title={mounted && theme === 'dark' ? t('switchToLight') : t('switchToDark')}
          className="hb-topbar__icon-btn"
        >
          {mounted ? theme === 'dark' ? <SunIcon /> : <MoonIcon /> : null}
        </button>

        <button
          onClick={switchLocale}
          aria-label={t('language')}
          className="hb-topbar__icon-btn hb-topbar__lang"
        >
          {locale.toUpperCase()}
          <ChevronDownIcon />
        </button>

        {connected && address ? (
          <WalletMenu address={address} isDemo={isDemo} />
        ) : (
          <Button
            variant="primary"
            size="md"
            loading={connecting}
            onClick={() => router.push('/connect')}
          >
            {t('connect')}
          </Button>
        )}
      </div>
    </header>
  )
}

/** The connected wallet pill + its account menu (incl. Disconnect / sign out). */
function WalletMenu({ address, isDemo }: { address: string; isDemo: boolean }) {
  const t = useTranslations('Nav')
  const router = useRouter()
  const { disconnect } = useWallet()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([])

  // Focus first item when menu opens; restore trigger focus when it closes.
  const prevOpen = useRef(false)
  useEffect(() => {
    if (open && !prevOpen.current) {
      setTimeout(() => itemRefs.current[0]?.focus(), 0)
    }
    if (!open && prevOpen.current) {
      triggerRef.current?.focus()
    }
    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const copy = () => {
    try {
      navigator.clipboard?.writeText(address)
    } catch {
      /* ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(
      (el): el is HTMLButtonElement | HTMLAnchorElement => el !== null,
    )
    if (!items.length) return
    const focused = document.activeElement
    const idx = items.indexOf(focused as HTMLButtonElement)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[(idx + 1) % items.length].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[(idx - 1 + items.length) % items.length].focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      items[0].focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      items[items.length - 1].focus()
    } else if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  // Reset item refs array before each render so stale refs don't linger
  // eslint-disable-next-line react-hooks/refs
  itemRefs.current = []

  return (
    <div ref={ref} className="hb-wallet">
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('account')}
        className="hb-wallet__trigger"
      >
        <span className="hb-wallet__addr">{shortAddress(address)}</span>
        <span className="hb-wallet__avatar" />
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
          className="hb-wallet__menu"
        >
          <div className="hb-wallet__head">
            <span className="hb-wallet__head-addr">{shortAddress(address, 6, 6)}</span>
            <span className="hb-wallet__head-net">{isDemo ? t('demoSession') : t('testnet')}</span>
          </div>
          <div className="hb-wallet__sep" />
          <MenuItem
            ref={(el) => {
              itemRefs.current.push(el)
            }}
            onClick={() => {
              setOpen(false)
              router.push('/portfolio')
            }}
          >
            {t('portfolio')}
          </MenuItem>
          <MenuItem
            ref={(el) => {
              itemRefs.current.push(el)
            }}
            onClick={copy}
          >
            {copied ? t('copied') : t('copyAddress')}
          </MenuItem>
          {!isDemo && (
            <MenuLink
              ref={(el) => {
                itemRefs.current.push(el)
              }}
              href={`https://stellar.expert/explorer/testnet/account/${address}`}
            >
              {t('viewOnExplorer')}
            </MenuLink>
          )}
          <MenuItem
            ref={(el) => {
              itemRefs.current.push(el)
            }}
            tone="ember"
            onClick={() => {
              disconnect()
              setOpen(false)
              router.push('/')
            }}
          >
            {t('disconnect')}
          </MenuItem>
        </div>
      )}
    </div>
  )
}

const MenuItem = function MenuItem({
  children,
  onClick,
  tone,
  ref: _ref,
}: {
  children: ReactNode
  onClick: () => void
  tone?: 'ember'
  ref?: ((el: HTMLButtonElement | null) => void) | null
}) {
  return (
    <button
      role="menuitem"
      tabIndex={-1}
      ref={_ref}
      onClick={onClick}
      className={`hb-menu-item${tone === 'ember' ? ' hb-menu-item--ember' : ''}`}
    >
      {children}
    </button>
  )
}

const MenuLink = function MenuLink({
  children,
  href,
  ref: _ref,
}: {
  children: ReactNode
  href: string
  ref?: ((el: HTMLAnchorElement | null) => void) | null
}) {
  return (
    <a
      role="menuitem"
      tabIndex={-1}
      ref={_ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hb-menu-item"
    >
      {children} ↗
    </a>
  )
}
