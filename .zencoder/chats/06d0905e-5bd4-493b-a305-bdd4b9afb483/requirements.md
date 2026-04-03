# Product Requirements Document (PRD) - Professional Multi-language Charity Platform

## 1. Overview
The goal is to transform the existing "Luthfullah" website into a professional-grade charity construction and relief platform. It will enable clients to place orders for specific charity projects (Mosques, Schools, Iftar, Adaha) in three languages: English, Arabic, and German.

## 2. Target Audience
- Individual donors and organizations looking to build lasting legacy projects (Sadaqah Jariyah).
- Donors interested in seasonal or immediate relief (Iftar, Adaha).
- International audience across English, Arabic, and German-speaking regions.

## 3. Features & Requirements

### 3.1 Professional Visual Identity
- **Design Overhaul**: Transition to a high-end, trustworthy aesthetic similar to `africalwell.com`.
- **Imagery**: Use high-quality photography of actual projects (Mosques, Schools, Water Wells) and community impact.
- **Trust Indicators**: Clear display of transparency, stats, and "How It Works".

### 3.2 Multi-language Support (i18n)
- **Languages**: English (EN), Arabic (AR), and German (DE).
- **RTL Support**: Full Right-to-Left (RTL) support for the Arabic version.
- **Language Switcher**: Easily accessible toggle in the header.
- **Dynamic Content**: All site text (navigation, hero, project descriptions, forms) must be translatable.

### 3.3 Project Categories (Charity Focus)
The platform will focus on:
1. **Mosques**: Construction of prayer spaces.
2. **Schools**: Educational facilities.
3. **Iftar**: Providing meals during Ramadan.
4. **Adaha (Qurbani)**: Meat distribution during Eid al-Adha.
5. **Water Wells**: (Existing, to be maintained/enhanced).

### 3.4 Project Ordering System
- **Order Flow**: A structured process for clients to select a project type, specify details, and "order" or "request" a project.
- **Localized Forms**: Forms should be fully translated and adapt to the selected language.
- **Lead Management**: Submissions captured in the local JSON database (`submissions.json`).

## 4. Technical Constraints
- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS.
- **Data Store**: Local JSON-based "database" (`data/*.json`).
- **i18n Implementation**: Needs a robust solution (e.g., `next-intl` or a custom middleware-based approach) since one is not currently present.

## 5. Clarifications & Decisions
- **Payment Integration**: Implement a full Checkout system (Add to cart, pay via Stripe/PayPal for USD and Paystack for localized payments).
- **Notifications**: Implement WhatsApp notifications for new orders.
- **Visual Excellence**: Ensure a premium, "first-class" aesthetic inspired by the best version of `africalwell.com`, while retaining all existing high-quality features.

## 6. Success Criteria
- Website successfully displays in EN, AR, and DE with correct alignment (RTL for AR).
- Users can submit a project order for Mosques, Schools, Iftar, or Adaha.
- The UI reflects a professional, high-trust charity organization.
