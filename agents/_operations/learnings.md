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

**Repo (same day):** Added **`agents/_config/clients/`** client profile JSON (default profile is **`sample.json`** today), **`agents/_config/README.md`**, and **`agents/_config/client.schema.json`**. Wired **`agents/figma-sync/.agent.md`** (“Before doing anything”, Step 2, Figma MCP) and root **`README.md`** / **`docs/architecture.md`** / **`docs/TASKS.md`** to treat client JSON as source of truth; optional env overrides documented in `_config/README.md`.

### 2026-03-26 — figma-sync (MCP)

**Client:** [`agents/_config/clients/sample.json`](../_config/clients/sample.json) — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, node `138:3677` (Buttons section).

**Readiness:** READY — same as prior entry; large frame → used sub-nodes for `get_design_context`.

**Step 2 — tokens:** `get_variable_defs` (138:3677). Updated **`app/src/index.css`**: `--radius-control-small` **4px** (Figma **Radius/Control Small**); **`--shadow-button`** from **Shadows/Button**. **`tokenManifest.ts`**: Elevation group for `--shadow-button`.

**Button:** `get_design_context` on `138:4113` (solid default), `138:4194` (solid hover), `1583:4641` (solid pressed), `138:4116` (white default). Figma solid **hover/pressed** keep **UI/Action** fill and add **Shadows/Button** — not a darker blue. **`Button.tsx`** solid style: `hover` / `active` use `shadow-[var(--shadow-button)]`; removed prior `brightness` active tweak on the base button class list.

**Other components:** No TSX edits (Link, IconButton, StackedButton, LoginButton, Dropdown).

**Validate locally (from `app/`):** `npm run typecheck`, `npm test`, `npm run build-storybook`.

### 2026-03-26 — clear-stories + figma-sync (regenerate stories)

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Clear:** Removed all `app/src/**/*.stories.*` (same outcome as `npm run clear-stories` / `node ./scripts/clear-stories.mjs`).

**Agent run:** Read **`agents/_skills/design-foundations/references/BUTTONS_SPEC.md`**. **Step 1** READY. **Step 2** `get_variable_defs` + `get_design_context` (`138:4113`) — tokens and **`Button.tsx`** already aligned; **no** `index.css` / component TSX changes. **Regenerated** co-located stories: **`Theme.stories.tsx`**, **`Button.stories.tsx`** (Examples, Default, Loading, Disabled), **`Link`**, **`IconButton`**, **`StackedButton`**, **`LoginButton`**, **`Dropdown`**.

**Validate (from `app/`):** `npm run typecheck`, `npm test`, `npm run build-storybook`.

### 2026-03-31 — figma-sync (restore stories after clear)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — Buttons frame metadata confirms Auto Layout variant sets across `Size`, `Style`, `Icon`, and `State`; names are explicit and consistent for sync.

**Step 2 — tokens:** `get_variable_defs` (`138:3677`) returned expected token defs (e.g., `UI/Action`, `Text/Link`, `Radius/Control Large|Medium|Small`, `Shadows/Button`, `Opacity/Disabled`). No token file changes required for this run.

**Components synced:** Story artifacts restored:
- `app/src/foundations/Theme.stories.tsx`
- `app/src/components/Button.stories.tsx`

**Story structure applied:** `Design System/Button` named stories now follow `Styles` → `Sizes` → `Icon` → `State` to match Figma controls flow; controls use labels `Style`, `Size`, `Icon`, `State`, `Label Text`.

**Components skipped (no TSX diff):** `Button.tsx` (already aligned with `state` + variant props model).

**What failed and why:** Existing running Storybook process started before stories were regenerated and initially logged “No story files found.” Restart Storybook to refresh discovery if stories do not appear immediately.

**Proposed rules:** None (run followed current canonical `figma-sync` + Buttons spec updates).

### 2026-03-31 — figma-sync (control story coverage pass)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — metadata for `138:3677` confirms named variant sets across Buttons, Links, Icon Buttons, Stacked Buttons, Login Buttons, and Dropdown Buttons.

**Step 2 — tokens:** `get_variable_defs` (`138:3677`) returned the expected token families (action, text, radius, shadow, opacity, control stroke). No token-file edits required for this pass.

**Components synced:** Story artifacts regenerated to satisfy required control coverage:
- `app/src/components/IconButton.stories.tsx`
- `app/src/components/StackedButton.stories.tsx`
- `app/src/components/LoginButton.stories.tsx`
- `app/src/components/Dropdown.stories.tsx`

**Story structure applied:** Canonical named-story order restored per control:
- `IconButton`: `Styles` → `Sizes` → `State` → `All Combinations`
- `StackedButton`: `Styles` → `State` → `All Combinations`
- `LoginButton`: `Provider` → `State` → `All Combinations`
- `Dropdown`: `Sizes` → `Variant` → `State` → `All Combinations`

**Components skipped (no TSX diff):** `IconButton.tsx`, `StackedButton.tsx`, `LoginButton.tsx`, `Dropdown.tsx` (implementation already aligned for this run).

