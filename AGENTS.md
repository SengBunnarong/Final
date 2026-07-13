# AGENTS.md

## Project

React 19 + Vite 8 single-page app (JavaScript, no TypeScript). Scaffolded from the default `create-vite` template.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config, ignores `dist/`)
- `npm run preview` — preview production build locally

No test suite is configured. No typecheck script exists.

## Conventions

- Entry point: `src/main.jsx` → `src/App.jsx`
- ESLint flat config in `eslint.config.js` targets `**/*.{js,jsx}` only
- React Compiler is **not** enabled
- ESM-only (`"type": "module"` in package.json)

## Git Workflow

After making code changes:

1. Check git status
2. Stage changed files
3. Create a commit with a meaningful message
4. Push changes to GitHub
