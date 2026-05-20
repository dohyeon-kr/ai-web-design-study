---
name: image-asset-strategy
description: MUST FIRE FIRST — before writing any code, before drawing any `<svg>` `<circle>` `<path>` primitives for a human face / model figure / product photo / hero image / editorial visual / 3D-rendered object / illustration / brand mark — whenever a design reference (image, mockup, Figma URL) is attached to the task or any photographic / composite visual slot is spotted. Catalog the asset slots first, then route them through the `imagegen` skill. Do NOT attempt to fake photographic assets with SVG primitives, no matter how "rough" the placeholder seems. Triggers on every "build this design" style task with a reference image, or the first moment an asset slot is identified mid-work. Simple UI icons (search, home, menu, bag, heart, star, chevron, social logos in canonical shapes) are out of scope — those stay as inline SVG.
---

# Image Asset Strategy Skill

The first decision skill to fire when UI work starts from a reference.

**Why first?** Postponing the asset decision to "later" invites the urge to fake assets with SVG mid-task, and that placeholder tends to stick around as if it were the real thing. Settle the asset handling policy up front, then start the layout work cleanly.

**Hard rule — read this carefully**: the moment you see a reference image that contains a person, a product photograph, a hero photo, a model figure, an editorial moodshot, a 3D-rendered cluster, or a composite illustration, **stop**. Do not type a `<svg>` opening tag for that asset slot. Do not draft "a quick SVG version for now." That impulse is the failure mode this skill exists to prevent. Catalog the slots, then call `imagegen` (or drop placeholders and report). Both prior fruit-shop and select-shop sessions began the same way: an SVG `<path>` attempt happened first; the catalog only came after a human had to interrupt and point at the skill. That sequence is not acceptable — the catalog comes first.

---

## 1. Asset Catalog (first step before any code)

When a design reference / mockup arrives, extract the visual-asset slots **before** writing layout code.

**Classify as an asset**:
- Human faces / profile photos (avatars, trainer photos)
- Food / fruit / product photography (food cards, product imagery)
- 3D-rendered objects (geometric shapes, dumbbells, stones)
- Illustrations / drawings (hero illustration, empty-state graphic)
- Hand lettering / complex logos / brand marks

**Not an asset (inline SVG is fine)**:
- Plain UI icons (search, home, menu, chart, simple-shape social logos, heart, star)
- Solid-color shapes (decorative dot, divider)
- Geometric markers in gauges / charts

Catalog output:
```
- Slot 1: Header avatar — file <path/to/Header.tsx> — size 44x44 — tone warm orange — description "smiling woman with curly brown hair"
- Slot 2: Card illustration — file ... — size 160x160 — description "..."
- ...
```

Without this catalog, "let me just SVG it for now" creeps in mid-task.

---

## 2. Asset Generation via imagegen

For each catalog entry, invoke the **`imagegen` skill** to produce the asset. Do not fall back to drawing the photograph or face with SVG primitives.

When invoking `imagegen`, supply:

```
For each slot:
- Subject: <face / product / illustration / 3D object>
- Size / viewBox: <44x44 / 320x320 / 160x160 etc.>
- Tone, palette, style: <reference colors, mood>
- Subject prompt: "<one-sentence description of the asset>"
- Output format: <PNG with transparent background / PNG over chroma background / SVG / WebP>
- Output path: e.g. apps/web/public/fruit/orange.png
- Integration site: <component path + function name>
- Call-site signature constraints: <existing props that must stay>
```

After `imagegen` produces the asset(s):
- Wire the asset into the integration site (no other changes).
- Re-run lint / build / tests to confirm the wiring.
- Report which assets were added and where.

When multiple assets are needed in one task, catalog them all first and batch the `imagegen` calls before continuing layout work. Avoid drip-feeding asset generation between unrelated layout edits — context stays cleaner.

### When `imagegen` is not available

If for any reason `imagegen` cannot run (missing tool, sandbox restriction, user veto), drop a **placeholder** at each slot and surface the gap in the final report. Do not try to "draw it well" with raw SVG.

Placeholder guide:
- **Face avatar / profile photo**: solid or gradient circle + `role="img"` + `aria-label="<asset description> (placeholder)"`. No face shapes inside the SVG.
- **Product / food image**: tinted card area + empty body + `aria-label="<product> photo (placeholder)"`. Color should harmonize with the card tone.
- **Illustration**: dashed border block + small label "imagegen asset slot" — or a solid neutral shape. Restraint over a bad imitation.
- **3D object**: simple round/rectangular block. An honest placeholder beats an awkward fake.

Example:
```tsx
function SandraAvatar() {
  return (
    <div
      className={styles.avatar}
      role="img"
      aria-label="Sandra's profile photo (placeholder)"
    />
  );
}
```

CSS for `.avatar` stays as a solid or gradient circle. No face shapes inside.

---

## 3. Reporting (when placeholders were used)

When any slot ends up as a placeholder, surface it under "Outstanding" in the final report:

```
Outstanding (imagegen needed):
- apps/web/src/home/Header.tsx — Sandra avatar (44x44, warm orange tone)
- apps/web/src/home/DailyChallengeCard.tsx — 3D-object cluster (160x160, purple background)
- apps/web/src/home/PlanCard.tsx — Trainer avatar (36x36, honey blonde)
- ...
```

This list becomes the input for a follow-up imagegen pass or PR description.

---

## 4. Anti-patterns

- ❌ Starting code work and saying "I'll SVG it now and swap later" → the SVG sticks.
- ❌ Calling for image creation without explicitly using the `imagegen` skill → models tend to fake it with inline SVG primitives.
- ❌ Skipping the catalog step and discovering assets ad-hoc → loses batching opportunity, pollutes main context.
- ❌ Trying to make a placeholder "kinda look like" the asset by stacking SVG circles/paths → an awkward stand-in that fossilizes as the real thing.
- ❌ Routing simple UI icons (search, home) through `imagegen` → wastes time and tokens. Inline SVG is the answer there.

---

## 5. When to invoke

- The user supplies a design image / mockup / Figma URL / "build this design" task — **before any code change**.
- The reference contains people, food, products, 3D objects, or composite illustrations.
- An asset slot is identified mid-work for the first time — stop and route through this skill.

Skip when:
- The reference contains only plain UI icons (search, home, chart, etc.).
- The user explicitly says "ignore assets, just do layout."
- The asset files already exist in the repo and just need wiring.

---

## 6. Related skills

- **css-judgment** — after asset decisions land, continue with layout / CSS work.
- **visual-reference-compare** — at the end, compare the result against the reference image.
- **imagegen** — the tool you actually invoke to produce the asset.
