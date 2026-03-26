# For designers — review loop

The **full journey** (Figma → Storybook → merge) is in [`WORKFLOW.md`](WORKFLOW.md). This page focuses on **how you review** and **how you improve the sync** without reading code or memorizing file names.

---

## What you look at

- **Chromatic** or another **Storybook preview** — compare to Figma.
- **GitHub Pull Request** — leave comments with screenshots or links; you do **not** need to read code diffs.

---

## When something looks wrong: use Claude Code (no code required)

You are **not** expected to open `agents/figma-sync/.agent.md` or any `.tsx` files. **Claude Code** can read the agent file for you and answer in plain language.

### 1. Open this project in Claude Code

Same repo where engineering runs sync — you only need access to the project and Claude Code (e.g. from Codespaces or your machine).

Ask to use the **`designer-partner`** agent ([`../agents/designer-partner/.agent.md`](../agents/designer-partner/.agent.md)) — it loads [`../agents/_skills/designer-explainer/SKILL.md`](../agents/_skills/designer-explainer/SKILL.md) then this file and **`../agents/figma-sync/.agent.md`** **for you**; you only chat in plain language.

### 2. Paste a prompt like this (fill in the blanks)

```text
I'm a designer. I don't read code.

In Storybook, [component name] looks wrong: [describe — e.g. button label uses the wrong font / weight compared to Figma].

Figma reference: [paste link to frame or component]

Please:
1. Read how our Figma → Storybook sync is supposed to work (start with `agents/figma-sync/.agent.md`, then `agents/_skills/` as needed).
2. Explain in plain language why the output might look the way it does — quote or paraphrase the instructions that led there.
3. Tell me if the fix probably belongs in Figma (what I should change there) OR in the written agent instructions for the next sync, or both.
4. If a rule change would help, draft short text we can add to agents/_operations/proposed-rules.md as PENDING REVIEW. I won't know whether it belongs in universal steps vs Active target — you pick the right home in agents/figma-sync/.agent.md and say it in the draft.
```

### 3. What you do next

| Claude suggests | You |
|-----------------|-----|
| **Change in Figma** | Update Figma (text style, component, variable). Ask engineering to **re-run sync** when ready. |
| **Change how the agent is written** | Copy Claude’s **draft** into [`../agents/_operations/proposed-rules.md`](../agents/_operations/proposed-rules.md) (engineering can help you open that file in GitHub and use “Edit” → PR), or forward the whole Claude reply to your developer so they paste it in. |
| **Both** | Do the Figma part; still add the rule if the same mistake could happen again. |

You never have to choose where in **`agents/figma-sync/.agent.md`** a rule belongs — **Claude** (or your developer when merging) places it in the right section.

---

## If you prefer not to use Claude Code

You can still leave the same information on the **PR** or **Chromatic** (component name, what’s wrong, Figma link). A developer or Claude can turn that into `proposed-rules.md` later.

---

## What happens with your feedback (behind the scenes)

- **One-off:** engineering tweaks the implementation and pushes.
- **Repeating issue:** text in **`../agents/_operations/proposed-rules.md`** → reviewed → copied into the right agent doc on `main` so **future syncs** behave better.
- **One client only:** sometimes a note in **`../agents/_operations/client-quirks/`** — you don’t need to manage that; Claude or engineering can suggest it.

---

## Optional — vocabulary (only if you’re curious)

- **Tokens** — named colors, type, spacing in Figma / CSS.
- **Variants** — size, style, state in Figma that should show up as options in Storybook.

[`../agents/_skills/design-foundations/references/FOUNDATIONS.md`](../agents/_skills/design-foundations/references/FOUNDATIONS.md) and [`../agents/_skills/design-react-tailwind/references/react-tailwind.md`](../agents/_skills/design-react-tailwind/references/react-tailwind.md) go deeper; **you can ignore them** if you use Claude Code as above.

---

## Who runs the build

Usually **engineering** or **CI**. If that changes, it will be noted in the project [`README.md`](../README.md). Your review and Claude-assisted questions stay the same.
