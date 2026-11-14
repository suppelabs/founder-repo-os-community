# Decisions

A short log of decisions that should not be re-argued every week, by you or by your AI agent.
Agents: read this before non-trivial work. Do not reverse an **Accepted** decision; propose a new entry instead.

**Status values:** Proposed · Accepted · Superseded by #NNN · Rejected

---

## Template

```
## NNN: <short title>

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by #NNN | Rejected
- **Decided by:** <name>

**Context:** What problem or question forced a decision? (2–4 sentences)

**Decision:** What we do. (1–3 sentences, concrete)

**Alternatives considered:** What else, and why not.

**Consequences:** What this makes easier / harder. What agents must keep in mind.
```

---

## 001: Use AI agent rules and review every change via pull request

- **Date:** YYYY-MM-DD
- **Status:** Accepted
- **Decided by:** <owner>

**Context:** AI coding tools write a growing share of this codebase. Without written rules they push to `main`, touch unrelated files and lose context between sessions.

**Decision:** All agents follow `AI_AGENT_RULES.md`. Nothing is written to `main` directly; every change goes through a pull request reviewed by a human using `docs/REVIEW_CHECKLIST.md`.

**Alternatives considered:** Prompting each tool individually (inconsistent, not versioned); no rules (fast until something breaks).

**Consequences:** Slightly slower merges, much easier rollbacks and reviews. Branch protection on `main` should enforce this.
