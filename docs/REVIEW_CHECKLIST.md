# Review checklist for AI-generated pull requests

Five minutes before you merge. AI code looks plausible, so that's exactly why you check.

## 1. Scope (1 min)

- [ ] The PR does what the title says, and nothing else.
- [ ] Every changed file belongs to the task. Unexpected files? Ask why.
- [ ] No mass reformatting or renames hiding the real change.
- [ ] Diff size is reviewable (rule of thumb: under ~300 lines). Otherwise ask for a split.

## 2. Danger zones (1 min)

- [ ] No secrets, tokens, keys or `.env` files added. Search the diff for `key`, `token`, `secret`, `password`, `sk_`, `-----BEGIN`.
- [ ] Auth, payments, webhooks, migrations, CI/infra or security config untouched, or changed on purpose and reviewed line by line.
- [ ] No data deletion, `DROP`, destructive migration or disabled check without a clear reason.
- [ ] No new dependencies you didn't approve (check `package.json` / lockfile / `requirements.txt`).

## 3. Correctness (2 min)

- [ ] Tests, lint and typecheck pass in CI, not just "the agent said so".
- [ ] Edge cases: empty input, null/undefined, errors from network/DB, unauthenticated user.
- [ ] No invented APIs, functions or config options. If unsure, search the docs or codebase.
- [ ] No leftover debug logs, TODOs, commented-out code or placeholder values.
- [ ] Error handling doesn't silently swallow failures.

## 4. Run it (1 min)

- [ ] Pull the branch or open the preview deploy. Click through the changed flow once.

## 5. Record it

- [ ] Lasting decision made? It's in `docs/DECISIONS.md`.
- [ ] Squash-merge with a clear message. Delete the branch.

---

Unsure about a PR? Leave it as draft. A blocked merge costs minutes, a bad merge costs days.
