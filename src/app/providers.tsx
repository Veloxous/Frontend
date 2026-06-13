'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme/ThemeProvider'
import { WalletProvider } from '../wallet/WalletProvider'

/**
 * Client providers that must persist across route changes: theme (After Sunset
 * dark mode) and wallet (Stellar connection). The i18n provider lives one level
 * up in the layout (it needs server-resolved messages).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
  )
}
