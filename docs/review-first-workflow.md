# Review-First Workflow

The review-first workflow is the practical trust boundary in Founder Repo OS.

```text
Customer chooses an authorized repository
            |
            v
Read-only repository understanding
            |
            v
Repository-specific setup plan
            |
            v
Full diff and conflict review
            |
            v
Dedicated branch and Draft Pull Request
            |
            v
Customer-controlled review and merge
```

## Full diff before the decision

The customer should be able to inspect the proposed repository files before approving the next step. Existing files and conflicts require an explicit review path; they are not treated as invisible implementation details.

## Draft Pull Request, not blind merge

A Draft Pull Request makes the proposed change visible in the customer repository. It supports normal GitHub review practices and keeps the final merge decision with the repository owner.

## No direct write to the default branch

Founder Repo OS is designed around a dedicated branch and a customer-controlled merge decision. The operating model does not rely on direct, unreviewed changes to the default branch.

## What this does not mean

Review-first workflows do not replace a customer's own security review, legal review, testing, deployment controls, or GitHub administration. Customers remain responsible for deciding whether a proposed change is appropriate for their repository.
