---
name: image-asset-strategy
description: MUST FIRE FIRST — before writing any code, before drawing any `<svg>` `<circle>` `<path>` primitives for a human face / model figure / product photo / hero image / editorial visual / 3D-rendered object / illustration / brand mark / custom icon set / non-canonical brand mark — whenever a design reference (image, mockup, Figma URL) is attached to the task or any photographic / composite visual slot is spotted. Catalog the asset slots first, then **actively delegate generation to Codex** via `/codex:rescue` (the `codex:codex-rescue` subagent) — Codex owns the `imagegen` pipeline. Do NOT attempt to fake photographic assets or custom icons with SVG primitives, no matter how "rough" the placeholder seems, and do NOT default to "let me write a placeholder" before trying the Codex route. Triggers on every "build this design" style task with a reference image, or the first moment an asset slot is identified mid-work. Only **canonical trivial UI glyphs** (search, home, menu, bag, heart, star, chevron, well-known social logos in canonical shapes) stay as inline SVG.
---

# Image Asset Strategy Skill

The first decision skill to fire when UI work starts from a reference.

**Why first?** Postponing the asset decision to "later" invites the urge to fake assets with SVG mid-task, and that placeholder tends to stick around as if it were the real thing. Settle the asset handling policy up front, then start the layout work cleanly.

**Hard rule — read this carefully**: the moment you see a reference image that contains a person, a product photograph, a hero photo, a model figure, an editorial moodshot, a 3D-rendered cluster, a composite illustration, **or a custom-styled icon/brand mark that isn't in the canonical trivial-glyph set**, **stop**. Do not type a `<svg>` opening tag for that asset slot. Do not draft "a quick SVG version for now." That impulse is the failure mode this skill exists to prevent. Catalog the slots, then **delegate generation to Codex** (it owns `imagegen`). Both prior fruit-shop and select-shop sessions began the same way: an SVG `<path>` attempt happened first; the catalog only came after a human had to interrupt and point at the skill. That sequence is not acceptable — the catalog comes first, Codex delegation is the default route, and placeholders are a last resort that requires an explicit reason in the report.

---

## 1. Asset Catalog (first step before any code)

When a design reference / mockup arrives, extract the visual-asset slots **before** writing layout code.

**Classify as an asset (delegate to Codex)**:
- Human faces / profile photos (avatars, trainer photos)
- Food / fruit / product photography (food cards, product imagery)
- 3D-rendered objects (geometric shapes, dumbbells, stones)
- Illustrations / drawings (hero illustration, empty-state graphic)
- Hand lettering / complex logos / brand marks
- **Custom-styled icon sets** that aren't canonical UI glyphs — duotone, sticker-style, isometric, gradient-filled, brand-specific icon families
- **Brand marks** beyond well-known canonical social logos

**Not an asset (inline SVG is fine — keep in Claude)**:
- **Canonical trivial UI glyphs only**: search, home, menu, chart, heart, star, chevron, plus, close, arrow, hamburger, bag/cart in their standard form
- **Well-known social logos in canonical shapes**: e.g., the standard Twitter bird, GitHub octocat outline, Instagram camera
- Solid-color shapes (decorative dot, divider)
- Geometric markers in gauges / charts

> Rule of thumb: if the icon needs a *style description* ("rounded duotone", "warm-gradient outline", "matching the reference's hand-drawn feel") beyond "the standard glyph" — it's an asset. Route it to Codex. Don't try to match the design's icon style with raw `<path d="...">` from memory.

Catalog output:
```
- Slot 1: Header avatar — file <path/to/Header.tsx> — size 44x44 — tone warm orange — description "smiling woman with curly brown hair"
- Slot 2: Card illustration — file ... — size 160x160 — description "..."
- Slot 3: Nav icon set (5 icons, duotone, peach/coral) — files ... — size 24x24 each
- ...
```

Without this catalog, "let me just SVG it for now" creeps in mid-task.

---

## 2. Asset Generation — delegate to Codex (default route)

Codex owns the `imagegen` pipeline. **From Claude Code, the default route for every catalog entry is to delegate to Codex** via the `/codex:rescue` slash command (which invokes the `codex:codex-rescue` subagent). Do not fall back to drawing the photograph, face, or styled icon with SVG primitives. Do not skip straight to "I'll drop a placeholder" — placeholders are §3, only after Codex routing is genuinely blocked.

### 2.1 When to delegate

- Every entry in the catalog from §1 that is classified as an asset (faces, photos, 3D objects, illustrations, hand lettering, custom icon sets, brand marks).
- Any mid-work slot you discover after layout has started — stop, add it to the catalog, batch-delegate.
- Even "I think I could SVG this one" cases for the **custom icon / brand mark** category — delegate. The bar to keep an icon in Claude is *canonical trivial glyph*, not *I could probably draw it*.

### 2.2 How to delegate (Claude Code → Codex)

Invoke `/codex:rescue` with a single, self-contained prompt that bundles the full catalog. Codex will not see this Claude session's context, so the prompt must stand alone.

Prompt template:

```
/codex:rescue Generate asset(s) for an image-asset-strategy hand-off.

Repository: <repo root / branch>
Design reference: <attached image path / Figma URL / brief description if neither>

For each slot, produce the file and wire it at the listed integration site.
Use imagegen for photographic / illustrative / custom-icon slots. Keep simple
UI glyphs out of scope.

Slots:
- Slot 1
  - Subject: <face / product / illustration / 3D object / custom icon set>
  - Size / viewBox: <44x44 / 320x320 / 160x160 etc.>
  - Tone, palette, style: <reference colors, mood, style cues from the design>
  - Subject prompt: "<one-sentence description of the asset>"
  - Output format: <PNG transparent / PNG over chroma / SVG / WebP>
  - Output path: e.g. apps/web/public/fruit/orange.png
  - Integration site: <component path + function name>
  - Call-site signature constraints: <existing props that must stay>
- Slot 2
  - ...

After producing each asset, wire it into the integration site (no other code
changes) and re-run lint / build / tests. Return the list of files added and
the integration sites touched.
```

