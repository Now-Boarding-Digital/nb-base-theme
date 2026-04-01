# Component variation checklist (required before build)

Use this checklist before creating or editing any component implementation (`*.tsx`) or stories (`*.stories.tsx`).

Goal: prevent missing behavior combinations by defining the full variation matrix first.

---

## 1) Capture all Figma behavior controls first

- [ ] Open the component set in Figma and record every control shown in "Explore component behaviour" (or equivalent controls panel).
- [ ] Normalize each control into a code-facing axis (examples: `size`, `style`, `state`, `type`, `icon`, `provider`).
- [ ] Record all allowed values per axis (do not collapse or omit values yet).
- [ ] Record whether each axis is:
  - [ ] Public API prop
  - [ ] Story-only visual state
  - [ ] Internal behavior (not user-configurable)

If any Figma axis is unclear, stop and mark component as `BLOCKED` until clarified.

---

## 2) Define the canonical variation matrix

- [ ] Create a matrix table before coding:
  - axis name
  - allowed values
  - default value
  - token dependencies
  - Storybook coverage story
- [ ] Confirm all Figma controls map to at least one matrix row.
- [ ] Confirm no matrix row is "dropped" without an explicit note.

Required note format for dropped/unimplemented values:
- `Missing coverage: <axis>/<value> - reason - follow-up plan`

---

## 3) Lock story coverage before component coding

- [ ] Add/confirm `Playground` (interactive prop controls for public API).
- [ ] Add focused axis stories (one story per major axis).
- [ ] Add `All Combinations` story that spans the full matrix for visual QA.
- [ ] Ensure each `All Combinations` cell can reveal implementation code.
- [ ] Place `All Combinations` last in the component story group.

Do not begin component implementation until this coverage plan is written.

---

## 4) Build + verify against matrix

- [ ] Implement component props directly from the matrix axes.
- [ ] Verify each matrix value appears in stories and/or explicit documented exceptions.
- [ ] Verify token-first styling for each matrix branch (no ad hoc raw values).
- [ ] Use property-based component slots in component code (`bg`, `text`, `border`, `hover-bg`, etc.), not value-labeled slot names (`grey`, `blue`, `white`, etc.).
- [ ] Keep mapping chain explicit: `Figma variable -> canonical token -> component property slot`.
- [ ] Run lint/type checks and fix issues before finalizing.

---

## 5) Completion gate

A component is not complete unless all are true:

- [ ] Every Figma behavior control has a mapped axis.
- [ ] Every axis value is represented in stories or explicitly deferred.
- [ ] `All Combinations` reflects the current API shape.
- [ ] Any deferred values are documented with follow-up action.
