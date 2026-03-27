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

**Repo (same day):** Added **`agents/_config/clients/now-boarding.json`** (canonical `fileKey`, `fileUrl`, `figma.nodes.buttonsFrame`), **`agents/_config/README.md`**, and **`agents/_config/client.schema.json`**. Wired **`agents/figma-sync/.agent.md`** (“Before doing anything”, Step 2, Figma MCP) and root **`README.md`** / **`docs/architecture.md`** / **`docs/TASKS.md`** to treat client JSON as source of truth; optional env overrides documented in `_config/README.md`.

### 2026-03-26 — Now Boarding figma-sync (MCP)

**Client:** [`agents/_config/clients/now-boarding.json`](../_config/clients/now-boarding.json) — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, node `138:3677` (Buttons section).

**Readiness:** READY — same as prior entry; large frame → used sub-nodes for `get_design_context`.

**Step 2 — tokens:** `get_variable_defs` (138:3677). Updated **`app/src/index.css`**: `--radius-control-small` **4px** (Figma **Radius/Control Small**); **`--shadow-button`** from **Shadows/Button**. **`tokenManifest.ts`**: Elevation group for `--shadow-button`.

**Button:** `get_design_context` on `138:4113` (solid default), `138:4194` (solid hover), `1583:4641` (solid pressed), `138:4116` (white default). Figma solid **hover/pressed** keep **UI/Action** fill and add **Shadows/Button** — not a darker blue. **`Button.tsx`** solid style: `hover` / `active` use `shadow-[var(--shadow-button)]`; removed prior `brightness` active tweak on the base button class list.

**Other components:** No TSX edits (Link, IconButton, StackedButton, LoginButton, Dropdown).

**Validate locally (from `app/`):** `npm run typecheck`, `npm test`, `npm run build-storybook`.

### 2026-03-26 — clear-stories + figma-sync (regenerate stories)

**Client:** Now Boarding — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Clear:** Removed all `app/src/**/*.stories.*` (same outcome as `npm run clear-stories` / `node ./scripts/clear-stories.mjs`).

**Agent run:** Read **`agents/_skills/design-foundations/references/BUTTONS_SPEC.md`**. **Step 1** READY. **Step 2** `get_variable_defs` + `get_design_context` (`138:4113`) — tokens and **`Button.tsx`** already aligned; **no** `index.css` / component TSX changes. **Regenerated** co-located stories: **`Theme.stories.tsx`**, **`Button.stories.tsx`** (Examples, Default, Loading, Disabled), **`Link`**, **`IconButton`**, **`StackedButton`**, **`LoginButton`**, **`Dropdown`**.

**Validate (from `app/`):** `npm run typecheck`, `npm test`, `npm run build-storybook`.
