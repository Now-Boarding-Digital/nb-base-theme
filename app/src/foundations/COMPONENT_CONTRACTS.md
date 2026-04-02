# Component contracts (stable naming + behavior rules)

Use component contracts to keep implementation reusable across clients and avoid hardcoded visual utilities in component templates.

## Why this exists

- Enforce a stable schema for role-token names.
- Keep behavior semantics explicit (`loading` vs `disabled`, etc.).
- Prevent drift back to visual utility literals (`opacity-50`, `py-4`, `text-sm`, ...).

## Contract files

- Schema: `app/src/foundations/contracts/component-contract.schema.json`
- Per-component contracts: `app/src/foundations/contracts/components/*.contract.json`
- Validator script: `app/scripts/check-component-contracts.mjs`
- API schema: `app/src/foundations/contracts/api/component-api.schema.json`
- Per-component API contracts: `app/src/foundations/contracts/api/components/*.api.contract.json`
- API validator script: `app/scripts/check-component-api-contracts.mjs`

## Naming schema (recommended and enforced)

Role tokens should follow:

- `--<category>-<component>-<property>-<state?>-<size?>`

Examples:

- `--color-button-bg`
- `--color-button-hover-border`
- `--opacity-button-disabled`
- `--space-button-py-large`
- `--width-button-border`
- `--motion-button-duration`

For button font weight, we currently use one exact role token:

- `--font-weight-button`

## Contract fields

- `allowedRoleTokenPatterns`: regex rules for allowed role-token names.
- `requiredSemanticRoleTokens`: minimal semantic slots that must exist in component usage.
- `requiredBehaviorSnippets`: behavior invariants that must remain present.
- `forbiddenSnippets`: known anti-patterns that must not reappear.
- `forbiddenUtilityRegex`: utility patterns that should not be hardcoded in component templates.

Behavior note:

- For controls like `Button`, `loading` and `disabled` are separate semantics.
- Keep `loading` non-interactive without forcing native `disabled` visuals.
- Contract snippets should enforce this split (`disabled={isNativeDisabled}` + `aria-disabled` for loading).

## API naming + compatibility rules

All public React component props should follow stable naming conventions:

- Prefer camelCase prop names (for example, `labelText`, `onClick`, `defaultChecked`).
- ARIA props keep ARIA naming (`aria-label`, etc.).
- Event props must follow `onX` (`onClick`, `onChange`, ...).
- Avoid introducing synonym props that restate existing meaning (`buttonStyle`, `typeVariant`, ...).

Backwards compatibility policy:

- Never remove or rename public props in place for minor iterations.
- If replacing a prop, keep a compatibility alias until a planned major cleanup.
- Encode compatibility behavior in API contracts using `deprecatedProps` and `requiredCompatibilitySnippets`.

Current API-covered controls:

- `Button`
- `TextField`
- `Switch`
- `Radio`

## Validation

Run from `app/`:

- `npm run lint:contracts`
- `npm run lint:api`
- `npm run lint:tokens` (includes contract checks)

CI should fail on any contract violation.

## Change policy

Do not rename token categories or reorder naming segments casually. This schema is intended to be stable.

If you must evolve the schema:

1. Update schema + validator first.
2. Add migration notes to this file.
3. Migrate existing component contracts in one pass.
4. Verify with `lint:contracts`, `lint:tokens`, and Storybook build.
