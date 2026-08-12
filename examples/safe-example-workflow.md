# Safe Example Workflow

This synthetic example shows the shape of a review-first repository change. It is not a product export or an installation guide for a real customer repository.

## Scenario

A small product team wants clearer AI-agent rules and a repeatable pull request workflow for an existing internal repository.

## Review path

1. The repository owner selects the authorized repository.
2. The team describes its stack, AI tools, review expectations, and repository state.
3. A repository-specific plan proposes files such as a project README, agent guidance, a pull request template, and a safety check.
4. The owner inspects the complete proposed diff.
5. Existing-file conflicts are surfaced for an explicit customer decision.
6. After confirmation, a dedicated branch and Draft Pull Request are prepared.
7. The team reviews the Draft Pull Request and chooses whether to merge.

## Simplified illustrative diff

```diff
+ # Agent operating rules
+
+ - Read the repository before proposing changes.
+ - Use focused branches and pull requests.
+ - Keep secrets and private data outside Git.
+ - Ask for explicit owner approval before external actions.
```

The illustration shows a reviewable change pattern only. It is not a promise of a specific file set, compatibility result, or security outcome.
