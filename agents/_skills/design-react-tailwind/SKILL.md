---
name: design-react-tailwind
description: React + Tailwind + CSS-variable conventions for app/ — variant props, shared icons, tokens, demos, a11y. Use when implementing or reviewing generated UI with Tailwind and design tokens.
---

# Design conventions (React + Tailwind)

## When to Use

- Generating or editing components under **`app/`** with Tailwind and **`var(--*)`** tokens.
- Explaining font, spacing, radius, or color mismatches vs Figma for this stack.

## Other skills & integration

- **Runs after:** **`design-foundations`** (cross-target principles); **`storybook-react`** when the target **Skill chain** uses the default order (`design-foundations` → `storybook-react` → `design-react-tailwind`). **`../design-foundations/references/FOUNDATIONS.md`** must already be in scope.
- **Runs before / pairs with:** None required — often **last** in the design slice of the chain.
- **Does not replace:** **`storybook-react`** (paths, CSF3) or the **`agents/figma-sync/.agent.md`** **Active target** section.

## Instructions

1. Apply **`references/react-tailwind.md`** — class maps, icons, a11y, tokens.
2. For story titles and file naming, follow **`storybook-react`** / target doc, not this skill alone.

## Repo references

- **`references/react-tailwind.md`** (this folder)
- Cross-target: **`../design-foundations/references/FOUNDATIONS.md`**

## Do not

- Hardcode colors or spacing when a token already exists in **`app/src/index.css`** (flag additions instead).

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
