---
name: design-foundations
description: Cross-target design principles (tokens, component model, a11y outcomes, docs surface). Use for any Storybook target before stack-specific styling skills.
---

# Design foundations

## When to Use

- Any Figma → Storybook generation or review, before applying a **stack-specific** skill (e.g. React + Tailwind).

## Other skills & integration

- **Runs after:** **None** — usually **first** in a target **Skill chain** (cross-target layer before stack-specific skills).
- **Runs before / pairs with:** **`storybook-react`**, **`design-react-tailwind`**, and other stack skills listed **after** this one in the same chain.
- **Does not replace:** **`figma-readiness`** / **`figma-sync-universal`** (process), or **`agents/figma-sync/.agent.md`** **Active target** (paths, validation).

## Instructions

1. Read **`references/FOUNDATIONS.md`** — framework-agnostic rules.
2. Optionally skim **`references/DESIGN_SYSTEM_GUIDELINES.md`** for how this repo splits foundations vs per-stack docs.

## Repo references

- **`references/FOUNDATIONS.md`**, **`references/DESIGN_SYSTEM_GUIDELINES.md`**
- Stack-specific detail: sibling skills (e.g. **`../design-react-tailwind/references/react-tailwind.md`**).

## Do not

- Assume a specific renderer here — that belongs in **`agents/figma-sync/.agent.md`** (**Active target**) and the stack skill.

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