When multiple assets are needed in one task, **batch them into a single `/codex:rescue` call** with all slots inline. Avoid drip-feeding one asset at a time — each Codex round trip is expensive, and batching keeps the visual coherence of the asset set higher.

### 2.3 After Codex returns

- Verify each promised file actually exists at its declared output path (don't trust the summary, check the tree).
- Inspect at least one generated asset visually (open the file) before declaring done — Codex can produce a file that wires cleanly but looks wrong.
- Re-run lint / build / tests to confirm the wiring.
- Report which assets were added and where, and which (if any) need a re-spin.

### 2.4 When Codex delegation is genuinely blocked

Only the following are valid reasons to skip Codex and go to §3 placeholders:

- The user explicitly vetoes Codex routing for this task ("no codex, just placeholder").
- `/codex:setup` reports Codex is missing or unauthenticated and the user declines to set it up now.
- The task is a throwaway / exploration where the user has said "don't bother generating assets."

"I think I can do it faster with SVG" is **not** a valid reason. "imagegen feels heavy for one small icon" is **not** a valid reason — if it cleared the §1 asset bar, delegate.

---

## 3. Placeholder fallback (last resort, requires explicit reason)

If §2.4 applies, drop a **placeholder** at each slot and surface the gap in the final report — including the reason Codex was skipped. Do not try to "draw it well" with raw SVG.

Placeholder guide:
- **Face avatar / profile photo**: solid or gradient circle + `role="img"` + `aria-label="<asset description> (placeholder)"`. No face shapes inside the SVG.
- **Product / food image**: tinted card area + empty body + `aria-label="<product> photo (placeholder)"`. Color should harmonize with the card tone.
- **Illustration**: dashed border block + small label "codex/imagegen asset slot" — or a solid neutral shape. Restraint over a bad imitation.
- **3D object**: simple round/rectangular block. An honest placeholder beats an awkward fake.
- **Custom icon set**: monotone canonical glyph at the same size, labeled as a placeholder. Don't attempt to mimic the custom style.

Example:
```tsx
function SandraAvatar() {
  return (
    <div
      className={styles.avatar}
      role="img"
      aria-label="Sandra's profile photo (placeholder — codex delegation skipped: <reason>)"
    />
  );
}
```

CSS for `.avatar` stays as a solid or gradient circle. No face shapes inside.

---

## 4. Reporting (when placeholders were used)

When any slot ends up as a placeholder, surface it under "Outstanding" in the final report **with the reason Codex was skipped**:

```
Outstanding (codex/imagegen delegation needed):
- apps/web/src/home/Header.tsx — Sandra avatar (44x44, warm orange tone) — skipped because: user vetoed for this pass
- apps/web/src/home/DailyChallengeCard.tsx — 3D-object cluster (160x160, purple bg) — skipped because: /codex:setup not authenticated
- apps/web/src/home/PlanCard.tsx — Trainer avatar (36x36, honey blonde) — skipped because: ...
- ...
```

This list becomes the input for a follow-up `/codex:rescue` pass or PR description. The "skipped because" column is mandatory — without it, the placeholder will fossilize as the real thing.

---

## 5. Anti-patterns

- ❌ Starting code work and saying "I'll SVG it now and swap later" → the SVG sticks.
- ❌ Skipping straight to placeholder without attempting `/codex:rescue` → Codex is the default route, placeholders are a documented fallback.
- ❌ Calling for image creation without going through Codex → Claude alone tends to fake it with inline SVG primitives. Codex owns `imagegen`.
- ❌ Skipping the catalog step and discovering assets ad-hoc → loses batching opportunity, pollutes main context, makes Codex round trips inefficient.
- ❌ Trying to make a placeholder "kinda look like" the asset by stacking SVG circles/paths → an awkward stand-in that fossilizes as the real thing.
- ❌ Routing canonical trivial UI glyphs (search, home, chevron) through Codex → wastes a round trip. Inline SVG is the answer there.
- ❌ One `/codex:rescue` call per asset → drip-feeding. Batch the catalog into a single delegation.
- ❌ "I think I could SVG this custom icon" → if it needed a style description in §1, delegate. Don't relitigate the catalog decision while you're already in implementation mode.

---

## 6. When to invoke

- The user supplies a design image / mockup / Figma URL / "build this design" task — **before any code change**.
- The reference contains people, food, products, 3D objects, composite illustrations, **or custom-styled icon sets**.
- An asset slot is identified mid-work for the first time — stop and route through this skill.

Skip when:
- The reference contains only canonical trivial UI glyphs (search, home, chart, etc.).
- The user explicitly says "ignore assets, just do layout."
- The asset files already exist in the repo and just need wiring.

---

## 7. Related skills & tools

- **css-judgment** — after asset decisions land (and Codex delegation has been kicked off), continue with layout / CSS work.
- **visual-reference-compare** — at the end, compare the result against the reference image; if an asset is missing or visibly off, loop back here for a Codex re-spin.
- **`/codex:rescue`** (`codex:codex-rescue` subagent) — the **primary route** for asset generation. Bundles the catalog into one delegation and lets Codex's `imagegen` produce + wire the files.
- **`/codex:setup`** — run this if `/codex:rescue` reports Codex isn't authenticated.
- **`better-icons`** — for canonical icons not already in the design system, you may resolve them locally (Iconify) rather than going to Codex. Custom-styled icon sets still go to Codex.
