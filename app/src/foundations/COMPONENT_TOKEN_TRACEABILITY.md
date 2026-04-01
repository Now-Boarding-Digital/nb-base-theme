# Component token traceability map

Use this as the single place to answer:

- "Which Figma variable drives this component color?"
- "Why is client A different from client B?"

## Mapping chain (always the same)

1. Figma variable name (source of truth in design file)
2. Canonical repo token (in `variableManifest.ts` via `TOKEN_MAP`)
3. Component role token (in `index.css`, `--color-<component>-...`)
4. Component usage (in `app/src/components/*.tsx`)

If visual output differs per client, check steps 1-3 before editing component code.

## System-level source files

- Figma -> canonical: `app/src/foundations/variableManifest.ts`
- Canonical -> component roles: `app/src/index.css`
- Role usage in code: `app/src/components/*.tsx`

## Component role token groups

- Button: `--color-button-*`, `--shadow-button-solid-hover`
- Link: `--color-link-*`
- IconButton: `--color-icon-button-*`
- StackedButton: `--color-stacked-*`
- LoginButton: `--color-login-*`
- Dropdown: `--color-dropdown-*`
- TextField: `--color-field-*`

## Review/debug checklist (designer + engineer)

1. Locate the component role token in component code.
2. Resolve alias in `index.css` to canonical token.
3. Resolve canonical token back to Figma variable in `variableManifest.ts`.
4. Compare expected Figma value for current client/mode.

Do not patch per-client colors directly in component TSX.

## Enforcement

- Run `npm run lint:tokens` from `app/`.
- This validates both:
  - no CSS fallback vars in TS/TSX (`check-token-fallbacks.mjs`)
  - no non-role color/shadow/opacity tokens in component modules (`check-component-role-tokens.mjs`)
- Document any canonical tokens without direct Figma mapping in `TOKEN_SOURCE_EXCEPTIONS.md`.
