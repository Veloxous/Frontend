'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ISupportedWallet } from '@creit.tech/stellar-wallets-kit'
import { WalletConnectModal } from '../components/wallet/WalletConnectModal'

/**
 * Wallet state for Veloxous. Wraps the Stellar Wallets Kit (Freighter, xBull,
 * Albedo) and handles SEP-10 authentication.
 */
export interface WalletState {
  isConnected: boolean
  connecting: boolean
  publicKey: string | null
  walletType: string | null
  network: 'TESTNET' | 'PUBLIC'
  isDemo: boolean
  error: string | null
}

interface WalletContextValue extends WalletState {
  /** @alias isConnected — kept for backward compatibility */
  connected: boolean
  /** @alias publicKey — kept for backward compatibility */
  address: string | null
  connect: () => void
  connectDemo: () => void
  disconnect: () => void
  sign: (xdr: string) => Promise<string>
}

export const initialState: WalletState = {
  isConnected: false,
  connecting: false,
  publicKey: null,
  walletType: null,
  network: 'TESTNET',
  isDemo: false,
  error: null,
}

export type Action =
  | { type: 'INIT_CONNECTION' }
  | { type: 'CONNECTION_SUCCESS'; publicKey: string; walletType: string; isDemo?: boolean }
  | { type: 'CONNECTION_ERROR'; error: string }
  | { type: 'DISCONNECT' }
  | { type: 'SET_NETWORK'; network: 'TESTNET' | 'PUBLIC' }
  | { type: 'CLEAR_ERROR' }

export function walletReducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case 'INIT_CONNECTION':
      return { ...state, connecting: true, error: null }
    case 'CONNECTION_SUCCESS':
      return {
        ...state,
        connecting: false,
        isConnected: true,
        publicKey: action.publicKey,
        walletType: action.walletType,
        isDemo: action.isDemo || false,
        error: null,
      }
    case 'CONNECTION_ERROR':
      return { ...state, connecting: false, error: action.error }
    case 'DISCONNECT':
      return { ...initialState, network: state.network }
    case 'SET_NETWORK':
      return { ...state, network: action.network }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within <WalletProvider>')
  return ctx
}

export function shortAddress(address: string, lead = 4, tail = 3): string {
  if (address.length <= lead + tail + 1) return address
  const suffix = tail > 0 ? address.slice(-tail) : ''
  return `${address.slice(0, lead)}…${suffix}`
}

