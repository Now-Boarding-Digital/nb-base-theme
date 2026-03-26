# Run learnings

## Purpose of this file

**Append-only feedback log** after Figma → Storybook sync runs. Use it to record what happened (components synced, skipped, or blocked), Figma quirks, validation failures, and **ideas** for permanent instruction updates.

**This is not canonical sync behavior.** The live runbook is **`agents/figma-sync/.agent.md`**. If a run suggests a **lasting rule change**, also add a **PENDING REVIEW** block to [`proposed-rules.md`](proposed-rules.md) (or promote straight into the agent file after human review).

---

The **`figma-sync`** agent reads this file at the start of a run and appends **dated entries** after each sync. Note which **Active target** applied if relevant.

## Format for new entries

```markdown
### YYYY-MM-DD

**Components synced:** …
**Components skipped (no change):** …
**Components blocked:** … (with reasons)
**Figma quirks encountered:** …
**What failed and why:** …
**Proposed rules:** … (also add to proposed-rules.md if needed)
```

---

<!-- Agent appends below this line -->

### 2026-03-26

**Active target:** React + Storybook (`app/`), Vite.

**Figma:** `h7IRa1i2N5ucusuhqIhCTJ`, node `138:3677` (frame “Buttons” — section covers Buttons, Links, Icon Buttons, Stacked Buttons, Login Buttons, Dropdown Buttons).

**Readiness:** READY — Auto Layout component sets, named variants (Size/Style/Icon/State), tokens referenced in generated snippets.

**Components synced:** `Button` — added `--color-focus-ring` and `focus-visible` outline + `enabled:active` brightness to align with Figma “Focussed” / pressed feedback; co-located `Button.stories.tsx` restored. **Stories recreated** (previously removed by `clear-stories`): `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown` — all under `app/src/components/*.stories.tsx`.

**Components skipped (no TSX diff):** `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown` — implementation already matched spec; only stories + Button a11y/focus polish.

**Figma quirks encountered:** `get_design_context` on `138:3677` or inner `138:3679` returns sparse metadata when the node is too large; used single-variant nodes (e.g. `138:4113`, `1584:5315`) for code + focus treatment. MCP `use_figma` previously aborted in-session — node id from user unblocked.

**What failed and why:** Could not run `npm run typecheck`, `npm test`, or `npm run build-storybook` in this environment (`node` not available on PATH). **Run locally from `app/`** to validate.

**Proposed rules:** None.
