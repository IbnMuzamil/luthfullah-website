# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `c:\Users\PC\Luthfullah-website\luthfullah-website\.zencoder\chats\06d0905e-5bd4-493b-a305-bdd4b9afb483/requirements.md`.

**Stop here.** Present the PRD to the user and wait for their confirmation before proceeding.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `c:\Users\PC\Luthfullah-website\luthfullah-website\.zencoder\chats\06d0905e-5bd4-493b-a305-bdd4b9afb483/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `c:\Users\PC\Luthfullah-website\luthfullah-website\.zencoder\chats\06d0905e-5bd4-493b-a305-bdd4b9afb483/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

**Stop here.** Present the technical specification to the user and wait for their confirmation before proceeding.

### [x] Step: Planning

Create a detailed implementation plan based on `c:\Users\PC\Luthfullah-website\luthfullah-website\.zencoder\chats\06d0905e-5bd4-493b-a305-bdd4b9afb483/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `c:\Users\PC\Luthfullah-website\luthfullah-website\.zencoder\chats\06d0905e-5bd4-493b-a305-bdd4b9afb483/plan.md`.

**Stop here.** Present the implementation plan to the user and wait for their confirmation before proceeding.

### [ ] Step: Implementation

#### Phase 1: i18n Foundation [x]
1. [x] **Install next-intl**: Add `next-intl` to `package.json`.
2. [x] **Setup [locale] routing**:
    - Move `app/` routes to `app/[locale]/`.
    - Update `RootLayout` in `app/[locale]/layout.tsx` to handle `params.locale`.
    - Implement `lib/i18n.ts` configuration.
3. [x] **Middleware configuration**: Create `middleware.ts` for locale detection and redirection.
4. [x] **Initial translations**: Create `messages/en.json`, `messages/ar.json`, `messages/de.json`.
5. [x] **Language Switcher**: Create `components/i18n/LanguageSwitcher.tsx` and integrate into `SiteHeader`.
6. [x] **RTL Support**: Update `app/[locale]/layout.tsx` to set `dir="rtl"` for Arabic.

#### Phase 2: Project Ordering (Cart) [x]
7. [x] **Cart State Management**: Implement `hooks/use-cart.ts` and `components/cart/CartProvider.tsx`.
8. [x] **Update projects data**: Refactor `data/projects.json` for multi-language and pricing.
9. [x] **Project UI Updates**: Add "Add to Cart" button to project listings.
10. [x] **Cart Drawer**: Implement `components/cart/CartDrawer.tsx` to view/manage selections.

#### Phase 3: Checkout, Payments & Notifications
11. [x] **Checkout Page**: Create `app/[locale]/checkout/page.tsx` with gateway selection.
12. [ ] **Stripe & Paystack Integration**:
    - Implement API routes for Stripe Checkout and Paystack initialization.
    - Integrate payment buttons/flows on the checkout page.
13. [ ] **WhatsApp & Order Persistence**:
    - Implement `lib/whatsapp.ts` for notification links/APIs.
    - Save successful orders to `data/orders.json` and trigger WhatsApp alert.

#### Phase 4: UI Refinement & Polish
14. [ ] **Landing Page Overhaul**: Update `HeroSection`, `HowItWorks`, and `ImpactStats` for a premium look.
15. [ ] **Localization Cleanup**: Ensure all hardcoded strings are moved to translation files.
16. [ ] **Final Verification**: Run `npm run lint` and verify all flows in all languages.
