# CLAUDE.md

Claude Code: this repository's instructions live in two files. Read both before your first change.

@AGENTS.md
@AI_AGENT_RULES.md

## Claude Code specifics

- Never run `git push` to `main`/`master`, `git push --force`, `git reset --hard` on shared branches, or `rm -rf` outside the working tree.
- Create a branch before your first edit (`git checkout -b <type>/<short-name>`).
- Use plan mode for anything touching more than 3 files, and wait for approval.
- Before finishing, run the test/lint/typecheck commands from `AGENTS.md` and paste the result.
- If you open a PR with `gh pr create`, use `--draft` and fill in `.github/pull_request_template.md`.

Recommended `.claude/settings.json` deny list (optional):

```json
{
  "permissions": {
    "deny": [
      "Bash(git push origin main*)",
      "Bash(git push origin master*)",
      "Bash(git push --force*)",
      "Bash(git push -f*)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```
