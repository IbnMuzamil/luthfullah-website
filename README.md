# Charity construction website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/umar-olamilekan-muzamils-projects/v0-luthfullah-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/lubQzWp45kb)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/umar-olamilekan-muzamils-projects/v0-luthfullah-website](https://vercel.com/umar-olamilekan-muzamils-projects/v0-luthfullah-website)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/lubQzWp45kb](https://v0.app/chat/lubQzWp45kb)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Localization Automation (EN / DE / AR)

To keep all locales aligned whenever new copy is added:

1. Add new keys in [messages/en.json](messages/en.json) as the source of truth.
2. Run `npm run i18n:sync` to automatically add missing keys to DE and AR.
3. Run `npm run i18n:check` to fail fast if keys are missing or schema types drift.

Optional machine translation:

1. Set `OPENAI_API_KEY` in your environment (see [.env.example](.env.example)).
2. Run `npm run i18n:auto` to sync missing keys and auto-translate missing string values.

Recommended safe release flow:

1. `npm run i18n:check`
2. `npm run lint`
3. `npm run build`

If your team uses CI, add `npm run i18n:check` before build so untranslated/misaligned keys cannot be merged.

## Recommended Team Workflow (Automatic 3-Locale Coverage)

1. Add or edit copy in `messages/en.json` only.
2. Run `npm run i18n:auto` to sync missing keys and auto-translate to DE/AR.
3. Review translation quality in `messages/de.json` and `messages/ar.json` for tone/context.
4. Run `npm run i18n:check` to ensure schema parity across locales.
5. Commit all three locale files together.

This repo includes a GitHub Actions quality gate at `.github/workflows/quality.yml`.
Every push/PR runs:

1. `npm run i18n:check`
2. `npm run lint`
3. `npm run build`

So missing locale keys or shape mismatches are blocked before merge.

## Project Catalog Standard (Our Projects)

To add or edit project types under each sector (Mosques, Wells, Boreholes, etc.), update `data/projects.json` using this structure:

1. `id`: unique stable identifier (example: `mosque-small-rural`)
2. `category`: sector key (example: `mosque`, `well`, `borehole`, `school`)
3. `typeName`: localized type name object: `en`, `de`, `ar`
4. `description`: localized description object: `en`, `de`, `ar`
5. `location`: localized location object: `en`, `de`, `ar`
6. `pricing`: object with:
7. `mode`: `fixed`, `starting_from`, or `range`
8. `amountMin`: minimum/base price
9. `amountMax`: max price (only for `range`)
10. `currency`: currency code (`USD`)
11. `imageUrl`: media path
12. `status`: `active` for live display

Example:

```json
{
	"id": "well-solar-pump",
	"category": "well",
	"typeName": {
		"en": "Solar Pump Water Well",
		"de": "Solarpumpen-Brunnen",
		"ar": "بئر مياه بمضخة شمسية"
	},
	"description": {
		"en": "Solar-powered pumping system for reliable daily water distribution.",
		"de": "Solarbetriebenes Pumpsystem für verlässliche tägliche Wasserversorgung.",
		"ar": "نظام ضخ يعمل بالطاقة الشمسية لتوزيع مياه يومي موثوق."
	},
	"pricing": {
		"mode": "fixed",
		"amountMin": 7800,
		"amountMax": null,
		"currency": "USD"
	}
}
```

Display behavior in the site:

1. Projects are grouped by `category`
2. Each sector shows `X types available`
3. Each type card shows the correct pricing label:
4. `fixed` -> exact amount
5. `starting_from` -> "From $..."
6. `range` -> "$min - $max"