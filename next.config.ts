import type { NextConfig } from 'next'

// Heliobond investor app. Full Next.js app (Node runtime) — deliberately NOT a
// static export, so Server Components + real Soroban/Stellar data fetching can be
// added per route later without restructuring.
const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
