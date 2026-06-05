# UrbanFoods Commerce Platform

Monorepo for the UrbanFoods e-commerce website (B2C/B2B) + mini ERP dashboard.

## Apps

- `apps/web`: Next.js customer storefront + admin ERP (role-gated)
- `apps/api`: NestJS API (MongoDB, RBAC, KYC, inventory, orders)

## Quick start (dev)

1. Install dependencies: `npm install`
2. Start MongoDB: `docker compose up -d mongo`
3. Start API: `npm run dev:api`
4. Start Web: `npm run dev:web`

## Docs

- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/TODO.md`
