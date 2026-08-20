import { describe, it, expect } from 'vitest'
import { shortAddress, walletReducer, initialState } from './WalletProvider'

describe('shortAddress', () => {
  const longAddress = 'GBQHWXVZ2K4M6N8P3R5T7W9YA2C4E6G8J3L5Q7S9U2X4Z6B8D1F3H59XQ'

  describe('Long addresses', () => {
    it('truncates long addresses with ellipsis in the middle', () => {
      const result = shortAddress(longAddress)
      expect(result).toContain('…')
      expect(result).not.toBe(longAddress)
    })

    it('preserves lead characters', () => {
      const result = shortAddress(longAddress, 4)
      expect(result.slice(0, 4)).toBe('GBQH')
    })

    it('preserves tail characters', () => {
      const result = shortAddress(longAddress, 4, 3)
      expect(result.slice(-3)).toBe('9XQ')
    })
  })
})

describe('walletReducer', () => {
  it('handles INIT_CONNECTION', () => {
    const state = walletReducer(initialState, { type: 'INIT_CONNECTION' })
    expect(state.connecting).toBe(true)
    expect(state.error).toBeNull()
  })

  it('handles CONNECTION_SUCCESS', () => {
    const state = walletReducer(initialState, { 
      type: 'CONNECTION_SUCCESS', 
      publicKey: 'GBQH...', 
      walletType: 'freighter' 
    })
    expect(state.connecting).toBe(false)
    expect(state.isConnected).toBe(true)
    expect(state.publicKey).toBe('GBQH...')
    expect(state.walletType).toBe('freighter')
    expect(state.error).toBeNull()
  })

  it('handles CONNECTION_ERROR', () => {
    const state = walletReducer(
      { ...initialState, connecting: true }, 
      { type: 'CONNECTION_ERROR', error: 'Failed' }
    )
    expect(state.connecting).toBe(false)
    expect(state.error).toBe('Failed')
  })

  it('handles DISCONNECT', () => {
    const connectedState = { 
      ...initialState, 
      isConnected: true, 
      publicKey: 'GBQH...', 
      walletType: 'freighter' 
    }
    const state = walletReducer(connectedState, { type: 'DISCONNECT' })
    expect(state).toEqual(initialState)
  })
})
