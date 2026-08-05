# Evan Jo Blog

A lightweight personal website and writing archive built with Next.js, TypeScript, and MDX.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Content workflow

Each folder under `Entries/` is source material for one post. To publish a new entry, add its typed
metadata to `src/content/posts.ts`, add an MDX article under `src/content/posts/`, and copy any
associated audio or cover image into `public/media/entries/`.

## Checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```
