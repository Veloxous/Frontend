'use client'

import { useEffect, useState } from 'react'
import { Button } from '../Button'
import type { ISupportedWallet } from '@creit.tech/stellar-wallets-kit'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  modules: ISupportedWallet[]
  onConnect: (moduleId: string) => Promise<void>
  isConnecting: boolean
  connectingTo: string | null
}

export function WalletConnectModal({
  isOpen,
  onClose,
  modules,
  onConnect,
  isConnecting,
  connectingTo,
}: WalletConnectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  // Sort: available wallets first, then by priority order
  const priorityOrder = ['freighter', 'albedo', 'xbull']

  const sortedModules = [...modules].sort((a, b) => {
    // Available wallets come first
    if (a.isAvailable && !b.isAvailable) return -1
    if (!a.isAvailable && b.isAvailable) return 1
    // Within same availability group, sort by priority
    const aIndex = priorityOrder.indexOf(a.id.toLowerCase())
    const bIndex = priorityOrder.indexOf(b.id.toLowerCase())
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return 0
  })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--paper, #fff)',
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 24,
              lineHeight: 1,
              color: 'var(--ink-60)',
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sortedModules.map((wallet) => {
            const isLoading = isConnecting && connectingTo === wallet.id

            return (
              <div
                key={wallet.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderRadius: 16,
                  border: '1px solid var(--ink-10, #e2e8f0)',
                  opacity: wallet.isAvailable ? 1 : 0.6,
                  transition: 'border-color 0.2s, opacity 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {wallet.icon && (
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      style={{ width: 32, height: 32, borderRadius: 8 }}
                    />
                  )}
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', display: 'block' }}>
                      {wallet.name}
                    </span>
                    {!wallet.isAvailable && (
                      <span style={{ fontSize: 12, color: 'var(--ink-60)' }}>Not installed</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {wallet.isAvailable ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      loading={isLoading}
                      disabled={isConnecting}
                      onClick={() => onConnect(wallet.id)}
                    >
                      Connect
                    </Button>
                  ) : (
                    <a
                      href={wallet.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 14,
                        color: 'var(--ink-60)',
                        textDecoration: 'underline',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Install
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {isConnecting && (
          <div style={{ marginTop: 24, textAlign: 'center', color: 'var(--ink-60)', fontSize: 14 }}>
            Please approve the signature request in your wallet extension.
          </div>
        )}
      </div>
    </div>
  )
}
