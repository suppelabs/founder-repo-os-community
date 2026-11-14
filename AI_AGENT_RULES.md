# AI Agent Rules

This file is the single source of truth for every AI coding agent working in this repository
(Cursor, Claude Code, Codex, GitHub Copilot, Lovable, Aider, Jules, …).
`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` and `.github/copilot-instructions.md` all point here.
If instructions conflict, **this file wins**, unless the human owner says otherwise in the current task.

## 1. Scope: do the task, only the task

- Change only what the current task requires. No drive-by refactors, renames, reformatting or "while I'm here" fixes.
- Do not touch files unrelated to the task. If a change outside scope seems necessary, **stop and ask** first. Explain which file and why.
- Keep diffs small. If a task needs more than ~300 changed lines or more than ~10 files, propose a plan and split it.
- Do not add, remove or upgrade dependencies without explicit approval. Name the package, version and reason.
- Do not delete files, tests or migrations unless the task explicitly says so.
- Never change lockfiles by hand.

## 2. Git: never write to `main`

- **Never commit or push directly to `main`** (or `master`, `production`, `release/*`).
- Work on a branch: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Deliver work as a **pull request** (draft if unsure) using `.github/pull_request_template.md`.
- Never merge your own PR. Merging is the human owner's decision.
- Never force-push, rewrite published history, or delete branches you did not create.
- Commit messages: imperative, short, explain *why* (`fix: handle empty cart in checkout total`).

## 3. Secrets and sensitive data

- Never write secrets into code, config, tests, docs, logs or commit messages: API keys, tokens, passwords, private keys, connection strings.
- Read secrets from environment variables. Add new variable **names** (never values) to `.env.example`.
- Never commit `.env`, `.env.*` (except `.env.example`), credentials files or private keys. Check `.gitignore`.
- If you see a secret already committed, **stop and tell the owner**. Do not try to "fix" history yourself.
- Do not send repository code or data to external services unless the task requires it.
- Do not log personal data (emails, names, addresses, payment data).

## 4. Safety-critical areas: ask first

Always ask before changing:

- authentication, authorization, sessions, permissions
- payments, billing, webhooks
- database schema and migrations, data deletion
- infrastructure, CI/CD, deployment config, DNS, environment config
- security headers, CORS, CSP, rate limits
- anything in `docs/DECISIONS.md` marked as accepted

## 5. Quality bar

- Run the project's tests, linter and type checker before saying a task is done. Report the actual output.
- If no tests exist for the code you changed, add a minimal one or say clearly that it is untested.
- Never claim something works if you did not run it. "I could not verify X" is a valid answer.
- Follow the existing code style and patterns of the repository, not your own preferences.
- Do not leave TODOs, commented-out code, debug logs or placeholder values without flagging them in the PR.

## 6. Context and decisions

- Read `AGENTS.md` (project context) and `docs/DECISIONS.md` before starting non-trivial work.
- Do not reverse an accepted decision. If you think it is wrong, say so and propose a new entry.
- When you make a choice with lasting impact (library, data model, API shape, architecture), propose a `docs/DECISIONS.md` entry in the same PR.

## 7. Communication

- Before coding a non-trivial task: restate the goal in one sentence and list the files you plan to touch.
- When unsure, ask one concise question rather than guessing.
- In the PR, explain what changed, why, how it was tested, and what the reviewer should look at first.
