# Operations folder (template reference)

**Copy nothing from this file into the repo.** It documents the intended layout of **`agents/_operations/`** next to **`agents/_skills/`** and **`agents/__templates/`**.

## Folder: `agents/_operations/`

| File / folder | Purpose |
|----------------|--------|
| **`README.md`** | Explains the folder; points to each file below. |
| **`learnings.md`** | Append-only **run log** — feedback after each sync (synced / skipped / blocked, quirks, failures). |
| **`proposed-rules.md`** | **Suggested instruction changes** — PENDING REVIEW until promoted to **`agents/figma-sync/.agent.md`**. |
| **`client-quirks/`** | Optional **`{client}.md`** — **one-client-only** notes; not universal rules. |

## Relationship to agents

- **Canonical procedure:** `agents/<name>/.agent.md` (e.g. **`figma-sync`**).
- **`_operations/`:** Feedback loop and suggested changes — **does not replace** the agent file.

When you add a new long-running agent that needs the same pattern, create **`agents/_operations/`** only if you need these logs; otherwise omit the folder.

---

See live copy: [`../_operations/README.md`](../_operations/README.md).
