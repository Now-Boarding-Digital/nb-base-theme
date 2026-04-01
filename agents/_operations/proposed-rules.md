# Proposed rule additions

## Purpose of this file

**Inbox for suggested instruction changes** before they are merged into the canonical agent. Anyone may append **PENDING REVIEW** blocks. A **human** reviews, then copies approved wording into **`agents/figma-sync/.agent.md`** (universal steps vs **Active target** section) and updates status here. Rejected items should be marked **REJECTED** with a short reason.

**This is not the live runbook.** Do not treat this file as the source of truth for `figma-sync` behavior until text is promoted. On approval, copy into **`agents/figma-sync/.agent.md`** — either universal steps (Steps 1–7, Figma MCP, permissions) or the **Active target** section (stack-specific).

## Format for agent proposals

```markdown
## YYYY-MM-DD — proposed after run

**Problem:** …
**Proposed addition to (universal steps vs Active target — specify):**
> …exact rule text…
**Status:** PENDING REVIEW
---
```

---

<!-- Agent appends PENDING REVIEW blocks below -->

## 2026-03-31 — proposed after run

**Problem:** Sync runs can finish with partial story regeneration, inconsistent state naming from Figma variants, and uneven coverage across control components. This increases regression risk before packaging.

**Proposed addition to (Active target — React + Storybook):**
> When stories are cleared or missing, regenerate the required controls surface before ending the run: `Foundations/Theme`, `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown`.  
>  
> Enforce a minimum artifact checklist per synced component family: component module, story module with canonical order, a11y baseline, and explicit synced/skipped/blocked report entry.  
>  
> Normalize Figma state labels to code-facing enums (`Default`, `Hover`, `Disabled`, `Loading`, `Pressed/Active`, `Focused/Focussed`) and document any unimplemented states rather than silently dropping them.  
>  
> Keep token-first enforcement strict: do not introduce new raw color literals in component code when a token exists; document any unavoidable literals and propose token follow-up.

**Status:** PENDING REVIEW
---
