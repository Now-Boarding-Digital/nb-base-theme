# `agents/__templates`

Copy **`AGENT.template.md`** or **`SKILL.template.md`** into the path in the table below and replace placeholders.

- **Agents:** [Everything Claude Code (ECC)](https://github.com/affaan-m/everything-claude-code)-style — e.g. [`agents/chief-of-staff.md`](https://github.com/affaan-m/everything-claude-code/blob/main/agents/chief-of-staff.md) (`tools` as **JSON-style array**, **`## Your Role`**).
- **Skills:** [Cursor Agent Skills](https://cursor.com/docs/skills) — folder + **`SKILL.md`**, required `name` / `description`, sections **`## When to Use`**, **`## Other skills & integration`** (what other skills this one runs after / pairs with), **`## Instructions`**, optional **`references/`** for long docs.

| Template | Copy to |
|----------|---------|
| [`AGENT.template.md`](AGENT.template.md) | `agents/<agent-name>/.agent.md` |
| [`SKILL.template.md`](SKILL.template.md) | `agents/_skills/<skill-name>/SKILL.md` |

| Reference (do not copy wholesale) | Purpose |
|-------------------------------------|---------|
| [`OPERATIONS.md`](OPERATIONS.md) | Describes **`agents/_operations/`** — feedback log, proposed rules, client quirks. Live folder: [`../_operations/`](../_operations/). |

Register new agents in the project [`README.md`](../../README.md). Cursor discovers skills via **`.cursor/skills`** → `agents/_skills`; each skill folder must contain **`SKILL.md`**.
