# HorrorCorridor Industrial Shelving Silhouette Proof

Status: **Fixed** for the bounded shelving-silhouette subject; **Partially Fixed** for full V2 room parity.

## Outcome

The chamber's left storage wall now reads as a tall, loaded industrial rack rather than thin pipes, rails, and two floating boxes. Each retained rack has two clear bays, three upright lines, four shelf tiers, thick front lips, rear rails, feet, and varied former-use containers and machine forms.

No natural domain, NexusEngine core, alias kit, or production kit was added. The existing natural Storage/Shelves owner remains the place for shelf truth; the existing `industrial-shelving-object-kit` composes the visible descriptor through the existing wound-mesh, object, furnishing, graphics, and presentation path.

The separate target `industrial-shelving-kit` behavior contract remains open. This slice proves visual identity, not searchable inventory, accessible remains, tier interaction, or another natural shelving behavior.

## UX Intent

The player should:

1. enter the service chamber and recognize the left furnishing as industrial storage without being told what it is;
2. read repeated vertical uprights and horizontal shelf tiers before reading individual contents;
3. see enough negative space to distinguish a rack from a solid wall;
4. notice varied abandoned equipment—crates, bins, cases, canisters, and a drum—inside the frame;
5. retain a clear forward route, generator landmark, ceiling breach, floor, and threshold;
6. keep the same encounter, success, restart, and recovery behavior.

This is environmental storytelling and route framing, not a new interaction mechanic.

## Target-to-Current Delta

The generated V2 target shows a tall, multi-bay corroded storage rack along the left wall. Its identity comes from strong uprights, repeated shelf decks, visible depth, and varied stored-machine silhouettes.

The rejected pre-pass object contained only eight box/trapezoid parts:

- four `0.08`-wide posts;
- two thin shelves;
- two small utility boxes;
- no center divider, feet, shelf lips, rear rhythm, or varied equipment.

In both the main chamber and isolated review room it read as a small two-tier stand or surrounding pipe clutter. The review harness's automatic `90` result was rejected because the human checklist was unchecked and the player-distance image did not communicate the object.

The retained descriptor contains:

| Visible composition | Per rack | Live room |
| --- | ---: | ---: |
| rack objects | 1 | 2 |
| authored wound-mesh parts | 41 | 82 |
| stored-object parts | 19 | 38 |
| outward-CCW triangles | 680 | 1,360 |
| shelf tiers | 4 | 8 |
| open bays | 2 | 4 |

The live room still trails the target in surface wear, small-scale material breakup, true reflected-environment response, other prop fidelity, and total edge density. Those remain separate UX subjects.

## Natural Ownership

The existing natural branch is unchanged:

```text
Corridor
  -> Ruin
    -> Remnants
      -> Storage
        -> Shelves
          shelf membership
          occupied tiers
```

The object silhouette does not create new independent world truth. It is the visible realization of existing storage content, so this pass belongs in the current object descriptor and furnishing composition.

The distinction is deliberate:

- `Shelves` owns future natural shelf membership and occupied-tier truth;
- `industrial-shelving-object-kit` emits the reusable visible rack descriptor;
- `furnish-chamber-kit` chooses two wall-side placements;
- the Three.js host realizes explicit triangles and materials;
- the proof harness observes the player view;
- none of those layers silently closes the open `industrial-shelving-kit` gameplay contract.

The canonical graph therefore remains 358 child domains plus the root, 1,085 state truths, 433 kit mounts representing 428 unique contracts, 59 services, 4 hosts, and 6 proofs. Coverage remains 359 installed/resettable owners, 132 closed behavior contracts, and 296 explicit open contracts.

## Core and Kit Composition

```text
natural Corridor / Ruin / Remnants / Storage / Shelves boundary
  -> existing industrial-shelving-object-kit
    -> existing mesh-object-kit composition helper
      -> existing wound-triangle-mesh-domain-kit primitives
        -> existing furnish-chamber-kit placement
          -> Nexus world / scene / spatial / object capabilities
            -> Nexus assets / graphics / presentation capabilities
              -> Three.js wound-mesh host
                -> isolated review + headed player proof
```

Consumed NexusEngine substrate remains:

- `n-core-world-kit`, `n-core-scene-kit`, and `n-core-spatial-kit` for place and descriptor placement;
- `n-core-object-kit`, `core-object-shape-domain`, and `core-object-fidelity-domain` for reusable object meaning and shape;
- `n-core-assets-kit`, `n-core-graphics-kit`, `core-presentation-domain`, and `core-presentation-output-kit` for renderer-neutral presentation;
- `n-core-diagnostics-kit`, `n-core-debug-kit`, and `core-capture-domain` for inspectable proof.

No additional public core was needed. Current public NexusEngine `main` was rechecked and still matches the pinned commit `d41992636de2752f1ad9047b80701e6313f19b87`.

