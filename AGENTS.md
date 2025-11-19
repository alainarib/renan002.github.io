# Repository Guidelines

## Project Structure & Module Organization
This Vite + React + TypeScript app boots from `src/main.tsx`, renders `src/App.tsx`, and wires BrowserRouter, AuthContext, and TanStack Query. Routed pages sit in `src/pages`, shared UI in `src/components`, providers in `src/context`, and scheduling/auth logic in `src/lib`. Tailwind tokens live in `src/index.css` and `tailwind.config.ts`, assets in `public/`, and the `@/*` alias from `tsconfig.json` should replace long relative imports.

## Build, Test, and Development Commands
- `npm install` – install dependencies after cloning or pulling.
- `npm run dev` – start the Vite dev server (http://localhost:5173) with hot reload.
- `npm run build` – emit an optimized bundle in `dist/`; run it before publishing via Lovable.
- `npm run build:dev` – produce a development bundle for debugging hosting or CDN issues.
- `npm run preview` – serve the `dist/` output locally to verify routes and assets.
- `npm run lint` – execute the ESLint config (TypeScript + React Hooks + Refresh rules).

## Coding Style & Naming Conventions
Stick to two-space indentation, double quotes, and functional components. Component files stay PascalCase (e.g., `Dashboard.tsx`), while hooks, context values, and helpers stay camelCase. Keep Tailwind utility strings roughly ordered layout → spacing → color, colocate UI logic with its page, and rerun `npm run lint` after refactors to satisfy the hook rules enforced by ESLint.

## Testing Guidelines
Automated tests are not configured yet, so lint plus manual walkthroughs (login, scheduling, confirmation, dashboard) act as the release gate. When adding tests, prefer Vitest + React Testing Library, co-locate specs alongside the component (`Button.test.tsx`), and mock TanStack Query/AuthContext providers. Document the checks you ran in each pull request until CI exists.

## Commit & Pull Request Guidelines
Git history favors short, imperative subjects (`Add authentication and scheduling features...`, `Update landing page copy`); keep unrelated work in separate commits. Pull requests should summarize the change, list commands executed (`npm run build`, `npm run lint`), link issues or Lovable prompts, and attach screenshots/gifs for UI updates under `src/pages`. Request a review whenever routing, context, or dependencies change and flag any manual config steps.

## Security & Configuration Tips
Auth and scheduling data currently come from mock helpers in `src/lib/scheduling`; never commit real credentials and plan to move secrets into env vars once APIs exist. Keep generated files in `public/` or `dist/`, vet new dependencies before editing `package.json`, and ensure logout clears sensitive state until secure persistence is introduced.
