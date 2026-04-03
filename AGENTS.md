# Repository Guidelines

## Project Structure & Module Organization
- **Next.js 14 App Router**: The core architecture resides in the `app/` directory, using modern React Server Components and Route Handlers.
- **Data Persistence**: 
  - **Local JSON Store**: Files in `data/` (`projects.json`, `forms.json`, `site-config.json`, etc.) serve as the primary database, managed via `lib/db.ts` and unified API routes.
- **Unified Dashboard**: Access `/dashboard` to manage site configuration, pages, projects, media, and form submissions in a single WordPress-style interface.
- **Component Organization**: 
  - `components/ui/`: Low-level UI primitives (Radix UI + Tailwind).
  - `components/`: Feature-specific and layout components.
- **Utility & Hooks**: Common logic is centralized in `lib/utils.ts` and custom React hooks in `hooks/`.

## Build, Test, and Development Commands
- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Runs the built production application.
- `npm run lint`: Runs ESLint for Next.js.

## Coding Style & Naming Conventions
- **TypeScript**: Strict type checking is enforced via `tsconfig.json`.
- **Path Aliases**: Use `@/*` to reference the project root (e.g., `@/lib/utils`).
- **Styling**: Tailwind CSS for all styling. Global styles are in `app/globals.css`.
- **Conventions**:
  - Use PascalCase for React components and their filenames.
  - Use kebab-case for directory names and non-component filenames.
  - Prefer Server Components by default; use `'use client'` only when interactivity is required.

## Testing Guidelines
- No automated testing framework is currently configured. Manual verification of UI and API routes is required.

## Commit & Pull Request Guidelines
- **Commit Messages**: Follow a descriptive, imperative style (e.g., "Implement form submission API", "Fix responsive layout on impact page").
- **Workflow**: This repository is synced with [v0.app](https://v0.app); manual changes should be coordinated with v0 deployments to avoid conflicts.