## Retained Composition

The existing profile was deepened rather than wrapped in another kit:

- six thick front/rear uprights create three post lines and two bays;
- three broad feet anchor the rack to the floor;
- four warped shelf decks and four front lips preserve horizontal rhythm at distance;
- four rear rails plus front/rear headers preserve the frame in oblique views;
- a large crate, banded canisters, handled tool case, utility bin, upper bins, horizontal drum, tray, and box provide varied stored forms;
- `stored-object`, frame, tier, and equipment tags make composition depth inspectable;
- `painted-utility` receives an explicit muted olive wound-mesh material instead of falling back to generic painted metal;
- the two existing wall-side placements and walkable route remain unchanged.

The smoke route now fails closed unless the descriptor retains at least 40 parts, 18 stored-object parts, and 640 wound triangles. The live proof separately requires two placed racks, at least 80 total parts, 36 stored parts, and 1,280 triangles.

## Human-View Loop

### Rejected baseline

The isolated baseline captures under `testing/object-kits/industrial-shelving/runs/2026-07-17-before-silhouette/` fail the player question. Front and distance views show a tiny two-tier stand; the room spawn shows rails/pipes and two boxes.

### Accepted isolated object

The retained isolated pass is under `testing/object-kits/industrial-shelving/runs/2026-07-17-after-silhouette-v1/`.

Human inspection accepts:

- front: clear two-bay frame and loaded tiers;
- player distance: repeated shelf rhythm survives scale and darkness;
- three-quarter: depth, feet, frame, and mixed equipment remain separable;
- corridor dark: the object remains recognizable without a label.

### Accepted live room

Primary report: `docs/live-player-harness/industrial-shelving-proof/report.json`.

The dedicated profile captures:

- `starting-scene.png`: spawn composition and full left storage wall;
- `industrial-shelving-after-approach.png`: bounded forward movement with route and generator retained;
- `industrial-shelving-side-look.png`: authoritative `+0.82` left look at the loaded bays;
- `movement-scene.png`: final retained player view.

The first live attempt used a 500 ms approach and `+1.12` yaw. It passed numeric gates but filled the frame with a material close-up, so it was rejected as poor silhouette proof. The retained profile bounds approach to 260 ms and uses `+0.82` yaw.

## Retained Runtime Proof

The report created at `2026-07-18T01:40:37.983Z` passes every gate:

- `movementDelta=3.1230`;
- `yawDelta=0.82`;
- two rack placements;
- 82 live rack parts;
- 38 live stored-object parts;
- 1,360 live rack triangles;
- zero console errors;
- zero bottom-left HUD pixels in all four views;
- readable luminance in all four views;
- deterministic 359-owner reset/replay;
- unchanged 474 installs, 405 registered paths, 36 Nexus cores, 73 local descriptor/behavior kits, and 6 composition kits.

Per-view center-crop support metrics:

| View | Dark ratio | Readable/light ratio | Mean luminance |
| --- | ---: | ---: | ---: |
| spawn | 15.54% | 32.89% | 30.57 |
| after approach | 13.86% | 31.71% | 32.09 |
| side look | 9.70% | 49.78% | 42.97 |
| final | 9.65% | 51.58% | 43.20 |

These metrics support the human inspection; they do not replace it.

## Regression Sequence

Retained checks after the visual iteration:

- `node --check scripts/horror-corridor-live-player-harness.mjs`;
- `npx tsc --noEmit`;
- `npm run lint -- --quiet`;
- `npm run build`;
- `npm run smoke:protokits`;
- `npm run validate:industrial-shelving`;
- canonical forward proof through a fresh CDP port;
- `npm run validate:ceiling-overlap`;
- `npm run validate:ceiling-fracture`;
- `npm run validate:ceiling-material`;
- `npm run validate:floor-material`;
- `npm run validate:wet-reflection`;
- `npm run validate:success-path`;
- `npm run validate:restart-after-caught`;
- `npm run validate:reconnect-recovery`;
- `npm run domain:check`;
- `npm run domain:coverage` and `npm run domain:coverage:check`.

The canonical CDP proof passed on fresh port `9225`; an existing long-lived port `9224` endpoint was left untouched after it stalled. Restart and reconnect each had one startup/transport timeout, then passed independently without code or threshold changes. The retained reports are the passing reruns.

## Remaining Delta and Next Feature

Industrial shelving silhouette identity is fixed. Full room parity is not.

The next single UX feature is **industrial shelving corrosion and wear identity**: give the already-readable rack chipped paint, grime, rust variation, and age cues through existing material/preset/graphics/presentation boundaries while preserving its silhouette and all current proofs. Add no new natural domain, core, alias kit, or production kit unless a consuming flow demonstrates missing reusable capability.
