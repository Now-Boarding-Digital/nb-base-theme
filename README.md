# styleguidehero

**Figma → Storybook** — pull design context from Figma, generate components and stories, review in Storybook (or Chromatic).

**Walkthrough:** [`docs/WORKFLOW.md`](docs/WORKFLOW.md). **Architecture:** [`docs/architecture.md`](docs/architecture.md). **Agents:** [`agents/`](agents/) (`_skills/`, `_operations/`, `__templates/`, agent definitions).

This **README** stays **high level**: what the pipeline does, how a sync run fits together, and **where** to read details. The **full sync procedure** (universal steps + this repo’s React/Storybook target) lives in **[`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md)**; deeper token/layout norms live under **`agents/_skills/`** (`references/`) and the **`app/`** tree — not here.

---

## How a run works

1. **Figma** — design file URL is listed below; the sync reads it via Figma MCP (see [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md) for readiness and MCP usage).
2. **Sync** — use the **`figma-sync`** agent: [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md). That file is the **single runbook** (readiness → universal steps → **Active target** + skill chain).
3. **Validate** — run the **build / Storybook / test** commands **named in [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md)** (**Active target**), including which project directory to `cd` into. Those scripts are the source of truth, not this README.
4. **Improve the pipeline** — one-off learnings go to [`agents/_operations/learnings.md`](agents/_operations/learnings.md). Ideas for **lasting** rule changes go to [`agents/_operations/proposed-rules.md`](agents/_operations/proposed-rules.md) for review, then get promoted into **`agents/figma-sync/.agent.md`** (see [`docs/architecture.md`](docs/architecture.md)).

**Cursor:** skills live under [`agents/_skills/`](agents/_skills/); Cursor also picks them up via [`.cursor/skills`](.cursor/README.md) → `agents/_skills`.

---

## What you maintain

| Location | Purpose |
|----------|---------|
| **`agents/`** | Agent definitions (`<name>/.agent.md`), [`agents/_skills/`](agents/_skills/), [`agents/_operations/`](agents/_operations/) (feedback log, proposed rule inbox, client quirks), [`agents/__templates/`](agents/__templates/) |

**Editor-only:** [`.claude/README.md`](.claude/README.md), [`.cursor/README.md`](.cursor/README.md).

---

## Doc map

| Concern | Where |
|--------|--------|
| End-to-end flow | [`docs/WORKFLOW.md`](docs/WORKFLOW.md) |
| Pipeline depth (MCP, tiers, how rules promote) | [`docs/architecture.md`](docs/architecture.md) |
| **Figma → Storybook sync** (full procedure + default React target) | [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md) |
| **Feedback & suggested rule changes** (what this folder is for) | [`agents/_operations/README.md`](agents/_operations/README.md) |
| Design conventions | [`agents/_skills/design-foundations/`](agents/_skills/design-foundations/) (cross-target) + stack skills (e.g. [`design-react-tailwind/`](agents/_skills/design-react-tailwind/)) |
| Designers (review without code) | [`docs/designers.md`](docs/designers.md) |
| New agent / skill templates | [`agents/__templates/`](agents/__templates/) |
| **Backlog / planned repo changes** | [`docs/TASKS.md`](docs/TASKS.md) |

**Agent definitions** — only under **`agents/<name>/.agent.md`** (same shape as [`agents/__templates/AGENT.template.md`](agents/__templates/AGENT.template.md)). In Claude Code, @‑mention that path.

| Agent | Definition |
|-------|------------|
| `figma-sync` | [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md) |
| `designer-partner` | [`agents/designer-partner/.agent.md`](agents/designer-partner/.agent.md) |

---

## Figma file

URL: `https://www.figma.com/design/h7IRa1i2N5ucusuhqIhCTJ/` (Now Boarding Design System Kit — update per client).

**Future:** This should become **dynamic** (config, env, or client profile) so the file URL is not hard-coded here. Tracked in [`docs/TASKS.md`](docs/TASKS.md).

---

## Rules, learnings, and client quirks

| Purpose | Path |
|---------|------|
| Canonical sync instructions | [`agents/figma-sync/.agent.md`](agents/figma-sync/.agent.md) |
| Run log (append only) | [`agents/_operations/learnings.md`](agents/_operations/learnings.md) |
| **Proposed rules** (pending review → promote into `figma-sync` agent) | [`agents/_operations/proposed-rules.md`](agents/_operations/proposed-rules.md) |
| Per-client quirks | [`agents/_operations/client-quirks/`](agents/_operations/client-quirks/) (add `{client}.md` beside `.gitkeep`) |

---

## More

**Designer ↔ engineer loop:** [`docs/designers.md`](docs/designers.md).
