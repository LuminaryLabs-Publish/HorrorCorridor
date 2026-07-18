# Ceiling Fracture and Rubble Handoff

Status: bounded subject fixed

## Natural Owners

- `Corridor / Ruin / Structure / Ceilings / Ceiling` owns localized collapse.
- `Corridor / Ruin / Structure / Ceilings / Ceiling / Openings` owns breach bounds, sky exposure, and settled falling debris.
- `Corridor / Ruin / Decay / Cracking` owns aperture-radial paths, widths, and movement state.
- `Corridor / Ground / Rubble / Fallen Masonry` owns collapse-edge settlement, source, pile height, and route clearance.

Do not replace those natural boundaries with a broad damage, fracture-system, rubble-manager, ceiling-renderer, or material category.

## Reused Composition

- NexusEngine world/scene/spatial, object/shape/fidelity, graphics/presentation/output, and diagnostics/debug/capture cores.
- Existing `wound-triangle-mesh-domain-kit`, `collapsed-ceiling-object-kit`, brick-rubble/debris object capabilities, `furnish-chamber-kit`, preset/material inventory, and Three.js host.
- No new domain, core, alias kit, or production kit.

## Closed Contracts

- `break-ceiling-kit`
- `open-ceiling-kit`
- `propagate-crack-kit`
- `collapse-masonry-kit`

Coverage: 132 closed / 296 open.

## Retained Result

- 26 ceiling parts / 240 outward-CCW triangles.
- 8 dark radial fracture paths.
- 10 chipped edge fragments.
- 3 low collapse-rooted rubble clusters.
- 42 estimated settled pieces and 2.2 meters route clearance in natural state.
- Dedicated movement/upward-look proof passes all descriptor, Nexus, readability, no-HUD, reset/replay, and console gates.
- Human-view status is Fixed for this subject and Partially Fixed for the full room; current edge density remains roughly 5.15-5.88% versus 18.01% in the target.

## Regression Notes

- Persistent scripted look now commits to the authoritative player snapshot before live-agent hold.
- Recovery presentation follows `recovery.connection`, preventing transport-status races from skipping the visible Connection Lost phase.
- Canonical, floor, wet, structural ceiling, fracture, success, restart, and 13-gate reconnect proofs pass.

## Next

One UX feature only: ceiling surface material identity. Reuse the same natural ceiling, procedural material, presentation, preset, and host boundaries.

Full proof: `docs/HorrorCorridor-Ceiling-Fracture-Rubble-Proof-2026-07-17.md`.
