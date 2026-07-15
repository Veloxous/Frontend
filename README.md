# Veloxous — Frontend

> The Web3-powered circular economy for electronics on Stellar.

The official Next.js frontend for **Veloxous**, a decentralized marketplace where users can swap, buy, sell, and request repairs for electronic devices securely using Soroban Smart Contract Escrows.

---

## 🌊 Application Flow

```text
[ Application Flow ]

+--------------------+      +--------------------+
| Landing Page       | ---> | Connect Freighter  |
|                    |      | Wallet             |
+--------------------+      +--------------------+
                                     |
                                     v
                           [ Select Action ]
                             /       |       \
               +-------------+       |       +-------------+
               | Buy/Sell    |       | Swap  | Repair      |
               v             v       v       v             v
+--------------------+ +--------------------+ +--------------------+
| Marketplace        | | Swap Engine        | | Fix-It Directory   |
| Dashboard          | | Interface          | |                    |
+--------------------+ +--------------------+ +--------------------+
               |             |               |
               +-------------+-------+-------+
                                     |
                                     v
                            +--------------------+
                            | Lock USDC in       |
                            | Soroban Escrow     |
                            +--------------------+
                                     |
                                     v
                            +--------------------+
                            | Track Shipment /   |
                            | Repair             |
                            +--------------------+
                                     |
                                     v
                            +--------------------+
                            | Confirm Receipt -> |
                            | Funds Released     |
                            +--------------------+
```

---

## 🚀 Features
- **Marketplace & Swap Engine:** Browse listings, execute direct P2P trades, or set collateralized swaps.
- **Repair Directory:** Connect with vetted local technicians to fix broken gadgets.
- **Trustless Payments:** Fully integrated with Stellar (USDC) and Freighter wallet for secure escrow locking.
- **Next.js (App Router) + TailwindCSS:** High performance, Server-Side Rendered (SSR) for optimal SEO on gadget listings.

## 🛠 Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Web3 Integration:** @stellar/freighter-api
- **Package Manager:** Bun

## 💻 Run Locally

Make sure you have [Bun](https://bun.sh) installed.

```bash
bun install
bun run dev        # Starts the development server on http://localhost:3000
bun run build      # Builds the application for production
```

## 📁 Directory Structure
- `src/app/` - Next.js App Router pages.
- `src/components/` - Reusable UI elements (Buttons, Modals, Cards).
- `src/wallet/` - Stellar wallet connection logic.
- `src/styles/` - Global CSS and Tailwind configurations.
