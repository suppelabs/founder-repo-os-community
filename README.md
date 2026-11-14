# Founder Repo Kit — AI coding guardrails for your GitHub repo

**Free, open-source rule files that keep Cursor, Claude Code, Codex, GitHub Copilot and Lovable inside the lines.**
Drop them into your repo in 2 minutes. Your AI agent gets project context and hard boundaries: no pushing to `main`, no touching unrelated files, no secrets in code, and every change arrives as a reviewable pull request.

> Built by [SUPPE LABS](https://suppelabs.at) · the free core of [Founder Repo OS](https://www.founderrepoos.com/?utm_source=github&utm_medium=readme&utm_campaign=kit)

---

## Why

AI coding tools are fast and confidently wrong in the same breath. Without written rules they:

- push straight to `main` or rewrite files you never asked them to touch,
- "fix" one bug by refactoring half the codebase,
- forget every decision you made last week,
- paste API keys into source files,
- open pull requests nobody can review.

This kit puts the rules **in the repo**, where every tool reads them, instead of in scattered prompts.

## What's inside

| File | Read by | Purpose |
|---|---|---|
| `AGENTS.md` | Codex, Cursor, Copilot agent, Jules, Aider, most agents | Project context + rules, the open standard |
| `CLAUDE.md` | Claude Code | Points Claude to the same rules |
| `.cursor/rules/*.mdc` | Cursor | Always-on guardrails + PR workflow |
| `.github/copilot-instructions.md` | GitHub Copilot | Same rules for Copilot Chat / agent |
| `AI_AGENT_RULES.md` | All of the above | The single source of truth: scope, branches, secrets |
| `docs/DECISIONS.md` | Humans + agents | Lightweight decision log so the AI stops re-litigating choices |
| `.github/pull_request_template.md` | GitHub | PR template built for AI-generated changes |
| `docs/REVIEW_CHECKLIST.md` | You | 5-minute checklist before you merge AI code |
| `bin/check.js` | You | Zero-dependency CLI that scores your repo |

Lovable / Bolt / v0 users: connect the project to GitHub, add these files, and paste `AI_AGENT_RULES.md` into the project's custom knowledge/instructions field as well.

## Quickstart

**Option A: one command (2 minutes)**

```bash
# from the root of your repo
git checkout -b chore/ai-guardrails
npx github:suppelabs/founder-repo-os-community init
```

This copies the rule files into your repo and **never overwrites** existing files (it lists what it skipped, so you can merge those by hand). No dependencies, nothing installed globally.

Then open `AGENTS.md` and fill in the **Project context** section (5 lines: what the app does, stack, how to run, how to test). Commit, open a PR, merge it yourself.

Prefer copying by hand? [Download the ZIP](https://github.com/suppelabs/founder-repo-os-community/archive/refs/heads/main.zip) and copy the files from the table above.

**Option B: score your repo first**

```bash
npx github:suppelabs/founder-repo-os-community        # run in your repo root
npx github:suppelabs/founder-repo-os-community ../app # or point it at a path
```

Example output:

```
Founder Repo Check  ·  /home/you/my-app

  ✔ AGENTS.md                        project context + rules for agents
  ✘ CLAUDE.md                        Claude Code instructions
  ...
  Score: 45/100  ·  NEEDS WORK
```

Flags: `--json` (machine-readable), `--min <score>` (exit 1 below that score, handy in CI).

## Use it in CI (optional)

```yaml
# .github/workflows/ai-guardrails.yml
name: ai-guardrails
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npx -y github:suppelabs/founder-repo-os-community --min 70
```

Also turn on **branch protection for `main`** (Settings → Branches → require a pull request). Rule files ask nicely; branch protection enforces.

## How good is your repo really?

The files are step one. Take the free **[Repo Scorecard](https://www.founderrepoos.com/scorecard?utm_source=github&utm_medium=readme&utm_campaign=kit)**: 15 questions, runs entirely in your browser, shows exactly where your AI-built repo loses context, review discipline and launch readiness.

## Want it set up for your repo?

The kit is generic. **[Founder Repo OS](https://www.founderrepoos.com/?utm_source=github&utm_medium=readme&utm_campaign=kit)** is the maintained operating foundation: it scans your actual repository, writes project-specific context, rules and docs, and delivers everything as a **draft pull request** on its own branch. You see the full diff, it never writes to `main`, and you decide what merges.

Founder Repo OS helps turn project context into reviewable repository changes while keeping the repository owner in control of the final decision.

- Connects an authorized customer workflow to GitHub.
- Prepares repository-specific operating rules and setup changes.
- Shows the complete proposed diff before review.
- Uses a review-first Draft Pull Request workflow.
- Keeps repository governance boundaries visible.
- Includes relevant product maintenance updates during an active subscription.

```text
Customer Account
      |
      v
    GitHub
      |
      v
   Full Diff
      |
      v
   Draft PR
      |
      v
Human Review
      |
      v
Explicit Merge
```

It prepares a dedicated branch and a Draft Pull Request. The repository owner reviews the proposed changes and decides whether to merge. An automatic merge is not part of the workflow.

The website is the commercial source of truth for current plans and terms: https://www.founderrepoos.com

This repository does not duplicate pricing or commercial terms.

## Public documentation

This repository also keeps the public companion docs for that operating model. `init` does not copy them into your repo.

- [How Founder Repo OS works](docs/how-founder-repo-os-works.md)
- [Review-first workflow](docs/review-first-workflow.md)
- [Security and governance principles](docs/security-and-governance-principles.md)
- [Safe example workflow](examples/safe-example-workflow.md)

Public documentation updates are listed in [CHANGELOG.md](CHANGELOG.md).

## Contributing

Issues and PRs welcome, especially rule tweaks that stopped a real AI mistake. Please describe the mistake in the PR.

## License

MIT © SUPPE LABS — see [LICENSE](LICENSE).

The MIT license covers this repository: the free kit (rule files and the `founder-repo-check` CLI) and the public documentation published here. It does not license the commercial Founder Repo OS product, its internal governance controls, private implementation, or proprietary product logic.
