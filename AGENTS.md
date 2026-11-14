# AGENTS.md

Instructions for AI coding agents (Codex, Cursor, GitHub Copilot, Claude Code, Jules, Aider, …).
Human contributors: this is useful for you too.

## Project context

<!-- Fill this in. 5 lines is enough. Agents perform far better with it. -->

- **What this is:** <one sentence: what the app does and for whom>
- **Stack:** <e.g. Next.js 15, TypeScript, Supabase, Tailwind, Vercel>
- **Run locally:** `<e.g. npm install && npm run dev>`
- **Test / lint / typecheck:** `<e.g. npm test && npm run lint && npm run typecheck>`
- **Key folders:** `<e.g. app/ = routes, lib/ = shared logic, supabase/migrations/ = DB>`
- **Do not touch:** `<e.g. generated/, vendor/, legacy-billing/>`

## Rules (summary)

The full rules live in [`AI_AGENT_RULES.md`](AI_AGENT_RULES.md). Read it before your first change. Short version:

1. **Scope:** change only what the task needs. Ask before touching unrelated files, adding dependencies, or deleting anything.
2. **Git:** never commit or push to `main`. Work on a branch, open a (draft) pull request, never merge it yourself.
3. **Secrets:** never put keys, tokens or passwords in code, tests, docs or logs. Use env vars and `.env.example`.
4. **Ask first:** auth, payments, database migrations, infra/CI, security config.
5. **Verify:** run tests, lint and typecheck. Report real output. Never claim untested code works.
6. **Decisions:** read [`docs/DECISIONS.md`](docs/DECISIONS.md). Don't reverse accepted decisions. Propose new entries.

## Pull requests

Use [`.github/pull_request_template.md`](.github/pull_request_template.md). Keep PRs small and focused on one task.
