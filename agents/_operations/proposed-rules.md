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

## 2026-04-01 — proposed after run

**Problem:** Component role tokens can drift into value-labeled names (for example, `...-grey-...`), which couples component contracts to appearance values and weakens cross-client reuse.

**Proposed addition to (universal steps + Active target — React + Storybook):**
> Enforce **property-based component slot naming** in component code.  
>  
> Component-consumed slot tokens must describe the CSS role (`bg`, `text`, `border`, `hover-bg`, `hover-border`, `focus-ring`, etc.), not value labels (`grey`, `blue`, `white`, brand names).  
>  
> Variant/state decisions may assign these property slots, but component render classes should consume the generic property slots only.  
>  
> Keep traceability chain explicit: `Figma variable -> canonical token -> component property slot`.

**Status:** PENDING REVIEW
---

## 2026-04-01 — proposed after run

**Problem:** Client syncs can still regenerate components with direct generic color tokens, making cross-client behavior drift and reducing traceability when designers ask why a value changed.

**Proposed addition to (universal steps + Active target — React + Storybook):**
> Enforce a **component role-token contract** for all design-system components.  
>  
> Mapping chain must be explicit and preserved: `Figma variable -> canonical token (variableManifest) -> component role token (index.css) -> component usage (*.tsx)`.  
>  
> Component modules must consume role tokens only for color/shadow/opacity concerns (for example, `--color-button-*`, `--color-field-*`), not direct generic tokens.  
>  
> Add/maintain automated checks in validation (`npm run lint:tokens`) to fail when a component uses non-role color/shadow/opacity tokens directly.

**Status:** PENDING REVIEW
---

## 2026-04-01 — proposed after run

**Problem:** Components can be implemented from a partial interpretation of Figma, causing missing behavior variants (for example, missing `type=prefix/suffix` in text inputs) and incomplete `All Combinations` coverage.

**Proposed addition to (universal steps + Active target — React + Storybook):**
> Add a required pre-build gate named **Variation Matrix First**.  
>  
> Before writing or editing any component TSX/stories, extract every control from Figma's "Explore component behaviour" (or equivalent controls panel), normalize them into code axes (e.g. `size`, `style`, `state`, `type`, `icon`), and record all allowed values.  
>  
> Require a matrix artifact per component family (`axis`, `values`, `default`, `story coverage target`, `token dependency`). If any Figma control/value is not implemented, mark it explicitly as deferred with reason and follow-up.  
>  
> Block implementation when matrix coverage is incomplete or ambiguous.  
>  
> Storybook policy must then mirror the matrix: one interactive `Playground`, focused axis stories, and one `All Combinations` matrix that includes all non-deferred values and appears last in component ordering.

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
