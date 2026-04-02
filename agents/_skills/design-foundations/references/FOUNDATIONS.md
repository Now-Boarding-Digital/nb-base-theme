# Design system foundations (framework-agnostic)

Principles that apply **regardless of Storybook renderer** (React, Vue, Web Components, etc.) or CSS approach. **How** you express these in code is defined per **target skill** — e.g. [`../../design-react-tailwind/references/react-tailwind.md`](../../design-react-tailwind/references/react-tailwind.md) for React + Tailwind in this repo.

---

## Tokens

- Prefer **semantic** design tokens (colors, radii, spacing) over raw values.
- Components should reference the project’s token system; do not hardcode one-off hex or px when a token exists.
- Treat token setup as a **first-class foundation task** for each new client/project before component generation begins.
- Keep token usage **DRY**: one canonical token definition, many component references (`var(--token)`), never duplicated raw values per component.
- Maintain a stable mapping path: **Figma variable name/path -> repo token name -> component usage**.
- Brand-specific labels in Figma (e.g. "Primary Colour") should be mapped once to semantic token names used across components.

## Component model

- **One logical component** per design-system element, with **props or parameters** for variations (size, style, state) — not a separate file per variant unless **`agents/figma-sync/.agent.md`** (**Active target**) says otherwise.

## Icons and assets

- **Reuse** shared icon or asset modules; do not duplicate the same SVG or raster in multiple places.

## Documentation surface

- Provide a way to view **all meaningful combinations** (e.g. size × style × state) with clear labels.
- Show interactive states where relevant: default, hover, disabled, loading.

## Accessibility (outcomes)

- Icon-only controls: accessible name.
- Expandable menus: appropriate expanded/collapsed semantics for the platform.
- Decorative imagery: hidden from assistive tech where applicable.
- Disabled UI: actually non-interactive and visually distinct.

## Alignment with specs

- Numeric layout and spacing should match **client spec docs** (e.g. button dimensions) when those exist.

---

## Target-specific conventions

Each stack has its own skill under `agents/_skills/` (e.g. **`design-react-tailwind/references/react-tailwind.md`** for React + Tailwind + CSS variables in this checkout).
