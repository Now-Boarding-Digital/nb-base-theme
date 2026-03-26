# Pipeline — technical architecture

**styleguidehero** is a **style guide generator**: Figma → validated, reviewable UI artifacts (Storybook is the default *review surface*, not the only possible output shape). **Stack** is chosen per **Active target** section in the sync agent — React is the **first** target in this checkout, not the only one possible.

**Canonical sync:** [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) holds **universal steps (1–8)** — including **variables/tokens before components** — **Figma MCP**, and **this repo’s Active target** (React + Storybook under `app/`). It composes **`agents/_skills/<name>/`** in the order listed there. Long design prose stays in each skill’s **`references/`** — not duplicated in the agent file.

**Project entry:** [`../README.md`](../README.md). **Linear story:** [`WORKFLOW.md`](WORKFLOW.md).

---

## What we are building

A fully owned **style-guide generation** pipeline that:

1. Reads a client's Figma file via the official Figma MCP server
2. Evaluates whether components meet a readiness checklist before touching the repo
3. Generates UI artifacts and **Storybook** stories for an **active target** (React, Vue, HTML, etc. — whatever **`agents/figma-sync/.agent.md`** defines under **Active target**)
4. Keeps **framework-specific** rules in that **Active target** section (file layout, story API, validation commands)
5. **Phase 1:** Human opens a GitHub PR and runs Chromatic after review (`gh pr create`, then per-target npm scripts). **Phase 2+:** automate via CI / webhooks.
6. Learns from every run, capturing quirks and proposing rule improvements
7. **Future:** trigger when a designer publishes in Figma (webhook + Actions)

**What this is not:** a runtime service. AI runs at generation time and produces committed source files. Storybook and packages contain no AI at runtime.

### Why we own this fully

No reliance on third-party codegen SaaS for the instruction layer. The instructions file is our IP; it compounds with every client. The pipeline is extensible — we add capabilities, not workarounds.

### First target in this checkout

The **product** is the **generator** (agents, skills, docs) — **not** a single framework. This checkout **implements the first Storybook target**: **React + Storybook** (Vite in `app/`) — see **Active target** in [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md). Other targets: add a new **Active target** section (or agent file) + app roots as you expand.

**Validation** is defined in the **Active target** section (for `app/` today: typecheck, unit tests, `build-storybook`, optional browser tests). The default **`npm test`** in `app/` is intentionally fast (no Playwright required).

### Repository layout

**Per-target file layout** (flat vs folder-per-component, extensions, test files) is **only** in **`agents/figma-sync/.agent.md`** (**Active target** section(s)).

```
styleguidehero/
├── README.md                 ← entry, commands, doc map
├── docs/                     ← WORKFLOW.md, designers.md, this file
├── agents/
│   ├── _skills/              ← SKILL.md per folder + optional reference .md (e.g. design foundations)
│   ├── figma-sync/           ← .agent.md
│   ├── designer-partner/
│   ├── _operations/          ← feedback log, proposed rules, client quirks
│   └── __templates/
├── .claude/                  ← optional; see README
├── .cursor/skills/           ← symlink → ../agents/_skills (Cursor discovery)
├── .cursor/rules/            ← optional Cursor-only rules (see README)
└── app/                      ← output for React Storybook target (first implementation)
    └── …
```

### Documentation layers

| Layer | Location | Contents |
|-------|----------|----------|
| **System** | [`README.md`](../README.md) | Orchestration, commands, pointer to **`figma-sync`** agent |
| **Whole journey** | [`WORKFLOW.md`](WORKFLOW.md) | Figma → Storybook → review → merge → prod |
| **This page** | `docs/architecture.md` | Deep pipeline, MCP, roadmap, tiers |
| **Figma → Storybook sync** | `agents/figma-sync/.agent.md` | Universal steps + **Active target** + skill execution order |
| **Operations (feedback)** | `agents/_operations/` | Run log, proposed-rule inbox, client quirks — see [`README.md`](../agents/_operations/README.md) |
| **Claude agents** | `agents/<name>/.agent.md` | @‑mention or open in Claude Code |
| **Skills** | `agents/_skills/<name>/` | **`SKILL.md`** + optional **`references/`** for long docs; template: `agents/__templates/SKILL.template.md` |
| **First target output** | `app/` | React + Storybook (when using that target; generator itself is stack-agnostic) |