const DEMO_ADDRESS = 'GBQHWXVZ2K4M6N8P3R5T7W9YA2C4E6G8J3L5Q7S9U2X4Z6B8D1F3H59XQ'

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState)
  const initedRef = useRef(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modules, setModules] = useState<ISupportedWallet[]>([])
  const [connectingTo, setConnectingTo] = useState<string | null>(null)

  const persist = useCallback((addr: string, walletId: string) => {
    try {
      localStorage.setItem('hb-address', addr)
      localStorage.setItem('hb-wallet', walletId)
    } catch {
      /* ignore */
    }
  }, [])

  const ensureInit = useCallback(async () => {
    if (initedRef.current) return
    const { StellarWalletsKit, Networks } = await import('@creit.tech/stellar-wallets-kit')
    const { defaultModules } = await import('@creit.tech/stellar-wallets-kit/modules/utils')

    // Use testnet as default
    StellarWalletsKit.init({ modules: defaultModules(), network: Networks.TESTNET })
    // Fetch the list of supported wallets to populate the modal
    const supported = await StellarWalletsKit.refreshSupportedWallets()
    setModules(supported)
    initedRef.current = true
  }, [])

  const disconnect = useCallback(() => {
    dispatch({ type: 'DISCONNECT' })
    try {
      localStorage.removeItem('hb-address')
      localStorage.removeItem('hb-wallet')
    } catch {
      /* ignore */
    }

    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})

    void import('@creit.tech/stellar-wallets-kit')
      .then(({ StellarWalletsKit }) => StellarWalletsKit.disconnect())
      .catch(() => {})
  }, [])

  // Check for expired token / 401s from API
  useEffect(() => {
    const handleAuthExpired = () => {
      disconnect()
      dispatch({ type: 'CONNECTION_ERROR', error: 'Session expired. Please reconnect.' })
    }
    window.addEventListener('auth-expired', handleAuthExpired)
    return () => window.removeEventListener('auth-expired', handleAuthExpired)
  }, [disconnect])

  // Account change listener (Freighter)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    
    if (state.isConnected && !state.isDemo && state.walletType === 'freighter') {
      // Poll for active account changes as Freighter doesn't provide a reliable standard event
      interval = setInterval(async () => {
        try {
          // Check window.freighter directly
          const freighter = (window as any).freighter
          if (freighter) {
            const result = await freighter.getPublicKey()
            if (result && result !== state.publicKey) {
              console.log('Account changed, logging out')
              disconnect()
            }
          }
        } catch (e) {
          // ignore
        }
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.isConnected, state.isDemo, state.walletType, state.publicKey]) // eslint-disable-line react-hooks/exhaustive-deps

  // Restore session on mount
  useEffect(() => {
    let saved: string | null = null
    let savedWallet: string | null = null
    try {
      saved = localStorage.getItem('hb-address')
      savedWallet = localStorage.getItem('hb-wallet')
    } catch {
      /* ignore */
    }
    if (!saved) return

    dispatch({
      type: 'CONNECTION_SUCCESS',
      publicKey: saved,
      walletType: savedWallet ?? 'wallet',
      isDemo: savedWallet === 'demo',
    })

    if (savedWallet && savedWallet !== 'demo') {
      void (async () => {
        try {
          await ensureInit()
          const { StellarWalletsKit } = await import('@creit.tech/stellar-wallets-kit')
          StellarWalletsKit.setWallet(savedWallet)
        } catch {
          // wallet may be uninstalled
        }
      })()
    }
  }, [ensureInit])

  const openConnectModal = useCallback(async () => {
    await ensureInit()
    setIsModalOpen(true)
    dispatch({ type: 'CLEAR_ERROR' })
  }, [ensureInit])

  const performConnect = useCallback(async (moduleId: string) => {
    try {
      setConnectingTo(moduleId)
      dispatch({ type: 'INIT_CONNECTION' })

      const { StellarWalletsKit, Networks } = await import('@creit.tech/stellar-wallets-kit')
      StellarWalletsKit.setWallet(moduleId)

      const { address } = await StellarWalletsKit.getAddress()
      
      // Attempt SEP-10 Auth
      const challengeRes = await fetch(`/api/auth/challenge?account=${address}`)
      if (!challengeRes.ok) throw new Error('Failed to get auth challenge')
      const challengeData = await challengeRes.json()
      
      if (!challengeData.transaction) {
        throw new Error('No transaction in challenge response')
      }

      let signedTx = ''
      try {
        const signResult = await StellarWalletsKit.signTransaction(challengeData.transaction, {
           networkPassphrase: state.network === 'PUBLIC' ? Networks.PUBLIC : Networks.TESTNET,
           address: address,
        })
        signedTx = signResult.signedTxXdr
      } catch (err: any) {
        console.error('Signature rejected', err)
        throw new Error('Signature request cancelled')
      }

      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction: signedTx })
      })

      if (!verifyRes.ok) throw new Error('Failed to verify signature')

      // Success!
      dispatch({
        type: 'CONNECTION_SUCCESS',
        publicKey: address,
        walletType: moduleId
      })
      persist(address, moduleId)
      setIsModalOpen(false)

    } catch (err: any) {
      console.error(err)
      dispatch({ type: 'CONNECTION_ERROR', error: err.message || 'Connection failed' })
    } finally {
      setConnectingTo(null)
    }
  }, [state.network, persist])

  const connectDemo = useCallback(() => {
    dispatch({
      type: 'CONNECTION_SUCCESS',
      publicKey: DEMO_ADDRESS,
      walletType: 'demo',
      isDemo: true,
    })
    persist(DEMO_ADDRESS, 'demo')
  }, [persist])

  const sign = useCallback(
    async (xdr: string): Promise<string> => {
      if (state.isDemo) throw new Error('Cannot sign in demo mode')
      if (!state.publicKey) throw new Error('Not connected')

      await ensureInit()
      const { StellarWalletsKit, Networks } = await import('@creit.tech/stellar-wallets-kit')
      const result = await StellarWalletsKit.signTransaction(xdr, {
        networkPassphrase: state.network === 'PUBLIC' ? Networks.PUBLIC : Networks.TESTNET,
        address: state.publicKey,
      })
      return result.signedTxXdr
    },
    [state.isDemo, state.publicKey, state.network, ensureInit],
  )

  return (
    <WalletContext.Provider
      value={{
        ...state,
        // backward-compatible aliases
        connected: state.isConnected,
        address: state.publicKey,
        connect: openConnectModal,
        connectDemo,
        disconnect,
        sign,
      }}
    >
      {children}
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modules={modules}
        onConnect={performConnect}
        isConnecting={state.connecting}
        connectingTo={connectingTo}
      />
      {state.error && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'var(--red, #ef4444)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 8,
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {state.error}
          <button 
            onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
            style={{ marginLeft: 12, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}
    </WalletContext.Provider>
  )
}
