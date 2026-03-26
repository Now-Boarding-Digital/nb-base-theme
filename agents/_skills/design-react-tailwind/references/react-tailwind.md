# Target: React + Tailwind + CSS variables

Conventions for **this repository’s default stack**: React, Tailwind, design tokens as CSS custom properties. Other stacks should get their own skill under `agents/_skills/`.

**Pipeline / Figma workflow** (readiness, MCP, diffing) lives in [`agents/figma-sync/.agent.md`](../../../figma-sync/.agent.md) (universal steps + **Active target**).

---

## 1. Design tokens

- Define tokens in CSS (e.g. `app/src/index.css`) using `@theme` or `:root`.
- Use semantic names: `--color-ui-action`, `--color-neutral-gray-100`, `--radius-control-large`.
- Reference tokens in components via `var(--token-name)` in Tailwind (e.g. `bg-[var(--color-ui-action)]`) or inline styles.

## 2. Component structure

- **One component per design-system element** with props for variations (size, style, state).
- Avoid separate components per variant; use a single component with `style`, `size`, `variant` props.
- Map props to class records: `styleClasses[style]`, `sizeClasses[size]`.

## 3. Shared icons

- Shared module: `app/src/components/icons.tsx` (or `icons/`).
- Export: `PlusIcon`, `CirclePlusIcon`, `ChevronDownIcon`, etc.
- Accept `size` or `className` for flexibility.
- Import shared icons — never duplicate SVG markup.

## 4. Styling

- Tailwind + tokens as above.
- Use `.filter(Boolean).join(' ')` or `clsx` for conditional classes.
- Keep base classes (layout, transitions, disabled) separate from variant classes.

## 5. Demo / app surface

- Demo or Storybook stories should show **all variations** (size × style × state) with labels and a key/legend where helpful.
- States: default, hover, disabled, loading where applicable.

## 6. Specs and Figma alignment

- Align with [`app/BUTTONS_SPEC.md`](../../../../app/BUTTONS_SPEC.md) in the buttons area.
- Match specified dimensions when the spec says so.

## 7. Accessibility (HTML/React)

- `aria-label` for icon-only buttons.
- `aria-haspopup`, `aria-expanded` for dropdowns where applicable.
- `aria-hidden` on decorative icons.
- `disabled` + `cursor-not-allowed` (or equivalent) for disabled UI.

## 8. Cleanup

- Remove unused components; prefer functional patterns (e.g. real dropdowns) over static placeholders.

---

## Checklist

- Tokens for colors, radii, spacing
- Single component with variant props
- Icons from shared module
- All variations visible in docs/demo
- States covered where relevant
- Accessibility attributes where needed
