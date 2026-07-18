# HorrorCorridor Wet Concrete Floor Material Proof

Status: **Fixed** for the bounded floor-material subject; **Partially Fixed** for full V2 room parity

## Outcome

The walkable room floor now reads as damp, weathered poured concrete with worn slab seams, fine settlement fractures, aggregate variation, repairs, relief, and wet response. It no longer depends on a generic flat terrain color or a mechanical full-field grid. The active entry view also presents the floor and room together instead of looking into empty darkness.

The room still does not match the generated target's total material richness. Wall, ceiling, prop, rubble, and reflected-environment treatment remain visibly simpler.

## UX Intent

At normal player brightness, the player should immediately understand three things:

- the foreground is a traversable concrete floor;
- moisture and damage make the surface feel abandoned and unsafe;
- the floor remains readable while moving and turning, without HUD/debug contamination.

## Natural Ownership

```text
Corridor
`-- Ground
    `-- Surface
        `-- Paving
            `-- Concrete
                `-- Slabs
                    `-- Slab
```

The pure owner is `src/features/corridor/domain/concretePaving.ts`.

- `Concrete` owns paved area, exposed aggregate, and moisture.
- `Slabs` owns membership and the `settled-pour-field` alignment.
- `Slab` owns its weathered body, `settlement-branching` cracks, displacement, and wetness.

These are natural world truths. Noise functions, shader uniforms, Three.js materials, screenshots, and renderer warmup are not domains.

## Core and Kit Composition

No new natural domain, NexusEngine core, core alias, or floor-specific manager kit was added.

```text
Nexus world + scene + spatial cores
  -> natural Concrete / Slabs / Slab state
    -> existing terrain-field and terrain-shader-domain kits
      -> existing wet-concrete-texture-domain kit
        -> Nexus assets + graphics + presentation cores
          -> Three.js material adapter
            -> player-view proof
```

- `terrain-shader-domain-kit` remains the reusable local material capability.
- `wet-concrete-texture-domain-kit` remains the existing weathered-concrete descriptor owner.
- `horror-corridor-preset.ts` owns target-specific scale, width, density, relief, exposure, repair, and wetness values.
- `settle-slabs-kit` and `crack-slab-kit` are now classified as implemented gameplay contracts because their natural state is synchronized through the Nexus runtime and consumed by the live material adapter.
- `GameCanvas`, the shader, and game HTML only warm, synchronize, and realize the composition; they do not own concrete truth.

Current coverage is 128 closed contracts and 300 explicitly open contracts.

## Player-View Proof

Promotion command:

```bash
npm run validate:floor-material
```

Passing report: `docs/live-player-harness/floor-material-proof/report.json`, created `2026-07-17T23:41:39.770Z`.

- movement: `3.1329` world units;
- look: `yawDelta=0.32`, `pitchAfter=-0.261799`;
- expedition simulation advanced `1,980.4 ms`;
- all 18 gates passed with zero console errors;
- all three views contain zero bottom-left HUD pixels;
- spawn luminance: average `29.924`, dark ratio `0.1799`, light ratio `0.3191`;
- moved luminance: average `31.182`, dark ratio `0.1737`, light ratio `0.3079`;
- downward-side luminance: average `36.792`, dark ratio `0.1652`, light ratio `0.4230`;
- Nexus state reports 1,299 walkable concrete cells, estimated area 32,475, 2,598 slab memberships, moisture/wetness `0.46`, aggregate exposure `0.18`, and the exact natural modes above;
- reset/snapshot/fresh-runtime replay remains deterministic for all 359 mutable owners.

Artifacts:

- `docs/live-player-harness/floor-material-proof/starting-scene.png`
- `docs/live-player-harness/floor-material-proof/floor-material-after-movement.png`
- `docs/live-player-harness/floor-material-proof/movement-scene.png`

Human-view judgment: the foreground and route are readable in all three frames; subtle mottling, thin worn joins, irregular settlement marks, and damp response differentiate the floor without turning it into a tile grid. The bounded floor subject is fixed. Full-room target parity remains partial because the reference has finer aggregate, richer debris, stronger reflected surroundings, denser ceiling damage, and more believable wall/prop materials.

## Rejected Iterations

- A GLSL identifier named `patch` failed shader compilation and was removed.
- Oversized dotted/rail patterns read as a fabricated floor mechanism and were removed.
- A uniform full-field grid read as tiles rather than settled poured concrete and was softened into incomplete worn joins.
- Large looping fracture shapes dominated the surface and were rescaled into sparse fine settlement branches.
- The original entry view looked into an empty dark reach; the retained yaw/pitch reveals the room and floor without adding UI.
- A route that exposed unrelated outdoor/cable content was not used as the accepted material proof.

## Next Single UX Feature

Fine ceiling fracture and small settled rubble are next. They should deepen `Corridor / Ruin / Structure / Ceilings` and `Corridor / Ground / Rubble` only where natural truth is needed, reuse the selected object/shape/fidelity and world/scene/graphics cores, and add no alias kit.
