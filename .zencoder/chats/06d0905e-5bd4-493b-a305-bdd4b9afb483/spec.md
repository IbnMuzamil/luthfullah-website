# Technical Specification - Professional Multi-language Charity Platform

## 1. Technical Context
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: `next-intl` (for locale detection, translations, and RTL support)
- **Payment Integration**: 
  - `stripe` (via Stripe Checkout for USD)
  - `paystack-sdk` (for localized payments)
- **Notifications**: WhatsApp Business API or `whatsapp-link` for order alerts
- **State Management**: React `Context` for Cart state + Local Storage for persistence
- **Data Store**: Local JSON-based "database" (`data/*.json`) with `lib/db.ts` for management

## 2. Implementation Approach

### 2.1 Multi-language & RTL (i18n)
- **Locale Routing**: Move all `app/` content into `app/[locale]/` to enable language-prefixed URLs (e.g., `/en`, `/ar`, `/de`).
- **Middleware**: Use `next-intl/middleware` to handle default locale and redirection.
- **RTL Support**: Detect `locale` in `RootLayout`. Set `<html dir="rtl" lang="ar">` for Arabic and `<html dir="ltr" lang="...">` for others.
- **Translations**: Create JSON message files in a `messages/` directory (e.g., `en.json`, `ar.json`, `de.json`). Use `next-intl`'s `useTranslations` for client/server components.
- **Automated Translation**: Use LLM-based translation for initial content generation (EN -> AR/DE).

### 2.2 Project Ordering & Checkout
- **Cart System**: 
  - Create a `useCart` hook and `CartProvider` to manage selected projects and quantities.
  - Persist cart data in `localStorage`.
- **Project Catalog**: 
  - Update `data/projects.json` to include localized titles, descriptions, and pricing (USD base).
  - Add "Add to Cart" functionality to project listings.
- **Checkout Flow**: 
  - **Cart Drawer**: A sidebar or modal to view and manage selections.
  - **Checkout Page**: A multi-step form to collect donor details and process payment via Stripe/Paystack.
  - **Order Confirmation**: Display a success message and save the order to `data/orders.json`.
  - **WhatsApp Alert**: Redirect or send an automated message to the site owner on successful order.

### 2.3 Visual & Identity Overhaul
- **Premium Aesthetic**: Refine `SiteHeader`, `HeroSection`, and `HowItWorks` components using more polished Radix UI primitives and custom Tailwind styles.
- **Imagery**: Leverage existing high-quality assets in `public/` and structured placeholders for missing ones.
- **Trust Indicators**: Add a "Impact Stats" section and "Transparency" badges.

## 3. Source Code Structure Changes
- `app/[locale]/`: Root of localized routes.
- `messages/`: Translation JSON files.
- `components/i18n/`: Language switcher, localized components.
- `components/cart/`: Cart drawer, item cards.
- `components/checkout/`: Payment forms, order summary.
- `hooks/use-cart.ts`: Custom hook for cart state.
- `lib/i18n.ts`: `next-intl` configuration.
- `api/checkout/`: Payment integration endpoints (Stripe/Paystack).
- `lib/whatsapp.ts`: WhatsApp notification utility.

## 4. Data Model / API Changes
- **`data/projects.json`**:
  ```json
  {
    "id": "1",
    "slug": "community-mosque",
    "type": "construction",
    "category": "mosque",
    "price": 45000,
    "currency": "USD",
    "translations": {
      "en": { "title": "Community Mosque", "description": "..." },
      "ar": { "title": "مسجد مجتمعي", "description": "..." },
      "de": { "title": "Gemeindemoschee", "description": "..." }
    }
  }
  ```
- **`data/orders.json`** (New):
  ```json
  {
    "orderId": "ord_123",
    "locale": "en",
    "items": [...],
    "donor": { "name": "...", "email": "..." },
    "paymentStatus": "paid",
    "gateway": "stripe",
    "amount": 45000,
    "createdAt": "..."
  }
  ```

## 5. Delivery Phases

### Phase 1: i18n Foundation
- Install `next-intl`.
- Implement middleware and `[locale]` routing.
- Create initial `en.json`, `ar.json`, `de.json`.
- Implement basic Language Switcher in header.
- Ensure RTL works for the Arabic version.

### Phase 2: Project Ordering (Cart)
- Implement `useCart` hook.
- Add "Add to Cart" to project pages/sections.
- Create Cart Drawer component.
- Update `projects.json` structure with USD pricing.

### Phase 3: Checkout, Payments & Notifications
- Create Checkout page with gateway selection (Stripe/Paystack).
- Integrate Stripe (Checkout Session for USD).
- Integrate Paystack (Inline or API).
- Implement WhatsApp notification logic.
- Implement order saving to `orders.json`.

### Phase 4: UI Refinement & Polish
- Redesign key landing sections (Hero, How It Works, Impact).
- Add animations and professional touches.
- Final testing across all languages and screen sizes.

## 6. Verification Approach
- **Manual UI Review**: Verify layout and RTL alignment for EN, AR, and DE.
- **Functional Testing**: Test the complete cart-to-checkout flow (using Stripe/Paystack test modes).
- **i18n Check**: Ensure all text strings are correctly translated and displayed.
- **Linting**: Run `npm run lint` to ensure code quality.
