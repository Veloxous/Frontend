# Veloxous Design Documentation

## Overview

This document contains the links, references, and a comprehensive inventory of all high-fidelity designs and design system artifacts for **Veloxous** — a Web3-powered circular economy for electronics built on Stellar. Both **desktop** and **mobile** layouts have been designed for every core flow.

## Figma Design Link

- **Veloxous Frontend UI/UX Design File**: [Veloxous-Frontend UIUX (Figma)](https://www.figma.com/design/x9fExKxhBFpSSDkJeBme8H/Veloxous-Frontend-UIUX?node-id=0-1&t=voVM6cfzj00iZFHp-1)

---

## Screens Designed

### 1. Landing Page

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Landing Page (Desktop) |
| Mobile  | Landing Page |

- Hero section with value proposition and CTA
- Product overview highlighting Buy, Sell, Swap, and Repair flows
- How Veloxous Escrow Works section
- Stellar & USDC integration showcase
- Verified Technicians / Repair Network section
- Footer with navigation and social links

### 2. User Dashboard & Identity

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | User Dashboard (Desktop) |
| Mobile  | User Dashboard |

- Wallet balance display (USDC)
- User Trust Score & Reputation metrics
- Active escrows and pending actions overview
- Recent transaction history
- User profile summary and settings access

### 3. Marketplace Discovery

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Marketplace Discovery (Desktop) |
| Mobile  | Marketplace Discovery |

- Electronics grid view with filtering and search
- Category-based browsing
- Device cards showing price, condition, and seller Trust Score

### 4. Product Details

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Product Details (Desktop) - Updated Style |
| Mobile  | Product Details |

- Device image gallery
- Pricing, condition rating, and seller Trust Score
- Escrow-secured purchase CTA
- Product specifications and description

### 5. Sell Your Device — Listing Wizard

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Sell Your Device - Listing Wizard (Updated Style) |
| Mobile  | Listing Wizard (Mobile) |

- Multi-step device listing flow for sellers
- Device details input (category, brand, model, condition)
- Photo upload step
- Pricing and listing confirmation

### 6. Swap Engine

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Swap Engine (Desktop) |
| Mobile  | Swap Engine |

- Dual-pane Swap Interface (Your Device vs. Their Device)
- Collateral requirements display
- Escrow Timeline Visualization (Awaiting Funds → Shipped → Delivered → Released)

### 7. Dispute Resolution Center

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Dispute Resolution Center (Updated Style) |
| Mobile  | Dispute Resolution Center (Mobile) |

- Dispute filing form with evidence upload
- Case status and timeline tracking
- Resolution outcome display

### 8. Repair Specialist Profile

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Repair Specialist Profile (Updated Style) |
| Mobile  | Repair Specialist Profile (Mobile) |

- Technician public profile with reviews, badges, and specialties
- Repair service listings
- Ratings and trust indicators
- Milestone-based payment tracker

### 9. Admin Command Center

| Variant | Frame Name |
| ------- | ---------- |
| Desktop | Admin Command Center (Updated Style) |
| Mobile  | Admin Command Center (Mobile) |

- Platform-level admin dashboard
- User management and moderation tools
- Transaction oversight and dispute management
- System metrics and analytics

---

## Design System

| Element | Details |
| ------- | ------- |
| **Primary Font (Headings)** | Space Grotesk |
| **Body Font** | Inter |
| **Primary Background** | Deep Obsidian (`#0B0F19`) |
| **Accent Green** | Eco Mint (`#10B981`) |
| **Accent Blue** | Stellar Blue (`#2563EB`) |
| **Neutral** | Slate Gray (`#64748B`) |
| **Alert / Error** | Alert Red (`#EF4444`) |
| **Warning** | Warning Gold (`#F59E0B`) |
| **Theme** | Dark mode first |

Consistent use of Veloxous brand colors, typography, and component patterns across all screens. All components are reusable and implementation-ready.

---

## Summary

- **Total Screens Designed**: 18 (9 desktop + 9 mobile)
- **Responsive Coverage**: Every core flow has both desktop and mobile variants
- **Style Iterations**: Product Details, Listing Wizard, Admin Command Center, Dispute Resolution Center, and Repair Specialist Profile include polished, updated-style desktop variants
- **Accessibility**: Contrast-friendly dark theme with clear visual hierarchy

## Technical Context

The designs serve as a foundational reference for frontend developers implementing the Veloxous platform. No code changes are associated with this design update; these resources reflect the UI/UX implementation direction for the MVP.
