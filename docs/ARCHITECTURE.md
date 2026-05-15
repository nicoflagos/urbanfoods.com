# System Architecture (MVP → Scalable)

## Goals

- Fast, mobile-first commerce UX (Jumia-style)
- Secure onboarding (KYC) and RBAC for operations
- Inventory-first order lifecycle (reserve stock, dispatch, delivery)
- Modular backend ready for service extraction later

## High-level

**Client layer**
- Next.js App Router web app
  - Customer storefront (public + authenticated account)
  - Admin/ERP dashboard (role-gated routes)

**API layer**
- NestJS modular monolith (clean module boundaries)
  - Auth/RBAC, Users, Catalog, Orders, Inventory, KYC, Payments (stub), Delivery (stub)
  - Audit log (admin actions)

**Data layer**
- MongoDB (single cluster for MVP; separate DBs/collections by module)
- Object storage (Cloudinary) for KYC docs (MVP: local adapter + interface)

**Integrations**
- Payment gateway (Monnify) via dedicated `payments` module (MVP: mock provider)
- Email/SMS notifications via `notifications` module (MVP: log provider)
- Maps/autocomplete optional (later)

## Deployment (Render-ready)

- `apps/web`: Next.js build + start
- `apps/api`: NestJS build + start
- MongoDB: managed (preferred) or container for dev
- Reverse proxy: NGINX optional (Render can route services directly)

## Security model

- Passwords hashed with `bcrypt`
- JWT access tokens + refresh token rotation (MVP: access + refresh)
- RBAC enforced both:
  - API guards (`RolesGuard`)
  - Web route protection (server-side checks where possible)
- KYC documents stored securely (MVP: abstraction; production: Cloudinary signed URLs)
- Audit logging for admin actions (create/update/delete + approvals)

## Domain boundaries (modules)

- `auth`: login/register, tokens, password reset hooks
- `users`: user profiles, roles, addresses
- `catalog`: categories, products, pricing, media
- `inventory`: stock levels, stock movements, low-stock thresholds
- `orders`: cart→order, order items, status transitions, stock reservation
- `kyc`: KYC record, uploads, status workflow, admin approval
- `payments`: payment intents + verification (provider interface)
- `delivery`: delivery address + zone + fee calculator (interface)
- `notifications`: email/sms/push (interface)
- `audit`: immutable admin activity events

## Order lifecycle (MVP)

1. Customer creates order from cart
2. System reserves stock (atomic per product)
3. Payment initiated (mock)
4. Order status progresses: `PENDING → CONFIRMED → PROCESSING → PACKAGED → SHIPPED → DELIVERED`
5. On cancellation/return: stock is released back (movement log)

## Data model (Mongo collections)

- `users`, `roles`
- `products`, `categories`
- `inventories`, `stock_movements`, `warehouses` (MVP: single warehouse)
- `orders`
- `kyc_records`
- `payments`
- `deliveries`
- `audit_events`

## Future extraction path

When scale demands, split modules into services behind a gateway:
- Catalog Service, Order Service, Inventory Service, Identity Service
Each keeps its own DB schema; events emitted via message bus (Kafka/RabbitMQ).

