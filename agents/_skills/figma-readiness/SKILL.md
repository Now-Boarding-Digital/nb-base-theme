---
name: figma-readiness
description: Evaluate Figma components before code generation (Auto Layout, names, variables, text styles, variants). Use when starting figma-sync or explaining BLOCKED vs READY.
---

# Figma readiness

## When to Use

- Before generating or updating any component from Figma.
- When triaging why a component was not synced (confirm it was not BLOCKED for readiness reasons).

## Other skills & integration

- **Runs after:** **None** — first gate in **`figma-sync`** (before universal sync steps).
- **Runs before / pairs with:** **`figma-sync-universal`** (next in agent read order); then the **Active target** skill chain in **`agents/figma-sync/.agent.md`**.
- **Does not replace:** **`agents/figma-sync/.agent.md`** (it *implements* **Step 1 — Readiness** there); does not perform diffing or generation (later steps).

## Instructions

1. Open **`agents/figma-sync/.agent.md`** and follow **Step 1 — Readiness evaluation** only — required checks, optional gates, warnings, and report format.
2. Emit the **READY / BLOCKED** report **before** writing or overwriting files.
3. Do not generate artifacts for any **BLOCKED** component until blockers are resolved in Figma or policy.

## Repo references

- **`agents/figma-sync/.agent.md`** — Step 1 (required checks, warnings, READY/BLOCKED format).

## Do not

- Treat optional Figma “Ready for dev” status as mandatory unless the team has adopted it.

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
