# TextField token contract

This contract keeps `TextField` reusable across clients.

Do not change component color classes per client. Update token values/mapping instead.

## Role tokens used by `TextField`

- `--color-field-border-default`: resting border
- `--color-field-border-hover`: hover border
- `--color-field-border-active`: focused/filled border
- `--color-field-border-error`: error border
- `--color-field-label-resting`: resting label color
- `--color-field-label-floating`: floating label color
- `--color-field-text-default`: entered text/prefix/suffix in default state
- `--color-field-text-active`: entered text/prefix/suffix in focused state
- `--color-field-text-error`: entered text/prefix/suffix in error state
- `--color-field-helper-default`: helper text when not error
- `--color-field-helper-error`: helper text when error

## New client onboarding rule

1. Pull Figma variables for text fields.
2. Map Figma variables to canonical repo tokens in `variableManifest.ts`.
3. Set role token aliases in `index.css` (the `--color-field-*` tokens above).
4. Verify all states in `TextField.stories.tsx` including `All Combinations`.

If any required mapping is missing, block generation and document it.
