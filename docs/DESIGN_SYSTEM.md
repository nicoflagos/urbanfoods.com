# Design System (Web)

## Principles

- Mobile-first, low-friction checkout
- Trust-focused UI (clear pricing, delivery, payment states)
- Accessible defaults (contrast, focus rings, keyboard nav)

## Tech

- Tailwind CSS + CSS variables (theme tokens)
- shadcn/ui components (Radix primitives)
- Icon set: Lucide

## Tokens

**Brand**
- Primary (Green): `--brand-500`
- Accent (Orange): `--accent-500`
- Neutral greys: `--gray-50` … `--gray-950`

**Semantic**
- `--success`, `--warning`, `--danger`, `--info`

**Spacing**
- 4px grid (Tailwind defaults)

## Layout patterns

- Storefront:
  - Sticky header with search, cart badge
  - Category navigation
  - Product cards with large imagery and clear unit pricing
- Admin/ERP:
  - Left sidebar navigation
  - KPI cards (sales, orders, low stock)
  - Data tables + filters + bulk actions

## Components (MVP)

- Buttons, inputs, selects, toast notifications
- ProductCard, CategoryPill, PriceTag
- CartDrawer, CheckoutSummary
- AdminTable, StatusBadge, KPIStat

