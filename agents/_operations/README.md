# `agents/_operations/`

**Purpose of this folder:** Hold **feedback and suggested changes** around the Figma → Storybook pipeline — **not** the canonical “how to sync” instructions. Those live in **`agents/figma-sync/.agent.md`**.

| Path | Role |
|------|------|
| [`learnings.md`](learnings.md) | **Append-only run log** after syncs — what was synced, skipped, blocked, Figma quirks, failures. |
| [`proposed-rules.md`](proposed-rules.md) | **Inbox for instruction changes** — append **PENDING REVIEW** text; humans promote into **`agents/figma-sync/.agent.md`**. |
| [`client-quirks/`](client-quirks/) | Optional **`{client}.md`** for **one-client-only** constraints (not universal rules). |

**Naming:** Underscore prefix matches **`agents/_skills/`** — shared “support” material next to agent definitions.

**Template:** [`../__templates/OPERATIONS.md`](../__templates/OPERATIONS.md).
