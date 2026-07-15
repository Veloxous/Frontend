import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Providers } from './providers'
import { TopBar } from '../shell/TopBar'
import { Footer } from '../shell/Footer'
import { SkipLink } from '../shell/SkipLink'
import { THEME_SCRIPT } from '../theme/themeScript'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'Veloxous — Circular Economy',
  description:
    'Swap, sell, and repair your electronics on a trustless marketplace powered by Stellar.',
  icons: { icon: '/assets/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F5F1' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1714' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Providers>
          <SkipLink />
          <TopBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
