---
name: my-skill
description: Short description of what this skill does and when to use it (shown to the agent for relevance).
---

# My Skill

One or two sentences on scope and how agents should use this skill.

## When to Use

- Use this skill when …
- Helpful when …

## Other skills & integration

**Declare how this skill relates to other skills** so agents and humans know composition without guessing.

| | Fill in |
|---|--------|
| **Runs after** | Other `agents/_skills/<name>/` skills that should already be in context (e.g. listed earlier in **`figma-sync`** **Active target** skill chain). Write **None** if this skill stands alone. |
| **Runs before / pairs with** | Skills or workflows that often come next or complement this one (optional). |
| **Does not replace** | Call out skills this is *not* a substitute for (optional). |

Example (adapt or delete rows you do not need):

- **Runs after:** `design-foundations` (when both appear in the same Skill chain).
- **Pairs with:** `storybook-react` on the same target; same PR review flow.
- **Does not replace:** Universal rules in `agents/figma-sync/.agent.md`.

If there are **no** cross-skill dependencies, say so explicitly: **None — this skill is self-contained.**

## How it works (optional)

Use for multi-mode or phased behavior (numbered steps, modes, or outputs). Keep **`SKILL.md`** scannable; move long tables and thresholds into **`references/`**.

1. …
2. …

## Instructions

- Step-by-step guidance tied to this repo (paths, commands, conventions).
- Keep this file focused; put long reference material in **`references/*.md`** inside this skill folder.

## Repo references (optional)

- Point to **`references/…`** in this folder for normative detail.
- Point to **`agents/figma-sync/.agent.md`** (canonical sync) or **`agents/_operations/…`** (feedback / proposed rules) when this skill defers to those docs (name the path).

---

**Layout:** Folder name **must match** `name` in frontmatter. Entry file **`SKILL.md`**. Optional: **`references/`** for long specs; **`scripts/`**, **`assets/`** per [Cursor Agent Skills](https://cursor.com/docs/skills). Optional frontmatter: `license`, `compatibility`, `metadata`, `disable-model-invocation` — see [Cursor docs](https://cursor.com/docs/skills). Copy this file to **`agents/_skills/<name>/SKILL.md`**.

**Note:** **Other skills & integration** is about **which skills** this one coordinates with. The **`references/`** folder is for **long markdown** inside *this* skill — do not confuse the two.
