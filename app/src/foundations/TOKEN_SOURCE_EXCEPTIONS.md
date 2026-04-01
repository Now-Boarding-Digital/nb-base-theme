# Token source exceptions

This file records canonical tokens that are currently used by component role slots
but do not have a direct Figma variable mapping in `variableManifest.ts`.

Policy:

- Prefer direct Figma variable mapping for all canonical tokens.
- If no direct variable exists in the file, document the token here with reason.
- Remove entries once Figma exposes a variable and mapping is added.

## Current exceptions (2026-04-01)

- `--color-focus-ring` - focus ring token not present as named variable in current pull.
- `--color-ui-action-hover` - hover treatment currently derived from existing action scale.
- `--color-neutral-gray-700` - neutral text tone used by components; no direct variable returned in current pull.
- `--color-neutral-gray-50` - neutral hover surface; no direct variable returned in current pull.
- `--color-neutral-gray-400` - neutral border hover tone; no direct variable returned in current pull.
- `--color-neutral-gray-100` - neutral filled surface; no direct variable returned in current pull.
- `--color-action-outline` - focus outline tint token not returned as direct variable.
- `--color-action-tint` - action tint background token not returned as direct variable.

These exceptions are visible in `Foundations/Variables` as "No mapped Figma source".
