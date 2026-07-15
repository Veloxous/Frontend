/**
 * Shared render helper that wraps components in the providers the app uses:
 * ThemeProvider. Import this instead of the bare
 * @testing-library/react render so component tests get a realistic context.
 */
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/theme/ThemeProvider'
import type { ReactNode } from 'react'

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  )
}

function renderWithProviders(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
