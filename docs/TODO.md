# UrbanFoods MVP TODO (Done vs Next)

This is a lightweight checklist derived from `docs/ARCHITECTURE.md` and what currently exists in the repo.

## ✅ Done (working end-to-end locally)

### Dev setup
- Monorepo workspaces: `apps/api`, `apps/web`, `packages/shared`
- API and Web start in dev mode (`npm run dev:api`, `npm run dev:web`)
- API connects to MongoDB via `MONGODB_URI` (Atlas or local)

### API (NestJS + MongoDB)
- Health: `GET /health`
- Auth:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/bootstrap-admin` (via `x-bootstrap-token`)
- RBAC plumbing:
  - `JwtAuthGuard`, `RolesGuard`, `@Roles(...)` decorators used on admin endpoints
- Catalog:
  - `GET /catalog/categories`
  - `GET /catalog/products?search=...`
  - `POST /catalog/categories` (admin)
  - `POST /catalog/products` (admin)
- Inventory:
  - `POST /inventory/set-stock` (admin)
- Orders:
  - `GET /orders` (customer: “my orders”)
  - `POST /orders` (customer: create order)
  - `GET /orders/admin` (admin)
- KYC:
  - `GET /kyc` (customer: “my kyc”)
  - `PATCH /kyc/submit` (customer: submit)
  - `GET /kyc/admin` (admin: list)
  - `PATCH /kyc/admin/review` (admin: approve/reject)

### Web (Next.js App Router)
- Pages/routes exist:
  - `/` home
  - `/catalog`
  - `/login`, `/register`
  - `/account/orders`
  - `/admin` + placeholders: `/admin/orders`, `/admin/products`, `/admin/kyc`

## 🟡 Next (high-value MVP tasks)

### 1) Make Admin usable (wire placeholders)
- Wire `/admin/products` UI to:
  - list products (use `GET /catalog/products`)
  - create product (use `POST /catalog/products`)
- Wire `/admin/orders` UI to `GET /orders/admin`
- Wire `/admin/kyc` UI to `GET /kyc/admin` + `PATCH /kyc/admin/review`
- Add role-gated navigation + a “not authorized” state in the UI

### 2) Finish the order + inventory lifecycle (per `docs/ARCHITECTURE.md`)
- Implement stock reservation/release rules:
  - reserve stock during order creation
  - prevent ordering when stock is insufficient
  - release stock on cancellation
- Add order status transitions (MVP statuses from architecture doc)
- Add movement log (if planned): `stock_movements`

### 3) Customer storefront basics
- Product details page (e.g. `/catalog/[slug]`)
- Cart state + “Checkout” flow UI
- Checkout calls `POST /orders` and shows success/failure

### 4) KYC UX improvements
- Add a customer KYC page (view status + submit form)
- Validate payload schema per customerType (`INDIVIDUAL` vs `BUSINESS`)
- Optional: file upload integration (MVP can store URLs)

### 5) Auth/session hardening
- Persist auth session in web app (token storage strategy)
- Add refresh tokens (if desired) or short-lived access tokens
- Password reset flow (stub ok for MVP)

## 🔵 Later (explicitly called out in architecture but not implemented)

- Payments module (Monnify integration + mock provider)
- Delivery module (zones + fee calculator)
- Notifications module (email/sms providers; MVP “log provider”)
- Audit log module (immutable admin actions)
- NGINX / reverse proxy (optional)

## 🧪 Quality / Ops

- Add API request validation coverage and error formatting consistency
- Add smoke tests (at least: auth, catalog list, create order)
- Add seed workflow (`apps/api/src/seed.ts`) and document it in `README.md`
- CI pipeline (lint + typecheck + build)

