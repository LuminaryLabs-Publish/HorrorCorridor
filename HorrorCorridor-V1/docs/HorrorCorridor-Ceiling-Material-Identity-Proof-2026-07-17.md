# HorrorCorridor Ceiling Material Identity Proof

Status: **Fixed** for the bounded ceiling-surface subject; **Partially Fixed** for full V2 room parity.

## Outcome

The playable chamber ceiling now reads as damp, spalled reinforced concrete and exposed brick instead of uniformly colored low-poly slabs. Intact shelter surfaces and collapsed pieces share one material identity while the already-proven opening, fracture, chipped-edge, rubble, route, and gameplay behavior remain intact.

No new natural domain, NexusEngine core, alias kit, or production kit was added. The existing natural `Ceiling` owner gained one `surface` truth, the existing chamber preset supplies target tuning, existing terrain/object material capabilities translate it, the selected graphics/presentation cores carry it, and the Three.js host realizes it.

## UX Intent

The player should:

1. enter a readable but threatening ruined service chamber;
2. glance or move upward and immediately read one damp masonry ceiling rather than separate flat polygons;
3. distinguish intact shelter, spalled concrete, exposed aggregate, mineral bloom, moss-darkened moisture, and broken brick;
4. keep the walkable route legible beneath the heavier surface treatment;
5. retain the same fracture, rubble, flashlight, encounter, restart, and recovery behavior.

The surface is environmental evidence, not a new mechanic. Its role is to make the upper ruin feel old, wet, layered, and structurally connected.

## Human-View Route

| Route concern | Evidence |
| --- | --- |
| Player readability | spawn, bounded movement, upward look |
| Camera framing | authoritative `+0.32` yaw and `+0.34` requested upward pitch |
| Regression player view | canonical movement plus ceiling, floor, wet, success, restart, and reconnect profiles |
| Target comparison | generated V2 target versus three retained ceiling-material frames |
| Runtime truth | exact descriptor and Nexus `Ceiling / surface` agreement |
| Promotion gate | readable and HUD-free views, movement/look, reset/replay, clean console |

Primary report: `docs/live-player-harness/ceiling-material-proof/report.json`.

## Target-to-Current Delta

The V2 target asks for layered damp eroded masonry: chipped concrete, exposed brick and aggregate, mineral staining, moss-darkened moisture, grime, and relief that catches localized light. The pre-pass live ceiling had the broad collapsed shape and fine fracture, but intact and broken pieces still read as uniformly brown/green paper-like polygons.

| Support metric | V2 target | Retained material proof |
| --- | ---: | ---: |
| Dark ratio | 45.84% | 15.28-16.90% |
| Readable/light ratio | 17.08% | 29.49-32.18% |
| Mean luminance | 22.89 | 29.76-30.92 |
| Edge density | 18.01% | 4.93-5.73% |

These metrics support inspection; they do not replace it. The bounded surface identity is accepted because the retained frames visibly vary intact and collapsed masonry while staying readable. The room remains partial because its total edge density, object silhouettes, wall/prop materials, and reflected environment are still substantially behind the target.

## Natural Ownership

The active graph remains one natural world rather than a parallel material taxonomy:

```text
Corridor
  -> Ruin
    -> Structure
      -> Ceilings
        -> Ceiling
          -> surface
```

`Ceiling / surface` owns independently meaningful ceiling condition:

```text
body
  construction: reinforced-concrete-and-brick
  primary material: damp-concrete
  exposed material: broken-brick

condition
  profile: damp-spalled-masonry
  dampness
  mineral bloom
  moss strength

pattern
  seams: scale and width
  aggregate: scale and exposure

response
  roughness range
  surface relief
```

Structural cracking stays under `Decay / Cracking`. Openings stay under `Ceiling / Openings`. Fallen material stays under `Ground / Rubble / Fallen Masonry`. The surface branch does not duplicate those truths.

The canonical composition now contains 358 child domains plus the root, 1,085 state truths, 433 kit mounts representing 428 unique contracts, 59 services, 4 hosts, and 6 proofs. Coverage remains 359 installed/resettable natural owners, 132 closed behavior contracts, and 296 explicit open contracts.

## Core and Kit Composition

