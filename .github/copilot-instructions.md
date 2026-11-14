# Copilot instructions

Read `AGENTS.md` for project context and follow `AI_AGENT_RULES.md` for every change. Summary:

- Change only what the task requires. Do not touch unrelated files; ask first if you think you must.
- No drive-by refactors, renames, reformatting or dependency changes.
- Never commit or push to `main`. Use a branch and a pull request. Never merge your own PR.
- Never write secrets into code, tests, docs or logs. Use environment variables; add names only to `.env.example`.
- Ask before changing auth, payments, database migrations, CI/CD, infrastructure or security configuration.
- Run tests, lint and typecheck before finishing, and report the real results.
- Respect accepted decisions in `docs/DECISIONS.md`.
- Use `.github/pull_request_template.md` for every pull request.
