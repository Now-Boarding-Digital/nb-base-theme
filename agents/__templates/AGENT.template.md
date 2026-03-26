---
name: [kebab-case-name]
description: "[One line: what the agent does. ECC style — end with Use when … triggers if helpful for discovery.]"
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

You are [one-sentence role statement — third person or "You are the …" matching your agents, e.g. chief-of-staff.md].

## Your Role

- [Outcome or responsibility 1]
- [Outcome or responsibility 2]
- [Outcome or responsibility 3]

## [Topic or process name — add H2s as needed]

[Body: steps, tables, rules, bash examples — chief-of-staff.md uses ### for numbered substeps inside a process.]

### [Substep or subsection]

- …

## Key Design Principles

- …

## Example Invocations

```bash
# In Claude Code: @‑mention this agent file or open it from agents/<name>/.agent.md
```

## Prerequisites

- …

---

**Boilerplate:** delete unused sections. Keep `name` in sync with the agent folder (`agents/<name>/`). [Everything Claude Code (ECC)](https://github.com/affaan-m/everything-claude-code) often uses a single file like `chief-of-staff.md` under `.claude/agents/`; **this repo** keeps one copy: **`agents/<name>/.agent.md`**. For **long procedures**, put the full runbook in this file and **link** to **`agents/_skills/<name>/`** for depth (see **`figma-sync`**). Use **`agents/_operations/`** for **feedback and suggested changes** (`learnings`, `proposed-rules`, `client-quirks` — see [`../_operations/README.md`](../_operations/README.md)), not a second copy of the runbook.
