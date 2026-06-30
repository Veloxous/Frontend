import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@/test/render'
import { TopBar } from './TopBar'

vi.mock('next/navigation', () => ({
  usePathname: () => '/explore',
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('../wallet/WalletProvider', () => ({
  useWallet: () => ({
    connected: false,
    address: null,
    connecting: false,
    isDemo: false,
    disconnect: vi.fn(),
  }),
  shortAddress: (address: string) => address,
}))

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

describe('TopBar theme toggle', () => {
  it('announces the dark theme as pressed', async () => {
    document.documentElement.dataset.theme = 'dark'

    render(<TopBar />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Switch to light' })).toHaveAttribute(
        'aria-pressed',
        'true',
      )
    })
  })

  it('announces the light theme as not pressed', async () => {
    document.documentElement.dataset.theme = 'light'

    render(<TopBar />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Switch to dark' })).toHaveAttribute(
        'aria-pressed',
        'false',
      )
    })
  })
})
