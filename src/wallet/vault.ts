// InvestmentVault client — SIMULATED for now.
//
// Mirrors the Soroban vault's read/write surface so the deposit & withdraw
// screens can be wired exactly the way they'll work against the real contract.
// When the vault + USDC SAC are deployed on Stellar, swap these bodies for
// Soroban RPC calls: `convert_to_shares` / `convert_to_assets` for the live
// previews, and `deposit` / `withdraw` built into a transaction, simulated for
// the fee, signed via the connected wallet (kit.signTransaction), and submitted.
//
// Keeping the math here (not inline in the screens) means there is one place to
// flip from simulated to on-chain.

import { HB_DATA } from '../data'

/** total_assets / total_supply. Constant in the mock; a live read on-chain. */
export const SHARE_PRICE = HB_DATA.pool.sharePrice

export interface DepositPreview {
  shares: number
  sharePrice: number
  /** USDC; sub-cent on Stellar. */
  networkFee: number
}

export interface WithdrawPreview {
  assets: number
  sharePrice: number
  networkFee: number
}

export const vault = {
  sharePrice: () => SHARE_PRICE,

  /** convert_to_shares(usdc) — what you receive for a deposit. */
  convertToShares: (usdc: number): number => usdc / SHARE_PRICE,

  /** convert_to_assets(shares) — what shares are worth on withdraw. */
  convertToAssets: (shares: number): number => shares * SHARE_PRICE,

  previewDeposit: (usdc: number): DepositPreview => ({
    shares: usdc / SHARE_PRICE,
    sharePrice: SHARE_PRICE,
    networkFee: 0.00001,
  }),

  previewWithdraw: (usdc: number): WithdrawPreview => ({
    assets: usdc,
    sharePrice: SHARE_PRICE,
    networkFee: 0.00001,
  }),
}
