---
name: visual-reference-compare
description: Use after UI work that started from a design reference, right before reporting completion or opening a PR. "Build passes / nothing broken" is not verification. The verification step is comparing the rendered viewport against the reference for proportion, padding, spacing, and alignment — explicitly, by measurement, not by hunch. Triggers whenever the user supplied a reference image or mockup and the work touched visible layout / styling, or whenever the user signals "compare with the design", "match the original", "the padding feels off", "the ratio looks different". Captures the rendered output via cmux browser surfaces when running inside cmux, otherwise via `agent-browser`, Playwright, or the `screenshot` skill, and reports differences as a precise punch list.
---

# Visual Reference Compare Skill

UI work is only complete when **it has been seen and measured against the reference**.
- "build passes" = the code runs
- "tests pass" = unit behavior is correct
- **"matches the reference on measurement" = the design intent has been implemented**

Three independent verifications. The third is most often skipped in design work, which is why "padding looks off" / "doesn't match the image" feedback shows up *after* the report.

---

## 1. When to fire

Run this skill **before** any of these:
- Reporting "work complete" to the user
- Opening a PR
- Moving to the next task
- Marking the task done

Triggers:
- The user supplied a reference image — pre-scheduled to fire at end of task
- The user said "compare with the design", "match the original", "padding looks off", "ratio is different"
- A new UI component / page was built and is approaching verification

### Mid-work mini-check (lightweight)

In addition to end-of-task verification, run a **30-second mini-check** at these moments during the work:

- After any commit / large edit that touches the rendered tree (deleting / renaming / restructuring components)
- After you delete a file that another file imports — confirm the dev server didn't go red before moving on
- When you swap a placeholder for a real asset, or wire a new image into a component
- When you adjust shared layout primitives (the screen container, the body grid)

The mini-check is just: capture the current viewport, glance at it next to the reference, confirm nothing is structurally broken or grossly off, then continue. It is **not** the full Step-3 measurement pass — that's reserved for task end. The point is to avoid carrying a broken viewport through three more edits before noticing.

If the dev server is showing an error overlay or a missing-module screen, **stop adding new code** and fix the import / file state first.

---

## 2. Compare procedure

### Step 1. Re-anchor on the reference

- Open / view the design image directly.
- If the reference is already in conversation context, recall the specific frame to compare against (Home / Detail / etc.).

### Step 2. Capture the rendered output

Preferred order:
1. **cmux browser** when the app is running in a cmux browser surface — typical web dev flow here:
   ```bash
   cmux identify --json                                   # find the focused browser surface
   cmux browser surface:<N> get url                       # confirm where you are
   cmux browser surface:<N> wait --load-state complete --timeout-ms 10000
   cmux browser surface:<N> screenshot                    # returns a file:// path
   ```
   Open the returned file directly to inspect.
2. **`agent-browser` tool** for browsers outside cmux (open URL, navigate, screenshot).
3. **Playwright** or **playwright_mcp** in scripted captures.
4. **`screenshot` skill** for desktop windows or whole-screen fallback.
5. **macOS `screencapture` / equivalent CLI** when nothing else is available.
6. If no tool is available, **ask the user for a screenshot** in one line and pause — don't substitute a guess for an observation.

Open the captured file directly to inspect it.

### Step 3. Measured comparison

In the head is not enough; produce a concrete punch list:

1. **Layout proportions** — card-to-card widths, left-vs-right column ratios, header/body/footer ratios.
2. **Padding / gaps** — is the card padding visibly larger than the reference? Are left and right paddings symmetric? Do gaps match?
3. **Sizes** — buttons, icons, avatars too big or too small relative to the reference?
4. **Alignment / anchoring** — if the reference anchors the home button on the left, does yours? If distributed centrally, that's a difference.
5. **Color / gradient** — do the surface tones match? Is the gradient direction the same?
6. **Typography** — heading-vs-body size ratios, weight differences, letter spacing.
7. **Visual assets** — do assets land at the reference's position and size? Same bleed (assets overflowing card edges)?

Answer each item in one sentence:
- "Card padding looks larger than reference — ~16px vs ~12px estimated."
- "Home button is left-anchored in the reference but centrally distributed in my output."
- "Hero gradient direction matches the reference."

### Step 4. Report the differences

Don't binary pass/fail. Itemize:

```
Visual comparison (vs reference):
  ✅ Card grid 1fr 1fr proportion matches
  ✅ Left home-button anchor matches
  ⚠️ Social card padding — reference ~12px, output 16px (larger)
  ⚠️ Hero illustration bleed — reference overflows the card top, output stays inside
  ❌ Primary button hover color — darker than reference
```

`⚠️` / `❌` items mean **not complete yet**. Either fix immediately or hand the decision to the user.

---

## 3. "Nothing broke" is not verification

The following signals are **not** accepted as verification:

- ❌ "I took a screenshot and it looked plausible."
- ❌ "Build passes / tests pass."
- ❌ "All Storybook stories work."
- ❌ "Looks similar to me."

Accepted signals:
- ✅ Reference and capture viewed side by side with itemized differences named out loud.
- ✅ Measured (estimated) values for paddings / sizes compared against the reference.
- ✅ On finding a difference, returning to css-judgment §1 self-questions to diagnose root cause.

---

## 4. Anti-patterns

- ❌ Reporting "done" without taking a capture.
- ❌ Capturing but not opening the reference next to it — mental-reference comparison is full of bias.
- ❌ "Padding looks slightly off but not a big deal" — unmeasured guess. "Slightly" can be a 50% difference.
- ❌ Spotting a difference and not surfacing it in the report — the user catches it later, paying a trust cost.
- ❌ "Implementation first, comparison is the user's problem" — pushes the verification cost onto the user.

---

## 5. Tool quick-reference (codex)

Codex has multiple capture paths; prefer tool-specific captures over OS-level:

| Source | Preferred tool |
|---|---|
| Running web app inside a cmux browser surface | `cmux browser surface:<N> screenshot` (see Step 2 for full flow) |
| Running web app, no cmux | `agent-browser` (navigate + screenshot) or Playwright |
| Electron / native app | `screenshot` skill (OS-level capture, may need specific app focus) |
| Figma file | Figma MCP / `figma-implement-design` / `figma-generate-design` skill if available |
| Already-rendered artifact (HTML file, PDF) | open it in a viewer and capture |

For tool-specific commands, consult that skill's SKILL.md (e.g. `agent-browser`'s API, or the `cmux-browser` skill for the full cmux surface lifecycle). When nothing fits, the curated `screenshot` skill is the desktop-capture fallback.

If the viewport renders too small to inspect details, increase the browser zoom or DevTools-emulated viewport before re-capturing.

---

## 6. Related skills

- **image-asset-strategy** — if a comparison reveals an asset is missing or visibly fake, route the gap back to this skill.
- **css-judgment** — when differences are found, diagnose root cause via sizing ownership / box model / token hierarchy / etc.

---

## 7. Skip conditions

- The user didn't supply a reference and asked for a "rough" implementation.
- Pure typo / string-only edits / backend logic — anything unrelated to visible UI.
- The user explicitly says "I'll handle the comparison, just finish the work."
