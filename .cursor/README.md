# `.cursor/`

| Path | Purpose |
|------|---------|
| **`settings.json`** | Workspace editor settings. |
| **`skills/`** | **Symlink → `../agents/_skills`** so [Cursor Agent Skills](https://cursor.com/docs/skills) discovery works. **Edit files under `agents/_skills/`, not here.** |
| **`rules/`** | Optional `.mdc` rules — only for **Cursor-only** glue; see [`rules/README.md`](rules/README.md). |

Authoritative content: **`agents/`** (agent definitions, **`agents/_skills/`**, **`agents/_operations/`**, **`agents/__templates/`**).
