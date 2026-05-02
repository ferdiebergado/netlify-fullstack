# Netlify Fullstack TypeScript Template

A fullstack starter for Netlify built with React, Vite, TypeScript, and serverless APIs.

## Features

- React 19 frontend with Vite and fast HMR
- Netlify Functions API endpoints under `/api/*`
- Netlify Edge middleware for request logging, content-type validation, session management, and CSRF protection
- Shared `zod` schemas and TypeScript types across client and backend
- SQLite/libsql database bootstrapped with `init.sql`
- Auth flow with sign-in, sign-out, and user session handling
- React Router v7 route-based layout and guarded routes
- React Query for client-side data fetching and cache updates
- Shadcn components

## Tech stack

- React 19
- Vite 8
- TypeScript 6
- Netlify Functions and Edge Functions
- React Router v7
- React Query v5
- Shadcn with base-ui
- Zod for schema validation
- SQLite/libsql database
- Google Oauth
- ESLint and Prettier for code quality
- Vitest for testing

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the development environment:

```bash
pnpm dev
```

Build the app:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Lint the project:

```bash
pnpm lint
```

Run tests:

```bash
pnpm test
```

## Database commands

Create the local SQLite database:

```bash
pnpm db:create
```

Interact with the database.

```bash
pnpm db
```

Reset the database:

```bash
pnpm db:reset
```

## Project structure

- `src/` — React application, routes, UI components, and auth hooks
- `backend/` — server utilities, database layer, OAuth, session, and HTTP helpers
- `netlify/edge-functions/` — edge middleware for request, JSON, session, and CSRF handling
- `netlify/functions/` — Netlify Functions API handlers
- `shared/` — shared schemas, types, and utilities
- `tests/` — integration tests and helpers

## Netlify routing

The `netlify.toml` configuration defines:

- `/api/*` redirects to `/.netlify/functions/:splat`
- SPA fallback for page routing via `/index.html`
- edge functions for API requests and app response handling

## Notes

- The project uses `pnpm` and Node 22.
- Path aliases are configured in `tsconfig.json`:
  - `@/*` → `./src/*`
  - `@backend/*` → `./backend/*`
  - `@shared/*` → `./shared/*`
- React Compiler support is enabled through `@vitejs/plugin-react`.
