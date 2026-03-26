# Skills

Skills live **here** — **`agents/_skills/<name>/SKILL.md`** — per [Cursor Agent Skills](https://cursor.com/docs/skills). Cursor also discovers them via **`.cursor/skills`** → symlink to this folder. **Feedback logs and proposed instruction changes** live in **[`../_operations/`](../_operations/)**, not here.

| File | Role |
|------|------|
| `SKILL.md` | YAML frontmatter + **`## When to Use`** + **`## Instructions`** — always the entry; keep it short. |
| `references/` | Long-form specs (`*.md`) — norms, checklists, stack rules. Point to them from **`SKILL.md`**; agents load them only via that skill (e.g. **`figma-sync`** skill chain). |
| `scripts/`, `assets/` | Optional |

**New skill:** copy [`../__templates/SKILL.template.md`](../__templates/SKILL.template.md) → `agents/_skills/<skill-name>/SKILL.md`; `name` must match the folder name.

**Agents** list which skills to load in order — see e.g. **`../figma-sync/.agent.md`**.