```text
natural Ceiling surface truth
  -> furnish-chamber-kit target composition
    -> horror-corridor preset palettes and response tuning
      -> existing terrain shader and procedural PBR capability
      -> existing object material-fidelity and wound-mesh descriptors
        -> Nexus assets / graphics / presentation cores
          -> Three.js host realization
            -> headed ceiling-material proof
```

The consumed NexusEngine substrate remains:

- `n-core-world-kit`, `n-core-scene-kit`, and `n-core-spatial-kit` for place and descriptor placement;
- `n-core-object-kit`, `core-object-shape-domain`, and `core-object-fidelity-domain` for reusable ruin-object meaning;
- `n-core-assets-kit`, `n-core-graphics-kit`, `core-presentation-domain`, and `core-presentation-output-kit` for renderer-neutral presentation;
- `n-core-diagnostics-kit`, `n-core-debug-kit`, and `core-capture-domain` for proof.

Existing local capabilities were sufficient: `furnish-chamber-kit`, `terrain-shader-domain-kit`, `prop-material-fidelity-domain-kit`, `wound-triangle-mesh-domain-kit`, and `collapsed-ceiling-object-kit`. The added work is state, tuning, translation, and host realization inside those boundaries—not a new kit.

## Rejected Iterations

1. **Map-like crack contours:** reusing floor-style contour logic drew large black loops across the ceiling. It was technically gated but visually read like a topographic map, so it was removed.
2. **Shader-only flat variation:** damp mottling and mineral variation removed the loops but did not give enough material relief.
3. **Textured intact ceiling only:** deterministic generated texture improved shelter slabs, while collapsed pieces remained flat and disconnected in material identity.
4. **Retained composition:** intact ceiling uses generated damp-concrete grain/aggregate/mineral maps; collapsed pieces use the `ceiling-ruin` procedural profile with shallow normal relief and shared palette/condition tuning.

The renderer does not generate structural crack truth. It only realizes the surface and existing descriptors.

## Retained Runtime Proof

The retained report was created at `2026-07-18T01:06:49.544Z` and passed:

- `movementDelta=2.2473`;
- `yawDelta=0.32`;
- `pitchAfter=0.261799`;
- 3 ceiling material surfaces;
- 2 generated ceiling material textures;
- `surfaceRelief=0.32`;
- 26 collapsed-ceiling parts;
- 8 fracture paths;
- 10 chipped edge fragments;
- 3 collapse-rooted rubble clusters;
- zero console errors;
- zero bottom-left HUD pixels in all three views;
- readable spawn, intermediate, and upward-look frames;
- exact descriptor/Nexus surface agreement;
- deterministic 359-owner reset/replay.

Per-view center-crop results:

| View | Dark ratio | Readable/light ratio | Mean |
| --- | ---: | ---: | ---: |
| spawn | 16.95% | 32.11% | 29.76 |
| after movement | 15.31% | 29.49% | 29.86 |
| upward/final | 16.29% | 31.82% | 30.92 |

## Regression Sequence

All retained gates passed after the material iteration:

- `npm run validate:live-player:dev`;
- `npm run validate:ceiling-fracture`;
- `npm run validate:ceiling-overlap`;
- `npm run validate:floor-material`;
- `npm run validate:wet-reflection`;
- `npm run validate:success-path`;
- `npm run validate:restart-after-caught`;
- `npm run validate:reconnect-recovery`;
- `npm run domain:coverage` and `npm run domain:coverage:check`.

The success profile still reaches a furnished Building 3 with score 2. Restart still performs authoritative capture to fresh expedition. Reconnect still passes all 13 identity, host-continuity, request-correlation, recovered-place, Nexus-history, movement, and console gates.

## Remaining Delta and Next Feature

The bounded ceiling material subject is fixed, but the full room is not. The target still has much denser small-scale ruin edges, richer wall and prop surfaces, stronger stored-object silhouettes, and a true reflected environment.

The next single UX feature is **industrial shelving silhouette identity**. It should reuse the existing promoted industrial-shelving object descriptor, wound-mesh/object/shape/fidelity capabilities, furnished-room placement, and graphics/presentation path. Add no new natural domain or kit unless a missing reusable behavior or descriptor is demonstrated by the consuming player-view flow.
