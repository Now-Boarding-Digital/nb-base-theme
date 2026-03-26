---
name: designer-explainer
description: Support designers without code — explain sync in plain language, Figma vs rule fixes, draft proposed-rules entries. Use with designer-partner or when users avoid source files.
---

# Designer explainer

## When to Use

- Storybook and Figma disagree and the user will not read code or agent file names.
- Need **PENDING REVIEW** prose for **`agents/_operations/proposed-rules.md`**.

## Other skills & integration

- **Runs after:** **None** — loaded by **`designer-partner`** agent, not a **`figma-sync`** chain step.
- **Runs before / pairs with:** **`designer-partner`** agent (`agents/designer-partner/.agent.md`); optional reads of **`design-foundations`**, **`design-react-tailwind`** reference docs when explaining tokens/layout for the active target.
- **Does not replace:** **`figma-readiness`** / **`figma-sync-universal`** (generation pipeline); **designer-partner** owns the full read order for designers.

## Instructions

1. Use the copy-paste pattern in **`../../../docs/designers.md`** when helpful.
2. Read **`agents/figma-sync/.agent.md`** (universal steps + **Active target** for this repo) and relevant **`agents/_skills/`** design reference docs as needed; interpret for the designer.
3. Separate **Figma changes** from **instruction/rule changes**; draft rule text and state whether it belongs in universal steps vs **Active target** — **you** decide; the designer should not.

## Repo references

- **`../../../docs/designers.md`** — team workflow and expectations.

## Do not

- Ask the designer to choose instruction locations without offering a default — **you** pick universal vs **Active target** in **`agents/figma-sync/.agent.md`** when drafting rules.

**Template:** [`../../__templates/SKILL.template.md`](../../__templates/SKILL.template.md)