### Designer ↔ engineer loop

Designers **review** the live Storybook/Chromatic build and **critique on the PR**. Feedback becomes a code fix or is **promoted into agent docs** (`proposed-rules.md` → `agents/figma-sync/.agent.md` — universal vs **Active target** section). Detail: [`designers.md`](designers.md).

### Extending

- **New Storybook target:** extend `agents/figma-sync/.agent.md` with a new **Active target** section (or add a dedicated agent file) + stack skills under `agents/_skills/` with reference docs; register in **README**, add app/package roots.
- **Other workflows:** add agents under `agents/<name>/` or narratives under `docs/`; wire an @mention path. **`agents/_operations/`** is only for sync **feedback / proposed rules / client quirks** — not general notes (see [`agents/_operations/README.md`](../agents/_operations/README.md)). Use **`.cursor/rules/`** only for Cursor-only glue.
- **In-repo skills:** **`agents/_skills/<name>/SKILL.md`**; Cursor also sees them via **`.cursor/skills`** → `agents/_skills`.
- **Promote learnings:** merge into **`agents/figma-sync/.agent.md`** (universal steps vs **Active target** section).

### Figma MCP

- **Cursor:** Figma MCP plugin (`get_design_context`, `get_metadata`, `get_screenshot` — check server tool descriptors).
- **Claude Code:** [Figma MCP docs](https://www.figma.com/developers/mcp); authenticate via OAuth.

Do not assume fixed tool names across hosts.

### Learning files

- `agents/_operations/learnings.md` — append-only run log
- `agents/_operations/proposed-rules.md` — proposals; human promotes into `agents/figma-sync/.agent.md` (appropriate section)
- `agents/_operations/client-quirks/{client}.md` — per-client quirks (add files beside `.gitkeep` as needed)

**How rules become permanent:** problem in a run → append `proposed-rules.md` (PENDING REVIEW) → human reviews → approved text copied into **`agents/figma-sync/.agent.md`** (universal vs **Active target**).

| Tier | Location |
|------|----------|
| Universal + default target | `agents/figma-sync/.agent.md` |
| Client | `agents/_operations/client-quirks/` |
| Log | `agents/_operations/learnings.md` |

### Code Connect (optional)

Supported for some targets (e.g. React). Steps belong in the **`Active target`** section of **`agents/figma-sync/.agent.md`**.

### Orchestration roadmap

1. **Phase 1 (now):** manual sync → READY/BLOCKED → generate → validate → commit → `gh pr create` → Chromatic.
2. **Phase 2:** Figma webhook → GitHub Action → PR.
3. **Phase 3:** higher automation; human on BLOCKED / failures.

### Per-client onboarding checklist

- [ ] Figma URL + edit access
- [ ] Add URL **to the README** (Figma file section)
- [ ] Create `agents/_operations/client-quirks/{client-name}.md`
- [ ] First sync; review PR and proposed rules
- [ ] Code Connect when stable; Chromatic project; npm package name if publishing

### Relationship to key files

| File | Role |
|------|------|
| `agents/_skills/…/references/*.md` | Long design specs (loaded only via each skill’s `SKILL.md`) |
| `agents/figma-sync/.agent.md` (**Active target**) | Stack-specific generation for this checkout |
| `app/BUTTONS_SPEC.md` | Button-area spec (current app) |
| `app/` | Output tree for the React Storybook target (first target) |

### Key principle

> **`agents/figma-sync/.agent.md`** (universal steps + **Active target**) is the instruction product — not any single generated file under `app/`.

### Full agent instructions (pointers)

- **Single file:** [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) — readiness through post-run, Figma MCP, React/Storybook target (paths, npm scripts, CSF3). README stays high level.
