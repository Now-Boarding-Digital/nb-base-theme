# End-to-end workflow (start here if you’re confused)

One linear story: **Figma → generated style guide (Storybook as the review surface for the first target) → review in Codespaces (or browser) → designer feedback → run again → merge → production.**

The other files ([`README.md`](../README.md), [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md), etc.) split that story by **role**. This page keeps the **whole path** in one place.

---

## 1. Source of truth: Figma

Design lives in Figma. The pipeline **reads** it (via Figma MCP from Cursor or Claude Code, or future automation). Nothing replaces Figma as the design source; code is generated to **match** it.

---

## 2. Generate: Figma → style guide output (this repo)

Someone with the toolchain (engineer or agent in **GitHub Codespaces** or locally):

1. Connects Figma MCP if needed.
2. Runs the sync workflow (see [`README.md`](../README.md) and [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) — @‑mention that file in Claude Code as needed).
3. The agent follows [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) — universal steps + **Active target** (stack-specific: stories, file layout, validation).
4. Output lands in that target’s **output root** — **this checkout** starts with **React + Storybook** under **`app/`**; other targets will use other roots when you add them.

So: **Figma data in → generated style guide / Storybook-shaped code out** (shape depends on the target you use).

---

## 3. Review: Codespaces + designers

- Open the repo in **GitHub Codespaces** (or clone locally): run Storybook from `app/` (`npm run storybook`) or use a **hosted preview** (e.g. **Chromatic** build on a branch).
- **Designers** compare the live Storybook to Figma. If something’s off, they **do not** need to read agent docs or code — see [`designers.md`](designers.md): use **Claude Code** with a plain-language prompt so Claude explains *why* the sync did what it did and drafts **Figma fixes vs rule changes** (including text for `proposed-rules.md` without naming internal files).

Typical pattern: work on a **branch**, open a **Pull Request**, post the preview URL. Designers comment on the PR and/or Chromatic.

---

## 4. Suggest changes & re-run

Designer feedback might mean:

| Kind of change | What you do | Then |
|----------------|-------------|------|
| **One-off fix** (wrong padding, token) | Engineer edits `app/` (and maybe Figma) and pushes to the **same branch**. | Storybook/Chromatic updates on the PR — designers re-check. |
| **“The agent should always do X”** (repeats every sync) | Designers can ask **Claude Code** to draft the rule (see [`designers.md`](designers.md)); someone pastes it into [`../agents/_operations/proposed-rules.md`](../agents/_operations/proposed-rules.md) as **PENDING REVIEW**. | On merge after review, text is promoted into [`../agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) (universal steps vs **Active target**) — **Claude or engineering** picks the section; designers need not. |
| **Figma-side fix** | Designer updates Figma; team re-runs **sync** on the branch. | New commit on the PR. |

So **“re-run the project”** = either **re-run sync** (Figma → code again) and/or **iterate on the branch** until the preview matches. Same PR until approved.

---

## 5. Merge to `main` = code + “main agent”

When the PR is approved and merged:

- **`main` has the updated components and stories** (production-bound UI package or app, depending how you deploy).
- **`main` also has the updated instructions** if you merged changes to **`agents/figma-sync/.agent.md`** (and related **`agents/_operations/`** logs: `learnings.md`, `client-quirks/`, etc.).

Future syncs for everyone use those merged docs, so the pipeline **gets smarter** after each good merge.

---

## 6. Production

**Prod** is whatever you wire after `main`: publish an npm package, deploy Storybook, ship the app — this repo does not mandate one host. Chromatic **main** branch builds are a common way designers keep a stable URL.

---

## Quick map (who reads what)

| Who | Read first |
|-----|------------|
| Anyone lost | **This file** |
| Designers | [`designers.md`](designers.md) |
| Engineers / agents | [`README.md`](../README.md) → [`agents/figma-sync/.agent.md`](../agents/figma-sync/.agent.md) → [`agents/_skills/`](../agents/_skills/) per chain — templates: [`agents/__templates/`](../agents/__templates/) |
| Architecture / phases | [`docs/architecture.md`](architecture.md) + [`README.md`](../README.md) |

---

## Summary sentence

**Figma drives content; `figma-sync` + skills turn it into generated style guide output (today: Storybook under `app/` for the React target); designers review in Codespaces or Chromatic; feedback becomes branch fixes and/or merged instructions in `agents/figma-sync/.agent.md` on `main`; that merged repo state is both your UI and your “main agent” for the next run.**
