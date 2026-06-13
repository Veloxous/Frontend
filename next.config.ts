import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// Heliobond investor app. Full Next.js app (Node runtime) — deliberately NOT a
// static export, so Server Components + real Soroban/Stellar data fetching can be
// added per route later without restructuring.
const nextConfig: NextConfig = {
  reactStrictMode: true,
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(nextConfig)
