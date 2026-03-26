# Client profiles (`agents/_config/clients/`)

**Purpose:** Machine-readable **Figma pointers** (file key, URL, important node ids) per customer or design partner. The **`figma-sync`** agent reads the active profile so MCP calls use the right `fileKey` and `nodeId` without hard-coding only in README.

## Default sample client

| File | Client |
|------|--------|
| [`clients/now-boarding.json`](clients/now-boarding.json) | **Now Boarding** — design partner / boilerplate (Now Boarding Design System Kit) |

## Overrides (optional)

Environment variables may override the JSON for CI or one-off runs (not required for local dev):

| Variable | Effect |
|----------|--------|
| `FIGMA_CLIENT` | If set to a client `id` (e.g. `now-boarding`), sync should load `clients/{id}.json`. |
| `FIGMA_FILE_KEY` | Overrides `figma.fileKey` when set. |
| `FIGMA_NODE_BUTTONS` | Overrides `figma.nodes.buttonsFrame` when set (use `138:3677` colon form). |

## Adding a client

1. Copy `clients/now-boarding.json` → `clients/{your-client-id}.json` and edit `id`, `displayName`, `figma`, `notes`.
2. Optionally add [`../_operations/client-quirks/{your-client-id}.md`](../_operations/client-quirks/) for prose (exceptions, contacts).
3. Point **`FIGMA_CLIENT`** at the new `id` or document the default in [`../figma-sync/.agent.md`](../figma-sync/.agent.md).

**Schema:** [`client.schema.json`](client.schema.json) (informal; validate in editors that support JSON Schema if useful).

**Check JSON parses:** from `app/`, run **`npm run validate:client-config`** (Node — parses `client.schema.json` and every `clients/*.json`).
