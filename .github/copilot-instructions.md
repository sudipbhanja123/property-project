<!-- .github/copilot-instructions.md - Project-specific guidance for AI coding agents -->
# Copilot / AI Agent Instructions — property-project

Purpose: give concise, actionable context so an AI coding agent is productive immediately.

- Project type: Next.js app using the App Router (`app/` directory). Primary entry points: `app/layout.js` and `app/page.js`.
- Key files: `package.json` (scripts), `next.config.mjs` (uses `reactCompiler: true`), `jsconfig.json` (path alias `@/*` -> project root), `app/globals.css` (tailwind import & CSS variables), `public/` (static assets).

Big picture
- Single Next.js website built with the App Router. UI is composed inside `app/`; expect layouts in `app/layout.js` and routes as files under `app/` (e.g., `app/page.js`).
- Styling: Tailwind is used and imported from `app/globals.css`. The repo also defines CSS custom properties (e.g., `--font-geist-sans`, `--font-geist-mono`, `--background`, `--foreground`) and prefers-color-scheme media queries. Keep global styles in `app/globals.css`.
- Fonts: `app/layout.js` loads Google fonts via `next/font/google` and exposes them as CSS variables used in `body` classNames.

Developer workflows (commands)
- Run dev server: `npm run dev` (README also lists yarn/pnpm/bun variants). Use this to iterate locally.
- Build: `npm run build` then `npm start` to run the production build.
- If adding dependencies, prefer `npm install` unless the repo explicitly uses another lockfile. Verify package manager consistency with the user before changing lockfiles.

Project-specific conventions & patterns
- App Router only: add new UI routes under `app/` and follow the file-as-route convention.
- Global CSS belongs in `app/globals.css`. Tailwind and base variables must remain imported there (see existing `@import "tailwindcss"`).
- Use Next's `Image` component for images served from `public/` (see `app/page.js`). Preserve `width`/`height` and `priority` usage when appropriate.
- Keep layout-level font variables in `app/layout.js` — updates to font handling should update both the font import and the CSS variables referenced in `globals.css`.
- Path alias: `@/` maps to the project root per `jsconfig.json` — use `import X from '@/path/to/file'` for internal imports.

Integration points / external dependencies
- Next.js (v16) and React (v19) are used — be cautious with third-party packages that may require specific React or Next versions.
- Tailwind CSS is configured by importing in `app/globals.css` and present in `devDependencies` (`tailwindcss`, `@tailwindcss/postcss`).
- No tests or CI configurations were found in the repository root; do not assume test runners or workflows exist.

When making changes
- Keep changes minimal and local to `app/` unless the task explicitly requires config changes (e.g., update `next.config.mjs`). If editing `next.config.mjs`, preserve `reactCompiler: true` unless instructed otherwise.
- If adding routes/components, place shared components under `app/components/` (create the folder if needed) and import via `@/app/components/...` or relative paths.
- Static assets go to `public/`. Reference them as `/my-asset.png` in `src` props or `public/` paths.

Examples (from this repo)
- Homepage: `app/page.js` — edit this to change content shown at `/`.
- Layout + fonts: `app/layout.js` imports `Geist` fonts and sets variables `--font-geist-sans` / `--font-geist-mono` used by `globals.css`.
- Global CSS: `app/globals.css` contains `@import "tailwindcss"` and theme variables; prefer edits here for site-wide style changes.

If information is missing
- Ask the user which package manager to use if adding dependencies and whether to run `npm install` locally.
- Ask for any missing environment variables, node version constraints, or CI requirements before changing build tooling.

End of file — ask me to iterate if anything here is unclear or if you want more examples (e.g., common component structure).
