---
name: figma-sync-universal
description: Framework-agnostic sync after readiness — diffing, generation rules, story goals, validation, learnings, MCP. Use after figma-readiness; stack skills follow from the Active target section in agents/figma-sync/.agent.md.
---

# Figma sync — universal process

## When to Use

- After readiness passes, for **any** Storybook target (not only React).
- When explaining how sync works without naming a specific framework.

## Other skills & integration

- **Runs after:** **`figma-readiness`** (READY/BLOCKED gate).
- **Pairs with Step 2 in `agents/figma-sync/.agent.md`:** **Variables & tokens** — fetch Figma variables and reconcile the repo token file **before** diffing/generating components (see that file’s **Step 2**).
- **Runs before / pairs with:** Skills **named in the Active target** section of **`agents/figma-sync/.agent.md`** (e.g. `design-foundations`, `storybook-react`, …) — **`figma-sync`** loads those **after** this universal pass.
- **Does not replace:** Stack-specific skills; file layout and story API come from that **Active target** section + chain, not this skill.

## Instructions

1. Read **`agents/figma-sync/.agent.md`** **Steps 2–8** — variables/tokens **before** components, diffing, delegation to the **Active target** section, story expectations, validation, post-run `learnings` / `proposed-rules`, Figma MCP notes.
2. Do **not** assume React; file layout and story API come from the **Active target** section in that file (and **`README.md`** for repo entry).
3. Prefer structured Figma MCP output over guessing from screenshots.

## Repo references

- **`agents/figma-sync/.agent.md`** — Steps 2–8 and full universal spec.

## Do not

- Regenerate files when diffing shows no material change; preserve `// MANUAL` (or equivalent) per **Active target** in **`agents/figma-sync/.agent.md`**.

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
