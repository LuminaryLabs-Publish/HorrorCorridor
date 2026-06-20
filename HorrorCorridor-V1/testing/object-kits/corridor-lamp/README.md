# Corridor Lamp Object Review Room

This folder is the human-view review surface for `corridor-lamp-object-kit`.

The page is intentionally not a debug dump. It shows references, the current Three.js object render, review controls, checklist, notes, and score fields in one browser frame so an LLM or human reviewer judges the same context.

The review harness also captures an 8-angle orbit set at 45 degree intervals. Those orbit frames are used to judge silhouette consistency and prevent a one-angle pass from hiding weak side/back views.

Run:

```bash
npm run review:object-kit -- corridor-lamp
```

Register a generated or supplied high-quality PNG as the primary target reference:

```bash
npm run review:object-kit -- corridor-lamp --reference-image /absolute/path/to/lamp-reference.png --mock-score 95 --no-codex
```

That command copies the PNG into `references/reference-primary.png` and records source metadata in `references/reference-primary.json`.

Acceptance:

- `player-distance` and `corridor-dark` views are readable.
- All 8 orbit angles preserve lamp identity and readable silhouette.
- Each scoped part kit is represented: foundation, pole, armature, lamp head, cable/conduit, fasteners, material, light, and validation.
- Light visibly starts from the lamp head.
- The lamp reads as rusted practical broken-city hardware, not a primitive cylinder or neon cyber prop.
- Isolated review score is at least `90` before main-scene promotion.