**Validation:** IDE lint check passed for the four regenerated story files. Runtime checks (`npm run typecheck`, `npm test`, `npm run build-storybook`) still need to run in a Node-enabled shell.

**Proposed rules:** None.

### 2026-03-31 — figma-sync (token-first verification run)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — metadata still shows complete variant coverage and named state matrices across control families.

**Step 2 — tokens:** `get_variable_defs` (`138:3677`) returned the same variable families used by current components (`UI/Action`, `Text/Link`, radius, shadows, opacity, field stroke). Token-first mapping remains intact for this checkout; no token changes needed.

**Diffing result:** No material design drift detected from sampled design context (`138:4113`) vs current artifacts.

**Components synced:** None.

**Components skipped (no diff):** `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown` stories and TSX modules.

**Validation:** Runtime commands still require a Node-enabled shell (`app/`: `npm run typecheck`, `npm test`, `npm run build-storybook`).

**Proposed rules:** None.

### 2026-03-31 — variables catalog automation wiring

**Goal:** Keep Storybook Variables docs synced from Figma variable defs during figma-sync runs.

**Changes made:**
- Added `app/src/foundations/variableManifest.ts` generation-friendly structure with:
  - latest `get_variable_defs` seed map,
  - Figma-to-token mapping table,
  - automatic collection classification (`Brand`, `System Colors`, `Theme`, `Responsive`, `Base Sizes`).
- Added `Foundations/Variables` docs surface (`VariablesCatalog.tsx`, `Variables.stories.tsx`).
- Updated `agents/figma-sync/.agent.md` Step 2 + Active target to require refreshing `variableManifest.ts` before component generation.

**Outcome:** Designers can review variable inventory and mapping status directly in Storybook; future sync runs now include manifest refresh as a required token-first step.

### 2026-03-31 — figma-sync (no-diff run)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — control families and variant/state naming remain complete at source frame level.

**Step 2 — tokens and variables:** `get_variable_defs` (`138:3677`) returned the same definitions used by current token mapping and `variableManifest.ts`. No token or variable catalog updates required this run.

**Diffing result:** Sampled design context (`138:4113`) matches current component direction. No component/story regeneration needed.

**Components synced:** None.

**Components skipped (no diff):** `Foundations/Variables`, `Foundations/Theme`, `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown`.

### 2026-03-31 — figma-sync (docs-surface + validation pass)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — frame metadata still shows complete variant/state sets with named controls for Buttons and related families.

**Step 2 — tokens and variables:** `get_variable_defs` (`138:3677`) returned the same token families already mapped in `index.css` and `variableManifest.ts`. No token changes were required this run.

**Components synced:** `Button` docs/stories only:
- retained focused docs page (`Title`, `Description`, `Primary`, `Controls`, `Examples`) while keeping `All Combinations` out of Docs.
- improved per-cell implementation discoverability in `All Combinations` using inline show/hide code disclosure.
- hid the docs `Control` column globally in `app/.storybook/preview.css` for library-facing docs readability.

**What failed and why:** Initial validation failed due to a Storybook docs import path mismatch (`@storybook/blocks` not present in this setup). Fixed by switching to `@storybook/addon-docs/blocks`.

**Validation (from `app/`):** Passed `npm run typecheck`, `npm test`, and `npm run build-storybook`.

**Proposed rules:** None.

### 2026-03-31 — figma-sync (post-Theme-removal check)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — control families and variant/state naming remain stable.

**Step 2 — tokens and variables:** `get_variable_defs` (`138:3677`) returned the expected variable set used by the current Variables-only foundations surface. No new token or manifest updates needed.

**Diffing result:** Sampled design context (`138:4113`) shows no drift vs current implementation.

**Components synced:** None.

**Components skipped (no diff):** `Foundations/Variables`, `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown`.

### 2026-03-31 — figma-sync (post-story-restore verification)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — frame metadata still contains all expected control families and named variants.

**Step 2 — tokens and variables:** Variable defs unchanged vs prior run; token-first mapping remains consistent.

**Stories check:** Required story files present at run start: `Foundations/Variables`, `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown`.

**Diffing result:** No material design drift from sampled design context (`138:4113`) and no additional regeneration required.

### 2026-03-31 — figma-sync (mode-ready variables check)

**Active target:** React + Storybook (`app/`), Vite.

**Client:** `sample` — `fileKey` `h7IRa1i2N5ucusuhqIhCTJ`, `buttonsFrame` `138:3677`.

**Readiness:** READY — variant/state sets remain stable across control families.

**Step 2 — tokens and variables:** Variable defs returned successfully for the sync node and match current mode-ready variable manifest inputs. MCP still returns single-value defs for this node (no explicit dark-mode values in payload), so no additional dark-value rows were populated this run.

**Diffing result:** No material drift in sampled design context (`138:4113`) vs current code/story outputs.

**Components synced:** None.

**Components skipped (no diff):** `Foundations/Variables`, `Foundations/Theme`, `Button`, `Link`, `IconButton`, `StackedButton`, `LoginButton`, `Dropdown`.
