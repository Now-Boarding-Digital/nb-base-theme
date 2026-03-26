---
name: storybook-react
description: Emit and validate React + Storybook artifacts under app/ — paths, TSX, CSF3 stories, npm scripts, optional Code Connect. Bundler (e.g. Vite) is an app detail. Use when README / figma-sync agent Active target applies or when editing those components.
---

# Emit Storybook (React)

## When to Use

- **`README.md`** and **`agents/figma-sync/.agent.md`** describe this repo’s React + Storybook target (see **Active target** section).
- Creating or refactoring **`app/src/components/*.tsx`** and **`*.stories.tsx`** from Figma.

## Other skills & integration

- **Runs after:** **`design-foundations`** when both appear in the default **Skill chain** (`design-foundations` → `storybook-react` → `design-react-tailwind`).
- **Runs before / pairs with:** **`design-react-tailwind`** (Tailwind/tokens detail) when listed next in the chain.
- **Does not replace:** **`design-foundations`** (principles) or **`design-react-tailwind`** (stack styling); **`agents/figma-sync/.agent.md`** (**Active target**) remains the source of truth for paths and npm scripts.

## Instructions

1. Read **`agents/figma-sync/.agent.md`** — **Active target — React + Storybook (`app/`)** — artifact paths, TypeScript rules, CSF3 example, validation commands.
2. Other skills in the **Active target** skill chain run in that order — apply them for tokens and component shape when listed.
3. Run **`npm`** scripts from **`app/`** exactly as that section lists.

## Repo references

- **`agents/figma-sync/.agent.md`** — **Active target** section (full target spec).

## Do not

- Change the active target’s file layout without updating **`README.md`** and this skill together.

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
